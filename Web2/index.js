
// Import modules used to connect to Firestore/Firebase Database

import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js'
import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js'

// Database connection credentials and addresses

const firebaseConfig = {
    apiKey: "AIzaSyDzkj6Fg3lVe__0qb4sy-9gNQVeRP5GXz8",
    authDomain: "calesi-bd5a0.firebaseapp.com",
    projectId: "calesi-bd5a0",
    storageBucket: "calesi-bd5a0.appspot.com",
    messagingSenderId: "447612983536",
    appId: "1:447612983536:web:dc3e7570c3182c129a8a35",
    measurementId: "G-T4F0T1QG2K"
};

// Establish connection credentials

initializeApp(firebaseConfig)
const db = getFirestore()


// Retreives canvas element from HTML

var canvas = document.getElementById("canV");
var c = canvas.getContext("2d");

// Loads background video into HTML

var video = document.createElement("video");
video.src = "material/spaceBackGroundMoving.mp4";
video.muted = true;
video.addEventListener('loadeddata', function () {
    video.play(); // start playing
    update(); //Start rendering
})

// Sets canvas dimensions

canvas.width = 1920 //window.innerWidth
canvas.height = 1080 //window.innerHeight


// Specifies canvas' font attributes.

c.textAlign = "left";
c.fillStyle = "white";

// Standard velocity.

var velocity = 1;


class Planet {

    // This class for the planets spawning in the background of the game.

    constructor(planetChoice) {

        this.velocity = .25  // Standard velocity.

        //load image

        const image = new Image()
        image.src = planetChoice
        image.onload = () => {
            this.image = image
            this.width = 400
            this.height = 400
            this.x = canvas.width - this.width + 500
            this.y = Math.floor(Math.random() * (900 - 100 + 1) + 100)
        }
    }

    //Draw image on screen.

    draw() {
        if (this.image) {
            this.x = this.x - this.velocity; // Update objects position.
            c.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height)
        }
    }
}



class Life {

    /* This class keeps track of the player's life, draws the player's life
    on the screen, and handles adding and removing life points.*/

    constructor() {

        this.life = 3      
        this.image;
        this.loadImage()

    }

    // This method substracts a life point from the players current life.

    loseLife() {
        this.life -= 1
    }

    // This method adds a life point to the players current life.

    addLife() {
        if (this.life != 5)
            this.life += 1
    }

    // This method returns the amount of life points the player currently has.

    getLife() {
        return this.life;
    }

    // This medthod loads the picture representing the amount of life points the player currently has.

    loadImage() {
        const image = new Image()

        // Each of these image addresses loads a picture representing different heart (life points) quantities.

        if (this.life == 1) {
            image.src = './material/life1.png'
        } else if (this.life == 2) {
            image.src = './material/life2.png'
        } else if (this.life == 3) {
            image.src = './material/life3.png'
        } else if (this.life == 4) {
            image.src = './material/life4.png'
        } else if (this.life == 5) {
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
        }
    }

    // This medthod draws on the screen how many life points the player currently has.

    draw() {

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

    // The score class keeps track of the student's current score points, draws the scores on the screen, and increments the score each frame.

    constructor() {
        this.score = 1; // Player's score value
    }

    //This method returns the player's current score.

    getScore() {
        return this.score;
    }

    // This method increments the player score by .75 when called.

    increment() {
        this.score += .075
    }

    // This method displays the player's current score on the screen.

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
        this.randomNumber = (Math.floor(Math.random() * 6300)) + 1
        this.q = query(collection(db, "words"), where("id", "==", this.randomNumber));
        this.unsubscribe = onSnapshot(this.q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().word);
                this.word = doc.data().word;
            })
        });


        //this.word = this.getRandomWord();
        
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
            this.y = Math.floor(Math.random() * (900 - 100 + 1) + 100)
        }
    }

    draw() {
        if (this.image) {
            this.x = this.x - (velocity * this.speeder);
            c.font = parseInt((50)) + 'px monospace';
            if (typeof this.image == undefined) {
                console.log('Hey man your image is undefined again.')
            }
            c.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height)
            c.fillText(this.word, this.x, this.y + 100)
        }
    }

    getRandomWord() {
        const words = ["HELLO", "CES", "CAR", "FRIEND", "NO", "YES", "GOODBYE"];
        return words[Math.floor(Math.random() * words.length)];
    }

}

class LifeBonus {
    constructor() {
        this.frequency = 0
        this.word = this.getRandomWord();
        this.speeder = (Math.floor(Math.random() * 3)) + 1
        this.velocity = {
            x: 0,
            y: 0
        }
        const image = new Image()
        image.src = './material/heart.png'
        image.onload = () => {
            const scale = 0.1 + (Math.random() / 4)
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.x = canvas.width - this.width + 500
            this.y = Math.floor(Math.random() * (900 - 100 + 1) + 100)
        }
    }

    draw() {
        if (this.image) {
            this.x = this.x - (velocity * this.speeder);
            c.font = parseInt((50)) + 'px monospace';
            if (typeof this.image == undefined) {
                console.log('Hey man your image is undefined again.')
            }
            c.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height)
            c.fillText(this.word, this.x, this.y + 100)
        }
    }

    getRandomWord() {
        const words = ["HELLO", "CES", "CAR", "FRIEND", "NO", "YES", "GOODBYE"];
        return words[Math.floor(Math.random() * words.length)];
    }

    incrementFrequency() {
        this.frequency += 1;
    }
}


