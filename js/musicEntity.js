_jMusicEntity=function(options){
	_jEntity.call(this,options);
	this._type='entityMusic';
	
	//.volume=35;
	
	this.run=function(){
		var resource=this.getCurrentResource();
		resource.loop=true;
		resource.play();
	}
	
	this.clean=function(){
		var resource=this.getCurrentResource();
		resource.pause();
		resource.currentTime=0;
	}
}