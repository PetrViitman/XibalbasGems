class MDemoPresentationWinSmall extends MDemoPresentaion
{
	constructor()
	{
		super();

		let lReelsController_mrc = MAIN.getReelsController();
		let lReelsModel_mrm = lReelsController_mrc.getModel();
		let lReelsView_mrv = lReelsController_mrc.getView();
		let lBackgroundView_mbv = MAIN.getBackgroundView();
		let lCentralWinPresentationView_mcvpv = MAIN.getCentralWinPresentationView();
		
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
				[9, 6, 0, 3, 10],
				[5, 10,7, 7, 9],
				[10,3, 8, 2, 11]
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
				[0, 0, 0, 0, 1],
				[0, 1, 1, 1, 0],
				[1, 0, 0, 0, 0]
			]);
		//...ICONS PRIMARY WIN INTRO PRESENTATION


		//CENTRAL WIN PRESENTATION...
		this.callFunctionAtFrame(
			lCentralWinPresentationView_mcvpv.startSmallWinIntroPresentation,
			225,
			lCentralWinPresentationView_mcvpv);

		this.callFunctionAtFrame(
			lCentralWinPresentationView_mcvpv.startSmallWinOutroPresentation,
			273,
			lCentralWinPresentationView_mcvpv);
		//...CENTRAL WIN PRESENTATION


		//ICONS PRIMARY WIN OUTRO PRESENTATION...
		this.callFunctionAtFrame(
			lReelsView_mrv.showPrimarayWinOutroPresentation,
			300,
			lReelsView_mrv,
			[
				[0, 0, 0, 0, 1],
				[0, 1, 1, 1, 0],
				[1, 0, 0, 0, 0]
			]);
		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightOutroAnimation,
			300,
			lBackgroundView_mbv);
		//...ICONS PRIMARY WIN OUTRO PRESENTATION

		//ICONS NON PRIMARY WIN PRESENTATION...
		//LINE 1...
		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightIntroAnimation,
			328,
			lBackgroundView_mbv);

		this.callFunctionAtFrame(
			lReelsView_mrv.showNonPrimarayWinIntroPresentation,
			328,
			lReelsView_mrv,
			[
				[0, 0, 0, 0, 1],
				[0, 1, 1, 1, 0],
				[1, 0, 0, 0, 0]
			],
			100000);

		this.callFunctionAtFrame(
			lReelsView_mrv.showNonPrimarayWinOutroPresentation,
			363,
			lReelsView_mrv,
			[
				[0, 0, 0, 0, 1],
				[0, 1, 1, 1, 0],
				[1, 0, 0, 0, 0]
			]);

		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightOutroAnimation,
			363,
			lBackgroundView_mbv);
		//...LINE 1
		//...ICONS NON PRIMARY WIN PRESENTATION

		this.addPause(100);
	}

	getTestStandName()
	{
		return "SMALL WIN"
	}
}