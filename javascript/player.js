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
            x: 1,
            y: 2
        }
        this.playerPhysics = { gravity: 0.4 }
        this.floor = this.canvasSize.h - this.playerSize.h
        this.directLeft = false
        this.image = new Image()
        this.image.src = "../images/mario.png"
        // this.image.frames = 3     
        // this.image.framesIndex = 0  
        this.bullets = []
        this.init()
    }
    init() {
        this.drawPlayer()
        this.setEventHandlers()
    }
    drawPlayer(framesCounter) {
        this.checkTop()
        this.ctx.drawImage(
            this.image,
            // this.image.framesIndex * (this.image.width / this.image.frames),
            //     0, 
            // this.image.width / this.image.frames
            // this.image.heigth
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h)
        //this.animate(framesCounter)
        this.setGravity()
        this.bullets.forEach(elem => elem.drawBullets())
        this.clearBullets()
    }
    // animate(framesCounter) {
    //     if (framesCounter % 5 == 0) {
    //         this.image.framesIndex++;
    //     }
    //     if (this.image.framesIndex >= this.image.frames) {
    //         this.image.framesIndex = 0;
    //     }
    // }
    moveLeft() {
        if (this.playerPos.x > 0) {
            this.playerPos.x -= 20
        } else { }
    }
    moveRigth() {
        if (this.playerPos.x < this.canvasSize.w - this.playerSize.w) {
            this.playerPos.x += 20
        } else { }
    }
    checkTop() {
        if (this.playerPos.y < 0) {
            this.playerPos.y = 0
            this.playerVel.y = 0
        }
    }
    jump() {
        if (this.playerPos.y > this.floor) {
            this.playerPos.y -= 20
            this.playerVel.y -= 3
        } else if ((this.playerPos.y -= (this.playerSize.h + 115))) {
            this.playerPos.y += 20
        }
    }
    shoot() {
        this.bullets.push(new Bullets(
            this.ctx,
            this.canvasSize,
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h,
            this.directLeft
        ));
    }
    clearBullets() {
        this.bullets = this.bullets.filter(elem => elem.bulletPos.x <= this.canvasSize.w) //Memory
    }
    setGravity() {
        if (this.playerPos.y + this.playerSize.h < this.floor) {
            this.playerPos.y += this.playerVel.y
            this.playerVel.y += this.playerPhysics.gravity
            // this.playerPos.x += this.playerVel.x
        } else {
            this.playerPos.y = this.floor
            this.playerVel.y = 0
        }
    }
    setEventHandlers() {
        document.onkeydown = event => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.moveLeft()
                    this.directLeft = true
                    // console.log('Arrow Left', `- PlayerPos.x = ${this.playerPos.x}px`)
                    // console.log('Arrow Left', `- PlayerPos.x = ${this.playerPos.y}px`)
                    break;
                case 'ArrowRight':
                    this.moveRigth()
                    this.directLeft = false
                    // console.log('Arrow Right', `- PlayerPos.x = ${this.playerPos.x}px`)
                    // console.log('Arrow Right', `- PlayerPos.x = ${this.playerPos.y}px`)
                    break;
                case 'ArrowUp':
                    this.jump()
                    console.log('Jump')
                    break;
                case 'z':
                    this.shoot()
                    console.log('Shoot', this.bullets)
                    break;

            }
        }
    }
}