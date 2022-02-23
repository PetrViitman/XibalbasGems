class MDemoPresentationFull extends MDemoPresentaion
{
	constructor()
	{
		super();


		let lFrameIndex_int = 0;
		let lFullDemoParts_mdp_arr =
		[
			MAIN.PRESENTATION_LOADING,
			MAIN.PRESENTATION_SPIN_NO_WIN,
			MAIN.PRESENTATION_WIN_SMALL,
			MAIN.PRESENTATION_TENSION,
			MAIN.PRESENTATION_WIN_MEDIUM,
			MAIN.PRESENTATION_SPIN_NO_WIN,
			MAIN.PRESENTATION_WIN_LARGE,
			MAIN.PRESENTATION_WIN_BIG,
			MAIN.PRESENTATION_BUY_COIN,
			MAIN.PRESENTATION_FREE_SPINS,
			MAIN.PRESENTATION_SPIN_NO_WIN
		];


		for( let i = 0; i < lFullDemoParts_mdp_arr.length; i++ )
		{
			let l_mdp = lFullDemoParts_mdp_arr[i];

			this.callFunctionAtFrame(
				l_mdp.play,
				lFrameIndex_int,
				l_mdp);

			lFrameIndex_int += l_mdp.getTotalFramesCount();
		}

		//this.addPause(550);
	}

	getTestStandName()
	{
		return "FULL DEMO"
	}
}