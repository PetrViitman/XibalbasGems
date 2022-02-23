class MFloatingParticleView extends MDisplayContainer
{
	static get MOVE_SPEED() 				{ return 1 }


	static get SCALE_SPEED() 				{ return 0.005 }

	static get STATE_ID_INTRO() 			{ return 0 }
	static get STATE_ID_OUTRO() 			{ return 1 }

	static get ANGLE_CHANGE_SPEED() 		{ return 0.0075 }


	constructor()
	{
		super();
		
		this._fRotationContainer_mdc = this.addChild(new MDisplayContainer());
		this._fParticle_mdo = this._fRotationContainer_mdc.addChild(new MDisplayObject(STORAGE.floatingParticle_mp));

		this._fCanBeReused_bl = true;

		this._fTargetAngle_num = undefined;
		this._fTargetScale_num = undefined;
		this._fTargetX_num = undefined;
		this._fTargetY_num = undefined;
		this._fStateId_int = undefined;

		this._fParticle_mdo.setRegPointToCenter();
		
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
		this._fStateId_int = MFloatingParticleView.STATE_ID_INTRO;
		this._fCanBeReused_bl = false;
		this.setVisible(true);
		this.applyMetrics();
	}

	update(aFramesCount_num)
	{

		if(this._fCanBeReused_bl)
		{
			return;
		}

		this._fTargetAngle_num += MFloatingParticleView.ANGLE_CHANGE_SPEED * aFramesCount_num;

		this._fTargetX_num += MFloatingParticleView.MOVE_SPEED * Math.cos(this._fTargetAngle_num) * aFramesCount_num
		this._fTargetY_num += MFloatingParticleView.MOVE_SPEED * Math.sin(this._fTargetAngle_num) * aFramesCount_num
		
		switch(this._fStateId_int)
		{
			case MFloatingParticleView.STATE_ID_INTRO:
			{
				this._fTargetScale_num += MFloatingParticleView.SCALE_SPEED * aFramesCount_num;

				if(this._fTargetScale_num >= 1)
				{
					this._fStateId_int = MFloatingParticleView.STATE_ID_OUTRO;
				}
			}
			break;
			case MFloatingParticleView.STATE_ID_OUTRO:
			{
				this._fTargetScale_num -= MFloatingParticleView.SCALE_SPEED * aFramesCount_num;

				if(this._fTargetScale_num <= 0)
				{	
					this._fCanBeReused_bl = true;
					this.setVisible(false);
				}
			}
			break;
		}

		this.applyMetrics();
	}

	applyMetrics()
	{
		this.setXY(this._fTargetX_num, this._fTargetY_num);
		this._fParticle_mdo.setScaleY(this._fTargetScale_num);
		this._fRotationContainer_mdc.setRotation(this._fTargetAngle_num);
		//this.setRotation(this._fTargetAngle_num);
	}
}