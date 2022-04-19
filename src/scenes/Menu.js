class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/horn.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_explosion2', './assets/discord.wav');
        this.load.audio('sfx_explosion3', './assets/samsung.wav');
        this.load.audio('sfx_explosion4', './assets/bruh.wav');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Player 1 (WHITE) Use ←→ arrows to move & (↑) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+50, 'Player 2 (BLUE) Use A & D arrows to move & W to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding+100, 'Press ← for Novice 1player or → for Expert 1player', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding+150, 'Press ↑ for Novice 2player or ↓ for Expert 2player', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
    update() {
      if (Phaser.Input.Keyboard.JustDown(keyUP)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            smallshipSpeed: 5,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('2playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            smallshipSpeed: 6,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('2playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            smallshipSpeed: 5,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            smallshipSpeed: 6,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        
      }
  }