class MBaseIconView extends MView
{
	constructor(aSymbolId_int)
	{
		super();

		this._fSymbolId_int = aSymbolId_int;
		this._fContentWrapperContainer_mdc = this.addChild(new MDisplayContainer());
		this._fContentContainer_mdc = this._fContentWrapperContainer_mdc.addChild(new MDisplayContainer());
		
		this._fBodyContainer_mdc = this._fContentContainer_mdc.addChild(this.generateBody());
		this._fBlackoutContainer_mdc = this._fContentContainer_mdc.addChild(this.generateBlackout());
		this._fGlowContainer_mdc = this._fContentContainer_mdc.addChild(this.generateGlow());
		this._fTensionContainer_mdc = this._fContentContainer_mdc.addChild(this.generateTensionContainer());
		this._fFreeSpinsAwardContainer_mdc = this._fContentContainer_mdc.addChild(this.generateFreeSpinsAwardContainer());
		this._fSpecialEffectsContainer_mdc = this._fContentContainer_mdc.addChild(this.generateSpecialEffectsContainer());
		
		this._fConstantLoopAnimation_mt = this.generateConstantLoopAnimation();
		this._fStartSpinAnimation_mt = this.generateStartSpinAnimation();
		this._fFinishSpinAnimation_mt = this.generateFinishSpinAnimation();
		this._fFinishCascadeAnimation_mt = this.generateFinishCascadeAnimation(); 
		this._fBlackoutIntroAnimation_mt = this.generateBlackoutIntroAnimation();
		this._fBlackoutOutroAnimation_mt = this.generateBlackoutOutroAnimation();

		this._fPrimarayWinIntroAnimation_mt = this.generatePrimarayWinIntroAnimation();
		this._fPrimarayWinOutroAnimation_mt = this.generatePrimarayWinOutroAnimation();
		this._fNonPrimarayWinIntroAnimation_mt = this.generateNonPrimarayWinIntroAnimation();
		this._fNonPrimarayWinOutroAnimation_mt = this.generateNonPrimarayWinOutroAnimation();
		this._fFreeSpinsAwardAnimation_mt = this.generateFreeSpinsAwardAnimation();
		

		this._fConstantLoopAnimation_mt.play(MAnimation.ANIMATION_PLAY_MODE_ID_LOOP);
	

		this._fBlackoutContainer_mdc && this._fBlackoutContainer_mdc.setAlpha(0);
		this._fGlowContainer_mdc && this._fGlowContainer_mdc.setAlpha(0);



		//VFX LEVEL...
		this._fGlowContainer_mdc.setVFXLevel(0.25);
		this._fTensionContainer_mdc.setVFXLevel(0.25);
		this._fFreeSpinsAwardContainer_mdc.setVFXLevel(0.5);
		//...VFX LEVEL
	}

	generateBody()
	{
		let lPicture_mp = null;

		switch(this._fSymbolId_int)
		{
			case MReelsModel.SYMBOL_ID_A:
				lPicture_mp = STORAGE.iconA_mp;
				break;
			case MReelsModel.SYMBOL_ID_J:
				lPicture_mp = STORAGE.iconJ_mp;
				break;
			case MReelsModel.SYMBOL_ID_Q:
				lPicture_mp = STORAGE.iconQ_mp;
				break;
			case MReelsModel.SYMBOL_ID_K:
				lPicture_mp = STORAGE.iconK_mp;
				break;
			case MReelsModel.SYMBOL_ID_10:
				lPicture_mp = STORAGE.icon10_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_1:
				lPicture_mp = STORAGE.iconBat_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_2:
				lPicture_mp = STORAGE.iconFist_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_3:
				lPicture_mp = STORAGE.iconTurtle_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_4:
				lPicture_mp = STORAGE.iconSnake_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_5:
				lPicture_mp = STORAGE.iconMeduze_mp;
				break;

			case MReelsModel.SYMBOL_ID_WILD:
				lPicture_mp = STORAGE.iconWild_mp;
				break;
			case MReelsModel.SYMBOL_ID_SCATTER:
				lPicture_mp = STORAGE.iconScatter_mp;
				break;

			default:
				console.error("unknown icon ID: ", this._fSymbolId_int);
				break;
		}

		let lDisplayObject_mdo = new MDisplayObject(lPicture_mp);

		lDisplayObject_mdo.setXY(this.getWidth()/2, this.getHeight()/2);
		lDisplayObject_mdo.setRegPointToCenter();

		return lDisplayObject_mdo;
	}

