var mockery = require('mockery');

mockery.registerMock('os', {
	tmpdir: function() {
		return '/Users/tusharmathur/desktop';
	}
});

mockery.registerMock('fs', {
	write: function(a, b, c, d, e, f) {
		f();
	},
	readFile: function(a, b, c) {
		c('{}');
	},
	writeFile: function() {},
	open: function(a, b, c, d) {
		d(undefined, {});
	},
	unlink: function(a, b) {
		b();
	},
	ReadStream: function() {
		return {
			on: function(a, b) {
				b();
			}
		};
	}
});

mockery.registerMock('crypto', {
	createHash: function() {
		return {
			update: function() {},
			digest: function() {
				return 'xxxx';
			}
		};
	}
});

mockery.registerMock('url', {
	parse: function() {
		return {
			hostname: '',
			path: ''
		};
	}
});

mockery.registerMock('http', {
	globalAgent: {
		maxSockets: 0
	},
	Agent: {
		defaultMaxSockets: 0
	},
	get: function(a, b) {
		b({
			addListener: function(a, b) {
				if (a == 'end') {
					b();
				} else if (a == 'data') {
					b([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
				}
			},
			destroy: function() {}
		});
		return {
			on: function() {
				return {
					end: function() {}
				};
			}

		};
	},
	request: function(a, b) {
		b({
			headers: {
				'content-length': 100,
				'content-type': 'text/html'
			},
			destroy: function() {}
		});
		return {
			on: function() {
				return {
					end: function() {}
				};
			}
		};
	}
});

module.exports = mockery;