class MView extends MDisplayContainer
{
	constructor(aX_num = 0, aY_num = 0, aOptWidth_num = 0, aOptHeight_num = 0)
	{
		super(aX_num, aY_num, aOptWidth_num, aOptHeight_num);

		this.___fController_mc = null;
		this.___fModel_mm = null;
	}


	getBottomY()
	{
		return this.getY() + this.getHeight();
	}

	getRightX()
	{
		return this.getX() + this.getWidth();
	}

	setModel(aModel_mm)
	{
		this.___fModel_mm = aModel_mm;
	}

	getModel()
	{
		return this.___fModel_mm;
	}

	setController(aController_mc)
	{
		this.___fController_mc = aController_mc;
	}

	getController()
	{
		return this.___fController_mc;
	}

	init()
	{

	}
}