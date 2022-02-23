const TEST_STAND_BUTTON_HEIGHT = 100;
const TEST_STAND_BUTTON_OFFSET_Y = 105;


class MTestStandView extends MView
{
	constructor()
	{
		super();

		this._fOverlay_mdc = null;

		this._fFPSIndicator_mtbv = null;
		this._fRAMIndicator_mtbv = null;

		this._fLeftPanelContainer_mdc = null;
		this._fSelectorsContainer_mdc = null;
		this._fRightPanelContainer_mdc = null;
		this._fFeaturesListViw_mflv = null;

		this._fIntroAnimation_mt = null;
		this._fOutroAnimation_mt = null;

		this._fFadeInAnimation_mt = null;
		this._fFadeOutAnimation_mt = null;


		this._fButtonClose_mtbv = null;
		this._fButtonTools_mtbv = null;
		this._fButtonControls_mtbv = null;

		this._fDemoPresentations_mdp_arr = [];
		this._fIsMinimized_bl = false;

		this._fIsRamMeasureSupported_bl = !!(
											window.performance &&
											window.performance.memory);
		
	}

	addDemoPresentation(aDemoPresentation_mdp)
	{
		this._fDemoPresentations_mdp_arr.push(aDemoPresentation_mdp);
	}

	isAnyFeaturePlaying()
	{
		for( let i = 0; i < this._fDemoPresentations_mdp_arr.length; i++ )
		{
			if(this._fDemoPresentations_mdp_arr[i].isPlaying())
			{
				return true;
			}
		}

		return false;
	}

