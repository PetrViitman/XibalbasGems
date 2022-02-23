class MBackgroundChipsPoolView extends MView
{
	static get CHIP_GENERATION_INTERVAL_IN_FRAMES() { return 300 }

	constructor(aBubblePool_mbpv)
	{
		super(0, 0, 1920, 1080);

		this._fFramesCount_int = MBackgroundChipsPoolView.CHIP_GENERATION_INTERVAL_IN_FRAMES;
		this._fCoins_mbcv_arr = []
		this._fBubblePool_mbpv = aBubblePool_mbpv;
		
		//SKIP FRAMES TO FILL SCREEN ON START...
		for( let i = 0; i < 10; i++ )
		{
			this.onNextFrames(100);
			this._fBubblePool_mbpv.onNextFrames(100);
		}
		//...SKIP FRAMES TO FILL SCREEN ON START

		this.setVFXLevel(0.5);

		this.addToDisplay();
	}

	generateCoin(aX_num, aY_num)
	{
		for( let i = 0; i < this._fCoins_mbcv_arr.length; i++ )
		{
			let l_mbcv = this._fCoins_mbcv_arr[i];

			if(l_mbcv.canBeReused())
			{
				l_mbcv.reset(aX_num, aY_num);
				return;
			}
		}

		let l_mbcv = this.addChild(new MBackgroundChipView(this._fBubblePool_mbpv));
		l_mbcv.reset(aX_num, aY_num);
		this._fCoins_mbcv_arr.push(l_mbcv);
	}

	onNextFrames(aFramesCount_num)
	{
		for( let i = 0; i < this._fCoins_mbcv_arr.length; i++ )
		{

			this._fCoins_mbcv_arr[i].update(aFramesCount_num);
		}


		this._fFramesCount_int += aFramesCount_num;


		if(this._fFramesCount_int > MBackgroundChipsPoolView.CHIP_GENERATION_INTERVAL_IN_FRAMES)
		{
			this._fFramesCount_int = Math.floor(this._fFramesCount_int % MBackgroundChipsPoolView.CHIP_GENERATION_INTERVAL_IN_FRAMES);
			
			this.generateCoin(
				Math.random() * this.getWidth(),
				-128);
		}
	}

	//RESPONSIVE DESIGN...
	updateTargetArea(aSidesRatio_num)
	{
		this.setFillMode(MDisplayContainer.FILL_MODE_ID_FULL);
		this.copyTargetArea(MAIN.getBackgroundView());
	}
	//...RESPONSIVE DESIGN
}