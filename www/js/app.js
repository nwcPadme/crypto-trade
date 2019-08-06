angular.module("crypto_trade", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ionicLazyLoad","crypto_trade.controllers", "crypto_trade.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Crypto Trade" ;
		$rootScope.appLogo = "data/images/header/next_logo.png" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;

		$rootScope.liveStatus = "pause" ;
		$ionicPlatform.ready(function(){
			$rootScope.liveStatus = "run" ;
		});
		$ionicPlatform.on("pause",function(){
			$rootScope.liveStatus = "pause" ;
		});
		$ionicPlatform.on("resume",function(){
			$rootScope.liveStatus = "run" ;
		});


		$rootScope.hide_menu_why_us = false ;
		$rootScope.hide_menu_how_it_works = false ;
		$rootScope.hide_menu_instruments = false ;
		$rootScope.hide_menu_faq = false ;
		$rootScope.hide_menu_login = false ;
		$rootScope.hide_menu_register = false ;


		$ionicPlatform.ready(function() {

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "crypto_trade",
				storeName : "crypto_trade",
				description : "The offline datastore for Crypto Trade app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("crypto_trade.dashboard");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("phpTime", function(){
		return function (input) {
			var timeStamp = parseInt(input) * 1000;
			return timeStamp ;
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
	$translateProvider.useSanitizeValueStrategy("escapeParameters");
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?mad\-agency\.xyz/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?httptradehard\.mad\-agency\.xyz/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?monfex\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("crypto_trade",{
		url: "/crypto_trade",
			abstract: true,
			templateUrl: "templates/crypto_trade-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("crypto_trade.about_us", {
		url: "/about_us",
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.blog", {
		url: "/blog",
		cache:false,
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-blog.html",
						controller: "blogCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.crypto_knowledgebase", {
		url: "/crypto_knowledgebase",
		cache:false,
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-crypto_knowledgebase.html",
						controller: "crypto_knowledgebaseCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.dashboard", {
		url: "/dashboard",
		cache:false,
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.faq", {
		url: "/faq",
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-faq.html",
						controller: "faqCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.financial_dictionary", {
		url: "/financial_dictionary",
		cache:false,
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-financial_dictionary.html",
						controller: "financial_dictionaryCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.how_it_works", {
		url: "/how_it_works",
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-how_it_works.html",
						controller: "how_it_worksCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.instruments", {
		url: "/instruments",
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-instruments.html",
						controller: "instrumentsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.login", {
		url: "/login",
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-login.html",
						controller: "loginCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.mobile", {
		url: "/mobile",
		cache:false,
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-mobile.html",
						controller: "mobileCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.monfex_cocktails", {
		url: "/monfex_cocktails",
		cache:false,
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-monfex_cocktails.html",
						controller: "monfex_cocktailsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.register", {
		url: "/register",
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-register.html",
						controller: "registerCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.trading_academy", {
		url: "/trading_academy",
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-trading_academy.html",
						controller: "trading_academyCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.tutorials", {
		url: "/tutorials",
		cache:false,
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-tutorials.html",
						controller: "tutorialsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("crypto_trade.why_us", {
		url: "/why_us",
		views: {
			"crypto_trade-side_menus" : {
						templateUrl:"templates/crypto_trade-why_us.html",
						controller: "why_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/crypto_trade/dashboard");
});
