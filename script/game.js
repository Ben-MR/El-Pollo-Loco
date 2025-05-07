let canvas;
let world;
let keyboard = new Keyboard;

function init() {
    // canvas = document.getElementById('canvas');
    // world = new World (canvas, keyboard);  
}

function startGame() {
    document.getElementById('startPicture').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World (canvas, keyboard);  
}

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
      keyboard.SPACE = true;
    }
    if (event.code === 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (event.code === 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (event.code === 'ArrowUp') {
        keyboard.UP = true;
    }
    if (event.code === 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (event.code === 'ControlLeft') {
        keyboard.CTRLL = true;
    }
    if (event.code === 'KeyP') {
        keyboard.P = true;
    }
  }) 

  document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      keyboard.SPACE = false;
    }
    if (event.code === 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (event.code === 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (event.code === 'ArrowUp') {
        keyboard.UP = false;
    }
    if (event.code === 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (event.code === 'ControlLeft') {
        keyboard.CTRLL = false;
    }
    if (event.code === 'KeyP') {
        keyboard.P = false;
    }
  }) 