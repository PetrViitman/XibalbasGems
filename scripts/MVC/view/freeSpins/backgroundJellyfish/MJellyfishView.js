const JELLYFISH_COLOR_ID_RED = 0;
const JELLYFISH_COLOR_ID_ORANGE = 1;
const JELLYFISH_COLOR_ID_YELLOW = 2;

const JELLYFISH_COLORS_IDS =
[
	JELLYFISH_COLOR_ID_RED,
	JELLYFISH_COLOR_ID_ORANGE,
	JELLYFISH_COLOR_ID_YELLOW
];

const JELLYFISH_COLORS_COUNT = JELLYFISH_COLORS_IDS.length;


class MJellyfishView extends MView
{
	static get PROGRESS_SPEED() { return 0.005 }
	static get MOTION_SCALE_Y_DELTA() { return 0.4 }
	static get MOTION_Y_DELTA() { return 5 }
	static get MOVE_SPEED() { return -1.5 }

	static get FLOATING_SPEED() 			{ return 0.5 }
	static get SCALE_SPEED() 				{ return 0.01 }
	static get ANGLE_CHANGE_SPEED() 		{ return 0.05 }

	constructor()
	{
		super();

		this._fHeadContainer_mdc = null;
		this._fHeadShadow_mdo = null;
		this._fBodyContainer_mdc = null;
		this._fBodyShadow_mdo = null;
		this._fTailContainer_mdc = null;
		this._fTailShadow_mdo = null;
		this._fProgress_num = 0;

		this._fTargetAngle_num = undefined;
		this._fTargetX_num = undefined;
		this._fTargetY_num = undefined;

		this._fCanBeReused_bl = false;

		this._fColoredParts_mdo_arr_arr = [];
		

		let lPictures_mp_arr_arr =
		[
			[
				STORAGE.jellyfishHeadRed_mp,
				STORAGE.jellyfishHeadOrange_mp,
				STORAGE.jellyfishHeadYellow_mp,
			],
			[
				STORAGE.jellyfishBodyRed_mp,
				STORAGE.jellyfishBodyOrange_mp,
				STORAGE.jellyfishBodyYellow_mp,
			],
			[
				STORAGE.jellyfishTailRed_mp,
				STORAGE.jellyfishTailOrange_mp,
				STORAGE.jellyfishTailYellow_mp,
			]
		];


		let lHead_mdc = this.addChild(new MDisplayContainer());
		let lHead_mdo = null;
		let lBody_mdc = this.addChild(new MDisplayContainer());
		let lBody_mdo = null;
		let lTail_mdc = this.addChild(new MDisplayContainer());
		let lTail_mdo = null;


		for( let i = 0; i < JELLYFISH_COLORS_COUNT; i++ )
		{
			let l_mdo_arr = [];

			//HEAD...
			lHead_mdo = lHead_mdc.addChild(new MDisplayObject(lPictures_mp_arr_arr[0][i]));
			lHead_mdo.setY(-lHead_mdo.getHeight() / 2);
			l_mdo_arr.push(lHead_mdo);
			//...HEAD

			//BODY...
			lBody_mdo = lBody_mdc.addChild(new MDisplayObject(lPictures_mp_arr_arr[1][i]));
			lBody_mdo.setY(-lHead_mdo.getHeight() / 2);
			l_mdo_arr.push(lBody_mdo);
			//...BODY


			//HEAD...
			lTail_mdo = lTail_mdc.addChild(new MDisplayObject(lPictures_mp_arr_arr[2][i]));
			lTail_mdo.setY(-lTail_mdo.getHeight() / 2);
			l_mdo_arr.push(lTail_mdo);
			//...HEAD

			this._fColoredParts_mdo_arr_arr[i] = l_mdo_arr;
		}

		//SHADOW...
		//HEAD...
		this._fHeadShadow_mdo = lHead_mdc.addChild(new MDisplayObject(STORAGE.fishHeadShadow_mp));
		this._fHeadShadow_mdo.setY(-lHead_mdo.getHeight() / 2);
		lHead_mdc.setX(this._fHeadShadow_mdo.getWidth() / 2 - 1);
		this._fHeadContainer_mdc = lHead_mdc;
		//...HEAD

		//BODY...
		this._fBodyShadow_mdo = lBody_mdc.addChild(new MDisplayObject(STORAGE.fishBodyShadow_mp));
		this._fBodyShadow_mdo.setY(-lHead_mdo.getHeight() / 2);
		lBody_mdc.setX(-this._fBodyShadow_mdo.getWidth() / 2);
		this._fBodyContainer_mdc = lBody_mdc;
		//...BODY

		//TAIL...
		this._fTailShadow_mdo = lTail_mdc.addChild(new MDisplayObject(STORAGE.fishTailShadow_mp));
		this._fTailShadow_mdo.setY(-lTail_mdo.getHeight() / 2);
		lTail_mdc.setX(-this._fTailShadow_mdo.getWidth() * 1.5 + 1);
		this._fTailContainer_mdc = lTail_mdc;
		//...TAIL
		//...SHADOW

		this.setScaleX(-1);
		this.setRotationInDegrees(-90);
		this.reset(Math.random());

		//RESPONSIVE DESIGN...
		this.setParentProportionsCorrectionMode(MDisplayContainer.PARENT_PROPORTIONS_CORRECTION_MODE_ID_WIDTH);
		//...RESPONSIVE DESIGN

		//VFX LEVEL...
		this._fHeadShadow_mdo.setVFXLevel(0.5);
		this._fBodyShadow_mdo.setVFXLevel(0.5);
		this._fTailShadow_mdo.setVFXLevel(0.5);
		//...VFX LEVEL
	}

