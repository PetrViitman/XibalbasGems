class MPoint
{
	constructor(aOptX_num, aOptY_num)
	{
		this.___fX_num = aOptX_num ? aOptX_num : 0;
		this.___fY_num = aOptY_num ? aOptY_num : 0;
	}


	setXY(aX_num, aY_num)
	{
		this.___fX_num = aX_num;
		this.___fY_num = aY_num;
	}

	setX(aX_num)
	{
		this.___fX_num = aX_num;
	}

	setY(aY_num)
	{
		this.___fY_num = aY_num;
	}

	getX()
	{
		return this.___fX_num;
	}

	getY()
	{
		return this.___fY_num;
	}
}