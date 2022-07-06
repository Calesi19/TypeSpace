// Import modules used to connect to Firestore/Firebase Database

import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js'
import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot,
    doc,
    setDoc,
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


// Play looped music when the site loads.

const music = new Audio('./material/spaceRace.mp3');
music.loop = true;
music.play()


// Retreives canvas element from HTML

var canvas = document.getElementById("canV");
var c = canvas.getContext("2d");
const titleScreen = document.getElementById('titleScreen');
// Loads background video into HTML

var video = document.createElement("video");
video.src = "material/spaceBackGroundMoving.mp4";
video.muted = true;

titleScreen.addEventListener('click', function() {
        titleScreen.style.display = 'none';
        video.play(); // start playing
        update(); //Start rendering
    })
    // video.addEventListener('loadeddata', function () {

// })

// Sets canvas dimensions

canvas.width = 1920 //window.innerWidth
canvas.height = 1080 //window.innerHeight


// Specifies canvas' font attributes.

c.textAlign = "left";
c.fillStyle = "white";

// Standard velocity.

var velocity = 1;



class Explosion {

    /*This class holds the all the attributes and methods necessary to display an explosion
    when a meteor is destroyed.*/

    constructor(xPosition, yPosition) {
        
        // Position of the explosion. They are the same as the meteor's position.

        this.x = xPosition
        this.y = yPosition

        // Size of explosion.

        this.width = 300
        this.height = 300

        // "frameCounter" attribute is used to measure how long a frame is displayed on screen.

        this.frameCounter = 0

        // "spriteSelection" attribute will choose which sprite frame will be displayed.

        this.spriteSelection = 0

        // The "sprites" attribute holds all the frames for the explosion animation.

        this.sprites = [
            './material/explosion/1.png',
            './material/explosion/2.png',
            './material/explosion/3.png',
            './material/explosion/3.png',
            './material/explosion/4.png',
            './material/explosion/5.png',
            './material/explosion/6.png',
            './material/explosion/6.png',
            './material/explosion/7.png',
            './material/explosion/8.png',
            './material/explosion/9.png',
            './material/explosion/10.png',
            './material/explosion/11.png',
            './material/explosion/12.png',
            './material/explosion/13.png',
            './material/explosion/14.png',
            './material/explosion/15.png',
            './material/explosion/16.png',
            './material/explosion/17.png',
            './material/explosion/18.png',
            './material/explosion/19.png',
            './material/explosion/20.png',
            './material/explosion/21.png',
            './material/explosion/22.png',
            './material/explosion/23.png',
            './material/explosion/24.png',
            './material/explosion/25.png',
            './material/explosion/26.png',
            './material/explosion/27.png',
            './material/explosion/28.png',
            './material/explosion/29.png',
            './material/explosion/30.png',
            './material/explosion/31.png',
            './material/explosion/32.png',
            './material/explosion/33.png'
        ]
    }

    loadImage(){
        
        // Every two frames, increase the spriteSelection attribute; which would load the next frame.
        
        /*
        if (this.frameCounter == 2){
            this.spriteSelection += 1
        }*/

        // Load the explosion frame that will be used.

        const image = new Image()
        image.src = this.sprites[this.spriteSelection]
        image.onload = () => {
            const scale = 0.1 + (Math.random() / 4)
            this.image = image
            this.width = this.width
            this.height = this.width
            this.x = this.x - 1
            this.y = this.y
        }
    }


    // This method draws the meteor on the screen and updates its position.

    draw() {

        // Load frame.

        this.loadImage()

        // If frame exist, display frame on specified location.

        if (this.image) {
            c.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height)
        }
    }


    // When called in the game loop, this method will increse the frame counter by 1.

    increment_frame_counter(){

        if (this.frameCounter == 1) { //Every two frames, the counter is reset.
            this.frameCounter = 0 
            this.spriteSelection += 1 
        }
        else {
            this.frameCounter += 1
        }
    }
}




class Planet {

    // This class for the planets spawning in the background of the game.

