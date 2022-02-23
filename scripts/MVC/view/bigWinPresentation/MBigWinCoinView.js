const CAPTIONS_POSITIONS =
[
	new MPoint(0, -115),
	new MPoint(0, -115),
	new MPoint(0, -115)
];

const LEVELS_COUNT = CAPTIONS_POSITIONS.length;

class MBigWinCoinView extends MBaseCoinView
{
	static get FALL_SPEED() 	{ return 1 }
	static get FLIP_SPEED() 	{ return 0.001 }
	static get ROTATION_SPEED() { return 0.01 }

	static get SHIFT_ANGLE_CHANGE_SPEED() { return 0.005 }
	static get SHIFT_SPEED() { return 0.375 }

	static get BUBBLE_GENERATION_INTERVAL() { return 25 }


	static get CAPTION_ASSETS()
	{
		return	[
			STORAGE.bigWinCoinCaptionLevel0_mp,
			STORAGE.bigWinCoinCaptionLevel1_mp,
			STORAGE.bigWinCoinCaptionLevel2_mp
		];
	}
	
	static get FACE_ASSETS()
	{
		return	[
			STORAGE.bigWinCoinFaceLevel0_mp,
			STORAGE.bigWinCoinFaceLevel1_mp,
			STORAGE.bigWinCoinFaceLevel2_mp
		];
	}

	static get BACK_ASSETS()
	{
		return	[
			STORAGE.bigWinCoinBackLevel0_mp,
			STORAGE.bigWinCoinBackLevel1_mp,
			STORAGE.bigWinCoinBackLevel2_mp
		];
	}

	constructor(aBubblePool_mbpv)
	{
		super();

		this._fPayoutTabloidView_mtv = null;
		this._fBackLevelsContainers_mdc_arr = [];
		this._fFrontLevelsContainers_mdc_arr = [];
		this._fLevelIndex_int = 0;


		let lHeadsContainer_mdc = this.getHeadsCointainer();
		let lTailsContainer_mdc = this.getTailsCointainer();

		//LEVELS CONTAINERS...
		for( let i = 0; i < LEVELS_COUNT; i++ )
		{
			//BACK...
			let lBack_mdc = lTailsContainer_mdc.addChild(new MDisplayContainer());

			//BASE...
			let l_mp = MBigWinCoinView.BACK_ASSETS[i];
			let lBase_mdo = lBack_mdc.addChild(new MDisplayObject(l_mp));
			lBase_mdo.setRegPointToCenter();
			//...BASE

			//CAPTION...
			l_mp = MBigWinCoinView.CAPTION_ASSETS[i];
			let lCaption_mdo = lBack_mdc.addChild(new MDisplayObject(l_mp));
			lCaption_mdo.setRegPointToCenter();
			lCaption_mdo.setPosition(CAPTIONS_POSITIONS[i]);
			//...CAPTION


			this._fBackLevelsContainers_mdc_arr[i] = lBack_mdc;
			//...BACK



			//FRONT...
			let lFront_mdc = lHeadsContainer_mdc.addChild(new MDisplayContainer());

			//BASE...
			l_mp = MBigWinCoinView.FACE_ASSETS[i];
			lBase_mdo = lFront_mdc.addChild(new MDisplayObject(l_mp));
			lBase_mdo.setRegPointToCenter();
			//...BASE

			this._fFrontLevelsContainers_mdc_arr[i] = lFront_mdc;
			//...FRONT
		}
		//...LEVELS CONTAINERS


		//PAYOUT VIEW...
		let lTabloidView_mtv = new MTabloidView(
			STORAGE.bigWinDigits_mp,
			"0123456789,.",
			380, //max width
			85, //max hegiht
			);
		lTabloidView_mtv.setY(5);
		lTabloidView_mtv.displayValue(0);

		this._fPayoutTabloidView_mtv = lTailsContainer_mdc.addChild(lTabloidView_mtv);
		//...PAYOUT VIEW

		this.setLevel(0);
	}


	displayValue(aValue_int)
	{
		this._fPayoutTabloidView_mtv.displayValue(aValue_int);
	}


	setLevel(aLevelIndx_int)
	{
		for( let i = 0; i < LEVELS_COUNT; i++ )
		{
			this._fFrontLevelsContainers_mdc_arr[i].setVisible(i === aLevelIndx_int);
			this._fBackLevelsContainers_mdc_arr[i].setVisible(i === aLevelIndx_int);
		}

		this._fLevelIndex_int = aLevelIndx_int;
	}

	levelUp()
	{
		this._fLevelIndex_int++;

		if(this._fLevelIndex_int >= LEVELS_COUNT)
		{
			this._fLevelIndex_int = LEVELS_COUNT - 1;
		}

		this.setLevel(this._fLevelIndex_int);
	}



	//PICTURES...
	getHeadsPicture()
	{
		return STORAGE.bigWinCoinFaceLevel0_mp;
	}

	getTailsPicture()
	{
		return STORAGE.bigWinCoinFaceLevel0_mp;
	}

	getRibPicture()
	{
		return STORAGE.bigWinCoinRib_mp;
	}

	getMiddlePicture()
	{
		return STORAGE.bigWinCoinRibExtended_mp;
	}

	getShadowPicture()
	{
		return STORAGE.bigWinCoinShadow_mp;
	}
	//...PICTURES
}