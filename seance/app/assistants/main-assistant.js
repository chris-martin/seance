function MainAssistant() {
}

MainAssistant.prototype.setup = function() {
	try {
		//
		// respond to orientation changes
		//
		if (this.controller.stageController.setWindowOrientation) {
			this.controller.stageController.setWindowOrientation( "up" );
		}	
		//
		// Setup Application Menu
		//
		this.controller.setupWidget(	Mojo.Menu.appMenu,
										menuAttrNone, 
										menuModelMain );
		//
		// command menu
		//
		this.controller.setupWidget(	Mojo.Menu.commandMenu, 
										undefined, 
										{
											items:	[
												{
													label:		'411', 
													command:	'goog411',
													iconPath:	Mojo.appPath + "images/411-32.png"
												},
												{
													label:		'History', 
													command:	'history',
													iconPath:	Mojo.appPath + "images/history32.png"
												},
												{
													label:		'VM', 
													command:	'voicemail',
													iconPath:	Mojo.appPath + "images/vm-32.png"
												}
											]
										});
		//
		// phone index items
		//
		this.phoneItems = [
			{	value: 'Call a contact',	img1: './images/phone48.png',	img2: './images/addressBook48.png',	desc: 'Using your address book...'	},
			{	value: 'Call a number',		img1: './images/phone48.png',	img2: './images/dialpad48.png',		desc: 'Using the keypad...'			},
			{	value: 'Text a contact',	img1: './images/sms48.png',		img2: './images/addressBook48.png',	desc: 'Using your address book...'	},
			{	value: 'Text a number',		img1: './images/sms48.png',		img2: './images/dialpad48.png',		desc: 'Using the keypad...'			}
		];
		this.controller.setupWidget(	"phoneIndex",
										this.attributes = {
											itemTemplate:	"main/listitem",
											swipeToDelete:	false,
											reorderable:	false,
										},
										this.model = {
											listTitle:	'Phone Index',
											items:		this.phoneItems,
										});
		Mojo.Event.listen(	this.controller.get( 'phoneIndex' ), Mojo.Event.listTap, this.phoneMenu.bindAsEventListener(this) );
	}
	catch( e ) {
		debug( e );
	}
}
MainAssistant.prototype.phoneMenu = function(event) {
	try {
	    var index = event.model.items.indexOf(event.item);
	    if ( index >= 0 ) {
			this.playSound();
	    	switch ( index) {
	    		//
	    		// phone call via address book
	    		//
	    		case 0:
					currentOperation = "voice";
					if ( !GVNum.get() || (GVNum.get().length == 0) ) {
						this.showDialogBox( "Missing voice number","Your Google Voice™ communications service phone number has not been recorded. Tap 'Preferences' from the main menu to set your details." );
					}
					else {
						this.goButtonPressed();
					}
		    		break;
	    		//
	    		// phone call via dialpad
	    		//
	    		case 1:
					currentOperation = "voice";
					if ( !GVNum.get() || (GVNum.get().length == 0) ) {
						this.showDialogBox( "Missing voice number","Your Google Voice™ communications service phone number has not been recorded. Tap 'Preferences' from the main menu to set your details." );
					}
					else {
						this.controller.stageController.pushScene( 'dialpad' ); 
					}
		    		break;
	    		//
	    		// SMS via address book
	    		//
	    		case 2:
					currentOperation = "sms";
					if ( !GVemail.get() || (GVemail.get().length < 1) ) {
						this.showDialogBox( "Missing email address", "Your Google™ account email address has not been recorded. Tap 'Preferences' from the main menu to set your details." );
					}
					else if ( !GVpassword.get() || (GVpassword.length < 1) ) {
						this.showDialogBox( "Missing account password", "Your Google™ account password has not been recorded. Tap 'Preferences' from the main menu to set your details." );
					}
					else {
						this.goButtonPressed();
					}
		    		break;
		    	//
		    	// SMS via dialpad
		    	//
	    		case 3:
					currentOperation = "sms";
					if ( !GVemail.get() || (GVemail.get().length < 1) ) {
						this.showDialogBox( "Missing email address", "Your Google™ account email address has not been recorded. Tap 'Preferences' from the main menu to set your details." );
					}
					else if ( !GVpassword.get() || (GVpassword.length < 1) ) {
						this.showDialogBox( "Missing account password", "Your Google™ account password has not been recorded. Tap 'Preferences' from the main menu to set your details." );
					}
					else {
						this.controller.stageController.pushScene( 'dialpad' ); 
					}
		    		break;
		    	//
		    	// default
		    	//
	    		default:
		    		break;
    		}
		}
	}
	catch ( e ) {
		debug ( e );
	}
}

