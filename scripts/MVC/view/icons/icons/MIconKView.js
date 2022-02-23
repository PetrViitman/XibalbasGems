class MIconKView extends MBaseIconView
{
	constructor()
	{
		super(MReelsModel.SYMBOL_ID_K);
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
					[4.5, 50],
					[-4.5, 100],
					[0, 50],
				]
			);

		return l_mt;
	}
	//...CONSTANT LOOP
}