import { computed, onMounted, ref } from "vue";
import { Font, load } from "opentype.js";

export const useSvgPath = (initialText: string, viewSize: number) => {
  const text = ref(initialText);
  const font = ref<Font | null>(null);

  const rows = computed(() => {
    return text.value.trim().split("\n");
  });

  const paths = computed(() => {
    if (!font.value) {
      return [""];
    }
    return rows.value.map((t, i) => {
      const y = (textSize.value[i].height - 12) * (i + 1);
      return font.value!.getPath(t, 0, y, viewSize).toPathData(2);
    });
  });

  const textSize = computed(() => {
    return rows.value.map((t) => {
      if (!font.value) {
        return {
          height: 0,
          width: 0,
        };
      }
      const { x1, y1, x2, y2 } = font!.value
        .getPath(t, 0, 0, viewSize)
        .getBoundingBox();
      return {
        width: x2 - x1 + 12.8,
        height: y2 - y1 + 12.8,
      };
    });
  });

  const transforms = computed(() => {
    if (!font.value || !text.value.length) {
      return ["scale(1,1)"];
    }
    return rows.value.map((t, i) => {
      const xScale = viewSize / textSize.value[i].width;
      const yScale = viewSize / textSize.value[i].height / rows.value.length;
      return `scale(${xScale}, ${yScale})`;
    });
  });

  onMounted(async () => {
    font.value = await load("NotoSansJP-Bold.otf");
  });

  return {
    paths,
    text,
    transforms,
  };
};
