class MMain extends MMainBaseClass
{
	constructor()
	{
		super();

		this._fBackgroundView_mbv = new MBackgroundView();
		this._fReelsController_mrc = new MReelsController();
		this._fFooterView_mfv = new MFooterView();
		this._fCentralWinPresentationView_mcwpv = new MCentralWinPresentationView();
		this._fBigWinPresentationView_mbwpv = new MBigWinPresentationView();
		this._fFreeSpinsAwardPresentationView_mfsapv = new MFreeSpinsAwardPresentationView();
		this._fFreeSpinsWonPresentationView_mfswpv = new MFreeSpinsWonPresentationView();
		this._fLoadingScreenView_mlsv = new MLoadingScreenView();
		this._fTransitionView_mtv = new MTransitionView();
		this._fRulesView_mrv = new MRulesView("assets/rules.html");
	}

	init()
	{
		this._fBackgroundView_mbv.init();
		this._fFooterView_mfv.init();
		this._fReelsController_mrc.init();

		this._fCentralWinPresentationView_mcwpv.init();
		this._fBigWinPresentationView_mbwpv.init();
		this._fFreeSpinsAwardPresentationView_mfsapv.init();
		this._fFreeSpinsWonPresentationView_mfswpv.init();
		this._fLoadingScreenView_mlsv.init();
		this._fTransitionView_mtv.init();
		this._fRulesView_mrv.init();


		//DEMO PRESENTATIONS...
		
		MAIN.PRESENTATION_RULES = new MDemoPresentationRules();
		MAIN.PRESENTATION_LOADING = new MDemoPresentationLoading();
		MAIN.PRESENTATION_SPIN_NO_WIN = new MDemoPresentationSpinNoWin();
		MAIN.PRESENTATION_WIN_SMALL = new MDemoPresentationWinSmall();
		MAIN.PRESENTATION_WIN_MEDIUM = new MDemoPresentationWinMidium();
		MAIN.PRESENTATION_WIN_LARGE = new MDemoPresentationWinLarge();
		MAIN.PRESENTATION_WIN_BIG = new MDemoPresentationWinBig();
		MAIN.PRESENTATION_TENSION = new MDemoPresentationTension();
		MAIN.PRESENTATION_FREE_SPINS_AWARD = new MDemoPresentationFreeSpinsAward();
		MAIN.PRESENTATION_FREE_SPINS_WON = new MDemoPresentationFreeSpinsWon();
		MAIN.PRESENTATION_FREE_SPINS = new MDemoPresentationFreeSpins();
		MAIN.PRESENTATION_BUY_COIN = new MDemoPresentationBuyCoin();
		MAIN.PRESENTATION_FULL_DEMO = new MDemoPresentationFull();
		//...DEMO PRESENTATIONS
	}

	//GETTERS...
	getReelsController()
	{
		return this._fReelsController_mrc;
	}

	getBackgroundView()
	{
		return this._fBackgroundView_mbv;
	}

	getCentralWinPresentationView()
	{
		return this._fCentralWinPresentationView_mcwpv;
	}

	getBigWinPresentationView()
	{
		return this._fBigWinPresentationView_mbwpv;
	}

	getFreeSpinsAwardPresentationView()
	{
		return this._fFreeSpinsAwardPresentationView_mfsapv;
	}

	getFreeSpinsWonPresentationView()
	{
		return this._fFreeSpinsWonPresentationView_mfswpv;
	}

	getLoadingScreenView()
	{
		return this._fLoadingScreenView_mlsv;
	}

	getTransitionView()
	{
		return this._fTransitionView_mtv;
	}

	getRulesView()
	{
		return this._fRulesView_mrv;
	}
	//...GETTERS
}


var DISPLAY = document.getElementById("DISPLAY");
var STORAGE = new MStorage();
var MAIN = new MMain();