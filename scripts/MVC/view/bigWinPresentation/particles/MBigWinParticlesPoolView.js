class MBigWinParticlesPoolView extends MView
{
	static get PARTICLES_SPAWN_INTERVAL() { return 40 }

	constructor(aSourceContainer_mdc)
	{
		super();

		this._fParticles_mipv_arr = [];
		this._fFramesCount_int = 0;
		this._fSourceContainer_mdc = aSourceContainer_mdc;

		this.setVFXLevel(0.75);
		this.setVisible(false);
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

		let l_mipv = this.addChild(new MBigWinParticlesView());
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

		if(this._fFramesCount_int > MBigWinParticlesPoolView.PARTICLES_SPAWN_INTERVAL)
		{
			this._fFramesCount_int = Math.floor(this._fFramesCount_int % MBigWinParticlesPoolView.PARTICLES_SPAWN_INTERVAL);
			this.generateParticles(
				this._fSourceContainer_mdc.getX(),
				this._fSourceContainer_mdc.getY() - 450);
		}
	}


	drop()
	{
		for( let i = 0; i < this._fParticles_mipv_arr.length; i++ )
		{
			this._fParticles_mipv_arr[i].drop();
		}
	}

}