class MTabloidSymbolCellView extends MDisplayContainer
{
	constructor(aSourcePicture_mp, aAvailableSymbols_str, aOptSpacing_int = 0)
	{
		super();

		this._fAvaliableSymbols_str = aAvailableSymbols_str;
		this._fSourceImage_mdo = this.addChild(new MDisplayObject(aSourcePicture_mp));
		this._fDigitWidth_int = aSourcePicture_mp.getWidth() / aAvailableSymbols_str.length;
		this._fSpacingOffsetX_int = Math.trunc(aOptSpacing_int / 2);

		this.setWidth(this._fDigitWidth_int + aOptSpacing_int);
		this.setHeight(aSourcePicture_mp.getHeight());

		this.setClippingMode(true);


	}

	showSymbol(aSymbol_str)
	{
		let lIndex_int = this._fAvaliableSymbols_str.indexOf(aSymbol_str);

		this._fSourceImage_mdo.setX(-lIndex_int * this._fDigitWidth_int + this._fSpacingOffsetX_int);
	}


}