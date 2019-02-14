const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const WIDTH=400;
const HEIGHT=600;

const IMAGES=["bgNight","bgDay", "land", "pipeUp", "pipeDown",
    "pipeRedUp", "pipeRedDown", "birdRed0", "birdBlue0", "birdYellow0",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];


const BG_NIGHT=0;
const BG_DAY=1;
const FLOOR=2;
const GREEN_UP=3;
const GREEN_DOWN=4;
const RED_UP=5;
const RED_DOWN=6;
const BIRD_RED=7;
const BIRD_BLUE=8;
const BIRD_YELLOW=9;

const PLAYER_RADIUS=12;
const PLAYER_WIDTH=24;
const PLAYER_INIT_X=WIDTH/2-PLAYER_WIDTH/2;
const PLAYER_INIT_Y=HEIGHT/2-PLAYER_WIDTH/2;
const FLY_SPEED=-10;
const GRAVITY=2;