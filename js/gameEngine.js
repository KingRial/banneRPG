_jGameEngine=new function (){
	this._jCanvas=null;
	this._ctx=null;
	this._inputEngine=null;
	this._tickerEngine=null;
	this._fps=0;
	this._fpsTimeCounter=0;
	this._framesDrawn=0;
	this._pixelWidth=2;
	this._pixToMeter=30; 					//1 meter = 30 px
	//this._updateRate=1;					//Update Rate of ticker
	this._updateRate=60;					//Update Rate of ticker
	this._gameStates=new Array();			//Array of game states
	this._currentGameState='_intro';		//Current Game State
	
	/*
	* INIT GAME
	*/
	this.init=function(options){
		_jLogger._debug_enable=true;	//Enabling debug
		_jLogger.log('[_jGameEngine.init] Initialization started.','debug');
		if(!options)options={};
		this._jCanvas=options.jCanvas;
		this._ctx=options.jCanvas.get(0).getContext('2d')||null;
		this._inputEngine=options.inputEngine||null;
		this._tickerEngine=options.tickerEngine||null;
		
		//Elementi cagati per demo; dovrebbero venir caricati da un file di configurazione:
		this.addGameState(
			new _jGameState({
				id:this._currentGameState,//'_intro'
				resourcesDesc:[
					{id:'cat',type:'img',url:'data/img/creature_sprite.png'},
					{id:'music_background_intro',type:'audio',url:'data/music/musicIntro.mp3'}
				],
				entitiesDesc:[
					{type:'creature',position:{x:50,y:50},resourceId:'cat'},
					//{type:'music',resourceId:'music_background_intro'},
					{type:'UItext',position:{x:80,y:80},text:'Press Enter'}
				],
				pixToMeter:this._pixToMeter
			})
		);
		this.addGameState(
			new _jGameState({
				id:'_runningLevel',
				resourcesDesc:[
					{id:'dragon',type:'img',
						states:{
							'idle':{
								urls:['data/img/Sheet_Outlined_DragonPrincessSharper.png'],
								frames:1,
								frameSet:0,
								frameSetBox:{width:135,height:103}
							},
							'walk':{
								urls:['data/img/Sheet_Outlined_DragonPrincessSharper.png'],
								frames:8,
								frameSet:1,
								frameSetBox:{width:135,height:103}
							}
						}
					},
					{id:'chopper',type:'img',states:{
							'default':{
								urls:['data/img/chopper_00.png','data/img/chopper_01.png','data/img/chopper_02.png','data/img/chopper_03.png']
							}
						}
					},
					{id:'music_background_level',type:'audio',url:'data/music/musicLevel.mp3'}
				],
				entitiesDesc:[
					{type:'creature',position:{x:10,y:10},resourceId:'chopper'},
					{type:'creature',position:{x:250,y:10},resourceId:'chopper'},
					//{type:'music',resourceId:'music_background_level'},
					{type:'player',position:{x:100,y:70},resourceId:'dragon'}
				],
				pixToMeter:this._pixToMeter
			})
		);
		//Fine Cagato brutale per demo
		this.setGameState(this._currentGameState);
		this._tickerEngine.onTick=$.proxy(this.update,this);
		this._tickerEngine.setRate(this._updateRate);

		_jLogger.log('[_jGameEngine.initCallback] Initialization done.','debug');
		
		//TODO: gestire init state e unInit State tipo questo!!
		$(document).bind('keypress',{gameStateToSet:'_runningLevel'},$.proxy(this.keyPressed,this));
	}

//TODO: schifezza da cambiare completamente
	this.keyPressed=function(e){
		if(e.keyCode==13){
			console.error('TODO startGame: Invio:'+e.data.gameStateToSet);
			this.setGameState(e.data.gameStateToSet);
		}
		else if(e.keyCode==112){
			this._tickerEngine._isPaused=!this._tickerEngine._isPaused;
			console.error('TODO startGame : PAUSA:'+this._tickerEngine._isPaused);
		}
	}
//
	/*
	* UPDATE GAME
	*/
	this.update=function(deltaTime){
		this.getGameState(this._currentGameState).update(deltaTime,this._inputEngine.key);
//TODO: classe gestione draw 2d ?
		//Clearing canvas
		if(this._ctx){
			this._ctx.save();
			// Use the identity matrix while clearing the canvas
			this._ctx.setTransform(1, 0, 0, 1, 0, 0);
			this._ctx.clearRect(0,0,this._jCanvas.width()*this._pixelWidth,this._jCanvas.height()*this._pixelWidth);
			this._ctx.restore();
		}
		//Running entities
		this.getGameState(this._currentGameState).run(this._ctx);
		//FPS
		this._framesDrawn++;
		this._fpsTimeCounter+=deltaTime;
		if(this._fpsTimeCounter>=1){
			this._fps=this._framesDrawn;
//console.error('FPS:'+this._fps);
			this._fpsTimeCounter=0;
			this._framesDrawn=0;
		}
	}
	
	/*
	* GAME STATE MANAGEMENT
	*/
	this.addGameState=function(oGameState){
		_jLogger.log('[_jGameEngine.addGameState] Adding Game State:'+oGameState.id,'debug');
		this._gameStates[oGameState.id]=oGameState;
	}
	
	this.getGameState=function(id){
		return this._gameStates[id];
	}
	
	this.setGameState=function(id){
		_jLogger.log('[_jGameEngine.setGameState] Setting Game State:'+id,'debug');
		//Clearing Game Entities
		var gameState=this.getGameState(this._currentGameState);
		gameState.clean();
		//Setting current game State
		this._currentGameState=id;
		gameState=this.getGameState(this._currentGameState);
		if(gameState.hasResourcesToLoad()==true){
			_jResourceLoader.onLoaded=$.proxy(this.setGameStateCallback,this);
			for(var i in gameState._resourcesDesc)_jResourceLoader.load(gameState._resourcesDesc[i]);
		}
		else this.setGameStateCallback();
	}
	
	this.setGameStateCallback=function(){
		var gameState=this.getGameState(this._currentGameState);
		gameState.isLoaded(true);
		for(var i in gameState._entitiesDesc){
			var entityDesc=gameState._entitiesDesc[i];
			var entity=null;
			var resource=(entityDesc.resourceId?_jResourceLoader.getResource({id:entityDesc.resourceId}):null);
			var entity_parameters={
				pixToMeter:this._pixToMeter
			};
			if(entityDesc.position)entity_parameters.position=entityDesc.position;
			if(resource)entity_parameters.oResource=resource;
			if(entityDesc.text)entity_parameters.text=entityDesc.text;
			
			switch(entityDesc.type){
				case 'player':
					entity=new _jActorPc(entity_parameters);
				break;
				case 'creature':
					entity=new _jActorPnc(entity_parameters);
					/*
					Selecting Entity Animated or not
					if(resource.isAnimation()==true)
					else entity=new _jWorldEntity(entity_parameters);
					*/
				break;
				case 'UItext':
					entity=new _jUIText(entity_parameters);
				break;
				case 'music':
					entity=new _jMusicEntity(entity_parameters);
				break;
				default:
					_jLogger.log('[_jGameEngine.setGameState] Unable to create Entity:'+entityDesc.type,'error');
				break;
			}
			gameState.addEntity(entity);
		}
	}
	
	/*
	* OTHERS
	*/
}