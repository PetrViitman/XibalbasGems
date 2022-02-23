class MBaseCoinView extends MView
{
	constructor()
	{
		super(0, 0, 256, 256);

		this._fFrontSideContainer_mdc = null;
		this._fHeadsSide_mdo = null;
		this._fShadow_mdo = null;
		this._fBackSideContainer_mdc = null;
		this._fTailsSide_mdo = null;
		this._fRibSide_mdo = null;
		this._fScalableBackground_mdo = null;

		this._fIsShadowRequired_bl = !!this.getShadowPicture();

		this._fFlipProgress_num = 0;
		this._fAngle_num = 0;

		let lContainer_mdc = new MDisplayContainer();

		this._fContentContainer_mdc = this.addChild(lContainer_mdc);


		//SCALABLE BACKGROUND...
		let l_mdo = new MDisplayObject(this.getMiddlePicture());
		l_mdo.setRegPointToCenter();
		this._fScalableBackground_mdo = lContainer_mdc.addChild(l_mdo);
		//...SCALABLE BACKGROUND

		//RIB...
		l_mdo = new MDisplayObject(this.getRibPicture());
		l_mdo.setRegPointToCenter();
		this._fRibSide_mdo = lContainer_mdc.addChild(l_mdo);
		//...RIB

		//FRONT SIDE CONTAINER...
		let lFront_mdc = lContainer_mdc.addChild(new MDisplayContainer());;
		this._fFrontSideContainer_mdc = lFront_mdc;
		//...FRONT SIDE CONTAINER

		//BACK SIDE CONTAINER...
		let lBack_mdc = lContainer_mdc.addChild(new MDisplayContainer());;
		this._fBackSideContainer_mdc = lBack_mdc;
		//...BACK SIDE CONTAINER

		//HEADS PICTURE...
		l_mdo = new MDisplayObject(this.getHeadsPicture());
		l_mdo.setRegPointToCenter();
		this._fHeadsSide_mdo = lFront_mdc.addChild(l_mdo);
		//...HEADS PICTURE

		//TAILS PICTURE...
		l_mdo = new MDisplayObject(this.getTailsPicture());
		l_mdo.setRegPointToCenter();
		this._fTailsSide_mdo = lBack_mdc.addChild(l_mdo);
		//...TAILS PICTURE

		if(this._fIsShadowRequired_bl)
		{
			//SHADOW...
			l_mdo = new MDisplayObject(this.getShadowPicture());
			l_mdo.setRegPointToCenter();
			l_mdo.setVisible(false);
			this._fShadow_mdo = lContainer_mdc.addChild(l_mdo);
			this._fShadow_mdo.setVFXLevel(1);
			//...SHADOW
		}

		this.setFlip(0.25);
	}

	//PICTURES...
	getHeadsPicture()
	{
		return STORAGE.coinHeads_mp;
	}

	getTailsPicture()
	{
		return STORAGE.coinTails_mp;
	}

	getRibPicture()
	{
		return STORAGE.coinRib_mp;
	}

	getMiddlePicture()
	{
		return STORAGE.coinMiddle_mp;
	}

	getShadowPicture()
	{
		//return STORAGE.coinShadow_mp;
	}
	//...PICTURES

	getHeadsCointainer()
	{
		return this._fFrontSideContainer_mdc;
	}

	getTailsCointainer()
	{
		return this._fBackSideContainer_mdc;
	}

	setFlip(aFlipProgress_num)
	{
		this.adjustViewParts(aFlipProgress_num);
	}

	setContentRotation(aAngle_num)
	{
		this._fContentContainer_mdc.setRotation(aAngle_num);
	}

	

	adjustViewParts(aFlipProgress_num)
	{
		let lFlipProgress_num = aFlipProgress_num;

		if(lFlipProgress_num > 1)
		{
			lFlipProgress_num %= 1;
		}

		let lProgress_num = 0;

		let lFront_mdc = this._fFrontSideContainer_mdc;
		let lBack_mdc = this._fBackSideContainer_mdc;
		let lRib_mdo = this._fRibSide_mdo;
		let lMiddle_mdo = this._fScalableBackground_mdo;
		let lShadow_mdo = this._fShadow_mdo;
		let lIsShadowRequired_bl = this._fIsShadowRequired_bl;


		lFront_mdc.setVisible(false);
		lBack_mdc.setVisible(false);
		lShadow_mdo && lShadow_mdo.setVisible(false);

		let lMaximalOffset_num = this._fRibSide_mdo.getWidth() / 2;

		if(lFlipProgress_num < 0.25)
		{
			lProgress_num = lFlipProgress_num * 4;

			//HEADS...
			lFront_mdc.setVisible(true);
			lFront_mdc.setScaleX(lProgress_num);
			lFront_mdc.setX((1-lProgress_num) * lMaximalOffset_num);
			//...HEADS

			lMiddle_mdo.setX(-(1-lProgress_num) * lMaximalOffset_num);
			
			if(lIsShadowRequired_bl)
			{
				lShadow_mdo.setScaleX(lProgress_num);
				lShadow_mdo.setX(lFront_mdc.getX());
				lShadow_mdo.setAlpha(1 - lProgress_num);
			}
		}
		else if(lFlipProgress_num < 0.5)
		{
			//HEADS...
			lProgress_num = 1 - (lFlipProgress_num - 0.25)  * 4;

			lFront_mdc.setVisible(true);
			lFront_mdc.setScaleX(lProgress_num);
			lFront_mdc.setX(- (1-lProgress_num) * lMaximalOffset_num);
			//...HEADS

			lMiddle_mdo.setX((1-lProgress_num) * lMaximalOffset_num);
			
			if(lIsShadowRequired_bl)
			{
				lShadow_mdo.setScaleX(lProgress_num);
				lShadow_mdo.setX(lFront_mdc.getX());
				lShadow_mdo.setAlpha(1 - lProgress_num);
			}
		}
		else if(lFlipProgress_num < 0.75)
		{
			//TAILS...
			lProgress_num = (lFlipProgress_num - 0.5)  * 4;

			lBack_mdc.setVisible(true);
			lBack_mdc.setScaleX(lProgress_num);
			lBack_mdc.setX((1-lProgress_num) * lMaximalOffset_num);
			//...TAILS

			lMiddle_mdo.setX(-(1-lProgress_num) * lMaximalOffset_num);
		
			if(lIsShadowRequired_bl)
			{
				lShadow_mdo.setScaleX(lProgress_num);
				lShadow_mdo.setX(lBack_mdc.getX());
				lShadow_mdo.setAlpha(1 - lProgress_num);
			}
		}
		else
		{
			//TAILS...
			lProgress_num = 1 - (lFlipProgress_num - 0.75)  * 4;

			lBack_mdc.setVisible(true);
			lBack_mdc.setScaleX(lProgress_num);
			lBack_mdc.setX(-(1-lProgress_num) * lMaximalOffset_num);
			//...TAILS

			lMiddle_mdo.setX((1-lProgress_num) * lMaximalOffset_num);
			if(lIsShadowRequired_bl)
			{
				lShadow_mdo.setScaleX(lProgress_num);
				lShadow_mdo.setX(lBack_mdc.getX());
				lShadow_mdo.setAlpha(1 - lProgress_num);
			}
		}

		//MIDDLE...
		lMiddle_mdo.setScaleX(lProgress_num);
		//...MIDDLE
	}
}