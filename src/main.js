let config = {
    type: Phaser.AUTO,
    width: 880,
    height: 480,
    scene: [ Menu, Play, Multiplayer ]
  }



let game = new Phaser.Game(config);

// reserve keyboard vars
let keyUP, keyR, keyLEFT, keyRIGHT, keyW, keyA, keyD, keyDOWN;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let scoreConfig = {
  fontFamily: 'Courier',
  fontSize: '28px',
  backgroundColor: '#F3B141',
  color: '#843605',
  align: 'right',
  padding: {
      top: 5,
      bottom: 5,
  },
  fixedWidth: 100
}

// Name: Jonathan Alvarez
// Project Title: The Legend of New Super Rocket Patrol Meme Edition + 2 players & knuckles founders edition + ratio ver (1.0 + 1.0) Final Chapter
// Date: 4/18/22
// Hours: ~15

//Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//Implement a simultaneous two-player mode (30)
//Display the time remaining (in seconds) on the screen (10)
//Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
//Implement the 'FIRE' UI text from the original game (5)
//Allow the player to control the Rocket after it's fired (5)
//Create 4 new explosion SFX and randomize which one plays on impact (10)
// 20 + 30 + 10 +20 + 5 + 5 + 10 = 100
