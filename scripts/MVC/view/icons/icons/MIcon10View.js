class MIcon10View extends MBaseIconView
{
	constructor()
	{
		super(MReelsModel.SYMBOL_ID_10);
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
					[-12, 50],
					[12, 100],
					[0, 50],
				]
			);

		return l_mt;
	}
	//...CONSTANT LOOP
}