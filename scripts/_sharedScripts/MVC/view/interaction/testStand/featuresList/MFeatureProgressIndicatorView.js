 class MFeatureProgressIndicatorView extends MDisplayContainer
 {
 	constructor(aX_num = 0, aY_num = 0, aOptWidth_num = 0, aOptHeight_num = 0)
	{
		super(aX_num, aY_num, aOptWidth_num, aOptHeight_num);

	
		this.___fBackgroundContainer_mdc = null;
		this.___fProgressContainer_mdc = null;
		this.___fTextContainer_mdc = null;

		this.___fFeature_mt = null;
		this._fIntroAnimation_mt = null;
		this._fOutroAnimation_mt = null;

		//BACKGROUND CONTAINER...
		let l_mdc = new MDisplayContainer(
			0,
			0,
			this.getWidth(),
			this.getHeight());

		l_mdc.setBackgroundColor("black");
		this.___fBackgroundContainer_mdc = this.addChild(l_mdc);
		//...BACKGROUND CONTAINER

		//PROGRESS CONTAINER...
		l_mdc = new MDisplayContainer(
			0,
			0,
			this.getWidth(),
			this.getHeight());

		l_mdc.setBackgroundColor("red");
		this.___fProgressContainer_mdc = this.addChild(l_mdc);
		//...PROGRESS CONTAINER

		//TEXT CONTAINER...
		l_mdc = new MDisplayContainer(
			0,
			0,
			this.getWidth(),
			this.getHeight());

		this.___fTextContainer_mdc = this.addChild(l_mdc);
		//...TEXT CONTAINER

		//SHADOW...
		l_mdc = new MDisplayContainer(
			0,
			0,
			Math.trunc(this.getWidth() * 0.62),
			this.getHeight());

		l_mdc.setBackgroundColor("black");
		l_mdc.setAlpha(0.38);

		this.addChild(l_mdc);
		//...SHADOW

		//ANIMATIONS...
		//INTRO...
		let l_mt = new MTimeLine();
		l_mt.setIgnoreSpeedMultiplier(true);

		l_mt.callFunctionOnStart(
			this.setVisible,
			this,
			true
			);

		l_mt.addAnimation(
			this,
			MTimeLine.SET_X,
			this.getX(),
				[
					[this.getX() - this.getHeight(), 5],
				]
			);


		this._fIntroAnimation_mt = l_mt;
		//...INTRO

		//OUTRO...
		l_mt = new MTimeLine();
		l_mt.setIgnoreSpeedMultiplier(true);
		l_mt.addAnimation(
			this,
			MTimeLine.SET_X,
			this.getX() - this.getHeight(),
				[
					[this.getX(), 5],
				]
			);

		l_mt.callFunctionOnFinish(
			this.setVisible,
			this,
			false
			);

		this._fOutroAnimation_mt = l_mt;
		//...OUTRO
		//...ANIMATIONS

		this.setVisible(false);
	}

	setFeature(aDemoPresentation_mdp)
	{
		this.___fFeature_mt = aDemoPresentation_mdp;
		this.___fTextContainer_mdc.displayText(aDemoPresentation_mdp.getTestStandName());
	}


	onNextFrames(aFramesCount_num)
	{
		if(!this.___fFeature_mt)
		{
			return;
		}

		let lProgress_num = this.___fFeature_mt.getProgress();

		if(!this.___fFeature_mt.isPlaying())
		{
			lProgress_num = 1;
			this.___fFeature_mt = null;
		}

		this.___fProgressContainer_mdc.setScaleX(lProgress_num);
	}

	show()
	{
		this._fIntroAnimation_mt.play();
	}

	hide()
	{
		this._fOutroAnimation_mt.play();
	}
 }