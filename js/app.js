//Assign the player's original position
const RENDER_AT_POSITION = (x,y) => [x * 101, y * 83-15];

// Enemies our player must avoid
class Enemy {
    constructor() {
	    // Variables applied to each of our instances go here,
	    // we've provided one for you to get started

	    //Set enemy initial location
        this.x=-1;
        //Randomize the enemy startpoint in the grey field
		this.y = Math.floor(Math.random() * 3 + 1);

        //Initialize enemy speed
		this.s = (Math.random() * 13 + 1)/2;

	    // The image/sprite for our enemies, this uses
	    // a helper we've provided to easily load images
	    this.sprite = 'images/enemy-bug.png';
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		//Set enemy speed
    	this.x += this.s*dt;
	}

	// Draw the enemy on the screen, required method for game
	render() {

    	ctx.drawImage(Resources.get(this.sprite), ...RENDER_AT_POSITION(this.x,this.y));
	}
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
    	//Set Player initial location
    	this.x = 2;
    	this.y = 5;

	    this.sprite = "images/char-boy.png";
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update() {

	}

	// Draw the enemy on the screen, required method for game
	render() {

    	ctx.drawImage(Resources.get(this.sprite), ...RENDER_AT_POSITION(this.x,this.y));
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player ();

let allEnemies = [new Enemy];




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
