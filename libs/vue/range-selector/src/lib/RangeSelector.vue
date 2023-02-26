<template>
  <Teleport to="body">
    <div class="container" v-if="show"></div>
  </Teleport>
</template>

<script setup lang="ts">
import {extendRectangle, RectangleCoordinate, RectanglePointPosition} from "@how-to-make/shared/range-selector";
import {useRef} from "react";
import {onMounted, onUnmounted} from "vue";

const show = useRef(false);
const rectangleCoordinate = useRef<RectangleCoordinate>()
let fixedPoint: RectanglePointPosition | undefined;

function onMouseDown() {
  function onMouseUp() {
    clear();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(event: { pageX: number, pageY: number }) {
    const {pageX, pageY} = event;

    if (fixedPoint) {
      rectangleCoordinate.current = extendRectangle(fixedPoint, {left: pageX, top: pageY});

    } else {
      fixedPoint = {top: pageY, left: pageX};
      show.current = true;
    }
  }

  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('mousemove', onMouseMove);
}

function clear() {
  show.current = false;
  fixedPoint = undefined;
}

onMounted(() => {
  window.addEventListener('mousedown', onMouseDown);
});

onUnmounted(() => {
  window.removeEventListener('mousedown', onMouseDown);
  clear();
});

</script>

<style module>
.container {
  box-shadow: 0 0 5px rgb(0 0 0 / 10%);
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid #d4d4d4;
  pointer-events: none;
  position: fixed;
  z-index: 500;
}
</style>
