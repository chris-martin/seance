function DisclaimerAssistant() {
}

DisclaimerAssistant.prototype.setup = function() {
	try {
		//
		// Setup Application Menu
		//
		this.controller.setupWidget(	Mojo.Menu.appMenu,
										menuAttrNone,
										menuModelDisclaimer );
		//
		// shake events
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
DisclaimerAssistant.prototype.handleCommand = function(event) {
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
// general purpose routines
//
////////////////////////////////////////////////////////////////////////////////
//
// show a dialog box with a message
//
DisclaimerAssistant.prototype.showDialogBox = function( caption, message ){
	this.controller.showAlertDialog({
		onChoose:	function(value) {},
		title:		caption,
		message:	message,
		choices:	[{
			label:	'OK', 
			value:	'OK', 
			type:	'dismiss'
		}]
	});
}

////////////////////////////////////////////////////////////////////////////////
//
// scene activate, deactivate and cleanup
//
////////////////////////////////////////////////////////////////////////////////
//
// scene activating - if we have a snippet then we act on it
//
DisclaimerAssistant.prototype.activate = function(response) {
}

//
// scene deactivating - so stop listening
//
DisclaimerAssistant.prototype.deactivate = function(event) {
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
DisclaimerAssistant.prototype.cleanup = function(event) {
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
DisclaimerAssistant.prototype.handleShakeStart=function(event)	{
}

DisclaimerAssistant.prototype.handleShaking=function(event)	{
}

DisclaimerAssistant.prototype.handleShakeEnd=function(event)	{
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
DisclaimerAssistant.prototype.playSound = function(event){
	try {
		this.controller.serviceRequest(	'palm://com.palm.audio/systemsounds', 
										{
											method:"playFeedback",
											parameters:{
												'name': 'down2'
											},
											onSuccess:{},
											onFailure:{},
										}
									);
	}
	catch ( e ) {
		debug( e );
	}
}
