class MXibalbaView extends MView
{
	constructor()
	{
		super(0, 0, 1603, 671);

		this._fHandLeft_mdc = null;
		this._fFirePoolLeft_mfpv = null;
		this._fFireParticlesPoolLeft_mfppv = null;
		this._fLeftX_mdc = null;
		this._fLeftXGlow_mdo = null;
		this._fHandRight_mdc = null;
		this._fFirePoolRight_mfpv = null;
		this._fFireParticlesPoolRight_mfppv = null;
		this._fRightX_mdc = null;
		this._fRightXGlow_mdo = null;
		this._fOnSpinStartAnimation_mt = null;
		this._fOnSpinFinishAnimation_mt = null;

		this.addToDisplay();


		//HEAD...
		let lXibalbaHead_mdo = new MDisplayObject(STORAGE.xibalbaHead_mp);
		this.addChild(lXibalbaHead_mdo);

		//ANIMATION...
		let lHeadAnimationLeftRight_mt = new MTimeLine();

		lHeadAnimationLeftRight_mt.addAnimation(
			lXibalbaHead_mdo,
			MTimeLine.SET_X,
			0,
				[
					[50, 250],
					[-50, 500],
					[0, 250],
				]
			);


		lHeadAnimationLeftRight_mt.play(MTimeLine.PLAY_MODE_ID_LOOP);

		let lHeadAnimationUpDown_mt = new MTimeLine();
		lHeadAnimationUpDown_mt.addAnimation(
			lXibalbaHead_mdo,
			MTimeLine.SET_Y,
			0,
				[
					[15, 50],
					[0, 50]
				]
			);


		lHeadAnimationUpDown_mt.play(MTimeLine.PLAY_MODE_ID_LOOP);
		//...ANIMATION
		//...HEAD


		//HAND LEFT...
		//FIRE...
		this._fFirePoolLeft_mfpv = this.addChild(new MFirePoolView());
		this._fFirePoolLeft_mfpv.setAlpha(0.3);
		//...FIRE

		let lXibalbaHandLeft_mdo = new MDisplayObject(STORAGE.xibalbaHand_mp);
		let lX_num = -450;
		let lY_num = this.getHeight() - lXibalbaHandLeft_mdo.getHeight() / 2;

		lXibalbaHandLeft_mdo.setRegPointToCenter();

		let lLeftHandContainer_mdc = new MDisplayContainer();
		lLeftHandContainer_mdc.addChild(lXibalbaHandLeft_mdo);
		lLeftHandContainer_mdc.setXY(lX_num, lY_num);

		//SPARCLES...
		this._fFireParticlesPoolLeft_mfppv = lLeftHandContainer_mdc.addChild(new MFireParticlesPoolView());
		this._fFireParticlesPoolLeft_mfppv.setXY(-50, -100);
		//...SPARCLES


		this._fHandLeft_mdc = this.addChild(lLeftHandContainer_mdc);

		//X...

		//CONTAINER...
		this._fLeftX_mdc = this._fHandLeft_mdc.addChild(new MDisplayContainer());
		this._fLeftX_mdc.setXY(-50, -150);
		this._fLeftX_mdc.setScale(1.5);
		//...CONTAINER

		//IMAGE...
		let l_mdo = this._fLeftX_mdc.addChild(new MDisplayObject(STORAGE.xibalbaX_mp));
		l_mdo.setRegPointToCenter();
		//...IMAGE

		//GLOW...
		this._fLeftXGlow_mdo = this._fLeftX_mdc.addChild(new MDisplayObject(STORAGE.xibalbaXGlow_mp));
		this._fLeftXGlow_mdo.setRegPointToCenter();
		this._fLeftXGlow_mdo.setAlpha(0);
		//...GLOW
		//...X


		//ANIMATION...
		let lHand1Timeline_mt = new MTimeLine();

		lHand1Timeline_mt.addAnimation(
			this._fHandLeft_mdc,
			MTimeLine.SET_X,
			lX_num,
				[
					[lX_num + 50, 100],
					[lX_num	- 50, 200],
					[lX_num		, 100],
				]
			);

		lHand1Timeline_mt.addAnimation(
			this._fHandLeft_mdc,
			MTimeLine.SET_Y,
			lY_num,
				[
					[lY_num + 50, 200],
					[lY_num		, 200],
				]
			);
		lHand1Timeline_mt.playLoop();
		//...ANIMATION

		//...HAND LEFT

		//HAND RIGHT...
		//FIRE...
		this._fFirePoolRight_mfpv = this.addChild(new MFirePoolView());
		this._fFirePoolRight_mfpv.setAlpha(0.3);
		//...FIRE

		let lXibalbaHandRight_mdo = new MDisplayObject(STORAGE.xibalbaHand_mp);
		lX_num = this.getWidth() / 2 + lXibalbaHandRight_mdo.getWidth() + 500,
		lY_num = this.getHeight() - lXibalbaHandRight_mdo.getHeight() / 2

		lXibalbaHandRight_mdo.setRegPointToCenter();

		let lRightHandContainer_mdc = new MDisplayContainer();
		lRightHandContainer_mdc.addChild(lXibalbaHandRight_mdo);
		lRightHandContainer_mdc.setXY(lX_num, lY_num);
		this._fHandRight_mdc = this.addChild(lRightHandContainer_mdc);

		//SPARCLES...
		this._fFireParticlesPoolRight_mfppv = lRightHandContainer_mdc.addChild(new MFireParticlesPoolView());
		this._fFireParticlesPoolRight_mfppv.setXY(-50, -100);
		//...SPARCLES

		//X...
		//CONTAINER...
		this._fRightX_mdc = this._fHandRight_mdc.addChild(new MDisplayContainer());
		this._fRightX_mdc.setXY(-50, -150);
		this._fRightX_mdc.setScale(1.5);
		//...CONTAINER

		//IMAGE...
		l_mdo = this._fRightX_mdc.addChild(new MDisplayObject(STORAGE.xibalbaX_mp));
		l_mdo.setRegPointToCenter();
		//...IMAGE

		//GLOW...
		this._fRightXGlow_mdo = this._fRightX_mdc.addChild(new MDisplayObject(STORAGE.xibalbaXGlow_mp));
		this._fRightXGlow_mdo.setRegPointToCenter();
		this._fRightXGlow_mdo.setAlpha(0);
		//...GLOW
		//...X

		//ANIMATION...
		let lHand2Timeline_mt = new MTimeLine();

		lHand2Timeline_mt.addAnimation(
			this._fHandRight_mdc,
			MTimeLine.SET_X,
			lX_num,
				[
					[lX_num - 50, 100],
					[lX_num	+ 50, 200],
					[lX_num		, 100],
				]
			);

		lHand2Timeline_mt.addAnimation(
			this._fHandRight_mdc,
			MTimeLine.SET_Y,
			lY_num,
				[
					[lY_num + 50, 200],
					[lY_num		, 200],
				]
			);
		
		lHand2Timeline_mt.playLoopFromFrame(150);
		//...ANIMATION
		//...HAND RIGHT


		//X ANIMATIONS...
		let lXTimeline_mt = new MTimeLine();

		//LEFT...
		lXTimeline_mt.addAnimation(
			this._fLeftX_mdc,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[5, 25],
					[-5, 50],
					[0, 25],
				]
			);

