class MFreeSpinsAwardPresentationView extends MView
{
	constructor()
	{
		super(0, 0, 1080, 1080);

		this._fBlackout_mdc = null;
		this._fWinParticlePoolView_mwppv = null;
		this._fForegroundChipsPoolView_mfcpv = null;

		this._fIntroAnimation_mt = null;
		this._fIdleAnimation_mt = null;
		this._fOutroAnimation_mt = null;

		this._fFreeSpinsAwardChip_mfsacv = null;
		this._fParticlesPoolView_mbwppv = null;
	}

	init()
	{
		super.init();

		//BLACKOUT...
		let l_mdc = new MDisplayContainer(0, 0, this.getWidth(), this.getHeight());
		l_mdc.addToDisplay();
		l_mdc.setBackgroundColor("#8100ff");
		l_mdc.setAlpha(0);

		//RESPONSIVE DESIGN...
		l_mdc.setFillMode(MDisplayContainer.FILL_MODE_ID_FULL);
		l_mdc.setTargetArea(0, 0, 1, 1);
		//...RESPONSIVE DESIGN

		this._fBlackout_mdc = l_mdc;
		//...BLACKOUT

		//WIN PARTICLES...
		let l_mwppv = new MWinParticlePoolView();
		l_mwppv.setAlpha(0);
		this._fWinParticlePoolView_mwppv = l_mwppv;
		//...WIN PARTICLES

		//FOREGROUND COINS POOL...
		let l_mfcpv = new MForegroundChipsPoolView();
		l_mfcpv.setAlpha(0);
		this._fForegroundChipsPoolView_mfcpv = l_mfcpv;
		//...FOREGROUND COINS POOL

		this.addToDisplay();

		//RESPONSIVE DESIGN...
		this.setTargetArea(0, 0, 1, 0.94);
		//...RESPONSIVE DESIGN

		//COIN...
		let l_mfsacv = new MFreeSpinsAwardChipView();
		l_mfsacv.setXY(this.getWidth() / 2, this.getHeight() / 2);
		l_mfsacv.setScale(3);
		l_mfsacv.setFlip(0);
		l_mfsacv.setAlpha(0);
		l_mfsacv.setRotationInDegrees(90);

		this._fFreeSpinsAwardChip_mfsacv = this.addChild(l_mfsacv);
		//...COIN

		//PARTICLES...
		let l_mbwppv = new MBigWinParticlesPoolView(this._fFreeSpinsAwardChip_mfsacv);
		l_mbwppv.setXY(
			this.getWidth() / 2,
			this.getHeight() / 2);
		this.addChild(l_mbwppv);
		this._fParticlesPoolView_mbwppv = l_mbwppv;
		//...PARTICLES

		this.setVisible(false);




		//ANIMATIONS....
		//_________________________________
		//INTRO...
		let l_mt = new MTimeLine();

		l_mt.callFunctionOnStart(
			this.setVisible,
			this,
			true);

		l_mt.callFunctionOnStart(
			this._fFreeSpinsAwardChip_mfsacv.displayValue,
			this._fFreeSpinsAwardChip_mfsacv,
			10);

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

		//FOREGROUND CHIPS...
		l_mt.addAnimation(
			this._fForegroundChipsPoolView_mfcpv,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 10],
				]
			);
		//...FOREGROUND CHIPS
		
		//PARTICLES...
		l_mt.addAnimation(
			this._fParticlesPoolView_mbwppv,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 10],
				]);
		//...PARTICLES

		//COIN...
		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv.setFlip,
			MTimeLine.EXECUTE_METHOD,
			0,
				[
					[0.75, 88],
				],
			this._fFreeSpinsAwardChip_mfsacv);

		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			90,
				[
					[360, 88],
				]);

		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv,
			MTimeLine.SET_Y,
			-200,
				[
					[0, 13],
					[this.getHeight() / 2, 69],
				]);

		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv,
			MTimeLine.SET_SCALE,
			0.75,
				[
					[1.3, 29],
					[1, 29],
					[1.5, 29],
				]);
		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 7],
				]);

		//COIN...

		this._fIntroAnimation_mt = l_mt;
		//...INTRO
		//_________________________________




		//_________________________________
		//IDLE...
		l_mt = new MTimeLine();

		//COIN...
		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv.setFlip,
			MTimeLine.EXECUTE_METHOD,
			0.75,
				[
					[0.75 + 0.05, 25],
					[0.75 - 0.05, 50],
					[0.75, 25],
				],
			this._fFreeSpinsAwardChip_mfsacv);

		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[7, 13],
					[-7, 25],
					[0, 13],
					[7, 25],
					[-7, 25],
					[0, 13],
				],
			this._fFreeSpinsAwardChip_mfsacv);

		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv,
			MTimeLine.SET_SCALE,
			1.5,
				[
					[1.75, 50],
					[1.5, 50],
				],
			this._fFreeSpinsAwardChip_mfsacv);
		//COIN...

		this._fIdleAnimation_mt = l_mt;
		//...IDLE
		//_________________________________




		//_________________________________
		//OUTRO...
		l_mt = new MTimeLine();

		//FOREGROUND COINS...
		l_mt.addAnimation(
			this._fForegroundChipsPoolView_mfcpv,
			MTimeLine.SET_ALPHA,
			1,
				[
					40,
					[0, 10],
				]
			);
		//...FOREGROUND COINS
		
		//PARTICLES...
		l_mt.addAnimation(
			this._fParticlesPoolView_mbwppv,
			MTimeLine.SET_ALPHA,
			1,
				[
					15,
					[0, 10],
				]);
		//...PARTICLES

		//CHIP...
		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv.setFlip,
			MTimeLine.EXECUTE_METHOD,
			0.75,
				[
					[0, 75],
				],
			this._fFreeSpinsAwardChip_mfsacv);

		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[360, 75],
				]);

		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv,
			MTimeLine.SET_Y,
			this.getHeight() / 2,
				[
					[this.getHeight() + 250, 75],
				]);

		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv,
			MTimeLine.SET_SCALE,
			1.5,
				[
					[1.3, 25],
					[1, 25],
					[1.5, 25],
				]);

		l_mt.addAnimation(
			this._fFreeSpinsAwardChip_mfsacv,
			MTimeLine.SET_ALPHA,
			1,
				[
					[1, 50],
					[0, 5]
				]);
		//CHIP...

		//BLACKOUT...
		l_mt.addAnimation(
			this._fBlackout_mdc,
			MTimeLine.SET_ALPHA,
			0.38,
				[
					[0.38, 40],
					[0, 10],
				]
			);
		//...BLACKOUT

		//PARTICLES...
		l_mt.addAnimation(
			this._fWinParticlePoolView_mwppv,
			MTimeLine.SET_ALPHA,
			1,
				[
					40,
					[0, 10],
				]
			);
		//...PARTICLES

		l_mt.callFunctionOnFinish(
			this.setVisible,
			this,
			false);

		l_mt.callFunctionOnFinish(
			this._fParticlesPoolView_mbwppv.drop,
			this._fParticlesPoolView_mbwppv);

		this._fOutroAnimation_mt = l_mt;
		//...OUTRO
		//_________________________________
		//...ANIMATIONS
	}
	


	//EXTERNAL CONTROL METHODS...
	//INTRO...
	startIntroAnimation()
	{
		this._fIntroAnimation_mt.play();
	}
	//...INTRO


	//IDLE...
	startIdleAnimation()
	{
		this._fIdleAnimation_mt.play();
	}
	//...IDLE

	//OUTRO...
	startOutroAnimation()
	{
		this._fOutroAnimation_mt.play();
	}
	//...OUTRO
	//...EXTERNAL CONTROL METHODS
}