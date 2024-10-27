// Music Playing
let flag = false;
const audio = document.getElementById('backgroundMusic');
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    audio.play().catch(error => {
      console.error("播放音乐失败:", error);
      flag = true
    });
  } else {
    audio.pause();
  }
});
window.onload = () => {
  audio.play().catch(error => {
    console.error("播放音乐失败:", error);
    flag = true;
  });
};

let interval = setInterval(() => {
  if (flag) {
    audio.play().catch(error => {
      console.error("播放音乐失败:", error);
      flag = true;
    });
    flag = false;
  } else {
    clearInterval(interval);
    interval = null;
  }
}, 1000)

let movingElement = document.querySelector('.bg-font');
let speedX = 1;
let speedY = 1;

function getElementPos() {
  posX = movingElement.offsetLeft;
  posY = movingElement.offsetTop;
  movingElement = document.querySelector('.bg-font');
  speedX = 1;
  speedY = 1;
  moveElement();
}

function moveElement() {
  posX += speedX;
  posY += speedY;

  if (posX <= 0 || posX >= window.innerWidth - movingElement.children[0].clientWidth) {
    speedX = -speedX;
  }
  if (posY <= 0 || posY >= window.innerHeight - movingElement.children[0].clientHeight) {
    speedY = -speedY;
  }

  movingElement.style.left = `${posX}px`;
  movingElement.style.top = `${posY}px`;

  requestAnimationFrame(moveElement); // recursive call
}

function initMove() {
  getElementPos();
}

initMove();

window.addEventListener('resize', initMove);

// Drag items
function makeElementDraggable(element) {
  let offsetX = 0, offsetY = 0, startX = 0, startY = 0;
  element.onmousedown = function (event) {
    event.preventDefault();
    startX = event.clientX;
    startY = event.clientY;
    document.onmousemove = dragElement;
    document.onmouseup = stopDragging;
  };
  function dragElement(event) {
    offsetX = event.clientX - startX;
    offsetY = event.clientY - startY;
    startX = event.clientX;
    startY = event.clientY;
    element.style.left = (element.offsetLeft + offsetX) + "px";
    element.style.top = (element.offsetTop + offsetY) + "px";
  }
  function stopDragging() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
const draggableElements = document.querySelectorAll('.draggable');
draggableElements.forEach(makeElementDraggable);