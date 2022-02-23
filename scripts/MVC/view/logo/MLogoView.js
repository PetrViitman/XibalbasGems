class MLogoView extends MView
{
	constructor()
	{
		super(0, 0, 1274, 350);
	
		let lLogo_mdo = new MDisplayObject(STORAGE.logo_mp);
		this.addChild(lLogo_mdo);

		this.addToDisplay();
	}

	//RESPONSIVE DESIGN...
	updateTargetArea(aSidesRatio_num)
	{
		this.setStickMode(MDisplayContainer.STICK_MODE_ID_TOP);

		let lReelsView_mrv = MAIN.getReelsController().getView();
		let lReelsTargetAreaY_num = lReelsView_mrv.getTargetAreaY()  / aSidesRatio_num;
		
		if(lReelsTargetAreaY_num < 0.18)
		{
			lReelsTargetAreaY_num = 0.18;
		}

		this.setTargetArea(
			0,
			0 ,
			1,
			lReelsTargetAreaY_num);
	}
	//...RESPONSIVE DESIGN
}