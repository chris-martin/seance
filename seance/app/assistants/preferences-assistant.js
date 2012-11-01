function PreferencesAssistant() {
}

PreferencesAssistant.prototype.setup = function() {
	try {
		//
		// Setup Application Menu
		//
		this.controller.setupWidget(	Mojo.Menu.appMenu,
										menuAttrNone,
										menuModelPreferences );
		//
		// set up entry field for GV number
		//
		this.controller.setupWidget(
			"gvNum",
			{
				multiline:			false,
				enterSubmits:		true,
				autoFocus:			true,
				modifierState:		Mojo.Widget.numLock,
				hintText:			'Your Google™ number...',
				spacerHeight:		500,
				changeOnKeyPress:	true,
			},
			{
				value:				GVNum.get(),
				disabled:			false,
			}
		);
		Mojo.Event.listen( this.controller.get("gvNum"), Mojo.Event.propertyChange, this.numberChange.bindAsEventListener(this) );
		//
		// set up entry field for GV PIN
		//
		this.controller.setupWidget(
			"gvPIN",
			{
				multiline:			false,
				preventResize:		true,
				maxLength:			4,
				enterSubmits:		true,
				autoFocus:			false,
				modifierState:		Mojo.Widget.numLock,
				hintText:			'Your Google™ PIN...',
				changeOnKeyPress:	true,
			},
			{
				value:				GVPIN.get(),
				disabled:			false,
			}
		);
		Mojo.Event.listen( this.controller.get("gvPIN"), Mojo.Event.propertyChange, this.pinChange.bindAsEventListener(this) );
		//
		// set up entry field for delay
		//
		this.controller.setupWidget(
			'gvDelay', 
			{
				modelProperty:		'value',
				minValue:			1,
				maxValue:			5,
				round:				true,
				changeOnKeyPress:	true,
		    }, 
			{
				value:				GVDelay.get() || 1,
				width:				2,
			}
		);
		Mojo.Event.listen($('gvDelay'),Mojo.Event.propertyChange,this.delayChange.bindAsEventListener(this));
		//
		// initialise delay slider to current value
		//
		delay = GVDelay.get();
		if ( !delay )
			delay = 1;
		msg = ' second';
		if ( delay > 1 )
			msg = ' seconds';
		msg += '...'
		this.controller.get('gvDelayPrompt').update( 'Delay currently set to <b>' + delay + '</b> ' + msg );
		GVDelay.put(delay);
		//
		// set up entry field for GV email address
		//
		this.controller.setupWidget(
			"gvEmail",
			{
				multiline:			false,
				enterSubmits:		true,
				autoFocus:			false,
				hintText:			'Your Google™ email...',
				changeOnKeyPress:	true,
			},
			{
				value:				GVemail.get() || '',
				disabled:			false
			}
		);
		Mojo.Event.listen( this.controller.get("gvEmail"), Mojo.Event.propertyChange, this.emailChange.bindAsEventListener(this) );
		//
		// set up entry field for GV password
		//
		this.controller.setupWidget(
			"gvPassword",
			{
				multiline:			false,
				preventResize:		true,
				enterSubmits:		true,
				autoFocus:			false,
				hintText:			'Your Google™ password...',
				changeOnKeyPress:	true,
			},
			{
				value:			GVpassword.get() || '',
				disabled:		false
			}
		);
		Mojo.Event.listen( this.controller.get("gvPassword"), Mojo.Event.propertyChange, this.passwordChange.bindAsEventListener(this) );
		//
		// notifications
		//
		this.bannerModel = {
			value:		snippetBanners.get(),
			disabled:	false,
		
		}
		this.controller.setupWidget( 'useBanners', this.attr, this.bannerModel );
		Mojo.Event.listen(this.controller.get( 'useBanners'), Mojo.Event.propertyChange,  this.bannersCallback.bindAsEventListener(this) );
		//
		// sounds
		//
		this.SoundModel = {
			value:		GVsound.get(),
			disabled:	false,
		
		}
		this.controller.setupWidget( 'useSound', this.attr, this.SoundModel );
		Mojo.Event.listen(this.controller.get( 'useSound'), Mojo.Event.propertyChange,  this.soundCallback.bindAsEventListener(this) );
		//
		// shake
		//
		this.ShakeModel = {
			value:		GVshake.get(),
			disabled:	false,
		
		}
		this.controller.setupWidget( 'useShake', this.attr, this.ShakeModel );
		Mojo.Event.listen(this.controller.get( 'useShake'), Mojo.Event.propertyChange,  this.shakeCallback.bindAsEventListener(this) );
		//
		// shake out
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
PreferencesAssistant.prototype.handleCommand = function(event) {
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
// toggle button handlers
//
////////////////////////////////////////////////////////////////////////////////
//
// toggle notification banners
//
PreferencesAssistant.prototype.bannersCallback = function(event){
	try {
		snippetBanners.put( event.value )
		this.playSound();
		if ( snippetBanners.get() == 1 )
			Mojo.Controller.getAppController().showBanner({	messageText: "Notifications now on..." }, "", "" );
	}
	catch ( e ) {
		debug( e );
	}
}
//
// toggle notification banners
//
PreferencesAssistant.prototype.soundCallback = function(event){
	try {
		GVsound.put( event.value );
		this.playSound();
	}
	catch ( e ) {
		debug( e );
	}
}
//
// toggle shake
//
PreferencesAssistant.prototype.shakeCallback = function(event){
	try {
		GVshake.put( event.value );
	}
	catch ( e ) {
		debug( e );
	}
}
//
// record the new GV number
//
PreferencesAssistant.prototype.numberChange = function(event) {
	try {
		GVNum.put(event.value);
	}
	catch ( e ) {
		debug( e );
	}
}

//
// record the new GV PIN
//
PreferencesAssistant.prototype.pinChange = function(event) {
	try {
		GVPIN.put(event.value);
	}
	catch ( e ) {
		debug( e );
	}
}

//
// record the new delay
//
PreferencesAssistant.prototype.delayChange = function(event){
	try {
		this.playSound();
		delay = event.value;
		GVDelay.put(delay);
		msg = ' second';
		if ( delay > 1 )
			msg = ' seconds';
		msg += '...'
		this.controller.get('gvDelayPrompt').update( 'Delay currently set to <b>' + delay + '</b> ' + msg );
	}
	catch ( e ) {
		debug( e );
	}
}

//
// record the new GV email address
//
PreferencesAssistant.prototype.emailChange = function(event) {
	try {
		GVemail.put(event.value);
	}
	catch ( e ) {
		debug( e );
	}
}

//
// record the new GV email address
//
PreferencesAssistant.prototype.passwordChange = function(event) {
	try {
		GVpassword.put(event.value);
	}
	catch ( e ) {
		debug( e );
	}
}

PreferencesAssistant.prototype.activate = function(event) {
}

PreferencesAssistant.prototype.deactivate = function(event) {
	try {
		this.controller.stopListening(	this.controller.get( 'gvNum'),		Mojo.Event.propertyChange,	this.numberChange		);
		this.controller.stopListening(	this.controller.get( 'gvPIN'),		Mojo.Event.propertyChange,	this.pinChange			);
		this.controller.stopListening(	this.controller.get( 'useBanners'),	Mojo.Event.propertyChange,	this.bannersCallback	);
		this.controller.stopListening(	this.controller.get( 'useSound'),	Mojo.Event.propertyChange,	this.soundCallback		);
		this.controller.stopListening(	this.controller.get( 'useShake'),	Mojo.Event.propertyChange,	this.shakeCallback		);
		this.controller.stopListening(	document,							'shakestart',				this.handleShakeStart	);
		this.controller.stopListening(	document,							'shaking',					this.handleShaking		);
		this.controller.stopListening(	document,							'shakeend',					this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );
	}
}

PreferencesAssistant.prototype.cleanup = function(event) {
	try {
		this.controller.stopListening(	this.controller.get( 'gvNum'),		Mojo.Event.propertyChange,	this.numberChange		);
		this.controller.stopListening(	this.controller.get( 'gvPIN'),		Mojo.Event.propertyChange,	this.pinChange			);
		this.controller.stopListening(	this.controller.get( 'useBanners'),	Mojo.Event.propertyChange,	this.bannersCallback	);
		this.controller.stopListening(	this.controller.get( 'useSound'),	Mojo.Event.propertyChange,	this.soundCallback		);
		this.controller.stopListening(	this.controller.get( 'useShake'),	Mojo.Event.propertyChange,	this.shakeCallback		);
		this.controller.stopListening(	document,							'shakestart',				this.handleShakeStart	);
		this.controller.stopListening(	document,							'shaking',					this.handleShaking		);
		this.controller.stopListening(	document,							'shakeend',					this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );
	}
}

PreferencesAssistant.prototype.showDialogBox = function(value){
	//
	// display a dialog box
	//
	this.controller.showAlertDialog({
		onChoose:	function(value) {},
		title:		'P2GoogleVoice',
		message:	value,
		choices:	[{
			label:'OK', 
			value:'OK', 
			type:'color'
		}]
	});
}

////////////////////////////////////////////////////////////////////////////////
//
// shake event handlers
//
////////////////////////////////////////////////////////////////////////////////
PreferencesAssistant.prototype.handleShakeStart=function(event)	{
}

PreferencesAssistant.prototype.handleShaking=function(event)	{
}

PreferencesAssistant.prototype.handleShakeEnd=function(event)	{
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
PreferencesAssistant.prototype.playSound = function(event){
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
