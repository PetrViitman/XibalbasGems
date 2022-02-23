class MAnimation
{
	static get ANIMATION_TARGET()			{ return "ANIMATION_TARGET" }
	static get KEY_FRAME()					{ return "KEY_FRAME" }
	static get EASING()						{ return "EASING" }
	static get SET_X()						{ return "SET_X" }
	static get SET_Y()						{ return "SET_Y" }
	static get SET_WIDTH()					{ return "SET_WIDTH" }
	static get SET_HEIGHT()					{ return "SET_HEIGHT" }
	static get SET_SCALE() 					{ return "SET_SCALE" }
	static get SET_SCALE_X() 				{ return "SET_SCALE_X" }
	static get SET_SCALE_Y() 				{ return "SET_SCALE_Y" }
	static get SET_ALPHA()					{ return "SET_ALPHA" }
	static get SET_ROTATION_IN_DEGREES() 	{ return "SET_ROTATION_IN_DEGREES" }
	static get EXECUTE_METHOD()				{ return "EXECUTE_METHOD" }

	static get ANIMATION_PLAY_MODE_ID_FORWARD() 				{ return 0 }
	static get ANIMATION_PLAY_MODE_ID_BACK() 					{ return 1 }
	static get ANIMATION_PLAY_MODE_ID_LOOP() 					{ return 2 }
	static get ANIMATION_PLAY_MODE_ID_REPEAT_SEVERAL_TIMES() 	{ return 3 }


	static get LINEAR() 		{ return 0 }
	static get EASE() 			{ return 1 }
	static get EASE_IN() 		{ return 2 }
	static get EASE_OUT() 		{ return 3 }
	static get EASE_IN_OUT()	{ return 4 }


	static getCubicBezierY(aProgress_num, aX0_num, aX1_num, aX2_num, aX3_num)
	{
		let lReversedPorogress_num = 1 - aProgress_num;

		return (
			Math.pow(lReversedPorogress_num, 3) * aX0_num +
			3 * Math.pow(lReversedPorogress_num, 2) * aProgress_num * aX1_num +
			3 * lReversedPorogress_num * Math.pow(aProgress_num, 2) * aX2_num +
			Math.pow(aProgress_num, 3) * aX3_num);
	}

	static getEasingMultiplier(aEeasingId_int, aProgress_num)
	{
		switch(aEeasingId_int)
		{
			case MAnimation.EASE:
				return MAnimation.getCubicBezierY(aProgress_num, 0, 0.75, 0.9, 1);
			case MAnimation.EASE_IN:
				return MAnimation.getCubicBezierY(aProgress_num, 0, 0, 0.58, 1);
			case MAnimation.EASE_OUT:
				return MAnimation.getCubicBezierY(aProgress_num, 0, 0.42, 1, 1);
			case MAnimation.EASE_IN_OUT:
				return MAnimation.getCubicBezierY(aProgress_num, 0, 0.1, 1, 1);
		}

		return aProgress_num;
	}

	constructor(aWrapper_mt)
	{
		this._fFunctions_func_arr = [];
		this._fFunctionsCallFrameIndexes_int_arr = [];
		this._fAnimationFragments_obj_arr = [];
		this._fCurrentScaleX_num = 1;
		this._fCurrentScaleY_num = 1;
		this._fCurrentTranslateX_num = 0;
		this._fCurrentTranslateY_num = 0;
		this._fCurrentWidth_num = 0;
		this._fCurrentHeight_num = 0;
		this._fCurrentAlpha_num = 1;
		this._fCurrentAngle_num = 0;
		this._fMethodArgumentValue_num = 0;
		this._fCurrentFrameIndex_int = -1;
		this._fTotalFramesCount_int = 0;
		this._fExecutableMethodContext_ctx = this;
		this._fWrapper_mt = aWrapper_mt;

		this._fNextFrameCallbackFunction_func = this.onNextFrames.bind(this);
		this._fPlayModeId_int = MAnimation.ANIMATION_PLAY_MODE_ID_FORWARD;
		this._fIsPlaying_bl = false;
	}


	getTotalFramesCount()
	{
		return this._fTotalFramesCount_int;
	}

	getPreviousValue(aKey_int, aAnimationFragmentIndex_int)
	{
		for( let i = aAnimationFragmentIndex_int - 1; i > 0; i-- )
		{
			let lValue_num = this._fAnimationFragments_obj_arr[i][aKey_int];

			if(lValue_num !== undefined)
			{
				return lValue_num;
			}
		}

		return undefined;
	}

	callFunctionAtFrame(aFunction_func, aFrameIndex_int, aContext_ctx, aOptArgument1, aOptArgument2, aOptArgument3, aOptFrameRateMultiplier_num = 1)
	{
		let lFrameIndex_int = Math.round(aFrameIndex_int * aOptFrameRateMultiplier_num);

		this._fFunctions_func_arr.push(aFunction_func.bind(aContext_ctx, aOptArgument1, aOptArgument2, aOptArgument3));
		this._fFunctionsCallFrameIndexes_int_arr.push(lFrameIndex_int);

		if(lFrameIndex_int > this._fTotalFramesCount_int)
		{
			this._fTotalFramesCount_int = lFrameIndex_int;
		}
	}

	setAnimation(aTargetObject_mdc, aKey_str, aInitialValue_num, aDescriptors_num_arr_arr, aOptContext_ctx, aOptFrameRateMultiplier_num = 1)
	{
		let lTargetView_mdc = aTargetObject_mdc;
		let aAnimationDescriptor_obj_arr = [];

		/*
		local format looks like this:
		[
			{
				KEY_FRAME: 0,
				SET_X: 200,
				SET_SCALE_X: 0.5,
			},
			{
				KEY_FRAME: 200,
				SET_X: 100,
				SET_SCALE_X: 1,
			},
			{
				KEY_FRAME: 400,
				SET_X: 0,
				SET_SCALE_X: 0.5,
			},
		],

		*/

		//CONVERTING GIVEN DESCRIPTORS FROM UE TO LOCAL FORMAT...
		let lFameIndex_int = 0;

		aAnimationDescriptor_obj_arr[0] = {	KEY_FRAME : 0 };
		aAnimationDescriptor_obj_arr[0][aKey_str] = aInitialValue_num;

		for( let i = 0; i < aDescriptors_num_arr_arr.length; i++ )
		{
			let lDescriptor_num_arr = aDescriptors_num_arr_arr[i];
			let lDescriptor_obj = {};
			let lDurationInFrames_int = undefined;
			let lValue_num = undefined;
			let lEasingId_int = undefined;

			if(Array.isArray(lDescriptor_num_arr))
			{
				lDurationInFrames_int = Math.round(lDescriptor_num_arr[1] * aOptFrameRateMultiplier_num);
				
				if(lDescriptor_num_arr[1] === 1)
				{
					lDurationInFrames_int = 0.01;
				}

				lValue_num = lDescriptor_num_arr[0];
				lEasingId_int = lDescriptor_num_arr[2];
			}
			else
			{
				//TAKE SINGLE INT AS PAUSE...
				/*
					...
					[0.75, 13],
					25, <------- like this
					[0.5, 10],
					...
				*/
				lDurationInFrames_int = Math.round(lDescriptor_num_arr * aOptFrameRateMultiplier_num);

				//USE PREVIOUS VALUE...
				if(i === 0)
				{
					lValue_num = aInitialValue_num;
				}
				else
				{
					lValue_num = aDescriptors_num_arr_arr[i - 1][0];
				}
				//...USE PREVIOUS VALUE
				//...TAKE SINGLE INT AS PAUSE
			}


			lFameIndex_int += lDurationInFrames_int;
			lDescriptor_obj[MAnimation.KEY_FRAME] = lFameIndex_int;
			lDescriptor_obj[aKey_str] = lValue_num;
			lDescriptor_obj[MAnimation.EASING] = lEasingId_int === undefined ? MAnimation.LINEAR : lEasingId_int;

			aAnimationDescriptor_obj_arr.push(lDescriptor_obj);
		}
		//...CONVERTING GIVEN DESCRIPTORS FROM UE TO LOCAL FORMAT



		this._fAnimationFragments_obj_arr = aAnimationDescriptor_obj_arr;

		for( let i = 0; i < aAnimationDescriptor_obj_arr.length; i++ )
		{
			let lAnimation_obj = aAnimationDescriptor_obj_arr[i];

			if(lAnimation_obj[MAnimation.KEY_FRAME] > this._fTotalFramesCount_int)
			{
				this._fTotalFramesCount_int = lAnimation_obj[MAnimation.KEY_FRAME];
			}

			lAnimation_obj[MAnimation.ANIMATION_TARGET] = lTargetView_mdc;

			if(lAnimation_obj[MAnimation.SET_SCALE] !== undefined)
			{
				lAnimation_obj[MAnimation.SET_SCALE_X] = lAnimation_obj[MAnimation.SET_SCALE];
				lAnimation_obj[MAnimation.SET_SCALE_Y] = lAnimation_obj[MAnimation.SET_SCALE];
			}
		}

		if(!!aOptContext_ctx)
		{
			this._fExecutableMethodContext_ctx = aOptContext_ctx;
		}
	}


	getPreviousFragmentForKey(aAnimationFragmentIndex_int, aKey_int)
	{
		let lAnimationFragments_obj_arr = this._fAnimationFragments_obj_arr;
		
		for( let i = aAnimationFragmentIndex_int - 1; i >= 0; i-- )
		{
			if(lAnimationFragments_obj_arr[i][aKey_int] !== undefined)
			{
				return lAnimationFragments_obj_arr[i];
			}
		}

		return lAnimationFragments_obj_arr[aAnimationFragmentIndex_int];
	}

	getNextFragmentForKey(aAnimationFragmentIndex_int, aKey_int)
	{
		let lAnimationFragments_obj_arr = this._fAnimationFragments_obj_arr;
		
		for( let i = aAnimationFragmentIndex_int; i < lAnimationFragments_obj_arr.length; i++ )
		{
			if(lAnimationFragments_obj_arr[i][aKey_int] !== undefined)
			{
				return lAnimationFragments_obj_arr[i];
			}
		}

		return lAnimationFragments_obj_arr[lAnimationFragments_obj_arr.length - 1];
	}


	_wind(aFrameIndex_int)
	{
		let lAnimationFragments_obj_arr = this._fAnimationFragments_obj_arr;
		let lAnimationFragmentsCount_int = lAnimationFragments_obj_arr.length;
		let lCurrentAnimationFragmentIndex_int = 0;
		let lKey_int = undefined;
		let lPreviousAnimationFragment_obj = null;
		let lNextAnimationFragment_obj = null;
		let lFramesDelta_num = 0;
		let lProgress_num = 0;
		let lDelta_num = 0;
		let lEasingId_int = 0;

		//INITIAL VALUES...
		if(aFrameIndex_int === -1)
		{
			let lAnimationFragment_obj = this._fAnimationFragments_obj_arr[0];

			//TRANSLATE X...
			if(
				lAnimationFragment_obj &&
				lAnimationFragment_obj[MAnimation.SET_X]
				)
			{
				lAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setX(lAnimationFragment_obj[MAnimation.SET_X]);
			}
			//...TRANSLATE X

			//TRANSLATE Y...
			if(
				lAnimationFragment_obj &&
				lAnimationFragment_obj[MAnimation.SET_Y]
				)
			{
				lAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setY(lAnimationFragment_obj[MAnimation.SET_Y]);
			}
			//...TRANSLATE Y

			//SET WIDTH...
			if(
				lAnimationFragment_obj &&
				lAnimationFragment_obj[MAnimation.SET_WIDTH]
				)
			{
				lAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setWidth(lAnimationFragment_obj[MAnimation.SET_WIDTH]);
			}
			//...SET WIDTH

			//SET HEIGHT...
			if(
				lAnimationFragment_obj &&
				lAnimationFragment_obj[MAnimation.SET_HEIGHT]
				)
			{
				lAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setHeight(lAnimationFragment_obj[MAnimation.SET_HEIGHT]);
			}
			//...SET HEIGHT

			//SCALE X...
			if(
				lAnimationFragment_obj &&
				lAnimationFragment_obj[MAnimation.SET_SCALE_X]
				)
			{
				lAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setScaleX(lAnimationFragment_obj[MAnimation.SET_SCALE_X]);
			}
			//...SCALE X

			//SCALE Y...
			if(
				lAnimationFragment_obj &&
				lAnimationFragment_obj[MAnimation.SET_SCALE_Y]
				)
			{
				lAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setScaleY(lAnimationFragment_obj[MAnimation.SET_SCALE_Y]);
			}
			//...SCALE Y

			//ROTATION IN DEGREES...
			if(
				lAnimationFragment_obj &&
				lAnimationFragment_obj[MAnimation.SET_ROTATION_IN_DEGREES]
				)
			{
				lAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setRotationInDegrees(lAnimationFragment_obj[MAnimation.SET_ROTATION_IN_DEGREES]);
			}
			//...ROTATION IN DEGREES

			//ALPHA...
			if(
				lAnimationFragment_obj &&
				lAnimationFragment_obj[MAnimation.SET_ALPHA]
				)
			{
				lAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setAlpha(lAnimationFragment_obj[MAnimation.SET_ALPHA]);
			}
			//...ALPHA
		}
		//...INITIAL VALUES

		for( let i = 0; i < this._fAnimationFragments_obj_arr.length; i++ )
		{
			let lAnimationFragment_obj = this._fAnimationFragments_obj_arr[i];

			if(aFrameIndex_int <= lAnimationFragment_obj[MAnimation.KEY_FRAME])
			{
				lCurrentAnimationFragmentIndex_int = i;
				break;
			}
		}

		//TRANSLATE X...
		lKey_int = MAnimation.SET_X;
		lPreviousAnimationFragment_obj = this.getPreviousFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int);

		if(lPreviousAnimationFragment_obj)
		{
			lNextAnimationFragment_obj =  this.getNextFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int) || lPreviousAnimationFragment_obj;
			lFramesDelta_num = lNextAnimationFragment_obj[MAnimation.KEY_FRAME] - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME];
			lProgress_num = (aFrameIndex_int - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME]) / lFramesDelta_num;
			lDelta_num = lNextAnimationFragment_obj[lKey_int] - lPreviousAnimationFragment_obj[lKey_int];
			lEasingId_int = lNextAnimationFragment_obj.EASING;

			this._fCurrentTranslateX_num = lPreviousAnimationFragment_obj[lKey_int];

			if(
				!Number.isNaN(lDelta_num) &&
				lPreviousAnimationFragment_obj !== lNextAnimationFragment_obj
				)
			{
				this._fCurrentTranslateX_num += lDelta_num * MAnimation.getEasingMultiplier(lEasingId_int, lProgress_num);
				lPreviousAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setX(this._fCurrentTranslateX_num);
			}
		}
		//...TRANSLATE X

		//TRANSLATE Y...
		lKey_int = MAnimation.SET_Y;
		lPreviousAnimationFragment_obj = this.getPreviousFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int);
		
		if(lPreviousAnimationFragment_obj)
		{

			lNextAnimationFragment_obj =  this.getNextFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int) || lPreviousAnimationFragment_obj;
			lFramesDelta_num = lNextAnimationFragment_obj[MAnimation.KEY_FRAME] - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME];
			lProgress_num = (aFrameIndex_int - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME]) / lFramesDelta_num;
			lDelta_num = lNextAnimationFragment_obj[lKey_int] - lPreviousAnimationFragment_obj[lKey_int];
			lEasingId_int = lNextAnimationFragment_obj.EASING;

			this._fCurrentTranslateY_num = lPreviousAnimationFragment_obj[lKey_int];

			if(
				!Number.isNaN(lDelta_num) &&
				lPreviousAnimationFragment_obj !== lNextAnimationFragment_obj
				)
			{
				this._fCurrentTranslateY_num += lDelta_num * MAnimation.getEasingMultiplier(lEasingId_int, lProgress_num);;
				lPreviousAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setY(this._fCurrentTranslateY_num);
			}
		}
		//...TRANSLATE Y

		//SET WIDTH...
		lKey_int = MAnimation.SET_WIDTH;
		lPreviousAnimationFragment_obj = this.getPreviousFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int);

		if(lPreviousAnimationFragment_obj)
		{
			lNextAnimationFragment_obj =  this.getNextFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int) || lPreviousAnimationFragment_obj;
			lFramesDelta_num = lNextAnimationFragment_obj[MAnimation.KEY_FRAME] - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME];
			lProgress_num = (aFrameIndex_int - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME]) / lFramesDelta_num;
			lDelta_num = lNextAnimationFragment_obj[lKey_int] - lPreviousAnimationFragment_obj[lKey_int];
			lEasingId_int = lNextAnimationFragment_obj.EASING;

			this._fCurrentWidth_num = lPreviousAnimationFragment_obj[lKey_int];

			if(
				!Number.isNaN(lDelta_num) &&
				lPreviousAnimationFragment_obj !== lNextAnimationFragment_obj
				)
			{
				this._fCurrentWidth_num += lDelta_num * MAnimation.getEasingMultiplier(lEasingId_int, lProgress_num);
				lPreviousAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setWidth(this._fCurrentWidth_num);
			}
		}
		//...SET WIDTH

		//SET HEIGHT...
		lKey_int = MAnimation.SET_HEIGHT;
		lPreviousAnimationFragment_obj = this.getPreviousFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int);

		if(lPreviousAnimationFragment_obj)
		{
			lNextAnimationFragment_obj =  this.getNextFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int) || lPreviousAnimationFragment_obj;
			lFramesDelta_num = lNextAnimationFragment_obj[MAnimation.KEY_FRAME] - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME];
			lProgress_num = (aFrameIndex_int - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME]) / lFramesDelta_num;
			lDelta_num = lNextAnimationFragment_obj[lKey_int] - lPreviousAnimationFragment_obj[lKey_int];
			lEasingId_int = lNextAnimationFragment_obj.EASING;

			this._fCurrentHeight_num = lPreviousAnimationFragment_obj[lKey_int];

			if(
				!Number.isNaN(lDelta_num) &&
				lPreviousAnimationFragment_obj !== lNextAnimationFragment_obj
				)
			{
				this._fCurrentHeight_num += lDelta_num * MAnimation.getEasingMultiplier(lEasingId_int, lProgress_num);
				lPreviousAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setHeight(this._fCurrentHeight_num);
			}
		}
		//...SET HEIHGT

		//SCALE X...
		lKey_int = MAnimation.SET_SCALE_X;
		lPreviousAnimationFragment_obj = this.getPreviousFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int);
		
		if(lPreviousAnimationFragment_obj)
		{
			lNextAnimationFragment_obj =  this.getNextFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int) || lPreviousAnimationFragment_obj;
			lFramesDelta_num = lNextAnimationFragment_obj[MAnimation.KEY_FRAME] - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME];
			lProgress_num = (aFrameIndex_int - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME]) / lFramesDelta_num;
			lDelta_num = lNextAnimationFragment_obj[lKey_int] - lPreviousAnimationFragment_obj[lKey_int];
			lEasingId_int = lNextAnimationFragment_obj.EASING;

			this._fCurrentScaleX_num = lPreviousAnimationFragment_obj[lKey_int];

			if(
				!Number.isNaN(lDelta_num) &&
				lPreviousAnimationFragment_obj !== lNextAnimationFragment_obj
				)
			{
				this._fCurrentScaleX_num += lDelta_num * MAnimation.getEasingMultiplier(lEasingId_int, lProgress_num);;
				lPreviousAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setScaleX(this._fCurrentScaleX_num);
			}
		}
		//...SCALE X

		//SCALE Y...
		lKey_int = MAnimation.SET_SCALE_Y;
		lPreviousAnimationFragment_obj = this.getPreviousFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int);
		
		if(lPreviousAnimationFragment_obj)
		{
			lNextAnimationFragment_obj =  this.getNextFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int) || lPreviousAnimationFragment_obj;
			lFramesDelta_num = lNextAnimationFragment_obj[MAnimation.KEY_FRAME] - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME];
			lProgress_num = (aFrameIndex_int - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME]) / lFramesDelta_num;
			lDelta_num = lNextAnimationFragment_obj[lKey_int] - lPreviousAnimationFragment_obj[lKey_int];
			lEasingId_int = lNextAnimationFragment_obj.EASING;

			this._fCurrentScaleY_num = lPreviousAnimationFragment_obj[lKey_int];

			if(
				!Number.isNaN(lDelta_num) &&
				lPreviousAnimationFragment_obj !== lNextAnimationFragment_obj
				)
			{
				this._fCurrentScaleY_num += lDelta_num * MAnimation.getEasingMultiplier(lEasingId_int, lProgress_num);;
				lPreviousAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setScaleY(this._fCurrentScaleY_num);
			}
		}
		//...SCALE Y

		//ROTATION_IN_DEGREES...
		lKey_int = MAnimation.SET_ROTATION_IN_DEGREES;
		lPreviousAnimationFragment_obj = this.getPreviousFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int);
		
		if(lPreviousAnimationFragment_obj)
		{
			lNextAnimationFragment_obj =  this.getNextFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int) || lPreviousAnimationFragment_obj;
			lFramesDelta_num = lNextAnimationFragment_obj[MAnimation.KEY_FRAME] - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME];
			lProgress_num = (aFrameIndex_int - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME]) / lFramesDelta_num;
			lDelta_num = lNextAnimationFragment_obj[lKey_int] - lPreviousAnimationFragment_obj[lKey_int];
			lEasingId_int = lNextAnimationFragment_obj.EASING;

			this._fCurrentAngle_num = lPreviousAnimationFragment_obj[lKey_int];
			if(
				!Number.isNaN(lDelta_num) &&
				lPreviousAnimationFragment_obj !== lNextAnimationFragment_obj
				)
			{
				this._fCurrentAngle_num += lDelta_num * MAnimation.getEasingMultiplier(lEasingId_int, lProgress_num);;
				lPreviousAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setRotationInDegrees(this._fCurrentAngle_num);
			}
		}
		//...ROTATION_IN_DEGREES

		//ALPHA...
		lKey_int = MAnimation.SET_ALPHA;
		lPreviousAnimationFragment_obj = this.getPreviousFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int);
		
		if(lPreviousAnimationFragment_obj)
		{
			lNextAnimationFragment_obj =  this.getNextFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int) || lPreviousAnimationFragment_obj;
			lFramesDelta_num = lNextAnimationFragment_obj[MAnimation.KEY_FRAME] - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME];
			lProgress_num = (aFrameIndex_int - lPreviousAnimationFragment_obj.		KEY_FRAME) / lFramesDelta_num;
			lDelta_num = lNextAnimationFragment_obj[lKey_int] - lPreviousAnimationFragment_obj[lKey_int];
			lEasingId_int = lNextAnimationFragment_obj.EASING;

			this._fCurrentAlpha_num = lPreviousAnimationFragment_obj[lKey_int];

			if(
				!Number.isNaN(lDelta_num) &&
				lPreviousAnimationFragment_obj !== lNextAnimationFragment_obj
				)
			{
				this._fCurrentAlpha_num += lDelta_num * MAnimation.getEasingMultiplier(lEasingId_int, lProgress_num);
				lPreviousAnimationFragment_obj[MAnimation.ANIMATION_TARGET].setAlpha(this._fCurrentAlpha_num);
			}
		}
		//...ALPHA


		//EXECUTE_METHOD...
		lKey_int = MAnimation.EXECUTE_METHOD;
		lPreviousAnimationFragment_obj = this.getPreviousFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int);
		
		if(lPreviousAnimationFragment_obj)
		{
			lNextAnimationFragment_obj =  this.getNextFragmentForKey(lCurrentAnimationFragmentIndex_int, lKey_int) || lPreviousAnimationFragment_obj;
			lFramesDelta_num = lNextAnimationFragment_obj[MAnimation.KEY_FRAME] - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME];
			lProgress_num = (aFrameIndex_int - lPreviousAnimationFragment_obj[MAnimation.KEY_FRAME]) / lFramesDelta_num;
			lDelta_num = lNextAnimationFragment_obj[lKey_int] - lPreviousAnimationFragment_obj[lKey_int];
			lEasingId_int = lNextAnimationFragment_obj.EASING;

			this._fMethodArgumentValue_num = lPreviousAnimationFragment_obj[lKey_int];
			if(
				!Number.isNaN(lDelta_num) &&
				lPreviousAnimationFragment_obj !== lNextAnimationFragment_obj
				)
			{
				this._fMethodArgumentValue_num += lDelta_num * MAnimation.getEasingMultiplier(lEasingId_int, lProgress_num);

				lPreviousAnimationFragment_obj[MAnimation.ANIMATION_TARGET].call(this._fExecutableMethodContext_ctx, this._fMethodArgumentValue_num);
			}
		}
		//...EXECUTE_METHOD
	}

	playFromFrame(aFrameIndex_int, aOptModeId_int = MAnimation.ANIMATION_PLAY_MODE_ID_FORWARD)
	{
		this.play(aOptModeId_int);
		this._fCurrentFrameIndex_int = aFrameIndex_int;
	}

	play(aOptModeId_int = MAnimation.ANIMATION_PLAY_MODE_ID_FORWARD)
	{
		this._fCurrentFrameIndex_int = -1;
		this._fPlayModeId_int = aOptModeId_int;
		this._fIsPlaying_bl = true;

		this._wind(this._fCurrentFrameIndex_int);
	}

	stop()
	{
		this._fIsPlaying_bl = false;
	}

	getCurrentFrameIndex()
	{
		return this._fCurrentFrameIndex_int;
	}

	onNextFrames(aFramesCount_num)
	{
		let lFramesDelta_num = aFramesCount_num;

		if(this._fFunctions_func_arr.length > 0)
		{
			//CALLING FUNCTIONS IF REQUIRED...
			for( let i = 0; i < this._fFunctions_func_arr.length; i++ )
			{
				switch(this._fPlayModeId_int)
				{
					case MAnimation.ANIMATION_PLAY_MODE_ID_BACK:
					{
						let lTotalFramesCount_int = this._fWrapper_mt.getTotalFramesCount();
						let lFrameIndex_int = lTotalFramesCount_int - this._fWrapper_mt.getCurrentFrameIndex();
						let lFunctionFrameIndex_int = this._fFunctionsCallFrameIndexes_int_arr[i];

						if(
							lFunctionFrameIndex_int > lFrameIndex_int &&
							lFunctionFrameIndex_int <= lFrameIndex_int + lFramesDelta_num
							)
						{
							this._fFunctions_func_arr[i].call();
						}
					}
					break;
					default:
					{
						let lFrameIndex_int = this._fCurrentFrameIndex_int;
						let lFunctionFrameIndex_int = this._fFunctionsCallFrameIndexes_int_arr[i];

						if(
							lFunctionFrameIndex_int > lFrameIndex_int &&
							lFunctionFrameIndex_int <= lFrameIndex_int + lFramesDelta_num
							)
						{
							this._fFunctions_func_arr[i].call();
						}
					}
					break;
				}
			}
			//...CALLING FUNCTIONS IF REQUIRED
		}


		this._fCurrentFrameIndex_int += lFramesDelta_num;

		if(this._fCurrentFrameIndex_int > this._fTotalFramesCount_int)
		{
			switch(this._fPlayModeId_int)
			{
				case MAnimation.ANIMATION_PLAY_MODE_ID_FORWARD:
				case MAnimation.ANIMATION_PLAY_MODE_ID_BACK:
				case MAnimation.ANIMATION_PLAY_MODE_ID_LOOP:
				case MAnimation.ANIMATION_PLAY_MODE_ID_REPEAT_SEVERAL_TIMES:
				{
					this._fCurrentFrameIndex_int = this._fTotalFramesCount_int;
					this._fIsPlaying_bl = false;
				}
				break;
			}
		}

		if(this._fPlayModeId_int === MAnimation.ANIMATION_PLAY_MODE_ID_BACK)
		{
			this._wind(this._fTotalFramesCount_int - this._fCurrentFrameIndex_int);
		}
		else
		{
			this._wind(this._fCurrentFrameIndex_int);
		}
		
	}

	wind(aFrameIndex_int)
	{
		this._fCurrentFrameIndex_int = aFrameIndex_int;
		this._wind(this._fCurrentFrameIndex_int);
	}

	windToEnd()
	{
		this.wind(this._fTotalFramesCount_int - 1);
	}

	isPlaying()
	{
		return this._fIsPlaying_bl;
	}
}