class MIconMid1View extends MBaseIconView
{
	constructor()
	{
		super(MReelsModel.SYMBOL_ID_MID_1);
	}

	//CONSTANT LOOP...
	generateConstantLoopAnimation()
	{
		let l_mt = new MTimeLine();
		
		l_mt.addAnimation(
			this._fContentWrapperContainer_mdc,
			MTimeLine.SET_X,
			0,
				[
					[-9, 50],
					[9, 100],
					[0, 50],
				]
			);

		return l_mt;
	}
	//...CONSTANT LOOP
}