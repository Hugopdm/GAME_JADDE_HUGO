class Background {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.backgroundPos = {
            x: 0,
            y: 0
        }

        this.image = new Image()
        this.image.src = '../images/background.png'
    }

    drawBackground() {
        this.ctx.drawImage(this.image, this.backgroundPos.x, this.backgroundPos.y, this.canvasSize.w, this.canvasSize.h)
    }
}