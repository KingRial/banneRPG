_jMath=new function (){
	//--------------------------------------------------------------------------------
	//Vector
	//--------------------------------------------------------------------------------
	this._vector=function(x,y,z){
		if(!x)x=0;
		if(!y)y=0;
		if(!z)z=0;
		this.x=x;
		this.y=y;
		this.z=z;
		this.add=function(k){
			var result=new _jMath._vector();
			if(isNaN(k)){
				result.x=this.x+k.x;
				result.y=this.y+k.y;
				result.z=this.z+k.z;
			}
			else{
				result.x=this.x+k;
				result.y=this.y+k;
				result.z=this.z+k;
			}
			return result;
		}
		
		this.cross=function(k){
			var result=new _jMath._vector();
			if(isNaN(k)){
				console.error('TODO: _jMath cross with vector:%o',k);
			}
			else{
				result.x=this.x*k;
				result.y=this.y*k;
				result.z=this.z*k;
			}
			return result;
		}
		
		this.isNull=function(){
			return (!this.x&&!this.y&&!this.z);
		}
		
		this.setNull=function(){
			this.x=0;
			this.y=0;
			this.z=0;
			return this;
		}
	}
	
	this.Vector=function(x,y,z){
		return new this._vector(x,y,z);
	}
	
	this.i=this.Vector(1,0,0);
	this.j=this.Vector(0,1,0);
	this.k=this.Vector(0,0,1);
}