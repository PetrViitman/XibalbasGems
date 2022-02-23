class MWinParticleView extends MDisplayContainer
{
	static get MOVE_SPEED() 				{ return 4 }
	static get FLOATING_SPEED() 			{ return 1 }


	static get SCALE_SPEED() 				{ return 0.02 }

	static get STATE_ID_INTRO() 			{ return 0 }
	static get STATE_ID_OUTRO() 			{ return 1 }

	static get ANGLE_CHANGE_SPEED() 		{ return 0.05 }


	constructor()
	{
		super();
		
		this._fParticleFront_mdo = this.addChild(new MDisplayObject(STORAGE.winParticleFront_mp));
		this._fParticleBack_mdo = this.addChild(new MDisplayObject(STORAGE.winParticleBack_mp));

		this._fCanBeReused_bl = true;

		this._fTargetAngle_num = undefined;
		this._fTargetScale_num = undefined;
		this._fTargetX_num = undefined;
		this._fTargetY_num = undefined;
		this._fStateId_int = undefined;

		this._fParticleFront_mdo.setRegPointToCenter();
		this._fParticleBack_mdo.setRegPointToCenter();
		this._fParticleBack_mdo.setVisible(false);
		this._fIsBackSideFlip_bl = false;

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
		this._fTargetAngle_num = Math.random() * Math.PI * 2;
		this._fTargetScale_num = 0;
		this._fTargetX_num = aX_num;
		this._fTargetY_num = aY_num;
		this._fStateId_int = MWinParticleView.STATE_ID_INTRO;
		this._fCanBeReused_bl = false;

		this.applyMetrics();
	}

	update(aFramesCount_num)
	{

		if(this._fCanBeReused_bl)
		{
			return;
		}

		this._fTargetAngle_num += MWinParticleView.ANGLE_CHANGE_SPEED;

		this._fTargetX_num += MWinParticleView.FLOATING_SPEED * Math.cos(this._fTargetAngle_num) * aFramesCount_num
		this._fTargetY_num -= MWinParticleView.MOVE_SPEED * aFramesCount_num;
		
		switch(this._fStateId_int)
		{
			case MWinParticleView.STATE_ID_INTRO:
			{
				this._fTargetScale_num += MWinParticleView.SCALE_SPEED * aFramesCount_num;

				if(this._fTargetScale_num >= 1)
				{
					this._fStateId_int = MWinParticleView.STATE_ID_OUTRO;
				}
			}
			break;
			case MWinParticleView.STATE_ID_OUTRO:
			{
				this._fTargetScale_num -= MWinParticleView.SCALE_SPEED * aFramesCount_num;

				if(this._fTargetScale_num <= 0)
				{	
					this._fStateId_int = MWinParticleView.STATE_ID_INTRO;
					this._fIsBackSideFlip_bl = !this._fIsBackSideFlip_bl;
					this._fParticleFront_mdo.setVisible(this._fIsBackSideFlip_bl);
					this._fParticleBack_mdo.setVisible(!this._fIsBackSideFlip_bl);
				}
			}
			break;
		}

		if(this.getY() < -50)
		{
			this._fCanBeReused_bl = true;
		}

		this.applyMetrics();
	}

	applyMetrics()
	{
		this.setXY(this._fTargetX_num, this._fTargetY_num);
		this.setScaleX(this._fTargetScale_num);
	}
}