let canvas;
let world;
let keyboard = new Keyboard;
let music = new Audio ('./audio/music.mp3');
music.volume = 0.2;

function init() {
    mobilePlay();
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

function mobilePlay() {
    document.getElementById('buttonLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('buttonLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('buttonRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('buttonRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('buttonJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('buttonJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('buttonThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.CTRLL = true;
    });

    document.getElementById('buttonThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.CTRLL = false;
    });
}

function musicOn() {
    document.getElementById('musicOn').classList.toggle('d-none');
    document.getElementById('musicOff').classList.toggle('d-none');
    music.play();
}

function musicOff() {
    document.getElementById('musicOn').classList.toggle('d-none');
    document.getElementById('musicOff').classList.toggle('d-none');
    music.pause();
}

function fullScreenOn() {
    canvas.requestFullscreen();
}
