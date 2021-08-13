import { computed, ref } from "vue";
import { Font } from "opentype.js";
import { FontClient } from "../utils/loadFonts";

type Fonts = {
  serif: {
    bold: Font | null;
    light: Font | null;
    medium: Font | null;
  };
  sans: {
    bold: Font | null;
    light: Font | null;
    medium: Font | null;
  };
};

type FontType = {
  family: keyof Fonts;
  weight: keyof Fonts["sans"];
};

const initialFonts = {
  serif: {
    bold: null,
    light: null,
    medium: null,
  },
  sans: {
    bold: null,
    light: null,
    medium: null,
  },
};

export const useGenerateFontPath = (initialText: string, viewSize: number) => {
  const text = ref(initialText);
  const fonts = ref<Fonts>(initialFonts);
  const fontType = ref<FontType>({
    family: "sans",
    weight: "bold",
  });

  const font = computed(
    () => fonts.value[fontType.value.family][fontType.value.weight]
  );

  const rows = computed(() => {
    return text.value.trim().split("\n");
  });

  const paths = computed(() => {
    if (!font.value) {
      return [""];
    }
    return rows.value.map((t, i) => {
      const height =
        i === 0 ? textSize.value[i].height - 12 : textSize.value[i].height - 4;
      const baseLine = height * (i + 1);
      return font.value!.getPath(t, 5, baseLine, viewSize).toPathData(2);
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
        width: x2 - x1 + 20.8,
        height: y2 - y1 + 20.8,
      };
    });
  });

  const transforms = computed(() => {
    if (!font.value || !text.value.length) {
      return ["scale(1,1)"];
    }
    return rows.value.map((t, i) => {
      const xScale = viewSize / (textSize.value[i].width + 8);
      const yScale = viewSize / textSize.value[i].height / rows.value.length;
      return `scale(${xScale}, ${yScale})`;
    });
  });

  const loading = ref(true);

  const loadFonts = async (locale: string) => {
    const fontClient = new FontClient(locale);
    // Load initial font
    loading.value = true;
    fonts.value.sans.bold = await fontClient.loadFont("sans", "bold");
    loading.value = false;

    // Load other fonts
    const result = await fontClient.loadAllFonts();
    fonts.value = {
      serif: {
        light: result.serif.light,
        medium: result.serif.medium,
        bold: result.serif.bold,
      },
      sans: {
        light: result.sans.light,
        medium: result.sans.medium,
        bold: result.sans.bold,
      },
    };
  };

  return {
    fonts,
    paths,
    fontType,
    text,
    transforms,
    loading,
    loadFonts,
  };
};
