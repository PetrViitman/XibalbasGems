class MIconMid5View extends MBaseIconView
{
	constructor()
	{
		super(MReelsModel.SYMBOL_ID_MID_5);
	}

	//CONSTANT LOOP...
	generateConstantLoopAnimation()
	{
		let l_mt = new MTimeLine();
		
		l_mt.addAnimation(
			this._fContentWrapperContainer_mdc,
			MTimeLine.SET_X,
			4.5,
				[
					[-4.5, 100],
					[4.5, 100],
				]
			);

		return l_mt;
	}
	//...CONSTANT LOOP
}