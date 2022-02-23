class MReelView extends MView
{
	static get WIDTH() 					{ return MReelsView.WIDTH / MReelsModel.REELS_COUNT }
	static get HEIGHT() 				{ return MReelsView.HEIGHT }
	
	static get SPIN_SPEED_DEFAULT() 	{ return 15 }
	static get SPIN_SPEED_FAST() 		{ return 35 }
	static get SPIN_SPEED_CASCADE() 	{ return 10 }
	
	static get STATE_ID_IDLE() 					{ return 0 }
	static get STATE_ID_START_SPIN() 			{ return 1 }
	static get STATE_ID_SPIN()	 				{ return 2 }
	static get STATE_ID_FINISH_SPIN_REQUIRED() 	{ return 3 }
	static get STATE_ID_FINISH_SPIN() 			{ return 4 }

	static get STATE_ID_CASCADE() 				{ return 5 }
	static get STATE_ID_FINISH_CASCADE() 		{ return 6 }

	constructor()
	{
		super();

		this._fIconsContainer_mdc = this.addChild(new MDisplayContainer(0, 0, MReelView.WIDTH, MReelView.HEIGHT))
		this._fTranslateOffset_num = 0;
		this._fStateId_int = undefined;
		this._fTargetRowIndex_int = 0;
		this._fIconCellViews_micv_arr = [];
		this._fSpinSpeed_num = MReelView.SPIN_SPEED_DEFAULT;
		this._fTensionView_mtv = null;

		this._fCascadeTargetCellIndex_int = undefined;
		this._fCascadeNextSymbolId_int = undefined;

		//EXPAND HORIZONTAL VISIBLE SPACE TO PREVENT ICONS CUT IN MOTION...
		this._fIconsContainer_mdc.setPadding(
			MReelView.WIDTH / 4,
			MReelView.WIDTH / 4,
			0,
			0);
		//EXPAND HORIZONTAL VISIBLE SPACE TO PREVENT ICONS CUT IN MOTION...
	}


	init()
	{
		super.init();

		for( let i = -1; i < MReelModel.ICONS_PER_REEL_COUNT; i++ )
		{

			let lIconCellView_micv = new MIconCellView();
			lIconCellView_micv.setXY(MReelView.WIDTH / 2, MIconCellView.HEIGHT * i + MIconCellView.HEIGHT / 2);
			
			this._fIconsContainer_mdc.addChild(lIconCellView_micv);

			this._fIconCellViews_micv_arr.push(lIconCellView_micv);
		}

		this._fIconCellViews_micv_arr[0].setVisible(false);

		//SETTING RANDOM ICONS...
		for( let i = 0; i < this._fIconCellViews_micv_arr.length; i++ )
		{

			for(let j = 0; j < MReelsModel.SYMBOLS_IDS.length; j++ )
			{
				this._fIconCellViews_micv_arr[i].showSymbol(MReelsModel.SYMBOLS_IDS[j]);
			}

			this._fIconCellViews_micv_arr[i].showSymbol(MReelsModel.getRandomSymbolId(true, true, false));
		}

		this.setStateId(MReelView.STATE_ID_IDLE);
		//...SETTING RANDOM ICONS

	}


	setSpinSpeedDefault()
	{
		this._fSpinSpeed_num = MReelView.SPIN_SPEED_DEFAULT;
	}

	setSpinSpeedFast()
	{
		this._fSpinSpeed_num = MReelView.SPIN_SPEED_FAST;
	}

	getCell(aIndex_int)
	{
		return this._fIconCellViews_micv_arr[aIndex_int + 1];
	}

	moveIcons(aDeltaY_num)
	{
		let l_micv_arr = this._fIconCellViews_micv_arr;

		for( let i = 0; i < l_micv_arr.length; i++ )
		{
			let lIconCellView_micv = l_micv_arr[i];
			lIconCellView_micv.setY(lIconCellView_micv.getY() + aDeltaY_num);
		}

		this._fTranslateOffset_num += aDeltaY_num;

		//ON BOTTOM ICON DISAPPEARED...
		if(this._fTranslateOffset_num > MIconCellView.HEIGHT)
		{
			let lOffset_num = 0;

			//VALIDATING EXISTANT ICONS...
			for( let i = l_micv_arr.length - 1; i >= 0; i-- )
			{
				let lTargetIconIndex_int = i - 1;

				if(lTargetIconIndex_int !== -1)
				{
					l_micv_arr[i].showSymbol(l_micv_arr[lTargetIconIndex_int].getCurrentSymbolId());
				}
			}
			//...VALIDATING EXISTANT ICONS

			switch(this._fStateId_int)
			{

				//SET RANDOM FAKE ICON ON TOP WHEN SPIN...
				case MReelView.STATE_ID_SPIN:
				{
					l_micv_arr[0].showSymbol(MReelsModel.getRandomSymbolId());
					lOffset_num = Math.floor(this._fTranslateOffset_num % MIconCellView.HEIGHT)
				}
				break;
				//...SET RANDOM FAKE ICON ON TOP WHEN SPIN

				//SET ACTUAL TARGET ICON ON TOP WHEN FINISH SPIN REQUIRED...
				case MReelView.STATE_ID_FINISH_SPIN_REQUIRED:
				{
					let lReelsModel_mrm = MAIN.getReelsController().getModel();
					let lReelIndex_int = this.getModel().getReelIndex();

					if(this._fTargetRowIndex_int >= 0)
					{
						l_micv_arr[0].showSymbol(lReelsModel_mrm.getSymbolId(lReelIndex_int, this._fTargetRowIndex_int));
					}
					else if(this._fTargetRowIndex_int === -1)
					{
						l_micv_arr[0].showSymbol(MReelsModel.getRandomSymbolId());
						this.setStateId(MReelView.STATE_ID_FINISH_SPIN);
						lOffset_num = 0;
					}

					this._fTargetRowIndex_int--;
				}
				break;
				//...SET ACTUAL TARGET ICON ON TOP WHEN FINISH SPIN REQUIRED
			}

			for( let i = 0; i < l_micv_arr.length; i++ )
			{
				let l_micv = l_micv_arr[i];

				l_micv.setY( MIconCellView.HEIGHT * (i - 1) + MIconCellView.HEIGHT / 2  + lOffset_num);			
			}

			this._fTranslateOffset_num = lOffset_num;
		}
		//ON BOTTOM ICON DISAPPEARED...
	}


	moveCascadeIcons(aDeltaY_num)
	{
		let l_micv_arr = this._fIconCellViews_micv_arr;

		for( let i = 0; i <= this._fCascadeTargetCellIndex_int; i++ )
		{
			let lIconCellView_micv = l_micv_arr[i];
			lIconCellView_micv.setY(lIconCellView_micv.getY() + aDeltaY_num);
		}

		this._fTranslateOffset_num += aDeltaY_num;

		//ON BOTTOM ICON DISAPPEARED...
		if(this._fTranslateOffset_num >= MIconCellView.HEIGHT)
		{
			let lOffset_num = 0;

			//VALIDATING EXISTANT ICONS...
			for( let i = this._fCascadeTargetCellIndex_int; i >= 0; i-- )
			{
				let lTargetIconIndex_int = i - 1;

				if(lTargetIconIndex_int !== -1)
				{
					l_micv_arr[i].showSymbol(l_micv_arr[lTargetIconIndex_int].getCurrentSymbolId());
				}
			}
			//...VALIDATING EXISTANT ICONS

			this.restoreIcons();

			//SET RANDOM FAKE ICON ON TOP...
			l_micv_arr[0].showSymbol(MReelsModel.getRandomSymbolId());
			//...SET RANDOM FAKE ICON ON TOP

			for( let i = 0; i < l_micv_arr.length; i++ )
			{
				let l_micv = l_micv_arr[i];

				l_micv.setY( MIconCellView.HEIGHT * (i - 1) + MIconCellView.HEIGHT / 2);			
			}

			this.setStateId(MReelView.STATE_ID_FINISH_CASCADE);
			this._fTranslateOffset_num = 0;
		}
		//ON BOTTOM ICON DISAPPEARED...
	}

	
	onNextFrames(aFramesCount_num)
	{
		switch(this._fStateId_int)
		{
			case MReelView.STATE_ID_IDLE:
			{

			}
			break;
			case MReelView.STATE_ID_START_SPIN:
			{

			}
			break;
			case MReelView.STATE_ID_SPIN:
			case MReelView.STATE_ID_FINISH_SPIN_REQUIRED:
			{
				let lTranslateDelta_num = this._fSpinSpeed_num * aFramesCount_num;

				this.moveIcons(lTranslateDelta_num);
			}
			break;
			case MReelView.STATE_ID_FINISH_SPIN:
			{

			}
			break;

			case MReelView.STATE_ID_CASCADE:
			{
				let lTranslateDelta_num = MReelView.SPIN_SPEED_CASCADE * aFramesCount_num;

				this.moveCascadeIcons(lTranslateDelta_num);
			}
			break;
		}
	}

	setStateId(aStateId_int)
	{
		if(this._fStateId_int === aStateId_int)
		{
			return;
		}

		this._fStateId_int = aStateId_int;

		switch(aStateId_int)
		{
			case MReelView.STATE_ID_IDLE:
			{
				this._fTranslateOffset_num = 0;
			}
			break;
			case MReelView.STATE_ID_START_SPIN:
			{
				this._fIconsContainer_mdc.setClippingMode(true);
				this.setStateId(MReelView.STATE_ID_SPIN);

				this._fIconCellViews_micv_arr[0].setVisible(true);

				for(let i = 0; i < this._fIconCellViews_micv_arr.length; i++ )
				{
					this._fIconCellViews_micv_arr[i].onStartSpin();
				}
			}
			break;
			case MReelView.STATE_ID_SPIN:
			{

			}
			break;
			case MReelView.STATE_ID_FINISH_SPIN_REQUIRED:
			{
				this._fTargetRowIndex_int = MReelModel.ICONS_PER_REEL_COUNT - 1;
			}
			break;
			case MReelView.STATE_ID_FINISH_SPIN:
			{
				this._fIconsContainer_mdc.setClippingMode(false);
				this._fIconCellViews_micv_arr[0].setVisible(false);

				for(let i = 1; i < this._fIconCellViews_micv_arr.length; i++ )
				{
					this._fIconCellViews_micv_arr[i].onFinishSpin();
				}
			}
			break;
			case MReelView.STATE_ID_CASCADE:
			{
				this._fIconsContainer_mdc.setClippingMode(true);
				this._fIconCellViews_micv_arr[0].setVisible(true);
				this._fIconCellViews_micv_arr[0].showSymbol(this._fCascadeNextSymbolId_int);

				let lCascadeCell_micv = this._fIconCellViews_micv_arr[this._fCascadeTargetCellIndex_int];
				let lCascadeUpperCell_micv = this._fIconCellViews_micv_arr[this._fCascadeTargetCellIndex_int - 1];
				
				lCascadeCell_micv.showSymbol(lCascadeUpperCell_micv.getCurrentSymbolId());
				lCascadeCell_micv.setY(lCascadeUpperCell_micv.getY());

				this.restoreIcons();
			}
			break;

			case MReelView.STATE_ID_FINISH_CASCADE:
			{
				this._fIconsContainer_mdc.setClippingMode(false);
				this._fIconCellViews_micv_arr[0].setVisible(false);

				for( let i = 0; i <= this._fCascadeTargetCellIndex_int; i++ )
				{
					this._fIconCellViews_micv_arr[i].onFinishCascade();
				}
			}
			break;
		}
	}

	restoreIcons()
	{
		for( let i = 0; i < this._fIconCellViews_micv_arr.length; i++ )
		{
			this._fIconCellViews_micv_arr[i].restore();
		}
	}


	getStateId()
	{
		return this._fStateId_int;
	}


	getTensionView()
	{
		if(!this._fTensionView_mtv)
		{
			this._fTensionView_mtv = this.addChild(new MTensionView());
		}

		return this._fTensionView_mtv;
	}


	cascade(aCascadeTargetCellIndex_int, aNextSymbolId_int)
	{
		this._fCascadeNextSymbolId_int = aNextSymbolId_int;
		this._fCascadeTargetCellIndex_int = aCascadeTargetCellIndex_int + 1;
		
		this._fIconCellViews_micv_arr[aCascadeTargetCellIndex_int].hideAllSymbols();
		this.setStateId(MReelView.STATE_ID_CASCADE);
	}
}