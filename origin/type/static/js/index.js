//alert('Are you ready to play?!')


/*  This code recognizes take user input keys. We can alter it to recognize every key in the keyboard.


*/
console.log("heell");


document.addEventListener('keydown', function(event) {
    if (event.keyCode == 81) {
        alert('Q was pressed');
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