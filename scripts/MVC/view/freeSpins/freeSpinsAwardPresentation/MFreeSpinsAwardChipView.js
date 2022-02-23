class MFreeSpinsAwardChipView extends MBaseCoinView
{
	constructor()
	{
		super();

		this._fPayoutTabloidView_mtv = null;
		let lBackSideContainer_mdc = this.getTailsCointainer();

		//CAPTION...
		let l_mdo = new MDisplayObject(STORAGE.freeSpinsChipCaptionAward_mp);
		l_mdo.setRegPointToCenter();
		l_mdo.setXY(0, -50);
		lBackSideContainer_mdc.addChild(l_mdo);
		//...CAPTION


		//PAYOUT VIEW...
		let lTabloidView_mtv = new MTabloidView(
			STORAGE.bigWinDigits_mp,
			"0123456789,.",
			380, //max width
			85, //max hegiht
			);
		lTabloidView_mtv.setY(75);

		this._fPayoutTabloidView_mtv = lBackSideContainer_mdc.addChild(lTabloidView_mtv);
		//...PAYOUT VIEW
	}
	
	displayValue(aValue_int)
	{
		this._fPayoutTabloidView_mtv.displayValue(aValue_int, false);
	}

	//PICTURES...
	getHeadsPicture()
	{
		return STORAGE.freeSpinsChipFace_mp;
	}

	getTailsPicture()
	{
		return STORAGE.freeSpinsChipBack_mp;
	}

	getRibPicture()
	{
		return STORAGE.freeSpinsChipRib_mp;
	}

	getMiddlePicture()
	{
		return STORAGE.freeSpinsChipRibExtended_mp;
	}

	getShadowPicture()
	{
		return STORAGE.bigWinCoinShadow_mp;
	}
	//...PICTURES
}