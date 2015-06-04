_jResource=function(options){
	this.id=(options.id?options.id:null);
	this._type=(options.type?options.type:null);
	this._states=new Array();
	
	this.getResource=function(params){
		if(!params)params={};
		if(!params.state)params.state=0;
		if(!params.frame)params.frame=0;
		return (this._states[params.state].frameSetBox?
			this._states[params.state].resources[0]:
			this._states[params.state].resources[params.frame]
		);
	}
	
	this.getFrames=function(params){
		if(!params)params={};
		if(!params.state)params.state=0;
		return (this._states[params.state].frames?
			this._states[params.state].frames:
			this._states[params.state].resources.length
		);
	}
	
	this.getFrameSet=function(params){
		if(!params)params={};
		if(!params.state)params.state=0;
		return this._states[params.state].frameSet;
	}
	
	this.getState=function(id){
		var state=null;
		for(var i in this._states){
			if(this._states[i].id==id){
				state=this._states[i];
				break;
			}
		}
		return state;
	}
	
	this.getStateIndex=function(id){
		var index=0;
		for(var i in this._states){
			if(this._states[i].id==id){
				index=i;
				break;
			}
		}
		return index;
	}
	
	this.getSize=function(params){
		if(!params)params={};
		if(!params.state)params.state=0;
		if(!params.frame)params.frame=0;
		return (this._states[params.state].frameSetBox?
			this._states[params.state].frameSetBox:
			{
				width:this._states[params.state].resources[params.frame].width,
				height:this._states[params.state].resources[params.frame].height
			}
		);
	}
	
	this.addState=function(params){
		if(!params)params={};
		if(!params.id)params.id='default';
		var id=params.id;
		for(var i in this._states){
			if(this._states[i].id==id){
				_jLogger.log('[_jResource.addState] resource state id:'+id+' for resource id:'+this.id+' already used','error');
				return;
			}
		}
		this._states.push({
			id:id,
			resources:params.resources,
			frames:params.frames,
			frameSet:params.frameSet,
			frameSetBox:params.frameSetBox
		});
//console.error('%o',this._states[this._states.length-1]);
	}
	
	this.isAnimation=function(){
		var result=false;
		if((this._states.length>1) || (this._states[0].resources.length>1))result=true;
		return result;
	}
}