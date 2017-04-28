// ###############################################################
// #
// #	WEB ITERATOR (PURE JAVASCRIPT)
// #
// #	Mirko Bay, 2017-04-26
// #
// #	TODO
// #	> zielfunktionszeile nach unten
// #	> Verhalten wie Spinner vom Number Input für die Buttons
// #	> navigation mit tastatur in tableau
// #	> alerts mit https://t4t5.github.io/sweetalert/ machen
// #
// ###############################################################

var matrix = [
		[ new Fraction(3), new Fraction(2), new Fraction(1), new Fraction(0),
				new Fraction(12) ],
		[ new Fraction(1), new Fraction(3), new Fraction(0), new Fraction(1),
				new Fraction(9) ],
		[ new Fraction(-1), new Fraction(-2), new Fraction(0), new Fraction(0),
				new Fraction(0) ] ];

var pivotColumnIndex;
var pivotRowIndex;
var pivotElementIsSet;

// (1) PivotSpalte bestimmen = Zielfunktionszeile kleinster Wert
// (2) PivotZeile bestimmen = RightHandSide geteilt durch PivotSpaltenWerte,
// kleinster Wert

/**
 * 
 * @returns
 */
function getOptimalPivotColumn() {

	var objectiveRow = matrix[matrix.length - 1]
	var minValue = new Fraction(Number.MAX_VALUE);
	var minIndex = 0;
	var pivotColumnFound = false;

	for (var i = 0; i < objectiveRow.length - 1; i++) {

		if (objectiveRow[i] < minValue) {
			minIndex = i;
			minValue = objectiveRow[i];
			pivotColumnFound = true;
			console.log("pivot column found");
		}
	}

	if (pivotColumnFound) {
		return minIndex;
	} else {
		return false;
	}
}

/**
 * 
 * @returns
 */
function getOptimalPivotRow() {

	var minIndex = 0;
	var minValue = new Fraction(Number.MAX_VALUE);
	var pivotRowFound = false;

	for (var i = 0; i < matrix.length - 1; i++) {
		if (matrix[i][pivotColumnIndex] == 0) {
			// division by zero
			console.log("element in pivot column is zero");
			continue;
		}

		// TODO: divison by negative numbers possible?

		var tmp = matrix[i][matrix[0].length - 1]
				.div(matrix[i][pivotColumnIndex]);
		if (tmp < minValue) {
			minValue = tmp;
			minIndex = i;
			pivotRowFound = true;
			console.log("pivot row found");

		}
	}

	if (pivotRowFound) {
		return minIndex;
	} else {
		return false;
	}
}

/**
 * 
 * @returns
 */
function iterate(customPivotRowIndex, customPivotColumnIndex) {

	getValuesFromTableToMatrix();

	if (customPivotRowIndex !== undefined
			&& customPivotColumnIndex !== undefined) {
		var pivotElement = matrix[customPivotRowIndex][customPivotColumnIndex];
		pivotRowIndex = customPivotRowIndex;
		pivotColumnIndex = customPivotColumnIndex;
	} else {
		
		if (checkOptimum()) {
			alert("Ist bereits Optimum!");
			return;
		}
		
		if (!pivotElementIsSet) {
			alert("Erst Pivot Element bestimmen!");
			return;
		}
		var pivotElement = matrix[pivotRowIndex][pivotColumnIndex];
	}

	// we can be safe that the value of the pivotElement can't be zero!
	// TODO: is that true?
	for (var i = 0; i < matrix[pivotRowIndex].length; i++) {
		matrix[pivotRowIndex][i] = (matrix[pivotRowIndex][i].div(pivotElement));
	}

	// iterate over the other rows
	for (var i = 0; i < matrix.length; i++) {
		if (i === pivotRowIndex) {
			// all rows except the pivot row
			continue;
		}

		var valueOfElementInPivotColumn = new Fraction(
				matrix[i][pivotColumnIndex]);

		for (var j = 0; j < matrix[i].length; j++) {

			let minuend = matrix[i][j];
			let subtrahend = matrix[pivotRowIndex][j]
					.mul(valueOfElementInPivotColumn);
			matrix[i][j] = minuend.sub(subtrahend);
		}
	}

	// copy the new values to the html table
	copyMatrixToTable();
	// reset the pivot element
	pivotElementIsSet = false;

}

/**
 * 
 * @returns
 */
function optimize() {

	// proof initial the values
	var isOptimal = checkOptimum();
	while (!isOptimal) {
		pivotColumnIndex = setPivotColumn();
		pivotRowIndex = setPivotRow();

		iterate();
		isOptimal = checkOptimum();
		console.log("finished iteration");
	}
}

/**
 * 
 * @returns
 */
function checkOptimum() {

	var objectiveRow = matrix[matrix.length - 1];
	for (var i = 0; i < objectiveRow.length; i++) {
		if (objectiveRow[i] < 0) {
			// there are still negative values present
			return false;
		}
	}

	return true;
}