    constructor(planetChoice) {

        this.velocity = .25 // Standard velocity.

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

    loseLife(player) {
        this.life -= 1
        player.frameCounter = -15
    }

    // This method adds a life point to the players current life.

    addLife() {
        if (this.life != 5)
            this.life += 1
        player.frameCounter = 15
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

            // Sets the life image's size and position.

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

    // The player class holds and sets the parameters and methods necessary to draw the ship on the screen.

    constructor() {

        this.frameCounter = 0

    }


    loadImage() {
        // Loads ship image.


        const image = new Image()

        if (this.frameCounter == 0) {
            image.src = './material/spaceShip.png'
        }
        if (this.frameCounter > 0) {
            image.src = './material/spaceShipHealed.png'
            this.frameCounter -= 1
        }
        if (this.frameCounter < 0) {
            image.src = './material/spaceShipHurt.png'
            this.frameCounter += 1
        }

        image.onload = () => {

            // Sets image ship's size and position

            const scale = 0.25
            this.image = image
            this.width = 1280 * scale
            this.height = 720 * scale
            this.position = {
                x: 50,
                y: (canvas.height / 2) - (this.height) + 50
            }
        }
    }

    // This method draws the ship on the screen when called.

    draw() {
        this.loadImage()
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

    /*The meteor class holds the attributes and methods necessary to 
    spawn and draw a meteor on the screen for the player to destroy. */

    constructor() {

        /* Since there are roughly 6300 words in the database, this variable chooses a random number
        from 0 to 6300. */

        this.randomNumber = (Math.floor(Math.random() * 6300)) + 1

        // A word from the database is picked whose id matches the "randomNumber" value.

        this.q = query(collection(db, "words"), where("id", "==", this.randomNumber));
        this.unsubscribe = onSnapshot(this.q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.data().word);
                this.word = doc.data().word; // Word is assigned to meteor.
            })
        });

        // The "speeder" variable chooses a random value, later to be used to randomize object velocity.

        this.speeder = (Math.floor(Math.random() * 3)) + 1

        // Loads image and sets size and position. 

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

    // This method draws the meteor on the screen and updates its position.

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

    getPosition() {
        return [this.x, this.y];
    }

}




class LifeBonus {

    /* This "LifeBonus" class handles the the attributes and methods 
    necessary for the extra lives to spawn, move across the screen, and disappear. */

    constructor() {

        /* Since there are roughly 6300 words in the database, this variable chooses a random number
        from 0 to 6300. */

        this.randomNumber = (Math.floor(Math.random() * 6300)) + 1

        // A word from the database is picked whose id matches the "randomNumber" value.

        this.q = query(collection(db, "words"), where("id", "==", this.randomNumber));
        this.unsubscribe = onSnapshot(this.q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.data().word);
                this.word = doc.data().word; // Word is assigned to meteor.
            })
        });


        // The "speeder" variable chooses a random value, later to be used to randomize object velocity.

        this.speeder = (Math.floor(Math.random() * 3)) + 1

        // Load image and set size and position.

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


    // Draws the extra life on the screen and updates it position.

    draw() {
        if (this.image) {
            this.x = this.x - (velocity * this.speeder); //Update object's position.
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
}


class Actors {

    /* The actors class will keep track of the position, spawning, and destroying of
    all the moving actors in the screen. */

    constructor() {

        // There are five different planet images stored in a list.

        this.planetChoice = ['./material/planet1.png', './material/planet2.png', './material/planet3.png', './material/planet4.png', './material/planet5.png'];

        // When actor's class is initialized, three meteors are spawned on the screen.

        this.meteors = [new Meteor(), new Meteor(), new Meteor()];

        // When actor's class is initialized, no bonus lifes are spawned on the screen.

        this.lives = [];

        // When actor's class is initialized, one planet is spawned on the screen.

        this.planets = [new Planet(this.choosePlanet())];


        this.explosions = [];

    }

    // The following method chooses which planet image is used when a planet spawns.

    choosePlanet() {

        /* When list of planet is not empty, pick a random picture. Then remove
        the picture from the list, so that it can't be picked again later on. */

        if (this.planetChoice.length != 0) {
            var choice = Math.floor(Math.random() * this.planetChoice.length)
            var planetAddress = this.planetChoice[choice]
            this.planetChoice.splice(choice, 1);
            return planetAddress
        }

        /* If the list of planet pictures is empty, repopulate the list and pick a random picture.
        Then remove the picture from the list, so that it can't be picked again later on. */
        else {
            this.planetChoice = ['./material/planet1.png', './material/planet2.png', './material/planet3.png', './material/planet4.png', './material/planet5.png']
            var choice = Math.floor(Math.random() * this.planetChoice.length)
            var planetAddress = this.planetChoice[choice]
            this.planetChoice.splice(choice, 1);
            return planetAddress
        }
    }

    // Add a new instance of meteor to the "meteors" list. (Spawn a meteor on screen.)

    spawnMeteor() {
        this.meteors.push(new Meteor())
    }

    // Remove instance of Meteor from the "meteors" list. (Remove meteor from screen.)

    destroyMeteor(index) {
        var xPosition = this.meteors[index].x
        var yPosition = this.meteors[index].y
        var audio = new Audio('./material/explosion/explosion.wav');
        audio.play();
        this.addExplosion(xPosition, yPosition)
        this.meteors.splice(index, 1);
    }

    // Add a new instance of LifeBonus to the "lives" list. (Spawn an extra life on screen.)

    spawnLife() {
        this.lives.push(new LifeBonus())
    }

    // Remove instance of LifeBonus from the "lives" list. (Remove extra life from screen.)

    destroyLife(index) {
        this.lives.splice(index, 1);
    }

    /* This method checks if word typed by user matches word assigned to
    a meteor or extra life. */

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
        c.moveTo(100, 100)
        c.lineTo(1000, 1000)
        c.stroke();
    }

    // Add a new instance of Planet to the "planets" list. (Spawn a planet on screen.)

    spawnPlanet() {
        this.planets.push(new Planet(this.choosePlanet()));
    }

    // Remove instance of Planet from the "planets" list. (Remove planet from screen.)

    destroyPlanet(index) {
        this.planets.splice(index, 1);
    }

    addExplosion(xPosition, yPosition) {
        this.explosions.push(new Explosion(xPosition, yPosition))
    }


}


