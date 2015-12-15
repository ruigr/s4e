/*

	base
		base module objects to be extended and
		used as specific modules

		example:
			var ExampleMod = (function(){

				var module = function(name){
					common.Mod.call(this,name);
					this.configMap.requires = ['utils'];
				};

				module.prototype = Object.create(common.Mod.prototype);
				module.prototype.constructor = module;
				module.prototype.doStuff = function(x){};

				return { module: module };

			}());

*/


var base = (function() {

	/*
		Mod 
			common module with no UI
	*/
	var Mod = function(name){
		this.name = name;

		this.configMap = {
			//requires: ['api'];
			requires: [],
			events: ['onAnchor'],
			modules: {}
		}; 
		this.stateMap = {
			anchor_map : {}	,
			context: null
		}; 
	};

	Mod.prototype.getName = function(){
		return this.name;
	};

	Mod.prototype.setContext = function(context){
		this.stateMap.context = context;
	};

	Mod.prototype.configure = function(confMap){
		for (var key in confMap) {
		  if (confMap.hasOwnProperty(key)) {
		    Object.defineProperty(this.configMap, key, confMap[key]);
		  }
		}
	};

	Mod.prototype.onEvent = function(event, context){
		console.log("Mod.prototype.onEvent not implemented");
	};

	Mod.prototype.throw = function(msg){
		throw {
			origin: this.name,
			message: msg
		};
	};

	Mod.prototype.validateContext = function(){
		console.log("Mod.prototype.validateContext not implemented");
	};

	Mod.prototype.setEvents = function(){
		console.log("Mod.prototype.setEvents not implemented");
	};
	Mod.prototype.initModule = function(){
		
		if(null != this.configMap.events){
			if(this.configMap.modules.hasOwnProperty('pubsub')){
				var pubsub = this.configMap.modules['pubsub'];
				pubsub.subscribe(this.configMap.events, this);
			}
		} 

	};
	Mod.prototype.requires = function(dependency){
		var result = false;
		if(Array.isArray(this.configMap.requires)){
			for( var i = 0 ; i < this.configMap.requires.length ; i++ ){
				var req = this.configMap.requires[i];
				if( req == dependency){
					result = true;
					break;
				}
			}
		}
		return result;
	};

	/*
		UIMod 
			UI module to be extended/implemented with specific features
	*/
	var UIMod = function(name){
		Mod.call(this,name);
		this.configMap.uicontainer = null;
		this.stateMap.jqueryMap = {} ;

	};

	UIMod.prototype = Object.create(Mod.prototype);
	UIMod.prototype.constructor = UIMod;

	UIMod.prototype.setJqueryMap = function(){
		console.log("UIMod.prototype.setJqueryMap not implemented");
	};

	UIMod.prototype.getJqueryMap = function(){
		return this.stateMap.jqueryMap;
	};

	UIMod.prototype.validateContext = function(){
		if(null == this.stateMap.context.container)
			this.throw ("context must provide container property");
	};

	UIMod.prototype.initUI = function(){
		console.log("UIMod.prototype.initUI not implemented");
	};

	UIMod.prototype.load = function(){
		console.log("UIMod.prototype.load not implemented");
	};

	UIMod.prototype.show = function(){
		this.validateContext();
		this.configMap.uicontainer = this.stateMap.context.container;
		this.initUI();
		this.setJqueryMap();
		this.setEvents();
		this.load();
	};

	

	return { 
		Mod: Mod,
		UIMod: UIMod 
	};

}());
		/*
			item: {
				_id: null,
				images:[],
				name: '',
				notes: '',
				price: ''
			}
		*/