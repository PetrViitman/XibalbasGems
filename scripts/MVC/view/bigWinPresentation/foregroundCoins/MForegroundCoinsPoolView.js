class MForegroundCoinsPoolView extends MView
{
	static get COIN_GENERATION_INTERVAL_IN_FRAMES() { return 50 }

	constructor()
	{
		super(0, 0, 1920, 1080);

		this._fFramesCount_int = MForegroundCoinsPoolView.COIN_GENERATION_INTERVAL_IN_FRAMES;
		this._fCoins_mfcv_arr = []

		this.addToDisplay();

		//SKIP FRAMES TO FILL SCREEN ON START...
		for( let i = 0; i < 40; i++ )
		{
			this.onNextFrames(50);
		}
		//...SKIP FRAMES TO FILL SCREEN ON START

		this.setVisible(false);

		//RESPONSIVE DESIGN...
		this.setFillMode(MDisplayContainer.FILL_MODE_ID_FULL);
		this.setTargetArea(0, 0, 1, 1);
		//...RESPONSIVE DESIGN

		this.setVFXLevel(0.5);
	}

	generateCoin(aX_num, aY_num)
	{
		for( let i = 0; i < this._fCoins_mfcv_arr.length; i++ )
		{
			let l_mfcv = this._fCoins_mfcv_arr[i];

			if(l_mfcv.canBeReused())
			{
				l_mfcv.reset(aX_num, aY_num);
				return;
			}
		}

		let l_mfcv = this.addChild(new MForegroundCoinView());
		l_mfcv.reset(aX_num, aY_num);
		this._fCoins_mfcv_arr.push(l_mfcv);
	}

	onNextFrames(aFramesCount_num)
	{
		for( let i = 0; i < this._fCoins_mfcv_arr.length; i++ )
		{

			this._fCoins_mfcv_arr[i].update(aFramesCount_num);
		}


		this._fFramesCount_int += aFramesCount_num;


		if(this._fFramesCount_int > MForegroundCoinsPoolView.COIN_GENERATION_INTERVAL_IN_FRAMES)
		{
			this._fFramesCount_int = Math.floor(this._fFramesCount_int % MForegroundCoinsPoolView.COIN_GENERATION_INTERVAL_IN_FRAMES);
			
			this.generateCoin(
				Math.random() * this.getWidth(),
				-128);
		}
	}
}