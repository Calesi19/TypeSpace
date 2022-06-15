const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
    constructor() {
        const image = new Image()
        image.src = '/static/img/spaceShip.png'
        image.onload = () => {
            const scale = 0.25
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: 50,
                y: (canvas.height / 2) - (this.height) + 50
            }
        }
    }

    draw() {
        if (this.image)
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height)
    }
}

class Meteor {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }
        const image = new Image()
        image.src = '/static/img/meteor.png'
        image.onload = () => {
            const scale = 0.1 + (Math.random() / 4)
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width - this.width,
                y: (canvas.height) - this.height - (Math.random() * window.innerHeight)

            }
        }
    }

    draw() {
        if (this.image)
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height)
    }

    moveLeft() {
        if (this.image) {
            var step = 5;
            var x = this.position.x;
            x = x - step;
            this.position.x = x
        }
    }

}

const player = new Player()
const meteor = new Meteor()
const meteor1 = new Meteor()
const meteor2 = new Meteor()
const meteor3 = new Meteor()

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    meteor.draw()
    meteor1.draw()
    meteor2.draw()
    meteor3.draw()
    meteor.moveLeft()
    meteor1.moveLeft()
    meteor2.moveLeft()
    meteor3.moveLeft()
    requestAnimationFrame(animate)

}
requestAnimationFrame(animate)