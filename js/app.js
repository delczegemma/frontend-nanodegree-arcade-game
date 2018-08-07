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

    	this.checkOutside();
	}

	// Draw the enemy on the screen, required method for game
	render() {

    	ctx.drawImage(Resources.get(this.sprite), ...RENDER_AT_POSITION(this.x,this.y));
	}
	//Remove passed bugs from the array
    checkOutside(){
    	if (this.x >= 6) {
    		allEnemies.splice(allEnemies.indexOf(this),1);
    	}
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
		this.checkCollisions();
	}

	// Draw the enemy on the screen, required method for game
	render() {

    	ctx.drawImage(Resources.get(this.sprite), ...RENDER_AT_POSITION(this.x,this.y));
	}

	//*** Helper functions for the player***
    //Check, if one Enemy hit the Player and handles, what happens then
    checkCollisions(){
    	let coll = false;
    	const R = .7;
    	for(const ENEMY of allEnemies){
    		if(ENEMY.y === this.y && Math.abs(this.x - ENEMY.x)< R){
    			coll=true;
    			console.log("collision happened");
    		}
    	}
    	return coll;
    }

	/*
	*Handles the input for the player to move.
	*The branches are preventing the player to move off-screen
	*/
	handleInput(direction){
		switch (direction){
			case 'left':
				if (this.x>=1){
					this.x--
				}
				break;
			case 'up':
				if (this.y>=1){
					this.y--;
				}
				break;
			case 'right':
				if (this.x<4){
					this.x++;
				}
				break;
			case 'down':
				if (this.y<5){
					this.y++;
				}
				break;
			default:
			break;
		}
	};
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Start the game
const START_GAME = (function(global){
	// Now instantiate your objects.
	// Place the player object in a variable called player
	return function(){
		global.player = new Player ();

		// Place all enemy objects in an array called allEnemies
		global.allEnemies = [];

		let addEnemies = function add (){
			allEnemies.push(new Enemy);
			setTimeout(add, Math.random() * 2500);
		}
		addEnemies();
	}
}
)(this);




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
