function HelpdialAssistant() {
}

HelpdialAssistant.prototype.setup = function(event) {
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
HelpdialAssistant.prototype.handleCommand = function(event) {
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
HelpdialAssistant.prototype.activate = function(event) {
}

//
// scene deactivating - so stop listening
//
HelpdialAssistant.prototype.deactivate = function(event) {
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
HelpdialAssistant.prototype.cleanup = function(event) {
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
HelpdialAssistant.prototype.handleShakeStart = function(event)	{
}

HelpdialAssistant.prototype.handleShaking = function(event)	{
}

HelpdialAssistant.prototype.handleShakeEnd = function(event)	{
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
HelpdialAssistant.prototype.playSound = function(event){
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
