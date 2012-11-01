GVNum				= new Mojo.Model.Cookie("GVNum");
GVPIN				= new Mojo.Model.Cookie("GVPIN");
GVDelay				= new Mojo.Model.Cookie("GVDelay");
snippetBanners		= new Mojo.Model.Cookie("snippetBanners");
GVemail				= new Mojo.Model.Cookie("GVemail");
GVpassword			= new Mojo.Model.Cookie("GVpassword");
GVsound				= new Mojo.Model.Cookie("GVsound");
GVshake				= new Mojo.Model.Cookie("GVshake");
snippetMessage		= '';
currentOperation	= '';
smsMessageText		= '';
GVName				= "Manual dial";
ckEvent0			= new Mojo.Model.Cookie("ckEvent0");
ckEvent1			= new Mojo.Model.Cookie("ckEvent1");
ckEvent2			= new Mojo.Model.Cookie("ckEvent2");
ckEvent3			= new Mojo.Model.Cookie("ckEvent3");
ckEvent4			= new Mojo.Model.Cookie("ckEvent4");
ckEvent5			= new Mojo.Model.Cookie("ckEvent5");
ckEvent6			= new Mojo.Model.Cookie("ckEvent6");
ckEvent7			= new Mojo.Model.Cookie("ckEvent7");
ckEvent8			= new Mojo.Model.Cookie("ckEvent8");
ckEvent9			= new Mojo.Model.Cookie("ckEvent9");


function debug( msg ) {
	Mojo.Log.error( ' ' );
	Mojo.Log.error( ' ' );
	Mojo.Log.error( 'P2Labs:- ' + msg );
	Mojo.Log.error( ' ' );
	Mojo.Log.error( ' ' );
}

function addEvent( evt ) {
	if ( ckEvent8 ) ckEvent9.put( ckEvent8.get() );
	if ( ckEvent7 ) ckEvent8.put( ckEvent7.get() );
	if ( ckEvent6) ckEvent7.put( ckEvent6.get() );
	if ( ckEvent5 ) ckEvent6.put( ckEvent5.get() );
	if ( ckEvent4 ) ckEvent5.put( ckEvent4.get() );
	if ( ckEvent3 ) ckEvent4.put( ckEvent3.get() );
	if ( ckEvent2 ) ckEvent3.put( ckEvent2.get() );
	if ( ckEvent1 ) ckEvent2.put( ckEvent1.get() );
	if ( ckEvent0 ) ckEvent1.put( ckEvent0.get() );
	var strNum = evt.num;
	for ( i = 0; i < 5; i++ ) {
		strNum = strNum.replace( '-', '');
	}
	var strEvent =	strNum	+ '|' + $L(Mojo.Format.formatDate( new Date(), 'short' )) + '|' + evt.type + '|' + evt.name;
	if ( ckEvent0 ) ckEvent0.put( strEvent );
}

