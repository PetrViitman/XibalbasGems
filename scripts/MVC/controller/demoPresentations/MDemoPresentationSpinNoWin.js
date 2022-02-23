class MDemoPresentationSpinNoWin extends MDemoPresentaion
{
	constructor()
	{
		super();

		let lReelsController_mrc = MAIN.getReelsController();
		let lReelsModel_mrm = lReelsController_mrc.getModel();
		let lBackgroundView_mbv = MAIN.getBackgroundView();

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
			lReelsModel_mrm);
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

		this.addPause(60);
	}

	getTestStandName()
	{
		return "NO WIN"
	}
}