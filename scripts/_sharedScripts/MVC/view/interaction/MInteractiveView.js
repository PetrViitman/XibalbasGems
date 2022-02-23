class MInteractiveView extends MView
{
	constructor(aX_num = 0, aY_num = 0, aOptWidth_num = 0, aOptHeight_num = 0)
	{
		super(aX_num, aY_num, aOptWidth_num, aOptHeight_num);
		DISPLAY.addEventListener("click", this.___onDisplayClick.bind(this));
	}

	___onDisplayClick(aEvent_obj)
	{
		if(!this.isInteractable())
		{
			return;
		}

		if(this.isPartOfOwnHTML(aEvent_obj.target))
		{
			this.onInteraction();
		}
	}

	isInteractable()
	{
		return true;
	}

	onInteraction()
	{
		
	}
}
