class MIconWildView extends MBaseIconView
{
	constructor()
	{
		super(MReelsModel.SYMBOL_ID_WILD);

		this._fSkinRed_mdo = null;
		this._fSkinOrange_mdo = null;
	}

	//CONTAINERS...
	generateTensionContainer()
	{
		let l_mdc = new MDisplayContainer();

		//SKINS...
		//ORANGE...
		let l_mdo = new MDisplayObject(STORAGE.iconWildOrange_mp);
		l_mdo.setAlpha(0);
		l_mdo.setRegPointToCenter();
		this._fSkinOrange_mdo = l_mdc.addChild(l_mdo);
		//...ORANGE

		//RED...
		l_mdo = new MDisplayObject(STORAGE.iconWildRed_mp);
		l_mdo.setAlpha(0);
		l_mdo.setRegPointToCenter();
		this._fSkinRed_mdo = l_mdc.addChild(l_mdo);
		//...RED
		//...SKINS

		return l_mdc;
	}
	//...CONTAINERS


	//ANIMATIONS...
	//FINISH SPIN...
	generateFinishSpinAnimation()
	{
		let l_mt = new MTimeLine();

		l_mt.addAnimation(
			this.getGlowContainer(),
			MTimeLine.SET_ALPHA,
			1,
				[
					[0, 15],
				]
			);

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

		//SKINS...
		//ORANGE...
		l_mt.addAnimation(
			this._fSkinOrange_mdo,
			MTimeLine.SET_ALPHA,
			0,
				[
					10,
					[1, 3],
					5 + 10,
					[0, 3],
				]
			);
		//...ORANGE

		//RED...
		l_mt.addAnimation(
			this._fSkinRed_mdo,
			MTimeLine.SET_ALPHA,
			0,
				[
					10 + 5,
					[1, 3],
					5,
					[0, 3],
				]
			);
		//...RED

		//...SKINS

		//TENSION PART...
		
		l_mt.addAnimation(
			this.getContentContainer(),
			MTimeLine.SET_SCALE_X,
			1,
				[
					5,
					[1.35, 5],
					[0.95, 5],
					[1.25, 5],
					[1, 5],
				]
			);

		l_mt.addAnimation(
			this.getContentContainer(),
			MTimeLine.SET_ROTATION_IN_DEGREES,
			0,
				[
					5,
					[-3, 2],
					[3, 5],
					[-3, 5],
					[0, 2],
				]
			);

		l_mt.addAnimation(
			this.getContentContainer(),
			MTimeLine.SET_X,
			0,
				[
					[-15, 5],
					[20, 10],
					[-10, 10],
					[0, 5],
				]
			);
		
		return l_mt;
	}
	//...FINISH SPIN


	//CONSTANT LOOP...
	generateConstantLoopAnimation()
	{
		let l_mt = new MTimeLine();
		
		l_mt.addAnimation(
			this._fContentWrapperContainer_mdc,
			MTimeLine.SET_X,
			4.5,
				[
					[0, 50],
					[-4.5, 50],
					[4.5, 100],
				]
			);

		return l_mt;
	}
	//...CONSTANT LOOP
	//...ANIMATIONS
}