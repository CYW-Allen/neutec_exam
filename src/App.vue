<template>
  <div class="appHeader" @click="closeSideMenu">
    <button type="button" class="btn"  @click.stop="showSideMenu = true">
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>

  <div class="appBody" @click="closeSideMenu">
    <JiugonggeComp />
  </div>

  <SideMenu />
</template>

<script setup>
import { ref, provide } from 'vue';
import axios from 'axios';
import JiugonggeComp from './components/JiugonggeComp.vue';
import SideMenu from './components/SideMenu.vue';
import { animateEle } from './utils/animateHandler';

const showSideMenu = ref(false);
const DATA_URL = 'data.json';
const dataList = ref([]);

function closeSideMenu() {
  if (showSideMenu.value) {
    animateEle('#sideMenuContainer', 'slideOutRight')
      .then(() => {
        showSideMenu.value = false;
      });
  }
}

async function getData() {
  try {
    const resp = (await axios.get(DATA_URL)).data;
    if (resp instanceof Array) dataList.value = resp;
  } catch (err) {
    console.log(err);
  }
}

provide('showSideMenu', showSideMenu);
provide('dataList', dataList);

getData();
</script>

<style scoped>
.appHeader {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding: 5px;
}

.appBody {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  padding: 5px;
}
</style>
