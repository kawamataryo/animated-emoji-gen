import { Svg2Gif } from "./svg2gif";
import { wait } from "../utils/sleep";

export const convertGifAndSave = async (svgElmId: string, fileName: string) => {
  const elm = document.getElementById(svgElmId);
  if (!elm) {
    return;
  }
  const gif = new Svg2Gif(elm, 128, 128);
  // NOTE: 調整方法
  // FRAME_COUNT * waitの合計時間と、animationの実行時間をあわせるとキレイに出力される
  const FRAME_COUNT = 10;
  for (let i = 0; i < FRAME_COUNT; i++) {
    await wait(95);
    await gif.add();
  }
  const blob = await gif.render();

  // svg2gifの内部で作成したtmp画像の削除
  document.querySelectorAll(".tmp-img").forEach((e) => e.remove());

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = `${fileName}.gif`;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
