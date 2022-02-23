const SYMBOL_ID_A = 0;
const SYMBOL_ID_J = 1;
const SYMBOL_ID_Q = 2;
const SYMBOL_ID_K = 3;
const SYMBOL_ID_10 = 4;

const SYMBOL_ID_MID_1 = 5;
const SYMBOL_ID_MID_2 = 6;
const SYMBOL_ID_MID_3 = 7;
const SYMBOL_ID_MID_4 = 8;
const SYMBOL_ID_MID_5 = 9;

const SYMBOL_ID_WILD = 10;
const SYMBOL_ID_SCATTER = 11;
const SYMBOL_ID_BUY_COIN = 12;

const SYMBOLS_IDS =
[
	SYMBOL_ID_A,
	SYMBOL_ID_J,
	SYMBOL_ID_Q,
	SYMBOL_ID_K,
	SYMBOL_ID_10,

	SYMBOL_ID_MID_1,
	SYMBOL_ID_MID_2,
	SYMBOL_ID_MID_3,
	SYMBOL_ID_MID_4,
	SYMBOL_ID_MID_5,

	SYMBOL_ID_WILD,
	SYMBOL_ID_SCATTER,
	SYMBOL_ID_BUY_COIN
];

const SYMBOLS_IDS_COUNT = SYMBOLS_IDS.length;

class MReelsModel extends MModel
{
	static get REELS_COUNT() { return 5 }

	//SYMBOLS...
	static get SYMBOL_ID_A() 		{ return SYMBOL_ID_A }
	static get SYMBOL_ID_J() 		{ return SYMBOL_ID_J }
	static get SYMBOL_ID_Q() 		{ return SYMBOL_ID_Q }
	static get SYMBOL_ID_K() 		{ return SYMBOL_ID_K }
	static get SYMBOL_ID_10() 		{ return SYMBOL_ID_10 }

	static get SYMBOL_ID_MID_1() 	{ return SYMBOL_ID_MID_1 }
	static get SYMBOL_ID_MID_2() 	{ return SYMBOL_ID_MID_2 }
	static get SYMBOL_ID_MID_3() 	{ return SYMBOL_ID_MID_3 }
	static get SYMBOL_ID_MID_4() 	{ return SYMBOL_ID_MID_4 }
	static get SYMBOL_ID_MID_5() 	{ return SYMBOL_ID_MID_5 }

	static get SYMBOL_ID_WILD() 	{ return SYMBOL_ID_WILD }
	static get SYMBOL_ID_SCATTER()	{ return SYMBOL_ID_SCATTER }
	static get SYMBOL_ID_BUY_COIN()	{ return SYMBOL_ID_BUY_COIN }

	static get SYMBOLS_IDS()		{ return SYMBOLS_IDS }
	static get SYMBOLS_IDS_COUNT()	{ return SYMBOLS_IDS_COUNT }

	static getRandomSymbolId(
		aOptPreventBuyCoin_bl = true,
		aOptPreventScatter_bl = false,
		aOptPreventWild_bl = false)
	{
		let lRandomSymbolIdIndex_int = Math.floor(Math.random() * SYMBOLS_IDS_COUNT);
		let lSymbolId_int = MReelsModel.SYMBOLS_IDS[lRandomSymbolIdIndex_int];

		//PREVENTING BUY COIN...
		if(
			aOptPreventBuyCoin_bl &&
			lSymbolId_int === SYMBOL_ID_BUY_COIN
			)
		{
			lSymbolId_int = MReelsModel.getPreviousSymbolId(lSymbolId_int);
		}
		//...PREVENTING BUY COIN

		//PREVENTING SCATTER...
		if(
			aOptPreventScatter_bl &&
			lSymbolId_int === SYMBOL_ID_SCATTER
			)
		{
			lSymbolId_int = MReelsModel.getPreviousSymbolId(lSymbolId_int);
		}
		//...PREVENTING SCATTER

		//PREVENTING WILD...
		if(
			aOptPreventWild_bl &&
			lSymbolId_int === SYMBOL_ID_WILD
			)
		{
			lSymbolId_int = MReelsModel.getPreviousSymbolId(lSymbolId_int);
		}
		//...PREVENTING WILD


		return lSymbolId_int;
	}

