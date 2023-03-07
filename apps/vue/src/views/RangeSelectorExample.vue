<template>
  <div class="container">
    <div class="box-item-container">
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
    </div>
    <RangeSelector intersection-element-selector=".box-item" @intersectionChange="($event)=> onIntersectionChange($event)"/>
  </div>
</template>

<script setup lang="ts">
import RangeSelector from "libs/vue/range-selector/src/lib/VueRangeSelector.vue";
import {RangeSelectorIntersectionChangeEvent} from "@how-to-make/shared/range-selector";

const onIntersectionChange = (event: RangeSelectorIntersectionChangeEvent) => {
  if (event.haveIntersection) {
    event.node.classList.add('--active');
  } else {
    event.node.classList.remove('--active');
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding: 16px;
}

.box-item-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-item {
  width: 120px;
  height: 300px;
  background: #e0e0e0;
  margin: 8px;
  opacity: 0.8;
}

.--active {
  background-color: #00BCD4;
}

</style>
