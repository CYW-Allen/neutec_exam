<template>
  <div class="container" id="sideMenuContainer" :style="`left: ${showSideMenu ? '50%' : '100%'}`">
  </div>
</template>

<script setup>
import { inject, watch } from 'vue';
import { animateEle } from '../utils/animateHandler';

const showSideMenu = inject('showSideMenu');

watch(showSideMenu, (v) => {
  if (v) animateEle('#sideMenuContainer', 'slideInRight');
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