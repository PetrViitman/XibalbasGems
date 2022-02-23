class MStorage extends MStorageBaseClass
{
	initLoadingQueue()
	{
		this.loadingScreenBackground_mp = this.initPicture("loading_screen/background.png");
		this.loadingScreenWild_mp = this.initPicture("loading_screen/wild.png");
		this.loadingScreenScatter_mp = this.initPicture("loading_screen/scatter.png");
		this.loadingScreenTeaser1_mp = this.initPicture("loading_screen/teaser_1.png");
		this.loadingScreenTeaser2_mp = this.initPicture("loading_screen/teaser_2.png");
		this.loadingScreenLoading_mp = this.initPicture("loading_screen/loading.png");
		this.loadingScreenClickToContinue_mp = this.initPicture("loading_screen/click_to_continue.png");
		this.loadingScreenProgressBar_mp = this.initPicture("loading_screen/progress_bar.png");
		this.loadingScreenProgressBarHolder_mp = this.initPicture("loading_screen/progress_bar_holder.png");

		this.iconA_mp = this.initPicture("symbols/A.png");
		this.iconK_mp = this.initPicture("symbols/K.png");
		this.iconQ_mp = this.initPicture("symbols/Q.png");
		this.iconJ_mp = this.initPicture("symbols/J.png");
		this.icon10_mp = this.initPicture("symbols/10.png");
		this.iconBat_mp = this.initPicture("symbols/bat.png");
		this.iconFist_mp = this.initPicture("symbols/fist.png");
		this.iconTurtle_mp = this.initPicture("symbols/turtle.png");
		this.iconSnake_mp = this.initPicture("symbols/snake.png");
		this.iconMeduze_mp = this.initPicture("symbols/meduze.png");
		this.iconWild_mp = this.initPicture("symbols/wild.png");
		this.iconWildRed_mp = this.initPicture("symbols/wild_red.png");
		this.iconWildOrange_mp = this.initPicture("symbols/wild_orange.png");
		this.iconScatter_mp = this.initPicture("symbols/scatter.png");
		this.iconScatterTension_mp = this.initPicture("symbols/scatter_tension.png");
		this.iconScatterReflection_mp = this.initPicture("symbols/scatter_reflection.png");
		
		this.iconGlowA_mp = this.initPicture("symbols/A_glow.png");
		this.iconGlowK_mp = this.initPicture("symbols/K_glow.png");
		this.iconGlowQ_mp = this.initPicture("symbols/Q_glow.png");
		this.iconGlowJ_mp = this.initPicture("symbols/J_glow.png");
		this.iconGlow10_mp = this.initPicture("symbols/10_glow.png");
		this.iconGlowBat_mp = this.initPicture("symbols/bat_glow.png");
		this.iconGlowFist_mp = this.initPicture("symbols/fist_glow.png");
		this.iconGlowTurtle_mp = this.initPicture("symbols/turtle_glow.png");
		this.iconGlowSnake_mp = this.initPicture("symbols/snake_glow.png");
		this.iconGlowMeduze_mp = this.initPicture("symbols/meduze_glow.png");
		this.iconGlowWild_mp = this.initPicture("symbols/wild_glow.png");
		this.iconGlowScatter_mp = this.initPicture("symbols/scatter_glow.png");

		this.iconBlackoutA_mp = this.initPicture("symbols/A_blackout.png");
		this.iconBlackoutK_mp = this.initPicture("symbols/K_blackout.png");
		this.iconBlackoutQ_mp = this.initPicture("symbols/Q_blackout.png");
		this.iconBlackoutJ_mp = this.initPicture("symbols/J_blackout.png");
		this.iconBlackout10_mp = this.initPicture("symbols/10_blackout.png");
		this.iconBlackoutBat_mp = this.initPicture("symbols/bat_blackout.png");
		this.iconBlackoutFist_mp = this.initPicture("symbols/fist_blackout.png");
		this.iconBlackoutTurtle_mp = this.initPicture("symbols/turtle_blackout.png");
		this.iconBlackoutSnake_mp = this.initPicture("symbols/snake_blackout.png");
		this.iconBlackoutMeduze_mp = this.initPicture("symbols/meduze_blackout.png");
		this.iconBlackoutWild_mp = this.initPicture("symbols/wild_blackout.png");
		this.iconBlackoutScatter_mp = this.initPicture("symbols/scatter_blackout.png");

		this.buyCoinFront_mp = this.initPicture("buy_coin/front.png");
		this.buyCoinMiddle_mp = this.initPicture("buy_coin/middle.png");
		this.buyCoinRib_mp = this.initPicture("buy_coin/rib.png");
		this.buyCoinShadow_mp = this.initPicture("buy_coin/shadow.png");
		this.buyCoinPaytableVersion_mp = this.initPicture("buy_coin/paytable_version.png");

		this.winGlow_mp = this.initPicture("win_glow.png");
		this.winSparcles_mp = this.initPicture("particles/win_sparkles.png");
		this.winDigits_mp = this.initPicture("win_digits.png");
		this.winParticleFront_mp = this.initPicture("particles/win_particle_front.png");
		this.winParticleBack_mp = this.initPicture("particles/win_particle_back.png");

		this.tensionTop_mp = this.initPicture("tension/top.png");
		this.tensionMiddle_mp = this.initPicture("tension/middle.png");
		this.tensionBottom_mp = this.initPicture("tension/bottom.png");
		this.tensionFrame_mp = this.initPicture("tension/frame.png");

		this.foregroundCoinFace_mp = this.initPicture("foreground_coin/coin_face.png");
		this.foregroundCoinShadow_mp = this.initPicture("foreground_coin/coin_shadow.png");
		this.foregroundCoinRib_mp = this.initPicture("foreground_coin/coin_rib.png");
		this.foregroundCoinRibExtended_mp = this.initPicture("foreground_coin/coin_rib_extended.png");

		this.foregroundChipFace_mp = this.initPicture("free_spins/foreground_chip/chip_face.png");
		this.foregroundChipShadow_mp = this.initPicture("free_spins/foreground_chip/chip_shadow.png");
		this.foregroundChipRib_mp = this.initPicture("free_spins/foreground_chip/chip_rib.png");
		this.foregroundChipRibExtended_mp = this.initPicture("free_spins/foreground_chip/chip_rib_extended.png");
		
		this.jellyfishHeadRed_mp	= 	this.initPicture("free_spins/jellyfish/red/head.png");
		this.jellyfishBodyRed_mp	= 	this.initPicture("free_spins/jellyfish/red/body.png");
		this.jellyfishTailRed_mp	= 	this.initPicture("free_spins/jellyfish/red/tail.png");
		this.jellyfishHeadYellow_mp	= 	this.initPicture("free_spins/jellyfish/yellow/head.png");
		this.jellyfishBodyYellow_mp	= 	this.initPicture("free_spins/jellyfish/yellow/body.png");
		this.jellyfishTailYellow_mp	= 	this.initPicture("free_spins/jellyfish/yellow/tail.png");
		this.jellyfishHeadOrange_mp	= 	this.initPicture("free_spins/jellyfish/orange/head.png");
		this.jellyfishBodyOrange_mp	= 	this.initPicture("free_spins/jellyfish/orange/body.png");
		this.jellyfishTailOrange_mp	= 	this.initPicture("free_spins/jellyfish/orange/tail.png");
		this.jellyfishHeadShadow_mp	= 	this.initPicture("free_spins/jellyfish/head_shadow.png");
		this.jellyfishBodyShadow_mp	= 	this.initPicture("free_spins/jellyfish/body_shadow.png");
		this.jellyfishTailShadow_mp	= 	this.initPicture("free_spins/jellyfish/tail_shadow.png");


		this.bigWinCoinFaceLevel0_mp = this.initPicture("big_wins/coin_face_level_0.png");
		this.bigWinCoinFaceLevel1_mp = this.initPicture("big_wins/coin_face_level_1.png");
		this.bigWinCoinFaceLevel2_mp = this.initPicture("big_wins/coin_face_level_2.png");
		this.bigWinCoinBackLevel0_mp = this.initPicture("big_wins/coin_back_level_0.png");
		this.bigWinCoinBackLevel1_mp = this.initPicture("big_wins/coin_back_level_1.png");
		this.bigWinCoinBackLevel2_mp = this.initPicture("big_wins/coin_back_level_2.png");
		this.bigWinCoinCaptionLevel0_mp = this.initPicture("big_wins/coin_caption_level_0.png");
		this.bigWinCoinCaptionLevel1_mp = this.initPicture("big_wins/coin_caption_level_1.png");
		this.bigWinCoinCaptionLevel2_mp = this.initPicture("big_wins/coin_caption_level_2.png");
		this.bigWinCoinRib_mp = this.initPicture("big_wins/coin_rib.png");
		this.bigWinCoinRibExtended_mp = this.initPicture("big_wins/coin_rib_extended.png");
		this.bigWinCoinShadow_mp = this.initPicture("big_wins/coin_shadow.png");
		this.bigWinDigits_mp = this.initPicture("big_wins/win_digits.png");
		this.bigWinParticles_mp = this.initPicture("particles/bubbles.png");


		this.freeSpinsChipFace_mp = this.initPicture("free_spins/chip/chip_face.png");
		this.freeSpinsChipBack_mp = this.initPicture("free_spins/chip/chip_back.png");
		this.freeSpinsChipCaptionAward_mp = this.initPicture("free_spins/chip/chip_caption_award.png");
		this.freeSpinsChipCaptionWon_mp = this.initPicture("free_spins/chip/chip_caption_won.png");
		this.freeSpinsChipRib_mp = this.initPicture("free_spins/chip/chip_rib.png");
		this.freeSpinsChipRibExtended_mp = this.initPicture("free_spins/chip/chip_rib_extended.png");



		this.background_mp = this.initPicture("background.png");
		this.backgroundLight_mp = this.initPicture("background_light.png");
		this.tempel_mp = this.initPicture("tempel.png");
		this.logo_mp = this.initPicture("logo.png");

		this.xibalbaHead_mp = this.initPicture("xibalba/head.png");
		this.xibalbaHand_mp = this.initPicture("xibalba/hand.png");
		this.xibalbaX_mp = this.initPicture("xibalba/x.png");
		this.xibalbaXGlow_mp = this.initPicture("xibalba/x_glow.png");
		
		this.fire_mp 		= 		this.initPicture("particles/fire.png");
		this.fireSparcles_mp= 		this.initPicture("particles/fire_sparcles.png");
		this.bubble_mp 		= 		this.initPicture("particles/bubble.png");
		this.floatingParticle_mp = 	this.initPicture("particles/floating_particle.png");
		
		this.coinHeads_mp	= 		this.initPicture("coin/coin_heads.png");
		this.coinTails_mp	= 		this.initPicture("coin/coin_tails.png");
		this.coinRib_mp		= 		this.initPicture("coin/coin_rib.png");
		this.coinMiddle_mp	= 		this.initPicture("coin/coin_middle.png");
		this.coinShadow_mp	= 		this.initPicture("coin/coin_shadow.png");
		
		this.fishHead_mp	= 		this.initPicture("fish/head.png");
		this.fishBody_mp	= 		this.initPicture("fish/body.png");
		this.fishTail_mp	= 		this.initPicture("fish/tail.png");
		this.fishHeadShadow_mp	= 	this.initPicture("fish/head_shadow.png");
		this.fishBodyShadow_mp	= 	this.initPicture("fish/body_shadow.png");
		this.fishTailShadow_mp	= 	this.initPicture("fish/tail_shadow.png");
	}
}