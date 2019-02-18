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
const NUMBERS_IMAGES=[10,11,12,13,14,15,16,17,18,19];


const SCROLL_SPEED=-5;

const PLAYER_RADIUS=12;
const PLAYER_WIDTH=24;
const PLAYER_INIT_X=WIDTH/2-PLAYER_WIDTH/2;
const PLAYER_INIT_Y=HEIGHT/2-PLAYER_WIDTH/2;
const FLY_SPEED=-12;
const GRAVITY=2;

const SCORE_WIDTH=24;
const SCORE_HEIGHT=44;

const NODE_BIAS=1;
const NODE_PIPE_DISTANCE=2;
const NODE_PIPE_UPPER=3;
const NODE_PIPE2_UPPER=4;
const NODE_OUTPUT=0;
const INPUT_SIZE=4;
const STEP_SIZE= 0.1; // The largest increment/decrement when changing the weight of an edge
const NEW_NODE_RATE= 0.6;


const SURVIVOR_RATE=0.5;
const MUTATION_RATE=0.6;


const NUMBER_OF_PLAYERS=30;
const PIPE_WIDTH=52;


