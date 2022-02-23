class MFooterView extends MView
{
	constructor()
	{
		super(0, 0, 1920, 1080);
	}

	init()
	{
		let l_mdo = new MDisplayObject(STORAGE.loadingScreenBackground_mp);
		l_mdo.forceAliasing();
		this.addChild(l_mdo);
		this.addToDisplay();
	}

	//RESPONSIVE DESIGN...
	updateTargetArea(aSidesRatio_num)
	{
		let lBackgroundTargetAreaHeight_num = MAIN.getBackgroundView().getTargetAreaHeight();
		let lHeightScale_num = 1 - lBackgroundTargetAreaHeight_num;

		if(lHeightScale_num < 0.3)
		{
			lHeightScale_num = 0.3;
		}

		this.setFillMode(MDisplayContainer.FILL_MODE_ID_FULL);

		this.setTargetArea(
			0,
			lBackgroundTargetAreaHeight_num,
			1,
			lHeightScale_num);
			
	}
	//...RESPONSIVE DESIGN
}