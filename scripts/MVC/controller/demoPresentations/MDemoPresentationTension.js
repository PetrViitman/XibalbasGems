class MDemoPresentationTension extends MDemoPresentaion
{
	constructor()
	{
		super();

		let lReelsController_mrc = MAIN.getReelsController();
		let lReelsModel_mrm = lReelsController_mrc.getModel();
		let lReelsView_mrv = lReelsController_mrc.getView();
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
			lReelsModel_mrm,
			[
				[9, 6, 7, 3, 10],
				[5, 11,11, 7, 9],
				[10,3, 8, 2, 9]
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
		//TENSION START...
		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(2).getTensionView().startIntroAnimation,
			160,
			lReelsView_mrv.getReelView(2).getTensionView());

		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(2).setSpinSpeedFast,
			160,
			lReelsView_mrv.getReelView(2));


		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(2).getTensionView().startOutroAnimation,
			160 + 70,
			lReelsView_mrv.getReelView(2).getTensionView());

		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(2).setSpinSpeedDefault,
			160 + 70,
			lReelsView_mrv.getReelView(2));

		this.callFunctionAtFrame(
			lReelsController_mrc.stopReelSpinning,
			160 + 60,
			lReelsController_mrc,
			2);
		//...REEL 2

		//REEL 3...
		//TENSION START...
		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(3).getTensionView().startIntroAnimation,
			160 + 88,
			lReelsView_mrv.getReelView(3).getTensionView());

		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(3).setSpinSpeedFast,
			160 + 88,
			lReelsView_mrv.getReelView(3));


		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(3).getTensionView().startOutroAnimation,
			160 + 88 + 70,
			lReelsView_mrv.getReelView(3).getTensionView());

		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(3).setSpinSpeedDefault,
			160 + 88 + 70,
			lReelsView_mrv.getReelView(3));

		this.callFunctionAtFrame(
			lReelsController_mrc.stopReelSpinning,
			160 + 88 + 60,
			lReelsController_mrc,
			3);
		//...REEL 3

		//REEL 4...
		//TENSION START...
		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(4).getTensionView().startIntroAnimation,
			248 + 80,
			lReelsView_mrv.getReelView(4).getTensionView());

		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(4).setSpinSpeedFast,
			248 + 80,
			lReelsView_mrv.getReelView(4));


		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(4).getTensionView().startOutroAnimation,
			248 + 80 + 70,
			lReelsView_mrv.getReelView(4).getTensionView());

		this.callFunctionAtFrame(
			lReelsView_mrv.getReelView(4).setSpinSpeedDefault,
			248 + 80 + 70,
			lReelsView_mrv.getReelView(4));

		this.callFunctionAtFrame(
			lReelsController_mrc.stopReelSpinning,
			248 + 80 + 60,
			lReelsController_mrc,
			4);
		//...REEL 4

		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightOutroAnimation,
			248 + 80 + 75,
			lBackgroundView_mbv);
		//...STOP REELS

		this.addPause(115);
	}

	getTestStandName()
	{
		return "TENSION"
	}
}