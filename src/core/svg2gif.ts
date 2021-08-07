// @see: https://github.com/yuneco/fulful/blob/master/src/core/Svg2Gif.ts

import GIF from "gif.js";

export class Svg2Gif {
  private encoder: GIF;

  private svgElem: HTMLElement;

  constructor(svg: HTMLElement, width = 500, height = 500) {
    this.svgElem = svg;
    this.encoder = new GIF({
      width,
      height,
      background: "#fff",
      quality: 1,
      dither: false,
    });
  }

  async add(): Promise<void> {
    return await new Promise((resolve, reject) => {
      const data = new XMLSerializer().serializeToString(this.svgElem);
      const img = new Image();
      img.src =
        "data:image/svg+xml;charset=utf-8;base64," +
        btoa(unescape(encodeURIComponent(data)));
      // FIXME: 何故かわからないけど、bodyにimgをappendしたら動いた。ワカラナイ..
      // appendをなくしたり、appendしたimageをdisplay-noneにすると動かないので、一旦cssのposition absoluteで要素を画面外に飛ばしている
      img.style.position = "absolute";
      img.style.top = "-1000px";
      document.body.appendChild(img);
      // ---
      img.onload = () => {
        this.encoder.addFrame(img, { delay: 10 });
        resolve();
      };
      img.onerror = () => {
        reject(new Error("error while render frame"));
      };
    });
  }

  async render(onProgress?: (progress: number) => void): Promise<Blob> {
    return await new Promise<Blob>((resolve, reject) => {
      this.encoder.on("finished", (blob) => {
        console.log("render finished", blob);
        resolve(blob);
      });
      this.encoder.on("abort", () => reject(new Error("aborted")));
      if (onProgress) {
        this.encoder.on("progress", onProgress);
      }
      this.encoder.render();
    });
  }
}
