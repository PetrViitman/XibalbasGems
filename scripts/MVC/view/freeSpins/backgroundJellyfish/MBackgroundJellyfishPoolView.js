class MBackgroundJellyfishPoolView extends MView
{
	static get JELLYFISH_GENERATION_INTERVAL_IN_FRAMES() { return 75 }

	constructor(aBubblePool_mbpv)
	{
		super(0, 0, 1920, 1080);

		this._fFramesCount_num = MBackgroundJellyfishPoolView.JELLYFISH_GENERATION_INTERVAL_IN_FRAMES;
		this._fJellyfish_mjv_arr = []
		this._fBubblePool_mbpv = aBubblePool_mbpv;

		//SKIP FRAMES TO FILL SCREEN ON START...
		for( let i = 0; i < 200; i++ )
		{
			this.onNextFrames(50);
		}
		//...SKIP FRAMES TO FILL SCREEN ON START


		this.setVFXLevel(0.25);

		this.addToDisplay();
	}

	generateJellyfish(aX_num, aY_num)
	{
		for( let i = 0; i < this._fJellyfish_mjv_arr.length; i++ )
		{
			let l_mjv = this._fJellyfish_mjv_arr[i];

			if(l_mjv.canBeReused())
			{
				l_mjv.reset(aX_num, aY_num);
				return;
			}
		}

		let l_mjv = this.addChild(new MJellyfishView());
		l_mjv.reset(aX_num, aY_num);
		this._fJellyfish_mjv_arr.push(l_mjv);
	}

	onNextFrames(aFramesCount_num)
	{

		for( let i = 0; i < this._fJellyfish_mjv_arr.length; i++ )
		{
			this._fJellyfish_mjv_arr[i].update(aFramesCount_num);
		}


		this._fFramesCount_num += aFramesCount_num;


		if(this._fFramesCount_num > MBackgroundJellyfishPoolView.JELLYFISH_GENERATION_INTERVAL_IN_FRAMES)
		{
			this._fFramesCount_num = Math.floor(this._fFramesCount_num % MBackgroundJellyfishPoolView.JELLYFISH_GENERATION_INTERVAL_IN_FRAMES);
			
			this.generateJellyfish(
				Math.random() * this.getWidth(),
				this.getHeight() + 100);
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