	generateGlow()
	{
		let lPictureGlow_mp = null;

		switch(this._fSymbolId_int)
		{
			case MReelsModel.SYMBOL_ID_A:
				lPictureGlow_mp = STORAGE.iconGlowA_mp;
				break;
			case MReelsModel.SYMBOL_ID_J:
				lPictureGlow_mp = STORAGE.iconGlowJ_mp;
				break;
			case MReelsModel.SYMBOL_ID_Q:
				lPictureGlow_mp = STORAGE.iconGlowQ_mp;
				break;
			case MReelsModel.SYMBOL_ID_K:
				lPictureGlow_mp = STORAGE.iconGlowK_mp;
				break;
			case MReelsModel.SYMBOL_ID_10:
				lPictureGlow_mp = STORAGE.iconGlow10_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_1:
				lPictureGlow_mp = STORAGE.iconGlowBat_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_2:
				lPictureGlow_mp = STORAGE.iconGlowFist_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_3:
				lPictureGlow_mp = STORAGE.iconGlowTurtle_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_4:
				lPictureGlow_mp = STORAGE.iconGlowSnake_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_5:
				lPictureGlow_mp = STORAGE.iconGlowMeduze_mp;
				break;
			case MReelsModel.SYMBOL_ID_WILD:
				lPictureGlow_mp = STORAGE.iconGlowWild_mp;
				break;
			case MReelsModel.SYMBOL_ID_SCATTER:
				lPictureGlow_mp = STORAGE.iconGlowScatter_mp;
				break;

			default:
				console.error("unknown icon ID: ", this._fSymbolId_int);
				break;
		}

		let lDisplayObject_mdo = new MDisplayObject(lPictureGlow_mp);

		lDisplayObject_mdo.setXY(this.getWidth()/2, this.getHeight()/2);
		lDisplayObject_mdo.setRegPointToCenter();

		return lDisplayObject_mdo;
	}

	generateBlackout()
	{
		let lPictureBlackout_mp = null;

		switch(this._fSymbolId_int)
		{
			case MReelsModel.SYMBOL_ID_A:
				lPictureBlackout_mp = STORAGE.iconBlackoutA_mp;
				break;
			case MReelsModel.SYMBOL_ID_J:
				lPictureBlackout_mp = STORAGE.iconBlackoutJ_mp;
				break;
			case MReelsModel.SYMBOL_ID_Q:
				lPictureBlackout_mp = STORAGE.iconBlackoutQ_mp;
				break;
			case MReelsModel.SYMBOL_ID_K:
				lPictureBlackout_mp = STORAGE.iconBlackoutK_mp;
				break;
			case MReelsModel.SYMBOL_ID_10:
				lPictureBlackout_mp = STORAGE.iconBlackout10_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_1:
				lPictureBlackout_mp = STORAGE.iconBlackoutBat_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_2:
				lPictureBlackout_mp = STORAGE.iconBlackoutFist_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_3:
				lPictureBlackout_mp = STORAGE.iconBlackoutTurtle_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_4:
				lPictureBlackout_mp = STORAGE.iconBlackoutSnake_mp;
				break;
			case MReelsModel.SYMBOL_ID_MID_5:
				lPictureBlackout_mp = STORAGE.iconBlackoutMeduze_mp;
				break;
			case MReelsModel.SYMBOL_ID_WILD:
				lPictureBlackout_mp = STORAGE.iconBlackoutWild_mp;
				break;
			case MReelsModel.SYMBOL_ID_SCATTER:
				lPictureBlackout_mp = STORAGE.iconBlackoutScatter_mp;
				break;

			default:
				console.error("unknown icon ID: ", this._fSymbolId_int);
				break;
		}

		let lDisplayObject_mdo = new MDisplayObject(lPictureBlackout_mp);

		lDisplayObject_mdo.setXY(
			this.getWidth()/2,
			this.getHeight()/2);

		lDisplayObject_mdo.setRegPointToCenter();

		return lDisplayObject_mdo;
	}

	generateTensionContainer()
	{
		return new MDisplayContainer();
	}

	generateFreeSpinsAwardContainer()
	{
		return new MDisplayContainer();
	}

	generateSpecialEffectsContainer()
	{
		return new MDisplayContainer();
	}

