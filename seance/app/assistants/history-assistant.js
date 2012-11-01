function HistoryAssistant() {
	try {
		this.index = -1;
	}
	catch ( e ) {
		debug( e );
	}
}

HistoryAssistant.prototype.setup = function(event) {
	try {
		//
		// Setup Application Menu
		//
		this.controller.setupWidget(	Mojo.Menu.appMenu,
										menuAttrNone,
										menuModelHistory );
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
			                                                label:		'Clear history', 
			                                                command:	'clear',
			                                                iconPath:	Mojo.appPath + "images/alerts32.png", 
														},
														{
			                                                label:		$L('Clear history'), 
			                                                command:	'clear',
														},
														{
			                                                label:		'Clear history', 
			                                                command:	'clear',
			                                                iconPath:	Mojo.appPath + "images/alerts32.png", 
														},
													]
												},
												{
												},
											]
										}
									);
		//
		// populate data
		//
		this.events = new Array();
		var strEvent;
		var strNum;
		var strImg;
		var strType;
		var strName;
		//
		// event 1
		//
		strEvent	= '';
		strNum		= '';
		strImg		= '';
		strType		= '';
		strName		= '';
		if ( ckEvent0 && ckEvent0.get() ) {
			strEvent = ckEvent0.get();
			strNum = strEvent.split( '|' );
			if ( strNum[2] == 'P' )
				strImg = './images/phone48.png';
			else
				strImg = './images/sms48.png';
			strType = strNum[2];
			strName = strNum[3];
			this.events.push({
				num:		strNum[0],
				desc:		strNum[1],
				img:		strImg,
				type:		strType,
				name:		strName
			});
		}
		//
		// event 2
		//
		strEvent	= '';
		strNum		= '';
		strImg		= '';
		strType		= '';
		strName		= '';
		if ( ckEvent1 && ckEvent1.get() ) {
			strEvent = ckEvent1.get();
			strNum = strEvent.split( '|' );
			if ( strNum[2] == 'P' )
				strImg = './images/phone48.png';
			else
				strImg = './images/sms48.png';
			strType = strNum[2];
			strName = strNum[3];
			this.events.push({
				num:		strNum[0],
				desc:		strNum[1],
				img:		strImg,
				type:		strType,
				name:		strName
			});
		}
		//
		// event 3
		//
		strEvent	= '';
		strNum		= '';
		strImg		= '';
		strType		= '';
		strName		= '';
		if ( ckEvent2 && ckEvent2.get() ) {
			strEvent = ckEvent2.get();
			strNum = strEvent.split( '|' );
			if ( strNum[2] == 'P' )
				strImg = './images/phone48.png';
			else
				strImg = './images/sms48.png';
			strType = strNum[2];
			strName = strNum[3];
			this.events.push({
				num:		strNum[0],
				desc:		strNum[1],
				img:		strImg,
				type:		strType,
				name:		strName
			});
		}
		//
		// event 4
		//
		strEvent	= '';
		strNum		= '';
		strImg		= '';
		strType		= '';
		strName		= '';
		if ( ckEvent3 && ckEvent3.get() ) {
			strEvent = ckEvent3.get();
			strNum = strEvent.split( '|' );
			if ( strNum[2] == 'P' )
				strImg = './images/phone48.png';
			else
				strImg = './images/sms48.png';
			strType = strNum[2];
			strName = strNum[3];
			this.events.push({
				num:		strNum[0],
				desc:		strNum[1],
				img:		strImg,
				type:		strType,
				name:		strName
			});
		}
		//
		// event 5
		//
		strEvent	= '';
		strNum		= '';
		strImg		= '';
		strType		= '';
		strName		= '';
		if ( ckEvent4 && ckEvent4.get() ) {
			strEvent = ckEvent4.get();
			strNum = strEvent.split( '|' );
			if ( strNum[2] == 'P' )
				strImg = './images/phone48.png';
			else
				strImg = './images/sms48.png';
			strType = strNum[2];
			strName = strNum[3];
			this.events.push({
				num:		strNum[0],
				desc:		strNum[1],
				img:		strImg,
				type:		strType,
				name:		strName
			});
		}
		//
		// event 6
		//
		strEvent	= '';
		strNum		= '';
		strImg		= '';
		strType		= '';
		strName		= '';
		if ( ckEvent5 && ckEvent5.get() ) {
			strEvent = ckEvent5.get();
			strNum = strEvent.split( '|' );
			if ( strNum[2] == 'P' )
				strImg = './images/phone48.png';
			else
				strImg = './images/sms48.png';
			strType = strNum[2];
			strName = strNum[3];
			this.events.push({
				num:		strNum[0],
				desc:		strNum[1],
				img:		strImg,
				type:		strType,
				name:		strName
			});
		}
		//
		// event 7
		//
		strEvent	= '';
		strNum		= '';
		strImg		= '';
		strType		= '';
		strName		= '';
		if ( ckEvent6 && ckEvent6.get() ) {
			strEvent = ckEvent6.get();
			strNum = strEvent.split( '|' );
			if ( strNum[2] == 'P' )
				strImg = './images/phone48.png';
			else
				strImg = './images/sms48.png';
			strType = strNum[2];
			strName = strNum[3];
			this.events.push({
				num:		strNum[0],
				desc:		strNum[1],
				img:		strImg,
				type:		strType,
				name:		strName
			});
		}
		//
		// event 8
		//
		strEvent	= '';
		strNum		= '';
		strImg		= '';
		strType		= '';
		strName		= '';
		if ( ckEvent7 && ckEvent7.get() ) {
			strEvent = ckEvent7.get();
			strNum = strEvent.split( '|' );
			if ( strNum[2] == 'P' )
				strImg = './images/phone48.png';
			else
				strImg = './images/sms48.png';
			strType = strNum[2];
			strName = strNum[3];
			this.events.push({
				num:		strNum[0],
				desc:		strNum[1],
				img:		strImg,
				type:		strType,
				name:		strName
			});
		}
		//
		// event 9
		//
		strEvent	= '';
		strNum		= '';
		strImg		= '';
		strType		= '';
		strName		= '';
		if ( ckEvent8 && ckEvent8.get() ) {
			strEvent = ckEvent8.get();
			strNum = strEvent.split( '|' );
			if ( strNum[2] == 'P' )
				strImg = './images/phone48.png';
			else
				strImg = './images/sms48.png';
			strType = strNum[2];
			strName = strNum[3];
			this.events.push({
				num:		strNum[0],
				desc:		strNum[1],
				img:		strImg,
				type:		strType,
				name:		strName
			});
		}
		//
		// event 10
		//
		strEvent	= '';
		strNum		= '';
		strImg		= '';
		strType		= '';
		strName		= '';
		if ( ckEvent9 && ckEvent9.get() ) {
			strEvent = ckEvent9.get();
			strNum = strEvent.split( '|' );
			if ( strNum[2] == 'P' )
				strImg = './images/phone48.png';
			else
				strImg = './images/sms48.png';
			strType = strNum[2];
			strName = strNum[3];
			this.events.push({
				num:		strNum[0],
				desc:		strNum[1],
				img:		strImg,
				type:		strType,
				name:		strName
			});
		}
		this.controller.setupWidget(	'historyList', 
										{
											itemTemplate:	'history/listitem',
											swipeToDelete:	false,
											reorderable:	false,
										},
										{
											items:			this.events,
										});
		Mojo.Event.listen( this.controller.get('historyList'), Mojo.Event.listTap, this.listTapHandler.bindAsEventListener(this));
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

