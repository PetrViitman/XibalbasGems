class MBigWinParticlesView extends MDisplayObject
{

	static get MOVE_SPEED() 				{ return 5 }

	static get INTRO_ALPHA_SPEED() 			{ return 0.025 }
	static get INTRO_SCALE_SPEED() 			{ return 0.005 }
	static get OUTRO_ALPHA_SPEED() 			{ return 0.025 * 0.75 }
	static get OUTRO_SCALE_SPEED() 			{ return 0.005 * 0.1 }

	static get STATE_ID_INTRO() 			{ return 0 }
	static get STATE_ID_OUTRO() 			{ return 1 }


	constructor()
	{
		super(STORAGE.bigWinParticles_mp);
	
		this._fCanBeReused_bl = true;
		this._fTargetAlpha_num = undefined;
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

	drop()
	{
		this.setVisible(false);
		this._fCanBeReused_bl = true;
	}

	reset(aX_num, aY_num)
	{
		this._fTargetAlpha_num = 0;
		this._fTargetScale_num = 0.5;
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

		this._fTargetY_num -= MBigWinParticlesView.MOVE_SPEED * aFramesCount_num;

		switch(this._fStateId_int)
		{
			case MFireView.STATE_ID_INTRO:
			{
				this._fTargetAlpha_num += MBigWinParticlesView.INTRO_ALPHA_SPEED * aFramesCount_num;
				this._fTargetScale_num += MBigWinParticlesView.INTRO_SCALE_SPEED * aFramesCount_num;

				if(this._fTargetAlpha_num >= 1)
				{
					this._fTargetAlpha_num = 1;
					this._fStateId_int = MBigWinParticlesView.STATE_ID_OUTRO;
				}
			}
			break;
			case MFireView.STATE_ID_OUTRO:
			{
				this._fTargetAlpha_num -= MBigWinParticlesView.OUTRO_ALPHA_SPEED * aFramesCount_num;
				this._fTargetScale_num -= MBigWinParticlesView.OUTRO_SCALE_SPEED * aFramesCount_num;

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
		this.setY(this._fTargetY_num);
		this.setAlpha(this._fTargetAlpha_num * 2);
		this.setScale(this._fTargetScale_num * 2);
	}
}