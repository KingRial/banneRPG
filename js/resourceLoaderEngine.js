_jResourceLoader=new function(){
    this._totToLoad=0;
    this._loaded=0;
	this._resources={};
	
	this.onLoaded=function(){}
	this.onLoading=function(iLoaded,iTotToLoad){}
	
	this.getResource=function(params){
		if(!params)params={};
		var result=null;
		if(params.id){
			if(params.type)result=this._resources[params.type][params.id];
			else{
				for(var i in this._resources){
					for(var j in this._resources[i]){
						if(j==params.id){
							result=this._resources[i][j];
							break;
						}
					}
					if(result)break;
				}
			}
		}
		return result;
	}
	
	this.load=function(params){
//TODO cambiare come si passano i parametri per le animazioni alla load dal desc delle risorse
		if(!params)return;
		var id=params.id;
		var type=params.type;
		var states=params.states;
		if(!params.states && params.url){
			states={'default':{urls:new Array()}};
			states['default'].urls.push(params.url);
		}
		if(!this._resources[type])this._resources[type]={};
		if(!this._resources[type][id])this._resources[type][id]=new Array();
		else _jLogger.log('[_jResourceLoader.load] resource id:'+id+' already used','error');
		//Registering resource
		this._resources[type][id]=new _jResource({id:id,type:type});
		var aResources=new Array();
		for(var i in states){
			var state=states[i];
			var state_id=i;
			for(var j in state.urls){
				var url=state.urls[j];
				var data=document.createElement(type);
				this._totToLoad++;
				_jLogger.log('[_jResourceLoader.load] loading ['+type+'] '+id+' from url:'+url,'debug');
				// TODO: proper error handling
				$(data).one('error',{type:type,id:id,url:url},$.proxy(this.loadCallbackError,this));
				data.setAttribute('id',id);
				data.setAttribute('src',url);
				switch(type){
					case 'video':
					case 'audio':
						$(data).one('canplaythrough',{type:type,id:id,url:url},$.proxy(this.loadCallback,this));
						data.setAttribute('autobuffer','autobuffer');
						data.load();
					break;
					default:
						$(data).one('load',{type:type,id:id,url:url},$.proxy(this.loadCallback,this));
					break;
				}
				aResources.push(data);
			}
			this._resources[type][id].addState({
				id:state_id,
				resources:aResources,
				frames:state.frames,
				frameSet:state.frameSet,
				frameSetBox:state.frameSetBox
			});
		}
    }
	
	this.loadCallback=function(e){
		_jLogger.log('[_jResourceLoader.loadCallback] loaded resource ['+e.data.type+'] '+e.data.id+' from url:'+e.data.url,'debug');
		this._loaded++;
		this.loadCheckComplete();
	}
	
	this.loadCallbackError=function(e){
		_jLogger.log('[_jResourceLoader.load] Unable to load resource ['+e.data.type+'] '+e.data.id+' from url:'+e.data.url,'error');
		this._loaded++;
		this.loadCheckComplete();
	}
	
	this.loadCheckComplete=function(){
		if(this._loaded==this._totToLoad){
			_jLogger.log('[_jResourceLoader.loadCallback] loading datas complete.','debug');
			this.onLoaded();
		}
		else {
			_jLogger.log('[_jResourceLoader.loadCallback] datas still to load:'+(this._totToLoad-this._loaded),'debug');
			this.onLoading(this._loaded,this._totToLoad);
		}
	}
}