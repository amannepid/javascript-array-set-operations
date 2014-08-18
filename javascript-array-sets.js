// Based ON: https://code.google.com/p/javascriptsets/

Array.prototype.cartesian = function(a) {
	var temp = [];
	for (var i = 0; i < this.length; i++) {
		for (var j = 0; j < a.length; j++) {
			temp.push([this[i], a[j]]);
		}
	}

	return temp;
};			

Array.prototype.complement = function(a) {
	var keys = {};
	var temp = [];
	for (var i = 0; i < this.length; i++) {
		keys[this[i]] = 1;
	}
	for (var i = 0; i < a.length; i++) {
		if (keys[a[i]] != undefined) {
			keys[a[i]]--;
		}
	}
	for (var key in keys) {
		if (keys[key] > 0) {
			temp.push(key);
		}
	}

	return temp;
};
Array.prototype.difference = function(a) {
	var temp = [];
	var keys = {};
	for (var i = 0; i < this.length; i++) {
		keys[this[i]] = 1;
	}
	for (var i = 0; i < a.length; i++) {
		if (keys[a[i]] != undefined) {
			keys[a[i]] = 2;
		}
	}
	for (var key in keys) {
		if (keys[key] == 1) {
			temp.push(key);
		}
	}
	return temp;
};
Array.prototype.intersection = function(a) {
	var keys = {};
	var temp = [];
	var bigger = (this.length > a.length) ? this : a;
	var smaller = (this.length > a.length) ? a : this;
	for (var i = 0; i < smaller.length; i++) {
		keys[smaller[i]] = 1;
	}
	for (var i = 0; i < bigger.length; i++) {
		if (keys[bigger[i]] != undefined) {
			keys[bigger[i]]++;
		}
	}
	for (var key in keys) {
		if (keys[key] > 1) {
			temp.push(key);
		}
	}
	return temp;
};
Array.prototype.powerset = function() {
	// [x,y,z] => [[],[x],[y],[z],[x,y],[x,z],[y,z],[x,y,z]]
	var temp = [];
	var clone = [];
	// iteration 0 - just add the empty set
	temp.push([]);
	// iteration 1 - add each individual element
	for (var i = 0; i < this.length; i++) {
		temp.push([this[i]]);
	}
	// iteration 2 - add each individual element, unioned with every other element
	var clone = this.union([]);
	while (clone.length > 0) {
		var el = clone[0];
		var others = clone.complement([el]);
		for (var i = 0; i < others.length; i++) {
			temp.push([el, others[i]]);
		}
		clone = others;
	}
	for (var i = 0; i < this.length; i++) {
		// hmmmmmm, not quite....
	}
	// iteration 3 - add the original set
	temp.push(this.union([]));
	return temp;
};

Array.prototype.union = function(a) {
	var keys = {};
	var temp = [];
	var bigger = (this.length > a.length) ? this : a;
	var smaller = (this.length > a.length) ? a : this;
	// build has table with smaller array
	for (var i = 0; i < smaller.length; i++) {
		keys[smaller[i]] = 1;
	}
	// loop over larger array checking hash table for matches
	for (var i = 0; i < bigger.length; i++) {
		if (keys[bigger[i]] == undefined) {
			keys[bigger[i]] = 1;
		}
	}
	// convert hash table to array and return
	for (var key in keys) {
		temp.push(key);
	}

	return temp;
};
