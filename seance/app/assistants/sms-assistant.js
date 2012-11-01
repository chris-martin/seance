function SmsAssistant( num ) {
	try {
	    smsMessageText = '';
	    this.smsPhoneNumber = num;
		for ( i = 1; i < 5; i++ ) {
			this.smsPhoneNumber = this.smsPhoneNumber.replace( ' ', '' );
			this.smsPhoneNumber = this.smsPhoneNumber.replace( '-', '' );
			this.smsPhoneNumber = this.smsPhoneNumber.replace( '.', '' );
			this.smsPhoneNumber = this.smsPhoneNumber.replace( '(', '' );
			this.smsPhoneNumber = this.smsPhoneNumber.replace( ')', '' );
		}
		this.keyToken = "";
		this.sessionKey = "";
		this.hdrRequest = {};
	}
	catch ( e ) {
		debug( e );
	}
}

SmsAssistant.prototype.setup = function() {
	try {
	    //
	    // Setup Application Menu
	    //
	    this.controller.setupWidget(	Mojo.Menu.appMenu,
	                                    menuAttrNone,
	                                    menuModelSMS );
		//
		// update cation
		//
	    if(this.smsPhoneNumber.length == 10)
	        this.smsPhoneNumber = '+1' + this.smsPhoneNumber;
	    this.controller.get('caption').update( 'To: ' + this.smsPhoneNumber );
		
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
			                                                label:		'Send message', 
			                                                command:	'send',
			                                                iconPath:	Mojo.appPath + "images/send.png", 
														},
														{
			                                                label:		'Send message', 
			                                                command:	'send',
														},
														{
			                                                label:		'Send message', 
			                                                command:	'send',
			                                                iconPath:	Mojo.appPath + "images/send.png", 
														},
													]
												},
												{
												},
											]
										}
									);
	    //
	    // set up entry field for text
	    //
	    this.msgModel = {
			value:			smsMessageText,
			disabled:		false,
	    };
	    this.controller.setupWidget(	"efMessage",
	                                    {
	                                        multiline:			true,
	                                        autoFocus:			true,
	                                        hintText:			'Enter your message...',
	                                        modelProperty:		'value',
	                                        changeOnKeyPress:	true,
	                                        emoticons:			true,
	                                    },
	                                    this.msgModel
	    );
	    Mojo.Event.listen( this.controller.get('efMessage'), Mojo.Event.propertyChange, this.messageChange.bindAsEventListener(this) );
	    //
	    // shake events
	    //
	    this.controller.listen(	document,	'shakestart',	this.handleShakeStart.bindAsEventListener(this)	);
	    this.controller.listen(	document,	'shaking',		this.handleShaking.bindAsEventListener(this)	);
	    this.controller.listen(	document,	'shakeend',		this.handleShakeEnd.bindAsEventListener(this)	);
	
	    this.controller.get('lblStatus').update( '160 characters remaining...' );
	}
	catch ( e ) {
		debug( e );
	}
}

