<template>
  <div class="loading-icon-wrapper">
    <div class="loading-icon">
      <span>Loading</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Loading",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.loading-icon-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.8);
}

@keyframes loadingBefore {
  0% {
    transform: translateX(-14px);
  }
  50% {
    transform: translateX(14px);
  }
  100% {
    transform: translateX(-14px);
  }
}

@keyframes loadingAfter {
  0% {
    transform: translateX(-50px);
  }
  50% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(-50px);
  }
}

.loading-icon {
  font-family: "Arial Black", "Arial Bold", Gadget, sans-serif;
  text-transform: uppercase;

  width: 150px;
  text-align: center;
  line-height: 50px;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin: auto;
  transform: translateY(-50%);

  span {
    position: relative;
    z-index: 999;
    color: #fff;
  }

  &:before {
    content: "";
    background: #4a154b;
    width: 128px;
    height: 36px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    animation: 2s loadingBefore infinite ease-in-out;
  }

  &:after {
    content: "";
    background: #e01e5a;
    width: 14px;
    height: 60px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.5;

    animation: 2s loadingAfter infinite ease-in-out;
  }
}
</style>
