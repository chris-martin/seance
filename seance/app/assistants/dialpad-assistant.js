function DialpadAssistant() {
	try {
		this.dialString = "";
		this.handleKeyDown	= this.handleKeyDown.bind(this);
		this.handleKeyUp	= this.handleKeyUp.bind(this);
	}
	catch ( e ) {
		debug ( e );
	}
}

DialpadAssistant.prototype.setup = function() {
	try {
		//
		// Setup Application Menu
		//
		this.controller.setupWidget(	Mojo.Menu.appMenu,
										menuAttrNone,
										menuModelDialPad );
		var that = this;
		['b_1', 'b_2', 'b_3', 'b_4', 'b_5', 'b_6', 'b_7', 'b_8', 'b_9', 'b_0', 'b_*', 'b_#'].each(function(key) {
			var button = that.controller.get(key);
			button.observe('mousedown',			that.numberClick.bindAsEventListener(	that, key.charAt(2)	)	);
	        button.observe(Mojo.Event.hold,		that.handleHeldKey.bindAsEventListener(	that, key.charAt(2)	)	);
		});
		//
		// other dialpad area buttons
		//
		this.controller.get('dial_button').observe(		Mojo.Event.tap,		this.dialClick.bindAsEventListener(this));
	    this.controller.get('delete_button').observe(	Mojo.Event.tap, 	this.back.bindAsEventListener(this));
		//
		// keyboard and document listeners
		//
		this.controller.listen(this.controller.sceneElement, Mojo.Event.keyup,		this.handleKeyUp.bindAsEventListener(this));
		this.controller.listen(this.controller.sceneElement, Mojo.Event.keydown,	this.handleKeyDown.bindAsEventListener(this));
		this.dialString = "";
		//
		// instantiate shake event handlers
		//
		this.controller.listen(	document,	'shakestart',	this.handleShakeStart.bindAsEventListener(this)	);
		this.controller.listen(	document,	'shaking',		this.handleShaking.bindAsEventListener(this)	);
		this.controller.listen(	document,	'shakeend',		this.handleShakeEnd.bindAsEventListener(this)	);
	}
	catch ( e ) {
		debug( e );		
	}
}

DialpadAssistant.prototype.activate = function( event ) {
}

DialpadAssistant.prototype.deactivate = function( event ) {
	try {
		this.controller.stopListening(	document,	'shakestart',	this.handleShakeStart	);
		this.controller.stopListening(	document,	'shaking',		this.handleShaking		);
		this.controller.stopListening(	document,	'shakeend',		this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );		
	}
}

DialpadAssistant.prototype.cleanup = function( event ) {
	try {
		this.controller.stopListening(	document,	'shakestart',	this.handleShakeStart	);
		this.controller.stopListening(	document,	'shaking',		this.handleShaking		);
		this.controller.stopListening(	document,	'shakeend',		this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );		
	}
}

DialpadAssistant.prototype.showDialogBox = function( caption, msg ){
	this.controller.showAlertDialog({
		onChoose:	function(value) {},
		title:		caption,
		message:	msg,
		choices:	[{
			label:'OK', 
			value:'OK', 
			type:'dismiss'
		}]
	});
}

DialpadAssistant.prototype.handleCommand = function( event ) {
}
	
DialpadAssistant.prototype.numberClick = function( event, key ) {
	try {
		if ( this.dialString.length < 20 ) {
			this.playSound();
			this.dialString += key;
			if ( this.dialString.length == 0 )
		    	this.controller.get('dial_textfield').update( 'Enter number...' );
		    else
				this.controller.get('dial_textfield').update( this.dialString );
		}
	}
	catch ( e ) {
		debug( e );
	}
}

DialpadAssistant.prototype.handleHeldKey = function( event, key ) {
	try {
		var tmp = '';
		this.playSound();
		switch (key) {
			case Mojo.Char.backspace:
				if ( this.dialString.length >= 1 ) {
					for ( i = 0; i < this.dialString.length-1; i++ )
						tmp += this.dialString[i];
					this.dialString = tmp;
					if ( this.dialString.length == 0 )
				    	this.controller.get('dial_textfield').update( 'Enter number...' );
				    else
						this.controller.get('dial_textfield').update( this.dialString );
				}
				return;

			case '0':
				if ( this.dialString.length <= 1 ) {
					for ( i = 0; i < this.dialString.length-1; i++ )
						tmp += this.dialString[i];
					this.dialString = tmp;
					this.dialString += '+';
					if ( this.dialString.length == 0 )
				    	this.controller.get('dial_textfield').update( 'Enter number...' );
				    else
						this.controller.get('dial_textfield').update( this.dialString );
				}
				Event.stop(event);
				return;
				
			default:
				if ( this.dialString.length == 0 )
			    	this.controller.get('dial_textfield').update( 'Enter number...' );
			    else
					this.controller.get('dial_textfield').update( this.dialString );
				return;		
		}
	}
	catch ( e ) {
		debug ( e );
	}
}

