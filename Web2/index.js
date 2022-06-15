var canvas = document.getElementById("canV");
var c = canvas.getContext("2d");


var video = document.createElement("video");
video.src = "./material/spaceBackGroundMoving.mp4";

video.addEventListener('loadeddata', function() {
    video.play(); // start playing
    update(); //Start rendering
})

canvas.width = 1920 //window.innerWidth
canvas.height = 1080 //window.innerHeight

c.textAlign = "left";
c.fillStyle = "white";


var velocity = 1;


class Score {
    constructor() {
        this.score = 1;
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
    }

    addScore(score) {
        this.score += score;
    }

    increment() {
        this.score += .075
    }

    draw() {
        c.font = +parseInt((50)) + 'px monospace';
        c.fillText('SCORE:' + parseInt(this.score), 15, 50)
    }
}



class Player {
    constructor() {
        const image = new Image()
        image.src = './material/spaceShip.png'
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
        this.word = this.getRandomWord();
        this.speeder = (Math.floor(Math.random() * 3)) + 1
        this.velocity = {
            x: 0,
            y: 0
        }
        const image = new Image()
        image.src = './material/Asteroid.gif'
        image.onload = () => {
            const scale = 0.1 + (Math.random() / 4)
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.x = canvas.width - this.width + 500
            this.y = (canvas.height) - this.height - (Math.random() * window.innerHeight)
        }
    }

    draw() {
        if (this.image)
            this.x = this.x - (velocity * this.speeder);
        c.font = parseInt((50)) + 'px monospace';
        c.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height)
        c.fillText(this.word, this.x, this.y + 100)
    }

    getRandomWord() {
        const words = ["HELLO", "CES", "CAR", "FRIEND", "NO", "YES", "GOODBYE"];
        return words[Math.floor(Math.random() * words.length)];
    }


}


class Actors {
    constructor() {
        this.meteors = [new Meteor(), new Meteor(), new Meteor()];
    }

    spawnMeteor() {
        this.meteors.push(new Meteor())
            // console.log('a meteor spawned')
    }

    destroyMeteor(index) {
        this.meteors.splice(index, 1);
    }

    checkMeteorMatch(targetWord) {
        // console.log('checkMeteorMatch lvl 1', targetWord)
        console.log(targetWord)
        for (let i = 0; i < this.meteors.length; i++) {
            // console.log('checkMeteorMatch lvl 2')
            console.log(this.meteors[i].word, targetWord)
            if (this.meteors[i].word == targetWord) {
                console.log('checkMeteorMatch lvl 3')
                this.destroyMeteor(i)
                this.spawnMeteor()
            }
        }
    }

}


const score = new Score()
const player = new Player()
const actors = new Actors();


class Input {
    constructor() {
        this.targetWord = []
    }

    addLetter(character) {
        this.targetWord.push(character)
            // console.log(character)
            // console.log(this.targetWord)
    }

    deleteLetter() {
        this.targetWord.pop()
    }

    checkWord() {
        // basically check to see if this word is in any of the meteors, delete the meteors that it matches
        console.log(this.targetWord)
        let current_word = '';
        for (let character in this.targetWord) {
            current_word = current_word + this.targetWord[character];
        }
        console.log(this.targetWord)
        console.log(current_word)
        this.targetWord = [];
        actors.checkMeteorMatch(current_word);
    }

}

const input = new Input();


function update() {

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(video, 0, 0, 1920, 1080);


    for (var i = 0; i < actors.meteors.length; i++) {
        actors.meteors[i].draw()
    }


    for (var i = 0; i < actors.meteors.length; i++) {
        if (actors.meteors[i].x < 50) {
            actors.destroyMeteor(i)
            actors.spawnMeteor()
        }
    }

    if (Math.floor(score.getScore()) % 100 == 0) {
        actors.spawnMeteor()
        score.score += 1
    }

    score.increment()
    score.draw()
    player.draw()
    velocity = velocity + .0001
    requestAnimationFrame(update); // wait for the browser to be ready to present another animation fram.       
}

document.addEventListener('keydown', function(e) {
    console.log('hey you pushed something')
    switch (e.keyCode) {
        case 32: // enter
            // console.log('enter');
            input.checkWord();
            break;
        case 32: // spacebar
            console.log('space');
            input.checkWord();
            break;
        case 8: // backspace
            input.deleteLetter();
            break;
        case 65: // a
            // console.log('a');
            input.addLetter('A')
            break;
        case 66: // b
            input.addLetter('B')
            break;
        case 67: // c
            input.addLetter('C')
            break;
        case 68: // d
            input.addLetter('D')
            break;
        case 69: // e
            input.addLetter('E')
            break;
        case 70: // f
            input.addLetter('F')
            break;
        case 71: // g
            input.addLetter('G')
            break;
        case 72: // h
            input.addLetter('H')
            break;
        case 73: // i
            input.addLetter('I')
            break;
        case 74: // j
            input.addLetter('J')
            break;
        case 75: // k
            input.addLetter('K')
            break;
        case 76: // l
            input.addLetter('L')
            break;
        case 77: // m
            input.addLetter('M')
            break;
        case 78: // n
            input.addLetter('N')
            break;
        case 79: // o
            input.addLetter('O')
            break;
        case 80: // p
            input.addLetter('P')
            break;
        case 81: // q
            input.addLetter('Q')
            break;
        case 82: // r
            input.addLetter('R')
            break;
        case 83: // s
            input.addLetter('S')
            break;
        case 84: // t
            input.addLetter('T')
            break;
        case 85: // u
            input.addLetter('U')
            break;
        case 85: // v
            input.addLetter('V')
            break;
        case 87: // w
            input.addLetter('W')
            break;
        case 88: // x
            input.addLetter('X')
            break;
        case 89: // y
            input.addLetter('Y')
            break;
        case 90: // z
            input.addLetter('Z')
            break;
    };
})