class Input {

    //The "Input" class listens and tracks what the user has typed.

    constructor() {

        // "targetWord" holds the letters of the word the user is currently typing.

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
        document.addEventListener('keydown', function(e) {
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



// Initialize input class.
const input = new Input();

// Initialize score class.
const score = new Score()

// Initialize Player class.
const player = new Player()

// Initialize class for moving actors.
const actors = new Actors();

//Initialize life class.
const life = new Life();

//Start keyboard key listeners
input.checkForInput(life)

/* Initialize "lifeFrequency" variable at value 0.
The "lifeFrequency" variable holds a value that determines whether or not a bonus life spawns.*/
var lifeFrequency = 0;


function update() {


    // Clears the screen from all elements.

    c.clearRect(0, 0, canvas.width, canvas.height);

    // Draws next frame of background video.

    c.drawImage(video, 0, 0, 1920, 1080);

    // Checks if it needs to destroy and spawn a planet.

    for (var i = 0; i < actors.planets.length; i++) {
        if (actors.planets.length != 0) {
            if (actors.planets[i].x < -500) {
                actors.destroyPlanet(i)
                actors.spawnPlanet()
            }
        }
    }

    // Draws the planet on the screen (and updates its position).

    for (var i = 0; i < actors.planets.length; i++) {
        if (actors.planets.length != 0) {
            actors.planets[i].draw()
        }
    }

    // Checks if meteors have reached ship.

    for (var i = 0; i < actors.meteors.length; i++) {
        if (actors.meteors[i].x < 50) {
            actors.destroyMeteor(i) // Destroy meteors if it reaches ship.
            actors.spawnMeteor() // Spawn new meteor.
            life.loseLife(player) // Lose life.
            if (life.getLife() == 0) {
                alert("Game Over - Your Score is: " + parseInt(score.getScore())) //If life reaches 0, end game.
            }
        }
    }

    // Every time the player gaines 100 points, add a new meteor into the loop.

    if (Math.floor(score.getScore()) % 100 == 0) {
        actors.spawnMeteor()
        score.score += 1 //Add one to make sure score isn't 100 by next frame.
    }


    // Draw each meteor on the screen (and update their position).

    for (var i = 0; i < actors.meteors.length; i++) {
        if (actors.meteors.length != 0) {
            actors.meteors[i].draw()
        }
    }


    for (var i = 0; i < actors.explosions.length; i++) {
        if (actors.explosions.length != 0) {
            actors.explosions[i].draw()
        }
    }


    for (var i = 0; i < actors.explosions.length; i++) {
        if (actors.explosions.length != 0) {
            actors.explosions[i].increment_frame_counter()
        }
    }

    for (var i = 0; i < actors.explosions.length; i++) {
        if (actors.explosions.length != 0) {
            if (actors.explosions[i].spriteSelection == 32) {
                actors.explosions.splice(i, 1)
            }
        }
    }



    // Draw any bonus lives that have spawned.

    for (var i = 0; i < actors.lives.length; i++) {
        if (actors.lives.length != 0) {
            actors.lives[i].draw()
        }
    }

    //Checks if bonus life has reached past the ship; if so, destroy the life.

    for (var i = 0; i < actors.lives.length; i++) {
        if (actors.lives.length != 0) {
            if (actors.lives[i].x < -100) {
                actors.destroyLife(i)
            }
        }
    }

    // Increment the player's score in each frame.

    score.increment()

    // Display the player's current score on the screen.

    score.draw()

    // Draw the player ship on the screen.

    player.draw()

    // Each frame, increase the standard velocity by a small increment.

    velocity = velocity + .0001

    // Display the player's current health.

    life.draw()

    // Display the letters the user has currently typed.

    input.draw()

    /* Increase "lifeFrequency" increments by 1 each frame. */

    lifeFrequency += 1;

    // When "lifeFrequency" reaches 1000, span a bonus life, and reset the "lifeFrequency" value to 0. 

    if (lifeFrequency == 1000) {
        actors.spawnLife()
        lifeFrequency = 0;
    }

    // Runs the game loop

    requestAnimationFrame(update); // wait for the browser to be ready to present another animation fram.    

}