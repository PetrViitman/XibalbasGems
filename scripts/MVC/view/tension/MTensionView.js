class MTensionView extends MView
{
	constructor()
	{
		super(0, 0, MIconCellView.WIDTH, MReelsView.HEIGHT);

		this._fParticlesContainer_mdc = this.addChild(new MDisplayContainer());

		this._fTop_mdo = null;
		this._fMiddle_mdo = null;
		this._fBottom_mdo = null;

		this._fLoopAnimation_mt = null;
		this._fIntroAnimation_mt = null;
		this._fOutroAnimation_mt = null;

		this._fIconParticlesPoolViews_mippv_arr = [];


		//PARTICLES...
		for( let i = 0; i < 3; i++ )
		{
			let l_mippv = this._fParticlesContainer_mdc.addChild(new MIconParticlesPoolView());
			l_mippv.setXY(
				MIconCellView.WIDTH / 2,
				(i + 1) * MIconCellView.HEIGHT - 50);

			this._fIconParticlesPoolViews_mippv_arr[i] = l_mippv;
		}
		this._fParticlesContainer_mdc.setAlpha(0);
		//...PARTICLES

		//TOP...
		let l_mdo = new MDisplayObject(STORAGE.tensionTop_mp);
		l_mdo.setXY(0, 0);
		l_mdo.setRotationInDegrees(25);
		l_mdo.setScale(0);
		this._fTop_mdo = this.addChild(l_mdo);
		//...TOP

		//MIDDLE...
		l_mdo = new MDisplayObject(STORAGE.tensionMiddle_mp);
		l_mdo.setXY(0, l_mdo.getHeight());
		l_mdo.setRotationInDegrees(25);
		l_mdo.setScale(0);
		this._fMiddle_mdo = this.addChild(l_mdo);
		//...MIDDLE

		//BOTTOM...
		l_mdo = new MDisplayObject(STORAGE.tensionBottom_mp);
		l_mdo.setXY(0, l_mdo.getHeight() * 2);
		l_mdo.setRotationInDegrees(25);
		l_mdo.setScale(0);
		this._fBottom_mdo = this.addChild(l_mdo);
		//...BOTTOM

		//ANIMATIONS...
		let lHalfCycleFramesCount_int = 8;

		//LOOP...
		let l_mt = new MTimeLine();
		//TAIL...
		l_mt.addAnimation(
			this._fTop_mdo,
			MTimeLine.SET_X,
			-15,
				[
					[15, lHalfCycleFramesCount_int],
					[-15, lHalfCycleFramesCount_int],
				]
			);
		//...TAIL

		//BODY...
		l_mt.addAnimation(
			this._fMiddle_mdo,
			MTimeLine.SET_X,
			15,
				[
					[-15, lHalfCycleFramesCount_int],
					[15, lHalfCycleFramesCount_int],
				]
			);
		//...BODY

		//HEAD...
		l_mt.addAnimation(
			this._fBottom_mdo,
			MTimeLine.SET_X,
			-15,
				[
					[15, lHalfCycleFramesCount_int],
					[-15, lHalfCycleFramesCount_int],
				]
			);
		//...HEAD

		this._fLoopAnimation_mt = l_mt;
		//...LOOP

		//INTRO...
		//FISH CONTAINER...
		l_mt = new MTimeLine();

		l_mt.addAnimation(
			this._fParticlesContainer_mdc,
			MTimeLine.SET_ALPHA,
			0,
				[
					[1, lHalfCycleFramesCount_int],
				]
			);

		l_mt.addAnimation(
			this._fBottom_mdo,
			MTimeLine.SET_SCALE,
			0,
				[
					[1, lHalfCycleFramesCount_int],
				]
			);

		l_mt.addAnimation(
			this._fBottom_mdo,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			25,
				[
					[0, lHalfCycleFramesCount_int],
				]
			);

		l_mt.addAnimation(
			this._fMiddle_mdo,
			MTimeLine.SET_SCALE,
			0,
				[
					[1, lHalfCycleFramesCount_int],
				]
			);

		l_mt.addAnimation(
			this._fMiddle_mdo,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			25,
				[
					[0, lHalfCycleFramesCount_int],
				]
			);

		l_mt.addAnimation(
			this._fTop_mdo,
			MTimeLine.SET_SCALE,
			0,
				[
					[1, lHalfCycleFramesCount_int],
				]
			);

		l_mt.addAnimation(
			this._fTop_mdo,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			25,
				[
					[0, lHalfCycleFramesCount_int],
				]
			);
		//...FISH CONTAINER

		this._fIntroAnimation_mt = l_mt;
		//...INTRO

		//OUTRO...
		//FISH CONTAINER...
		l_mt = new MTimeLine();

		l_mt.addAnimation(
			this._fBottom_mdo,
			MTimeLine.SET_SCALE,
			1,
				[
					[0, lHalfCycleFramesCount_int],
				]
			);
		l_mt.addAnimation(
			this._fBottom_mdo,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[25, lHalfCycleFramesCount_int],
				]
			);

		l_mt.addAnimation(
			this._fMiddle_mdo,
			MTimeLine.SET_SCALE,
			1,
				[
					[0, lHalfCycleFramesCount_int],
				]
			);
		l_mt.addAnimation(
			this._fMiddle_mdo,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[25, lHalfCycleFramesCount_int],
				]
			);

		l_mt.addAnimation(
			this._fTop_mdo,
			MTimeLine.SET_SCALE,
			1,
				[
					[0, lHalfCycleFramesCount_int],
				]
			);

		l_mt.addAnimation(
			this._fTop_mdo,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[25, lHalfCycleFramesCount_int],
				]
			);


		l_mt.addAnimation(
			this._fParticlesContainer_mdc,
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, lHalfCycleFramesCount_int],
				]
			);
		//...FISH CONTAINER

		this._fOutroAnimation_mt = l_mt;
		//...OUTRO
		//...ANIMATIONS
	}
	
	//EXTERNAL CONTROL METHODS...
	//INTRO...
	startIntroAnimation()
	{
		this._fLoopAnimation_mt.play(MTimeLine.PLAY_MODE_ID_LOOP);
		this._fIntroAnimation_mt.play();
	}
	//...INTRO

	//OUTRO...
	startOutroAnimation()
	{
		this._fOutroAnimation_mt.play();
	}
	//...OUTRO
	//...EXTERNAL CONTROL METHODS
}