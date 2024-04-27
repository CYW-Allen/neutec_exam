<template>
  <div class="container" id="modalContainer" :style="`display: ${showModal ? 'flex' : 'none'};`" @click="checkCloseReq">
    <div class="modal bgWhite" id="modal">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <hr>
      <div class="body">
        <slot name="body"></slot>
      </div>
      <hr>
      <div class="footer">
        <button type="button" class="btn bgGray txtBlack" @click="closeModal">Cancel</button>
        <button type="button" class="btn bgBlue txtWhite" @click="execConfirmHandler">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, watch } from 'vue';
import { animateEle } from '../utils/animateHandler';

const showModal = inject('isShow');
const confirmHandler = inject('confirmHandler');

function closeModal() {
  animateEle('#modal', 'zoomOut')
    .then(() => {
      showModal.value = false;
    });
}

function execConfirmHandler() {
  confirmHandler();
  closeModal();
}

function checkCloseReq(event) {
  if (!document.getElementById('modal').contains(event.target)) closeModal()
}

watch(showModal, (v) => {
  if (v) animateEle('#modal', 'zoomIn');
});
</script>

<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal {
  width: 90%;
  height: 80%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.header {
  height: 30px;
  padding: 5px;
  font-weight: bold;
  font-size: large;
}

.body {
  flex-grow: 1;
  padding: 5px;
  overflow: auto;
}

.footer {
  height: 30px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
}
</style>
