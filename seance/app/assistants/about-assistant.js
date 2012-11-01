function AboutAssistant() {
}

AboutAssistant.prototype.setup = function() {
	try {
		//
		// Setup Application Menu
		//
		this.controller.setupWidget(	Mojo.Menu.appMenu,
										menuAttrNone,
										menuModelAbout );
		//
		// command menu
		//
		this.controller.setupWidget(	Mojo.Menu.commandMenu, 
										undefined, 
										{
											items:	[
												{
												},
												{
													items:	[
														{
															label:		'Disclaimer', 
															command:	'disclaimer',
															iconPath:	Mojo.appPath + "images/disclaimer32.png", 
														},
														{
															label:		'Read Legal Disclaimer', 
															command:	'disclaimer',
														},
														{
															label:		'Disclaimer', 
															command:	'disclaimer',
															iconPath:	Mojo.appPath + "images/disclaimer32.png", 
														},
													]
												},
												{
												},
											]
										});
		//
		// update prompts
		//
		this.controller.get('verInfo').update( 'Version: <strong>' + Mojo.Controller.appInfo.version + '</strong> ' );
		//
		// shake out
		//
		this.controller.listen(	document,	'shakestart',	this.handleShakeStart.bindAsEventListener(this)	);
		this.controller.listen(	document,	'shaking',		this.handleShaking.bindAsEventListener(this)	);
		this.controller.listen(	document,	'shakeend',		this.handleShakeEnd.bindAsEventListener(this)	);
	}
	catch( e ) {
		debug( e );
	}
}

////////////////////////////////////////////////////////////////////////////////
//
// command menu handler
//
////////////////////////////////////////////////////////////////////////////////
AboutAssistant.prototype.handleCommand = function(event) {
	try {
		if(event.type == Mojo.Event.command) {
			this.playSound();
			
			switch(event.command) {
				case 'disclaimer':
					this.controller.stageController.pushScene( 'disclaimer' ); 
					break;
					
				default:
					break;
			}
		}
	}
	catch( e ) {
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
AboutAssistant.prototype.showDialogBox = function( caption, msg ){
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

////////////////////////////////////////////////////////////////////////////////
//
// scene activate, deactivate and cleanup
//
////////////////////////////////////////////////////////////////////////////////
AboutAssistant.prototype.activate = function(response) {
}

AboutAssistant.prototype.deactivate = function(event) {
	try {
		this.controller.stopListening(	document,	'shakestart',	this.handleShakeStart	);
		this.controller.stopListening(	document,	'shaking',		this.handleShaking		);
		this.controller.stopListening(	document,	'shakeend',		this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );
	}
}

AboutAssistant.prototype.cleanup = function(event) {
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
// shake handlers
//
////////////////////////////////////////////////////////////////////////////////
AboutAssistant.prototype.handleShakeStart=function(event)	{
}

AboutAssistant.prototype.handleShaking=function(event)	{
}

AboutAssistant.prototype.handleShakeEnd=function(event)	{
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
AboutAssistant.prototype.playSound = function(event){
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
											}
										);
	}
	catch ( e ) {
		debug( e );
	}
}
