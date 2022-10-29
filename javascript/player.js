class Player {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerSize = {
            w: 50,
            h: 70
        }
        this.playerPos = {
            x: 50,
            y: this.canvasSize.h - this.playerSize.h
        }
        this.playerVel = {
            x: 10,
            y: 2
        }
        this.playerPhysics = { gravity: 0.4 }
        this.floor = this.canvasSize.h - this.playerSize.h
        this.image = new Image()
        this.image.src = "../images/item.png"
        // this.bullets = []; // new
        this.init()
    }
    init() {
        this.drawPlayer()
        this.setEventHandlers()
    }
    drawPlayer() {
        this.ctx.drawImage(this.image, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.setGravity()
    }
    moveLeft() {
        if (this.playerPos.x > 0) {
            this.playerPos.x -= 20
        } else { }
    }
    moveRigth() {
        if (this.playerPos.x < this.canvasSize.w - this.playerSize.w) {
            this.playerPos.x += 20
        } else { }
        // console.log(this.playerPos.x)
    }
    jump() {
        if (this.playerPos.y > this.floor) {
            this.playerPos.y -= 20
            this.playerVel.y -= 3
        } else if ((this.playerPos.y -= (this.playerSize.h + 130))) {
            this.playerPos.y += 20
        }
    }
    setGravity() {
        if (this.playerPos.y + this.playerSize.h < this.floor) {
            this.playerPos.y += this.playerVel.y
            this.playerVel.y += this.playerPhysics.gravity
        } else {
            this.playerPos.y = this.floor
            this.playerVel.y = 1
        }
    }
    setEventHandlers() {
        document.onkeydown = event => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.moveLeft()
                    console.log('Arrow Left', this.playerPos.x)
                    break;
                case 'ArrowRight':
                    this.moveRigth()
                    console.log('Arrow Right', this.playerPos.x)
                    break;
                case 'ArrowUp':
                    this.jump()
                    console.log('Jump')
                    break;
            }
        }
    }
}