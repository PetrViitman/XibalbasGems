class MPicture
{
	constructor(aPath_str)
	{
		this._fSourceImage_img = null;
		this._fWidth_int = undefined;
		this._fHeight_int = undefined;
		this._fSidesRatioW_num = undefined;
		this._fSidesRatioH_num = undefined;
		this._fSourcePath_str = aPath_str;
	}
	
	startLoading()
	{
		let lImage_img = new Image();
		lImage_img.src = this._fSourcePath_str;
		lImage_img.onload = this.onLoadingCompleted.bind(this);

		this._fSourceImage_img = lImage_img;
	}

	onLoadingCompleted()
	{

		this._fWidth_int = this._fSourceImage_img.width;
		this._fHeight_int = this._fSourceImage_img.height;

		if(this._fWidth_int > this._fHeight_int)
		{
			this._fSidesRatioW_num = this._fWidth_int / this._fHeight_int;
			this._fSidesRatioH_num = 1;
		}
		else
		{
			this._fSidesRatioW_num = 1;
			this._fSidesRatioH_num = this._fHeight_int / this._fWidth_int;
		}

		STORAGE.onSomeImageLoaded();
	}

	getWidth()
	{
		return this._fWidth_int;
	}

	getHeight()
	{
		return this._fHeight_int;
	}

	getSidesRatioW()
	{
		return this._fSidesRatioW_num;
	}

	getSidesRatioH()
	{
		return this._fSidesRatioH_num;
	}

	getSourceImage()
	{
		return this._fSourceImage_img;
	}

	getSourcePath()
	{
		return this._fSourcePath_str;
	}
}