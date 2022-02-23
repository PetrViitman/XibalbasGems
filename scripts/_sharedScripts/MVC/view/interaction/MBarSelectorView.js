class MBarSelectorView extends MDisplayContainer
{
	constructor(aX_num = 0, aY_num = 0, aOptWidth_num = 0, aOptHeight_num = 0)
	{
		super(aX_num, aY_num, aOptWidth_num, aOptHeight_num);


		this.___fBackgroundContainer_mdc = null;
		this.___fProgressContainer_mdc = null;
		this.___fTextContainer_mdc = null;
		this.___fInteractiveSurface_mdc = null;
		this.___fIsInteractionInProcess_bl = false;
		this.___fCurrentResultValue_num = undefined;
		this.___fPrecisionPercent_int = 1;
		this.___fCaption_str = "";

		//BACKGROUND CONTAINER...
		let l_mdc = new MDisplayContainer(
			0,
			0,
			this.getWidth(),
			this.getHeight());

		l_mdc.setBackgroundColor("black");
		this.___fBackgroundContainer_mdc = this.addChild(l_mdc);
		//...BACKGROUND CONTAINER

		//PROGRESS CONTAINER...
		l_mdc = new MDisplayContainer(
			0,
			0,
			this.getWidth(),
			this.getHeight());

		l_mdc.setBackgroundColor("red");
		this.___fProgressContainer_mdc = this.addChild(l_mdc);
		//...PROGRESS CONTAINER

		//TEXT CONTAINER...
		l_mdc = new MDisplayContainer(
			0,
			0,
			this.getWidth(),
			this.getHeight());

		this.___fTextContainer_mdc = this.addChild(l_mdc);
		//...TEXT CONTAINER

		//SHADOW...
		l_mdc = new MDisplayContainer(
			Math.trunc(this.getWidth() * 0.62),
			0,
			Math.trunc(this.getWidth() * 0.38),
			this.getHeight());

		l_mdc.setBackgroundColor("black");
		l_mdc.setAlpha(0.38);

		this.addChild(l_mdc);
		//...SHADOW

		//INTERACTIVE SURFACE...
		l_mdc = new MDisplayContainer(
			0,
			0,
			this.getWidth(),
			this.getHeight());

		let l_html = l_mdc.getHTMLElement();
		l_html.addEventListener("mousedown", this.___onMouseDown.bind(this));
		l_html.addEventListener("pointerdown", this.___onMouseDown.bind(this));
		l_html.style["touch-action"] = "none";


		DISPLAY.addEventListener("mouseup", this.___onMouseUp.bind(this));
		DISPLAY.addEventListener("pointerup", this.___onMouseUp.bind(this));
		DISPLAY.addEventListener("mousemove", this.___onMouseMove.bind(this));
		DISPLAY.addEventListener("pointermove", this.___onMouseMove.bind(this));
		DISPLAY.addEventListener("mouseleave", this.___onMouseUp.bind(this));
		DISPLAY.addEventListener("pointerleave", this.___onMouseUp.bind(this));
		


		this.___fInteractiveSurface_mdc = this.addChild(l_mdc);
		//...INTERACTIVE SURFACE


		this.___updateText(100);
	}

	setCaption(aCaption_str)
	{
		this.___fCaption_str = aCaption_str;
		this.___updateText(100);
	}


	setPrecisionPercent(aPrecisionPercent_int)
	{
		this.___fPrecisionPercent_int = aPrecisionPercent_int;
	}


	___onMouseDown(aEvent_obj)
	{
		this.___fIsInteractionInProcess_bl = true;
		this.___onInteraction(aEvent_obj.offsetX);
	}

	___onMouseUp()
	{
		this.___fIsInteractionInProcess_bl = false;
	}

	___onMouseMove(aEvent_obj)
	{
		if(this.___fIsInteractionInProcess_bl)
		{
			this.___onInteraction((aEvent_obj.clientX - this.getParentResizeX()) / this.getParentResizeScale() - this.getX());
		}
	}

	___onInteraction(aX_num)
	{
		let lX_num = aX_num + this.getWidth() * this.___fPrecisionPercent_int / 200;

		if(lX_num > this.getWidth())
		{
			lX_num = this.getWidth();
		}
		else if(lX_num < 0)
		{
			lX_num = 0;
		}

		let lProgress_num = lX_num / this.getWidth() * 100;


		lProgress_num -= lProgress_num % this.___fPrecisionPercent_int;

		if(lProgress_num !== this.___fCurrentResultValue_num)
		{

			this.___fCurrentResultValue_num = lProgress_num;
			
			this.onChange(lProgress_num / 100);

			this.___fProgressContainer_mdc.setWidth(lProgress_num / 100 * this.getWidth());
			this.___updateText(lProgress_num);
		}
	}


	___updateText(aProgress_num)
	{
		this.___fTextContainer_mdc.displayText(this.___fCaption_str + " " + aProgress_num + "%");
	}

	onChange(aProgress_num)
	{

	}
}