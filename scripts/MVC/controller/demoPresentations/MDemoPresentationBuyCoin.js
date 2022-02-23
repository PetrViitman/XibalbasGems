class MDemoPresentationBuyCoin extends MDemoPresentaion
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
				[8, 7, 4, 8, 12],
				[1, 12,3, 4, 10],
				[2, 0, 7, 12, 0]
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




		//CASCADES...
		//REEL 1...
		this.callFunctionAtFrame(
			lReelsController_mrc.cascade,
			110 + 95,
			lReelsController_mrc,
			1,
			1,
			MReelsModel.SYMBOL_ID_K);
		//...REEL 1

		//REEL 3...
		this.callFunctionAtFrame(
			lReelsController_mrc.cascade,
			130 + 95,
			lReelsController_mrc,
			3,
			2,
			MReelsModel.SYMBOL_ID_MID_4);
		//...REEL 3

		//REEL 4...
		this.callFunctionAtFrame(
			lReelsController_mrc.cascade,
			140 + 95,
			lReelsController_mrc,
			4,
			0,
			MReelsModel.SYMBOL_ID_MID_5);
		//...REEL 4
		//...CASCADES


		this.addPause(75);
	}

	getTestStandName()
	{
		return "BUY COIN"
	}
}