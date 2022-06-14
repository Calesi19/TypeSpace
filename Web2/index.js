<<<<<<< Updated upstream
//alert('Are you ready to play?!')


/*  This code recognizes take user input keys. We can alter it to recognize every key in the keyboard.
=======





var canvas = document.getElementById("canV");
var c = canvas.getContext("2d");


var video = document.createElement("video");
video.src = "material/spaceBackGroundMoving.mp4";
video.addEventListener('loadeddata', function() {
  video.play();  // start playing
  update(); //Start rendering
});


canvas.width = 1920//window.innerWidth
canvas.height = 1080//window.innerHeight

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
        c.font = + parseInt((50)) + 'px monospace';
        c.fillText('SCORE:' + parseInt(this.score), 15, 50)
    }
}



class Player {
    constructor() {
        //this.word = word;
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
>>>>>>> Stashed changes


<<<<<<< Updated upstream
*/

document.onclick= function(event) {
    // Compensate for IE<9's non-standard event model
    //
    if (event===undefined) event= window.event;
    var target= 'target' in event? event.target : event.srcElement;

    alert('clicked on '+target.tagName);
    document.getElementById('title').style.visibility = 'hidden';
};

FPS = 10;
setInterval(meteorLeft, FPS);

function meteorLeft() { // moves the meteor left across the screen
    var step = 5;
    var y = document.getElementById('meteor').offsetLeft;
    y = y - step;
    document.getElementById('meteor').style.left = y + "px";

}


document.addEventListener('keydown', function(event) {
    // var step = 50;
    if (event.keyCode == 65) {
        alert('A was pressed');
        // var y = document.getElementById('meteor').offsetLeft;
        // y = y - step;
        // document.getElementById('meteor').style.left = y + "px";
    } else if (event.keyCode == 87) {
        alert('W was pressed');
    } else if (event.keyCode == 69) {
        alert('E was pressed');
    }
    if (event.keyCode == 82) {
        alert('R was pressed');
    } else if (event.keyCode == 84) {
        alert('T was pressed');
    } else if (event.keyCode == 89) {
        alert('Y was pressed');
    }

});

var object = document.getElementById('meteor');

for (var i = 0; i < 1720; i++) {
    object.style.left = parseInt(object.style.left - 1) + 'px';
}
=======


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

}

const score = new Score()
const player = new Player()
const actors = new Actors();

function update(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    //c.drawImage(video,0,0,1920,1080);

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
        score.score += 10
    }

    score.increment()
    score.draw()
    player.draw();
    velocity = velocity + .0001
    
    
    requestAnimationFrame(update); // wait for the browser to be ready to present another animation fram.       
}




>>>>>>> Stashed changes
