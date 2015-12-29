var keys = [];
var segments = [
	new Point(view.center) + new Point(0, -7.5),
	new Point(view.center) + new Point(-5, 7.5),
	new Point(view.center) + new Point(0, 3.5),
	new Point(view.center) + new Point(5, 7.5)
]


var ship = new Path.Line({
	segments: segments,
	closed: true,
	strokeColor: 'black',
	strokeWidth: 2,
	velocity: new Point(0, -1),
	steering: new Point(0, -1),
	rot: function(ang) {
		this.steering.angle += ang;
		this.rotate(ang, this.position);
	}
});

var path = new Path({
	strokeColor: 'black',
	strokeWidth: 1
});

function onFrame(event) {

	path.add(ship.position);

	for (var i = 0; i < keys.length; i++) {

		switch (keys[i]) {
			case 38:
				if (true) ship.velocity += ship.steering / 10;
				break;
			case 39:
				ship.rot(5);
				break;
			case 40:
				if (true) ship.velocity -= ship.steering / 10;
				break;
			case 37:
				ship.rot(-5);
				break;
			default:

		}
	}
	// console.log("Angle", ship.velocity.angle, "\nSpeed", ship.velocity.length);
	console.log(keys);
	ship.position += ship.velocity;






	/// This makes it curve round in a pwetty pattern
	// ship.velocity.angle += 1 / 2 + Math.sin(event.count / 50);
	// ship.position += ship.velocity;
	// console.log("angle", ship.velocity.angle);
}


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
}
