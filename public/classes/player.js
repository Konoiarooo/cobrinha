class Player{
    constructor(
        id,
        firstPosX,
        firstPosY){
            this.id = id;
            this.userName;
            this.firstPosX = firstPosX;
            this.firstPosY = firstPosY;
            this.currentPosX = firstPosX;
            this.currentPosY = firstPosY;
            this.playerLength = 1;
            this.size = 20;
            this.playerHistoricPos = [{ posX: firstPosX, posY: firstPosY}];
            this.playerActualPos = [];
            this.isCollected = false;
            this.pixelsMovement = 4;
            this.death = false;
            this.loseAudio;
            this.bodyImage = new Image();
            this.bodyImage.src = "../images/corpo-cobra2.png";
            this.headImage = new Image();
            this.headImage.src = "../images/cabeca-cobra2.png";
            this.mainColor;
    }

    draw(ctx){
        this.playerActualPos = [];
        for (let index = 0; index < this.playerLength; index++) {
            // let image = this.headImage;
            // if(index !== 0){
            //     image = this.bodyImage;
            // }
            // ctx.drawImage(image, this.playerHistoricPos[index].posX, this.playerHistoricPos[index].posY, this.size, this.size);
            ctx.fillRect(this.playerHistoricPos[index].posX, this.playerHistoricPos[index].posY, this.size, this.size);
            this.playerActualPos.push({posX: this.playerHistoricPos[index].posX, posY:  this.playerHistoricPos[index].posY});
        }
    }

    updatePos(){
        this.playerHistoricPos.unshift({ posX: this.currentPosX, posY: this.currentPosY});
    }

    addLength(quantity){
        this.playerLength += quantity;
    }

    verifySelfCollision(){
        let ocurrences = 0;
        for (let item of this.playerActualPos) {
            let playerPosMinX = item.posX + (this.size / 2 - 1.9);
            let playerPosMaxX = item.posX + (this.size - (this.size / 2 - 1.9));
            let playerPosMinY = item.posY + (this.size / 2 - 1.9);
            let playerPosMaxY = item.posY + (this.size - (this.size / 2 - 1.9));
    
            for (let otherItem of this.playerActualPos) {
                let otherPosMinX = otherItem.posX + (this.size / 2 - 1.9);
                let otherPosMaxX = otherItem.posX + (this.size - (this.size / 2 - 1.9));
                let otherPosMinY = otherItem.posY + (this.size / 2 - 1.9);
                let otherPosMaxY = otherItem.posY + (this.size - (this.size / 2 - 1.9));
                if (otherPosMinX === playerPosMinX && otherPosMaxX === playerPosMaxX
                    && otherPosMinY === playerPosMinY && otherPosMaxY === playerPosMaxY)
                    ocurrences += 1;
            }
        }
    
        return  ocurrences > this.playerLength;
    }

    gameOver(){
        this.death = true;
        this.loseAudio = new Audio("../audios/videogame-death-8-bit.mp3");
        this.loseAudio.play();
    }

    setOptions(username, color){
        this.userName = username;
        this.mainColor = color;
    }
}

export default Player;