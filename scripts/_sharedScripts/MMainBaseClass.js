const TARGET_FPS = 60;
const TARGET_MILLIS_PER_TICK = Math.trunc(1000 / TARGET_FPS);

class MMainBaseClass
{
	static isGameReady()
	{
		return MMainBaseClass.___fIsGameReady_bl;
	}

	constructor()
	{
		//FPS...
		this.___fPreviousSecondStamp_num = Date.now();
		this.___fFramesCount_int = 0;
		//...FPS

		this.___fLastTimeStamp_num = Date.now();
		this.___fFrameIndex_int = 0;

		this.___fSpeedMultiplier_num = 1;
		this.___fVFXLevel_num = 1;

		this.___fTestStandView_mtv = new MTestStandView();


		//STYLING...
		DISPLAY.style["overflow"] = "hidden";
		DISPLAY.style["scrollbar-color"] = "transparent transparent";
		DISPLAY.style["-ms-overflow-style"] = "none";

		DISPLAY.style["-webkit-touch-callout"] = "none";
		DISPLAY.style["-webkit-user-select"] = "none";
		DISPLAY.style["-moz-user-select"] = "none";
		DISPLAY.style["-ms-user-select"] = "none";
		DISPLAY.style["user-select"] = "none";

		DISPLAY.style["background-color"] = "#000000";
		DISPLAY.style["position"] = "relative";


		let lStyleElement_obj = document.createElement("style");
		lStyleElement_obj.appendChild(document.createTextNode("div ::-webkit-scrollbar {display: none;}"));
		
		//FONT...
		lStyleElement_obj.appendChild(document.createTextNode("@font-face { font-family: font; src: url(assets/_sharedAssets/font.ttf); }"));
		//...FONT
		DISPLAY.appendChild(lStyleElement_obj);
		//...STYLING
	}


	setDisplayBackgroundColor(aColor_str)
	{
		DISPLAY.style["background-color"] = aColor_str;
	}


	getTestStandView()
	{
		return this.___fTestStandView_mtv;
	}

	onLoadingCompleted()
	{
		MMainBaseClass.___fIsGameReady_bl = true;

		this.init();

		this.___fTestStandView_mtv.init();

		DISPLAY.addEventListener("pointerdown", this.requestFullscreen.bind(this));
		window.setInterval(this.onNextFrames.bind(this), TARGET_MILLIS_PER_TICK);
		window.addEventListener("resize", MDisplayContainer.onResize.bind(MDisplayContainer));

		MDisplayContainer.onResize();
		MDisplayContainer.updateHtmlElements(true);
	}

	requestFullscreen()
	{
		if(!this.isMobile())
		{
			return;
		}

		if (DISPLAY.requestFullscreen)
		{
			DISPLAY.requestFullscreen();
		}
		else if (DISPLAY.webkitRequestFullscreen)
		{
			DISPLAY.webkitRequestFullscreen();
		}
		else if (DISPLAY.msRequestFullscreen)
		{
			DISPLAY.msRequestFullscreen();
		}
		
		this.___fLastTouchTimeStamp_int =  Date.now();
	}

	init()
	{

	}

	isMobile()
	{
		try
		{
			document.createEvent("TouchEvent");
			return true;
		}
		catch(error)
		{
			return false;
		}
	}

	onNextFrames()
	{
		//FPS...
		this.___fFramesCount_int++;

		if(Date.now() - this.___fPreviousSecondStamp_num > 1000)
		{
			this.___fTestStandView_mtv.updateFPS(this.___fFramesCount_int);

			this.___fPreviousSecondStamp_num = Date.now();
			this.___fFramesCount_int = 0;
		}
		//...FPS

		let lNewTimeStamp_num = Date.now();
		let lTimeDelta_num = lNewTimeStamp_num - this.___fLastTimeStamp_num;
		let lFramesCount_num = lTimeDelta_num / TARGET_MILLIS_PER_TICK;

		//lFramesCount_num = 0.25;

		if(lFramesCount_num > 10)
		{
			lFramesCount_num = 10;
		}

		this.___fLastTimeStamp_num = lNewTimeStamp_num;


		MTimeLine.onNextFrames(lFramesCount_num, this.___fSpeedMultiplier_num);
		MDisplayContainer.onNextFrames(lFramesCount_num * this.___fSpeedMultiplier_num);
		MDisplayContainer.updateHtmlElements();

		

		//requestAnimationFrame(this.update.bind(this));
	}


	setSpeedMultiplier(aSpeedMultiplier_num)
	{
		this.___fSpeedMultiplier_num = aSpeedMultiplier_num;
	}

	getVFXLevel()
	{
		return this.___fVFXLevel_num;
	}

	setVFXLevel(aVFXLevel_num)
	{
		this.___fVFXLevel_num = aVFXLevel_num;

		MDisplayContainer.validateVFXCompatibility();
		MDisplayContainer.updateHtmlElements(true);
	}
}