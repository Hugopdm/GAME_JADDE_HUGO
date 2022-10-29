const app = {
    appName: 'Game',
    version: '1.0.0',
    license: undefined,
    author: 'Jadde Suarez y Hugo Paniagua',
    description: 'Platform game',
    ctx: undefined,
    background: undefined,
    player: undefined,
    platforms: [],
    enemies: [],
    items: [],
    canvasSize: {
        w: undefined,
        h: undefined
    },

    init() {
        this.setDimensions()
        this.setContext()
        this.createBackground()
        this.createPlatforms()
        this.createItems()
        this.createPlayer()
        this.player.setEventHandlers()
        this.start()
    },

    setDimensions() {
        this.canvasSize = {
            w: 800,
            h: 600
        }
        document.querySelector('canvas').setAttribute('height', this.canvasSize.h)
        document.querySelector('canvas').setAttribute('width', this.canvasSize.w)
    },

    setContext() {
        this.ctx = document.querySelector('canvas').getContext('2d')
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize)
    },

    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize)
    },

    createPlatforms() {
        this.platforms.push(
            new Platforms(this.ctx, this.canvasSize, 0, this.canvasSize.h / 4 - 50, 280, 40), //platform 1 up-left
            new Platforms(this.ctx, this.canvasSize, this.canvasSize.w - 380, this.canvasSize.h / 4 + 40, 200, 40), //platform 2 up-right
            new Platforms(this.ctx, this.canvasSize, this.canvasSize.w / 2 - 130, this.canvasSize.h / 2 + 20, 130, 40), //platform 3 mid
            new Platforms(this.ctx, this.canvasSize, 0, (this.canvasSize.h / 4) + (this.canvasSize.h / 2), 200, 40), //platform 4 bottom-left
            new Platforms(this.ctx, this.canvasSize, this.canvasSize.w - 250, (this.canvasSize.h / 4 - 50) + (this.canvasSize.h / 2), 250, 40) //platform 5 bottom-rigth
        )
    },

    createItems() {
        this.items.push(
            new Items(this.ctx, this.canvasSize, 25, this.canvasSize.h / 4 - 75), // platform 1 - item 1
            new Items(this.ctx, this.canvasSize, 120, this.canvasSize.h / 4 - 75), // platform 1 - item 2
            new Items(this.ctx, this.canvasSize, 225, this.canvasSize.h / 4 - 75), // platform 1 - item 3

            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 355, this.canvasSize.h / 4 + 15), // platform 2 - item 4
            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 230, this.canvasSize.h / 4 + 15), // platform 2 - item 5

            new Items(this.ctx, this.canvasSize, this.canvasSize.w / 2 - 75, this.canvasSize.h / 2 - 5), // platform 3 - item 6

            new Items(this.ctx, this.canvasSize, 50, (this.canvasSize.h / 4) + (this.canvasSize.h / 2) - 25), // platform 4 - item 7
            new Items(this.ctx, this.canvasSize, 125, (this.canvasSize.h / 4) + (this.canvasSize.h / 2) - 25), // platform 4 - item 8

            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 200, (this.canvasSize.h / 4 - 50) + (this.canvasSize.h / 2) - 25),// platform 5 - item 9
            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 75, (this.canvasSize.h / 4 - 50) + (this.canvasSize.h / 2) - 25)// platform 5 - item 10
        )
    },

    checkCollisionPlatforms() {
        this.platforms.forEach((elem) => {
            if (
                this.player.playerPos.x < elem.platformPos.x + elem.platformSize.w &&
                this.player.playerPos.x + this.player.playerSize.w > elem.platformPos.x &&
                this.player.playerPos.y < elem.platformPos.y + elem.platformSize.h &&
                this.player.playerSize.h + this.player.playerPos.y > elem.platformPos.y
            ) {
                this.player.playerPos.y = elem.platformPos.y - this.player.playerSize.h
                this.player.playerVel.y = 0
            } else {

            }
        })
    },
    checkCollisionItems() {
        this.items.forEach((elem) => {
            if (
                this.player.playerPos.x < elem.itemPos.x + elem.itemSize.w &&
                this.player.playerPos.x + this.player.playerSize.w > elem.itemPos.x &&
                this.player.playerPos.y < elem.itemPos.y + elem.itemSize.h &&
                this.player.playerSize.h + this.player.playerPos.y > elem.itemPos.y
            ) {
                elem.itemPos.x += 1000
                this.items = this.items.filter(elem => elem.itemPos.x < this.canvasSize.w)
            }
        })
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
            this.checkCollisionPlatforms()
            this.checkCollisionItems()
        }, 20)

    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    drawAll() {
        this.background.drawBackground()
        this.platforms.forEach((elem) => {
            elem.drawPlatform()
        })
        this.player.drawPlayer()
        this.items.forEach((elem) => {
            elem.drawItems()
        })
    },

}
