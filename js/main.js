var keys = [],
	counter = 0;



function Ship(pos) {
	var position = pos ? pos : view.center;
	var exhaust = new Point(position) + new Point(0, 4.5);
	var segments = [
		new Point(position) + new Point(0, -7.5), // Front of ship
		new Point(position) + new Point(-5, 7.5), // Back left
		exhaust + new Point(0, -1), // Rear exhaust indentation
		new Point(position) + new Point(5, 7.5) // Back right
	]
	this.shipPath = new Path.Line({
		segments: segments,
		closed: true,
		strokeColor: '#eee',
		strokeWidth: 2
	});
	this.flames = new Group([
		new Path.Line({
			from: exhaust,
			to: exhaust + new Point(0, 12.5)
		}),
		new Path.Line({
			from: exhaust,
			to: exhaust + new Point(-1, 10)
		}).rotate(-15, exhaust),
		new Path.Line({
			from: exhaust,
			to: exhaust + new Point(1, 10)
		}).rotate(15, exhaust)

	]);
	this.flames.style = {
		strokeWidth: 1
	}
	this.group = new Group([this.shipPath, this.flames]);
	this.velocity = new Point(0, -1);
	this.steering = new Point(0, -1);
	this.rot = function(ang) {
		this.steering.angle += ang;
		this.group.rotate(ang, centroid(this.shipPath));
	}
	this.drive = function() {
		this.group.position += this.velocity;
		this.group.position = toroid(this, view);
	}
	this.thrust = function() {
		this.flames.strokeColor = 'black';
		var flame = Math.floor(Math.random() * 3);
		this.flames.children[flame].style.strokeColor = 'yellow';
	}
	this.stopThrust = function() {
		this.flames.strokeColor = 'black';
	}
	this.path = new Path({
		strokeColor: '#ddd',
		strokeWidth: 1
	});
	this.renewPath = function() {
		this.path = new Path({
			strokeColor: '#ddd',
			strokeWidth: 1
		});
	}
}

var ship = new Ship();






// Every frame occurrence 
function onFrame(event) {

	ship.path.add(centroid(ship.shipPath));

	for (var i = 0; i < keys.length; i++) {

		switch (keys[i]) {
			case 38: // Up
				ship.thrust();
				ship.velocity += ship.steering / 10;
				break;
			case 39: // Right
				ship.rot(5);
				break;
			case 40: // Down
				// if (ship.velocity.length > 0) ship.velocity -= ship.steering / 10;
				break;
			case 37: // Left
				ship.rot(-5);
				break;
			default:
		}
	}
	ship.drive();


	/// This makes it curve round in a pwetty pattern
	// ship.velocity.angle += 1 / 2 + Math.sin(event.count / 50);
	// ship.position += ship.velocity;
	// console.log("angle", ship.velocity.angle);
	counter++;
}


// Event handlers for pressing the arrow keys
document.onkeydown = function(e) {
	var present = false;
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] === e.keyCode) {
			present = true;
		}
	}
	if (!present) keys.push(e.keyCode);
}
document.onkeyup = function(e) {
	var index = keys.indexOf(e.keyCode);
	if (index > -1) {
		keys.splice(index, 1);
	}
	ship.stopThrust();
}


function centroid(ship) {
	var segments = ship.segments;
	var vertex = segments[0].point;
	var opposite = segments[1].point - (segments[1].point - segments[3].point) / 2;
	var c = vertex + (opposite - vertex) * 2 / 3;
	return c;
}

function loopCood(shipC, bound) {
	if (shipC < 0 || shipC > bound) {
		if (shipC < 0) {
			return bound;
		} else if (shipC > bound) {
			return 0;
		}
	}
	return shipC;
}


function toroid(ship, view) {
	var pos = ship.group.position;
	var posNew = {
		x: pos.x,
		y: pos.y
	}
	posNew.x = loopCood(pos.x, view.bounds.width);
	posNew.y = loopCood(pos.y, view.bounds.height);
	if ((pos.x === posNew.x && pos.y === posNew.y) === false) {
		ship.renewPath();
	}
	return posNew;
}
