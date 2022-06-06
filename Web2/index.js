//alert('Are you ready to play?!')


/*  This code recognizes take user input keys. We can alter it to recognize every key in the keyboard.


*/
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