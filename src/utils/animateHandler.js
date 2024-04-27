export function animateEle(element, animation) {
  return new Promise((resolve, reject) => {
    const animationClasses = ['animate__animated', `animate__${animation}`];
    const targetEle = document.querySelector(element);

    function removeAnimateClass(event) {
      event.stopPropagation();
      targetEle.classList.remove(...animationClasses);
      resolve();
    }

    targetEle.classList.add(...animationClasses);
    targetEle.addEventListener('animationend', removeAnimateClass, { once: true });
  });
}

export function configBallAnimate(ballId, ballConfig) {
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