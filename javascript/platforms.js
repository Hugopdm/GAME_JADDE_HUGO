class Platforms {
    constructor(ctx, canvasSize, platformPosX, platformPosY, platformSizeW, platformSizeH) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformPos = {
            x: platformPosX,
            y: platformPosY
        }
        this.platformSize = {
            w: platformSizeW,
            h: platformSizeH
        }
        this.init()
    }

    init() {
        this.drawPlatform()

    }
    drawPlatform() {
        this.ctx.fillStyle = '#BCE29E'
        this.ctx.fillRect(this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }
}