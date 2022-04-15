let config = {
    type: Phaser.AUTO,
    width: 880,
    height: 480,
    scene: [ Menu, Play ]
  }



let game = new Phaser.Game(config);

// reserve keyboard vars
let keyUP, keyR, keyLEFT, keyRIGHT, keyW, keyA, keyD;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

