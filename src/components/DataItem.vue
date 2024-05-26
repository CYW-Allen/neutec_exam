<template>
  <div v-for="item, index in expanded">
    <Teleport  :to="`#lv${index}${item}`">
      <div v-for="lvItem in dataTable[expanded.slice(0, index + 1).toString()]" :key="`${item}-${lvItem.key}`"
        :id="`lv${index + 1}${lvItem.key}`" :class="{ expanded: expanded[index + 1] === lvItem.key }"
        :style="`padding-left: ${(index + 1) * 5}px;`" @click.stop="expandList(lvItem, index + 1)">
        <div class="paddingEle" :style="expanded[index + 1] === lvItem.key ? 'color:yellow' : ''">{{ lvItem.text }}</div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const expanded = inject('expanded');
const expandList = inject('expandList');
const dataTable = inject('dataTable');

</script>

<style scoped>
.dataList .expanded {
  background-color: rgb(150, 150, 150);
}
.paddingEle {
  padding: 10px;
}
</style>