	init()
	{
		//FEATURES...
		for( let i = 0; i < this._fDemoPresentations_mdp_arr.length; i++ )
		{
			this._fDemoPresentations_mdp_arr[i].callFunctionOnFinish(
				this.tryToShowPresentationsList,
				this);
		}
		//...FEATURES


		//OVERLAY...
		let l_mdc = new MDisplayContainer(0, 0, 1920, 1080);
		l_mdc.setBackgroundColor("#000000");
		l_mdc.setTargetArea(0, 0, 1, 1);
		l_mdc.setFillMode(MDisplayContainer.FILL_MODE_ID_FULL);
		l_mdc.addToDisplay();
		l_mdc.setAlpha(0.38);

		this._fOverlay_mdc = l_mdc;
		//...OVERLAY


		//FPS INDICATOR...
		let l_mtbv = new MTestStandButtonView("FPS", 300, 100, 0.38);
		l_mtbv.setTargetArea(0, 0, 0.25, 0.1);
		l_mtbv.setStickMode(MDisplayContainer.STICK_MODE_ID_TOP_LEFT);
		l_mtbv.addToDisplay();
		this._fFPSIndicator_mtbv = l_mtbv;
		//...FPS INDICATOR

		//LEFT PANEL...
		l_mdc = new MDisplayContainer(0, 0, 500, 1000);
		//l_mdc.setBackgroundColor("#FF0000");
		l_mdc.setTargetArea(0, 0, 0.5, 1);
		l_mdc.setStickMode(MDisplayContainer.STICK_MODE_ID_LEFT);
		l_mdc.addToDisplay();
		this._fLeftPanelContainer_mdc = l_mdc;


		//SELECTORS...
		//CONTAINER...
		this._fSelectorsContainer_mdc = this._fLeftPanelContainer_mdc.addChild(new MDisplayContainer());
		//...CONTAINER
		
		//SPEED SELECTOR...
		let l_mbsv = new MBarSelectorView(0, 105, 500, 100);
		l_mbsv.setCaption("SPEED");
		l_mbsv.onChange = MAIN.setSpeedMultiplier.bind(MAIN);
		this._fSelectorsContainer_mdc.addChild(l_mbsv);
		//...SPEED SELECTOR


		//SPEED SELECTOR...
		l_mbsv = new MBarSelectorView(0, 210, 500-118, 100);
		l_mbsv.setCaption("VFX");
		l_mbsv.setPrecisionPercent(25);
		l_mbsv.onChange = MAIN.setVFXLevel.bind(MAIN);
		this._fSelectorsContainer_mdc.addChild(l_mbsv);
		//...SPEED SELECTOR
		//...SELECTORS

		//RAM INDICATOR...
		if(this._fIsRamMeasureSupported_bl)
		{
			l_mtbv = new MTestStandButtonView("RAM", 424, 62, 0.38);
			l_mtbv.setXY(62, 315 + 130);
			l_mtbv.setRotationInDegrees(90);
			l_mtbv.setLocked(true);
			this._fSelectorsContainer_mdc.addChild(l_mtbv);
			this._fRAMIndicator_mtbv = l_mtbv;
		}
		//...RAM INDICATOR

		//...LEFT PANEL

		//RIGHT PANEL...
		l_mdc = new MDisplayContainer(0, 0, 500, 1000);
		l_mdc.setTargetArea(0.5, 0, 0.5, 1);
		l_mdc.setStickMode(MDisplayContainer.STICK_MODE_ID_RIGHT);
		l_mdc.addToDisplay();
		this._fRightPanelContainer_mdc = l_mdc;

		//FEATURES LIST...
		let l_mflv = new MFeaturesListView(this._fDemoPresentations_mdp_arr);
		this._fFeaturesListViw_mflv = l_mdc.addChild(l_mflv);
		//...FEATURES LIST
		//...RIGHT PANEL


		//BUTTON CLOSE...
		l_mtbv = new MTestStandButtonView("CLOSE", 250, 100);
		l_mtbv.setXY(
			this._fRightPanelContainer_mdc.getWidth() - l_mtbv.getWidth(),
			this._fRightPanelContainer_mdc.getHeight() - l_mtbv.getHeight());

		l_mtbv.callFunctionOnPress(
				this.minimize,
				this);


		this._fRightPanelContainer_mdc.addChild(l_mtbv);
		this._fButtonClose_mtbv = l_mtbv;
		//...BUTTON CLOSE

		//BUTTON TOOLS...
		l_mtbv = new MTestStandButtonView("DEMO", 250, 100);
		l_mtbv.setXY(
			this._fRightPanelContainer_mdc.getWidth() - l_mtbv.getWidth(),
			this._fRightPanelContainer_mdc.getHeight() - l_mtbv.getHeight());

		l_mtbv.callFunctionOnPress(
				this.maximize,
				this);


		this._fRightPanelContainer_mdc.addChild(l_mtbv);
		this._fButtonTools_mtbv = l_mtbv;
		//...BUTTON TOOLS


		//ANIMATIONS...
		//INTRO...
		let l_mt = new MTimeLine();

		l_mt.callFunctionOnStart(
			this._fSelectorsContainer_mdc.setVisible,
			this._fSelectorsContainer_mdc,
			true);

		l_mt.addAnimation(
			this._fOverlay_mdc,
			MTimeLine.SET_ALPHA,
			0,
				[
					[0.38, 5],
				]
			);

		l_mt.addAnimation(
			this._fSelectorsContainer_mdc,
			MTimeLine.SET_X,
			-500,
				[
					[0, 5],
				]
			);

		l_mt.addAnimation(
			this._fButtonClose_mtbv,
			MTimeLine.SET_X,
			this._fButtonClose_mtbv.getX() + this._fButtonClose_mtbv.getWidth(),
				[
					[this._fButtonClose_mtbv.getX(), 5],
				]
			);

		l_mt.addAnimation(
			this._fButtonTools_mtbv,
			MTimeLine.SET_X,
			this._fButtonTools_mtbv.getX(),
				[
					[this._fButtonTools_mtbv.getX() + this._fButtonTools_mtbv.getWidth(), 5],
				]
			);

		l_mt.setIgnoreSpeedMultiplier(true);

		this._fIntroAnimation_mt = l_mt;
		//...INTRO

		//OUTRO...
		l_mt = new MTimeLine();

		l_mt.addAnimation(
			this._fOverlay_mdc,
			MTimeLine.SET_ALPHA,
			0.38,
				[
					[0, 5],
				]
			);

		l_mt.addAnimation(
			this._fSelectorsContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[-500, 5],
				]
			);

