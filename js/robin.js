var RobinSprite = cc.Sprite.extend( {

	state: kRobinStateStopped,
	speedY: 0.0,
	topOfScreen: 0,
	
	ctor: function (spriteFrameName) {
		this._super(spriteFrameName);
	},
	
	UpdateRobin: function(dt) {
		if(this.state == kRobinStateMoving) {
			var distance = 0;
			var newSpeed = 0;
			
			//d= -(1/2)at^2
			distance = this.speedY * dt + 0.5 * GRAVITY * dt * dt;
			
			//
			newSpeed = this.speedY + GRAVITY * dt;
			
			//console.log('distance:' + distance);
			//console.log('newSpeed:' + newSpeed.toFixed(2) + " " + (GRAVITY * dt).toFixed(2));
			
			this.y = this.y + distance;
			this.speedY = newSpeed;
			
			if(this.y > this.topOfScreen ) {
				this.y = this.topOfScreen;
				this.speedY = 0.0;
			}
		}
	},
	
	Reset: function() {
		this.state = kRobinStateStopped;
		this.SetStartSpeed();
	},
	
	SetStartSpeed: function() {
		this.speedY = kRobinStartSpeedY;
	},
	
	TubeCollisionBox: function() {
	}

});