class MDemoPresentationRules extends MDemoPresentaion
{
	constructor()
	{
		super();

		let l_mrv = MAIN.getRulesView();

		this.callFunctionOnStart(
			l_mrv.playIntroAnimation,
			l_mrv);
	}

	getTestStandName()
	{
		return "RULES"
	}
}