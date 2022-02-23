class MBackgroundChipView extends MBaseCoinView
{
	static get FALL_SPEED() 	{ return 1 }
	static get FLIP_SPEED() 	{ return 0.001 }
	static get ROTATION_SPEED() { return 0.01 }

	static get SHIFT_ANGLE_CHANGE_SPEED() { return 0.005 }
	static get SHIFT_SPEED() { return 0.375 }

	static get BUBBLE_GENERATION_INTERVAL() { return 25 }

	constructor(aBubblePool_mbpv)
	{
		super();

		this._fTargetRotation_num = undefined;
		this._fTargetFlip_num = undefined;
		this._fTargetScale_num = undefined;
		this._fShiftAngle_num = undefined;
		this._fBubblePool_mbpv = aBubblePool_mbpv;
		this._fFramesCount_num = 0;
		this._fCanBeReused_bl = false;

		this.setScale(0.4);

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
		this.setXY(aX_num, aY_num);
		this.setVisible(true);
	}

	update(aFramesCount_int)
	{
		if(this.canBeReused())
		{
			return;
		}

		//GENERATING BUBBLE IF REQUIRED...
		this._fFramesCount_num += aFramesCount_int;

		if(this._fFramesCount_num > MBackgroundChipView.BUBBLE_GENERATION_INTERVAL)
		{
			this._fFramesCount_num %= MBackgroundChipView.BUBBLE_GENERATION_INTERVAL;
			this._fBubblePool_mbpv.generateBubble(this.getX(), this.getY());
		}
		//...GENERATING BUBBLE IF REQUIRED

		this._fTargetRotation_num += MBackgroundChipView.ROTATION_SPEED * aFramesCount_int;
		this._fTargetFlip_num += MBackgroundChipView.FLIP_SPEED * aFramesCount_int;
		this._fShiftAngle_num += MBackgroundChipView.SHIFT_ANGLE_CHANGE_SPEED * aFramesCount_int;
		this.setXY(
			this.getX() + MBackgroundChipView.SHIFT_SPEED * Math.cos(this._fShiftAngle_num) * aFramesCount_int,
			this.getY() + MBackgroundChipView.FALL_SPEED * this._fTargetScale_num * aFramesCount_int);
		
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
		return STORAGE.foregroundChipFace_mp;
	}

	getTailsPicture()
	{
		return STORAGE.foregroundChipFace_mp;
	}

	getRibPicture()
	{
		return STORAGE.foregroundChipRib_mp;
	}

	getMiddlePicture()
	{
		return STORAGE.foregroundChipRibExtended_mp;
	}

	getShadowPicture()
	{
		return STORAGE.foregroundChipShadow_mp;
	}
	//...PICTURES
}