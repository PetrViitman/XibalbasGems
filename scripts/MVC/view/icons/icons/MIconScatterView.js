class MIconScatterView extends MBaseIconView
{
	constructor()
	{
		super(MReelsModel.SYMBOL_ID_SCATTER);

		this._fTensionBodyView_mdo = null;
		this._fTensionFrame_mdo = null;
		this._fReflection1_mdo = null;
		this._fReflection2_mdo = null;
		this._fReflection3_mdo = null;
	}

	//CONTAINERS...
	generateTensionContainer()
	{
		let l_mdc = new MDisplayContainer();

		//TENSION VIEW...
		let l_mdo = new MDisplayObject(STORAGE.iconScatterTension_mp);
		l_mdo.setAlpha(0);
		l_mdo.setRegPointToCenter();

		this._fTensionBodyView_mdo = l_mdc.addChild(l_mdo);
		//...TENSION VIEW

		//FRAME...
		l_mdo = new MDisplayObject(STORAGE.tensionFrame_mp);
		l_mdo.setX(-20);
		l_mdo.setScale(0);
		l_mdo.setRegPointToCenter();

		this._fTensionFrame_mdo = l_mdc.addChild(l_mdo);
		//...FRAME


		return l_mdc;
	}


	generateFreeSpinsAwardContainer()
	{
		let l_mdc = new MDisplayContainer();

		//REFLECTION 1...
		let l_mdo = new MDisplayObject(STORAGE.iconScatterReflection_mp);
		l_mdo.setAlpha(0);
		l_mdo.setRegPointToCenter();
		l_mdo.setX(-20);

		this._fReflection1_mdo = l_mdc.addChild(l_mdo);
		//...REFLECTION 1

		//REFLECTION 2...
		l_mdo = new MDisplayObject(STORAGE.iconScatterReflection_mp);
		l_mdo.setAlpha(0);
		l_mdo.setRegPointToCenter();
		l_mdo.setX(-20);

		this._fReflection2_mdo = l_mdc.addChild(l_mdo);
		//...REFLECTION 2


		//REFLECTION 3...
		l_mdo = new MDisplayObject(STORAGE.iconScatterReflection_mp);
		l_mdo.setAlpha(0);
		l_mdo.setRegPointToCenter();
		l_mdo.setX(-20);

		this._fReflection3_mdo = l_mdc.addChild(l_mdo);
		//...REFLECTION 3

		return l_mdc;
	}
	//...CONTAINERS


	//ANIMATIONS...
	//FINISH SPIN...
	generateFinishSpinAnimation()
	{
		let l_mt = new MTimeLine();

		//CONTENT CONTAINER...
		l_mt.addAnimation(
			this.getContentContainer(),
			MTimeLine.SET_Y,
			0,
				[
					[-15, 5],
					[10, 5],
					[-5, 5],
					[0, 5],
				]
			);
		l_mt.addAnimation(
			this.getContentContainer(),
			MTimeLine.SET_SCALE,
			1,
				[
					10,
					[1.25, 5],
					[1, 5],
				]
			);

		l_mt.addAnimation(
			this.getContentContainer(),
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[10, 5],
					[-10, 10],
					[10, 5],
					[0, 5],
				]
			);
		//...CONTENT CONTAINER

		//GLOW...
		l_mt.addAnimation(
			this.getGlowContainer(),
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 15],
				]
			);
		//...GLOW


		//TENSION FRAME...
		l_mt.addAnimation(
			this._fTensionFrame_mdo,
			MTimeLine.SET_SCALE,
			0,
				[
					10,
					[1, 8],
					10,
					[0, 5],
				]
			);
		
		l_mt.addAnimation(
			this._fTensionFrame_mdo,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[-5, 10],
					[5, 5],
					[0, 5],
				]
			);

		//...TENSION FRAME

		//TENSION BODY VIEW...
		l_mt.addAnimation(
			this._fTensionBodyView_mdo,
			MTimeLine.SET_ALPHA,
			0,
				[
					10,
					[1, 5],
					10,
					[0, 5],
				]
			);
		//...TENSION BODY VIEW
		
		return l_mt;
	}
	//...FINISH SPIN


	//FREE SPINS AWARD...
	generateFreeSpinsAwardAnimation()
	{
		let l_mt = new MTimeLine();

		//CONTENT CONTAINER...
		l_mt.addAnimation(
			this.getContentContainer(),
			MTimeLine.SET_SCALE,
			1,
				[
					10,
					[1.25, 5],
					[1, 5],
				]
			);

		l_mt.addAnimation(
			this.getContentContainer(),
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[10, 5],
					[-10, 10],
					[10, 5],
					[0, 5],
				]
			);
		//...CONTENT CONTAINER


		//TENSION FRAME...
		l_mt.addAnimation(
			this._fTensionFrame_mdo,
			MTimeLine.SET_SCALE,
			0,
				[
					10,
					[1, 8],
					17,
					[1.25, 5],
					[1, 7],
					[0, 5],
				]
			);
		
		l_mt.addAnimation(
			this._fTensionFrame_mdo,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					[-5, 10],
					[5, 5],
					[0, 5],
					5,
					[360, 10],
				]
			);
		//...FRAME TENSION

		//TENSION BODY VIEW...
		l_mt.addAnimation(
			this._fTensionBodyView_mdo,
			MTimeLine.SET_ALPHA,
			0,
				[
					10,
					[1, 5],
					25,
					[0, 10],
				]
			);
		//...TENSION BODY VIEW

		//GLOW...
		l_mt.addAnimation(
			this.getGlowContainer(),
			MTimeLine.SET_ALPHA,
			0,
				[
					40,
					[1, 1],
				]
			);
		//...GLOW

		//REFLECTION 1...
		l_mt.addAnimation(
			this._fReflection1_mdo,
			MTimeLine.SET_ALPHA,
			0,
				[
					20,
					[1, 5],
					12,
					[0, 1]
				]
			);

		l_mt.addAnimation(
			this._fReflection1_mdo,
			MTimeLine.SET_X,
			-20,
				[
					25,
					[-50, 6, MTimeLine.EASE_IN],
					[-40, 6, MTimeLine.EASE_IN],
				]
			);

		l_mt.addAnimation(
			this._fReflection1_mdo,
			MTimeLine.SET_Y,
			0,
				[
					25,
					[-500, 13, MTimeLine.EASE_IN],
				]
			);

		l_mt.addAnimation(
			this._fReflection1_mdo,
			MTimeLine.SET_SCALE,
			1,
				[
					25,
					[1.5, 6],
					[0, 6],
				]
			);

		l_mt.addAnimation(
			this._fReflection1_mdo,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					25,
					[-15, 3],
					[15, 9],
				]
			);
		//...REFLECTION 1


		//REFLECTION 2...
		l_mt.addAnimation(
			this._fReflection2_mdo,
			MTimeLine.SET_ALPHA,
			0,
				[
					20 + 5,
					[1, 5],
					12,
					[0, 1]
				]
			);

		l_mt.addAnimation(
			this._fReflection2_mdo,
			MTimeLine.SET_X,
			-20,
				[
					25 + 5,
					[50, 6, MTimeLine.EASE_IN],
					[40, 6, MTimeLine.EASE_IN],
				]
			);

		l_mt.addAnimation(
			this._fReflection2_mdo,
			MTimeLine.SET_Y,
			0,
				[
					25 + 5,
					[-500, 13, MTimeLine.EASE_IN],
				]
			);

		l_mt.addAnimation(
			this._fReflection2_mdo,
			MTimeLine.SET_SCALE,
			1,
				[
					25 + 5,
					[1.5, 6],
					[0, 6],
				]
			);

		l_mt.addAnimation(
			this._fReflection2_mdo,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					25 + 5,
					[15, 3],
					[-15, 9],
				]
			);
		//...REFLECTION 2


		//REFLECTION 3...
		l_mt.addAnimation(
			this._fReflection3_mdo,
			MTimeLine.SET_ALPHA,
			0,
				[
					20 + 10,
					[1, 5],
					12,
					[0, 1]
				]
			);

		l_mt.addAnimation(
			this._fReflection3_mdo,
			MTimeLine.SET_X,
			-20,
				[
					25 + 10,
					[-50, 6, MTimeLine.EASE_IN],
					[-40, 6, MTimeLine.EASE_IN],
				]
			);

		l_mt.addAnimation(
			this._fReflection3_mdo,
			MTimeLine.SET_Y,
			0,
				[
					25 + 10,
					[-500, 13, MTimeLine.EASE_IN],
				]
			);

		l_mt.addAnimation(
			this._fReflection3_mdo,
			MTimeLine.SET_SCALE,
			1,
				[
					25 + 10,
					[1.5, 6],
					[0, 6],
				]
			);

		l_mt.addAnimation(
			this._fReflection3_mdo,
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					25 + 10,
					[-15, 3],
					[15, 9],
				]
			);
		//...REFLECTION 3
		
		return l_mt;
	}
	//...FREE SPINS AWARD


	//CONSTANT LOOP...
	generateConstantLoopAnimation()
	{
		let l_mt = new MTimeLine();
		
		l_mt.addAnimation(
			this._fContentWrapperContainer_mdc,
			MTimeLine.SET_X,
			9,
				[
					[0, 50],
					[-9, 50],
					[9, 100],
				]
			);

		return l_mt;
	}
	//...CONSTANT LOOP
	//...ANIMATIONS

}