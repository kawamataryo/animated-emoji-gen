import { Svg2Gif } from "./svg2gif";

export const convertGifAndSave = async (svgElmId: string, fileName: string) => {
  const elm = document.getElementById(svgElmId);
  if (!elm) {
    return;
  }
  const gif = new Svg2Gif(elm, 128, 128);
  const FRAME_COUNT = 20;
  for (let i = 0; i < FRAME_COUNT; i++) {
    await gif.add();
  }
  const blob = await gif.render();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = `${fileName}.gif`;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
