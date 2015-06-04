_jEntity=function(options){
	_jSprite.call(this,options);
	this._id=null
	this._type='entity';
	this._status={
		_is_player:false,
		_is_worldEntity:false
	};
	this._stats={};
	
	this.isPlayer=function(){
		return this._status._is_player;
	}
	
	this.getMass=function(){
		return this._stats._mass;
	}
	
	this.isWorldEntity=function(){
		return this._status._is_worldEntity;
	}
	
	this.tick=function(params){
	}
	
	this.run=function(params){
		this.draw(params);
	}
	
	this.clean=function(){
		//TODO: che potrebbe fare ?:P
	}
}