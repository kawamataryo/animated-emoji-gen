<template>
  <div class="grid">
    <template v-for="(component, i) in filterComponents" :key="i">
      <div>
        <div class="box has-text-centered">
          <div class="path-wrapper">
            <template v-if="paths[0]">
              <Component
                :is="component"
                :transforms="transforms"
                :paths="paths"
                :color="color"
                :background-color="backgroundColor"
              />
            </template>
            <template v-else>
              <div class="mock-box"></div>
            </template>
          </div>

          <button
            class="button is-small is-fullwidth mt-2 download"
            :disabled="!paths[0]"
            @click="onDownload($event, component)"
          >
            <i class="icon is-small">
              <RiDownload2Fill />
            </i>
            {{ t("message.download") }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import FilterDancingStroke from "./filters/FilterDancingStroke.vue";
import FilterStrokeDraw from "./filters/FilterStrokeDraw.vue";
import FilterNormal from "./filters/FilterNormal.vue";
import FilterWaves from "./filters/FilterWaves.vue";
import FilterColorSpots from "./filters/FilterColorSpots.vue";
import FilterDust from "./filters/FilterDust.vue";
import FilterPaintDrop from "./filters/FilterPaintDrop.vue";
import FilterShadow from "./filters/FilterShadow.vue";
import FilterWaterColor from "./filters/FilterWaterColor.vue";
import FilterZebra from "./filters/FilterZebra.vue";
import FilterBlur from "./filters/FilterBlur.vue";
import FilterColorSpots2 from "./filters/FilterColorSpots2.vue";
import FilterBlink from "./filters/FilterBlink.vue";
import FilterScale from "./filters/FilterScale.vue";
import FilterRotate from "./filters/FilterRotate.vue";
import { convertGifAndSave } from "../core/saveImage";
import RiDownload2Fill from "./icons/RiDownload2Fill.vue";
import { event } from "vue-gtag";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "FilterGallery",
  components: {
    FilterDancingStroke,
    FilterStrokeDraw,
    FilterNormal,
    FilterWaves,
    FilterColorSpots,
    FilterDust,
    FilterPaintDrop,
    FilterShadow,
    FilterWaterColor,
    FilterZebra,
    FilterBlur,
    FilterColorSpots2,
    FilterBlink,
    FilterScale,
    FilterRotate,
    RiDownload2Fill,
  },
  props: {
    paths: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    text: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    transforms: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    backgroundColor: {
      type: String,
      default: "transparent",
    },
  },
  setup(props) {
    const { t } = useI18n();

    const filterComponents = [
      "FilterNormal",
      "FilterShadow",
      "FilterPaintDrop",
      "FilterDust",
      "FilterColorSpots",
      "FilterWaves",
      "FilterDancingStroke",
      "FilterStrokeDraw",
      "FilterZebra",
      "FilterBlur",
      "FilterBlink",
      "FilterScale",
      "FilterRotate",
      "FilterWaterColor",
      "FilterColorSpots2",
    ];

    const onDownload = async (
      e: any, // FIXME
      svgElmId: string
    ) => {
      e.target.classList.add("is-loading");
      await convertGifAndSave(svgElmId, props.text);
      e.target.classList.remove("is-loading");

      event("download-gif", {
        filterType: svgElmId,
        text: props.text,
        color: props.color,
      });
    };

    return {
      t,
      filterComponents,
      onDownload,
    };
  },
});
</script>

<style scoped lang="scss">
.path-wrapper {
  border: 1px solid #bbb;
  display: inline-block;
  text-align: center;
}

.grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  grid-auto-rows: minmax(200px, auto);

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

.button.download {
  > i {
    margin-right: 4px !important;
  }
  width: 100%;
  max-width: 130px;
  display: inline-block;
  background-color: #ededed;

  &:hover {
    background-color: #cdcdcd;
  }
  &.is-loading::after {
    border: 2px solid #363636;
    border-right-color: transparent;
    border-top-color: transparent;
  }
}

.mock-box {
  width: 128px;
  height: 128px;
  background-color: #fff;
}
</style>