	static getPreviousSymbolId(aSymbolId_int)
	{
		let lPreviousSymbolId_int = aSymbolId_int - 1;

		if(lPreviousSymbolId_int < 0)
		{
			lPreviousSymbolId_int = SYMBOLS_IDS[SYMBOLS_IDS_COUNT - 1];
		}

		return lPreviousSymbolId_int;
	}
	//...SYMBOLS

	constructor(aController_cc)
	{
		super(aController_cc);

		this._fIcons_int_arr_arr = [];
		for( let y = 0; y < MReelModel.ICONS_PER_REEL_COUNT; y++ )
		{
			this._fIcons_int_arr_arr[y] = [];

			for( let x = 0; x < MReelsModel.REELS_COUNT; x++ )
			{
				this._fIcons_int_arr_arr[y][x] = 0;
			}
		}

		
		this.setRandomIcons();
	}

	init()
	{
		super.init();
	}

	getSymbolId(aReelIndex_int, aRowIndex_int)
	{
		return this._fIcons_int_arr_arr[aRowIndex_int][aReelIndex_int];
	}

	setRandomIcons()
	{
		let lScattersCount_int = 0;

		for ( let x = 0; x < MReelsModel.REELS_COUNT; x++ )
		{
			let lHasScatter_bl = false;

			for ( let y = 0; y < MReelModel.ICONS_PER_REEL_COUNT; y++ )
			{
				let lSymbolId_int = MReelsModel.getRandomSymbolId();
				

				//PREVENTING FREE SPINS COMBINATIONS...
				if(lSymbolId_int === SYMBOL_ID_SCATTER)
				{
					if(
						!lHasScatter_bl &&
						lScattersCount_int < 2
						)
					{
						lHasScatter_bl = true;
						lScattersCount_int++;
					}
					else
					{
						lSymbolId_int = MReelsModel.getPreviousSymbolId(lSymbolId_int);
					}
				}
				//...PREVENTING FREE SPINS COMBINATIONS

				//PREVENTING ANY WIN COMBINATIONS...
				/*
				if(x > 0)
				{
					let lIsAbsentInPreviousReel_bl = undefined;

					do
					{
						lIsAbsentInPreviousReel_bl = true;

						for ( let i = 0; i < MReelModel.ICONS_PER_REEL_COUNT; i++ )
						{
							if(lSymbolId_int === this._fIcons_int_arr_arr[i][x - 1])
							{
								lSymbolId_int = MReelsModel.getPreviousSymbolId(lSymbolId_int);
								lIsAbsentInPreviousReel_bl = false;
								break;
							}
						}
					}
					while(!lIsAbsentInPreviousReel_bl)
				}
				*/
				//...PREVENTING ANY WIN COMBINATIONS
				this._fIcons_int_arr_arr[y][x] = lSymbolId_int;
			}
		}
	}

	setIcons(aOptIconsIds_int_arr_arr)
	{
		if(!aOptIconsIds_int_arr_arr)
		{
			this.setRandomIcons();

			return;
		}

		for ( let y = 0; y < MReelModel.ICONS_PER_REEL_COUNT; y++ )
		{
			for ( let x = 0; x < MReelsModel.REELS_COUNT; x++ )
			{
				this._fIcons_int_arr_arr[y][x] = aOptIconsIds_int_arr_arr[y][x];
			}
		}
	}

	print()
	{
		console.log("");
		for ( let y = 0; y < MReelModel.ICONS_PER_REEL_COUNT; y++ )
		{
			let lStr_str = "";
			for ( let x = 0; x < MReelsModel.REELS_COUNT; x++ )
			{
				lStr_str += this._fIcons_int_arr_arr[y][x] + " ";
			}

			console.log(lStr_str);
		}
	}
}