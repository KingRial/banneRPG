_jLogger=new function(){
	this._debug_enable=true;
	
	this.log=function(msg,type){
		type=type||'debug';
		var logger;
		try{logger=console;}
		catch(e){logger=null;}
        if(logger) {
			if(!this.isAppleMobile)this.isAppleMobile=((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1));
			if(!this.isIEBrowser)this.isIEBrowser=(/msie/.test(navigator.userAgent.toLowerCase()) && !/opera/.test(navigator.userAgent.toLowerCase()));
			switch(type){
				case 'error':
				case 'fatal':
					if(this.isAppleMobile)logger.error(msg);
					else logger.error('%s',msg);
				break;
				default:
				case 'debug':
					if(!this._debug_enable) return;
					if(this.isAppleMobile)logger.error(msg);
					else if(this.isIEBrowser)logger.info('%s',msg);
					else logger.debug('%s',msg);
				break;
				case 'info':
					if(this.isAppleMobile)logger.error(msg);
					else logger.info('%s',msg);
				break;
				case 'warn':
					if(this.isAppleMobile)logger.error(msg);
					else logger.warn('%s',msg);
				break;
			}
		}
	}
}