		lXTimeline_mt.addAnimation(
			this._fLeftX_mdc,
			MTimeLine.SET_SCALE,
			1.15,
				[
					[1.15 * 1.1, 50],
					[1.15, 50],
				]
			);

		lXTimeline_mt.addAnimation(
			this._fLeftX_mdc,
			MTimeLine.SET_Y,
			-150,
				[
					[-175, 50],
					[-150, 50],
				]
			);
		//...LEFT

		//RIGHT...
		lXTimeline_mt.addAnimation(
			this._fRightX_mdc,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[-5, 25],
					[5, 50],
					[0, 25],
				]
			);

		lXTimeline_mt.addAnimation(
			this._fRightX_mdc,
			MTimeLine.SET_SCALE,
			1.15 * 1.1,
				[
					[1.15, 50],
					[1.15 * 1.1, 50],
				]
			);

		lXTimeline_mt.addAnimation(
			this._fRightX_mdc,
			MTimeLine.SET_Y,
			-175,
				[
					[-150, 50],
					[-175, 50],
				]
			);
		//...RIGHT

		lXTimeline_mt.playLoop();
		//..X ANIMATIONS



		//SPIN ANIMATIONS...

		//START SPIN...
		//X GLOW...
		//LEFT...
		let lStartSpin_mt = new MTimeLine();
		lStartSpin_mt.addAnimation(
			this._fLeftXGlow_mdo,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 15],
				]
			);
		//...LEFT

		//RIGHT...
		lStartSpin_mt.addAnimation(
			this._fRightXGlow_mdo,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, 15],
				]
			);
		//...RIGHT
		//...X GLOW

		//FIRE...
		//LEFT...
		lStartSpin_mt.addAnimation(
			this._fFirePoolLeft_mfpv,
			MTimeLine.SET_ALPHA,
			0.3,
				[
					[0, 15],
				]
			);
		//...LEFT

		//RIGHT...
		lStartSpin_mt.addAnimation(
			this._fFirePoolRight_mfpv,
			MTimeLine.SET_ALPHA,
			0.3,
				[
					[0, 15],
				]
			);
		//...RIGHT
		//...FIRE

		this._fOnSpinStartAnimation_mt = lStartSpin_mt;
		//...START SPIN

		//FINISH SPIN...
		//X GLOW...
		//LEFT...
		let lFinishSpin_mt = new MTimeLine();
		lFinishSpin_mt.addAnimation(
			this._fLeftXGlow_mdo,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 15],
				]
			);
		//...LEFT

		//RIGHT...
		lFinishSpin_mt.addAnimation(
			this._fRightXGlow_mdo,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 15],
				]
			);
		//...RIGHT
		//...X GLOW

		//FIRE...
		//LEFT...
		lFinishSpin_mt.addAnimation(
			this._fFirePoolLeft_mfpv,
			MTimeLine.SET_ALPHA,
			0,
				[
					[0.3, 15],
				]
			);
		//...LEFT

		//RIGHT...
		lFinishSpin_mt.addAnimation(
			this._fFirePoolRight_mfpv,
			MTimeLine.SET_ALPHA,
			0,
				[
					[0.3, 15],
				]
			);
		//...RIGHT
		//...FIRE

		this._fOnSpinFinishAnimation_mt = lFinishSpin_mt;
		//...FINISH SPIN
		//...SPIN ANIMATIONS


		//VFX LEVEL...
		this._fLeftXGlow_mdo.setVFXLevel(1);
		this._fRightXGlow_mdo.setVFXLevel(1);
		//...VFX LEVEL
	}

	onNextFrames(aFramesCount_num)
	{
		this._fFirePoolLeft_mfpv.setFireGenerationPosition(
			this._fHandLeft_mdc.getX() - 25,
			this._fHandLeft_mdc.getY() + 15);

		this._fFirePoolRight_mfpv.setFireGenerationPosition(
			this._fHandRight_mdc.getX() - 25,
			this._fHandRight_mdc.getY() + 15);
	}


	//EXTERNAL CONTROL METHODS...
	onSpinStart()
	{
		this._fOnSpinStartAnimation_mt.stop();
		this._fOnSpinStartAnimation_mt.play();
		
	}

	onSpinFinish()
	{
		this._fOnSpinFinishAnimation_mt.stop();
		this._fOnSpinFinishAnimation_mt.play();
	}

	setFreeSpinsMode(aIsFreeSpinsMode_bl)
	{
		this._fOnSpinStartAnimation_mt.setLocked(aIsFreeSpinsMode_bl);
		this._fOnSpinFinishAnimation_mt.setLocked(aIsFreeSpinsMode_bl);
	}
	//...EXTERNAL CONTROL METHODS

	//RESPONSIVE DESIGN...
	updateTargetArea(aSidesRatio_num)
	{
		this.setStickMode(MDisplayContainer.STICK_MODE_ID_BOTTOM);
		
		let lBackgroundTargetAreaHeight_num = MAIN.getBackgroundView().getTargetAreaHeight();

		this.setTargetArea(
			0,
			0.66 * lBackgroundTargetAreaHeight_num,
			1,
			0.34 * lBackgroundTargetAreaHeight_num);
	}
	//...RESPONSIVE DESIGN

}