class MFeaturesListView extends MView
{
	static get BUTTON_HEIGHT() { return 100 }
	static get BUTTON_OFFSET_Y() { return 105 }

	constructor(aFeatures_mt_arr)
	{
		super(0, 0, 500, 1000);

		this._fContentContainer_mdc = null;
		this._fButtonsContainer_mdc = null;
		this._fScrollBar_msbv = null;
		this._fButtons_mtbv_arr = [];

		this._fIntroAnimation_mt = null;
		this._fOutroAnimation_mt = null;

		this._fIsMinimized_bl = false;
		this._fIsRequired_bl = true;
		this._fIsFeatureProgressRequired_bl = true;
		this._fCurrentFeatureProgressIndicatorView_mfpiv = null;


		//CURRENT FEATURE PROGRESS INDICATOR VIEW...
		let l_mfpiv = new MFeatureProgressIndicatorView(500, 625, 500, 100);
		l_mfpiv.setRotationInDegrees(-90);
		this.addChild(l_mfpiv);
		this._fCurrentFeatureProgressIndicatorView_mfpiv = l_mfpiv;
		//...CURRENT FEATURE PROGRESS INDICATOR VIEW


		//CONTENT CONTAINER...
		this._fContentContainer_mdc = this.addChild(new MDisplayContainer());
		//...CONTENT CONTAINER

		//BUTTONS CONTAINER...
		let l_mdc = new MDisplayContainer(
			0,
			0,
			this.getWidth(),
			MFeaturesListView.BUTTON_OFFSET_Y * 8 - 2);

		//l_mdc.setBackgroundColor("violet");
		l_mdc.setScrollable();

		this._fContentContainer_mdc.addChild(l_mdc);
		this._fButtonsContainer_mdc = l_mdc;

		//BUTTONS...
		for( let i = 0; i < aFeatures_mt_arr.length; i++ )
		{
			let l_mt = aFeatures_mt_arr[i];
			let lName_str = l_mt.getTestStandName();

			let l_mtbv = new MTestStandButtonView(
				lName_str,
				lName_str.length * 50,
				MFeaturesListView.BUTTON_HEIGHT);

			l_mtbv.callFunctionOnPress(
				l_mt.play,
				l_mt);

			l_mtbv.callFunctionOnPress(
				MAIN.getTestStandView().minimize,
				MAIN.getTestStandView());

			l_mtbv.callFunctionOnPress(
				this._fCurrentFeatureProgressIndicatorView_mfpiv.setFeature,
				this._fCurrentFeatureProgressIndicatorView_mfpiv,
				l_mt);

			l_mtbv.setXY(
				this._fButtonsContainer_mdc.getWidth() - l_mtbv.getWidth(),
				MFeaturesListView.BUTTON_OFFSET_Y * i
				);

			this._fButtonsContainer_mdc.addChild(l_mtbv);
			this._fButtons_mtbv_arr.push(l_mtbv);
		}
		//...BUTTONS

		//SCROLL BAR...
		let l_msbv = new MScrollBarView(this._fButtonsContainer_mdc);
		l_msbv.setX(this.getWidth() - l_msbv.getWidth());
		this._fScrollBar_msbv = this._fContentContainer_mdc.addChild(l_msbv);
		//...SCROLL BAR
		//...BUTTONS CONTAINER



		//ANIMATIONS...
		//INTRO...
		let l_mt = new MTimeLine();
		l_mt.setIgnoreSpeedMultiplier(true);
		l_mt.callFunctionOnStart(
			this._fContentContainer_mdc.setVisible,
			this._fContentContainer_mdc,
			true);

		l_mt.callFunctionOnStart(
			this._fScrollBar_msbv.setVisible,
			this._fScrollBar_msbv,
			true);

		l_mt.callFunctionAtFrame(
			this._fScrollBar_msbv.onScroll,
			1,
			this._fScrollBar_msbv,
			true);

		for(let i = 0; i < this._fButtons_mtbv_arr.length; i++)
		{
			let l_mtbv = this._fButtons_mtbv_arr[i];

			l_mt.addAnimation(
				l_mtbv,
				MTimeLine.SET_X,
				l_mtbv.getX() + l_mtbv.getWidth(),
					[
						i * 1,
						[l_mtbv.getX(), 5],
					]
				);
		}

		l_mt.callFunctionOnFinish(
			this.setMinimized,
			this,
			false);

		this._fIntroAnimation_mt = l_mt;
		//...INTRO

		//OUTRO...
		l_mt = new MTimeLine();
		l_mt.setIgnoreSpeedMultiplier(true);
		l_mt.callFunctionOnStart(
			this._fScrollBar_msbv.setVisible,
			this._fScrollBar_msbv,
			false
			);

		for(let i = 0; i < this._fButtons_mtbv_arr.length; i++)
		{
			let l_mtbv = this._fButtons_mtbv_arr[i];

			l_mt.addAnimation(
				l_mtbv,
				MTimeLine.SET_X,
				l_mtbv.getX(),
					[
						i * 1,
						[l_mtbv.getX() + l_mtbv.getWidth(), 5],
					]
				);
		}

		l_mt.callFunctionOnFinish(
			this._fContentContainer_mdc.setVisible,
			this._fContentContainer_mdc,
			false);

		l_mt.callFunctionOnFinish(
			this.setMinimized,
			this,
			true);

		this._fOutroAnimation_mt = l_mt;
		//...OUTRO
		//...ANIMATIONS
	}

	hide(aOptImmediately_bl)
	{

		this._fIsRequired_bl = false;
		
		if(aOptImmediately_bl)
		{
			this._fOutroAnimation_mt.play();
			this._fOutroAnimation_mt.windToEnd();
			this._fContentContainer_mdc.setVisible(false);
			this.setMinimized(true);
		}

		this.setButtonsLocked(true);
	}

	show()
	{
		this._fIsRequired_bl = true;
		this._fIsFeatureProgressRequired_bl = false;
	}

	showFeatureProgress()
	{
		this._fCurrentFeatureProgressIndicatorView_mfpiv.show();
	}

	hideFeatureProgress()
	{
		this._fCurrentFeatureProgressIndicatorView_mfpiv.hide();
	}

	setMinimized(aIsMinimized_bl)
	{
		this._fIsMinimized_bl = aIsMinimized_bl;
	}

	onNextFrames()
	{
		let lIsAnyFeaturePlaying_bl = MAIN.getTestStandView().isAnyFeaturePlaying();

		if(
			this._fIntroAnimation_mt.isPlaying() ||
			this._fOutroAnimation_mt.isPlaying()
			)
		{
			return;
		}

		if(
			this._fIsRequired_bl &&
			this._fIsMinimized_bl
			)
		{
			this._fIntroAnimation_mt.play();
			this.hideFeatureProgress();
			this.setButtonsLocked(false);
		}
		else if(
			!this._fIsRequired_bl &&
			!this._fIsMinimized_bl
			)
		{
			this._fOutroAnimation_mt.play();
		}
	}

	setButtonsLocked(aIsLocked_bl)
	{
		for( let i = 0; i < this._fButtons_mtbv_arr.length; i++ )
		{
			this._fButtons_mtbv_arr[i].setLocked(aIsLocked_bl);
		}
	}
}