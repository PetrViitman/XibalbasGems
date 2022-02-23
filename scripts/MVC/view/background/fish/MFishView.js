class MFishView extends MView
{
	static get PROGRESS_SPEED() { return 0.0038 }
	static get MOTION_SCALE_DELTA() { return 0.3 }
	static get MOTION_Y_DELTA() { return 5 }

	constructor()
	{
		super();

		this._fHeadContainer_mdc = null;
		this._fHeadShadow_mdo = null;
		this._fBodyContainer_mdc = null;
		this._fBodyShadow_mdo = null;
		this._fTailContainer_mdc = null;
		this._fTailShadow_mdo = null;
		this._fProgress_num = 0;

		//HEAD...
		let lHead_mdc = this.addChild(new MDisplayContainer());
		let lHead_mdo = lHead_mdc.addChild(new MDisplayObject(STORAGE.fishHead_mp));
		lHead_mdo.setY(-lHead_mdo.getHeight() / 2);
		this._fHeadShadow_mdo = lHead_mdc.addChild(new MDisplayObject(STORAGE.fishHeadShadow_mp));
		this._fHeadShadow_mdo.setY(-lHead_mdo.getHeight() / 2);
		lHead_mdc.setX(this._fHeadShadow_mdo.getWidth() / 2 - 1);
		this._fHeadContainer_mdc = lHead_mdc;
		//...HEAD

		//BODY...
		let lBody_mdc = this.addChild(new MDisplayContainer());
		let lBody_mdo = lBody_mdc.addChild(new MDisplayObject(STORAGE.fishBody_mp));
		lBody_mdo.setY(-lHead_mdo.getHeight() / 2);
		this._fBodyShadow_mdo = lBody_mdc.addChild(new MDisplayObject(STORAGE.fishBodyShadow_mp));
		this._fBodyShadow_mdo.setY(-lHead_mdo.getHeight() / 2);
		lBody_mdc.setX(-this._fBodyShadow_mdo.getWidth() / 2);
		this._fBodyContainer_mdc = lBody_mdc;
		//...BODY

		//TAIL...
		let lTail_mdc = this.addChild(new MDisplayContainer());
		let lTail_mdo = lTail_mdc.addChild(new MDisplayObject(STORAGE.fishTail_mp));
		lTail_mdo.setY(-lTail_mdo.getHeight() / 2);
		this._fTailShadow_mdo = lTail_mdc.addChild(new MDisplayObject(STORAGE.fishTailShadow_mp));
		this._fTailShadow_mdo.setY(-lTail_mdo.getHeight() / 2);
		lTail_mdc.setX(-this._fTailShadow_mdo.getWidth() * 1.5 + 1);
		this._fTailContainer_mdc = lTail_mdc;
		//...TAIL

		this.reset(Math.random());


		//VFX LEVEL...
		this._fHeadShadow_mdo.setVFXLevel(0.5);
		this._fBodyShadow_mdo.setVFXLevel(0.5);
		this._fTailShadow_mdo.setVFXLevel(0.5);
		//...VFX LEVEL
	}

	reset(aOptProgress_num)
	{
		this._fProgress_num = aOptProgress_num;
		this.update(0);
	}

	update(aFramesCount_num)
	{
		this._fProgress_num += MFishView.PROGRESS_SPEED * aFramesCount_num;

		if(this._fProgress_num > 1)
		{
			this._fProgress_num = this._fProgress_num % 1;
		}

		let lProgress_num = this._fProgress_num * 4;

		if(lProgress_num <= 1)
		{

		}
		else if(lProgress_num <= 2)
		{
			lProgress_num = 1 - (lProgress_num - 1);
		}
		else if(lProgress_num <= 3)
		{
			lProgress_num = -(lProgress_num - 2);
		}
		else if(lProgress_num <= 4)
		{
			lProgress_num = -(1 -(lProgress_num - 3));
		}

		//MOTION...
		this._fHeadContainer_mdc.setY(-lProgress_num * MFishView.MOTION_Y_DELTA);
		this._fBodyContainer_mdc.setY(lProgress_num * MFishView.MOTION_Y_DELTA);
		this._fTailContainer_mdc.setY(-lProgress_num * MFishView.MOTION_Y_DELTA);
		this.setScaleX(1 - Math.abs(lProgress_num) * MFishView.MOTION_SCALE_DELTA);
		//...MOTION

		//SHADOWS...
		if(lProgress_num > 0)
		{
			let lAlpha_num = Math.abs(lProgress_num) * 0.38;
			this._fHeadShadow_mdo.setAlpha(lAlpha_num);
			this._fTailShadow_mdo.setAlpha(lAlpha_num);
			this._fBodyShadow_mdo.setAlpha(0);
		}
		else
		{
			let lAlpha_num = Math.abs(lProgress_num) * 0.38;
			this._fHeadShadow_mdo.setAlpha(0);
			this._fTailShadow_mdo.setAlpha(0);
			this._fBodyShadow_mdo.setAlpha(lAlpha_num);
		}
		//...SHADOWS
	}
}