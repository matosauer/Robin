var GameLayer = cc.Layer.extend({
	ctor:function() {
		this._super();
		this.init();
	},
	init:function() {
		this._super();
		var size = cc.director.getWinSize();
	
		var bgsprite = cc.Sprite.create(res.BG_IMAGE);
		bgsprite.setPosition(size.width / 2, size.height / 2);
		this.addChild(bgsprite, kZindexBG);
		
		this._floor = cc.Sprite.create(res.FLOOR_IMAGE);
		this._floor.setPosition(0, 0);
		this._floor.setAnchorPoint(0,0);
		this.addChild(this._floor, kZindexFloor);
		
		this._robin = new RobinSprite(res.ROBIN_IMAGE);
		this._robin.x = kRobinStartX;
		this._robin.y = size.height / 2;
		this._robin.topOfScreen = size.height;
		this._robin.Reset();
		this.addChild(this._robin, kZindexRobin);
		
	},
	
	onEnter:function() {
		this._super();	
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);
		
		this.schedule(this.onTick);

	},
	
	onTick:function(dt) {
		
		
		if (this._robin.y < this._floor.height){
			this._robin.Reset();
			this._robin.y = this._floor.height;
			//this._robin.state = kRobinStateStopped;
		}
		
		/*
		if(this._robin.y < this._floor.y / 2) {
			this._robin.Reset();
			this._robin.y = cc.director.getWinSize().height / 2;
		}
		*/
		
		this._robin.UpdateRobin(dt);
	},
	
	onTouchBegan:function(touch, event) {
		var tp = touch.getLocation();
		var tar = event.getCurrentTarget();
		console.log('onTouchBegan:' + tp.x.toFixed(2) + ','  + tp.y.toFixed(2));
		
		if(tar._robin.state == kRobinStateStopped) {
			tar._robin.state = kRobinStateMoving;
		}
		tar._robin.SetStartSpeed();
		
		return false;
	},
	
	onTouchMoved:function(touch, event) {
		var tp = touch.getLocation();
		console.log('onTouchMoved:' + tp.x.toFixed(2) + ','  + tp.y.toFixed(2));
	},
	
	onTouchEnded:function(touch, event) {
		var tp = touch.getLocation();
		console.log('onTouchEnded:' + tp.x.toFixed(2) + ','  + tp.y.toFixed(2));
	},

});

GameLayer.scene = function() {
	var scene = new cc.Scene();
	var layer = new GameLayer();
	scene.addChild(layer);
	return scene;
}

window.onload = function(){

	var targetWidth = 960;
	var targetHeight = 640;
	
    cc.game.onStart = function(){
		
		cc.view.adjustViewPort(false);
		cc.view.setDesignResolutionSize(targetWidth, targetHeight, cc.ResolutionPolicy.SHOW_ALL);
		cc.view.resizeWithBrowserSize(true);
		//load resources
		cc.LoaderScene.preload(["images/HelloWorld.png"], function () {                  
		cc.director.runScene(GameLayer.scene());
	  }, this);
    };
    cc.game.run("gameCanvas");
};
		  
	



























	
		  
		  
		  