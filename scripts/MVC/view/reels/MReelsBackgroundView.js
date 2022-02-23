class MReelsBackgroundView extends MView
{

	constructor()
	{
		super(0, 0, MReelsView.WIDTH, MReelsView.HEIGHT);
		
		this._fBackground_mp = null;

		let lBg_mp = new MDisplayObject(STORAGE.tempel_mp);
		lBg_mp.setY(20);
		this.setAlpha(0.62);
		this._fBackground_mp = this.addChild(lBg_mp);

		this.addToDisplay();
	}

	//RESPONSIVE DESIGN...
	updateTargetArea(aSidesRatio_num)
	{
		let lBackgroundTargetAreaHeight_num = MAIN.getBackgroundView().getTargetAreaHeight();

		this.setTargetArea(
			0,
			0.19 * lBackgroundTargetAreaHeight_num,
			1,
			0.57 * lBackgroundTargetAreaHeight_num);
	}
	//...RESPONSIVE DESIGN
}