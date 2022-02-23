class MDisplayObject extends MDisplayContainer
{
	constructor(aPicture_mp)
	{
		super();

		this.___fRegX_num = 0;
		this.___fRegY_num = 0;

		let lImage_img = this.___fElement_html;
		lImage_img.src = aPicture_mp.getSourcePath();
		//lImage_img.style["image-rendering"] = "pixelated";

		
		this.___fImage_img = lImage_img;
	
		this.setMetrics(
			0,
			0,
			aPicture_mp.getWidth(),
			aPicture_mp.getHeight());

		//this.updateHtmlElement();
		//this.setAdditiveBlendingMode();
	}

	forceAliasing()
	{
		this.___fImage_img.style["image-rendering"] = "pixelated";
	}

	___generateHtmlElement()
	{
		return new Image();
	}

	setAdditiveBlendingMode()
	{

		//this.___fImage_img.style["mix-blend-mode"] = "screen";
		//this.___fElement_html.style["mix-blend-mode"] = "screen";
		//this.___fImage_img.style["background-blend-mode"] = "multiply";
	}

	setRegXY(aRegX_num, aRegY_num)
	{
		this.___fRegX_num = aRegX_num;
		this.___fRegY_num = aRegY_num;

		let lX_num = (-aRegX_num) / this.___fWidth_num * 100;
		let lY_num = (-aRegY_num) / this.___fHeight_num * 100;

		this.___fImage_img.style["transform-origin"] = lX_num +"% " + lY_num + "%"
	}

	setRegPointToCenter()
	{
		this.setRegXY(
			-this.___fWidth_num / 2,
			-this.___fHeight_num / 2);
	}

	setBackgroundColor(aColor_str)
	{
		this.___fImage_img.style["background-color"] = aColor_str;
	}

	fillAllSpaceWithImage(aDisplayContainer_mdc)
	{
		this.setRegXY(0, 0);
		let lImage_img = this.___fImage_img;

		lImage_img.style.left = "0px";
		lImage_img.style.top = "0px";

		this.setScaleXY(
			aDisplayContainer_mdc.getWidth() / this.getWidth(),
			aDisplayContainer_mdc.getHeight() / this.getHeight());
	}

}