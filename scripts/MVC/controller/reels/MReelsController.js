class MReelsController extends MController
{
	constructor()
	{
		super(new MReelsModel(), new MReelsView())

		this._fReelControllers_mrc_arr = [];

		for( let i = 0; i < MReelsModel.REELS_COUNT; i++ )
		{
			this._fReelControllers_mrc_arr[i] = new MReelController(i);
		}
	}

	init()
	{
		super.init();

		//INIT EVERY REEL...
		for( let i = 0; i < MReelsModel.REELS_COUNT; i++ )
		{
			this._fReelControllers_mrc_arr[i].init();
		}
		//...INIT EVERY REEL
	}

	getReelController(aReelIndex_int)
	{
		return this._fReelControllers_mrc_arr[aReelIndex_int];
	}

	startSpinning()
	{
		for( let i = 0; i < MReelsModel.REELS_COUNT; i++ )
		{
			this._fReelControllers_mrc_arr[i].startSpinning();
		}
	}

	stopReelSpinning(aReelIndex_int)
	{
		this._fReelControllers_mrc_arr[aReelIndex_int].stopSpinning();
	}

	cascade(aX_int, aY_int, aNextSymbolId_int)
	{
		this._fReelControllers_mrc_arr[aX_int].cascade(aY_int, aNextSymbolId_int);
	}
}