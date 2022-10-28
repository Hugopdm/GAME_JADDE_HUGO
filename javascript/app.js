const app = {
    appName: 'Game',
    version: '1.0.0',
    license: undefined,
    author: 'Jadde Suarez y Hugo Paniagua',
    description: 'Platform game',
    ctx: undefined,
    imageInstance: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    backgroundData: {
        backgroundSize: { w: 800, h: 1000 },
        backgroundPos: { x: 0, y: 0 },
        // image: 'images/road.png'
    },

    init() {
        this.setDimensions()
        this.setContext()
        this.setEventHandlers()
        this.createBackground()
        this.createPlayer()
        this.start()
    },

    setDimensions() {
        this.canvasSize = {
            w: 800,
            h: 1000
        }
        document.querySelector('canvas').setAttribute('height', this.canvasSize.h)
        document.querySelector('canvas').setAttribute('width', this.canvasSize.w)
    },

    setContext() {
        this.ctx = document.querySelector('canvas').getContext('2d')
    },

    createPlayer() {
        new Player(this.ctx, this.canvasSize)
    },
    setEventHandlers() {
        document.onkeydown = event => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.playerPos.x -= 25
                    break;
                case 'a':
                    this.playerPos.x -= 25
                    break;
                case 'ArrowRight':
                    this.playerPos.x += 25
                    break;
                case 'd':
                    this.playerPos.x += 25
                    break;
                case 'ArrowUp':
                    this.playerPos.y -= 25
                    break;
                case 'w':
                    this.playerPos.y -= 25
                    break;
                case 'ArrowDown':
                    this.playerPos.y += 25
                    break;
                case 's':
                    this.playerPos.y += 25
                    break;
            }
        }
    },

    createBackground() {
        // this.imageInstance = new Image()
        // this.imageInstance.src = this.backgroundData.image
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)

    },
    start() {
        setInterval(() => {
            // this.framesCounter++
            // if (this.framesCounter % 35 === 0) {
            //     this.createObstacle()
            //     this.scoreCouter++
            // }
            this.clearAll()
            // this.moveAll()
            this.drawAll()
            // this.checkCollision()
        }, 20)

    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    drawAll() {
        this.createBackground()
        this.createPlayer()
        // this.createBackground(
        //     this.imageInstance,
        //     this.backgroundData.backgroundPos.x,
        //     this.backgroundData.backgroundPos.y,
        //     this.backgroundData.backgroundSize.w,
        //     this.backgroundData.backgroundSize.h)
    },

}
