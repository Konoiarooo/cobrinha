const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

import Player from '../classes/player.js';
import Game from '../classes/game.js';

const firstPosX = 490;
const firstPosY = 240;

const player = new Player(
    Math.floor(Math.random() * 1000), 
    firstPosX,
    firstPosY,
    );

const scoreDocument = document.getElementById('score');
const game = new Game();

function updatePlayer(){
    ctx.fillStyle = player.mainColor;
    if(game.finish) {
        for (let index = 0; index < player.playerLength; index++) {
            // let image = player.headImage;
            // if(index !== 0){
            //     image = player.bodyImage;
            // }
            // ctx.drawImage(image, player.playerActualPos[index].posX, player.playerActualPos[index].posY, player.size, player.size);
            ctx.fillRect(player.playerActualPos[index].posX, player.playerActualPos[index].posY, player.size, player.size)
        }
        return;
    }

    player.draw(ctx);

    if(player.verifySelfCollision() && !player.death && !game.finish){
        player.gameOver();
        game.gameOver(player);
        return;
    }

    if(game.currentKeyPressed === "a" || game.currentKeyPressed === "ArrowLeft"){
        if(game.lastKeyPressed === "d" || game.currentKeyPressed === "ArrowRight"){
            if(player.currentPosX >= game.canvasLimitX){
                reflection(game.lastKeyPressed)
                return;
            }

            game.lastKeyPressed = "d"
            player.currentPosX = player.currentPosX + player.pixelsMovement;
            player.headImage.src = "./images/cabeca-cobra2-right.png";
        }
        else{
            if(player.currentPosX <= game.canvasLimitInitialX - (player.size / 2)){
                reflection(game.currentKeyPressed)
                return;
            }

            game.lastKeyPressed = "a"
            player.currentPosX = player.currentPosX - player.pixelsMovement;
            player.headImage.src = "./images/cabeca-cobra2-left.png";
        }
    }
    else if(game.currentKeyPressed === "w" || game.currentKeyPressed === "ArrowUp"){
        if(game.lastKeyPressed === "s" || game.currentKeyPressed === "ArrowDown"){
            if(player.currentPosY >= game.canvasLimitY){
                reflection(game.lastKeyPressed)
                return;
            }

            game.lastKeyPressed = "s"
            player.currentPosY = player.currentPosY + player.pixelsMovement;  
            player.headImage.src = "./images/cabeca-cobra2-down.png";
        } 
        else
        {
            if(player.currentPosY <= game.canvasLimitInitialY - (player.size / 2)){
                reflection(game.currentKeyPressed)
                return;
            }

            game.lastKeyPressed = "w"
            player.currentPosY = player.currentPosY - player.pixelsMovement;   
            player.headImage.src = "./images/cabeca-cobra2.png";
        }
    }
    else if(game.currentKeyPressed === "s" || game.currentKeyPressed === "ArrowSown"){
        if(game.lastKeyPressed === "w" || game.currentKeyPressed === "ArrowUp"){
            if(player.currentPosY <= game.canvasLimitInitialY - (player.size / 2)){
                reflection(game.lastKeyPressed)
                return;
            }

            game.lastKeyPressed = "w"
            player.currentPosY = player.currentPosY - player.pixelsMovement;  
            player.headImage.src = "./images/cabeca-cobra2.png";
        }
        else
        {
            if(player.currentPosY >= game.canvasLimitY){
                reflection(game.currentKeyPressed)
                return;
            }

            game.lastKeyPressed = "s"
            player.currentPosY = player.currentPosY + player.pixelsMovement;  
            player.headImage.src = "./images/cabeca-cobra2-down.png";
        }
    }
    else if(game.currentKeyPressed === "d" || game.currentKeyPressed === "ArrowRight"){
        if(game.lastKeyPressed === "a" || game.currentKeyPressed === "ArrowLeft"){
            if(player.currentPosX <= game.canvasLimitInitialX - (player.size / 2)){
                reflection(game.lastKeyPressed)
                return;
            }

            game.lastKeyPressed = "a"
            player.currentPosX = player.currentPosX - player.pixelsMovement;  
            player.headImage.src = "./images/cabeca-cobra2-left.png";
        }
        else{
            if(player.currentPosX >= game.canvasLimitX){
                reflection(game.currentKeyPressed)
                return;
            }
            
            game.lastKeyPressed = "d"
            player.currentPosX = player.currentPosX + player.pixelsMovement;  
            player.headImage.src = "./images/cabeca-cobra2-right.png";
        }
    }
}

function reflection(key){
    if(key === "a"){
        player.currentPosX = game.canvasLimitX;  
    }
    else if(key === "d"){
        player.currentPosX = game.canvasLimitInitialX  
    }
    else if(key === "w"){
        player.currentPosY = game.canvasLimitY;  
    }
    else if(key === "s"){
        player.currentPosY = game.canvasLimitInitialY;  
    }
}

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "greenyellow"
    ctx.fillRect(0, 0, 1000, 500)
    
    if(game.currentTime >= game.maxTime)
        clearInterval(game.timerInterval)

    updatePlayer();
    
    player.updatePos();
    game.collectFruits(scoreDocument, player);
    game.updateFruits(ctx)
}

const menu = document.getElementById("hud-modal-initial");
window.addEventListener("keypress", ({key}) =>{
    if(key === "r" && game.finish && player.death){
        game.restartGame(player);
    }

    if(key !== "a" && key !== "s" && key !== "d" && key !== "w" &&
        key !== "ArrowLeft" && key !== "ArrowRight" && key !== "ArrowUp" && key !== "ArrowDown")
        return;

    game.currentKeyPressed = key;
})
menu.addEventListener("submit", e => {
    e.preventDefault();
    
    const statsInGame = document.getElementById("stats-in-game");
    const username = document.getElementById("username-input").value;
    const color = document.getElementById("color-player").value;
    player.setOptions(username, color || "blue")
    game.gameStart(menu, statsInGame, animate)
})