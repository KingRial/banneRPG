_jWorldEntityAnimated=function(options){
	_jWorldEntity.call(this,options);
	this._currentFrame=0;
	this._currentState=null;
	this._deltaTimeFrame=0;
	this._fpsAnimation=16;
	this._spfAnimation=(1/this._fpsAnimation);
	
	this.tick=function(params){
		if(params.inputKeys){
			this._vecVelocity=_jMath.Vector(
				(params.inputKeys.right-params.inputKeys.left),
				(params.inputKeys.down-params.inputKeys.up),
				0);
		}
		
		//Updating velocity from forces
		if(!this._vecForce.isNull()){
		}
		
		//Velocity and Space
		var deltaSpace=0;
		deltaSpace=this._vecVelocity.cross(this._scale._move).cross(params.deltaTime); //Scaling velocity and Calculatin Vo*t
		if(!this._vecForce.isNull()){
			//dS=Vo*t+((F/mass)t^2)/2; Using acceleration
			deltaSpace=deltaSpace.add(this._vecForce.add((params.deltaTime*params.deltaTime)/(2*this._stats._mass)));
			this._vecVelocity=this._vecForce.cross(params.deltaTime/this._stats._mass);
		}
		
		//Animation State and Position
		if(this._vecVelocity.isNull()){
			this.setState('idle'); //Idle State Animation
		}
		else{
			this._position=this._position.add(deltaSpace);
			
			//Todo: cagato pazzesco per gestire il flip dell'immagine che cammina
			if(this._scale._x>0 && this._vecVelocity.x>0)this._scale._x*=-1;
			if(this._scale._x<0 && this._vecVelocity.x<0)this._scale._x*=-1;
			
			this.setState('walk');//Walking State Animation
		}
		
		//Animation Frame
		this._deltaTimeFrame+=params.deltaTime;
		var delta=this._deltaTimeFrame/this._spfAnimation;
		if(delta>=1){
			this._deltaTimeFrame-=this._spfAnimation;
			this._currentFrame++;
			var totFrames=this._oResource.getFrames({state:this._currentState});
			if(this._currentFrame>=totFrames)this._currentFrame=0;
		}
	}
	
	this.getCurrentResource=function(){
		return this._oResource.getResource({state:this._currentState,frame:this._currentFrame});
	}
	
	this.setState=function(state){
		var next_state=this._oResource.getStateIndex(state);
		if(this._currentState!=next_state){
			this._currentState=next_state;
			this._currentFrame=0;
		}
	}
	
	this.draw=function(ctx){
		var draw_parameters={state:this._currentState,frame:this._currentFrame};
		var resource=this._oResource.getResource(draw_parameters);
		if(resource){
			this._size=this.getSize(draw_parameters);
			var frameSet=this._oResource.getFrameSet(draw_parameters);
			var isFrameSet=(frameSet||frameSet==0?true:false);
			var drawPosition={
				x:(this._position.x-(this._size.width/2)),
				y:(this._position.y-(this._size.height/2))
			};
			ctx.save();
			ctx.translate(this._position.x,this._position.y);
			//ctx.rotate(Math.PI);
			if(this._scale._x!=1||this._scale._y!=1)ctx.scale(this._scale._x,this._scale._y);
			ctx.translate(-this._position.x,-this._position.y);
			ctx.drawImage(
				resource,
				(isFrameSet?this._currentFrame*this._size.width:0), //source X
				(isFrameSet?frameSet*this._size.height:0), //source Y
				this._size.width, //source width
				this._size.height, //source height
				drawPosition.x, //destination canvas position x
				drawPosition.y, //destination canvas position y
				this._size.width, //destination canvas width
				this._size.height //destination canvas height
			);
			ctx.restore();
		}
		else _jLogger.log('[_jSprite.getCurrentResource] Unable to get resource','error');
	}
}