	reset(aX_num, aY_num)
	{
		this._fCanBeReused_bl = false;
		this.setXY(aX_num, aY_num);

		this._fProgress_num = 0;
		this._fTargetAngle_num = Math.random() * Math.PI * 2;
		this._fTargetX_num = aX_num;
		this._fTargetY_num = aY_num;

		let lColorId_int = Math.round(Math.random() * 2);

		for( let i = 0; i < JELLYFISH_COLORS_COUNT; i++ )
		{
			for( let j = 0; j < this._fColoredParts_mdo_arr_arr[i].length; j++ )
			{
				this._fColoredParts_mdo_arr_arr[i][j].setVisible(i === lColorId_int);
			}
		}

		this.update(0);

		
	}

	canBeReused()
	{
		return this._fCanBeReused_bl;
	}

	update(aFramesCount_num)
	{
		if(this.canBeReused())
		{
			return;
		}

		this._fProgress_num += MJellyfishView.PROGRESS_SPEED * aFramesCount_num;

		if(this._fProgress_num > 1)
		{
			this._fProgress_num = this._fProgress_num % 1;
		}

		let lProgress_num = this._fProgress_num * 4;

		if(lProgress_num <= 1)
		{

		}
		else if(lProgress_num <= 2)
		{
			lProgress_num = 1 - (lProgress_num - 1);
		}
		else if(lProgress_num <= 3)
		{
			lProgress_num = -(lProgress_num - 2);
		}
		else if(lProgress_num <= 4)
		{
			lProgress_num = -(1 -(lProgress_num - 3));
		}

		//MOTION...
		this._fHeadContainer_mdc.setY(-lProgress_num * MJellyfishView.MOTION_Y_DELTA);
		this._fBodyContainer_mdc.setY(lProgress_num * MJellyfishView.MOTION_Y_DELTA);
		this._fTailContainer_mdc.setY(-lProgress_num * MJellyfishView.MOTION_Y_DELTA);
		this.setScaleY(1 - Math.abs(lProgress_num) * MJellyfishView.MOTION_SCALE_Y_DELTA);
		//...MOTION

		//SHADOWS...
		if(lProgress_num > 0)
		{
			let lAlpha_num = Math.abs(lProgress_num) * 0.38;
			this._fHeadShadow_mdo.setAlpha(lAlpha_num);
			this._fTailShadow_mdo.setAlpha(lAlpha_num);
			this._fBodyShadow_mdo.setAlpha(0);
		}
		else
		{
			let lAlpha_num = Math.abs(lProgress_num) * 0.38;
			this._fHeadShadow_mdo.setAlpha(0);
			this._fTailShadow_mdo.setAlpha(0);
			this._fBodyShadow_mdo.setAlpha(lAlpha_num);
		}
		//...SHADOWS

		this._fTargetAngle_num += MJellyfishView.ANGLE_CHANGE_SPEED;
		this._fTargetX_num += MJellyfishView.FLOATING_SPEED * Math.cos(this._fTargetAngle_num) * aFramesCount_num
		this._fTargetY_num += MJellyfishView.MOVE_SPEED * aFramesCount_num;

		this.setXY(this._fTargetX_num, this._fTargetY_num);

		if(this.getY() < -75)
		{
			this._fCanBeReused_bl = true;
		}
	}
}