_jActor=function(options){
	_jWorldEntityAnimated.call(this,options);
	this._stats._mass=1;
	
	this.getSize=function(params){
		var size=this._oResource.getSize(params);
		this._bounding_box={
			upperLeft:{
				x:(this._position.x-(this._size.width/2)),
				y:(this._position.y-(this._size.height/2))
			},
			lowerRight:{
				x:(this._position.x+(this._size.width/2)),
				y:(this._position.y+(this._size.height/2))
			}
		};
		return size;
	}
}