class MTestStandButtonView extends MButtonView
{
	constructor(aCaption_str, aWidth_int, aHeight_int, aOptShadowAlpha_num = 0.62)
	{
		super(0, 0, aWidth_int, aHeight_int);

		this._fTextField_mdc = null;
		this._fIsLocked_bl = false;

		//TEXT FIELD...
		let l_mdc = new MDisplayContainer(
			0,
			0,
			aWidth_int,
			aHeight_int);

		l_mdc.displayText(aCaption_str);
		this._fTextField_mdc = this.addChild(l_mdc);
		//...TEXT FIELD

		//SHADOW...
		l_mdc = new MDisplayContainer(
			Math.trunc(aWidth_int * 0.62),
			0,
			Math.trunc(aWidth_int * 0.38) + 1,
			aHeight_int);

		l_mdc.setBackgroundColor("black");
		l_mdc.setAlpha(aOptShadowAlpha_num);

		this.addChild(l_mdc);
		//...SHADOW

		this.setBackgroundColor("#ff0000");
	}

	displayText(aText_str)
	{
		this._fTextField_mdc.displayText(aText_str);
	}

	setLocked(aIsLocked_bl)
	{
		this._fIsLocked_bl = aIsLocked_bl;
	}

	isInteractable()
	{
		if(this._fIsLocked_bl)
		{
			return false;
		}

		return super.isInteractable();
	}
}