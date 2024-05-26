<template>
  <div class="container" id="sideMenuContainer" :style="`left: ${showSideMenu ? '50%' : '100%'}`">
    <div class="dropDown">
      <select name="dataList" v-model="selected">
        <option value="root" disabled>Choose an option</option>
        <option v-for="opt, i in dropDownList" :key="`opt${i}`" :value="opt.dir">{{ opt.text }}</option>
      </select>
    </div>
    
    <div class="dataList" id="lv0root">
      <DataItem v-if="dataTable !== null" />
    </div>
  </div>
</template>

<script setup>
import { inject, watch, ref, provide } from 'vue';
import { animateEle } from '../utils/animateHandler';
import DataItem from './DataItem.vue';

const showSideMenu = inject('showSideMenu');
const dataList = inject('dataList');

const clientRecord = window.localStorage.getItem('expendList') || 'root';
const expanded = ref(clientRecord.split(','));
const dataTable = ref(null);
const dropDownList = ref([]);
const selected = ref(clientRecord);

function expandList(data, level) {
  expanded.value[level] = data.key;
  expanded.value.splice(level + 1);
  
  const expandedStr = expanded.value.join(',');

  window.localStorage.setItem('expendList', expanded.value.join(','));
  selected.value = expandedStr;
};

provide('expanded', expanded);
provide('expandList', expandList);
provide('dataTable', dataTable);

watch(dataList, (v) => {
  const list = [];
  const table = Object.create(null);
  const nextVisit = [{ dir: 'root', items: v.slice() }];

  while (nextVisit.length) {
    const { dir, items } = nextVisit.pop();
    
    table[dir] = items.map((item) => ({ key: item.key, text:item.text }));
    items.forEach((item) => {
      const curDir = `${dir},${item.key}`;

      list.push({ dir: curDir, text: item.text });
      if (item.children instanceof Array) {
        nextVisit.push({
          dir: curDir,
          items: item.children.slice(),
        });
      }
    });
  }

  dataTable.value = table;
  dropDownList.value = list;
});

watch(showSideMenu, (v) => {
  if (v) animateEle('#sideMenuContainer', 'slideInRight');
});

watch(selected, (v) => {
  expanded.value = v.split(',');
  window.localStorage.setItem('expendList', v);
});
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background-color: black;
  overflow: auto;
}

.dataList {
  color: white;
  
}

.dataList:hover {
  cursor: pointer;
}


</style>