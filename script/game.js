let canvas;
let world;
let keyboard = new Keyboard;
let music = new Audio ('./audio/music.mp3');
music.volume = 0.2;
music.loop;
let audio_boss_music = new Audio('./audio/music_fast.mp3');
audio_boss_music.volume = 0.5;
let audio_chicken_angry = new Audio ('./audio/angry-chicken.mp3');
audio_chicken_angry.loop
sounds =[];
sound = true;
keyboardOn = true;
paused = false; 
intervals = [];


function init() {
    mobilePlay();
    canvas = document.getElementById('canvas');
}

function startGame() {
    document.getElementById('startPicture').classList.add('d-none');
    document.getElementById('gameOverPicture').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('canvas-container').classList.remove('d-none');
    document.getElementById('gameWonPicture').classList.add('d-none');   
    document.getElementById('startMobilePicture').classList.add('d-none'); 
    document.getElementById('overlay').classList.add('d-none') 
    initLevel();        
    world = new World (canvas, keyboard);  
    music.play();        
}

document.addEventListener('keydown', event => {
    if (keyboardOn) {
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
    if (keyboardOn) {
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
}

function musicOn() {
    document.getElementById('musicOn').classList.toggle('d-none');
    document.getElementById('musicOff').classList.toggle('d-none');
    music.play();
    sound = true;  
}

function musicOff() {
    document.getElementById('musicOn').classList.toggle('d-none');
    document.getElementById('musicOff').classList.toggle('d-none');
    music.pause();
    sound = false;    
}

function fullScreenOn() {
    let fullscreen = document.getElementById('canvas-container');
    enterFullscreen(fullscreen);
    const canvas = document.getElementById('canvas');
    setTimeout(() => {
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
    }, 100);
    document.getElementById('fullScreenOn').classList.add('d-none');
    document.getElementById('fullScreenOff').classList.remove('d-none');
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
       element.requestFullscreen() 
    }else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }    
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

document.addEventListener("fullscreenchange", () => {
    const canvas = document.getElementById("canvas");
    const isFullscreen = document.fullscreenElement != null;
    if (!isFullscreen) {
        canvas.style.width = '720px';
        canvas.style.height = '480px';
        document.getElementById('fullScreenOn').classList.remove('d-none');
        document.getElementById('fullScreenOff').classList.add('d-none');
    }
});

function mainMenu() {
    location.reload();
}

function endGameIntervals() {
    intervals.forEach(id => {
        clearInterval(id);
    });
}

document.addEventListener('keypress', event => {
    if (event.code === 'KeyP') {
     
    }
});
    


