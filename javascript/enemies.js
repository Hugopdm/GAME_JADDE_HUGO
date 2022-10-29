class Enemies {
    constructor(ctx, canvasSize, enemyPosX, enemyPosY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.enemyPos = {
            x: enemyPosX,
            y: enemyPosY
        }
        this.enemySize = {
            w: 40,
            h: 40
        }
        this.image = new Image()
        this.image.src = "../images/coin_icon.png"
        this.init()
    }
    init() {
        this.drawEnemies()
    }
    drawEnemies() {
        this.ctx.drawImage(this.image, this.enemyPosPos.x, this.enemyPosPos.y, this.enemyPosSize.w, this.enemyPosSize.h)
        this.moveEnemies()
    }
    moveEnemies() {

    }
}