////////////////////////////////////////////////////////////////////////////////
//
// property change events
//
////////////////////////////////////////////////////////////////////////////////
//
// body text has changed
//
SmsAssistant.prototype.messageChange = function(event) {
	try {
	    if ( event.value.length <= 160 ) {
	        smsMessageText = event.value;
	        this.controller.get('lblStatus').update( $L( (160 - smsMessageText.length) + ' characters remaining...' ) );
	    }
	    else {
	        this.showDialogBox( "Message length exceeded", "Only the first 160 characters will be sent." );
	    }
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
SmsAssistant.prototype.handleCommand = function(event) {
	try {
	    if(event.type == Mojo.Event.command) {
	        this.playSound();
	        
	        switch(event.command) {
	            case 'send':
					this.logIn();
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

////////////////////////////////////////////////////////////////////////////////
//
// general purpose routines
//
////////////////////////////////////////////////////////////////////////////////
//
// show a dialog box with a message
//
SmsAssistant.prototype.showDialogBox = function( caption, message ){
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
SmsAssistant.prototype.activate = function(response) {
}

//
// scene deactivating - so stop listening
//
SmsAssistant.prototype.deactivate = function(event) {
	try {
	    this.controller.stopListening(	this.controller.get("efMessage"),	Mojo.Event.propertyChange,	this.messageChange 		);
	    this.controller.stopListening(	document,							'shakestart',				this.handleShakeStart	);
	    this.controller.stopListening(	document,							'shaking',					this.handleShaking		);
	    this.controller.stopListening(	document,							'shakeend',					this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );
	}
}

//
// scene cleaning up - so stop listening (just in case)
//
SmsAssistant.prototype.cleanup = function(event) {
	try {
	    this.controller.stopListening(	this.controller.get("efMessage"),	Mojo.Event.propertyChange,	this.messageChange 		);
	    this.controller.stopListening(	document,							'shakestart',				this.handleShakeStart	);
	    this.controller.stopListening(	document,							'shaking',					this.handleShaking		);
	    this.controller.stopListening(	document,							'shakeend',					this.handleShakeEnd		);
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
SmsAssistant.prototype.handleShakeStart=function(event)	{
}

SmsAssistant.prototype.handleShaking=function(event)	{
}

SmsAssistant.prototype.handleShakeEnd=function(event)	{
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
SmsAssistant.prototype.playSound = function(event){
	try {
	    if ( GVsound.get() == 1 )
	        this.controller.serviceRequest(	'palm://com.palm.audio/systemsounds', 
	                                        {
	                                            method:"playFeedback",
	                                            parameters:{
	                                                'name': 'down2',
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
// SMS processing
//
////////////////////////////////////////////////////////////////////////////////

SmsAssistant.prototype.logIn = function(event) {
	try {
	    if ( smsMessageText.length >= 1 ) {
			addEvent( {num: this.smsPhoneNumber, type: 'S', name: GVName } );
		    this.controller.get('lblStatus').update( 'Logging in to Google™...' );
			var b = new Ajax.Request(	'https://www.google.com/accounts/ClientLogin',
										{
											parameters:{
												'accountType':	"GOOGLE",
												'Email':		GVemail.get(),
												'Passwd':		GVpassword.get(),
												'source':		Mojo.Controller.appInfo.id,
												'service':		"grandcentral",
											},
											requestHeaders:	this.hdrRequest,
	                                        onSuccess:		this.logInOK.bind(this),
	                                        onFailure:		this.logInFail.bind(this)
										});
	    }
	    else {
	        this.showDialogBox( "Missing text", "No message text entered." );
	    }
	}
	catch ( e ) {
		debug ( e );
	}
}

SmsAssistant.prototype.logInOK = function(resp) {
	try {
		var	e,
			d;
		e = /Auth=(\S*)/;
		d = resp.responseText.match(e);
		this.auth = (d && d[1]);
		this.hdrRequest.Authorization = "GoogleLogin Auth=" + this.auth;
		if(this.auth){
		    this.controller.get('lblStatus').update( 'Logged in...' );
			this.getKey()
		}
		else {
	    	this.controller.get('lblStatus').update( 'Failed to log in - retry...' );
		}
	}
	catch ( e ) {
		debug ( e );
	}
}

SmsAssistant.prototype.logInFail = function(event) {
	try {
	    this.controller.get('lblStatus').update( 'Failed to log in - retry...' );
	}
	catch ( e ) {
		debug ( e );
	}
}

SmsAssistant.prototype.getKey = function() {
	try {
	    this.controller.get('lblStatus').update( 'Entering secure session...' );
		var a = new Ajax.Request(	'https://www.google.com/voice/m',
									{
										method:	"get",
										parameters:{
											'auth': this.auth,
										},
										requestHeaders:	this.hdrRequest,
	                                    onSuccess:		this.getKeyOK.bind(this),
                                        onFailure:		this.getKeyFail.bind(this),
									});
	}
	catch ( e ) {
		debug ( e );
	}
}


SmsAssistant.prototype.getKeyOK = function(resp) {
	try {
		var f,e,b,g,d,c;
		f = resp.responseText;
		e = /name="_rnr_se" value="([^"]+)"/i;
		b = /<b class="ms3">([^<]+)<\/b><\/div>/i;
		c = e.exec(f);
		this.keyToken = (c && c[1]);
		if(this.keyToken){
		    this.controller.get('lblStatus').update( 'Secure session entered...' );
		    this.sendMessage();
		}
		else{
			this.getKeyFail();
		    this.controller.get('lblStatus').update( 'Secure session failed...' );
		}
	}
	catch ( e ) {
		debug ( e );
	}
}

SmsAssistant.prototype.getKeyFail = function(event) {
	try {
	    this.controller.get('lblStatus').update( 'Secure session failed...' );
	}
	catch ( e ) {
		debug ( e );
	}
}

SmsAssistant.prototype.sendMessage = function(event) {
	try {
		this.controller.get('lblStatus').update( 'Sending message...' );
		var d = new Ajax.Request(	'https://www.google.com/voice/sms/send/',
									{
										method:	"post",
										parameters:{
											'id':			"",
											'phoneNumber':	this.smsPhoneNumber,
											'text':			smsMessageText,
											'_rnr_se':		this.keyToken,
										},
										requestHeaders: this.hdrRequest,
                                        onSuccess:	this.smsMessageSent.bind(this),
                                        onFailure:	this.smsError.bind(this),
									});
	}
	catch ( e ) {
		debug( e );
	}
}

SmsAssistant.prototype.smsMessageSent = function(event){
	try {
	    var responseJSON = event.responseText.evalJSON();
	    if (event.responseText.indexOf('true') >= 0) {
	        if ( snippetBanners.get() == 1 )
	            Mojo.Controller.getAppController().showBanner({	messageText: "Message sent..." }, "", "" );
	        this.controller.stageController.popScene();
	    }
	    else {
	        if ( snippetBanners.get() == 1 )
	            Mojo.Controller.getAppController().showBanner({	messageText: "Error: " + responseJSON.error }, "", "" );
	    }
	}
	catch ( e ) {
		debug( e );
	}
}

SmsAssistant.prototype.smsError = function(err) {
	try {
	    if ( snippetBanners.get() == 1 )
	        Mojo.Controller.getAppController().showBanner({	messageText: "Error: " + err.errorText }, "", "" );
	}
	catch ( e ) {
		debug( e );
	}
}
