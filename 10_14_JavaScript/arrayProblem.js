function printReverse(arr) {
	for (var i = arr.length - 1; i >= 0; i--) {
		console.log(arr[i]);
	}
}
printReverse([3,6,2,5]);


function isUniform(arr) {
	var first = arr[0];
	arr.forEach(function(element) {
		if (element !== first) {
			return false;
		}
	});
	// for (var i = 1; i < arr.length; i++) {
	// 	if (first !== arr[i]) {
	// 		return false;
	// 	}
	// }
	return true;
}

isUniform([1,1,2]);


function sumArray(arr) {
	var total = 0;
	arr.forEach(function(element) {
		total += element;
	});
	return total;
}

sumArray([1,2,3]);

function max(arr) {
	var max = arr[0];
	arr.forEach(function(element) {
		if (element > max) {
			max = element;
		}
	});
	return max;
}

max([10,3,4,10]);