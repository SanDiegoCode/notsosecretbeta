
var particle = (function(w, x, y, m, d) {
	var	_world = w,
		_pos_x = x,
		_pos_y = y,
		_density = d || 1,
		_velocity_x = 0,
		_velocity_y = 0,
		_mass = m || 1,
		_radius = _mass / _density,
		_springs = [],
		_gravitations = [];

	for(var i = _world.getParticles().length - 1; i >= 0; i--) {
		_addGravitation(_world.getParticles()[i]);
	}

	function getRadius() {
		return _radius;
	}

	function getX() {
		return _pos_x;
	}

	function getY() {
		return _pos_y;
	}

	function getVelocity() {
		return {
			vx: _velocity_x,
			vy: _velocity_y
		}
	}

	function getMass() {
		return _mass;
	}

	function thrust(ax, ay) {
		_velocity_x += ax;
		_velocity_y += ay;
	}

	function _addGravitation(_particle) {
		_gravitations.push(_particle);
	}

	function _removeGravitation(_particle) {
		for(var i = _gravitations.length; i >= 0; i--) {
			if(_gravitations[i] === _particle) {
				_gravitations.splice(i, 1);
				break;
			}
		}
	}

	function _handleGravitations() {
		for(var i = _gravitations.length - 1; i >= 0; i--) {
			_gravitateTo(_gravitations[i]);
		}
	}

	function _addSpring(point, k, length) {
		_springs.push({
			point: point,
			k: k,
			length: length || 0
		});
	}

	function _removeSpring(point) {
		for(var i = _springs.length; i >= 0; i--) {
			if(_springs[i].point === point) {
				_springs.splice(i, 1);
				break;
			}
		}
	}


	function _handleSprings() {
		for(var i = 0; i < _springs.length; i++) {
			var spring = _springs[i];
				_springTo(spring);
		}
	}

	function _gravitateTo(_particle) {
		var dx = _particle.getX() - _pos_x,
			dy = _particle.getY() - _pos_y,
			distSQ = dx * dx + dy * dy,
			dist = Math.sqrt(distSQ),
			force = _particle.getMass() / distSQ,
			ax = dx / dist * force,
			ay = dy / dist * force;

		thrust(ax, ay);
	}

	function _springTo(_springObject) {
		var dx = _springObject.point.getX() - _pos_x,
			dy = _springObject.point.getY() - _pos_y,
			distance = Math.sqrt(dx * dx + dy * dy),
			springForce = (distance - _springObject.length || 0) * _springObject.k;

		thrust(dx / distance * springForce, dy / distance * springForce);
	}

	function _update(_friction) {
		_handleGravitations();
		_handleSprings();
		_pos_x += _velocity_x * (_friction || 1);
		_pos_y += _velocity_y * (_friction || 1);
	}

	var pseudo = {
		thrust: thrust,
		getMass: getMass,
		getX: getX,
		getY: getY,
		getRadius: getRadius,
		getVelocity: getVelocity,
    addSpring: _addSpring,
	};

	pubsub.publish("particleCreated", pseudo);
	pubsub.subscribe("particleCreated", _addGravitation);
	pubsub.subscribe("particleDestroyed", _removeGravitation);
	pubsub.subscribe("update", _update);

	return pseudo;
});
