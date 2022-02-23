class MIconMid2View extends MBaseIconView
{
	constructor()
	{
		super(MReelsModel.SYMBOL_ID_MID_2);
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
					[7.5, 50],
					[-7.5, 100],
					[0, 50],
				]
			);

		return l_mt;
	}
	//...CONSTANT LOOP
}