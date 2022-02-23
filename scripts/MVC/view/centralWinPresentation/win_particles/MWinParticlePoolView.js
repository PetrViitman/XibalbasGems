class MWinParticlePoolView extends MView
{
	static get SPAWN_INTERVAL() { return 25 }

	constructor()
	{
		super(0, 0, 1920, 1080);

		this._fParticles_mwpv_arr = [];
		this._fFramesCount_int = 0;
		this.addToDisplay();

		//RESPONSIVE DESIGN...
		this.setFillMode(MDisplayContainer.FILL_MODE_ID_FULL);
		this.setTargetArea(0, 0, 1, 1);
		//...RESPONSIVE DESIGN

		//SKIP FRAMES TO FILL SCREEN ON START...
		for( let i = 0; i < 100; i++ )
		{
			this.onNextFrames(10);
		}
		//...SKIP FRAMES TO FILL SCREEN ON START

		this.setVisible(false);
		this.setVFXLevel(0.25);
	}


	generateFloatingParticle()
	{
		let lX_num = Math.random() * this.getWidth();
		let lY_num = this.getHeight();

		for( let i = 0; i < this._fParticles_mwpv_arr.length; i++ )
		{
			let l_mbv = this._fParticles_mwpv_arr[i];

			if(l_mbv.canBeReused())
			{
				l_mbv.reset(lX_num, lY_num);
				return;
			}
		}

		let l_mbv = this.addChild(new MWinParticleView());

		l_mbv.reset(lX_num, lY_num);
		this._fParticles_mwpv_arr.push(l_mbv);
	}

	onNextFrames(aFramesCount_num)
	{
		this._fFramesCount_int += aFramesCount_num;

		for( let i = 0; i < this._fParticles_mwpv_arr.length; i++ )
		{
			this._fParticles_mwpv_arr[i].update(aFramesCount_num);
		}

		if(this._fFramesCount_int > MWinParticlePoolView.SPAWN_INTERVAL)
		{
			this._fFramesCount_int = Math.floor(this._fFramesCount_int % MFirePoolView.FIRE_SPAWN_INTERVAL);
			this.generateFloatingParticle();
		}
	}

}