class MIconCellView extends MView
{
	static get WIDTH()		{ return 245 };
	static get HEIGHT()		{ return 184 };

	constructor()
	{
		super(0, 0, MIconCellView.WIDTH, MIconCellView.HEIGHT);

		this._fIconViews_miv_arr = [];
		this._fCurrentSymbolId_int = 0;
		this._fWinFlash_mdo = this.addChild(new MDisplayObject(STORAGE.winGlow_mp));
		this._fIconsContainer_mdc = this.addChild(new MDisplayContainer());
		this._fPayoutTabloidView_mtv = this.addChild(this.generatePayoutTabloid());
		this._fIconParticlesPoolView_mippv = this.addChild(new MIconParticlesPoolView());
		this._fPrimarayWinIntroAnimation_mt = null;
		this._fPrimarayWinOutroAnimation_mt = null;
		this._fNonPrimarayWinIntroAnimation_mt = null;
		this._fNonPrimarayWinOutroAnimation_mt = null;
		this._fFreeSpinsAwardAnimation_mt = null;



		this._fWinFlash_mdo.setRegPointToCenter();
		this._fWinFlash_mdo.setAlpha(0);
		this._fIconParticlesPoolView_mippv.setAlpha(0);
		this._fPayoutTabloidView_mtv.setScale(0);

		//VFX LEVEL...
		this._fWinFlash_mdo.setVFXLevel(0.25);
		//...VFX LEVEL





		//ANIMATIONS...
		//_________________________________
		//PRIMARY WIN...
		//INTRO...
		let l_mt = new MTimeLine();

		l_mt.addAnimation(
			this._fWinFlash_mdo,
			MTimeLine.SET_Y,
			0,
				[
					5,
					[-500, 20],
				]
			);

		l_mt.addAnimation(
			this._fWinFlash_mdo,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 5],
					[0, 10],
				]
			);

		l_mt.addAnimation(
			this._fIconParticlesPoolView_mippv,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 5],
				]
			);

		this._fPrimarayWinIntroAnimation_mt = l_mt;
		//...INTRO

		//OUTRO...
		l_mt = new MTimeLine();

		l_mt.addAnimation(
			this._fIconParticlesPoolView_mippv,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 5],
				]
			);

		this._fPrimarayWinOutroAnimation_mt = l_mt;
		//...OUTRO
		//...PRIMARY WIN
		//_________________________________





		//_________________________________
		//NON PRIMARY WIN...
		//INTRO...
		l_mt = new MTimeLine();

		l_mt.addAnimation(
			this._fIconParticlesPoolView_mippv,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 5],
				]
			);

		l_mt.addAnimation(
			this._fPayoutTabloidView_mtv,
			MTimeLine.SET_SCALE_X,
			0,
				[
					[1.1, 5],
					[1, 3],
				]
			);
		l_mt.addAnimation(
			this._fPayoutTabloidView_mtv,
			MTimeLine.SET_SCALE_Y,
			0,
				[
					[1, 8],
				]
			);

		this._fNonPrimarayWinIntroAnimation_mt = l_mt;
		//...INTRO

		//OUTRO...
		l_mt = new MTimeLine();

		l_mt.addAnimation(
			this._fIconParticlesPoolView_mippv,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 5],
				]
			);

		l_mt.addAnimation(
			this._fPayoutTabloidView_mtv,
			MTimeLine.SET_SCALE,
			1,
				[
					[0, 5],
				]
			);

		this._fNonPrimarayWinOutroAnimation_mt = l_mt;
		//...OUTRO
		//...NON PRIMARY WIN
		//_________________________________






		//_________________________________
		//FREE SPINS AWARD...
		l_mt = new MTimeLine();

		l_mt.addAnimation(
			this._fIconParticlesPoolView_mippv,
			MTimeLine.SET_ALPHA,
			0,
				[
					35,
					[1, 5],
				]
			);
		this._fFreeSpinsAwardAnimation_mt = l_mt;
		//...FREE SPINS AWARD
		//_________________________________
		//...ANIMATIONS

	}



	//GETTERS...
	generatePayoutTabloid()
	{
		let lTabloidView_mtv = new MTabloidView(STORAGE.winDigits_mp, "0123456789,.", this.getWidth(), 110);
		lTabloidView_mtv.setY(MIconCellView.HEIGHT / 2);
		lTabloidView_mtv.setVerticalLayoutMode(MTabloidView.VERTICAL_LAYOUT_MODE_ID_BOTTOM);

		return lTabloidView_mtv;
	}

	getCurrentSymbolId()
	{
		return this._fCurrentSymbolId_int;
	}
	//...GETTERS

	hideAllSymbols()
	{
		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			if(l_miv_arr[i])
			{
				l_miv_arr[i].setVisible(false);
			}
		}
	}

	showSymbol(aSymbolId_int)
	{
		this._fCurrentSymbolId_int = aSymbolId_int;

		let l_miv_arr = this._fIconViews_miv_arr;

		if(!l_miv_arr[aSymbolId_int])
		{
			//CREATING NEW ICON INSTANCE...
			let lIconView_miv = undefined;
			
			switch(aSymbolId_int)
			{
				case MReelsModel.SYMBOL_ID_A:
					lIconView_miv = new MIconAView();
					break;
				case MReelsModel.SYMBOL_ID_J:
					lIconView_miv = new MIconJView();
					break;
				case MReelsModel.SYMBOL_ID_K:
					lIconView_miv = new MIconKView();
					break;
				case MReelsModel.SYMBOL_ID_Q:
					lIconView_miv = new MIconQView();
					break;
				case MReelsModel.SYMBOL_ID_10:
					lIconView_miv = new MIcon10View();
					break;
				case MReelsModel.SYMBOL_ID_MID_1:
					lIconView_miv = new MIconMid1View();
					break;
				case MReelsModel.SYMBOL_ID_MID_2:
					lIconView_miv = new MIconMid2View();
					break;
				case MReelsModel.SYMBOL_ID_MID_3:
					lIconView_miv = new MIconMid3View();
					break;
				case MReelsModel.SYMBOL_ID_MID_4:
					lIconView_miv = new MIconMid4View();
					break;
				case MReelsModel.SYMBOL_ID_MID_5:
					lIconView_miv = new MIconMid5View();
					break;
				case MReelsModel.SYMBOL_ID_WILD:
					lIconView_miv = new MIconWildView();
					break;
				case MReelsModel.SYMBOL_ID_SCATTER:
					lIconView_miv = new MIconScatterView();
					break;
				case MReelsModel.SYMBOL_ID_BUY_COIN:
					lIconView_miv = new MIconBuyCoinView();
					break;
				default:
					//DEBUG...
					lIconView_miv = new MBaseIconView(aSymbolId_int);
					//...DEBUG
					break;
			}

			l_miv_arr[aSymbolId_int] = lIconView_miv;
			this._fIconsContainer_mdc.addChild(l_miv_arr[aSymbolId_int]);
			//...CREATING NEW ICON INSTANCE
		}


		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			if(l_miv_arr[i])
			{
				l_miv_arr[i].setVisible(false);
			}
		}

		l_miv_arr[aSymbolId_int].setVisible(true);

		return l_miv_arr[aSymbolId_int];
	}

	//EXTERNAL CONTROL METHODS...
	setPayoutTabloidValue(aValue_int)
	{
		this._fPayoutTabloidView_mtv.displayValue(aValue_int);
	}

	//START SPIN...
	onStartSpin()
	{
		this.restore();

		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			l_miv_arr[i].onStartSpin();
		}
	}
	//...START SPIN

	//FINISH SPIN...
	onFinishSpin()
	{
		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			l_miv_arr[i].onFinishSpin();
		}
	}
	//...FINISH SPIN

	//FINISH SPIN...
	onFinishCascade()
	{
		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			l_miv_arr[i].onFinishCascade();
		}
	}
	//...FINISH SPIN

	//BLACKOUT...
	//INTRO...
	showBlackoutIntro()
	{
		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			l_miv_arr[i].showBlackoutIntro();
		}
	}
	//...INTRO

	//OUTRO...
	showBlackoutOutro()
	{
		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			l_miv_arr[i].showBlackoutOutro();
		}
	}
	//...OUTRO
	//...BLACKOUT

	//PRIMARY WIN...
	//INTRO...
	showPrimarayWinIntroPresentation()
	{
		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			l_miv_arr[i].showPrimarayWinIntroPresentation();
		}

		this._fPrimarayWinIntroAnimation_mt.play();
	}
	//...INTRO

	//OUTRO...
	showPrimarayWinOutroPresentation()
	{
		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			l_miv_arr[i].showPrimarayWinOutroPresentation();
		}

		this._fPrimarayWinOutroAnimation_mt.play();
	}
	//...OUTRO
	//...PRIMARY WIN

	//NON PRIMARY WIN...
	//INTRO...
	showNonPrimarayWinIntroPresentation()
	{
		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			l_miv_arr[i].showNonPrimarayWinIntroPresentation();
		}

		this._fNonPrimarayWinIntroAnimation_mt.play();
	}
	//...INTRO

	//OUTRO...
	showNonPrimarayWinOutroPresentation()
	{
		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			l_miv_arr[i].showNonPrimarayWinOutroPresentation();
		}

		this._fNonPrimarayWinOutroAnimation_mt.play();
	}
	//...OUTRO
	//...NON PRIMARY WIN

	//FREE SPINS AWARD...
	showFreeSpinsAwardPresentation()
	{
		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			l_miv_arr[i].showFreeSpinsAwardPresentation();
		}

		this._fFreeSpinsAwardAnimation_mt.play();
	}
	//...FREE SPINS AWARD

	restore()
	{
		this._fIconParticlesPoolView_mippv.setAlpha(0);

		let l_miv_arr = this._fIconViews_miv_arr;

		for( let i = 0; i < l_miv_arr.length; i++ )
		{
			l_miv_arr[i].restore();
		}
	}
	//...EXTERNAL CONTROL METHODS
}