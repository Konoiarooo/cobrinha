class Game{
    size = 20;
    canvasLimitInitialX = 0;
    canvasLimitX = 990;
    canvasLimitInitialY = 0;
    canvasLimitY = 490;
    currentPosFruitX = Math.floor(Math.random() * this.canvasLimitX + this.size);
    currentPosFruitY = Math.floor(Math.random() * this.canvasLimitY + this.size);
    score = 0;
    currentKeyPressed = "";
    lastKeyPressed = this.currentKeyPressed;
    timerInterval;
    currentTime = 0;
    maxTime = 99999;
    currentPointsPerFruit = 1
    backgroudAudio;
    finish = false;
    image = new Image();
    
    updateScore(quantity){
        this.score += quantity;
    }

    collectFruits(scoreDocument, player){
        let playerPosMinX = player.currentPosX;
        let playerPosMaxX = player.currentPosX + player.size;
        let playerPosMinY = player.currentPosY;
        let playerPosMaxY = player.currentPosY + player.size;
    
        let fruitPosXCollision = this.currentPosFruitX + (this.size / 2);
        let fruitPosYCollision = this.currentPosFruitY + (this.size / 2);
    
        if(fruitPosXCollision >= playerPosMinX && fruitPosXCollision <= playerPosMaxX 
            && fruitPosYCollision >= playerPosMinY && fruitPosYCollision <= playerPosMaxY && !player.isCollected){
                player.isCollected = true;
                player.addLength(this.currentPointsPerFruit);
                this.updateScore(this.currentPointsPerFruit);
                scoreDocument.innerText = `TOTAL COLETADO - ${this.score}`;
                const collectCoin = new Audio("../audios/collect-coin.mp3")
                collectCoin.play();

                this.currentPosFruitX = Math.floor(Math.random() * (this.canvasLimitX - this.size) + (this.size / 2));
                this.currentPosFruitY = Math.floor(Math.random() * (this.canvasLimitY - this.size) + (this.size / 2));
                player.isCollected = false;
            }
    }

    updateFruits(ctx){
        ctx.fillStyle = "red";
        // this.image.src = "../images/maca.png";
        // ctx.drawImage(this.image, this.currentPosFruitX, this.currentPosFruitY, this.size, this.size)
        ctx.fillRect(this.currentPosFruitX, this.currentPosFruitY, this.size, this.size)
    }

    timer(){
        const documentTimeSpan = document.getElementById('current-time');
        this.timerInterval = setInterval(() => {
            this.currentTime++; 
            documentTimeSpan.innerText = this.currentTime
        }, 1000)
    }

    playBackgroudAudio(){
        this.backgroudAudio = new Audio("../audios/game-music-player-console-8bit-background-intro-theme-297305.mp3");
        this.backgroudAudio.play();
        this.backgroudAudio.loop = true;
        this.backgroudAudio.volume = 0.3;
    }

    gameOver(player){
        player.playerHistoricPos = []
        this.backgroudAudio.pause()
        this.finish = true;
        clearInterval(this.timerInterval)
        
        const gameOverOverlay = document.getElementById("game-stats");
        const playerUsername = document.getElementById("game-stats-username");
        const playerScore = document.getElementById("game-stats-score");
        const playerCurrentTime = document.getElementById("game-stats-time");
        const statsInGame = document.getElementById("stats-in-game");

        statsInGame.style.visibility = "hidden"
        gameOverOverlay.style.visibility = "visible"
        playerUsername.innerText = player.userName;
        playerScore.innerText = `Pontuação - ${this.score}`;
        playerCurrentTime.innerText = `Tempo - ${this.currentTime}`;
    }

    gameStart(userDoc, statsInGameDoc, animate){
        userDoc.style.visibility = "hidden"
        statsInGameDoc.style.visibility = "visible"
        this.playBackgroudAudio();
        this.timer();
    
        animate();
    }

    restartGame(player){
        this.finish = false;
        player.death = false;
        this.score = 0;
        this.currentTime = 0;
        player.playerLength = 1;
        player.playerHistoricPos = [{ posX: player.firstPosX, posY: player.firstPosY}];
        player.currentPosX = player.firstPosX;
        player.currentPosY = player.firstPosY;
        this.playBackgroudAudio();
        const gameOverOverlay = document.getElementById("game-stats");
        const statsInGame = document.getElementById("stats-in-game");
        gameOverOverlay.style.visibility = "hidden";
        statsInGame.style.visibility = "visible"
        this.timer();
    }
}

export default Game;