		l_mt.addAnimation(
			this._fButtonClose_mtbv,
			MTimeLine.SET_X,
			this._fButtonClose_mtbv.getX(),
				[
					[this._fButtonClose_mtbv.getX() + this._fButtonClose_mtbv.getWidth(), 5],
				]
			);

		l_mt.addAnimation(
			this._fButtonTools_mtbv,
			MTimeLine.SET_X,
			this._fButtonTools_mtbv.getX() + this._fButtonTools_mtbv.getWidth(),
				[
					5,
					[this._fButtonTools_mtbv.getX(), 5],
				]
			);

		l_mt.callFunctionOnFinish(
			this._fSelectorsContainer_mdc.setVisible,
			this._fSelectorsContainer_mdc,
			false);

		l_mt.setIgnoreSpeedMultiplier(true);

		this._fOutroAnimation_mt = l_mt;
		//...OUTRO

		//FADE IN...
		l_mt = new MTimeLine();

		l_mt.addAnimation(
			this,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 5],
				]
			);
		
		l_mt.setIgnoreSpeedMultiplier(true);

		this._fFadeInAnimation_mt = l_mt;
		//...FADE IN

		//FADE OUT...

		//...FADE OUT
		l_mt = new MTimeLine();

		l_mt.addAnimation(
			this,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 5],
				]
			);

		l_mt.setIgnoreSpeedMultiplier(true);

		this._fFadeOutAnimation_mt = l_mt;
		//...ANIMATIONS

		this.minimize(true);
	}

	tryToShowPresentationsList()
	{
		if(this._fIsMinimized_bl)
		{
			return;
		}

		if(this.isAnyFeaturePlaying())
		{
			return;
		}

		this._fFeaturesListViw_mflv.show();
	}

	minimize(aOptImmediately_bl)
	{
		if(!this._fIsMinimized_bl)
		{
			this._fFeaturesListViw_mflv.hide(aOptImmediately_bl);
			this._fOutroAnimation_mt.play();
			this._fIsMinimized_bl = true;

			if(aOptImmediately_bl)
			{
				this._fOutroAnimation_mt.windToEnd();
			}

			if(this.isAnyFeaturePlaying())
			{
				this._fFeaturesListViw_mflv.hideFeatureProgress();
			}
		}
	}

	maximize()
	{
		if(this._fIsMinimized_bl)
		{
			this._fIsMinimized_bl = false;
			this._fIntroAnimation_mt.play();
			this.tryToShowPresentationsList();

			if(this.isAnyFeaturePlaying())
			{
				this._fFeaturesListViw_mflv.showFeatureProgress();
			}
		}
	}

	fadeIn()
	{
		this._fFadeInAnimation_mt.play();
	}

	fadeOut()
	{
		this._fFadeOutAnimation_mt.play();
	}

	isMinimized()
	{
		return this._fIsMinimized_bl;
	}


	updateFPS(aFPS_int)
	{
		this._fFPSIndicator_mtbv.displayText("FPS " + aFPS_int);

		if(this._fIsRamMeasureSupported_bl)
		{
			const SIZES = ["b", "kb", "mb", "gb", "tb", "pb"];

			let lBytesCount_int = window.performance.memory.usedJSHeapSize;
			let i = Math.floor(Math.log(lBytesCount_int) / Math.log(1024));
			let lResult_str = parseFloat((lBytesCount_int / Math.pow(1024, i)).toFixed(2)) + " " + SIZES[i];

			this._fRAMIndicator_mtbv.displayText(lResult_str);
		}
	}


	setVisible(aIsVisible_bl)
	{
		super.setVisible(aIsVisible_bl);

		this._fFPSIndicator_mtbv.setVisible(false);
		this._fLeftPanelContainer_mdc.setVisible(false);
		this._fRightPanelContainer_mdc.setVisible(false);
	}

	setAlpha(aAlpha_num)
	{
		this._fLeftPanelContainer_mdc.setAlpha(aAlpha_num);
		this._fRightPanelContainer_mdc.setAlpha(aAlpha_num);
		this._fButtonTools_mtbv.setAlpha(aAlpha_num);
		this._fFPSIndicator_mtbv.setAlpha(aAlpha_num);
	}
}