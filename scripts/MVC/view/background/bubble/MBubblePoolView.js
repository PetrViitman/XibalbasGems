class MBubblePoolView extends MView
{
	constructor()
	{
		super(0, 0, 1920, 1080);

		this._fbubbles_mbv_arr = [];

		this.addToDisplay();
		
		this.setVFXLevel(1);
	}


	generateBubble(aX_num, aY_num)
	{
		if(this.isForbiddenDueOptimization())
		{
			return;
		}


		for( let i = 0; i < this._fbubbles_mbv_arr.length; i++ )
		{
			let l_mbv = this._fbubbles_mbv_arr[i];

			if(l_mbv.canBeReused())
			{
				l_mbv.reset(aX_num, aY_num);
				return;
			}
		}

		let l_mbv = this.addChild(new MBubbleView());

		l_mbv.reset(aX_num, aY_num);
		this._fbubbles_mbv_arr.push(l_mbv);
	}

	onNextFrames(aFramesCount_num)
	{
		for( let i = 0; i < this._fbubbles_mbv_arr.length; i++ )
		{
			this._fbubbles_mbv_arr[i].update(aFramesCount_num);
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