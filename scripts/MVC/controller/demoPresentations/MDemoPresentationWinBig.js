class MDemoPresentationWinBig extends MDemoPresentaion
{
	constructor()
	{
		super();

		let lReelsController_mrc = MAIN.getReelsController();
		let lReelsModel_mrm = lReelsController_mrc.getModel();
		let lReelsView_mrv = lReelsController_mrc.getView();
		let lBackgroundView_mbv = MAIN.getBackgroundView();
		let lBigWinPresentationView_mbwpv = MAIN.getBigWinPresentationView();

		//START SPIN...
		this.callFunctionOnStart(
			lReelsController_mrc.startSpinning,
			lReelsController_mrc);

		this.callFunctionOnStart(
			lBackgroundView_mbv.startHighlightIntroAnimation,
			lBackgroundView_mbv);
		//...START SPIN

		//SET TARGET ICONS...
		this.callFunctionOnStart(
			lReelsModel_mrm.setIcons,
			lReelsModel_mrm,
			[
				[8, 8, 8, 8, 8],
				[9, 9, 9, 9, 9],
				[7, 7, 7, 7, 7]
			]);
		//...SET TARGET ICONS

		//STOP REELS...
		//REEL 0...
		this.callFunctionAtFrame(
			lReelsController_mrc.stopReelSpinning,
			100,
			lReelsController_mrc,
			0);
		//...REEL 0

		//REEL 1...
		this.callFunctionAtFrame(
			lReelsController_mrc.stopReelSpinning,
			110,
			lReelsController_mrc,
			1);
		//...REEL 1

		//REEL 2...
		this.callFunctionAtFrame(
			lReelsController_mrc.stopReelSpinning,
			120,
			lReelsController_mrc,
			2);
		//...REEL 2
		
		//REEL 3...
		this.callFunctionAtFrame(
			lReelsController_mrc.stopReelSpinning,
			130,
			lReelsController_mrc,
			3);
		//...REEL 3

		//REEL 4...
		this.callFunctionAtFrame(
			lReelsController_mrc.stopReelSpinning,
			140,
			lReelsController_mrc,
			4);
		//...REEL 4


		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightOutroAnimation,
			140,
			lBackgroundView_mbv);
		//...STOP REELS

		//ICONS PRIMARY WIN INTRO PRESENTATION...
		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightIntroAnimation,
			195,
			lBackgroundView_mbv);

		this.callFunctionAtFrame(
			lReelsView_mrv.showPrimarayWinIntroPresentation,
			195,
			lReelsView_mrv,
			[
				[1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1]
			]);
		//...ICONS PRIMARY WIN INTRO PRESENTATION


		//BIG HUGE MEGA WIN...
		//INTRO...
		this.callFunctionAtFrame(
		lBigWinPresentationView_mbwpv.startIntroAnimation,
		225,
		lBigWinPresentationView_mbwpv);
		//...INTRO

		//IDLE...
		this.callFunctionAtFrame(
		lBigWinPresentationView_mbwpv.startIdleAnimation,
		225 + 88,
		lBigWinPresentationView_mbwpv);
		//...IDLE

		//LEVEL UP...
		this.callFunctionAtFrame(
		lBigWinPresentationView_mbwpv.startLevelUpAnimation,
		225 + 88 + 110,
		lBigWinPresentationView_mbwpv);
		//...LEVEL UP

		//IDLE...
		this.callFunctionAtFrame(
		lBigWinPresentationView_mbwpv.startIdleAnimation,
		225 + 88 + 110 + 75,
		lBigWinPresentationView_mbwpv);
		//...IDLE

		//LEVEL UP...
		this.callFunctionAtFrame(
		lBigWinPresentationView_mbwpv.startLevelUpAnimation,
		225 + 88 + 110 + 75 + 110,
		lBigWinPresentationView_mbwpv);
		//...LEVEL UP

		//IDLE...
		this.callFunctionAtFrame(
		lBigWinPresentationView_mbwpv.startIdleAnimation,
		225 + 88 + 110 + 75 + 110 + 75,
		lBigWinPresentationView_mbwpv);
		//...IDLE

		//OUTRO...
		this.callFunctionAtFrame(
		lBigWinPresentationView_mbwpv.startOutroAnimation,
		225 + 88 + 110 + 75 + 110 + 75 + 110,
		lBigWinPresentationView_mbwpv);
		//...OUTRO


		//COUNTING...
		this.callFunctionAtFrame(
		lBigWinPresentationView_mbwpv.startCountingAnimation,
		225 + 65 + 15,
		lBigWinPresentationView_mbwpv);
		//...COUNTING
		//...BIG HUGE MEGA WIN


		//ICONS PRIMARY WIN OUTRO PRESENTATION...
		this.callFunctionAtFrame(
			lReelsView_mrv.showPrimarayWinOutroPresentation,
			827 + 15,
			lReelsView_mrv,
			[
				[1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1]
			]);
		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightOutroAnimation,
			827 + 15,
			lBackgroundView_mbv);
		//...ICONS PRIMARY WIN OUTRO PRESENTATION


		//ICONS NON PRIMARY WIN PRESENTATION...
		//LINE 1...
		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightIntroAnimation,
			825 + 30 + 15,
			lBackgroundView_mbv);

		this.callFunctionAtFrame(
			lReelsView_mrv.showNonPrimarayWinIntroPresentation,
			825 + 30 + 15,
			lReelsView_mrv,
			[
				[1, 1, 1, 1, 1],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			1000000);

		this.callFunctionAtFrame(
			lReelsView_mrv.showNonPrimarayWinOutroPresentation,
			825 + 30 + 35 + 15,
			lReelsView_mrv,
			[
				[1, 1, 1, 1, 1],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			]);

		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightOutroAnimation,
			825 + 30 + 35 + 15,
			lBackgroundView_mbv);
		//...LINE 1

		//LINE 2...
		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightIntroAnimation,
			888 + 30 + 15,
			lBackgroundView_mbv);

		this.callFunctionAtFrame(
			lReelsView_mrv.showNonPrimarayWinIntroPresentation,
			888 + 30 + 15,
			lReelsView_mrv,
			[
				[0, 0, 0, 0, 0],
				[1, 1, 1, 1, 1],
				[0, 0, 0, 0, 0]
			],
			1000000);

		this.callFunctionAtFrame(
			lReelsView_mrv.showNonPrimarayWinOutroPresentation,
			888 + 30 + 35 + 15,
			lReelsView_mrv,
			[
				[0, 0, 0, 0, 0],
				[1, 1, 1, 1, 1],
				[0, 0, 0, 0, 0]
			]);

		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightOutroAnimation,
			888 + 30 + 35 + 15,
			lBackgroundView_mbv);
		//...LINE 2

		//LINE 3...
		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightIntroAnimation,
			950 + 30 + 15,
			lBackgroundView_mbv);

		this.callFunctionAtFrame(
			lReelsView_mrv.showNonPrimarayWinIntroPresentation,
			950 + 30 + 15,
			lReelsView_mrv,
			[
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[1, 1, 1, 1, 1]
			],
			1000000);

		this.callFunctionAtFrame(
			lReelsView_mrv.showNonPrimarayWinOutroPresentation,
			950 + 30 + 35 + 15,
			lReelsView_mrv,
			[
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[1, 1, 1, 1, 1]
			]);

		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightOutroAnimation,
			950 + 30 + 35 + 15,
			lBackgroundView_mbv);
		//...LINE 3
		//...ICONS NON PRIMARY WIN PRESENTATION

		this.addPause(270);
	}

	getTestStandName()
	{
		return "MEGA WIN"
	}
}