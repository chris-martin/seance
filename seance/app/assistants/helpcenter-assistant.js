function HelpcenterAssistant() {
}

HelpcenterAssistant.prototype.setup = function(event) {
	try {
		//
		// Setup Application Menu
		//
		this.controller.setupWidget(	Mojo.Menu.appMenu,
										menuAttrNone,
										menuModelNone );
		//
		// help index items
		//
		this.helpItems = [
			{	value: 'Instructions',			img: './images/info48.png',		desc: "How to use this program"				},
			{	value: "What's New",			img: './images/changes48.png',	desc: "Read about changes in this version"	},
			{	value: "View on-line manual",	img: './images/view48.png',		desc: "View on-line Manual & FAQ"			},
		];
		this.controller.setupWidget(	"helpIndex",
										this.attributes = {
											itemTemplate:	"helpcenter/listitem",
											swipeToDelete:	false,
											reorderable:	false,
										},
										this.model = {
											listTitle:	'Help Index',
											items:		this.helpItems,
										}
									);
		Mojo.Event.listen(	this.controller.get( 'helpIndex' ), Mojo.Event.listTap, this.helpAction.bindAsEventListener(this) );
		//
		// support index items
		//
		this.supportItems = [
			{	value: 'Send Feedback',				img: './images/feedback48.png',	desc: 'Reach the developers'				},
			{	value: 'About',						img: './images/logo48.png',		desc: 'View program details & disclaimer'	},
			{	value: 'P<sup>2</sup>Labs Website',	img: './images/web48.png',		desc: 'Visit http://P2Labs.com'				},
		];
		this.controller.setupWidget(	"supportIndex",
										this.attributes = {
											itemTemplate:	"helpcenter/listitem",
											swipeToDelete:	false,
											reorderable:	false,
										},
										this.model = {
											listTitle:	'Suppport Index',
											items:		this.supportItems,
										}
									);
		Mojo.Event.listen(	this.controller.get( 'supportIndex' ), Mojo.Event.listTap, this.supportAction.bindAsEventListener(this) );
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

HelpcenterAssistant.prototype.helpAction = function(event) {
	try {
	    var index = event.model.items.indexOf(event.item);
	    if ( index >= 0 ) {
			this.playSound();
	    	switch ( index) {
	    		//
	    		// read help
	    		//
	    		case 0:
					this.controller.stageController.pushScene( 'help' ); 
	    			break;
	    		//
	    		// what's new
	    		//
	    		case 1:
					this.controller.stageController.pushScene( 'helpChangeLog' ); 
	    			break;
	    		//
	    		// on-line manuals
	    		//
				case 2:
					this.controller.serviceRequest(	"palm://com.palm.applicationManager",
													{
														method: "open",
														parameters:  {
															id: 'com.palm.app.browser',
															params: {
																target: "http://mobile.p2Labs.com",
															}
														}
													});
	    		default:
	    			break;
	    	}
	    }
	}
	catch ( e ) {
		debug( e );
	}
}

HelpcenterAssistant.prototype.supportAction = function(event) {
	try {
	    var index = event.model.items.indexOf(event.item);
	    if ( index >= 0 ) {
			this.playSound();
	    	switch ( index) {
				case 0:
				  	this.controller.serviceRequest(	'palm://com.palm.applicationManager',
				  									{
													    method:'open',
													    parameters:{
													    	target: 'mailto:support@P2Labs.com?subject=' + Mojo.appInfo.title + " ver. "+ Mojo.appInfo.version + " Feedback",
														}
													});	
					break;
				case 1:
					this.controller.stageController.pushScene( 'about' );
					break;
				case 2:
					this.controller.serviceRequest(	"palm://com.palm.applicationManager",
													{
														method: "open",
														parameters:  {
															id: 'com.palm.app.browser',
															params: {
																target: "http://p2labs.com/exen/index.php/products/p2googlevoice-webos/",
															}
														}
													});
	    		//
	    		// default
	    		//
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
// command menu handler
//
////////////////////////////////////////////////////////////////////////////////
HelpcenterAssistant.prototype.handleCommand = function(event) {
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

HelpcenterAssistant.prototype.activate = function(event) {
}

HelpcenterAssistant.prototype.deactivate = function(event) {
	try {
		this.controller.stopListening(	document,	'shakestart',	this.handleShakeStart	);
		this.controller.stopListening(	document,	'shaking',		this.handleShaking		);
		this.controller.stopListening(	document,	'shakeend',		this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );
	}
}

HelpcenterAssistant.prototype.cleanup = function(event) {
	try {
		this.controller.stopListening(	document,	'shakestart',	this.handleShakeStart	);
		this.controller.stopListening(	document,	'shaking',		this.handleShaking		);
		this.controller.stopListening(	document,	'shakeend',		this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );
	}
}

HelpcenterAssistant.prototype.showDialogBox = function(caption, message){
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

HelpcenterAssistant.prototype.handleShakeStart=function(event)	{
}

HelpcenterAssistant.prototype.handleShaking=function(event)	{
}

HelpcenterAssistant.prototype.handleShakeEnd=function(event)	{
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
HelpcenterAssistant.prototype.playSound = function(event){
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
