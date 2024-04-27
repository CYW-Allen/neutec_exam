<template>
  <div class="jiugongge" ref="jiugongge">
    <div v-for="num in squareNum" :key="`square${num}`" :class="`square ${isGlowing(num) ? 'glowing_square' : ''}`">
    </div>

    <div v-for="ball, index in balls" :key="`ball${index}`" :id="`ball${index}`" class="ball"
      :style="`top: ${ball.startY}%; left: ${ball.startX}%`">
      {{ index }}
    </div>
  </div>

  <button type="button" class="btn adjustBtn" @click="showAdjustModal = true">Adjust ball</button>

  <ModalComp>
    <template #header>Adjust balls</template>
    <template #body>
      <div class="ballGenerator">
        <div class="inputGroup">
          <label for="ballNum" style="margin: auto 5px;">Numbers: </label>
          <i class="fa-solid fa-minus iconBtn" @click="adjustBallNum(-1)"></i>
          <input type="range" id="ballNum" min="0" max="100" v-model.number="newBallNum" style="flex-grow: 1;">
          <i class="fa-solid fa-plus iconBtn" @click="adjustBallNum(1)"></i>
          <div id="rangeVal" style="margin: auto 5px;">{{ newBallNum }}</div>
        </div>

        <div class="newBallList">
          <div v-for="newBall, index in newBallList" :key="`newBall${index}`" class="ballConfigRow">
            <div>{{ `[${index}]` }}</div>
            <div class="inputGroup">
              <label :for="`newBall${index}sX`">sX: </label>
              <input type="text" :id="`newBall${index}sX`" v-model="newBall.startX" />
            </div>
            <div class="inputGroup">
              <label :for="`newBall${index}sY`">sY: </label>
              <input type="text" :id="`newBall${index}sY`" v-model="newBall.startY" />
            </div>
            <div class="inputGroup">
              <label :for="`newBall${index}eX`">eX: </label>
              <input type="text" :id="`newBall${index}eX`" v-model="newBall.endX" />
            </div>
            <div class="inputGroup">
              <label :for="`newBall${index}endX`">eY: </label>
              <input type="text" :id="`newBall${index}eY`" v-model="newBall.endY" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </ModalComp>
</template>

<script setup>
import { onMounted, ref, provide, watch } from 'vue';
import ModalComp from './ModalComp.vue';
import { configBallAnimate } from '../utils/animateHandler';

const RANDOM_NUM_LIMIT = 100;
const jiugongge = ref(null)
const squareNum = 9;
const isGlowing = (num) => num === 3 || num === 5 || num === 9;

const balls = ref([
  createBall(15, 13, 81, 13),
  createBall(15, 81, 81, 81),
  createBall(81, 13, 130, 13),
  createBall(81, 81, 130, 81),
]);
const newBallNum = ref(0);
const newBallList = ref([]);

const showAdjustModal = ref(false);

function createBall(startX, startY, endX, endY) {
  return { startX, startY, endX, endY };
}

function generateBallCoord() {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * RANDOM_NUM_LIMIT));
}

function adjustBallNum(val) {
  const newVal = newBallNum.value + val;

  if (newVal >= 0 && newVal <= 100) {
    newBallNum.value = newVal;
  }
}

function sanitizeBallCoord() {
  newBallList.value = newBallList.value.map((ball) => ({
    startX: isNaN(ball.startX) ? 0 : ball.startX,
    endX: isNaN(ball.endX) ? 0 : ball.endX,
    startY: isNaN(ball.startY) ? 0 : ball.startY,
    endY: isNaN(ball.endX) ? 0 : ball.endX,
  }));
}

provide('isShow', showAdjustModal);
provide('confirmHandler', function () {
  sanitizeBallCoord();
  balls.value = newBallList.value.slice();
});

onMounted(() => {
  balls.value.forEach((ball, index) => {
    configBallAnimate(`ball${index}`, ball);
  });
});

watch(newBallNum, (v) => {
  newBallList.value = Array.from({ length: v }, () => (
    createBall(...generateBallCoord())
  ))
});

watch(balls, (v) => {
  v.forEach((ball, index) => {
    configBallAnimate(`ball${index}`, ball);
  });
}, { flush: 'post' });
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

.inputGroup {
  display: flex;
  flex-direction: row;
}

.iconBtn {
  margin: auto 3px;
  cursor: pointer;
}

.newBallList {
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.ballConfigRow {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 5px auto;
}

.newBallList input[type="text"] {
  max-width: 50px;
}

</style>