function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
	//
	// if undefined number cookie
	//
	if ( GVNum.get() == undefined )
		GVNum.put( '' );
	//
	// if undefined number cookie
	//
	if ( GVPIN.get() == undefined )
		GVPIN.put( '' );
	//
	// if undefined delay cookie
	//
	if ( GVDelay.get() == undefined )
		GVDelay.put( 2 );
	//
	// if undefined number cookie
	//
	if ( snippetBanners.get() == undefined )
		snippetBanners.put( '' );
	//
	// if undefined delay cookie
	//
	if ( GVemail.get() == undefined )
		GVemail.put( '' );
	//
	// if undefined delay cookie
	//
	if ( GVpassword.get() == undefined )
		GVpassword.put( '' );
	//
	// if undefined sound cookie
	//
	if ( GVsound.get() == undefined )
		GVsound.put( 1 );
	//
	// if undefined sound cookie
	//
	if ( GVshake.get() == undefined )
		GVshake.put( 0 );
	//
	// if undefined event cookies
	//
	if ( ckEvent0.get() == undefined )
		ckEvent0.put( '' );
	if ( ckEvent1.get() == undefined )
		ckEvent1.put( '' );
	if ( ckEvent2.get() == undefined )
		ckEvent2.put( '' );
	if ( ckEvent3.get() == undefined )
		ckEvent3.put( '' );
	if ( ckEvent4.get() == undefined )
		ckEvent4.put( '' );
	if ( ckEvent5.get() == undefined )
		ckEvent5.put( '' );
	if ( ckEvent6.get() == undefined )
		ckEvent6.put( '' );
	if ( ckEvent7.get() == undefined )
		ckEvent7.put( '' );
	if ( ckEvent8.get() == undefined )
		ckEvent8.put( '' );
	if ( ckEvent9.get() == undefined )
		ckEvent9.put( '' );
	//
	// set up menu attributes
	//	
	menuAttr = {
		omitDefaultItems: false,
	};
	
	menuAttrNone = {
		omitDefaultItems: true,
	};
	//
	// help menu model
	//
	menuModelNone = {
		visible: false,
	};
	//
	// main screen menu model
	//
	menuModelMain = {
		visible: true,
		items: [
			Mojo.Menu.editItem,
			{
				label:		"Preferences", 
				command:	'do-prefs',
				iconPath:	Mojo.appPath + "images/prefs32.png", 
			},
			{
				label:		"Help", 
				command:	'do-helpIndex',
				iconPath:	Mojo.appPath + "images/info32.png", 
			},
		]
	};
	//
	// preferences menu model
	//
	menuModelPreferences = {
		visible: true,
		items: [
			Mojo.Menu.editItem,
			{
				label:		"Help", 
				command:	'do-helpPrefs',
				iconPath:	Mojo.appPath + "images/info32.png", 
			},
		]
	};
	//
	// chooser menu model
	//
	menuModelChooser = {
		visible: true,
		items: [
			Mojo.Menu.editItem,
			{
				label:		"Preferences", 
				command:	'do-prefs',
				iconPath:	Mojo.appPath + "images/prefs32.png", 
			},
			{
				label:		"Help", 
				command:	'do-helpChooser',
				iconPath:	Mojo.appPath + "images/info32.png", 
			},
		]
	};
	//
	// about menu model
	//
	menuModelAbout = {
		visible: true,
		items: [
			Mojo.Menu.editItem,
			{
				label:		"Disclaimer", 
				command:	'do-disclaimer',
				iconPath:	Mojo.appPath + "images/disclaimer32.png", 
			},
		]
	};
	//
	// disclaimer menu model
	//
	menuModelDisclaimer = {
		visible: true,
		items: [
			Mojo.Menu.editItem,
		]
	};
	//
	// sms menu model
	//
	menuModelSMS = {
		visible: true,
		items: [
			Mojo.Menu.editItem,
			{
				label:		"Preferences", 
				command:	'do-prefs',
				iconPath:	Mojo.appPath + "images/prefs32.png", 
			},
			{
				label:		"Help", 
				command:	'do-helpSMS',
				iconPath:	Mojo.appPath + "images/info32.png", 
			},
		]
	};
	//
	// dialpad menu model
	//
	menuModelDialPad = {
		visible: true,
		items: [
			Mojo.Menu.editItem,
			{
				label:		"Preferences", 
				command:	'do-prefs',
				iconPath:	Mojo.appPath + "images/prefs32.png", 
			},
			{
				label:		"Help", 
				command:	'do-helpDialPad',
				iconPath:	Mojo.appPath + "images/info32.png", 
			},
		]
	};
	//
	// main screen menu model
	//
	menuModelError = {
		visible: true,
		items: [
			Mojo.Menu.editItem,
			{
				label:		"Help", 
				command:	'do-helpIndex',
				iconPath:	Mojo.appPath + "images/info32.png", 
			},
		]
	};
	//
	// dialpad menu model
	//
	menuModelHistory = {
		visible: true,
		items: [
			Mojo.Menu.editItem,
			{
				label:		"Preferences", 
				command:	'do-prefs',
				iconPath:	Mojo.appPath + "images/prefs32.png", 
			},
			{
				label:		"Help", 
				command:	'do-helpHistory',
				iconPath:	Mojo.appPath + "images/info32.png", 
			},
		]
	};
	//
	// push the main scene on the stack
	//
 	this.controller.pushScene('main');
}

StageAssistant.prototype.handleCommand = function(event){
	//
	// determine current scene
	//
	if(event.type == Mojo.Event.command) {
		switch(event.command) {
			case 'do-helpIndex':
			 	this.controller.pushScene('helpcenter');
				break;
			case 'do-helpPrefs':
			 	this.controller.pushScene('helpprefs');
				break;
			case 'do-helpChooser':
			 	this.controller.pushScene('helpchoose');
				break;
			case 'do-disclaimer':
			 	this.controller.pushScene('disclaimer');
				break;
			case 'do-helpSMS':
				this.controller.pushScene( 'helpsms' ); 
				break;
			case 'do-helpDialPad':
				this.controller.pushScene( 'helpdial' ); 
				break;
			case 'do-prefs':
			 	this.controller.pushScene('preferences');
				break;
			case 'do-helpHistory':
				this.controller.pushScene( 'helpHistory' ); 
				break;
		}
	}
}
