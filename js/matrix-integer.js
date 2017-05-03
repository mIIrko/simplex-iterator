

var matrix = [ [ 3, 2, 1, 0, 12 ], [ 1, 3, 0, 1, 9 ], [ -1, -2, 0, 0, 0 ] ];

// (1) PivotSpalte bestimmen = Zielfunktionszeile höchster Wert
// (2) PivotZeile bestimmen = RightHandSide geteilt durch PivotSpaltenWerte
// (Ergebnisse = Engpass)
// kleinster Wert = PivotZeile

let pivotColumnIndex = getPivotColumn(matrix);
let pivotRowIndex = getPivotRow(matrix, pivotColumnIndex);

optimize();
console.log(matrix);

/**
 *
 *
 * @param matrix
 * @returns
 */
function getPivotColumn(matrix) {

	var targetRow = matrix[matrix.length - 1];
	var minValue = targetRow[0];
	var minIndex = 0;

	for (var i = 0; i < targetRow.length - 1; i++) {

		if (targetRow[i] < minValue) {
			minIndex = i;
			minValue = targetRow[i];
		}
	}

	return minIndex;
}

/**
 *
 *
 * @param matrix
 * @param pivotColumnIndex
 *            The index of the pivotColumn (starting with 0)
 * @returns
 */
function getPivotRow(matrix, pivotColumnIndex) {

	var minIndex = 0;
	var minValue = Number.MAX_VALUE;

	for (var i = 0; i < matrix.length - 1; i++) {
		if (matrix[i][pivotColumnIndex] === 0) {
			// division by zero
			continue;
		}

		// TODO: divison by negative numbers possible?

		var tmp = matrix[i][matrix[0].length - 1] / matrix[i][pivotColumnIndex];
		if (tmp < minValue) {
			minValue = tmp;
			minIndex = i;
		}
	}

	return minIndex;
}

function iterate(matrix, pivotColumnIndex, pivotRowIndex) {

	// get the pivot element
	let pivotElement = matrix[pivotRowIndex][pivotColumnIndex];

	// we can be safe that the pivotElement can't be zero!
	// TODO: is that true?
	for (var i = 0; i < matrix[pivotRowIndex].length; i++) {
		matrix[pivotRowIndex][i] = (matrix[pivotRowIndex][i] / pivotElement);
	}

	// iterate over the other rows
	for (var i = 0; i < matrix.length; i++) {
		if (i === pivotRowIndex) {
			// all rows except the pivot row
			continue;
		}

		var valueOfElementInPivotColumn = matrix[i][pivotColumnIndex];

		for (var j = 0; j < matrix[i].length; j++) {

			let minuend = matrix[i][j];
			let subtrahend = matrix[pivotRowIndex][j]
					* valueOfElementInPivotColumn;
			matrix[i][j] = (minuend - subtrahend);
		}
	}

}

function optimize() {

	// proof initial the values
	let isOptimal = checkOptimum();
	while (!isOptimal) {
		pivotColumnIndex = getPivotColumn(matrix);
		pivotRowIndex = getPivotRow(matrix, pivotColumnIndex);

		iterate(matrix, pivotColumnIndex, pivotRowIndex);
		isOptimal = checkOptimum();
		console.log("finished iteration");
	}
}

function checkOptimum() {

	let targetRow = matrix[matrix.length - 1];
	for (var i = 0; i < targetRow.length; i++) {
		if (targetRow[i] < 0) {
			// there are still negative values present
			return false;
		}
	}

	return true;
}
