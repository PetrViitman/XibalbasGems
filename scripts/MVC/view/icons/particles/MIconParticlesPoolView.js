class MIconParticlesPoolView extends MView
{
	static get PARTICLES_SPAWN_INTERVAL() { return 20 }

	constructor()
	{
		super();

		this._fParticles_mipv_arr = [];
		this._fFramesCount_int = 0;

		//SKIP FRAMES ON START...
		for( let i = 0; i < 50; i++ )
		{
			this.onNextFrames(1);
		}
		//...SKIP FRAMES ON START

		this.setVFXLevel(0.75);
	}


	generateParticles(aX_num, aY_num)
	{
		for( let i = 0; i < this._fParticles_mipv_arr.length; i++ )
		{
			let l_mipv = this._fParticles_mipv_arr[i];

			if(l_mipv.canBeReused())
			{
				l_mipv.reset(aX_num, aY_num);
				return;
			}
		}

		let l_mipv = this.addChild(new MIconParticlesView());
		l_mipv.reset(aX_num, aY_num);
		this._fParticles_mipv_arr.push(l_mipv);
	}

	onNextFrames(aFramesCount_num)
	{
		for( let i = 0; i < this._fParticles_mipv_arr.length; i++ )
		{
			this._fParticles_mipv_arr[i].update(aFramesCount_num);
		}

		this._fFramesCount_int += aFramesCount_num;

		if(this._fFramesCount_int > MIconParticlesPoolView.PARTICLES_SPAWN_INTERVAL)
		{
			this._fFramesCount_int = Math.floor(this._fFramesCount_int % MIconParticlesPoolView.PARTICLES_SPAWN_INTERVAL);
			this.generateParticles(0, 50);
		}
	}

}