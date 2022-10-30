class Enemies {
    constructor(ctx, canvasSize, enemyPosX, enemyPosY, enemyMinPosX, enemyMaxPosX) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.enemyPos = {
            x: enemyPosX,
            y: enemyPosY
        }
        this.enemySize = {
            w: 50,
            h: 50
        }
        this.enemyVel = 3
        this.enemyMinPosX = enemyMinPosX
        this.enemyMaxPosX = enemyMaxPosX
        this.image = new Image()
        this.image.src = "../images/enemy.png"
        this.init()
    }
    init() {
        this.drawEnemies()
    }
    drawEnemies() {
        this.ctx.drawImage(this.image, this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
        this.moveEnemies()
    }
    moveEnemies() {
        if (this.enemyPos.x > this.enemyMaxPosX) {
            this.enemyVel *= -1
        }
        if (this.enemyPos.x < this.enemyMinPosX) {
            this.enemyVel *= -1
        }
        this.enemyPos.x += this.enemyVel
    }
}