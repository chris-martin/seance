function HelpchooseAssistant() {
}

HelpchooseAssistant.prototype.setup = function(event) {
	try {
		//
		// Setup Application Menu
		//
		this.controller.setupWidget(	Mojo.Menu.appMenu,
										menuAttrNone,
										menuModelNone );
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

////////////////////////////////////////////////////////////////////////////////
//
// command menu handler
//
////////////////////////////////////////////////////////////////////////////////
HelpchooseAssistant.prototype.handleCommand = function(event) {
	try {
		if(event.type == Mojo.Event.command) {
			this.playSound();
			
			switch(event.command) {
				default:
					break;
			}
		}
	}
	catch ( e ) {
		debug( e );
	}
}

////////////////////////////////////////////////////////////////////////////////
//
// scene activate, deactivate and cleanup
//
////////////////////////////////////////////////////////////////////////////////
//
// scene activating - if we have a snippet then we act on it
//
HelpchooseAssistant.prototype.activate = function(event) {
}

//
// scene deactivating - so stop listening
//
HelpchooseAssistant.prototype.deactivate = function(event) {
	try {
		this.controller.stopListening(	document,	'shakestart',	this.handleShakeStart	);
		this.controller.stopListening(	document,	'shaking',		this.handleShaking		);
		this.controller.stopListening(	document,	'shakeend',		this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );
	}
}

//
// scene cleaning up - so stop listening (just in case)
//
HelpchooseAssistant.prototype.cleanup = function(event) {
	try {
		this.controller.stopListening(	document,	'shakestart',	this.handleShakeStart	);
		this.controller.stopListening(	document,	'shaking',		this.handleShaking		);
		this.controller.stopListening(	document,	'shakeend',		this.handleShakeEnd		);
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
HelpchooseAssistant.prototype.handleShakeStart = function(event)	{
}

HelpchooseAssistant.prototype.handleShaking = function(event)	{
}

HelpchooseAssistant.prototype.handleShakeEnd = function(event)	{
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

////////////////////////////////////////////////////////////////////////////////
//
// sound
//
////////////////////////////////////////////////////////////////////////////////
//
// provide feedback
//
HelpchooseAssistant.prototype.playSound = function(event){
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
