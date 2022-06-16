

var canvas = document.getElementById("canV");
var c = canvas.getContext("2d");


var video = document.createElement("video");
video.src = "material/spaceBackGroundMoving.mp4";

video.addEventListener('loadeddata', function() {
  video.play();  // start playing
  update(); //Start rendering
})

canvas.width = 1920//window.innerWidth
canvas.height = 1080//window.innerHeight

c.textAlign = "left";
c.fillStyle = "white";


var velocity = 1;






class Life {
    constructor() {
        this.life = 3
        this.image;
        this.loadImage()
        
    }

    loseLife(){
        this.life -= 1
    }

    addLife(){
        if (this.life != 5) 
            this.life += 1
    }

    getLife(){
        return this.life;
    }

    loadImage(){
        const image = new Image()

        if (this.life == 1){
            image.src = './material/life1.png'
        }

        else if (this.life == 2){
            image.src = './material/life2.png'
        }

        else if (this.life == 3){
            image.src = './material/life3.png'
        }

        else if (this.life == 4) {
            image.src = './material/life4.png'
        }

        else if (this.life == 5) {
            image.src = './material/life5.png'
        }
        
        image.onload = () => {
            this.image = image
            this.width = image.width
            this.height = image.height
            this.position = {
                x: 10,
                y: 75
            }
    }}

    draw(){
        
        this.loadImage()

        c.drawImage(
            this.image, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height)
}
}



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
        c.font = + parseInt((50)) + 'px monospace';
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

    draw(){
        if(this.image)
            c.drawImage(
                this.image, 
                this.position.x, 
                this.position.y,
                this.width,
                this.height)
    }
}


class Meteor{
    constructor() {
        this.word = this.getRandomWord();
        this.speeder = (Math.floor(Math.random() * 3)) + 1
        this.velocity = {
        x:0,
        y:0
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

    draw(){
        if(this.image) 
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

    getRandomWord(){
        const words = ["HELLO", "CES", "CAR", "FRIEND", "NO", "YES", "GOODBYE"];
        return words[Math.floor(Math.random()* words.length)];
    }

    
} 
class Actors {
    constructor() {
        this.meteors = [new Meteor(), new Meteor(), new Meteor()];
    }

    spawnMeteor() {
        this.meteors.push(new Meteor())
    }

    destroyMeteor(index) {
        this.meteors.splice(index, 1);
    }

    checkMeteorMatch(targetWord) {
        for (let i = 0; i < this.meteors.length; i++) {
            if (this.meteors[i].word == targetWord) {
                this.destroyMeteor(i)
                this.spawnMeteor()
            }
        }
    }

}


class Input {
    constructor() {
        this.targetWord = []
    }

    addLetter(character) {
        this.targetWord.push(character)
    }

    deleteLetter() {
        this.targetWord.pop()
    }
    
    checkWord() {
        // basically check to see if this word is in any of the meteors, delete the meteors that it matches
        let current_word = '';
        for (let character in this.targetWord) {
            current_word = current_word + this.targetWord[character];
        }
        this.targetWord = [];
        actors.checkMeteorMatch(current_word);
    }

    draw() {
        c.font = + parseInt((50)) + 'px monospace';
        c.fillText(this.targetWord.join(""), 15, 1000)
    }

}

const input = new Input();
const score = new Score()
const player = new Player()
const actors = new Actors();
const life = new Life()


document.addEventListener('keydown', function(e) {
    switch(e.keyCode) {
        case 13: // enter
            input.checkWord();
            break;
        case 32: // spacebar
            input.checkWord();
            break;
        case 8: // backspace
            input.deleteLetter();
            break;
        case 65: // a
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


function update(){
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(video,0,0,1920,1080);

    
    for (var i = 0; i < actors.meteors.length; i++){
        actors.meteors[i].draw()
    }


    for (var i = 0; i < actors.meteors.length; i++){
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
    life.draw()
    input.draw()
    requestAnimationFrame(update); // wait for the browser to be ready to present another animation fram.    
    
    


}



