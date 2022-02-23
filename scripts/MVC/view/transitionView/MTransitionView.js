class MTransitionView extends MView
{
	constructor()
	{
		super(0, 0, 1920, 1080);

		this._fContainerTop_mdc = null;
		this._fContainerMiddle_mdc = null;
		this._fContainerBottom_mdc = null;

		this._fIntroAnimation_mt = null;
		this._fOutroAnimation_mt = null;
		this.setVisible(false);
	}

	init()
	{
		let lBackgroundColor_str = "#ffffff";
		let lTempelColor_str = "#005aff";
		let lTempelShadowSideColor_str = "#001439";

		//CONTAINER BOTTOM...
		let lBottomContainerWidth_int = this.getWidth();
		let lBottomContainerHeight_int = this.getHeight() * 0.5;
		let l_mdc = new MDisplayContainer(
			0,
			this.getHeight() - lBottomContainerHeight_int,
			this.getWidth(),
			lBottomContainerHeight_int + 2);

		l_mdc.setBackgroundColor(lBackgroundColor_str);
		l_mdc.setClippingMode(true);
		this._fContainerBottom_mdc = this.addChild(l_mdc);

		//TEMPEL...
		let lTempelWidth_int = lBottomContainerWidth_int * 0.62;
		let lTempelHeight_int = lBottomContainerHeight_int + 2;
		l_mdc = new MDisplayContainer(
			0,
			-3,
			lTempelWidth_int,
			lTempelHeight_int + 5);

		l_mdc.setBackgroundColor(lTempelColor_str);
		this._fContainerBottom_mdc.addChild(l_mdc);

		//SHADOW SIDE...
		let lTempelShadowSideWidth_int = lBottomContainerWidth_int * 0.38;
		let lShadowSide_mdc = new MDisplayContainer(
			l_mdc.getX() + l_mdc.getWidth() - 1,
			-1,
			lTempelShadowSideWidth_int + 2,
			lTempelHeight_int + 2);

		lShadowSide_mdc.setBackgroundColor(lTempelShadowSideColor_str);
		this._fContainerBottom_mdc.addChild(lShadowSide_mdc);
		//...SHADOW SIDE

		//...TEMPEL
		//...CONTAINER BOTTOM

		//CONTAINER MIDDLE...
		let lMiddleContainerHeight_int = lBottomContainerHeight_int * 0.62;
		l_mdc = new MDisplayContainer(
			0,
			this.getHeight() - lBottomContainerHeight_int - lMiddleContainerHeight_int,
			this.getWidth(),
			lMiddleContainerHeight_int + 2);

		l_mdc.setBackgroundColor(lBackgroundColor_str);
		l_mdc.setClippingMode(true);

		this._fContainerMiddle_mdc = this.addChild(l_mdc);

		//TEMPEL...
		lTempelWidth_int = lTempelWidth_int * 0.62;
		lTempelHeight_int = lMiddleContainerHeight_int + 2;
		l_mdc = new MDisplayContainer(
			(lBottomContainerWidth_int * 0.62 - lTempelWidth_int) / 2,
			-3,
			lTempelWidth_int,
			lTempelHeight_int + 5);

		l_mdc.setBackgroundColor(lTempelColor_str);
		this._fContainerMiddle_mdc.addChild(l_mdc);

		//SHADOW SIDE...
		lShadowSide_mdc = new MDisplayContainer(
			l_mdc.getX() + l_mdc.getWidth() - 1,
			-1,
			lTempelShadowSideWidth_int + 2,
			lTempelHeight_int + 2);

		lShadowSide_mdc.setBackgroundColor(lTempelShadowSideColor_str);
		this._fContainerMiddle_mdc.addChild(lShadowSide_mdc);
		//...SHADOW SIDE
		//...TEMPEL
		//...CONTAINER MIDDLE


		//CONTAINER TOP...
		let lTopContainerHeight_int = lMiddleContainerHeight_int * 0.62;
		l_mdc = new MDisplayContainer(
			0,
			0,
			this.getWidth(),
			lTopContainerHeight_int + 2);

		l_mdc.setBackgroundColor(lBackgroundColor_str);
		l_mdc.setClippingMode(true);

		this._fContainerTop_mdc = this.addChild(l_mdc);

		//TEMPEL...
		lTempelWidth_int = lTempelWidth_int * 0.62;
		lTempelHeight_int = lTopContainerHeight_int + 2;
		l_mdc = new MDisplayContainer(
			(lBottomContainerWidth_int * 0.62 - lTempelWidth_int) / 2,
			-3,
			lTempelWidth_int,
			lTempelHeight_int + 5);

		l_mdc.setBackgroundColor(lTempelColor_str);
		this._fContainerTop_mdc.addChild(l_mdc);

		//SHADOW SIDE...
		lShadowSide_mdc = new MDisplayContainer(
			l_mdc.getX() + l_mdc.getWidth() - 1,
			-1,
			lTempelShadowSideWidth_int + 2,
			lTempelHeight_int + 2);

		lShadowSide_mdc.setBackgroundColor(lTempelShadowSideColor_str);
		this._fContainerTop_mdc.addChild(lShadowSide_mdc);
		//...SHADOW SIDE
		//...TEMPEL
		//...CONTAINER TOP

		//RESPONSIVE DESIGN...
		this.setFillMode(MDisplayContainer.FILL_MODE_ID_FULL);
		this.setTargetArea(0, 0, 1, 1);
		//...RESPONSIVE DESIGN
		
		this.addToDisplay();
		
		this._fContainerTop_mdc.setWidth(0);
		this._fContainerMiddle_mdc.setWidth(0);
		this._fContainerBottom_mdc.setWidth(0);

		//ANIMATIONS...
		//INTRO...
		let l_mt = new MTimeLine();
		l_mt.callFunctionOnStart(
			this.setVisible,
			this,
			true)

		l_mt.addAnimation(
			this._fContainerTop_mdc,
			MTimeLine.SET_WIDTH,
			0,
				[
					[this.getWidth(), 10],
				]
			);

		l_mt.addAnimation(
			this._fContainerMiddle_mdc,
			MTimeLine.SET_WIDTH,
			0,
				[
					10,
					[this.getWidth(), 10],
				]
			);

		l_mt.addAnimation(
			this._fContainerBottom_mdc,
			MTimeLine.SET_WIDTH,
			0,
				[
					20,
					[this.getWidth(), 10],
				]
			);

		this._fIntroAnimation_mt = l_mt;
		//...INTRO

		//OUTRO...
		l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fContainerTop_mdc,
			MTimeLine.SET_WIDTH,
			this.getWidth(),
				[
					20,
					[0, 10],
				]
			);

		l_mt.addAnimation(
			this._fContainerMiddle_mdc,
			MTimeLine.SET_WIDTH,
			this.getWidth(),
				[
					10,
					[0, 10],
				]
			);

		l_mt.addAnimation(
			this._fContainerBottom_mdc,
			MTimeLine.SET_WIDTH,
			this.getWidth(),
				[
					[0, 10],
				]
			);

		l_mt.callFunctionOnFinish(
			this.setVisible,
			this,
			false)

		this._fOutroAnimation_mt = l_mt;
		//...OUTRO
		//...ANIMATIONS
	}


	//EXTERNAL CONTROL METHODS...
	startIntroAnimation()
	{
		this._fIntroAnimation_mt.play();
	}

	startOutroAnimation()
	{
		this._fOutroAnimation_mt.play();
	}
	//...EXTERNAL CONTROL METHODS
}