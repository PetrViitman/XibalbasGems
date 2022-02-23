class MSlidableView extends MInteractiveView
{
	constructor(aX_num = 0, aY_num = 0, aOptWidth_num = 0, aOptHeight_num = 0)
	{
		super(aX_num, aY_num, aOptWidth_num, aOptHeight_num);
		
		this.getHTMLElement().addEventListener("mousedown", this.___onMouseDown.bind(this));
		DISPLAY.addEventListener("mouseup", this.___onMouseUp.bind(this));
		DISPLAY.addEventListener("mousemove", this.___onMouseMove.bind(this));
		DISPLAY.addEventListener("mouseleave", this.___onMouseUp.bind(this));

		this.___fInteractionStartX_num = undefined;
		this.___fInteractionStartY_num = undefined;

		this.___fInteractionDeltaX_num = undefined;
		this.___fInteractionDeltaX_num = undefined;
	}


	___onMouseDown(aEvent_obj)
	{
		this.___fInteractionStartX_num = aEvent_obj.offsetX;
		this.___fInteractionStartY_num = aEvent_obj.offsetY;

		this.onSlideStart(
			this.___fInteractionStartX_num,
			this.___fInteractionStartY_num);
	}

	___onMouseUp()
	{
		this.___fInteractionStartX_num = undefined;
		this.___fInteractionStartY_num = undefined;
	}

	___onMouseMove(aEvent_obj)
	{
		this.___fInteractionDeltaX_num = (aEvent_obj.clientX - this.getParentResizeX()) / this.getParentResizeScale() - this.___fInteractionStartX_num;
		this.___fInteractionDeltaY_num = (aEvent_obj.clientY - this.getParentResizeY()) / this.getParentResizeScale() - this.___fInteractionStartY_num;

		if(this.___fInteractionStartX_num !== undefined)
		{
			this.onSlide(
				this.___fInteractionDeltaX_num,
				this.___fInteractionDeltaY_num);
		}
	}

	onSlideStart(aSlideStartX_num, aSlideStartY_num)
	{

	}

	onSlide(aSlideDeltaX_num, aSlideDeltaY_num)
	{

	}
}