class MDemoPresentaion extends MTimeLine
{
	constructor()
	{
		super();

		if(this.getTestStandName())
		{
			MAIN.getTestStandView().addDemoPresentation(this);
		}
	}

	getTestStandName()
	{
		return null;
	}
}