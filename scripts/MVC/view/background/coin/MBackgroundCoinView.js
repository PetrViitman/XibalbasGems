class MBackgroundCoinView extends MBaseCoinView
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

		this.setScale(0.35);

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

	update(aFramesCount_num)
	{
		if(this.canBeReused())
		{
			return;
		}

		//GENERATING BUBBLE IF REQUIRED...
		this._fFramesCount_num += aFramesCount_num;

		if(this._fFramesCount_num > MBackgroundCoinView.BUBBLE_GENERATION_INTERVAL)
		{
			this._fFramesCount_num %= MBackgroundCoinView.BUBBLE_GENERATION_INTERVAL;
			this._fBubblePool_mbpv.generateBubble(this.getX(), this.getY());
		}
		//...GENERATING BUBBLE IF REQUIRED

		this._fTargetRotation_num += MBackgroundCoinView.ROTATION_SPEED * aFramesCount_num;
		this._fTargetFlip_num += MBackgroundCoinView.FLIP_SPEED * aFramesCount_num;
		this._fShiftAngle_num += MBackgroundCoinView.SHIFT_ANGLE_CHANGE_SPEED * aFramesCount_num;
		this.setXY(
			this.getX() + MBackgroundCoinView.SHIFT_SPEED * Math.cos(this._fShiftAngle_num) * aFramesCount_num,
			this.getY() + MBackgroundCoinView.FALL_SPEED * this._fTargetScale_num * aFramesCount_num);
		


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
}