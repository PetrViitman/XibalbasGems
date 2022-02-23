const GROUPS_POSITIONS =
[
	//new MPoint(2320 * 0.25, 800),
	//new MPoint(2320 * 0.5, 	800),
	//new MPoint(2320 * 0.75, 800),
	//new MPoint(2320 * 1, 	800),

	new MPoint(2320 * 0.25, 950),
	new MPoint(2320 * 0.5, 	950),
	new MPoint(2320 * 0.75, 950),
	new MPoint(2320 * 1, 	950),
]

const GROUPS_SCALES =
[
	//0.62,
	//0.62,
	//0.62,
	//0.62,

	1,
	1,
	1,
	1,
]

class MFishGroupsView extends MView
{
	constructor()
	{
		super(0, 0, 1920, 1080);
		this.addToDisplay();

		this._fGroups_mfgv_arr = [];

		for( let i = 0; i< GROUPS_POSITIONS.length; i++ )
		{
			let l_mfgv = new MFishSingleGroupView();
			l_mfgv.setXY(
				GROUPS_POSITIONS[i].getX(),
				GROUPS_POSITIONS[i].getY());

			l_mfgv.setScale(GROUPS_SCALES[i]);

			this._fGroups_mfgv_arr[i] = this.addChild(l_mfgv);
		}

		this.setVFXLevel(0.25);
	}

	onNextFrames(aFramesCount_num)
	{
		for( let i = 0; i< this._fGroups_mfgv_arr.length; i++ )
		{
			this._fGroups_mfgv_arr[i].update(aFramesCount_num);
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