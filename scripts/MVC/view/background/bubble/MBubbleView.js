class MBubbleView extends MDisplayObject
{
	static get MOVE_SPEED() 				{ return 1.5 }

	static get INTRO_ALPHA_SPEED() 			{ return 0.01 }
	static get INTRO_SCALE_SPEED() 			{ return 0.0225 }

	static get OUTRO_ALPHA_SPEED() 			{ return 0.0075 }
	static get OUTRO_SCALE_SPEED() 			{ return 0.05 }

	static get STATE_ID_INTRO() 			{ return 0 }
	static get STATE_ID_OUTRO() 			{ return 1 }

	static get SHIFT_ANGLE_CHANGE_SPEED() { return 0.005 }
	static get SHIFT_SPEED() { return 0.375 }


	constructor()
	{
		super(STORAGE.bubble_mp);
	
		this._fCanBeReused_bl = true;
		this._fTargetAlpha_num = undefined;
		this._fTargetScale_num = undefined;
		this._fTargetX_num = undefined;
		this._fTargetY_num = undefined;
		this._fStateId_int = undefined;
		this._fShiftAngle_num = undefined;

		this.setRegPointToCenter();
		
		//RESPONSIVE DESIGN...
		this.setParentProportionsCorrectionMode(MDisplayContainer.PARENT_PROPORTIONS_CORRECTION_MODE_ID_WIDTH);
		//...RESPONSIVE DESIGN
	}

	canBeReused()
	{
		return this._fCanBeReused_bl;
	}

	reset(aX_num, aY_num)
	{
		this._fTargetAlpha_num = 0.5;
		this._fTargetScale_num = 0;
		this._fTargetX_num = aX_num;
		this._fTargetY_num = aY_num;
		this._fStateId_int = MBubbleView.STATE_ID_INTRO;
		this._fCanBeReused_bl = false;
		this._fShiftAngle_num = Math.random() * Math.PI * 2;

		this.applyMetrics();
	}

	update(aFramesCount_int)
	{

		if(this._fCanBeReused_bl)
		{
			return;
		}

		this._fShiftAngle_num += MBackgroundCoinView.SHIFT_ANGLE_CHANGE_SPEED * aFramesCount_int;
		this._fTargetX_num += MBubbleView.SHIFT_SPEED * Math.cos(this._fShiftAngle_num) * aFramesCount_int
		this._fTargetY_num -= MBubbleView.MOVE_SPEED * aFramesCount_int;
		
		switch(this._fStateId_int)
		{
			case MBubbleView.STATE_ID_INTRO:
			{
				this._fTargetScale_num += MBubbleView.INTRO_SCALE_SPEED * aFramesCount_int;
				this._fTargetAlpha_num += MBubbleView.INTRO_ALPHA_SPEED * aFramesCount_int;
			
				if(this._fTargetAlpha_num >= 1)
				{
					this._fTargetAlpha_num = 1;
					this._fStateId_int = MBubbleView.STATE_ID_OUTRO;
				}
			}
			break;
			case MBubbleView.STATE_ID_OUTRO:
			{
				this._fTargetScale_num -= MBubbleView.OUTRO_SCALE_SPEED * aFramesCount_int;
				this._fTargetAlpha_num -= MBubbleView.OUTRO_ALPHA_SPEED * aFramesCount_int;

				if(
					this._fTargetAlpha_num <= 0 ||
					this._fTargetScale_num <= 0
					)
				{	
					this._fCanBeReused_bl = true;
				}
			}
			break;
		}

		this.applyMetrics();
	}

	applyMetrics()
	{
		this.setXY(this._fTargetX_num, this._fTargetY_num);
		this.setScale(this._fTargetScale_num * 0.4);
		this.setAlpha(this._fTargetAlpha_num);
	}
}