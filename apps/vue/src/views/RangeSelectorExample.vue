<template>
  <div class="container">
    <div class="box-item-container">
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
    </div>
    <RangeSelector />
  </div>
</template>

<script setup lang="ts">
import RangeSelector from "libs/vue/range-selector/src/lib/VueRangeSelector.vue";


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

</style>
