class MLoadingScreenView extends MInteractiveView
{
	constructor()
	{
		super(0, 0, 1920, 1080);

		this._fSplashScreenContainer_mdc = null;
		this._fProgressLine_mdc = null;
		this._fCaptionLoading_mdo = null;
		this._fCaptionClickToContinue_mdo = null;
		this._fLoadingScreenDisplayObjects_mdo_arr = [];
		this._fTimeLine_mt = null;

		this._fBackgroundImage_mdo = null;
	}

	init()
	{
		super.init();
		this.addToDisplay();
		
		//BACKGROUND...
		let l_mdo = this.addChild(new MDisplayObject(STORAGE.loadingScreenBackground_mp));
		l_mdo.forceAliasing();
		l_mdo.setRegXY(-this.getWidth() / 2, -this.getHeight() / 2);
		l_mdo.setXY(this.getWidth() / 2, this.getHeight() / 2);

		this._fBackgroundImage_mdo = l_mdo;
		//...BACKGROUND
	
		//SPLASH SCREEN...
		let l_mdc = new MDisplayContainer(0, 0, 1262, 480);
		//RESPONSIVE DESIGN...
		l_mdc.setTargetArea(0, 0.3, 1, 0.43);
		//...RESPONSIVE DESIGN
		this._fLoadingScreenDisplayObjects_mdo_arr.push(l_mdc);

		//WILD...
		l_mdo = new MDisplayObject(STORAGE.loadingScreenWild_mp)
		l_mdo.setXY(107, 31);
		l_mdc.addChild(l_mdo);
		//...WILD

		//TEXT LEFT...
		l_mdo = new MDisplayObject(STORAGE.loadingScreenTeaser1_mp)
		l_mdo.setXY(10, 323);
		l_mdc.addChild(l_mdo);
		//...TEXT LEFT

		//SCATTER...
		l_mdo = new MDisplayObject(STORAGE.loadingScreenScatter_mp)
		l_mdo.setXY(777, 0);
		l_mdc.addChild(l_mdo);
		//...SCATTER

		//TEXT RIGHT...
		l_mdo = new MDisplayObject(STORAGE.loadingScreenTeaser2_mp)
		l_mdo.setXY(693, 323);
		l_mdc.addChild(l_mdo);
		//...TEXT RIGHT

		l_mdc.addToDisplay();
		//...SPLASH SCREEN


		//LOGO...
		l_mdc = new MDisplayContainer(0, 0, 1274, 350);
		//RESPONSIVE DESIGN...
		l_mdc.setTargetArea(0, 0, 1, 0.25);
		//...RESPONSIVE DESIGN
		l_mdc.setStickMode(MDisplayContainer.STICK_MODE_ID_TOP);
		l_mdc.addChild(new MDisplayObject(STORAGE.logo_mp));
		l_mdc.addToDisplay();
		this._fLoadingScreenDisplayObjects_mdo_arr.push(l_mdc);
		//...LOGO

		//PROGRESS BAR...
		let lProgressPanel_mdc = new MDisplayContainer(0, 0, 750, 225);
		//RESPONSIVE DESIGN...
		lProgressPanel_mdc.setTargetArea(0, 0.77, 1, 0.23);
		//...RESPONSIVE DESIGN
		this._fLoadingScreenDisplayObjects_mdo_arr.push(lProgressPanel_mdc);

		//BLACK LINE UNDER PROGRESS LINE...
		l_mdo = lProgressPanel_mdc.addChild(new MDisplayObject(STORAGE.loadingScreenProgressBarHolder_mp));
		l_mdo.setXY(10, 145);
		//...BLACK LINE UNDER PROGRESS LINE

		//PROGRESS LINE...
		l_mdc = lProgressPanel_mdc.addChild(new MDisplayContainer(10, 145, 750, 35));
		l_mdc.setClippingMode(true);
		l_mdc.addChild(new MDisplayObject(STORAGE.loadingScreenProgressBar_mp));
		l_mdc.setWidth(0);
		this._fProgressLine_mdc = l_mdc;
		//...PROGRESS LINE

		//LOADING...
		l_mdo = lProgressPanel_mdc.addChild(new MDisplayObject(STORAGE.loadingScreenLoading_mp));
		l_mdo.setRegPointToCenter();
		l_mdo.setXY(375, 70);
		this._fCaptionLoading_mdo = l_mdo;
		//...LOADING

		//CLICK TO CONTINUE...
		l_mdo = lProgressPanel_mdc.addChild(new MDisplayObject(STORAGE.loadingScreenClickToContinue_mp));
		l_mdo.setRegPointToCenter();
		l_mdo.setXY(375, 70);
		l_mdo.setScale(0);
		this._fCaptionClickToContinue_mdo = l_mdo;
		//...CLICK TO CONTINUE

		lProgressPanel_mdc.addToDisplay();
		//...PROGRESS BAR

		//ANIMATION...
		let l_mt = new MTimeLine();

		l_mt.callFunctionOnStart(
			this.setVisible,
			this,
			true);

		//PROGRESS LINE...
		l_mt.addAnimation(
			this._fProgressLine_mdc,
			MTimeLine.SET_WIDTH,
			0,
				[
					30,
					[730, 250],
				]
			);
		//...PROGRESS LINE

		//CAPTIONS...
		//LOADING...
		l_mt.addAnimation(
			this._fCaptionLoading_mdo,
			MTimeLine.SET_SCALE,
			1,
				[
					30 + 250,
					[0, 10],
				]
			);
		//...LOADING

		//CLICK TO CONTINUE...
		l_mt.addAnimation(
			this._fCaptionClickToContinue_mdo,
			MTimeLine.SET_SCALE,
			0,
				[
					30 + 260,
					[1, 10],
				]
			);
		//...CLICK TO CONTINUE
		//...CAPTIONS

		this._fTimeLine_mt = l_mt;
		//...ANIMATION

		//this.startPresentation();

		this.setVisible(false);
	}


	//EXTERNAL CONTROL METHODS...
	setVisible(aIsVisible_bl)
	{
		super.setVisible(aIsVisible_bl);

		for( let i = 0; i < this._fLoadingScreenDisplayObjects_mdo_arr.length; i++ )
		{
			this._fLoadingScreenDisplayObjects_mdo_arr[i].setVisible(aIsVisible_bl);
		}
	}

	startPresentation()
	{
		this._fTimeLine_mt.play();
	}
	//...EXTERNAL CONTROL METHODS



	//RESPONSIVE DESIGN...
	updateTargetArea(aSidesRatio_num)
	{
		this.setFillMode(MDisplayContainer.FILL_MODE_ID_FULL);
		this.setTargetArea(0, 0, 1, 1);	

		if(aSidesRatio_num >= 1)
		{
			this._fBackgroundImage_mdo.setRotationInDegrees(0);
			this._fBackgroundImage_mdo.setScaleX( 1);
			this._fBackgroundImage_mdo.setScaleY( 1);
		}
		else
		{
			this._fBackgroundImage_mdo.setRotationInDegrees(90);
			this._fBackgroundImage_mdo.setScaleX( 1.777);
			this._fBackgroundImage_mdo.setScaleY( 0.5625);
		}
	}
	//...RESPONSIVE DESIGN
}