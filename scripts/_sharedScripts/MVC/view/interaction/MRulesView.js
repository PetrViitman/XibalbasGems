class MRulesView extends MView
{
	constructor(aSourcePath_str)
	{
		super(0, 0, 1920, 1080);

		this._fOverlay_mdc = null;
		this._fContentContainer_mdc = null;
		this._fTextContainer_mdc = null;
		this._fScrollBarView_msbv = null;
		this._fButtonCloseContainer_mdc = null;
		this._fButtonClose_mtbv = null;
		this._fRequest_xhr = null;
		this._fSourcePath_str = aSourcePath_str;
		this._fIntroAnimation_mt = null;
		this._fOutroAnimation_mt = null;
	}


	init()
	{
		this.addToDisplay();

		//OVERLAY...
		let l_mdc = new MDisplayContainer(
			0,
			0,
			this.getWidth(),
			this.getHeight());

		l_mdc.setTargetArea(0, 0, 1, 1);
		l_mdc.setFillMode(MDisplayContainer.FILL_MODE_ID_FULL);
		l_mdc.setBackgroundColor("black");
		l_mdc.setAlpha(0.62);
		l_mdc.addToDisplay();
		this._fOverlay_mdc = l_mdc;
		//...OVERLAY

		//TEXT CONTAINER...
		l_mdc = new MDisplayContainer(0, 0, 1920, 1080);
		l_mdc.setScrollable();
		l_mdc.addToDisplay();
		this._fTextContainer_mdc = l_mdc;
		//...TEXT CONTAINER

		//SCROLL BAR...
		let l_msbv = new MScrollBarView(this._fTextContainer_mdc);
		l_msbv.addToDisplay();
		this._fScrollBarView_msbv = l_msbv;
		//...SCROLL BAR


		//GET REQUEST...
		this._fRequest_xhr = new XMLHttpRequest();
		this._fRequest_xhr.onreadystatechange = this.onRequestResponded.bind(this);
		this._fRequest_xhr.open("GET", this._fSourcePath_str, true);
		this._fRequest_xhr.send(null);
		//...GET REQUEST

		//ANIMATIONS...
		//INTRO...
		let l_mt = new MTimeLine();
		l_mt.callFunctionOnStart(
			MAIN.getTestStandView().fadeOut,
			MAIN.getTestStandView()
			);

		l_mt.callFunctionAtFrame(
			this._fScrollBarView_msbv.onScroll,
			1,
			this._fScrollBarView_msbv
			);

		l_mt.addAnimation(
			this,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 5],
				]
			);

		l_mt.setIgnoreSpeedMultiplier(true);

		this._fIntroAnimation_mt = l_mt;
		//...INTRO

		//OUTRO...
		l_mt = new MTimeLine();

		l_mt.addAnimation(
			this,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 5],
				]
			);

		l_mt.callFunctionOnFinish(
			this.setVisible,
			this,
			false
			);

		l_mt.setIgnoreSpeedMultiplier(true);

		this._fOutroAnimation_mt = l_mt;
		//...OUTRO
		//...ANIMATIONS


		//BUTTON CLOSE...

		//CONTAINER...
		l_mdc = new MDisplayContainer();
		l_mdc.addToDisplay();
		this._fButtonCloseContainer_mdc = l_mdc;
		//...CONTAINER

		//BUTTON...
		let l_mtbv = new MTestStandButtonView("X", 50, 50);
		l_mtbv.callFunctionOnPress(
			this._fOutroAnimation_mt.play,
			this._fOutroAnimation_mt
			);

		l_mtbv.callFunctionOnPress(
			MAIN.getTestStandView().fadeIn,
			MAIN.getTestStandView()
			);
		this._fButtonCloseContainer_mdc.addChild(l_mtbv);
		this._fButtonClose_mtbv = l_mtbv;
		//...BUTTON
		//...BUTTON CLOSE

		this.setVisible(false);

	}

	onRequestResponded()
	{
		if(
			this._fRequest_xhr.readyState == 4 &&
			this._fRequest_xhr.status == 200
			)
		{
			this._fTextContainer_mdc.getHTMLElement().innerHTML = this._fRequest_xhr.responseText;
			this._fScrollBarView_msbv.onScroll();
		}
	}


	setVisible(aIsVisible_bl)
	{
		this._fOverlay_mdc.setAlpha(aIsVisible_bl ? 0.62 : 0);
		this._fTextContainer_mdc.setVisible(aIsVisible_bl);
		this._fScrollBarView_msbv.setVisible(aIsVisible_bl);
		this._fButtonCloseContainer_mdc.setVisible(aIsVisible_bl);
		super.setVisible(aIsVisible_bl);
	}

	setAlpha(aAlpha_num)
	{
		this._fOverlay_mdc.setAlpha(aAlpha_num * 0.62);
		this._fTextContainer_mdc.setAlpha(aAlpha_num);
		this._fScrollBarView_msbv.setAlpha(aAlpha_num);
		this._fButtonCloseContainer_mdc.setAlpha(aAlpha_num);

		super.setAlpha(aAlpha_num);
	}


	updateTargetArea(aSidesRatio_num)
	{
		if(this._fTextContainer_mdc)
		{
			this._fTextContainer_mdc.setWidth(DISPLAY.clientWidth);
			this._fTextContainer_mdc.setHeight(DISPLAY.clientHeight);
			this._fScrollBarView_msbv.onScroll();

			this._fButtonClose_mtbv.setXY(
				DISPLAY.clientWidth - this._fButtonClose_mtbv.getWidth(),
				0);
		}
	}

	//EXTERNAL CONTROL METHODS...
	playIntroAnimation()
	{
		this._fIntroAnimation_mt.play();
	}

	playOutroAnimation()
	{
		this._fOutroAnimation_mt.play();
	}
	//...EXTERNAL CONTROL METHODS
}