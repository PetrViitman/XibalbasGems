class MFloatingParticlePoolView extends MView
{
	static get SPAWN_INTERVAL() { return 100 }

	constructor()
	{
		super(0, 0, 1920, 1080);

		this._fParticles_mfpv_arr = [];
		this._fFramesCount_int = 0;

		this.addToDisplay();

		//SKIP FRAMES TO FILL SCREEN ON START...
		for( let i = 0; i < 10; i++ )
		{
			this.onNextFrames(100);
		}
		//...SKIP FRAMES TO FILL SCREEN ON START

		this.setVFXLevel(1);
	}


	generateFloatingParticle()
	{
		let lX_num = Math.random() * this.getWidth();
		let lY_num = Math.random() * this.getHeight();

		for( let i = 0; i < this._fParticles_mfpv_arr.length; i++ )
		{
			let l_mfpv = this._fParticles_mfpv_arr[i];

			if(l_mfpv.canBeReused())
			{
				l_mfpv.reset(lX_num, lY_num);
				return;
			}
		}

		let l_mfpv = this.addChild(new MFloatingParticleView());

		l_mfpv.reset(lX_num, lY_num);
		this._fParticles_mfpv_arr.push(l_mfpv);
	}

	onNextFrames(aFramesCount_int)
	{
		this._fFramesCount_int += aFramesCount_int;

		for( let i = 0; i < this._fParticles_mfpv_arr.length; i++ )
		{
			this._fParticles_mfpv_arr[i].update(aFramesCount_int);
		}

		if(this._fFramesCount_int > MFloatingParticlePoolView.SPAWN_INTERVAL)
		{
			this._fFramesCount_int = Math.floor(this._fFramesCount_int % MFirePoolView.FIRE_SPAWN_INTERVAL);
			this.generateFloatingParticle();
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