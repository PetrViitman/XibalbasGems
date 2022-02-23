class MController
{
	constructor(aOptModel_mm, aOptView_mv)
	{
		this.___fModel_mm = aOptModel_mm;
		this.___fView_mv = aOptView_mv;

		//VIEW...
		if(this.___fView_mv)
		{
			this.___fView_mv.setController(this);
			this.___fView_mv.setModel(aOptModel_mm);
		}
		//...VIEW
	}

	init()
	{
		this.___fModel_mm && this.___fModel_mm.init();
		this.___fView_mv && this.___fView_mv.init();
	}

	getModel()
	{
		return this.___fModel_mm;
	}

	getView()
	{
		return this.___fView_mv;
	}

}