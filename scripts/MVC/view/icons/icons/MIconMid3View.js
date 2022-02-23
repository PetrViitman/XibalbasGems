class MIconMid3View extends MBaseIconView
{
	constructor()
	{
		super(MReelsModel.SYMBOL_ID_MID_3);
	}

	//CONSTANT LOOP...
	generateConstantLoopAnimation()
	{
		let l_mt = new MTimeLine();
		
		l_mt.addAnimation(
			this._fContentWrapperContainer_mdc,
			MTimeLine.SET_X,
			-10.5,
				[
					[10.5, 100],
					[-10.5, 100],
				]
			);

		return l_mt;
	}
	//...CONSTANT LOOP
}