import { memo, useEffect, useMemo, useState } from 'react'
import { ensureKatex, type Katex } from '../../services/markdown/katex.js'

/** renderToString 外层包裹的标签，组件自己渲染外层，这里切掉 */
const KATEX_WRAPPER = {
  inline: ['<span class="katex">', '</span>'],
  display: ['<span class="katex-display"><span class="katex">', '</span></span>'],
} as const

type MathHtmlResult = {
  html: string
  renderMode: 'katex' | 'fallback'
}

const noop = () => {}

/** KaTeX 渲染公式；出错时保留上次成功的结果（流式中公式未写完），没有则展示原文 */
const useMathHtml = (input: string, isInline: boolean): MathHtmlResult => {
  const [katexSource] = useState(() => ensureKatex())
  const [katex, setKatex] = useState<Katex | null>(
    katexSource instanceof Promise ? null : katexSource
  )
  const [previousResult, setPreviousResult] = useState<MathHtmlResult | null>(null)

  useEffect(() => {
    if (katexSource instanceof Promise) {
      katexSource.then(setKatex, noop)
    }
  }, [katexSource])

  const result = useMemo((): MathHtmlResult => {
    if (!katex) {
      return { html: input, renderMode: 'fallback' }
    }
    try {
      const [prefix, suffix] = KATEX_WRAPPER[isInline ? 'inline' : 'display']
      const html = katex
        .renderToString(input, { throwOnError: true, strict: false, displayMode: !isInline })
        .slice(prefix.length, -suffix.length)
      return { html, renderMode: 'katex' } as const
    } catch {
      return previousResult ?? { html: input, renderMode: 'fallback' }
    }
  }, [input, isInline, katex, previousResult])

  useEffect(() => {
    if (result.renderMode === 'katex' && result.html !== previousResult?.html) {
      // eslint-disable-next-line react/set-state-in-effect -- cache the last successful render for the streaming fallback
      setPreviousResult(result)
    }
  }, [result, previousResult])

  return result
}

export const MathBlock = memo(function MathBlock({ value }: { value: string }) {
  const { html, renderMode } = useMathHtml(value, false)
  if (renderMode === 'fallback') {
    return <p className="ds-markdown-paragraph">{html}</p>
  }
  return (
    <span className="katex-display ds-markdown-math">
      <span className="katex" dangerouslySetInnerHTML={{ __html: html }}></span>
    </span>
  )
})

export const InlineMath = memo(function InlineMath({ value }: { value: string }) {
  const { html, renderMode } = useMathHtml(value, true)
  if (renderMode === 'fallback') {
    return html
  }
  return <span className="katex" dangerouslySetInnerHTML={{ __html: html }}></span>
})
