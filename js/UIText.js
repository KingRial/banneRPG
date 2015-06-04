_jUIText=function(options){
	_jUIEntity.call(this,options);
	if(!options.font)options.font={};
	this._font_height=(options.font.height?options.font.height:32);
	this._fillStyle=(options.font.fillStyle?options.font.fillStyle:'gold');
	this._text=(options.text?options.text:null);
	
	this.draw = function(ctx){
		if(!this._text)return;
		//var tw=ctx.measureText('JS-TYPE').width;
		ctx.fillStyle=this._fillStyle;
        ctx.font=this._font_height/2 + 'px Impact';
		ctx.fillText(this._text,this._position.x,this._position.y);
	}
}