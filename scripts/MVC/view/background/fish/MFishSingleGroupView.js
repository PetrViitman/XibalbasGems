const FISH_POSITIONS =
[
	new MPoint(-100, 50),
	new MPoint(100, 50),
	new MPoint(0, -50),
]


class MFishSingleGroupView extends MView
{

	static get SCREEN_OFFSET_X() { return 200 }
	static get SPEED() { return 0.62 }
	static get FISHES_COUNT() { return FISH_POSITIONS.length }

	constructor()
	{
		super();
		this._fFishes_mfv_arr = [];

		for( let i = 0; i < MFishSingleGroupView.FISHES_COUNT; i++ )
		{
			let l_mfv = this.addChild(new MFishView());

			l_mfv.setXY(
				FISH_POSITIONS[i].getX(),
				FISH_POSITIONS[i].getY());

			this._fFishes_mfv_arr.push(l_mfv);
		}

		//RESPONSIVE DESIGN...
		this.setParentProportionsCorrectionMode(MDisplayContainer.PARENT_PROPORTIONS_CORRECTION_MODE_ID_FULL);
		//...RESPONSIVE DESIGN

	}

	update(aFramesCount_num)
	{
		this.setX( this.getX() + MFishSingleGroupView.SPEED * this.getScaleX() * aFramesCount_num )
		
		let lRightBorderX_int = this.getParent().getWidth() + MFishSingleGroupView.SCREEN_OFFSET_X;
		let lLeftBorderX_int = - MFishSingleGroupView.SCREEN_OFFSET_X;

		for( let i = 0; i < MFishSingleGroupView.FISHES_COUNT; i++ )
		{
			this._fFishes_mfv_arr[i].update(aFramesCount_num);
		}

		if( this.getX() > lRightBorderX_int )
		{
			this.setX(lLeftBorderX_int + this.getX() % lRightBorderX_int);

			for( let i = 0; i < MFishSingleGroupView.FISHES_COUNT; i++ )
			{
				this._fFishes_mfv_arr[i].reset(i * 0.33);
			}
		}

	}
}