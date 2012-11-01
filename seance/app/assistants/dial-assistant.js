function DialAssistant( resp ) {
	try {
		this.response = resp;
	}
	catch ( e ) {
		debug( e );
	}
}

DialAssistant.prototype.setup = function(event) {
	try {
		//
		// Setup Application Menu
		//
		this.controller.setupWidget(	Mojo.Menu.appMenu,
										menuAttrNone,
										menuModelChooser );
		//
		// number types
		//
		this.phoneLabel		= [];
		this.phoneLabel[0]	='home';
		this.phoneLabel[1]	='work';
		this.phoneLabel[2]	='other';
		this.phoneLabel[3]	='mobile';
		this.phoneLabel[4]	='pager';
		this.phoneLabel[5]	='personal fax';
		this.phoneLabel[6]	='work fax';
		this.phoneLabel[7]	='main';
		this.phoneLabel[8]	='SIM';
		
		//
		// determine correct first name use
		//
		fName = this.response.details.record.firstName;
		if ( this.response.details.record.firstName[this.response.details.record.firstName.length-1] == 's' )
			fName += "' ";
		else
			fName += "'s ";
		//
		// populate data
		//
		this.widgets = new Array();
		numbers = this.response.details.record.phoneNumbers;
		//
		// add manual dial option
		//
		this.widgets.push({
			numType:	0,
			num:		'Use a different number',
			desc:		'Manually dial a different number',
			img:		'./images/dialpad48.png',
			name:		'Manual dial'
		});
		//
		// now whatever returned from contacts chooser
		//	
		for (p in numbers) {
			n = numbers[p];
			if ( n.value ) {
				if ( !this.phoneLabel[n.label] ) {
					this.phoneLabel[n.label] = 'Other';
				}
		
				this.widgets.push({
					numType:	this.phoneLabel[n.label],
					num:		n.value,
					desc:		'Use ' + fName + this.phoneLabel[n.label] + ' number',
					img:		'./images/addressBook48.png',
					name:		this.response.details.record.firstName + ' ' + this.response.details.record.lastName
				});
			}
		}
	
		this.controller.setupWidget(	'numList', 
										{
											itemTemplate:		'dial/listitem',
										},
										{
											items:this.widgets
										}
									);
		Mojo.Event.listen($('numList'),Mojo.Event.listTap, this.listTapHandler.bindAsEventListener(this));
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
DialAssistant.prototype.handleCommand = function(event) {
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

DialAssistant.prototype.dividerFunc = function(itemModel) {
	try {
		return itemModel.numType;
	}
	catch ( e ) {
		debug( e );
	}
}

DialAssistant.prototype.listTapHandler = function(event){
	try {
        var index = event.model.items.indexOf(event.item);
		if (index > -1) {
			this.playSound();
			//
			// if the user tapped on the first one (for manual dial)
			//
			if ( index == 0 ) {
				this.controller.stageController.popScene( '!' );
			}
			else {
				GVName = event.item.name;
				this.controller.stageController.popScene( '*' + event.item.num );
			}
        }      
	}
	catch ( e ) {
		debug( e );
	}
}

DialAssistant.prototype.activate = function(event) {
}

DialAssistant.prototype.deactivate = function(event) {
	try {
		this.controller.stopListening(	this.controller.get('numList'),		Mojo.Event.listTap,	this.listTapHandler		);
		this.controller.stopListening(	document,							'shakestart',		this.handleShakeStart	);
		this.controller.stopListening(	document,							'shaking',			this.handleShaking		);
		this.controller.stopListening(	document,							'shakeend',			this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );
	}
}

DialAssistant.prototype.cleanup = function(event) {
	try {
		this.controller.stopListening(	this.controller.get('numList'),		Mojo.Event.listTap,	this.listTapHandler		);
		this.controller.stopListening(	document,							'shakestart',		this.handleShakeStart	);
		this.controller.stopListening(	document,							'shaking',			this.handleShaking		);
		this.controller.stopListening(	document,							'shakeend',			this.handleShakeEnd		);
	}
	catch ( e ) {
		debug( e );
	}
}

DialAssistant.prototype.showDialogBox = function(caption, message){
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

DialAssistant.prototype.handleShakeStart=function(event)	{
}

DialAssistant.prototype.handleShaking=function(event)	{
}

DialAssistant.prototype.handleShakeEnd=function(event)	{
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
DialAssistant.prototype.playSound = function(event){
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
