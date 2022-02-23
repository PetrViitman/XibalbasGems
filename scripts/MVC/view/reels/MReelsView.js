class MReelsView extends MView
{
	static get WIDTH() 		{ return MIconCellView.WIDTH * MReelsModel.REELS_COUNT + 120}
	static get HEIGHT() 	{ return MIconCellView.HEIGHT * MReelModel.ICONS_PER_REEL_COUNT }

	constructor()
	{
		super(0, 0, MReelsView.WIDTH, MReelsView.HEIGHT);
		
		this._fReelViews_mrv_arr = [];
	}

	init()
	{
		this.addToDisplay();

		for( let i = 0; i < MReelsModel.REELS_COUNT; i++ )
		{
			let lReel_mrv = this.getController().getReelController(i).getView();
			lReel_mrv.setX(MReelView.WIDTH * i);

			this.addChild(lReel_mrv);

			this._fReelViews_mrv_arr[i] = lReel_mrv;
		}

	}

	getReelView(aReelIndex_int)
	{
		return this._fReelViews_mrv_arr[aReelIndex_int];
	}

	isSpinning()
	{
		for ( let i = 0; i < MReelsModel.REELS_COUNT; i++ )
		{

			let lStateId_int = this._fReelViews_mrv_arr[i].getStateId();

			switch(lStateId_int)
			{
				case MReelView.STATE_ID_START_SPIN:
				case MReelView.STATE_ID_SPIN:
				case MReelView.STATE_ID_FINISH_SPIN_REQUIRED:
					return true;
			}
		}

		return false;
	}


	//EXTERNAL CONTROL METHODS...
	//PRIMARY WIN PRESENTATION...
	//INTRO...
	showPrimarayWinIntroPresentation(aMap_int_arr_arr)
	{
		for ( let x = 0; x < MReelsModel.REELS_COUNT; x++ )
		{
			for( let y = 0; y < MReelModel.ICONS_PER_REEL_COUNT; y++ )
			{
				let lIconCellView_micv = this._fReelViews_mrv_arr[x].getCell(y);
				let lIsWinCell_bl = (aMap_int_arr_arr[y][x] === 1);

				if(lIsWinCell_bl)
				{
					lIconCellView_micv.showPrimarayWinIntroPresentation();
				}
				else
				{
					lIconCellView_micv.showBlackoutIntro();
				}
			}
		}
	}
	//...INTRO

	//OUTRO...
	showPrimarayWinOutroPresentation(aMap_int_arr_arr)
	{
		for ( let x = 0; x < MReelsModel.REELS_COUNT; x++ )
		{
			for( let y = 0; y < MReelModel.ICONS_PER_REEL_COUNT; y++ )
			{
				let lIconCellView_micv = this._fReelViews_mrv_arr[x].getCell(y);
				let lIsWinCell_bl = (aMap_int_arr_arr[y][x] === 1);

				if(lIsWinCell_bl)
				{
					lIconCellView_micv.showPrimarayWinOutroPresentation();
				}
				else
				{
					lIconCellView_micv.showBlackoutOutro();
				}
			}
		}
	}
	//...OUTRO
	//...PRIMARY WIN PRESENTATION

	//NON PRIMARY WIN PRESENTATION...
	//INTRO...
	showNonPrimarayWinIntroPresentation(aMap_int_arr_arr, aPayoutCentsCount_int)
	{
		for ( let x = 0; x < MReelsModel.REELS_COUNT; x++ )
		{
			for( let y = 0; y < MReelModel.ICONS_PER_REEL_COUNT; y++ )
			{
				let lIconCellView_micv = this._fReelViews_mrv_arr[x].getCell(y);
				let lIsWinCell_bl = (aMap_int_arr_arr[y][x] === 1);

				if(lIsWinCell_bl)
				{
					lIconCellView_micv.showNonPrimarayWinIntroPresentation();

					if(x === 0)
					{

						lIconCellView_micv.setPayoutTabloidValue(aPayoutCentsCount_int);
					}
				}
				else
				{
					lIconCellView_micv.showBlackoutIntro();
				}
			}
		}
	}
	//...INTRO

	//OUTRO...
	showNonPrimarayWinOutroPresentation(aMap_int_arr_arr)
	{
		for ( let x = 0; x < MReelsModel.REELS_COUNT; x++ )
		{
			for( let y = 0; y < MReelModel.ICONS_PER_REEL_COUNT; y++ )
			{
				let lIconCellView_micv = this._fReelViews_mrv_arr[x].getCell(y);
				let lIsWinCell_bl = (aMap_int_arr_arr[y][x] === 1);

				if(lIsWinCell_bl)
				{
					lIconCellView_micv.showNonPrimarayWinOutroPresentation();
				}
				else
				{
					lIconCellView_micv.showBlackoutOutro();
				}
			}
		}
	}
	//...OUTRO
	//...NON PRIMARY WIN PRESENTATION

	//FREE SPINS AWARD...
	showFreeSpinsAwardPresentation(aMap_int_arr_arr)
	{
		for ( let x = 0; x < MReelsModel.REELS_COUNT; x++ )
		{
			for( let y = 0; y < MReelModel.ICONS_PER_REEL_COUNT; y++ )
			{
				let lIconCellView_micv = this._fReelViews_mrv_arr[x].getCell(y);

				let lIsWinCell_bl = (aMap_int_arr_arr[y][x] === 1);

				if(lIsWinCell_bl)
				{
					lIconCellView_micv.showFreeSpinsAwardPresentation();
				}
				else
				{
					lIconCellView_micv.showBlackoutIntro();
				}
			}
		}
	}

	restoreIcons()
	{
		for ( let x = 0; x < MReelsModel.REELS_COUNT; x++ )
		{
			this._fReelViews_mrv_arr[x].restoreIcons();
		}
	}
	//...FREE SPINS AWARD
	//...EXTERNAL CONTROL METHODS



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