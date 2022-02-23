class MReelModel extends MModel
{
	static get ICONS_PER_REEL_COUNT() { return 3 }

	constructor(aReelIndex_int)
	{
		super();

		this._fReelIndex_int = aReelIndex_int;
	}

	getReelIndex()
	{
		return this._fReelIndex_int;
	}
}