let canvas;
let world;
let keyboard = new Keyboard;
let music = new Audio ('./audio/music.mp3');
music.volume = 0.2;

function init() {
    
}

function startGame() {
    document.getElementById('startPicture').classList.add('d-none');
    document.getElementById('gameOverPicture').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('canvas-container').classList.remove('d-none');
    document.getElementById('gameWonPicture').classList.add('d-none');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World (canvas, keyboard);  
    music.play();
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

function fullScreenOn() {
    canvas.requestFullscreen();
}
