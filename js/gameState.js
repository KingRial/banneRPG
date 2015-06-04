_jGameState=function(options){
	if(!options)options={};
	this.id=(options.id?options.id:null);
	this._resourcesDesc=(options.resourcesDesc?options.resourcesDesc:new Array());
	this._resourcesLoaded=false;
	this._entitiesDesc=(options.entitiesDesc?options.entitiesDesc:new Array());
	this._entities=new Array();
	this._pixToMeter=(options.pixToMeter?options.pixToMeter:30); //1 meter = 30 px
	this._vecGravityForce=_jMath.Vector(0,(9.8/this._pixToMeter),0);/*_jMath.Vector(0,0,0);*/
	
	this.hasResourcesToLoad=function(){
		return ((this._resourcesDesc.length!=0)&&(this._resourcesLoaded==false)?true:false);
	}
	
	this.isLoaded=function(value){
		if(!value && value!=false)return this._resourcesLoaded;
		else this._resourcesLoaded=value;
	}
	
	this.addEntity=function(oEntity){
		if(oEntity)this._entities.push(oEntity);
	}
	
	this.update=function(deltaTime,key){
		for(var i in this._entities){
			var oEntity=this._entities[i];
			//Forces - Gravity
			if(oEntity.getMass()){
				oEntity._vecForce=oEntity._vecForce.add(this._vecGravityForce);
			}
			//Collisions
//TODO: rivedere il collission detection: due for non hanno senso e servono solo per una pseudo demo
			if(oEntity.isWorldEntity()){
				//Collision Detection
				if(oEntity.getBoundingBox()){
					for(var j in this._entities){
						var target=this._entities[j];
						if(oEntity.checkCollision(target))
							console.error('Collision');
							//console.error('Collision Bounding Box oEntity:%o target:%o',oEntity._bounding_box,target._bounding_box);
					}
				}
//TODO: cagato per non far scendere oltre il fondo una entity
if(oEntity._position.y>80){
	oEntity._vecForce.setNull();
	oEntity._vecVelocity=oEntity._vecForce.cross(deltaTime/oEntity._stats._mass);
}
			}
			//Tick
			oEntity.tick({
				deltaTime:deltaTime,
				inputKeys:(oEntity.isPlayer()?key:null)
			});
		}
	}
	this.run=function(ctx){
		for(var i in this._entities){
			this._entities[i].run(ctx);
		}
	}
	
	this.clean=function(){
		for(var i in this._entities){
			this._entities[i].clean();
		}
	}
}