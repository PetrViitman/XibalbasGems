class MFireView extends MDisplayObject
{

	static get ROTATION_SPEED() 			{ return 0.015 }
	static get MOVE_SPEED() 				{ return 10 }

	static get INTRO_ALPHA_SPEED() 			{ return 0.025 }
	static get INTRO_SCALE_SPEED() 			{ return 0.1 }

	static get OUTRO_ALPHA_SPEED() 			{ return 0.04 }
	static get OUTRO_SCALE_SPEED() 			{ return 0.15 }

	static get STATE_ID_INTRO() 			{ return 0 }
	static get STATE_ID_OUTRO() 			{ return 1 }


	constructor()
	{
		super(STORAGE.fire_mp);
	
		this._fCanBeReused_bl = true;
		this._fTargetAlpha_num = undefined;
		this._fTargetAngle_num = undefined;
		this._fTargetScale_num = undefined;
		this._fTargetX_num = undefined;
		this._fTargetY_num = undefined;
		this._fStateId_int = undefined;

		this.setRegPointToCenter();
	}

	canBeReused()
	{
		return this._fCanBeReused_bl;
	}

	reset(aX_num, aY_num)
	{
		this._fTargetAlpha_num = 0;
		this._fTargetAngle_num = Math.random() * Math.PI * 2;
		this._fTargetScale_num = 0;
		this._fTargetX_num = aX_num;
		this._fTargetY_num = aY_num;
		this._fStateId_int = MFireView.STATE_ID_INTRO;
		this._fCanBeReused_bl = false;

		this.applyMetrics();
	}

	update(aFramesCount_num)
	{

		if(this._fCanBeReused_bl)
		{
			return;
		}


		this._fTargetY_num -= MFireView.MOVE_SPEED * aFramesCount_num;
		
		this._fTargetAngle_num += MFireView.ROTATION_SPEED * aFramesCount_num;

		switch(this._fStateId_int)
		{
			case MFireView.STATE_ID_INTRO:
			{
				this._fTargetScale_num += MFireView.INTRO_SCALE_SPEED * aFramesCount_num;
				this._fTargetAlpha_num += MFireView.INTRO_ALPHA_SPEED * aFramesCount_num;
			
				if(this._fTargetAlpha_num >= 1)
				{
					this._fTargetAlpha_num = 1;
					this._fStateId_int = MFireView.STATE_ID_OUTRO;
				}
			}
			break;
			case MFireView.STATE_ID_OUTRO:
			{
				this._fTargetScale_num -= MFireView.INTRO_SCALE_SPEED * aFramesCount_num;
				this._fTargetAlpha_num -= MFireView.INTRO_ALPHA_SPEED * aFramesCount_num;

				if(this._fTargetAlpha_num <= 0)
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
		this.setScale(this._fTargetScale_num * 2);
		//this.setAlpha(this._fTargetAlpha_num * 0.3);
		this.setAlpha(this._fTargetAlpha_num);
		//this.setAlpha(this._fTargetAlpha_num * 1);
		this.setRotation(this._fTargetAngle_num);
	}
}