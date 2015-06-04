_jInput=new function (){
	this.keyname={
		32: 'SPACE',
		13: 'ENTER',
		9: 'TAB',
		8: 'BACKSPACE',
		16: 'SHIFT',
		17: 'CTRL',
		18: 'ALT',
		20: 'CAPS_LOCK',
		144: 'NUM_LOCK',
		145: 'SCROLL_LOCK',
		37: 'LEFT',
		38: 'UP',
		39: 'RIGHT',
		40: 'DOWN',
		33: 'PAGE_UP',
		34: 'PAGE_DOWN',
		36: 'HOME',
		35: 'END',
		45: 'INSERT',
		46: 'DELETE',
		27: 'ESCAPE',
		19: 'PAUSE',
		222: '\''
	};
	
	this.key={up:false,down:false,left:false,right:false,jump:false};
	
	this.reset=function(){
		for(var i in this.key)this.key[i]=false;
	}
	
	this.updateKey=function(which,to){
		switch (which){
			case 65: case 37: // left
				this.key.left=to;
			break;
			case 87: case 38: // up
				this.key.up=to;
			break;
			case 68: case 39: // right
				this.key.right=to;
			break;
			case 83: case 40: // down
				this.key.down=to;
			break;
			case 32:// space bar
				this.key.jump=to;
			break;
			//case 17: key[5]=to; break; // ctrl
		}
	}
}