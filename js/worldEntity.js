_jWorldEntity=function(options){
	_jEntity.call(this,options);
	this._type='worldEntity';
	this._status._is_worldEntity=true;
	this._stats._mass=0;
	this._bounding_box=null;
	this._vecVelocity=_jMath.Vector(0,0,0);
	this._vecForce=_jMath.Vector(0,0,0);
	
	this.getBoundingBox=function(){
		return this._bounding_box;
	}
	
	this.checkCollision=function(target){
		var result=false;
		if(this!=target && this._bounding_box && !isNaN(this._bounding_box.upperLeft.x) && target._bounding_box && !isNaN(target._bounding_box.upperLeft.x)){
			//Finding when the boungind boxes are separated and then negate
			result=!(	(this._bounding_box.upperLeft.x  > target._bounding_box.lowerRight.x) || (this._bounding_box.lowerRight.x < target._bounding_box.upperLeft.x) ||
						(this._bounding_box.upperLeft.y > target._bounding_box.lowerRight.y) || (this._bounding_box.lowerRight.y < target._bounding_box.upperLeft.y)
					);
		}
		else result=false;
		return result;
	}
}