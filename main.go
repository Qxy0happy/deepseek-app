// Command deepseek-app starts the DeepSeek desktop client.
package main

import (
	"embed"
	"log"

	"github.com/wailsapp/wails/v3/pkg/application"
)

// The frontend build output is embedded into the binary and served by the
// Wails asset server. Run `wails3 task build` or `wails3 task dev` so the
// frontend is rebuilt before this package is compiled.
//
//go:embed all:frontend/dist
var assets embed.FS

func main() {
	app := application.New(application.Options{
		Name:        "deepseek-app",
		Description: "DeepSeek 桌面客户端",
		Assets: application.AssetOptions{
			Handler: application.AssetFileServerFS(assets),
		},
		Mac: application.MacOptions{
			ApplicationShouldTerminateAfterLastWindowClosed: true,
		},
	})

	app.Window.NewWithOptions(application.WebviewWindowOptions{
		Title:            "DeepSeek",
		Width:            1280,
		Height:           800,
		MinWidth:         800,
		MinHeight:        600,
		BackgroundColour: application.NewRGB(255, 255, 255),
		URL:              "/",
		Mac: application.MacWindow{
			InvisibleTitleBarHeight: 50,
			Backdrop:                application.MacBackdropTranslucent,
			TitleBar:                application.MacTitleBarHiddenInset,
		},
	})

	if err := app.Run(); err != nil {
		log.Fatal(err)
	}
}