HistoryAssistant.prototype.listTapHandler = function(event){
	try {
        this.index = event.model.items.indexOf(event.item);
		if (this.index > -1) {
			GVName = event.item.name;
			this.playSound();
			this.controller.popupSubmenu({
				onChoose:  this.popupHandler,
				items: [
					{
						label:		$L(this.events[this.index].num),
		 			}, 
					{
						label:		$L("Place phone call"),
						command:	"do-phone",
						iconPath:	Mojo.appPath + "images/phone32.png", 
					},
					{
						label:		$L("Send text message"),
						command:	"do-sms",
						iconPath:	Mojo.appPath + "images/sms32.png", 
					},
					{
						label:		$L("I've changed my mind"),
		 			}, 
					{
						label:		$L("Return to history list"),
						command:	"do-nothing",
						iconPath:	Mojo.appPath + "images/logo32.png"
					}
				],
			});
        }      
	}
	catch ( e ) {
		debug( e );
	}
}

HistoryAssistant.prototype.popupHandler = function( cmd ){
	try {
		if ( cmd.length > 0 ) {
			if ( cmd == "do-phone" ) {
				this.controller.stageController.popScene( 'P' + this.events[this.index].num );
			}
			else if ( cmd == "do-sms" ) {
				this.controller.stageController.popScene( 'S' + this.events[this.index].num );
			}
		}
	}
	catch ( e ) {
		debug( e );
	}
}

//
// show a dialog box with a message
//
HistoryAssistant.prototype.showDialogBox = function( caption, msg ){
	this.controller.showAlertDialog({
		onChoose:	function(value) {},
		title:		caption,
		message:	msg,
		choices:	[{
			label:'OK', 
			value:'OK', 
			type:'dismiss',
		}]
	});
}

////////////////////////////////////////////////////////////////////////////////
//
// command menu handler
//
////////////////////////////////////////////////////////////////////////////////
HistoryAssistant.prototype.handleCommand = function(event) {
	try {
		if(event.type == Mojo.Event.command) {
			this.playSound();
			
			switch(event.command) {
				case 'clear':
					ckEvent0.put( '' );
					ckEvent1.put( '' );
					ckEvent2.put( '' );
					ckEvent3.put( '' );
					ckEvent4.put( '' );
					ckEvent5.put( '' );
					ckEvent6.put( '' );
					ckEvent7.put( '' );
					ckEvent8.put( '' );
					ckEvent9.put( '' );
					this.controller.stageController.popScene();
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
// scene activate, deactivate and cleanup
//
////////////////////////////////////////////////////////////////////////////////
//
// scene activating - if we have a snippet then we act on it
//
HistoryAssistant.prototype.activate = function(event) {
}

//
// scene deactivating - so stop listening
//
HistoryAssistant.prototype.deactivate = function(event) {
	try {
		this.controller.stopListening(	this.controller.get('historyList'),	Mojo.Event.listTap,	this.listTapHandler		);
		this.controller.stopListening(	document,							'shakestart',		this.handleShakeStart	);
		this.controller.stopListening(	document,							'shaking',			this.handleShaking		);
		this.controller.stopListening(	document,							'shakeend',			this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );
	}
}

//
// scene cleaning up - so stop listening (just in case)
//
HistoryAssistant.prototype.cleanup = function(event) {
	try {
		this.controller.stopListening(	this.controller.get('historyList'),	Mojo.Event.listTap,	this.listTapHandler		);
		this.controller.stopListening(	document,							'shakestart',		this.handleShakeStart	);
		this.controller.stopListening(	document,							'shaking',			this.handleShaking		);
		this.controller.stopListening(	document,							'shakeend',			this.handleShakeEnd		);
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
HistoryAssistant.prototype.handleShakeStart = function(event)	{
}

HistoryAssistant.prototype.handleShaking = function(event)	{
}

HistoryAssistant.prototype.handleShakeEnd = function(event)	{
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
HistoryAssistant.prototype.playSound = function(event){
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
