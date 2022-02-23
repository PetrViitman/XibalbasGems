class MDemoPresentationLoading extends MDemoPresentaion
{
	constructor()
	{
		super();

		let lLoadingScreenView_mlsv = MAIN.getLoadingScreenView();
		let lTransitionView_mtv = MAIN.getTransitionView();

		//TRANSITION INTRO...
		this.callFunctionOnStart(
			lTransitionView_mtv.startIntroAnimation,
			lTransitionView_mtv);
		//...TRANSITION INTRO

		//TRANSITION OUTRO...
		this.callFunctionAtFrame(
			lTransitionView_mtv.startOutroAnimation,
			30,
			lTransitionView_mtv);
		//...TRANSITION OUTRO

		//SHOW LOADING SCREEN...
		this.callFunctionAtFrame(
			lLoadingScreenView_mlsv.startPresentation,
			30,
			lLoadingScreenView_mlsv);
		//...SHOW LOADING SCREEN


		//TRANSITION INTRO...
		this.callFunctionAtFrame(
			lTransitionView_mtv.startIntroAnimation,
			350 + 30,
			lTransitionView_mtv);
		//...TRANSITION INTRO

		//HIDE LOADING SCREEN...
		this.callFunctionAtFrame(
			lLoadingScreenView_mlsv.setVisible,
			350 + 30 + 30,
			lLoadingScreenView_mlsv,
			false);
		//...HIDE LOADING SCREEN


		//TRANSITION OUTRO...
		this.callFunctionAtFrame(
			lTransitionView_mtv.startOutroAnimation,
			350 + 30 + 30 + 10,
			lTransitionView_mtv);
		//...TRANSITION OUTRO


		this.addPause(125);
	}

	getTestStandName()
	{
		return "LOADING"
	}
}