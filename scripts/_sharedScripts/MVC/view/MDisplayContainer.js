class MDisplayContainer
{
	static get STICK_MODE_ID_TOP() { return 0 }
	static get STICK_MODE_ID_CENTER() { return 1 }
	static get STICK_MODE_ID_BOTTOM() { return 2 }
	static get STICK_MODE_ID_LEFT() { return 3 }
	static get STICK_MODE_ID_RIGHT() { return 4 }
	static get STICK_MODE_ID_TOP_LEFT() { return 5 }
	static get STICK_MODE_ID_TOP_RIGHT() { return 6 }
	static get STICK_MODE_ID_BOTTOM_LEFT() { return 7 }
	static get STICK_MODE_ID_BOTTOM_RIGHT() { return 8 }

	static get FILL_MODE_ID_DEFAULT() { return 0 }
	static get FILL_MODE_ID_FULL() { return 1 }
	static get FILL_MODE_ID_WIDTH() { return 2 }
	static get FILL_MODE_ID_HEIGHT() { return 3 }

	static get PARENT_PROPORTIONS_CORRECTION_MODE_ID_FULL() { return 0 }
	static get PARENT_PROPORTIONS_CORRECTION_MODE_ID_WIDTH() { return 1 }
	static get PARENT_PROPORTIONS_CORRECTION_MODE_ID_HEIGHT() { return 2 }


	static getRegisteredContainers()
	{
		if(!MDisplayContainer.containers_mdc_arr)
		{
			MDisplayContainer.containers_mdc_arr = [];
		}

		return MDisplayContainer.containers_mdc_arr;
	}

	static registerDisplayContainer(aDisplayContainer_mdc)
	{
		MDisplayContainer.getRegisteredContainers().push(aDisplayContainer_mdc);

		return MDisplayContainer.getRegisteredContainers().length - 1;
	}

	static unregisterDisplayContainer(aDisplayContainer_mdc)
	{
		let l_mdc_arr = MDisplayContainer.getRegisteredContainers();

		let lIndex_int = aDisplayContainer_mdc.getRegisteredContainersIndex();
		
		l_mdc_arr.splice(lIndex_int, 1);

		for( let i = lIndex_int; i < l_mdc_arr.length; i++ )
		{
			l_mdc_arr[i].setRegisteredContainersIndex(i);
		}
	}


	static onResize()
	{
		let l_mdc_arr = MDisplayContainer.getRegisteredContainers();

		for( let i = 0; i < l_mdc_arr.length; i++ )
		{
			l_mdc_arr[i].onResize();
		}
	}

	static onNextFrames(aFramesCount_num)
	{
		let l_mdc_arr = MDisplayContainer.getRegisteredContainers();

		for( let i = 0; i < l_mdc_arr.length; i++ )
		{
			let l_mdc = l_mdc_arr[i];

			if(
				!l_mdc.isForbiddenDueOptimization() &&
				l_mdc.onNextFrames &&
				l_mdc.isVisible()
				)
			{
				l_mdc.onNextFrames(aFramesCount_num);
			}
		}
	}

	static updateHtmlElements(aOptForceUpdate_bl)
	{
		let l_mdc_arr = MDisplayContainer.getRegisteredContainers();

		for( let i = 0; i < l_mdc_arr.length; i++ )
		{
			l_mdc_arr[i].updateHtmlElement(aOptForceUpdate_bl);
		}
	}

	static validateVFXCompatibility(aVFXLevel_num)
	{
		let l_mdc_arr = MDisplayContainer.getRegisteredContainers();

		for( let i = 0; i < l_mdc_arr.length; i++ )
		{
			let l_mdc = l_mdc_arr[i];

			l_mdc.validateVFXCompatibility(aVFXLevel_num)
		}
	}

	constructor(aX_num = 0, aY_num = 0, aOptWidth_num = 0, aOptHeight_num = 0)
	{
		this.___fStickModeId_int = MDisplayContainer.STICK_MODE_ID_CENTER;
		this.___fFillModeId_int = MDisplayContainer.FILL_MODE_ID_DEFAULT;
		this.___fVFXLevel_num = 0;
		this.___fIsInitialVFXLevelValidaionRequired_bl = true;
		this.___fIsForbiddenDueOptimization_bl = false;
		this.___fIsParentVisible_bl = true;


		this.___fPaddingLeft_num = 0;
		this.___fPaddingRight_num = 0;
		this.___fPaddingTop_num = 0;
		this.___fPaddingBottom_num = 0;

		this.___fRegX_num = 0;
		this.___fRegY_num = 0;
		this.___fX_num = aX_num;
		this.___fY_num = aY_num;
		this.___fWidth_num = aOptWidth_num;
		this.___fHeight_num = aOptHeight_num;
		this.___fScaleX_num = 1;
		this.___fScaleY_num = 1;
		this.___fRotation_num = 0;
		this.___fAlpha_num = 1;

		this.___fXIsChanged_bl = true;
		this.___fYIsChanged_bl = true;
		this.___fScaleXIsChanged_bl = false;
		this.___fScaleYIsChanged_bl = false;
		this.___fWidthIsChanged_bl = true;
		this.___fHeightIsChanged_bl = true;
		this.___fRotationIsChanged_bl = false;
		this.___fAlphaIsChanged_bl = true;

		this.___fSidesRatio_num = aOptHeight_num / aOptWidth_num;

		this.___fParentProportionsCorrectionModeId_int = undefined;

		this.___fTargetAreaX_num = undefined;
		this.___fTargetAreaY_num = undefined;
		this.___fTargetWidth_num = undefined;
		this.___fTargetHeight_num = undefined;
		this.___fResizeScaleX_num = 1;
		this.___fResizeScaleY_num = 1;
		this.___fParentResizeScale_num = 1;
		this.___fParentResizeX_num = 0;
		this.___fParentResizeY_num = 0;
		this.___fParentIsVisible_bl = true;

		this.___fChildren_mdc_arr = [];
		this.___fIndex_int = undefined;
		this.___fParent_mdc = undefined;
		this.___fIsVisible_bl = true;

		let l_html = this.___generateHtmlElement();

		l_html.style.position = "absolute";
		l_html.style["transform-origin"] = "0px 0px";
		l_html.style["will-change"] = "transform opacity";
		l_html.style["transform"] = "translateZ(0)";
		l_html.style["-webkit-transform"] = "translate3d(0, 0, 0)";
		l_html.style["-webkit-font-smoothing"] = "antialiased";


		this.___fElement_html = l_html;

		//window.addEventListener("resize", this.onResize.bind(this));
		this.setZIndex(2);

		//this.updateTargetArea();

		this.registeredContainersIndex_int = MDisplayContainer.registerDisplayContainer(this);

	}

	___generateHtmlElement()
	{
		return document.createElement("div");
	}


	setPadding(aPaddingLeft_num, aPaddingRight_num, aPaddingTop_num, aPaddingBottom_num)
	{
		this.___fPaddingLeft_num = aPaddingLeft_num;
		this.___fPaddingRight_num = aPaddingRight_num;
		this.___fPaddingTop_num = aPaddingTop_num;
		this.___fPaddingBottom_num = aPaddingBottom_num;


		this.___fElement_html.style["padding-left"] = aPaddingLeft_num + "px";
		this.___fElement_html.style["padding-right"] = aPaddingRight_num + "px";
		this.___fElement_html.style["padding-top"] = aPaddingTop_num + "px";
		this.___fElement_html.style["padding-bottom"] = aPaddingBottom_num + "px";
	}

	displayText(aText_str)
	{
		let l_html = this.___fElement_html;

		l_html.style["font-size"] = (this.getHeight() * 0.8) + "px";
		l_html.style["color"] = "white";
		l_html.style["font-family"] = "font";
		l_html.style["font-weight"] = "bold";
		l_html.style["font-style"] = "italic";
		l_html.style["MozUserSelect"] = "none";
		l_html.style.cursor = "default";
		l_html.style.textAlign = "center";

		l_html.onselectstart = function(){ return false }
		l_html.onmousedown = function(){ return false }

		l_html.innerText = aText_str;

		this.setClippingMode(true);
	}

	setRegisteredContainersIndex(aIndex_int)
	{
		this.registeredContainersIndex_int = aIndex_int;
	}

	getRegisteredContainersIndex()
	{
		return this.registeredContainersIndex_int;
	}

	setIndex(aIndex_int)
	{
		this.___fIndex_int = aIndex_int;
	}

	getIndex()
	{
		return this.___fIndex_int;
	}

	setParent(aParent_mdc)
	{
		this.___fParent_mdc = aParent_mdc;
	}

	getParent()
	{
		return this.___fParent_mdc;
	}

	setStickMode(aStickModeId_int)
	{
		this.___fStickModeId_int = aStickModeId_int;

		this.adjustToTargetArea();
	}

	setFillMode(aFillModeId_int)
	{
		this.___fFillModeId_int = aFillModeId_int;

		this.adjustToTargetArea();
	}

	showTargetArea()
	{
		if(this.___fDebugArea_mdc)
		{
			return;
		}

		this.___fDebugArea_mdc = new MDisplayContainer();
		DISPLAY.appendChild(this.___fDebugArea_mdc.getHTMLElement());
		this.___fDebugArea_mdc.setBackgroundColor("#FF00FF");
		this.___fDebugArea_mdc.setAlpha(0.5);

		this.onResize();
	}

	setZIndex(aIndex_int)
	{
		this.___fElement_html.style["z-index"] = aIndex_int + "";
	}

	getHTMLElement()
	{
		return this.___fElement_html;
	}

	setClippingMode(aIsClippingMode_bl)
	{
		if(aIsClippingMode_bl)
		{
			this.___fElement_html.style.overflow = "hidden";
		}
		else
		{
			this.___fElement_html.style.overflow = "visible";
		}
	}

	setScrollable()
	{
		this.___fElement_html.style["overflow-x"] = "hidden";	
		this.___fElement_html.style["overflow-y"] = "scroll";	

		if (navigator.userAgent.indexOf("Firefox") > 0)
		{
			this.setWidth(this.getWidth() + 17);
		}
	}

	setPosition(aPoint_mp)
	{
		this.setXY(
			aPoint_mp.getX(),
			aPoint_mp.getY());
	}

	setXY(aX_num, aY_num)
	{
		this.setX(aX_num);
		this.setY(aY_num);
	}

	setX(aX_num)
	{
		if(aX_num === this.___fX_num)
		{
			return;
		}

		this.___fX_num = aX_num;
		this.___fXIsChanged_bl = true;
	}

	getX()
	{
		return this.___fX_num;
	}

	setY(aY_num)
	{
		if(aY_num === this.___fY_num)
		{
			return;
		}

		this.___fY_num = aY_num;
		this.___fYIsChanged_bl = true;
	}

	getY()
	{
		return this.___fY_num;
	}

	setWidth(aWidth_num)
	{
		if(this.___fWidth_num === aWidth_num)
		{
			return;
		}

		this.___fWidthIsChanged_bl = true;
		this.___fWidth_num = aWidth_num;
		this.___fSidesRatio_num = this.___fHeight_num / aWidth_num;
	}

	getWidth()
	{
		return this.___fWidth_num;
	}

	setHeight(aHeight_num)
	{
		if(this.___fHeight_num === aHeight_num)
		{
			return;
		}

		this.___fHeightIsChanged_bl = true;
		this.___fHeight_num = aHeight_num;
		this.___fSidesRatio_num = aHeight_num / this.___fWidth_num;
	}

	getHeight()
	{
		return this.___fHeight_num;
	}

	setMetrics(aX_num, aY_num, aWidth_num, aHeight_num)
	{
		this.setX(aX_num);
		this.setY(aY_num);
		this.setWidth(aWidth_num);
		this.setHeight(aHeight_num);

		this.___fSidesRatio_num = aHeight_num / aWidth_num;
	}

	getSidesRatio()
	{
		return this.___fScaleY_num / this.___fScaleX_num;
	}

	___setHtmlElementVisible(aIsVisible_bl)
	{
		if(
			aIsVisible_bl &&
			this.___fIsForbiddenDueOptimization_bl
			)
		{
			return;
		}

		if(aIsVisible_bl)
		{
			this.___fElement_html.style.display = "block";
		}
		else
		{
			this.___fElement_html.style.display = "none";
		}

		for( let i = 0; i < this.___fChildren_mdc_arr.length; i++ )
		{
			this.___fChildren_mdc_arr[i].___setParentIsVisible(aIsVisible_bl);
		}

		if(this.___fParent_mdc)
		{
			this.___fParentIsVisible_bl = this.___fParent_mdc.isVisible();
		}
	}

	___setParentIsVisible(aIsVisible_bl)
	{
		this.___fParentIsVisible_bl = aIsVisible_bl;

		for( let i = 0; i < this.___fChildren_mdc_arr.length; i++ )
		{
			this.___fChildren_mdc_arr[i].___setParentIsVisible(aIsVisible_bl);
		}
	}

	___setVisible(aIsVisible_bl)
	{
		if(this.___fIsVisible_bl === aIsVisible_bl)
		{
			return;
		}

		this.___fIsVisible_bl = aIsVisible_bl;

		this.___setHtmlElementVisible(aIsVisible_bl);
/*
		let lIsParentVisible_bl = this.___fParent_mdc && this.___fParent_mdc.isVisible();

		for( let i = 0; i < this.___fChildren_mdc_arr.length; i++ )
		{
			this.___fChildren_mdc_arr[i].___setVisible(
				this.___fIsVisible_bl,
				lIsParentVisible_bl && aIsVisible_bl);
		}
		*/
	}


	setVisible(aIsVisible_bl)
	{
		this.setAlpha(aIsVisible_bl ? 1 : 0);
	}

	isVisible()
	{
		return (
			this.___fIsVisible_bl &&
			this.___fParentIsVisible_bl);
	}

	setAlpha(aAlpha_num)
	{
		let lAlpha_num = aAlpha_num;

		if(lAlpha_num < 0)
		{
			lAlpha_num = 0;
		}
		else if(lAlpha_num > 1)
		{
			lAlpha_num = 1;
		}


		if(this.___fAlpha_num === lAlpha_num)
		{
			return;
		}

		this.___fAlphaIsChanged_bl = true;
		this.___fAlpha_num = lAlpha_num;
	}

	getAlpha()
	{
		return this.___fAlpha_num;
	}

	setScale(aScale_num)
	{
		this.setScaleX(aScale_num);
		this.setScaleY(aScale_num);
	}

	setScaleX(aScaleX_num)
	{
		if(this.___fScaleX_num === aScaleX_num)
		{
			return;
		}

		this.___fScaleX_num = aScaleX_num;
		this.___fScaleXIsChanged_bl = true;
	}

	getScaleX()
	{
		return this.___fScaleX_num;
	}

	setScaleY(aScaleY_num)
	{
		if(this.___fScaleY_num === aScaleY_num)
		{
			return;
		}

		this.___fScaleY_num = aScaleY_num;
		this.___fScaleYIsChanged_bl = true;
	}

	getScaleY()
	{
		return this.___fScaleY_num;
	}

	setScaleXY(aScaleX_num, aScaleY_num)
	{
		this.setScaleX(aScaleX_num);
		this.setScaleY(aScaleY_num);
	}

	setRotation(aRotation_num)
	{
		if(this.___fRotation_num === aRotation_num)
		{
			return;
		}

		this.___fRotationIsChanged_bl = true;
		this.___fRotation_num = aRotation_num;
	}

	getRotation()
	{
		return this.___fRotation_num;
	}

	setRotationInDegrees(aRotation_num)
	{
		this.setRotation(aRotation_num * Math.PI / 180)
	}

	updateHtmlElement(aOptForceUpdate_bl)
	{
		if(this.___fIsInitialVFXLevelValidaionRequired_bl)
		{
			this.validateVFXCompatibility();
			this.___fIsInitialVFXLevelValidaionRequired_bl = false;
		}

		if(
			this.___fIsForbiddenDueOptimization_bl ||
			!this.___fParentIsVisible_bl
			)
		{
			/*
			if(this.isVisible())
			{
				this.___setVisible(false);
			}
*/
			return;
		}

		let lIsToBecomeVisible_bl =
		(
			!this.___fIsVisible_bl &&
			this.___fAlpha_num > 0 &&
			this.___fScaleX_num > 0 &&
			this.___fScaleY_num > 0
		);
		

		if(
			!this.___fIsVisible_bl &&
			!lIsToBecomeVisible_bl &&
			!aOptForceUpdate_bl
			)
		{
			return;
		}

		let l_html = this.___fElement_html;

		if(this.___fWidthIsChanged_bl || aOptForceUpdate_bl)
		{
			let lFinalWidth_num =
			(
				this.___fWidth_num +
				this.___fPaddingLeft_num +
				this.___fPaddingRight_num
			);

			l_html.style.width = Math.trunc(lFinalWidth_num) + "px";
			this.___fWidthIsChanged_bl = false;
		}

		if(this.___fHeightIsChanged_bl || aOptForceUpdate_bl)
		{
			let lFinalHeight_num =
			(
				this.___fHeight_num +
				this.___fPaddingTop_num +
				this.___fPaddingBottom_num
			);

			l_html.style.height = Math.trunc(lFinalHeight_num) + "px";
			this.___fHeightIsChanged_bl = false;
		}

		if(this.___fAlphaIsChanged_bl || aOptForceUpdate_bl)
		{
			l_html.style.opacity = this.___fAlpha_num + "";
			this.___fAlphaIsChanged_bl = false;

			if(
				this.___fIsVisible_bl &&
				this.___fAlpha_num === 0
				)
			{
				this.___setVisible(false);
			}
			else if(
				!this.___fIsVisible_bl &&
				this.___fAlpha_num > 0
				)
			{
				this.___setVisible(true);
			}
		}

		let lScaleX_num = this.___fScaleX_num * this.___fResizeScaleX_num;
		let lScaleY_num = this.___fScaleY_num * this.___fResizeScaleY_num;


		if(
			this.___fParent_mdc &&
			this.___fParentProportionsCorrectionModeId_int !== undefined
			)
		{
			let lSidesRatio_num = this.___fParent_mdc.getSidesRatio();

			
			switch(this.___fParentProportionsCorrectionModeId_int)
			{
				case MDisplayContainer.PARENT_PROPORTIONS_CORRECTION_MODE_ID_FULL:
					//LANDSCAPE...
					if(lSidesRatio_num <= 1)
					{
						lScaleX_num *= lSidesRatio_num;
					}
					//...LANDSCAPE
					else
					//PORTRAIT...
					{
						lScaleY_num /= lSidesRatio_num;
					}
					//...PORTRAIT
					break;
				case MDisplayContainer.PARENT_PROPORTIONS_CORRECTION_MODE_ID_WIDTH:
					//LANDSCAPE...
					lScaleX_num *= lSidesRatio_num;
					//...LANDSCAPE
					break;
				case MDisplayContainer.PARENT_PROPORTIONS_CORRECTION_MODE_ID_HEIGHT:
					lScaleY_num /= lSidesRatio_num;
					break;
			}
		}

		if(
			this.___fScaleXIsChanged_bl ||
			this.___fScaleYIsChanged_bl ||
			this.___fRotationIsChanged_bl ||
			this.___fXIsChanged_bl ||
			this.___fYIsChanged_bl ||
			aOptForceUpdate_bl
			)
		{
			l_html.style.transform =
				"translate(" +
				(this.___fX_num + this.___fRegX_num - this.___fPaddingLeft_num) +"px, " +
				(this.___fY_num + this.___fRegY_num - this.___fPaddingTop_num) + "px)" +
				"scaleX(" + lScaleX_num + ") " +
				"scaleY(" + lScaleY_num + ") " +
				"rotate(" + this.___fRotation_num + "rad)";

			this.___fScaleXIsChanged_bl = false;
			this.___fScaleYIsChanged_bl = false;
			this.___fRotationIsChanged_bl = false;
			this.___fXIsChanged_bl = false;
			this.___fYIsChanged_bl = false;

			let lIsZeroScale_bl = (
									lScaleX_num === 0 ||
									lScaleY_num === 0);

			if(
				this.___fIsVisible_bl &&
				lIsZeroScale_bl
				)
			{
				this.___setVisible(false);
			}
			else if(
				!this.___fIsVisible_bl &&
				this.___fAlpha_num > 0 &&
				!lIsZeroScale_bl
				)
			{
				this.___setVisible(true);
			}
		}
		
		for( let i = 0; i < this.___fChildren_mdc_arr.length; i++ )
		{
			this.___fChildren_mdc_arr[i].rememberParentResizeScale(this.___fParentResizeScale_num);
			this.___fChildren_mdc_arr[i].rememberParentResizeX(this.___fParentResizeX_num);
			this.___fChildren_mdc_arr[i].rememberParentResizeY(this.___fParentResizeY_num);
		}

		if(aOptForceUpdate_bl)
		{
			for( let i = 0; i < this.___fChildren_mdc_arr.length; i++ )
			{
				if(this.___fChildren_mdc_arr[i].isParentProportionsCorrectionRequired())
				{
					this.___fChildren_mdc_arr[i].updateHtmlElement(true);
				}
			}
		}
	}

	setBackgroundColor(aColor_str)
	{
		let lColor_str = aColor_str;

		if(!lColor_str)
		{
			lColor_str =
			(
				"rgb(" + Math.round(Math.random() * 255) + "," +
				Math.round(Math.random() * 255) + "," +
				Math.round(Math.random() * 255) + ")"
			); 
		}

		this.___fElement_html.style["background-color"] = lColor_str;
	}

	addChild(aContainer_mc)
	{
		this.___fElement_html.appendChild(aContainer_mc.getHTMLElement());
		aContainer_mc.setIndex(this.___fChildren_mdc_arr.length);
		aContainer_mc.setParent(this);
		this.___fChildren_mdc_arr.push(aContainer_mc);

		return aContainer_mc;
	}

	setParentProportionsCorrectionMode(aModeId_int)
	{
		this.___fParentProportionsCorrectionModeId_int = aModeId_int;
	}

	isParentProportionsCorrectionRequired()
	{
		return this.___fParentProportionsCorrectionModeId_int !== undefined;
	}

	updateTargetArea(aSidesRatio_num)
	{

	}

	setTargetArea(aX_num, aY_num, aWidth_num, aHeight_num)
	{
		this.___fTargetAreaX_num = aX_num;
		this.___fTargetAreaY_num = aY_num;
		this.___fTargetWidth_num = aWidth_num;
		this.___fTargetHeight_num = aHeight_num;

		this.adjustToTargetArea();
	}

	getTargetAreaX()
	{
		return this.___fTargetAreaX_num;
	}

	getTargetAreaY()
	{
		return this.___fTargetAreaY_num;
	}

	getTargetAreaWidth()
	{
		return this.___fTargetWidth_num;
	}

	getTargetAreaHeight()
	{
		return this.___fTargetHeight_num;
	}

	getResizeScaleX()
	{
		return this.___fResizeScaleX_num;
	}

	getResizeScaleY()
	{
		return this.___fResizeScaleY_num;
	}

	copyTargetArea(aDisplayContainer_mdc)
	{
		this.setTargetArea(
			aDisplayContainer_mdc.getTargetAreaX(),
			aDisplayContainer_mdc.getTargetAreaY(),
			aDisplayContainer_mdc.getTargetAreaWidth(),
			aDisplayContainer_mdc.getTargetAreaHeight());
	}

	onResize()
	{
		let lSidesRatio_num = DISPLAY.clientWidth / DISPLAY.clientHeight;

		if(lSidesRatio_num === undefined)
		{
			return;
		}

		this.updateTargetArea(lSidesRatio_num);
		this.adjustToTargetArea();
	}

	adjustToTargetArea()
	{
		if( this.___fTargetAreaX_num === undefined )
		{
			return;
		}

		let lDisplayWidth_num = DISPLAY.clientWidth;
		let lDisplayHeight_num = DISPLAY.clientHeight;

		let lTargetXInPixels_num =	lDisplayWidth_num * this.___fTargetAreaX_num;
		let lTargetYInPixels_num =	lDisplayHeight_num * this.___fTargetAreaY_num;

		let lTargetWidthInPixels_num = 	lDisplayWidth_num * this.___fTargetWidth_num;
		let lTargetHeightInPixels_num = lDisplayHeight_num * this.___fTargetHeight_num;

		this.___fResizeScaleX_num = lTargetWidthInPixels_num / this.___fWidth_num;
		this.___fResizeScaleY_num = this.___fResizeScaleX_num;

		let lFinalWidthInPixels_num = this.___fWidth_num * this.___fResizeScaleX_num;
		let lFinalHeightInPixels_num = this.___fHeight_num * this.___fResizeScaleY_num;

		if(lFinalHeightInPixels_num > lTargetHeightInPixels_num)
		{
			this.___fResizeScaleX_num *= lTargetHeightInPixels_num / lFinalHeightInPixels_num;
			this.___fResizeScaleY_num = this.___fResizeScaleX_num;

			lFinalWidthInPixels_num = this.___fWidth_num * this.___fResizeScaleX_num;
			lFinalHeightInPixels_num = this.___fHeight_num * this.___fResizeScaleY_num;
		}

		this.___fParentResizeScale_num = this.___fResizeScaleX_num;

		this.___fX_num = lTargetXInPixels_num;
		this.___fY_num = lTargetYInPixels_num;

		let lDeltaX_num = 0;
		let lDeltaY_num = 0;

		//STICK INSIDE TARGET AREA...
		switch(this.___fStickModeId_int)
		{
			case MDisplayContainer.STICK_MODE_ID_TOP:
			{
				lDeltaX_num = (lTargetWidthInPixels_num - lFinalWidthInPixels_num) / 2;
				lDeltaY_num = 0;
			}
			break;
			case MDisplayContainer.STICK_MODE_ID_CENTER:
			{
				lDeltaX_num = (lTargetWidthInPixels_num - lFinalWidthInPixels_num) / 2;
				lDeltaY_num = (lTargetHeightInPixels_num - lFinalHeightInPixels_num) / 2;
			}
			break;
			case MDisplayContainer.STICK_MODE_ID_BOTTOM:
			{
				lDeltaX_num = (lTargetWidthInPixels_num - lFinalWidthInPixels_num) / 2;
				lDeltaY_num = (lTargetHeightInPixels_num - lFinalHeightInPixels_num);
			}
			break;
			case MDisplayContainer.STICK_MODE_ID_LEFT:
			{
				lDeltaX_num = 0;
				lDeltaY_num = (lTargetHeightInPixels_num - lFinalHeightInPixels_num) / 2;
			}
			break;
			case MDisplayContainer.STICK_MODE_ID_RIGHT:
			{
				lDeltaX_num = lTargetWidthInPixels_num - lFinalWidthInPixels_num;
				lDeltaY_num = (lTargetHeightInPixels_num - lFinalHeightInPixels_num) / 2;
			}
			break;
			case MDisplayContainer.STICK_MODE_ID_TOP_LEFT:
			{
				lDeltaX_num = 0;
				lDeltaY_num = 0;
			}
			break;
			case MDisplayContainer.STICK_MODE_ID_TOP_RIGHT:
			{
				lDeltaX_num = lTargetWidthInPixels_num - lFinalWidthInPixels_num;
				lDeltaY_num = 0;
			}
			break;
			case MDisplayContainer.STICK_MODE_ID_BOTTOM_LEFT:
			{
				lDeltaX_num = 0;
				lDeltaY_num = (lTargetHeightInPixels_num - lFinalHeightInPixels_num);
			}
			break;
			case MDisplayContainer.STICK_MODE_ID_BOTTOM_RIGHT:
			{
				lDeltaX_num = lTargetWidthInPixels_num - lFinalWidthInPixels_num;
				lDeltaY_num = (lTargetHeightInPixels_num - lFinalHeightInPixels_num);
			}
			break;
		}
		//...STICK INSIDE TARGET AREA

		this.___fDebugArea_mdc && this.___fDebugArea_mdc.setMetrics(
			Math.trunc(this.___fX_num),
			Math.trunc(this.___fY_num),
			Math.trunc(lTargetWidthInPixels_num),
			Math.trunc(lTargetHeightInPixels_num));
		

		this.___fX_num += lDeltaX_num;
		this.___fY_num += lDeltaY_num;

		//FILL SPACE INSIDE TARGET AREA...
		switch(this.___fFillModeId_int)
		{
			case MDisplayContainer.FILL_MODE_ID_FULL:
			{
				this.___fResizeScaleX_num = 1;
				this.___fResizeScaleY_num = 1;
				this.___fX_num = lTargetXInPixels_num;
				this.___fY_num = lTargetYInPixels_num;
				this.___fScaleX_num = lTargetWidthInPixels_num / this.___fWidth_num;
				this.___fScaleY_num = lTargetHeightInPixels_num / this.___fHeight_num;
			}
			break;
			case MDisplayContainer.FILL_MODE_ID_WIDTH:
			{
				this.___fResizeScaleX_num = 1;
				this.___fResizeScaleY_num = 1;
				this.___fX_num = lTargetXInPixels_num;
				this.___fScaleX_num = lTargetWidthInPixels_num / this.___fWidth_num;
				this.___fScaleY_num = this.___fScaleX_num;

			}
			break;
			case MDisplayContainer.FILL_MODE_ID_HEIGHT:
			{
				this.___fResizeScaleX_num = 1;
				this.___fResizeScaleY_num = 1;
				this.___fY_num = lTargetYInPixels_num;
				this.___fScaleY_num = lTargetHeightInPixels_num / this.___fHeight_num;
				this.___fScaleX_num = this.___fScaleY_num;
			}
			break;
		}
		//...FILL SPACE INSIDE TARGET AREA

		this.___fParentResizeX_num = this.___fX_num;
		this.___fParentResizeY_num = this.___fY_num;

		this.updateHtmlElement(true);
	}

	rememberParentResizeScale(aResizeScale_num)
	{
		this.___fParentResizeScale_num = aResizeScale_num;
	}

	getParentResizeScale()
	{
		return this.___fParentResizeScale_num;
	}

	rememberParentResizeX(aParentResizeX_num)
	{
		this.___fParentResizeX_num = aParentResizeX_num;
	}

	getParentResizeX()
	{
		return this.___fParentResizeX_num;
	}

	rememberParentResizeY(aParentResizeY_num)
	{
		this.___fParentResizeY_num = aParentResizeY_num;
	}

	getParentResizeY()
	{
		return this.___fParentResizeY_num;
	}

	addToDisplay()
	{
		DISPLAY.appendChild(this.getHTMLElement());
	}

	isPartOfOwnHTML(aElement_html)
	{
		if(this.___fElement_html.isSameNode(aElement_html))
		{
			return true;
		}

		for( let i = 0; i < this.___fChildren_mdc_arr.length; i++ )
		{
			if(this.___fChildren_mdc_arr[i].isPartOfOwnHTML(aElement_html))
			{
				return true;
			}
		}

		return false;
	}

	removeChild(aContainer_mc)
	{
		MDisplayContainer.unregisterDisplayContainer(aContainer_mc);
		aContainer_mc.getHTMLElement().remove();
		this.___fChildren_mdc_arr.splice(aContainer_mc.getIndex(), 1);
	}

	removeAllChildren()
	{
		let lChildren_mdc_arr = this.___fChildren_mdc_arr;

		for( let i = 0; i < lChildren_mdc_arr.length; i++ )
		{
			this.removeChild(lChildren_mdc_arr[i]);
		}
	}

	setVFXLevel(aVFXLevel_num)
	{
		this.___fVFXLevel_num = aVFXLevel_num;
	}

	getVFXLevel()
	{
		return this.___fVFXLevel_num;
	}

	isForbiddenDueOptimization()
	{
		return this.___fIsForbiddenDueOptimization_bl;
	}

	validateVFXCompatibility()
	{
		if(this.___fVFXLevel_num === 0)
		{
			return;
		}

		let lVFXLevel_num = MAIN.getVFXLevel();

		if(
			!this.___fIsForbiddenDueOptimization_bl &&
			this.___fVFXLevel_num > lVFXLevel_num
			)
		{
			this.___fIsForbiddenDueOptimization_bl = true;
			this.___setHtmlElementVisible(false, true);
		}
		else if(
			this.___fIsForbiddenDueOptimization_bl &&
			this.___fVFXLevel_num <= lVFXLevel_num
			)
		{
			this.___fIsForbiddenDueOptimization_bl = false;
			this.___setHtmlElementVisible(true, true);
		}
	}
}