<template>
  <div class="dataList">
    <div v-for="data of dataList" :key="data.key" :class="{ expanded: expanded[levelNum] === data.key }"
      @click.stop="expandList(data, levelNum)">
      <div class="dataText">{{ data.text }}</div>
      <DataItem v-if="expanded[levelNum] === data.key && data.children instanceof Array" :data-list="data.children"
        :level-num="levelNum + 1" />
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps({
  dataList: Array,
  levelNum: Number,
});

const expanded = inject('expanded');
const expandList = inject('expandList');

</script>

<style scoped>
.dataList {
  color: white;
  padding-left: 10px;
}

.dataList:hover {
  cursor: pointer;
}

.dataList .expanded {
  background-color: rgb(150, 150, 150);
  color: yellow;
}

.dataText {
  padding: 10px;
}
</style>