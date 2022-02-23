class MStorageBaseClass
{
	constructor()
	{
		this._fAssets_arr = [];
		this._fLoadedAssetsCount_int = 0;

		this.initLoadingQueue();

		for( let i = 0; i < this._fAssets_arr.length; i++)
		{
			this._fAssets_arr[i].startLoading();
		}

		//DEBUG...
		if(this.isLoadingCompleted())
		{
			window.setTimeout(this.onSomeImageLoaded.bind(this), 2);
		}
		//...DEBUG
	}

	//DEBUG...
	getPictureByIndex(aIndex_int)
	{
		return this._fAssets_arr[aIndex_int]
	}
	//...DEBUG

	initLoadingQueue()
	{

	}

	initPicture(aPath_str)
	{
		let lPicture_mp = new MPicture("assets/images/" + aPath_str);
		this._fAssets_arr.push(lPicture_mp);

		return lPicture_mp;
	}

	onSomeImageLoaded()
	{
		this._fLoadedAssetsCount_int++;

		if(this.isLoadingCompleted())
		{
			MAIN.onLoadingCompleted();
		}
	}

	getLoadingProgress()
	{
		if(this._fAssets_arr.length === 0)
		{
			return 1;
		}

		return this._fLoadedAssetsCount_int / this._fAssets_arr.length;
	}

	isLoadingCompleted()
	{
		return this.getLoadingProgress() >= 1;
	}
}