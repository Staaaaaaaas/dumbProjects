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
let button;
let mute = true;
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
        button.elt.innerHTML = "MUTE";
    }
    else button.elt.innerHTML = "UNMUTE";
    mute = !mute;
}

function setup() {
    button = createButton('UNMUTE');
    createCanvas(800, 800);
    textSize(32); 
    button.mousePressed(toggleMute);
}
let emojis = [];
for(let i=0; i<10;i++){
    emojis.push(new Emoji("⛰️"));
    emojis.push(new Emoji("🧻"));
    emojis.push(new Emoji("✂️"));
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