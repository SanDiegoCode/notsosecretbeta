var pubsub = {
	events: {},

	subscribe: function(eventName, fn) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	},

	unsubscribe: function(eventName, fn) {
		if(this.events[eventName]) {
			for(var i = this.events.length - 1; i >= 0; i--) {
				if(this.events[eventName][i] === fn) {
					this.events[eventName].splice(i, 1);
					break;
				}
			}
		}
	},

	publish: function(eventName, data) {
		if(this.events[eventName]) {
			for(var i = 0; i < this.events[eventName].length; i++) {
				this.events[eventName][i](data);
			}
		}
	}
};
