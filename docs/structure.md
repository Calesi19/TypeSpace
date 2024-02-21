## Description
This file is a basic rundown of index.js, come here before trying to decipher the massive file. This MD file is for you so you can understand the basic concepts and funcionality here before you try to decipher the massive file. We didn't try to follow traditional pseudocode practices, this is literally just a quick rundown of the file.

## Pseudocode

firebase stuff

game setup:
* game loop
* title screen
* etc

Classes:
* Explosions
    * initialization
    * series of frames
    * draw()
    * frame counter
* Planets
    * initialization
    * draw()
* Stars
    * initialization
    * spawn star
    * remove star
* Life
    * initialization
    * lose/gain lives
    * draw()
* Score
    * initialization
    * increment
    * draw()
* Player
    * initialization
    * hurt/heal states
    * draw()
* Meteor
    * initialization
        * word chosen from database randomly
        * speed chosen randomly
    * draw()
* LifeBonus
    * initialization
        * word chosen from database randomly
        * speed chosen randomly
    * draw()
* Laser
    * initialization
    * draw()
* Actors
    * arrays of other objects:
        * planet options
        * current meteors
        * current lives
        * current planets
        * current lasers
        * current explosions
    * choosePlanet()
    * spawnMeteor()
    * destroyMeteor(index)
    * spawnLife()
    * destroyLife(index)
    * checkActorMatch(targetWord)
    * spawnPlanet()
    * destroyPlanet(index)
    * addExplosion(x, y)
* Input
    * initialization
    * addLetter()
    * deleteLetter()
    * checkWord()
    * checkForInput()
        * event listener

initialize classes

update()
* clear screen
* draw stars
* draw/remove planets
* move planets
* move lasers
* remove lasers
* add meteor every 100 frames
* draw/move meteors
* draw/move explosions
* update explosions
* draw bonus lives
* remove bonus lives
* increment score
* draw score
* draw player
* increase overall velocity
* draw life
* draw input
* increase life frequency
* spawn bonus life
* check if meteors reached ship
    * remove/spawn meteor
    * check end of game
    * get username

game loop