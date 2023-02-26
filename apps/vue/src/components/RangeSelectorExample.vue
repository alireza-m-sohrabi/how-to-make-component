<template>
  <div className={styles['container']}>
    <div className={styles['box-item-container']}>
      <div className={styles['box-item']}></div>
      <div className={styles['box-item']}></div>
      <div className={styles['box-item']}></div>
    </div>

    <ReactRangeSelector></ReactRangeSelector>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'range-selector-example',
});
</script>

<style scoped lang="scss"></style>
