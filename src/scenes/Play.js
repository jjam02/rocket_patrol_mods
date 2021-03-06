class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket2', './assets/rocket2.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('smallship', './assets/smallship.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        
        
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background 
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        // add small ship here to be under border
        this.small01 = new Smallship(this, game.config.width, borderUISize*6 + borderPadding*4+50, 'smallship', 0, 40,4).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2-100, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        //this.p2Rocket = new Rocket2(this, game.config.width/2+100, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5, 0);
        
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30,3).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20,2).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10,1).setOrigin(0,0);
        

        // animation config
        this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        //this.p2Score = 0;
        this.p1Timer = game.settings.gameTimer/1000
        // display score
        // let scoreConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3B141',
        //     color: '#843605',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 100
        // }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "P1:"+this.p1Score, scoreConfig);
        //this.scoreLeft2 = this.add.text(borderUISize + borderPadding+200, borderUISize + borderPadding*2,"P2:"+ this.p2Score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        
        
        this.scoreRight = this.add.text(game.config.width/2, borderUISize + borderPadding*2 +18, "TIME: "+this.p1Timer, scoreConfig).setOrigin(0.5);
        this.fireText = this.add.text(borderUISize + borderPadding+500, borderUISize + borderPadding*2, "", scoreConfig);
        this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        
    }

    update() {
        if(this.p1Rocket.isFiring == true){
            this.fireText.text = "FIRE!";

        }else if (this.p1Rocket.isFiring == false){
            this.fireText.text = "";
        }
        if(this.p1Timer==0){
            //this.scoreRight.text = "TIME: 0";
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ??? for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        

        if(!this.gameOver) {
            this.starfield.tilePositionX -= 4;
            this.p1Rocket.update();             // update p1
            //this.p2Rocket.update();
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.small01.update();
           
            
            
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.small01)) {
            console.log('kaboom ship 03');
            this.p1Rocket.reset()
            this.shipExplode(this.small01);   
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            console.log('kaboom ship 03');
            this.p1Rocket.reset()
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            console.log('kaboom ship 02');
            this.p1Rocket.reset()
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            console.log('kaboom ship 01');
            this.p1Rocket.reset()
            this.shipExplode(this.ship01);
        }

        
    }


checkCollision(rocket, ship) {
    // simple AABB checking
    if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) {
            return true;
    } else {
        return false;
    }
}
shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
    }); 
    // score add and repaint
    this.p1Score += ship.points;
    this.p1Timer += ship.time;
    this.scoreLeft.text = "P1:"+this.p1Score;  
    let num  = Math.floor(Math.random()*4);
    if(num==0){
        this.sound.play('sfx_explosion');  
    }else if(num==1){
        this.sound.play('sfx_explosion2');  
    }else if(num == 2){
        this.sound.play('sfx_explosion3');  
    }else if(num==3){
        this.sound.play('sfx_explosion4');  
    }
      
  }

  
  
onEvent = function(){
    if(this.p1Timer!=0){
    this.p1Timer -= 1; // One second
    this.scoreRight.text = "TIME: "+this.p1Timer;
    }
  } 
}
