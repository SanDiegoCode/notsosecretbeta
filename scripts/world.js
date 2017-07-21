
var world = function(fr) {
	var _friction = fr,
		_particles = [];

	pubsub.subscribe("particleCreated", _addParticle);
	pubsub.subscribe("particleDestroyed", _removeParticle);


	function _addParticle(p) {
		_particles.push(p);
	}

	function _removeParticle(p) {
		for(var i = _particles.length - 1; i >= 0; i--) {
			if(_particles[i] === p) {
				_particles.splice(i, 1);
				break;
			}
		}
	}

	function getParticles() {
		return _particles;
	}

	function getFriction() {
		return _friction;
	}

	return {
		getFriction: getFriction,
		getParticles: getParticles
	}
};
