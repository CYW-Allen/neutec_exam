<template>
  <ul class="dataList">
    <li v-for="data of dataList" :key="data.key" :class="{ expanded: expanded[levelNum] === data.key }"
      @click.stop="expandList(data, levelNum)">
      <div class="dataText">{{ data.text }}</div>
      <DataItem v-if="expanded[levelNum] === data.key && data.children instanceof Array" :data-list="data.children"
        :level-num="levelNum + 1" />
    </li>
  </ul>
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
}

.dataList ul,
.dataList li {
  list-style-type: none;
  margin: 10px;
  text-wrap: nowrap;
}

.dataList li {
  padding: 5px;
}

.dataList li:hover {
  cursor: pointer;
}

.dataList li.expanded {
  background-color: rgb(150, 150, 150);
}

.dataList li.expanded {
  color: yellow;
}

.dataText {
  padding-left: 5px;
}
</style>