class MBuyCoinView extends MBaseCoinView
{
	constructor()
	{
		super();

		this.setScale(0.8);
	}

	//PICTURES...
	getHeadsPicture()
	{
		return STORAGE.buyCoinFront_mp;
	}

	getTailsPicture()
	{
		return STORAGE.buyCoinFront_mp;
	}

	getRibPicture()
	{
		return STORAGE.buyCoinRib_mp;
	}

	getMiddlePicture()
	{
		return STORAGE.buyCoinMiddle_mp;
	}

	getShadowPicture()
	{
		return STORAGE.buyCoinShadow_mp;
	}
	//...PICTURES
}