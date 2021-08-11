import { computed, onMounted, ref } from "vue";
import { Font, load } from "opentype.js";

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

  const loading = ref(true);

  const loadFonts = async () => {
    // Load initial font
    fonts.value.sans.bold = await load("/fonts/NotoSansJP-Black.otf");
    loading.value = false;

    // Load other fonts
    const loadedFonts = await Promise.all([
      load("/fonts/NotoSerifJP-Black.otf"),
      load("/fonts/NotoSerifJP-Light.otf"),
      load("/fonts/NotoSerifJP-Medium.otf"),
      load("/fonts/NotoSansJP-Light.otf"),
      load("/fonts/NotoSansJP-Medium.otf"),
    ]);
    fonts.value = {
      serif: {
        bold: loadedFonts[0],
        light: loadedFonts[1],
        medium: loadedFonts[2],
      },
      sans: {
        bold: fonts.value.sans.bold,
        light: loadedFonts[3],
        medium: loadedFonts[4],
      },
    };
  };

  onMounted(async () => {
    await loadFonts();
  });

  return {
    paths,
    fontType,
    text,
    transforms,
    loading,
  };
};
