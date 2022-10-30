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
    items: [],
    enemies: [],
    score: 0,
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
        this.createEnemies()
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
            new Platforms(this.ctx, this.canvasSize, 0, this.canvasSize.h / 4 - 10, 280, 40), //platform 1 up-left
            new Platforms(this.ctx, this.canvasSize, this.canvasSize.w - 380, this.canvasSize.h / 4 + 40, 200, 40), //platform 2 up-right
            new Platforms(this.ctx, this.canvasSize, this.canvasSize.w / 2 - 130, this.canvasSize.h / 2 + 20, 130, 40), //platform 3 mid
            new Platforms(this.ctx, this.canvasSize, 0, (this.canvasSize.h / 4) + (this.canvasSize.h / 2), 200, 40), //platform 4 bottom-left
            new Platforms(this.ctx, this.canvasSize, this.canvasSize.w - 250, (this.canvasSize.h / 4 - 50) + (this.canvasSize.h / 2), 250, 40) //platform 5 bottom-rigth
        )
    },

    createItems() {
        this.items.push(
            new Items(this.ctx, this.canvasSize, 25, this.canvasSize.h / 4 - 35), // platform 1 - item 1
            new Items(this.ctx, this.canvasSize, 120, this.canvasSize.h / 4 - 35), // platform 1 - item 2
            new Items(this.ctx, this.canvasSize, 225, this.canvasSize.h / 4 - 35), // platform 1 - item 3

            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 355, this.canvasSize.h / 4 + 15), // platform 2 - item 4
            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 230, this.canvasSize.h / 4 + 15), // platform 2 - item 5

            new Items(this.ctx, this.canvasSize, this.canvasSize.w / 2 - 75, this.canvasSize.h / 2 - 5), // platform 3 - item 6

            new Items(this.ctx, this.canvasSize, 50, (this.canvasSize.h / 4) + (this.canvasSize.h / 2) - 25), // platform 4 - item 7
            new Items(this.ctx, this.canvasSize, 125, (this.canvasSize.h / 4) + (this.canvasSize.h / 2) - 25), // platform 4 - item 8

            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 200, (this.canvasSize.h / 4 - 50) + (this.canvasSize.h / 2) - 25),// platform 5 - item 9
            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 75, (this.canvasSize.h / 4 - 50) + (this.canvasSize.h / 2) - 25)// platform 5 - item 10
        )
    },

    createEnemies() {
        this.enemies.push(
            new Enemies(this.ctx, this.canvasSize, 50, 140 - 50, 50, 230), // platform 1 - enemy 1
            new Enemies(this.ctx, this.canvasSize, 570, 400 - 50, 570, 730), // platform 5 - enemy 2
            new Enemies(this.ctx, this.canvasSize, 230, this.canvasSize.h - 50, 230, 700) //Floor - enemy 3
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
                if (this.player.playerVel.y > 0) {
                    this.player.playerVel.y = 0
                }
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
                this.score++
                // console.log(this.score)
            }
        })
    },

    checkCollisionEnemiesPlayers() {
        this.enemies.forEach((elem) => {
            if (
                elem.enemyVel === 0
            ) {

            } else if (
                this.player.playerPos.x < elem.enemyPos.x + elem.enemySize.w &&
                this.player.playerPos.x + this.player.playerSize.w > elem.enemyPos.x &&
                this.player.playerPos.y < elem.enemyPos.y + elem.enemySize.h &&
                this.player.playerSize.h + this.player.playerPos.y > elem.enemyPos.y
            ) {
                this.gameOver()
            }
        })
    },

    checkCollisionBulletsEnemies() {
        this.player.bullets.forEach((bullet) => {
            this.enemies.forEach((enemy) => {
                if (enemy.enemyVel === 0) { }
                else if (
                    bullet.bulletPos.x < enemy.enemyPos.x + enemy.enemySize.w &&
                    bullet.bulletPos.x + bullet.bulletSize.w > enemy.enemyPos.x &&
                    bullet.bulletPos.y < enemy.enemyPos.y + enemy.enemySize.h &&
                    bullet.bulletSize.h + bullet.bulletPos.y > enemy.enemyPos.y
                ) {
                    enemy.enemyVel = 0
                    setTimeout(() => {
                        enemy.enemyVel = 3
                    }, 5000)
                    bullet.bulletPos.x += 1000
                }
            })
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
            this.checkCollisionEnemiesPlayers()
            this.checkCollisionBulletsEnemies()
            this.winGame()
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
        this.items.forEach((elem) => {
            elem.drawItems()
        })
        this.enemies.forEach((elem) => {
            elem.drawEnemies()
        })
        this.player.drawPlayer()
    },

    winGame() {
        if (this.score === 10) {
            clearInterval(1)
            this.ctx.fillStyle = '#B7C4CF'
            this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)
            this.ctx.fillStyle = '#AC7088'
            this.ctx.font = '50px arial'
            this.ctx.textAlign = "center"
            this.ctx.fillText('YOU WIN!', this.canvasSize.w / 2, this.canvasSize.h / 2)
        } else {

        }
    },

    gameOver() {
        clearInterval(1)
        this.ctx.fillStyle = '#B7C4CF'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        this.ctx.fillStyle = '#AC7088'
        this.ctx.font = '50px arial'
        this.ctx.textAlign = "center"
        this.ctx.fillText('GAME OVER', this.canvasSize.w / 2, this.canvasSize.h / 2)
    }

}
