import { load } from "opentype.js";

export class FontClient {
  constructor(private locale: string) {}

  async loadFont(family: "serif" | "sans", size: "bold" | "medium" | "light") {
    switch (this.locale) {
      case "ja":
        switch (family) {
          case "serif":
            switch (size) {
              case "bold":
                return await load("/fonts/NotoSerifJP-Black.otf");
              case "medium":
                return await load("/fonts/NotoSerifJP-Medium.otf");
              case "light":
                return await load("/fonts/NotoSerifJP-Light.otf");
            }
            break;
          case "sans":
            switch (size) {
              case "bold":
                return await load("/fonts/NotoSansJP-Black.otf");
              case "medium":
                return await load("/fonts/NotoSansJP-Medium.otf");
              case "light":
                return await load("/fonts/NotoSansJP-Light.otf");
            }
            break;
          default:
            return null;
        }
        break;
      case "en":
        switch (family) {
          case "serif":
            switch (size) {
              case "bold":
                return await load("/fonts/NotoSerif-Bold.ttf");
              case "medium":
                return await load("/fonts/NotoSerif-Regular.ttf");
              case "light":
                return await load("/fonts/NotoSerif-Italic.ttf");
            }
            break;
          case "sans":
            switch (size) {
              case "bold":
                return await load("/fonts/NotoSans-Bold.ttf");
              case "medium":
                return await load("/fonts/NotoSans-Regular.ttf");
              case "light":
                return await load("/fonts/NotoSans-Italic.ttf");
            }
            break;
          default:
            return null;
        }
        break;
      default:
        return null;
    }
  }

  async loadAllFonts() {
    const fonts = await Promise.all([
      this.loadFont("serif", "light"),
      this.loadFont("serif", "medium"),
      this.loadFont("serif", "bold"),
      this.loadFont("sans", "light"),
      this.loadFont("sans", "medium"),
      this.loadFont("sans", "bold"),
    ]);

    return {
      serif: {
        light: fonts[0],
        medium: fonts[1],
        bold: fonts[2],
      },
      sans: {
        light: fonts[3],
        medium: fonts[4],
        bold: fonts[5],
      },
    };
  }
}