	//ANIMATIONS...
	//CONSTANT LOOP...
	generateConstantLoopAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fContentWrapperContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[-12, 25],
					[12, 50],
					[0, 25],
				]
			);

		return l_mt;
	}
	//...CONSTANT LOOP

	//START SPIN...
	generateStartSpinAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fGlowContainer_mdc,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 15],
				]
			);

		return l_mt;
	}
	//...START SPIN

	//FINISH SPIN...
	generateFinishSpinAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fGlowContainer_mdc,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 15],
				]
			);

		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_Y,
			0,
				[
					[-15, 5],
					[10, 5],
					[-5, 5],
					[0, 5],
				]
			);

		return l_mt;
	}
	//...FINISH SPIN

	//FINISH CASCADE...
	generateFinishCascadeAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_Y,
			0,
				[
					[-15, 5],
					[10, 5],
					[-5, 5],
					[0, 5],
				]
			);

		return l_mt;
	}
	//...FINISH CASCADE

	//BLACKOUT INTRO...
	generateBlackoutIntroAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fBlackoutContainer_mdc,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 8],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[5, 5],
					[25, 5],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_SCALE_X,
			1,
				[
					[1.1, 4],
					[0.8, 4],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_SCALE_Y,
			1,
				[
					[0.9, 8],
				]
			);

		return l_mt;
	}
	//...BLACKOUT INTRO

	//BLACKOUT OUTRO...
	generateBlackoutOutroAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fBlackoutContainer_mdc,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 8],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_X,
			25,
				[
					[-5, 5],
					[0, 5],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_SCALE_X,
			0.8,
				[
					[1.1, 4],
					[1, 4],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_SCALE_Y,
			0.9,
				[
					[1, 8],
				]
			);

		return l_mt;
	}
	//...BLACKOUT OUTRO

	//PRIMARY WIN...
	//INTRO...
	generatePrimarayWinIntroAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[-5, 5],
					[-10, 5],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_SCALE_X,
			1,
				[
					[1.25, 5],
					[1, 5],
				]
			);
		l_mt.addAnimation(
			this._fGlowContainer_mdc,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 5],
				]
			);

		return l_mt;
	}
	//INTRO...

	//OUTRO...
	generatePrimarayWinOutroAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_X,
			-10,
				[
					[5, 5],
					[0, 5],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_SCALE_X,
			1,
				[
					[1.25, 5],
					[1, 5],
				]
			);
		l_mt.addAnimation(
			this._fGlowContainer_mdc,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 5],
				]
			);

		return l_mt;
	}
	//...OUTRO
	//...PRIMARY WIN

	//NON PRIMARY WIN...
	//INTRO...
	generateNonPrimarayWinIntroAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[-5, 5],
					[-10, 5],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_SCALE_X,
			1,
				[
					[1.25, 5],
					[1, 5],
				]
			);
		l_mt.addAnimation(
			this._fGlowContainer_mdc,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 5],
				]
			);

		return l_mt;
	}
	//...INTRO

	//OUTRO...
	generateNonPrimarayWinOutroAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_X,
			-10,
				[
					[5, 5],
					[0, 5],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_SCALE_X,
			1,
				[
					[1.25, 5],
					[1, 5],
				]
			);
		l_mt.addAnimation(
			this._fGlowContainer_mdc,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 5],
				]
			);

		return l_mt;
	}
	//...OUTRO
	//...NON PRIMARY WIN


	//FREE SPINS AWARD...
	generateFreeSpinsAwardAnimation()
	{
		let l_mt = new MTimeLine();
		l_mt.addAnimation(
			this._fBlackoutContainer_mdc,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 8],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[5, 5],
					[25, 5],
				]
			);
		l_mt.addAnimation(
			this._fContentContainer_mdc,
			MTimeLine.SET_SCALE_X,
			1,
				[
					[1.25, 10],
					[1, 10],
				]
			);
		return l_mt;
	}
	//...FREE SPINS AWARD
	//...ANIMATIONS

	//GETTERS...
	getContentContainer()
	{
		return this._fContentContainer_mdc;
	}

	getBodyContainer()
	{
		return this._fBodyContainer_mdc;
	}

	getGlowContainer()
	{
		return this._fGlowContainer_mdc;
	}


	getTensionContainer()
	{
		return this._fTensionContainer_mdc;
	}

	getFreeSpinsAwardContainer()
	{
		return this._fFreeSpinsAwardContainer_mdc;
	}


	getSpecialEffectsContainer()
	{
		return this._fSpecialEffectsContainer_mdc;
	}
	//...GETTERS

	//EXTERNAL CONTROL METHODS...
	onStartSpin()
	{
		this._fStartSpinAnimation_mt.play();
	}

	onFinishSpin()
	{
		this._fFinishSpinAnimation_mt.play();
	}

	onFinishCascade()
	{
		this._fFinishCascadeAnimation_mt.play();
	}

	showBlackoutIntro()
	{
		this._fBlackoutIntroAnimation_mt.play();
	}

	showBlackoutOutro()
	{
		this._fBlackoutOutroAnimation_mt.play();
	}

	showPrimarayWinIntroPresentation()
	{
		this._fPrimarayWinIntroAnimation_mt.play();
	}

	showPrimarayWinOutroPresentation()
	{
		this._fPrimarayWinOutroAnimation_mt.play();
	}

	showNonPrimarayWinIntroPresentation()
	{
		this._fNonPrimarayWinIntroAnimation_mt.play();
	}

	showNonPrimarayWinOutroPresentation()
	{
		this._fNonPrimarayWinOutroAnimation_mt.play();
	}

	showFreeSpinsAwardPresentation()
	{
		this._fFreeSpinsAwardAnimation_mt.play();
	}

	restore()
	{
		//CONTENT CONTAINER...
		this._fContentContainer_mdc.setX(0);
		this._fContentContainer_mdc.setScale(1);
		//...CONTENT CONTAINER

		//BODY...
		this._fBodyContainer_mdc.setAlpha(1);
		//...BODY

		//BLACKOUT...
		this._fBlackoutContainer_mdc.setAlpha(0);
		//...BLACKOUT

		//GLOW...
		this._fGlowContainer_mdc.setAlpha(0);
		//...GLOW
	}
	//...EXTERNAL CONTROL METHODS
}