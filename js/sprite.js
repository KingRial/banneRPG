_jSprite=function(options){
	if(!options)options={};
    this._oResource=(options.oResource?options.oResource:null);
	this._position=_jMath.Vector(options.position.x,options.position.y,options.position.z);//(options.position?{x:(options.position.x?options.position.x:0),y:(options.position.y?options.position.y:0),z:(options.position.z?options.position.z:0)}:{x:0,y:0,z:0});//Entity Position
	this._size={};
	this._scale={
		_x:1,
		_y:1,
		_pixToMeter:(options.pixToMeter?options.pixToMeter:30), //1 meter = 30 px
		_move:90
	};
	
	this.getSize=function(params){
		return this._oResource.getSize(params);
	}
	
	this.draw=function(ctx){
		var resource=this._oResource.getResource();
		if(resource){
			this._size=this.getSize();
			ctx.drawImage(
				resource,
				(this._position.x-(this._size.width/2)),
				(this._position.y-(this._size.height/2)),
				this._size.width,
				this._size.height
			);
		}
		else _jLogger.log('[_jSprite.getCurrentResource] Unable to get resource','error');
	}
}