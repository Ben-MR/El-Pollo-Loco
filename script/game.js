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


/**
 * Initializes onload the canvas and the even-listener for mobile play.
 * 
 */
function init() {
    mobilePlay();
    canvas = document.getElementById('canvas');
}

/**
 * Starts the game on button click. 
 * Loads the canvas and removes the start-image.
 * Removes the gameover or gamewon picture after a new start of the game.
 * Initializes the world class and the first level and loads the objects in level1 class.
 * Starts the music. 
 * 
 */
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

/**
 * Listens for keyboard keydown events and updates the custom keyboard state.
 * 
 */
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

 /**
  * Listens for keyboard keyup events and resets the custom keyboard state.
  */
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

/**
 * Listens to the controll-buttons in mobile play and updates or resets the custom keyboard state.
 */
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

/**
 * Turns music and sound-effects on and changes the button.
 */
function musicOn() {
    document.getElementById('musicOn').classList.toggle('d-none');
    document.getElementById('musicOff').classList.toggle('d-none');
    music.play();
    sound = true;  
}

/**
 * Turns music and sound-effects off and changes the button.
 */
function musicOff() {
    document.getElementById('musicOn').classList.toggle('d-none');
    document.getElementById('musicOff').classList.toggle('d-none');
    music.pause();
    sound = false;    
}

/**
 * Enables fullscreen mode for the game canvas and adjusts its dimensions.
 *
 * This function triggers fullscreen mode on the `#canvas-container` element.
 **/
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

/**
 * Requests fullscreen mode for a specific HTML element, with cross-browser support.
 *
 * Tries to use the standard `requestFullscreen()` method,
 * and falls back to vendor-prefixed versions for older browsers (IE, Safari).
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
       element.requestFullscreen() 
    }else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }    
}

/**
 * Exits fullscreen mode, with cross-browser support.
 *
 * Uses the standard `exitFullscreen()` method when available,
 * and falls back to the WebKit-specific version for Safari.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Handles changes to the fullscreen state of the document.
 *
 * This event listener is triggered whenever the browser enters or exits fullscreen mode.
 */
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

/**
 * Reloads the site when the main menu button is clicked after a game. 
 */
function mainMenu() {
    location.reload();
}

/**
 * End all intervals at the end of the game. The intervals were osuhed in intervals-array.
 */
function endGameIntervals() {
    intervals.forEach(id => {
        clearInterval(id);
    });
}

    


