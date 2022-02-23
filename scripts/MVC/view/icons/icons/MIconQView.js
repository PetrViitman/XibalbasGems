class MIconQView extends MBaseIconView
{
	constructor()
	{
		super(MReelsModel.SYMBOL_ID_Q);
	}

	//CONSTANT LOOP...
	generateConstantLoopAnimation()
	{
		let l_mt = new MTimeLine();
		
		l_mt.addAnimation(
			this._fContentWrapperContainer_mdc,
			MTimeLine.SET_X,
			-3,
				[
					[3, 100],
					[-3, 100],
				]
			);

		return l_mt;
	}
	//...CONSTANT LOOP
}