class MBackgroundView extends MView
{
	constructor()
	{
		super(0, 0, 1920, 1080);

		this._fBackgroundImage_mdo = null;
		this._fBackgroundLight_mdo = null;
		this._fCoinsPool_mbcpv = null;
		this._fChipsPool_mbcpv = null;
		this._fJellyfishPool_mbjpv = null;
		this._fFloatingParticles_mfppv = null;
		this._fXibalbaView_mxv = null;
		this._fLogoView_mlv = null;
		this._fReelsBackgroundView_mrbv = null;
		this._fHighlightIntroAnimation_mt = null;
		this._fHighlightOutroAnimation_mt = null;
	}

	init()
	{
		super.init();
		this.addToDisplay();
		
		//BACKGROUND...
		let lBackgroundImage_mdo = new MDisplayObject(STORAGE.background_mp);
		lBackgroundImage_mdo.forceAliasing();
		this._fBackgroundImage_mdo = this.addChild(lBackgroundImage_mdo);
		//...BACKGROUND

		//LIGHT...
		let lBackgroundLight_mdo = new MDisplayObject(STORAGE.backgroundLight_mp);
		lBackgroundLight_mdo.setAlpha(0);
		lBackgroundLight_mdo.forceAliasing(this);
		lBackgroundLight_mdo.setVFXLevel(0.25);
		this._fBackgroundLight_mdo = this.addChild(lBackgroundLight_mdo);
		//...LIGHT


		//REELS BACKGROUND...
		this._fReelsBackgroundView_mrbv = new MReelsBackgroundView();
		//...REELS BACKGROUND

		//FISHES...
		this._fFishGroupsView_mfgv = new MFishGroupsView();
		//...FISHES

		//BUBBLES...
		this._fBubblePool_mbpv = new MBubblePoolView();
		//...BUBBLES

		//COINS...
		this._fCoinsPool_mbcpv = new MBackgroundCoinsPoolView(this._fBubblePool_mbpv);
		//...COINS

		//CHIPS...
		this._fChipsPool_mbcpv = new MBackgroundChipsPoolView(this._fBubblePool_mbpv);
		//...CHIPS

		//XIBALBA...
		let l_mxv = new MXibalbaView();
		this._fXibalbaView_mxv = l_mxv;
		//...XIBALBA

		//JELLYFISH...
		this._fJellyfishPool_mbjpv = new MBackgroundJellyfishPoolView();
		//...JELLYFISH

		//FLOATING PARTICLES...
		this._fFloatingParticles_mfppv = new MFloatingParticlePoolView();
		//...FLOATING PARTICLES

		//LOGO...
		let l_mlv = new MLogoView();
		this._fLogoView_mlv = l_mlv;
		//...LOGO

		//HIGHLIGHT ANIMATIONS...
		//INTRO...
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fBackgroundLight_mdo,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 10],
				]
			);
		l_mt.addAnimation(
			this._fReelsBackgroundView_mrbv,
			MTimeLine.SET_ALPHA,
			0.62,
				[
					[0.7, 10],
				]
			);
		this._fHighlightIntroAnimation_mt = l_mt;
		//...INTRO

		//OUTRO...
		l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fBackgroundLight_mdo,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 10],
				]
			);
		l_mt.addAnimation(
			this._fReelsBackgroundView_mrbv,
			MTimeLine.SET_ALPHA,
			0.7,
				[
					[0.62, 10],
				]
			);

		this._fHighlightOutroAnimation_mt = l_mt;
		//...OUTRO
		//...HIGHLIGHT ANIMATIONS


		this.setFreeSpinsMode(false);
	}

	//EXTERNAL CONTROL METHODS...
	startHighlightIntroAnimation()
	{
		this._fHighlightIntroAnimation_mt.play();
		this._fXibalbaView_mxv.onSpinStart();
	}

	startHighlightOutroAnimation()
	{
		this._fHighlightOutroAnimation_mt.play();
		this._fXibalbaView_mxv.onSpinFinish();
	}

	setFreeSpinsMode(aIsFreeSpinsMode_bl)
	{
		this._fXibalbaView_mxv.setFreeSpinsMode(aIsFreeSpinsMode_bl);

		this._fHighlightIntroAnimation_mt.setLocked(aIsFreeSpinsMode_bl);
		this._fHighlightOutroAnimation_mt.setLocked(aIsFreeSpinsMode_bl);
		this._fCoinsPool_mbcpv.setVisible(!aIsFreeSpinsMode_bl);
		this._fChipsPool_mbcpv.setVisible(aIsFreeSpinsMode_bl);
		this._fJellyfishPool_mbjpv.setVisible(aIsFreeSpinsMode_bl);
	}
	//...EXTERNAL CONTROL METHODS

	//RESPONSIVE DESIGN...
	updateTargetArea(aSidesRatio_num)
	{
		this.setFillMode(MDisplayContainer.FILL_MODE_ID_FULL);
		
		if(aSidesRatio_num > 1)
		{
			this.setTargetArea(0, 0, 1, 0.95);
		}
		else
		{
			let lHeight_num = 1.25 * aSidesRatio_num;

			if(lHeight_num > 0.95)
			{
				lHeight_num = 0.95;
			}
			else if(lHeight_num < 0.65)
			{
				lHeight_num = 0.65;
			}

			this.setTargetArea(0, 0, 1, lHeight_num);
		}
	}
	//...RESPONSIVE DESIGN
}