class Emoji {
    constructor(emoji) {
        this.emoji = emoji;
        this.xStep = Math.random()*800;
        this.yStep = Math.random()*800;
    }
    move() {
        let xNoise = noise(this.xStep);
        this.x = map(xNoise, 0, 1, 0, width);
        let yNoise = noise(this.yStep);
        this.y = map(yNoise, 0, 1, 0, height);
        this.xStep += 0.007;
        this.yStep += 0.004;
    }
    show() {
        text(this.emoji, this.x, this.y);
    }
}
let rockSound;
let paperSound;
let scissorsSound;
let muteButton;
let restartButton;
let mute = true;
let emojis;
let slider;
function preload() {
    soundFormats('mp3');
    rockSound = loadSound("assets/rock");
    paperSound = loadSound("assets/paper");
    scissorsSound = loadSound("assets/scissors");
    rockSound.setVolume(0.1);
    paperSound.setVolume(0.1);
    scissorsSound.setVolume(0.1);
}

function toggleMute() {
    if(mute){
        muteButton.elt.innerHTML = "MUTE";
    }
    else muteButton.elt.innerHTML = "UNMUTE";
    mute = !mute;
}

function restartGame(){
    emojis = [];
    for(let i=0; i<slider.value();i++){ 
        emojis.push(new Emoji("⛰️"));
        emojis.push(new Emoji("🧻"));
        emojis.push(new Emoji("✂️"));
    }
}




function setup() {    
    muteButton = createButton('UNMUTE');
    restartButton = createButton('RESTART');
    slider = createSlider(1, 20, 10, 1);
    createCanvas(800, 800);
    textSize(32); 
    muteButton.mousePressed(toggleMute);
    restartButton.mousePressed(restartGame);
    restartGame();
}

function draw() {
    background(255)
    emojis.forEach(emoji => {
        emoji.move();
        emoji.show();
    });
    emojis.forEach(emoji1 => {
        emojis.forEach(emoji2 =>{
            if(emoji1.emoji == emoji2.emoji){
                return true;
            }
            if((emoji1.x < emoji2.x && emoji1.x + textWidth(emoji1.emoji) > emoji2.x) && 
               (emoji1.y < emoji2.y && emoji1.y + 32 > emoji2.y)){
                if(emoji1.emoji == "⛰️" && emoji2.emoji == "✂️") {
                    emoji2.emoji = "⛰️";
                    if(!mute) rockSound.play();
                }
                if(emoji1.emoji == "🧻" && emoji2.emoji == "⛰️") {
                    emoji2.emoji = "🧻";
                    if(!mute)paperSound.play();
                }
                if(emoji1.emoji == "✂️" && emoji2.emoji == "🧻") {
                    emoji2.emoji = "✂️";
                    if(!mute) scissorsSound.play();
                }
            }
        });
    });

}