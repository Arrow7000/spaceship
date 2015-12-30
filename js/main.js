var keys = [];

// var flameLine = new Path.Line({
// 	segments: [segments[2], segments[2] + new Point(0, 20)],
// 	strokeColor: 'yellow',
// 	strokeWidth: 1
// });
// var shipPath = new Path.Line({
// 	segments: segments,
// 	closed: true,
// 	strokeColor: '#eee',
// 	strokeWidth: 2
// });


function Ship(pos) {
	var position = pos ? pos : view.center;
	var segments = [
			new Point(position) + new Point(0, -7.5), // Front of ship
			new Point(position) + new Point(-5, 7.5), // Back left
			new Point(position) + new Point(0, 3.5), // Rear exhaust indentation
			new Point(position) + new Point(5, 7.5) // Back right
		]
		// this.exhaust = new Point(position) + new Point(0, 3.5);
	this.shipPath = new Path.Line({
		segments: segments,
		closed: true,
		strokeColor: '#eee',
		strokeWidth: 2
	});
	// this.flame = new Path.Line({
	// 	segments: [this.shipPath.position, this.shipPath.position + new Point(0, 20)],
	// 	strokeColor: 'yellow',
	// 	strokeWidth: 1
	// });
	this.group = new Group([this.shipPath]);
	this.velocity = new Point(0, -1);
	this.steering = new Point(0, -1);
	this.rot = function(ang) {
		this.steering.angle += ang;
		this.shipPath.rotate(ang, this.shipPath.position);
		// this.exhaust.rotate(ang, this.group.position);
		// this.flame.rotate(ang, this.group.position);
	}
	this.drive = function() {
		this.shipPath.position += this.velocity;
		// this.exhaust += this.velocity;
		// console.log("this.exhaust", this.exhaust);
		// console.log("this.flame", this.flame.segments[0]);
		// this.flame.position += this.velocity;
		// this.flame.scale(.98 + Math.random() * .4);
		// this.flame.scale(1.005, this.shipPath.position);
	}
}

var ship = new Ship();


var path = new Path({
	strokeColor: '#ddd',
	strokeWidth: 1
});




// Every frame occurrence 
function onFrame(event) {

	path.add(ship.shipPath.position);

	for (var i = 0; i < keys.length; i++) {

		switch (keys[i]) {
			case 38: // Up
				if (true) ship.velocity += ship.steering / 10;
				break;
			case 39: // Right
				ship.rot(5);
				break;
			case 40: // Down
				if (true) ship.velocity -= ship.steering / 10;
				break;
			case 37: // Left
				ship.rot(-5);
				break;
			default:
		}
	}
	// console.log("Angle", ship.velocity.angle, "\nSpeed", ship.velocity.length);
	// console.log(keys);
	// console.log(ship.group.children[1].lastSegment);
	// ship.group.children[1].scale(1.01, ship.group.children[1].lastSegment);
	ship.drive();







	/// This makes it curve round in a pwetty pattern
	// ship.velocity.angle += 1 / 2 + Math.sin(event.count / 50);
	// ship.position += ship.velocity;
	// console.log("angle", ship.velocity.angle);
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
}
