class Smallship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, timeValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.time = timeValue; 
        this.moveSpeed = game.settings.smallshipSpeed;         // pixels per frame
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width ) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}