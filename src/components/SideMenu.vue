<template>
  <div class="container" id="sideMenuContainer" :style="`left: ${showSideMenu ? '50%' : '100%'}`">
    <DataItem :data-list="dataList" :level-num="0" />
  </div>
</template>

<script setup>
import { inject, watch, ref, provide } from 'vue';
import { animateEle } from '../utils/animateHandler';
import DataItem from './DataItem.vue';

const showSideMenu = inject('showSideMenu');
const dataList = inject('dataList');

const clientRecord = window.localStorage.getItem('expendList') || '';
const expanded = ref(clientRecord.split(','));

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
  window.localStorage.setItem('expendList', v.join(','));
}, { deep: true });

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