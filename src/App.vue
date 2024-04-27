<template>
  <div class="appHeader">
    <button type="button" class="btn">
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>
  <div class="appBody">
    <JiugonggeComp />
  </div>
</template>

<script setup>
import JiugonggeComp from './components/JiugonggeComp.vue';

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
