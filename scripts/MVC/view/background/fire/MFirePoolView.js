class MFirePoolView extends MView
{
	static get FIRE_SPAWN_INTERVAL() { return 20 }

	constructor()
	{
		super();

		this._fFires_mfv_arr = [];
		this._fFramesCount_num = 0;

		this._fFireGenerationPoint_mp = new MPoint(0, 0);


		this.setVFXLevel(0.75);
	}


	generateFire()
	{
		let lX_num = this._fFireGenerationPoint_mp.getX();
		let lY_num = this._fFireGenerationPoint_mp.getY();

		for( let i = 0; i < this._fFires_mfv_arr.length; i++ )
		{
			let l_mfv = this._fFires_mfv_arr[i];

			if(l_mfv.canBeReused())
			{
				l_mfv.reset(lX_num, lY_num);
				return;
			}
		}

		let l_mfv = this.addChild(new MFireView());
		l_mfv.reset(lX_num, lY_num);
		this._fFires_mfv_arr.push(l_mfv);
	}


	setFireGenerationPosition(aX_num, aY_num)
	{
		this._fFireGenerationPoint_mp.setXY(aX_num, aY_num);
	}

	onNextFrames(aFramesCount_num)
	{
		this._fFramesCount_num += aFramesCount_num;

		for( let i = 0; i < this._fFires_mfv_arr.length; i++ )
		{
			this._fFires_mfv_arr[i].update(aFramesCount_num);
		}

		if(this._fFramesCount_num > MFirePoolView.FIRE_SPAWN_INTERVAL)
		{
			this._fFramesCount_num = Math.floor(this._fFramesCount_num % MFirePoolView.FIRE_SPAWN_INTERVAL);
			this.generateFire();
		}
	}

}