class MForegroundCoinView extends MBaseCoinView
{
	static get FALL_SPEED() 	{ return 4 }
	static get FLIP_SPEED() 	{ return 0.002 }
	static get ROTATION_SPEED() { return 0.02 }

	static get SHIFT_ANGLE_CHANGE_SPEED() { return 0.01 }
	static get SHIFT_SPEED() { return 0.375 * 2 }

	constructor()
	{
		super();

		this._fTargetRotation_num = undefined;
		this._fTargetFlip_num = undefined;
		this._fTargetScale_num = undefined;
		this._fShiftAngle_num = undefined;
		this._fCanBeReused_bl = true;

		this.setScale(0.5);

		//RESPONSIVE DESIGN...
		this.setParentProportionsCorrectionMode(MDisplayContainer.PARENT_PROPORTIONS_CORRECTION_MODE_ID_WIDTH);
		//...RESPONSIVE DESIGN
	}

	reset(aX_num, aY_num)
	{
		this._fTargetRotation_num = Math.random() * Math.PI * 2;
		this._fShiftAngle_num = Math.random() * Math.PI * 2;
		this._fTargetFlip_num = Math.random();
		this._fTargetScale_num = 0.5 + 0.5 * Math.random();
		this._fCanBeReused_bl = false;
		this.setVisible(true);
		this.setXY(aX_num, aY_num);
	}

	update(aFramesCount_num)
	{
		if(this.canBeReused())
		{
			return;
		}

		this._fTargetRotation_num += MForegroundCoinView.ROTATION_SPEED * aFramesCount_num;
		this._fTargetFlip_num += MForegroundCoinView.FLIP_SPEED * aFramesCount_num;
		this._fShiftAngle_num += MForegroundCoinView.SHIFT_ANGLE_CHANGE_SPEED * aFramesCount_num;
		this.setXY(
			this.getX() + MForegroundCoinView.SHIFT_SPEED * Math.cos(this._fShiftAngle_num) * aFramesCount_num,
			this.getY() + MForegroundCoinView.FALL_SPEED * this._fTargetScale_num * aFramesCount_num);
		


		this.setRotation(this._fTargetRotation_num);
		this.setFlip(this._fTargetFlip_num);

		if(this.getY() > this.getParent().getHeight() + 75)
		{
			this._fCanBeReused_bl = true;
			this.setVisible(false);
		}
	}

	canBeReused()
	{
		return this._fCanBeReused_bl;
	}

	//PICTURES...
	getHeadsPicture()
	{
		return STORAGE.foregroundCoinFace_mp;
	}

	getTailsPicture()
	{
		return STORAGE.foregroundCoinFace_mp;
	}

	getRibPicture()
	{
		return STORAGE.foregroundCoinRib_mp;
	}

	getMiddlePicture()
	{
		return STORAGE.foregroundCoinRibExtended_mp;
	}

	getShadowPicture()
	{
		return STORAGE.foregroundCoinShadow_mp;
	}
	//...PICTURES
}