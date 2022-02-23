class MReelController extends MController
{
	constructor(aReelIndex_int)
	{
		super(new MReelModel(aReelIndex_int), new MReelView());
	}

	startSpinning()
	{
		this.getView().setStateId(MReelView.STATE_ID_START_SPIN);
	}

	stopSpinning()
	{
		this.getView().setStateId(MReelView.STATE_ID_FINISH_SPIN_REQUIRED);
	}

	cascade(aCellIndex_int, aNextSymbolId_int)
	{
		this.getView().cascade(aCellIndex_int, aNextSymbolId_int);
	}
}