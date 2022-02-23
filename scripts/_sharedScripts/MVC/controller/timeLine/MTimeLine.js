class MTimeLine
{
	static get LINEAR() 		{ return MAnimation.LINEAR } 		// [-]	 [-]	[-]
	static get EASE() 			{ return MAnimation.EASE }			// [>>]	 [>>] 	[>]
	static get EASE_IN() 		{ return MAnimation.EASE_IN }		// [>]	 [>>] 	[>>>]
	static get EASE_OUT() 		{ return MAnimation.EASE_OUT }		// [>>>] [>]	[>]
	static get EASE_IN_OUT()	{ return MAnimation.EASE_IN_OUT }	// [>]	 [>>>] 	[>>]

	static get TARGET()						{ return MAnimation.TARGET }
	static get KEY_FRAME()					{ return MAnimation.KEY_FRAME }
	static get SET_X()						{ return MAnimation.SET_X }
	static get SET_Y()						{ return MAnimation.SET_Y }
	static get SET_WIDTH()					{ return MAnimation.SET_WIDTH }
	static get SET_HEIGHT()					{ return MAnimation.SET_HEIGHT }
	static get SET_SCALE() 					{ return MAnimation.SET_SCALE }
	static get SET_SCALE_X() 				{ return MAnimation.SET_SCALE_X }
	static get SET_SCALE_Y() 				{ return MAnimation.SET_SCALE_Y }
	static get SET_ALPHA()					{ return MAnimation.SET_ALPHA }
	static get SET_ROTATION_IN_DEGREES() 	{ return MAnimation.SET_ROTATION_IN_DEGREES }
	static get EXECUTE_METHOD()				{ return MAnimation.EXECUTE_METHOD }

	static get PLAY_MODE_ID_FORWARD() 		{ return MAnimation.ANIMATION_PLAY_MODE_ID_FORWARD }
	static get PLAY_MODE_ID_BACK() 			{ return MAnimation.ANIMATION_PLAY_MODE_ID_BACK }
	static get PLAY_MODE_ID_LOOP() 			{ return MAnimation.ANIMATION_PLAY_MODE_ID_LOOP }
	static get PLAY_MODE_ID_REPEAT_SEVERAL_TIMES() { return MAnimation.ANIMATION_PLAY_MODE_ID_REPEAT_SEVERAL_TIMES }

	static registerNewTimeLine(aTimeLine_mt)
	{
		if(!MTimeLine.timeLines_mt_arr)
		{
			MTimeLine.timeLines_mt_arr = [];
		}

		MTimeLine.timeLines_mt_arr.push(aTimeLine_mt);

		return MTimeLine.timeLines_mt_arr.length - 1;
	}

	static unregisterTimeLine(aIndex_int)
	{
		for( let i = aIndex_int + 1; i < MTimeLine.timeLines_mt_arr.length; i++ )
		{
			MTimeLine.timeLines_mt_arr[i].setIndex(i - 1);
		}

		MTimeLine.timeLines_mt_arr.splice(aIndex_int, 1);
	}

	static onNextFrames(aFramesCount_num, aSpeedMultiplier_num)
	{
		for( let i = 0; i < MTimeLine.timeLines_mt_arr.length; i++ )
		{
			let l_mt = MTimeLine.timeLines_mt_arr[i];

			if(l_mt.isPlaying())
			{
				l_mt.onNextFrames(aFramesCount_num, aSpeedMultiplier_num);
			}
		}
	}


	constructor( aOptInputTargetFrameRate_int = 30 )
	{
		this._fAnimations_ma_arr = [];
		this._fFunctionsOnStart_func_arr = [];
		this._fFunctionsOnFinish_func_arr = [];
		this._fIsCompleted_bl = true;
		this._fIsPlaying_bl = false;
		this._fIsPaused_bl = false;
		this._fIndex_int = MTimeLine.registerNewTimeLine(this);
		this._fRemainingReplaysCount_int = 0;
		this._fPlayModeId_int = MTimeLine.PLAY_MODE_ID_FORWARD;
		this._fInputFrameRateMultiplier_num = 60 / aOptInputTargetFrameRate_int;
		this._fTotalFramesCount_num = 0;
		this._fCurrentFrameIndex_num = 0;
		this._fIsLocked_bl = false;
		this._fIgnoreSpeedMultiplier_bl = false;
	}

	setIgnoreSpeedMultiplier(aIgnoreSpeedMultiplier_bl)
	{
		this._fIgnoreSpeedMultiplier_bl = aIgnoreSpeedMultiplier_bl;
	}

	setLocked(aIsLocked_bl)
	{
		this._fIsLocked_bl = aIsLocked_bl;
	}

	getCurrentFrameIndex()
	{
		return this._fCurrentFrameIndex_num;
	}

	getProgress()
	{
		if(!this._fIsPlaying_bl)
		{
			return 0;
		}

		let lProgress_num = this._fCurrentFrameIndex_num / this._fTotalFramesCount_num;

		if(lProgress_num < 0)
		{
			lProgress_num = 1;
		}

		return lProgress_num / this._fInputFrameRateMultiplier_num;
	}

	setIndex(aIndex_int)
	{
		this._fIndex_int = aIndex_int;
	}

	setAnimations(aDescriptors_obj_arr)
	{
		for( let i = 0; i < aDescriptors_obj_arr.length; i++ )
		{
			this.addAnimation(aDescriptors_obj_arr[i]);
		}
	}

	addAnimation(aTargetObject_mdc, aKey_int, aInitialValue_num, aDescriptors_num_arr_arr, aOptContext_ctx)
	{
		let lAnimation_ma = new MAnimation(this);

		lAnimation_ma.setAnimation(aTargetObject_mdc, aKey_int, aInitialValue_num, aDescriptors_num_arr_arr, aOptContext_ctx, this._fInputFrameRateMultiplier_num);
		this._fAnimations_ma_arr.push(lAnimation_ma);

		let lFramesCount_num = lAnimation_ma.getTotalFramesCount();

		if(this._fTotalFramesCount_num < lFramesCount_num)
		{
			this._fTotalFramesCount_num = lFramesCount_num;
		}
	}

	getTotalFramesCount()
	{
		return this._fTotalFramesCount_num;
	}

	wind(aFrameIndex_num)
	{
		let lAnimations_ma_arr = this._fAnimations_ma_arr
		let lFrameIndex_int = Math.round(this._fInputFrameRateMultiplier_num * aFrameIndex_num);

		for( let i = 0; i < lAnimations_ma_arr.length; i++ )
		{
			lAnimations_ma_arr[i].wind(lFrameIndex_int);
		}
	}

	play(aOptModeId_int = MTimeLine.PLAY_MODE_ID_FORWARD)
	{
		if(this._fIsLocked_bl)
		{
			return;
		}

		if(this._fIsPlaying_bl)
		{
			return;
		}

		if(this._fIsCompleted_bl)
		{
			let l_func_arr = this._fFunctionsOnStart_func_arr;

			if(aOptModeId_int === MTimeLine.PLAY_MODE_ID_BACK)
			{
				l_func_arr = this._fFunctionsOnFinish_func_arr;
			}

			for( let i = 0; i < l_func_arr.length; i++ )
			{
				l_func_arr[i].call();
			}

			this._fIsCompleted_bl = false;
		}

		let lAnimations_ma_arr = this._fAnimations_ma_arr

		for( let i = 0; i < lAnimations_ma_arr.length; i++ )
		{
			lAnimations_ma_arr[i].play(aOptModeId_int);
		}

		this._fCurrentFrameIndex_num = -1;
		this._fIsPlaying_bl = true;
		this._fIsPaused_bl = false;
		this._fPlayModeId_int = aOptModeId_int;
	}


	playLoop()
	{
		this.play(MTimeLine.PLAY_MODE_ID_LOOP);
	}

	playBack()
	{
		this.play(MTimeLine.PLAY_MODE_ID_BACK);
	}

	playSeveralTimes(aTimesCount_int)
	{
		this._fRemainingReplaysCount_int = aTimesCount_int;

		this.play(MTimeLine.PLAY_MODE_ID_REPEAT_SEVERAL_TIMES);
	}

	playFromFrame(aFrameIndex_num, aOptMode_int)
	{
		if(this._fIsLocked_bl)
		{
			return;
		}


		let lFrameIndex_int = Math.round(this._fInputFrameRateMultiplier_num * aFrameIndex_num);
		let lAnimations_ma_arr = this._fAnimations_ma_arr

		for( let i = 0; i < lAnimations_ma_arr.length; i++ )
		{
			lAnimations_ma_arr[i].playFromFrame(lFrameIndex_int, aOptMode_int);
		}

		this._fCurrentFrameIndex_num = lFrameIndex_int;
		this._fIsPlaying_bl = true;
		this._fIsPaused_bl = false;
		this._fPlayModeId_int = aOptMode_int;
		this._fIsCompleted_bl = false;
	}

	playLoopFromFrame(aFrameIndex_num)
	{
		this.playFromFrame(aFrameIndex_num, MTimeLine.PLAY_MODE_ID_LOOP);
	}

	windToEnd()
	{
		let lAnimations_ma_arr = this._fAnimations_ma_arr

		for( let i = 0; i < lAnimations_ma_arr.length; i++ )
		{
			lAnimations_ma_arr[i].windToEnd();
		}
	}

	stop()
	{
		let lAnimations_ma_arr = this._fAnimations_ma_arr

		for( let i = 0; i < lAnimations_ma_arr.length; i++ )
		{
			if(lAnimations_ma_arr[i].isPlaying())
			{
				lAnimations_ma_arr[i].stop();
			}
		}

		this._fIsPlaying_bl = false;
	}

	pause()
	{
		this._fIsPaused_bl = true;
	}

	resume()
	{
		this._fIsPaused_bl = false;
	}

	_isAnySubAnimationPlaying()
	{
		let lAnimations_ma_arr = this._fAnimations_ma_arr

		for( let i = 0; i < lAnimations_ma_arr.length; i++ )
		{
			if(lAnimations_ma_arr[i].isPlaying())
			{
				this._fCurrentFrameIndex_num = lAnimations_ma_arr[i].getCurrentFrameIndex();
				return true;
			}
		}

		return false;
	}

	isPaused()
	{
		return this._fIsPlaying_bl && this._fIsPaused_bl;
	}

	isPlaying()
	{
		return this._fIsPlaying_bl && !this._fIsPaused_bl;
	}

	addPause(aFramesCount_num)
	{
		this.callFunctionAtFrame(
			function wait() {},
			this.getTotalFramesCount() / this._fInputFrameRateMultiplier_num + aFramesCount_num * this._fInputFrameRateMultiplier_num
			);
	}

	callFunctionAtFrame(aFunction_func, aFrameIndex_num, aContext_ctx, aOptArgument1, aOptArgument2, aOptArgument3)
	{
		if(!this._fAnimations_ma_arr[0])
		{
			this._fAnimations_ma_arr[0] = new MAnimation(this);
		}

		this._fAnimations_ma_arr[0].callFunctionAtFrame(
										aFunction_func,
										aFrameIndex_num,
										aContext_ctx,
										aOptArgument1,
										aOptArgument2,
										aOptArgument3,
										this._fInputFrameRateMultiplier_num);
		

		if(aFrameIndex_num > this._fTotalFramesCount_num)
		{
			this._fTotalFramesCount_num = aFrameIndex_num;
		}
	}

	callFunctionOnStart(aFunction_func, aContext_ctx, aOptArgument1, aOptArgument2, aOptArgument3)
	{
		this._fFunctionsOnStart_func_arr.push(aFunction_func.bind(aContext_ctx, aOptArgument1, aOptArgument2, aOptArgument3));
	}

	callFunctionOnFinish(aFunction_func, aContext_ctx, aOptArgument1, aOptArgument2, aOptArgument3)
	{
		this._fFunctionsOnFinish_func_arr.push(aFunction_func.bind(aContext_ctx, aOptArgument1, aOptArgument2, aOptArgument3));
	}

	onNextFrames(aFramesCount_num, aSpeedMultiplier_num)
	{
		if(this._fIsLocked_bl)
		{
			return;
		}

		if(this._fIsPaused_bl)
		{
			return;
		}

		if(!this._fIsPlaying_bl)
		{
			this.stop();
			return;
		}

		let lFramesCount_num = aFramesCount_num;

		if(!this._fIgnoreSpeedMultiplier_bl)
		{
			lFramesCount_num *= aSpeedMultiplier_num;
		}

		let lAnimations_ma_arr = this._fAnimations_ma_arr;

		for( let i = 0; i < lAnimations_ma_arr.length; i++ )
		{
			lAnimations_ma_arr[i].onNextFrames(lFramesCount_num);
		}

		if(!this._isAnySubAnimationPlaying())
		{
			let lIsCompleted_bl = false;

			switch(this._fPlayModeId_int)
			{
				case MTimeLine.PLAY_MODE_ID_FORWARD:
				case MTimeLine.PLAY_MODE_ID_BACK:
				{
					lIsCompleted_bl = true;
					this.stop();
				}
				break;
				case MTimeLine.PLAY_MODE_ID_LOOP:
				{
					this.stop();
					this.playLoop();
				}
				break;
				case MTimeLine.PLAY_MODE_ID_REPEAT_SEVERAL_TIMES:
				{
					this.stop();
					this._fRemainingReplaysCount_int--;
					if(this._fRemainingReplaysCount_int === 0)
					{
						lIsCompleted_bl = true;
					}
					else
					{
						this.playSeveralTimes(this._fRemainingReplaysCount_int);
					}
				}
				break;
			}

			if(lIsCompleted_bl)
			{
				let l_func_arr = this._fFunctionsOnFinish_func_arr;

				if(this._fPlayModeId_int === MTimeLine.PLAY_MODE_ID_BACK)
				{
					l_func_arr = this._fFunctionsOnStart_func_arr;
				}

				for( let i = 0; i < l_func_arr.length; i++ )
				{
					l_func_arr[i].call();
				}

				this._fIsCompleted_bl = true;
			}
		}
	}

	destroy()
	{
		MTimeLine.unregisterTimeLine(this._fIndex_int);
	}
}