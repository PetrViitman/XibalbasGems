class MButtonView extends MInteractiveView
{
	constructor(aX_num = 0, aY_num = 0, aOptWidth_num = 0, aOptHeight_num = 0)
	{
		super(aX_num, aY_num, aOptWidth_num, aOptHeight_num);
	
		this._fOutroAnimation_mt = this.generateOutroAnimation();
		this._fIntroAnimation_mt = this.generateIntroAnimation();

		this._fIntroAnimation_mt.callFunctionOnFinish(
						this._fOutroAnimation_mt.play,
						this._fOutroAnimation_mt);

		this._fIntroAnimation_mt.setIgnoreSpeedMultiplier(true);
		this._fOutroAnimation_mt.setIgnoreSpeedMultiplier(true);
	}

	callFunctionOnPress(aFunction_func, aOptContext_c, aOptArgument)
	{
		this._fOutroAnimation_mt.callFunctionOnStart(
										aFunction_func,
										aOptContext_c,
										aOptArgument);
	}

	generateIntroAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0.001, 5]
				]
			);

		return l_mt;
	}

	generateOutroAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this,
			MTimeLine.SET_ALPHA,
			0.001,
				[
					[1, 5]
				]
			);

		return l_mt;
	}

	isInteractable()
	{
		if(
			this._fIntroAnimation_mt.isPlaying() ||
			this._fOutroAnimation_mt.isPlaying()
			)
		{
			return false;
		}

		return true;
	}

	onInteraction()
	{
		this._fIntroAnimation_mt.play();
	}
}