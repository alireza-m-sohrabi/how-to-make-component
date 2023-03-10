<template>
  <Teleport to="body">
    <div class="container" v-if="show" :style="styleObject"></div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  extendRectangle, handleHavingIntersection, RangeSelectorEvents, RangeSelectorIntersectionChangeEvent,
  RangeSelectorProps,
  RectangleCoordinate,
  RectanglePointPosition
} from "@how-to-make/shared/range-selector";
import {onMounted, onUnmounted, ref} from "vue";

/* eslint-disable-next-line */

const props = defineProps<{
  boundary?: HTMLElement,
  intersectionElementSelector: string;
}>();
const emit = defineEmits<{
  intersectionChange: (event: RangeSelectorIntersectionChangeEvent) => void;
}>();


debugger
let fixedPoint: RectanglePointPosition | undefined;
const show = ref(false);
const styleObject = ref<RectangleCoordinate<string>>();
let handleIntersectionWhenAreaGrows: (growingArea: RectangleCoordinate) => void | undefined;

function onMouseDown() {

  function onMouseUp() {
    clear();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(event: { pageX: number, pageY: number }) {
    const {pageX, pageY} = event;


    if (fixedPoint) {
      const coordinate = extendRectangle(fixedPoint, {left: pageX, top: pageY});
      handleIntersectionWhenAreaGrows?.(coordinate);

      if (coordinate) {
        styleObject.value = {
          height: coordinate.height + 'px',
          width: coordinate.width + 'px',
          top: coordinate.top + 'px',
          left: coordinate.left + 'px'
        }
      }

    } else {
      fixedPoint = {top: pageY, left: pageX};
      show.value = true;
    }
  }

  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('mousemove', onMouseMove);
}

function clear() {
  show.value = false;
  fixedPoint = undefined;
  styleObject.value = undefined;
}

onMounted(() => {
  window.addEventListener('mousedown', onMouseDown);
  if (props.intersectionElementSelector) {
    const intersection = document.querySelectorAll(props.intersectionElementSelector);

    if (intersection) {
      handleIntersectionWhenAreaGrows = handleHavingIntersection(intersection, (event: RangeSelectorIntersectionChangeEvent) => {
        emit('intersectionChange', event);
      })
    }

  }
});

onUnmounted(() => {
  window.removeEventListener('mousedown', onMouseDown);
  clear();
});

</script>

<style scoped lang="scss">
.container {
  box-shadow: 0 0 5px rgb(0 0 0 / 10%);
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid #d4d4d4;
  pointer-events: none;
  position: fixed;
  z-index: 500;
}
</style>
