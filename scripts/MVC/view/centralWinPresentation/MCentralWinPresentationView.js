class MCentralWinPresentationView extends MView
{
	constructor()
	{
		super(0, 0, 1080, 1080);

		this._fBlackout_mdc = null;
		this._fContentContainer_mdc = null;
		this._fPayoutTabloidContainer_mdc = null;
		this._fPayoutTabloidView_mtv = null;
		this._fWinParticlePoolView_mwppv = null;
		this._fForegroundCoinsPoolView_mfcpv = null;

		this._fSmallWinIntroAnimation_mt = null;
		this._fSmallWinOutroAnimation_mt = null;

		this._fMediumWinIntroAnimation_mt = null;
		this._fMediumWinOutroAnimation_mt = null;

		this._fLargeWinIntroAnimation_mt = null;
		this._fLargeWinOutroAnimation_mt = null;
	}

	init()
	{
		super.init();

		//BLACKOUT...
		let l_mdc = new MDisplayContainer(0, 0, this.getWidth(), this.getHeight());
		l_mdc.addToDisplay();
		l_mdc.setBackgroundColor("#8100ff");

		//RESPONSIVE DESIGN...
		l_mdc.setFillMode(MDisplayContainer.FILL_MODE_ID_FULL);
		l_mdc.setTargetArea(0, 0, 1, 1);
		//...RESPONSIVE DESIGN
		
		l_mdc.setAlpha(0);

		this._fBlackout_mdc = l_mdc;
		//...BLACKOUT

		//WIN PARTICLES...
		let l_mwppv = new MWinParticlePoolView();
		l_mwppv.setAlpha(0);
		this._fWinParticlePoolView_mwppv = l_mwppv;
		//...WIN PARTICLES

		//FOREGROUND COINS POOL...
		let l_mfcpv = new MForegroundCoinsPoolView();
		l_mfcpv.setAlpha(0);
		this._fForegroundCoinsPoolView_mfcpv = l_mfcpv;
		//...FOREGROUND COINS POOL

		this.addToDisplay();
		this.setTargetArea(0, 0, 1, 0.94);

		//CONTENT CONTAINER...
		this._fContentContainer_mdc = this.addChild(
			new MDisplayContainer(
				this.getWidth() / 2,
				this.getHeight() / 2,
				this.getWidth(),
				this.getHeight()));
		//...CONTENT CONTAINER

		//PAYOUT VIEW...
		let lTabloidView_mtv = new MTabloidView(
			STORAGE.winDigits_mp,
			"0123456789,.",
			this.getWidth(),
			this.getHeight());

		this._fPayoutTabloidContainer_mdc = this._fContentContainer_mdc.addChild(new MDisplayContainer());
		this._fPayoutTabloidView_mtv = this._fPayoutTabloidContainer_mdc.addChild(lTabloidView_mtv);
		//...PAYOUT VIEW

		this.setVisible(false);












		//ANIMATIONS....
		//_________________________________
		//LARGE WIN...
		//INTRO...
		let l_mt = new MTimeLine();

		l_mt.callFunctionOnStart(
			this.setVisible,
			this,
			true);

		//COUNTING...
		l_mt.addAnimation(
			this._fPayoutTabloidView_mtv.displayValue,
			MTimeLine.EXECUTE_METHOD,
			0,
				[
					[1000000, 100],
				],
			this._fPayoutTabloidView_mtv
			);
		//...COUNTING

		//BLACKOUT...
		l_mt.addAnimation(
			this._fBlackout_mdc,
			MTimeLine.SET_ALPHA,
			0,
				[
					[0.38, 10],
				]
			);
		//...BLACKOUT

		//PARTICLES...
		l_mt.addAnimation(
			this._fWinParticlePoolView_mwppv,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 10],
				]
			);
		//...PARTICLES

		//FOREGROUND COINS...
		l_mt.addAnimation(
			this._fForegroundCoinsPoolView_mfcpv,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 10],
				]
			);
		//...FOREGROUND COINS
		
		//TABLOID...
		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_SCALE_X,
			1,
				[
					[1.15, 10],
					[1, 10],
				],
			);

		l_mt.addAnimation(
		this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_SCALE_Y,
			0,
				[
					[1, 15],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[-25, 13],
					[25, 25],
					[0, 13],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidView_mtv,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			-45,
				[
					[20, 13],
					[0, 8],
				],
			);
		//...TABLOID

		this._fLargeWinIntroAnimation_mt = l_mt;
		//...INTRO






		//OUTRO...
		l_mt = new MTimeLine();

		//BLACKOUT...
		l_mt.addAnimation(
		this._fBlackout_mdc,
		MTimeLine.SET_ALPHA,
		0.38,
			[
				[0, 13],
			]
		);
		//...BLACKOUT

		//PARTICLES...
		l_mt.addAnimation(
		this._fWinParticlePoolView_mwppv,
		MTimeLine.SET_ALPHA,
		1,
			[
				[0, 13],
			]
		);
		//...PARTICLES

		//FOREGROUND COINS...
		l_mt.addAnimation(
			this._fForegroundCoinsPoolView_mfcpv,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 13],
				]
			);
		//...FOREGROUND COINS
		
		//TABLOID...
		l_mt.addAnimation(
		this._fPayoutTabloidContainer_mdc,
		MTimeLine.SET_SCALE_X,
		1,
			[
				[1.15, 5],
				[1, 5],
			],
		);

		l_mt.addAnimation(
		this._fPayoutTabloidContainer_mdc,
		MTimeLine.SET_SCALE_Y,
		1,
			[
				[0, 8],
			],
		);

		l_mt.addAnimation(
		this._fPayoutTabloidContainer_mdc,
		MTimeLine.SET_X,
		0,
			[
				[25, 6],
				[-25, 13],
				[0, 6],
			],
		);

		l_mt.addAnimation(
		this._fPayoutTabloidView_mtv,
		MTimeLine.SET_ROTATION_IN_DEGREES,
		0,
			[
				[20, 6],
				[-45, 4],
			],
		);

		l_mt.callFunctionAtFrame(
			this._fPayoutTabloidView_mtv.displayValue,
			50,
			this._fPayoutTabloidView_mtv,
			0);
		//TABLOID...

		l_mt.callFunctionOnFinish(
			this.setVisible,
			this,
			false);


		this._fLargeWinOutroAnimation_mt = l_mt;
		//...OUTRO
		//...LARGE WIN
		//_________________________________
		




		//_________________________________
		//MEDIUM WIN...
		//INTRO...
		l_mt = new MTimeLine();

		l_mt.callFunctionOnStart(
			this.setVisible,
			this,
			true);

		//COUNTING...
		l_mt.addAnimation(
			this._fPayoutTabloidView_mtv.displayValue,
			MTimeLine.EXECUTE_METHOD,
			0,
				[
					[100000, 100],
				],
			this._fPayoutTabloidView_mtv
			);
		//...COUNTING

		//BLACKOUT...
		l_mt.addAnimation(
			this._fBlackout_mdc,
			MTimeLine.SET_ALPHA,
			0,
				[
					[0.38, 10],
				]
			);
		//...BLACKOUT

		//PARTICLES...
		l_mt.addAnimation(
			this._fWinParticlePoolView_mwppv,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 10],
				]
			);
		//...PARTICLES
		
		//TABLOID...
		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_SCALE_X,
			1,
				[
					[1.15, 10],
					[1, 10],
				],
			);

		l_mt.addAnimation(
		this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_SCALE_Y,
			0,
				[
					[1, 15],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[-25, 13],
					[25, 25],
					[0, 13],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidView_mtv,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			-45,
				[
					[20, 13],
					[0, 8],
				],
			);
		//TABLOID...

		this._fMediumWinIntroAnimation_mt = l_mt;
		//...INTRO






		//OUTRO...
		l_mt = new MTimeLine();

		//BLACKOUT...
		l_mt.addAnimation(
			this._fBlackout_mdc,
			MTimeLine.SET_ALPHA,
			0.38,
				[
					[0, 13],
				]
			);
		//...BLACKOUT

		//PARTICLES...
		l_mt.addAnimation(
			this._fWinParticlePoolView_mwppv,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 13],
				]
			);
		//...PARTICLES
		
		//TABLOID...
		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_SCALE_X,
			1,
				[
					[1.15, 5],
					[1, 5],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_SCALE_Y,
			1,
				[
					[0, 8],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[25, 6],
					[-25, 13],
					[0, 6],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidView_mtv,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[20, 6],
					[-45, 4],
				],
			);

		l_mt.callFunctionAtFrame(
			this._fPayoutTabloidView_mtv.displayValue,
			50,
			this._fPayoutTabloidView_mtv,
			0);
		//TABLOID...

		l_mt.callFunctionOnFinish(
			this.setVisible,
			this,
			false);


		this._fMediumWinOutroAnimation_mt = l_mt;
		//...OUTRO
		//...MEDIUM WIN
		//_________________________________





		//_________________________________
		//SMALL WIN...
		//INTRO...
		l_mt = new MTimeLine();

		l_mt.callFunctionOnStart(
			this.setVisible,
			this,
			true);

		l_mt.callFunctionAtFrame(
			this._fPayoutTabloidView_mtv.displayValue,
			1,
			this._fPayoutTabloidView_mtv,
			100000);
		
		//BLACKOUT...
		l_mt.addAnimation(
			this._fBlackout_mdc,
			MTimeLine.SET_ALPHA,
			0,
				[
					[0.38, 10],
				]
			);
		//...BLACKOUT
		
		//TABLOID...
		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_SCALE_X,
			1,
				[
					[1.15, 10],
					[1, 10],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_SCALE_Y,
			0,
				[
					[1, 15],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[-25, 13],
					[25, 25],
					[0, 13],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidView_mtv,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			-45,
				[
					[20, 13],
					[0, 8],
				],
			);
		//TABLOID...

		this._fSmallWinIntroAnimation_mt = l_mt;
		//...INTRO






		//OUTRO...
		l_mt = new MTimeLine();

		//BLACKOUT...
		l_mt.addAnimation(
			this._fBlackout_mdc,
			MTimeLine.SET_ALPHA,
			0.38,
				[
					[0, 13],
				]
			);
		//...BLACKOUT

		//TABLOID...
		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_SCALE_X,
			1,
				[
					[1.15, 5],
					[1, 5],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_SCALE_Y,
			1,
				[
					[0, 8],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[25, 6],
					[-25, 13],
					[0, 6],
				],
			);

		l_mt.addAnimation(
			this._fPayoutTabloidView_mtv,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[20, 6],
					[-45, 4],
				],
			);

		l_mt.callFunctionAtFrame(
			this._fPayoutTabloidView_mtv.displayValue,
			50,
			this._fPayoutTabloidView_mtv,
			0);
		//TABLOID...

		l_mt.callFunctionOnFinish(
			this.setVisible,
			this,
			false);

		this._fSmallWinOutroAnimation_mt = l_mt;
		//...OUTRO
		//...SMALL WIN
		//_________________________________
	}



	//EXTERNAL CONTROL METHODS...
	//LARGE WIN...
	startLargeWinIntroPresentation()
	{
		this._fLargeWinIntroAnimation_mt.play();
	}

	startLargeWinOutroPresentation()
	{
		this._fLargeWinOutroAnimation_mt.play();
	}
	//...LARGE WIN

	//MEDIUM WIN...
	startMediumWinIntroPresentation()
	{
		this._fMediumWinIntroAnimation_mt.play();
	}

	startMediumWinOutroPresentation()
	{
		this._fMediumWinOutroAnimation_mt.play();
	}
	//...MEDIUM WIN

	//SMALL WIN...
	startSmallWinIntroPresentation()
	{
		this._fSmallWinIntroAnimation_mt.play();
	}

	startSmallWinOutroPresentation()
	{
		this._fSmallWinOutroAnimation_mt.play();
	}
	//...SMALL WIN
	//...EXTERNAL CONTROL METHODS


	//RESPONSIVE DESIGN...
	updateTargetArea(aSidesRatio_num)
	{
		this.copyTargetArea(MAIN.getBackgroundView());
	}
	//...RESPONSIVE DESIGN
}