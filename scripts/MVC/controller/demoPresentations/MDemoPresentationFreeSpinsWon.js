class MDemoPresentationFreeSpinsWon extends MDemoPresentaion
{
	constructor()
	{
		super();

		let lReelsController_mrc = MAIN.getReelsController();
		let lReelsModel_mrm = lReelsController_mrc.getModel();
		let lReelsView_mrv = lReelsController_mrc.getView();
		let lBackgroundView_mbv = MAIN.getBackgroundView();

		//FREE SPINS WON PRESENTATION...
		this.callFunctionAtFrame(
			MAIN.getFreeSpinsWonPresentationView().startIntroAnimation,
			0,
			MAIN.getFreeSpinsWonPresentationView());

		//COUNTING...
		this.callFunctionAtFrame(
			MAIN.getFreeSpinsWonPresentationView().startCountingAnimation,
			70,
			MAIN.getFreeSpinsWonPresentationView());
		//...COUNTING

		this.callFunctionAtFrame(
			MAIN.getFreeSpinsWonPresentationView().startIdleAnimation,
			88,
			MAIN.getFreeSpinsWonPresentationView());

		this.callFunctionAtFrame(
			MAIN.getFreeSpinsWonPresentationView().startOutroAnimation,
			88 + 105,
			MAIN.getFreeSpinsWonPresentationView());
		//...FREE SPINS WON PRESENTATION

		//TRANSITION INTRO...
		this.callFunctionAtFrame(
			MAIN.getTransitionView().startIntroAnimation,
			88 + 105,
			MAIN.getTransitionView());
		//...TRANSITION INTRO

		//SET FREE SPINS MODE...
		this.callFunctionAtFrame(
			lBackgroundView_mbv.setFreeSpinsMode,
			88 + 105 + 30,
			lBackgroundView_mbv,
			false);

		this.callFunctionAtFrame(
			lBackgroundView_mbv.startHighlightOutroAnimation,
			88 + 105 + 30,
			lBackgroundView_mbv);

		this.callFunctionAtFrame(
			lReelsView_mrv.restoreIcons,
			88 + 105 + 30,
			lReelsView_mrv);
		//...SET FREE SPINS MODE

		//TRANSITION OUTRO..
		this.callFunctionAtFrame(
			MAIN.getTransitionView().startOutroAnimation,
			88 + 105 + 30 + 20,
			MAIN.getTransitionView());
		//...TRANSITION OUTRO
	}
}