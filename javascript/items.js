class Items {
    constructor(ctx, canvasSize, itemPosX, itemPosY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.itemPos = {
            x: itemPosX,
            y: itemPosY
        }
        this.itemSize = {
            w: 25,
            h: 25
        }
        this.image = new Image()
        this.image.src = "./images/item.png"
        this.init()
    }

    init() {
        this.drawItems()
    }
    drawItems() {
        this.ctx.drawImage(this.image, this.itemPos.x, this.itemPos.y, this.itemSize.w, this.itemSize.h)
    }
}