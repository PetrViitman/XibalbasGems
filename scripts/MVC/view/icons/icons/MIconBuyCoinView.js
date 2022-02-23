class MIconBuyCoinView extends MBaseIconView
{
	constructor()
	{
		super(MReelsModel.SYMBOL_ID_BUY_COIN);
	}

	generateBody()
	{
		return new MBuyCoinView();
	}

	generateBlackout()
	{
		return new MDisplayContainer();
	}

	generateGlow()
	{
		return new MDisplayContainer();
	}

	generateSpecialEffectsContainer()
	{
		return new MBuyCoinParticlesPoolView(this.getBodyContainer());
	}



	//CONSTANT LOOP...
	generateConstantLoopAnimation()
	{
		let l_mbcv = this.getBodyContainer();
		let l_mt = new MTimeLine();

		l_mt.addAnimation(
			this._fContentWrapperContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[-12, 25],
					[12, 50],
					[0, 25],
				]
			);

		l_mt.addAnimation(
			l_mbcv.setFlip,
			MTimeLine.EXECUTE_METHOD,
			0,
				[
					[3, 100],
				],
			l_mbcv);

		return l_mt;
	}
	//...CONSTANT LOOP


	//ANIMATIONS...
	//FINISH SPIN...
	generateFinishSpinAnimation()
	{
		let l_mbcppv = this.getSpecialEffectsContainer();
		let l_mt = new MTimeLine();

		//COIN...
		l_mt.addAnimation(
			this.getBodyContainer(),
			MTimeLine.SET_Y,
			0,
				[
					[-15, 5],
					[10, 5],
					[-5, 5],
					[0, 5],
					[-450, 75],
				]
			);
		l_mt.addAnimation(
			this.getBodyContainer(),
			MTimeLine.SET_SCALE,
			1 * 0.8,
				[
					10,
					[1.25 * 0.8, 5],
					[1 * 0.8, 5],
					25,
					[1.25 * 0.8, 5],
					[0.5 * 0.8, 20],
				]
			);

		l_mt.addAnimation(
			this.getBodyContainer(),
			MTimeLine.SET_ALPHA,
			1,
				[
					60,
					[0, 10],
				]
			);

		l_mt.addAnimation(
			this.getBodyContainer(),
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[360 * 2, 75],
				]
			);
		//...COIN

		//PARTICLES...
		l_mt.addAnimation(
			l_mbcppv,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 5],
					50,
					[0, 15],
				]
			);


		l_mt.callFunctionOnFinish(
			l_mbcppv.drop,
			l_mbcppv);
		//...PARTICLES


		return l_mt;
	}
	//...FINISH SPIN
	//...ANIMATIONS


	restore()
	{
		super.restore();
		this.getBodyContainer().setXY(0, 0);
		this.getBodyContainer().setScale(0.8);
	}

}