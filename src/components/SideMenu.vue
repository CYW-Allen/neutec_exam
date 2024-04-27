<template>
  <div class="container" id="sideMenuContainer" :style="`left: ${showSideMenu ? '50%' : '100%'}`">
    <div class="dropDown">
      <select name="dataList" v-model="selected">
        <option value="">Choose an option</option>
        <option v-for="opt, i in dropDownList" :key="`opt${i}`" :value="opt.dir">{{ opt.text }}</option>
      </select>
    </div>
    
    <DataItem :data-list="dataList" :level-num="0" />
  </div>
</template>

<script setup>
import { inject, watch, ref, provide, computed } from 'vue';
import { animateEle } from '../utils/animateHandler';
import DataItem from './DataItem.vue';

const showSideMenu = inject('showSideMenu');
const dataList = inject('dataList');

const clientRecord = window.localStorage.getItem('expendList') || '';
const expanded = ref(clientRecord.split(','));
const dropDownList = computed(() => {
  const list = [];
  const nextVisit = [{ dir: '', items: dataList.value.slice() }];

  while (nextVisit.length) {
    const { dir, items } = nextVisit.pop();

    items.forEach((item) => {
      const curDir = `${dir !== '' ? `${dir},` : ''}${item.key}`

      list.push({ dir: curDir, text: item.text });
      if (item.children instanceof Array) {
        nextVisit.push({
          dir: curDir,
          items: item.children.slice(),
        });
      }
    });
  }

  return list;
});
const selected = ref(clientRecord);

function expandList(data, level) {
  expanded.value[level] = data.key;
  expanded.value.splice(level + 1);
};

provide('expanded', expanded);
provide('expandList', expandList);

watch(showSideMenu, (v) => {
  if (v) animateEle('#sideMenuContainer', 'slideInRight');
});

watch(expanded, (v) => {
  const listStr = v.join(',');

  if (listStr !== selected.value) selected.value = listStr;
  window.localStorage.setItem('expendList', listStr);
}, { deep: true });

watch(selected, (v) => {
  expanded.value = v.split(',');
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
</style>