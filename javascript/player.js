class Player {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.playerSize = {
            w: 100,
            y: 100
        }
        this.playerPos = {
            x: 100,
            y: 100
        }
        this.canvasSize = canvasSize
        this.init()
    }
    init() {
        this.drawPlayer()
    }
    drawPlayer() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.w
        )
        // this.playerMove()
    }
    playerMove() {

    }
    
}