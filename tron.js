/*
    Javascript for Tron Game
    Author: Owen Szabo
    
    Notes:
    The Computer AI is still a work in progress
    Currently the computer AI just mirrors the player
*/

const cvs = document.getElementById("tron");
const ctx = cvs.getContext("2d");

//track position of player
const player = {
    x : [cvs.width/4],
    y : [cvs.height/2],
    size : 10,
    color : "blue"
}

//track position of computer
const computer = {
    x : [(3*cvs.width)/4],
    y : [cvs.height/2],
    size : 10,
    color : "red"
}

//create Rectangle
function drawRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}//end drawRect

//create text
function drawText(text,x,y,color) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text,x,y);
}//end drawText

function render() {
    //clear canvas
    drawRect(0, 0, cvs.width, cvs.height, "BLACK");
    
    //reset coordinate arrays
    player.x = [cvs.width/4];
    player.y = [cvs.height/2];
    computer.x = [(3*cvs.width)/4];
    computer.y = [cvs.height/2]
    
    //set player direction
    direction = [10,0];
    
    //draw user and com starting blocks
    drawRect(player.x[0], player.y[0], player.size, player.size, player.color);
    drawRect(computer.x[0], computer.y[0], computer.size, computer.size, computer.color);
}//end render

render();

function collisionCheck() {
    //edges of canvas
    if (player.x[player.x.length-1] <= 0 || player.y[player.y.length-1] <= 0 || 
       player.x[player.x.length-1]+player.size >= cvs.width || player.y[player.y.length-1]+player.size >= cvs.height) {
        clearInterval(play);
        drawText("COMPUTER WINS", cvs.width/2, cvs.height/2, "WHITE");
    }//end if
    if (computer.x[computer.x.length-1] <= 0 || computer.y[computer.y.length-1] <= 0 || 
       computer.x[computer.x.length-1]+computer.size >= cvs.width || computer.y[computer.y.length-1]+computer.size >= cvs.height) {
        clearInterval(play);
        drawText("PLAYER WINS", cvs.width/2, cvs.height/2, "WHITE");
    }//end if
    
    for(i=0;i<player.x.length;i++) {
        if (player.x[i] === computer.x[computer.x.length-1] &&
           player.y[i] === computer.y[computer.y.length-1]) {
            drawText("PLAYER WINS", cvs.width/2, cvs.height/2, "WHITE");
            clearInterval(play);
        } else if (computer.x[i] === player.x[player.x.length-1] &&
                  computer.y[i] === player.y[player.y.length-1]) {
            drawText("COMPUTER WINS", cvs.width/2, cvs.height/2, "WHITE");
            clearInterval(play);
        } else if (i < player.x.length-1) {
            if (player.x[i] === player.x[player.x.length-1] &&
                  player.y[i] === player.y[player.y.length-1]) {
                drawText("COMPUTER WINS", cvs.width/2, cvs.height/2, "WHITE");
                clearInterval(play);
            } else if (computer.x[i] === computer.x[computer.x.length-1] &&
                  computer.y[i] === computer.y[computer.y.length-1]) {
                drawText("PLAYER WINS", cvs.width/2, cvs.height/2, "WHITE");
                clearInterval(play);
            }//end if chain
        } //end if chain
    }//end i loop
    
}//end collisionCheck

direction = [10,0]; //formatted x,y

document.onkeydown = setDirection;

function setDirection(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        direction[0] = 0; // no change in x
        direction[1] = -player.size; // change in y
    }
    else if (e.keyCode == '40') {
        direction[0] = 0; //no change in x
        direction[1] = player.size; //change in y
    }
    else if (e.keyCode == '37') {
        direction[0] = -player.size; //change in x
        direction[1] = 0; //no change in y
    }
    else if (e.keyCode == '39') {
        direction[0] = player.size; //change in x
        direction[1] = 0; //no change in y
    }//end if chain
} //end setDirection

function game() {
    //adding new coordinates
    player.x.push(player.x[player.x.length-1]+direction[0]);
    computer.x.push(computer.x[computer.x.length-1]-direction[0]);
    player.y.push(player.y[player.y.length-1]+direction[1]);
    computer.y.push(computer.y[computer.y.length-1]-direction[1]);
    
    //drawing new track
    drawRect(player.x[player.x.length-1], player.y[player.y.length-1], player.size, player.size, player.color);
    drawRect(computer.x[computer.x.length-1], computer.y[computer.y.length-1], computer.size, computer.size, computer.color);
    
    //checking player against computer
    collisionCheck();
}//end game

var play;
function beginGame() {
    render();
    const framePerSecond = 10;
    play = setInterval(game,1000/framePerSecond);
}//end beginGame