////////////////////////////////////////////////////////////////////////////////
//
// command menu handler
//
////////////////////////////////////////////////////////////////////////////////
MainAssistant.prototype.handleCommand = function(event) {
	try {
		if(event.type == Mojo.Event.command) {
			this.playSound();
			
			switch(event.command) {
				case 'voicemail':
					this.dialVmail();
					break;
				case 'goog411':
					var strNum = "+1.800.466.4411";
					this.dialGoog411(strNum);
					break;
				case 'history':
					this.controller.stageController.pushScene( 'history' ); 
					break;
				default:
					break;
			}
		}
	}
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.goButtonPressed = function(event) {
	try {
		//
		// pick contact from address book
		//
		this.selectContact();
	}
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.prefsButtonPressed = function(val) {
	try {
		//
		// display preferences screen
		//
		if ( val != 'Cancel')
			this.controller.stageController.pushScene('preferences');
	}
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.aboutButtonPressed = function(event) {
	try {
		//
		// display aabout screen
		//
		this.playSound();
		this.controller.stageController.pushScene('about');
	}
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.selectContact = function(){
	try {
		//
		// display contacts app to get a contact
		//
		this.contactRequest = true;
		this.controller.stageController.pushScene(
			{
				appId:		'com.palm.app.contacts',
				name:		'list'
			},
			{
				mode:		'picker',
				message:	"Choose a contact"
			}
		);
	}
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.activate = function( response ) {
	try {
		if ( !GVNum.get() || (GVNum.get().length == 0) ) {
			debug( 'GVNum not set...' );
			this.showDialogBox( "Missing Voice Number", "Your Google Voice™ communications service phone number has not been recorded. Tap 'Preferences' from the main menu to set your details." );
		}
		else if ( !GVemail.get() || (GVemail.get().length < 1) ) {
			debug( 'GVemail not set...' );
			this.showDialogBox( "Missing Email Address", "Your Google™ account email address has not been recorded. Tap 'Preferences' from the main menu to set your details..." );
		}
		else if ( !GVpassword.get() || (GVpassword.length < 1) ) {
			debug( 'GVpassword not set...' );
			this.showDialogBox( "Missing Account Password", "Your Google™ account password has not been recorded. Tap 'Preferences' from the main menu to set your details..." );
		}
		else if ( response ) {
			//
			// if it's a number
			//
			if ( response[0] == '*') {
				number = response.substring( 1 );
				//
				// if we're making a google voice call
				//
				if ( currentOperation == 'voice' ) {
					number = this.cleanNumber(number);
					this.dialNumber( number, GVName );
				}
				else if ( currentOperation == 'sms' ) {
					number = this.cleanNumber(number);
					this.controller.stageController.pushScene('sms', number );
				}
			}
			else if ( response[0] == '!') {
				//
				// the user wishes to use the dial pad
				//
				GVName = 'Manual dial';
				this.controller.stageController.pushScene( 'dialpad' ); 
			}
			else if (response.personId && response.details && response.details.record && response.details.record.phoneNumbers) {
				//
				// contact came from address book so choose number
				//
				this.controller.stageController.pushScene('dial', response);
			}
			else if ( response[0] == 'P') {
				//
				// Phone call from history
				//
				number = this.cleanNumber(response.substring( 1 ));
				this.dialNumber( number, GVName );
			}
			else if ( response[0] == 'S') {
				//
				// SMS from history
				//
				number = this.cleanNumber(response.substring( 1 ));
				this.controller.stageController.pushScene( 'sms', number );
			}
			else {
				//
				// error as we received nothing
				//
				this.controller.stageController.pushScene( 'error' );
			}
		}
	}
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.dialNumber = function( number, strName ) {
	try {
		//
		// determine the amount of delay pauses we need
		//
		delay = GVDelay.get();
		delayString = "t".times( delay );
		
		//
		// if the user has entered a PIN then appaend it
		//
		if( GVPIN.get() ) {
			pinString = GVPIN.get() + 't';
		}
		else {
			pinString = '';
		}
	
		//
		// if we still have a number
		//
		if ( number ) {
			//
			// notify user
			//
			if ( snippetBanners.get() == 1 )
				Mojo.Controller.getAppController().showBanner({	messageText: "You may now place your call..." }, "", "" );
			addEvent( {num: number, type: 'P', name: strName } );
			//
			// request access to phone and pump the number in
			//
			this.controller.serviceRequest(
				'palm://com.palm.applicationManager', 
				{
					method: 'open',
					parameters: {
						target: "tel://" + GVNum.get() + delayString + pinString + "2t" + number + "#"
					}
				}
			);
		}
	}	
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.dialGoog411 = function( strNum ) {
	try {
		//
		// notify user
		//
		if ( snippetBanners.get() == 1 )
			Mojo.Controller.getAppController().showBanner({	messageText: "You may now place your call..." }, "", "" );
		addEvent( {num: strNum, type: 'P', name: "GOOG-411" } );
		//
		// request access to phone and pump the number in
		//
		this.controller.serviceRequest(
			'palm://com.palm.applicationManager', 
			{
				method: 'open',
				parameters: {
					target: "tel://" + strNum
				}
			}
		);
	}	
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.dialVmail = function( number ) {
	try {
		//
		// determine the amount of delay pauses we need
		//
		delay = GVDelay.get();
		delayString = "t".times( delay );
		
		//
		// if the user has entered a PIN then appaend it
		//
		if( GVPIN.get() ) {
			pinString = GVPIN.get() + 't';
		}
		else {
			pinString = '';
		}
	
		//
		// notify user
		//
		if ( snippetBanners.get() == 1 )
			Mojo.Controller.getAppController().showBanner({	messageText: "You may now place your call..." }, "", "" );
		addEvent( {num: GVNum.get(), type: 'P', name: "Voicemail" } );
		//
		// request access to phone and pump the number in
		//
		this.controller.serviceRequest(
			'palm://com.palm.applicationManager', 
			{
				method: 'open',
				parameters: {
					target: "tel://" + GVNum.get() + delayString + pinString + "t1"
				}
			}
		);
	}	
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.cleanNumber = function(number){
	try {
		//
		// clean up the phone number
		//
		return number.replace(/\+(?![1])/g, '011').replace(/[\(\) -\+]/g, '');
	}
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.showDialogBox = function(caption, message){
	//
	// display a dialog box
	//
	this.controller.showAlertDialog({
		onChoose:	function(value) {},
		title:		caption,
		message:	message,
		choices:	[
			{
				label: 'OK', value: 'OK', type: 'dismiss',
			}
		],
	});
}
MainAssistant.prototype.deactivate = function(event) {
	try {
		this.controller.stopListening(	this.controller.get('phoneIndex'),		Mojo.Event.listTap,	this.phoneMenu	);
	}
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.cleanup = function(event) {
	try {
		this.controller.stopListening(	this.controller.get('phoneIndex'),		Mojo.Event.listTap,	this.phoneMenu	);
	}
	catch ( e ) {
		debug( e );
	}
}
MainAssistant.prototype.playSound = function(event){
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
