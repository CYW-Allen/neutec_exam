<template>
  <div class="jiugongge" ref="jiugongge">
    <div v-for="num in squareNum" :key="`square${num}`" :class="`square ${isGlowing(num) ? 'glowing_square' : ''}`">
    </div>

    <div v-for="ball, index in balls" :key="`ball${index}`" :id="`ball${index}`" class="ball"
      :style="`top: ${ball.startY}%; left: ${ball.startX}%`">
      {{ index + 1 }}
    </div>
  </div>

  <button type="button" class="btn adjustBtn" @click="showAdjustModal = true">Adjust ball</button>

  <ModalComp>
    <template #header>Adjust balls</template>
    <template #body>
      <div class="ballGenerator">
        
      </div>
    </template>
  </ModalComp>
</template>

<script setup>
import { onMounted, ref, provide } from 'vue';
import ModalComp from './ModalComp.vue';

const jiugongge = ref(null)
const squareNum = 9;
const isGlowing = (num) => num === 3 || num === 5 || num === 9;

const balls = ref([
  createBall(15, 13, 81, 13),
  createBall(15, 81, 81, 81),
  createBall(81, 13, 130, 13),
  createBall(81, 81, 130, 81),
]);

const showAdjustModal = ref(false);

function createBall(startX, startY, endX, endY) {
  return { startX, startY, endX, endY };
}

function configBallAnimate(ballId, ballConfig) {
  const { startX, startY, endX, endY } = ballConfig;

  document.getElementById(ballId).animate([
    { top: `${startY}%`, left: `${startX}%` },
    { top: `${endY}%`, left: `${endX}%` }
  ], {
    duration: 1500,
    iterations: Infinity,
    easing: 'ease-out'
  });
}

provide('isShow', showAdjustModal);
provide('confirmHandler', function () { });

onMounted(() => {
  balls.value.forEach((ball, index) => {
    configBallAnimate(`ball${index}`, ball);
  });
});

</script>

<style scoped>
.jiugongge {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  position: relative;
  overflow: hidden;
}

.square {
  height: 100px;
  border: black solid 2px;
  background: radial-gradient(circle, rgba(113, 81, 95, 1) 81%, rgba(0, 0, 0, 1) 100%);
}

.glowing_square {
  animation: glowing 1.5s linear infinite;
}
@keyframes glowing {
  0% {
    opacity: 100%;
  }

  50% {
    opacity: 60%;
  }

  100% {
    opacity: 100%;
  }
}

.ball {
  width: 30px;
  height: 30px;
  background-color: #A5F12B;
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.adjustBtn {
  position: absolute;
  top: 5px;
  left: 5px;
}

.ballGenerator {
  height: 100%;
  display: flex;
  flex-direction: column;
}

</style>
