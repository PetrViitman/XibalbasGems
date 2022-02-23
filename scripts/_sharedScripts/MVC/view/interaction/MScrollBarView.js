class MScrollBarView extends MView
{

	static get DEFAULT_WIDTH() { return 10 }

	constructor(aTargetContainer_mdc)
	{
		super(
			0,
			0,
			MScrollBarView.DEFAULT_WIDTH,
			aTargetContainer_mdc.getHeight());

		this._fTargetContainer_mdc = aTargetContainer_mdc;
		this._fTarget_html = aTargetContainer_mdc.getHTMLElement();
		this._fBackgroundContainer_mdc = null;// this.addChild(new MDisplayContainer(0, 0, this.getWidth(), this.getHeight()));
		this._fButton_msv = null;

		this._fSlideStartButtonX = undefined;
		this._fSlideStartButtonY = undefined;

		this._fSlideStartClickX = undefined;
		this._fSlideStartClickY = undefined;

		//BACKGROUND CONTAINER...
		let l_mdc = new MDisplayContainer(0, 0, this.getWidth(), this.getHeight());
		l_mdc.setBackgroundColor("black");
		l_mdc.setAlpha(0.38);
		this.addChild(l_mdc);
		this._fBackgroundContainer_mdc = l_mdc;
		//...BACKGROUND CONTAINER

		//BUTTON...
		let l_msv = new MSlidableView(0, 0, this.getWidth(), 100);
		l_msv.setBackgroundColor("white");
		l_msv.onSlide = this.onSlide.bind(this);
		l_msv.setAlpha(0.62);
		this._fButton_msv = this.addChild(l_msv);
		//...BUTTON

		aTargetContainer_mdc.getHTMLElement().addEventListener("scroll", this.onScroll.bind(this));
	}

	onScroll()
	{
		this.setHeight(this._fTargetContainer_mdc.getHeight());

		let lIsVisible_bl = this._fTarget_html.scrollHeight > this._fTarget_html.clientHeight;

		this.setVisible(lIsVisible_bl);

		let lScrollProgress_num = this._fTarget_html.scrollTop / (this._fTarget_html.scrollHeight - this._fTarget_html.clientHeight);
		if(lScrollProgress_num > 1)
		{
			lScrollProgress_num = 1;
		}

		let lButtonHeight_num = (this._fTarget_html.clientHeight / this._fTarget_html.scrollHeight) * this._fTarget_html.clientHeight;
		this._fButton_msv.setHeight(lButtonHeight_num);
		this._fButton_msv.setY((this._fTarget_html.clientHeight - lButtonHeight_num) * lScrollProgress_num);

		this._fButton_msv.updateHtmlElement(true);
	}

	onSlide(aSlideDeltaX_num, aSlideDeltaY_num)
	{

		let lY_num = aSlideDeltaY_num;
		let lLimitY_num = this.getHeight() - this._fButton_msv.getHeight();
		
		if(lY_num > lLimitY_num)
		{
			lY_num = lLimitY_num;
		}
		else if(lY_num < 0)
		{
			lY_num = 0;
		}

		let lProgress_num = lY_num / lLimitY_num; 
		this._fTarget_html.scrollTop = (this._fTarget_html.scrollHeight - this.getHeight()) * lProgress_num;
	}
}