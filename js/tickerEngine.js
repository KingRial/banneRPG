_jTicker=new function(){
	this._intervalHandler=null;
	this._rate=1000;
	this._deltaTime=0;
	this._waitTime=0;			//Time in which the game was paused
	this._lastTime=new Date().getTime()/1000
	this._isPaused=false;
	
    this.tick=function(){
        var current=new Date().getTime()/1000;
		this._deltaTime=current-this._lastTime;
		this._lastTime=current;
        if(this._isPaused!=true){
			this._deltaTime-=this._waitTime;
			this._waitTime=0;
			this.onTick(this._deltaTime);
		}
		else{
			this._waitTime+=this._deltaTime;
		}
    }
	
	this.onTick=function(deltaTime){}
	
    this.setRate=function(rate){
        this._rate=rate;
        if(this._intervalHandler)clearInterval(this._intervalHandler);
        this._intervalHandler=setInterval($.proxy(this.tick,this),(1000/this._rate));
    }
}