class Actors {
    constructor() {
        this.planetChoice = ['./material/planet1.png', './material/planet2.png', './material/planet3.png', './material/planet4.png', './material/planet5.png']
        this.meteors = [new Meteor(), new Meteor(), new Meteor()];
        this.lives = []
        this.planets = [new Planet(this.choosePlanet())]

    }

    choosePlanet() {
        if (this.planetChoice.length != 0) {
            var choice = Math.floor(Math.random() * this.planetChoice.length)
            var planetAddress = this.planetChoice[choice]
            this.planetChoice.splice(choice, 1);
            return planetAddress
        } else {
            this.planetChoice = ['./material/planet1.png', './material/planet2.png', './material/planet3.png', './material/planet4.png', './material/planet5.png']
            var choice = Math.floor(Math.random() * this.planetChoice.length)
            var planetAddress = this.planetChoice[choice]
            this.planetChoice.splice(choice, 1);
            return planetAddress
        }
    }

    spawnMeteor() {
        this.meteors.push(new Meteor())
    }

    destroyMeteor(index) {
        this.meteors.splice(index, 1);
    }

    spawnLife() {
        this.lives.push(new LifeBonus())
    }

    destroyLife(index) {
        this.lives.splice(index, 1);
    }

    
    checkActorMatch(targetWord, life) {
        /* Checks to see if targetWord matches with any of the meteors or lives, if so it deletes it and spawns another */
        for (let i = 0; i < this.meteors.length; i++) {
            if (this.meteors[i].word == targetWord) {
                this.drawLaser(this.meteors[i].x, this.meteors[i].y)
                this.destroyMeteor(i)
                this.spawnMeteor()
            }
        }
        for (let i = 0; i < this.lives.length; i++) {
            if (this.lives[i].word == targetWord) {
                this.destroyLife(i)
                life.addLife();
            }
        }
    }

    drawLaser(objectX, objectY) {
        /* Draw a laser from the ship to the actor being destroyed, pass in coordinates of target object */

        // Current problem is that it's being cleared too quickly
        console.log('pew pew')
                

        // set line stroke and line width
        c.strokeStyle = 'red';
        c.lineWidth = 50;

        // draw a red line
        c.beginPath();
        // c.moveTo(50, (canvas.height / 2) - (this.height) + 50);
        // c.lineTo(objectX, objectY);
        c.moveTo(100,100)
        c.lineTo(1000,1000)
        c.stroke();
    }

    spawnPlanet() {
        this.planets.push(new Planet(this.choosePlanet()));
    }

    destroyPlanet(index) {
        this.planets.splice(index, 1);
    }
}


class Input {
    constructor() {
        this.targetWord = []
    }

    // Adds a letter to the targetWord
    addLetter(character) {
        this.targetWord.push(character)
    }

    // Deletes a letter from the targetWord
    deleteLetter() {
        this.targetWord.pop()
    }

    // Converts the list targetWord into a string and then calls checkActorMatch to possibly delete actors
    checkWord(life) {
        // basically check to see if this word is in any of the meteors, delete the meteors that it matches
        let current_word = '';
        for (let character in this.targetWord) {
            current_word = current_word + this.targetWord[character];
        }
        this.targetWord = [];
        actors.checkActorMatch(current_word, life);
    }

    // Display current targetWord
    draw() {
        c.font = +parseInt((50)) + 'px monospace';
        c.fillText(this.targetWord.join(""), 15, 1000)
    }

    // Event listener, handle input, deal with letters, backspace, and enter/spacebar
    checkForInput(life) {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 13: // enter
                    input.checkWord(life);
                    break;
                case 32: // spacebar
                    input.checkWord(life);
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
                case 86: // v
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
    }

}



const input = new Input();
const score = new Score()
const player = new Player()
const actors = new Actors();
const life = new Life();
input.checkForInput(life)

var lifeFrequency = 0;


function update() {

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(video, 0, 0, 1920, 1080);




    for (var i = 0; i < actors.planets.length; i++) {
        if (actors.planets.length != 0) {
            if (actors.planets[i].x < -500) {
                actors.destroyPlanet(i)
                actors.spawnPlanet()
            }
        }
    }


    for (var i = 0; i < actors.planets.length; i++) {
        if (actors.planets.length != 0) {
            actors.planets[i].draw()
        }
    }

    for (var i = 0; i < actors.meteors.length; i++) {
        if (actors.meteors[i].x < 50) {
            actors.destroyMeteor(i)
            actors.spawnMeteor()
            life.loseLife()
            if (life.getLife() == 0) {
                alert("Game Over - Your Score is: " + parseInt(score.getScore()))
            }
        }
    }

    if (Math.floor(score.getScore()) % 100 == 0) {
        actors.spawnMeteor()
        score.score += 1
    }

    if (Math.floor(score.getScore()) % 100 == 0) {
        actors.spawnMeteor()
        score.score += 1
    }

    for (var i = 0; i < actors.meteors.length; i++) {
        if (actors.meteors.length != 0) {
            actors.meteors[i].draw()
        }
    }

    for (var i = 0; i < actors.lives.length; i++) {
        if (actors.lives.length != 0) {
            actors.lives[i].draw()
        }
    }

    for (var i = 0; i < actors.lives.length; i++) {
        if (actors.lives.length != 0) {
            if (actors.lives[i].x < -100) {
                actors.destroyLife(i)
            }
        }
    }


    score.increment()
    score.draw()
    player.draw()
    velocity = velocity + .0001
    life.draw()
    input.draw()

    lifeFrequency += 1;
    if (lifeFrequency == 1000) {
        actors.spawnLife()
        lifeFrequency = 0;
    }



    requestAnimationFrame(update); // wait for the browser to be ready to present another animation fram.    

}