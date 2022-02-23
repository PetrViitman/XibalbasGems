class MTabloidView extends MView
{
	static get VERTICAL_LAYOUT_MODE_ID_TOP() { return 0 }
	static get VERTICAL_LAYOUT_MODE_ID_CENTER() { return 1 }
	static get VERTICAL_LAYOUT_MODE_ID_BOTTOM() { return 2 }

	constructor(aSourcePicture, aAvailableSymbols_str, aOptMaximalWidth_int, aOptMaximalHeight_int, aOptSpacing_int)
	{
		super();

		this._fSourcePicture_mp = aSourcePicture;
		this._fAvailableSymbols_str = aAvailableSymbols_str;
		this._fCells_mtscv_arr = [];

		this._fCurrentSymbols_str = "";
		this._fMaximalWidth_int = aOptMaximalWidth_int;
		this._fMaximalHeight_int = aOptMaximalHeight_int;
		this._fSpacing_int = aOptSpacing_int;
		this._fTargetScale_num = 1;
		this._fVerticalLayoutModeId_int = MTabloidView.VERTICAL_LAYOUT_MODE_ID_CENTER;

		this._fContentContainer_mdc = this.addChild(new MDisplayContainer());
	}

	setVerticalLayoutMode(aModeId_int)
	{
		this._fVerticalLayoutModeId_int = aModeId_int;
	}

	getTabloidSymbol(aIndex_int)
	{
		if(!this._fCells_mtscv_arr[aIndex_int])
		{
			let l_mtscv = new MTabloidSymbolCellView(
				this._fSourcePicture_mp,
				this._fAvailableSymbols_str,
				this._fSpacing_int);
			
			this._fCells_mtscv_arr[aIndex_int] = l_mtscv;
			this._fContentContainer_mdc.addChild(l_mtscv);
		}

		return this._fCells_mtscv_arr[aIndex_int];
	}

	displayValue(aCents_num, aOptFormatMoneyRequired_bl = true)
	{
		let lCents_int = Math.trunc(aCents_num)

		this._fTargetScale_num = 1;

		if(aOptFormatMoneyRequired_bl)
		{
			this._fCurrentSymbols_str = this.formatMoney(lCents_int);
		}
		else
		{
			this._fCurrentSymbols_str = aCents_num + "";
		}
		
		let aSymbols_str = this._fCurrentSymbols_str;
		let l_mdc = this._fContentContainer_mdc;

		for( let i = 0; i < this._fCells_mtscv_arr.length; i++ )
		{
			this.getTabloidSymbol(i).setVisible(i < aSymbols_str.length);
		}


		let lTotalWidth_int = 0;
		let lTotalHeight_int = this._fSourcePicture_mp.getHeight();

		for( let i = 0; i < aSymbols_str.length; i++ )
		{
			let l_mtscv = this.getTabloidSymbol(i);
			let lWidth_num = l_mtscv.getWidth();

			l_mtscv.showSymbol(aSymbols_str[i]);
			l_mtscv.setX(lWidth_num * i);

			lTotalWidth_int += lWidth_num;
		}

		if(
			this._fMaximalWidth_int !== undefined &&
			lTotalWidth_int > this._fMaximalWidth_int
			)
		{
			this._fTargetScale_num = this._fMaximalWidth_int / lTotalWidth_int;
		}

		if(this._fMaximalHeight_int !== undefined &&
			(lTotalHeight_int * this._fTargetScale_num) > this._fMaximalHeight_int)
		{
			this._fTargetScale_num *= this._fMaximalHeight_int / lTotalHeight_int;
		}

		l_mdc.setScale(this._fTargetScale_num);

		let lY_int = undefined;

		switch(this._fVerticalLayoutModeId_int)
		{
			case MTabloidView.VERTICAL_LAYOUT_MODE_ID_CENTER:
				lY_int = -lTotalHeight_int / 2 * this._fTargetScale_num;
				break;
			case MTabloidView.VERTICAL_LAYOUT_MODE_ID_BOTTOM:
				lY_int = -lTotalHeight_int * this._fTargetScale_num;
				break;
			case MTabloidView.VERTICAL_LAYOUT_MODE_ID_TOP:
				lY_int = +lTotalHeight_int / 2 * this._fTargetScale_num;
				break;
		}

		l_mdc.setXY(
			-lTotalWidth_int / 2 * this._fTargetScale_num,
			lY_int);
	}

	formatMoney(aCents_int)
	{
		let lRemainingCents_str = (aCents_int % 100) + "";
		
		if(lRemainingCents_str.length < 2)
		{
			lRemainingCents_str += "0";
		}

		return (Math.trunc(aCents_int / 100) + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + lRemainingCents_str;
	}
}