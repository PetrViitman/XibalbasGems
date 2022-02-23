class MDemoPresentationFreeSpinsAward extends MDemoPresentaion
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

		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightIntroAnimation,
			248 + 80 + 75 + 30,
			lBackgroundView_mbv);
		//...STOP REELS

		//FREE SPINS AWARD PRESENTATION...
		this.callFunctionAtFrame(
			lReelsView_mrv.showFreeSpinsAwardPresentation,
			248 + 80 + 75 + 30,
			lReelsView_mrv,
			[
				[0, 0, 0, 0, 0],
				[0, 1, 1, 0, 0],
				[0, 0, 0, 0, 1]
			]);

		this.callFunctionAtFrame(
			MAIN.getFreeSpinsAwardPresentationView().startIntroAnimation,
			248 + 80 + 75 + 30 + 50,
			MAIN.getFreeSpinsAwardPresentationView());

		this.callFunctionAtFrame(
			MAIN.getFreeSpinsAwardPresentationView().startIdleAnimation,
			248 + 80 + 75 + 30 + 50 + 88,
			MAIN.getFreeSpinsAwardPresentationView());

		this.callFunctionAtFrame(
			MAIN.getFreeSpinsAwardPresentationView().startOutroAnimation,
			248 + 80 + 75 + 30 + 50 + 88 + 105,
			MAIN.getFreeSpinsAwardPresentationView());
		//...FREE SPINS AWARD PRESENTATION

		//TRANSITION INTRO...
		this.callFunctionAtFrame(
			MAIN.getTransitionView().startIntroAnimation,
			248 + 80 + 75 + 30 + 50 + 88 + 105,
			MAIN.getTransitionView());
		//...TRANSITION INTRO

		//SET FREE SPINS MODE...
		this.callFunctionAtFrame(
			lBackgroundView_mbv.setFreeSpinsMode,
			248 + 80 + 75 + 30 + 50 + 88 + 105 + 30,
			lBackgroundView_mbv,
			true);

		this.callFunctionAtFrame(
			lReelsView_mrv.restoreIcons,
			248 + 80 + 75 + 30 + 50 + 88 + 105 + 30,
			lReelsView_mrv);
		//...SET FREE SPINS MODE

		//TRANSITION OUTRO..
		this.callFunctionAtFrame(
			MAIN.getTransitionView().startOutroAnimation,
			248 + 80 + 75 + 30 + 50 + 88 + 105 + 30 + 20,
			MAIN.getTransitionView());
		//...TRANSITION OUTRO
	}
}