DialpadAssistant.prototype.handleKeyDown = function( event ) {
	try {
		this.playSound();

		var evt = event.originalEvent;
		
		// ignore the back key
		if (evt.keyCode == Mojo.Char.backspace) {
			this.back();
		}
		else if (evt.keyCode == Mojo.Char.enter) {
			this.dialClick();
			Event.stop(evt);
			return;
		}
		else if ( (evt.keyCode != Mojo.Char.escape) && (evt.keyCode != Mojo.Char.enter)) {
			this.dialString += this.translateKey(evt.keyIdentifier);
			if ( this.dialString.length == 0 )
		    	this.controller.get('dial_textfield').update( 'Enter number...' );
		    else
				this.controller.get('dial_textfield').update( this.dialString );
		}
		Event.stop(evt);
	}
	catch ( e ) {
		debug ( e );
	}
}

DialpadAssistant.prototype.translateKey = function( key ) {
	try {
		retCode = '';
		switch ( key ) {
			case 'U+0065':
				retCode = '1';
				break;
			case 'U+0072':
				retCode = '2';
				break;
			case 'U+0074':
				retCode = '3';
				break;
			case 'U+0064':
				retCode = '4';
				break;
			case 'U+0066':
				retCode = '5';
				break;
			case 'U+0067':
				retCode = '6';
				break;
			case 'U+0078':
				retCode = '7';
				break;
			case 'U+0063':
				retCode = '8';
				break;
			case 'U+0076':
				retCode = '9';
				break;
			case 'U+0040':
				retCode = '0';
				break;
			case 'U+0077':
				retCode = '+';
				break;
			case 'U+007A':
				retCode = '*';
				break;
			case 'U+0062':
				retCode = '#';
				break;
			case 'U+0031':
				retCode = '1';
				break;
			case 'U+0032':
				retCode = '2';
				break;
			case 'U+0033':
				retCode = '3';
				break;
			case 'U+0034':
				retCode = '4';
				break;
			case 'U+0035':
				retCode = '5';
				break;
			case 'U+0036':
				retCode = '6';
				break;
			case 'U+0037':
				retCode = '7';
				break;
			case 'U+0038':
				retCode = '8';
				break;
			case 'U+0039':
				retCode = '9';
				break;
			case 'U+0030':
				retCode = '0';
				break;
			case 'U+002A':
				retCode = '*';
				break;
			case 'U+0023':
				retCode = '#';
				break;
			case 'U+002B':
				retCode = '+';
				break;
			default:
				break;
		}
		return retCode;
	}
	catch ( e ) {
		debug( e );
	}
}

DialpadAssistant.prototype.handleKeyUp = function( event ) {
	try {
		var evt = event.originalEvent;
		
		// ignore the back and enter keys
		if (evt.keyCode == Mojo.Char.escape) {
			return;
		}
		
		if (evt.keyCode == Mojo.Char.enter) {
			Event.stop(evt);
			return;
		}
		Event.stop(evt);
	}
	catch ( e ) {
		debug ( e );
	}
}

DialpadAssistant.prototype.back = function( event ) {
	try {
		if ( this.dialString.length >= 1 ) {
			this.playSound();
			var tmp = '';
			for ( i = 0; i < this.dialString.length-1; i++ )
				tmp += this.dialString[i];
			this.dialString = tmp;
			
			if ( this.dialString.length == 0 )
		    	this.controller.get('dial_textfield').update( 'Enter number...' );
		    else
				this.controller.get('dial_textfield').update( this.dialString );
			
		}
	}
	catch ( e ) {
		debug( e );
	}
}
	
DialpadAssistant.prototype.dialClick = function( event ) {
	try {
		if ( this.dialString.length >= 1 ) {
			this.playSound();
			this.controller.stageController.popScene( '*' + this.dialString ); 
		}
	}
	catch ( e ) {
		debug( e );
	}
}

////////////////////////////////////////////////////////////////////////////////
//
// sound
//
////////////////////////////////////////////////////////////////////////////////
//
// provide feedback
//
DialpadAssistant.prototype.playSound = function(event){
	try {
		if ( GVsound.get() == 1 )
			this.controller.serviceRequest(	'palm://com.palm.audio/systemsounds', 
											{
												method:"playFeedback",
												parameters:{
													'name': 'down2'
												},
												onSuccess:{},
												onFailure:{},
											});
	}
	catch ( e ) {
		debug( e );
	}
}

////////////////////////////////////////////////////////////////////////////////
//
// shake events
//
////////////////////////////////////////////////////////////////////////////////
DialpadAssistant.prototype.handleShakeStart = function(event)	{
}

DialpadAssistant.prototype.handleShaking = function(event)	{
}

DialpadAssistant.prototype.handleShakeEnd = function(event)	{
	try {
		if ( GVshake.get() == 1 ) {
			this.playSound();
			this.controller.stageController.popScene();
		}
	}
	catch ( e ) {
		debug( e );
	}
}
