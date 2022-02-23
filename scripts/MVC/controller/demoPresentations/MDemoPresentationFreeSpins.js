class MDemoPresentationFreeSpins extends MDemoPresentaion
{
	constructor()
	{
		super();

		this.callFunctionAtFrame(
			MAIN.PRESENTATION_FREE_SPINS_AWARD.play,
			0,
			MAIN.PRESENTATION_FREE_SPINS_AWARD);

		this.callFunctionAtFrame(
			MAIN.PRESENTATION_SPIN_NO_WIN.play,
			770,
			MAIN.PRESENTATION_SPIN_NO_WIN);

		this.callFunctionAtFrame(
			MAIN.PRESENTATION_WIN_MEDIUM.play,
			770 + 195,
			MAIN.PRESENTATION_WIN_MEDIUM);

		this.callFunctionAtFrame(
			MAIN.PRESENTATION_SPIN_NO_WIN.play,
			770 + 195 + 475,
			MAIN.PRESENTATION_SPIN_NO_WIN);

		this.callFunctionAtFrame(
			MAIN.PRESENTATION_FREE_SPINS_WON.play,
			770 + 195 + 475 + 195,
			MAIN.PRESENTATION_FREE_SPINS_WON);

		this.addPause(550);
	}

	getTestStandName()
	{
		return "FREE SPINS"
	}
}