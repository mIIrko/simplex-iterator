// ###############################################################
// #
// #	WEB ITERATOR (PURE JAVASCRIPT)
// #
// #	Mirko Bay, 2017-04-26
// #
// ###############################################################

// ROADMAP v1.0
// navigation mit tastatur in tableau https://jsfiddle.net/cnkr7wqa/5/
// auf buttonklick komplett optimieren
// alle Basislösungen anzeigen (zulässig + unzulässige)
// import / export

// FEATURES
// Verhalten wie Spinner vom Number Input für die Buttons
// schöne Darstellung von rationalen Zahlen  : ohne library, da völliger overload
// Ausgangs-Matrix speichern
// automatisches Hinzufügen schlupfvar / goalvar
// zeichnen aller Lösungen / darstellen des Lösungsraum
// https://github.com/maurizzzio/function-plot

/*
 * ###############################################################
 */

// Array<Array> : holds the array with the fraction objects
var matrix;
// number: index of the pivot column
var pivotColumnIndex;
// number: index of the pivot row
var pivotRowIndex;
// boolean: indicates if the pivot element is set
var pivotElementIsSet;


// HTMLTableElement: holds the reference to the html table
var matrixTable;
// number: the current amount of Variables (= columns)
var numbOfVariables;
// number: the current amount of constraints (=rows)
var numbOfConstraints;


/**
 * initializes the tables and add the event handler
 *
 * @returns
 */
function init() {
  matrixTable = document.getElementById("matrix");

  numbOfVariables = document.getElementById("numbOfVariables").value;
  numbOfConstraints = document.getElementById("numbOfConstraints").value;

  EventHandler.initEventHandler();

  // create the header element, depending on the amount of variables
  TableManipulator.createMatrixHeader();

  // same for the objective function
  TableManipulator.createObjectiveFunction();

  // create rows for the constraints
  for (var i = 0; i < numbOfConstraints; i++) {
    TableManipulator.addConstraint(i + 1);
  }

}

/**
 *
 * is the same like in the powerlp > ajax.js > collectConstraintsData()
 * must be called before every operation to get the values from the html
 * table to the matrix array
 *
 * @returns
 */
function getValuesFromTableToMatrix() {

  var rows = matrixTable.rows;
  var tmpArray = [];

  // start with 1, so we ignore the row in the thead element
  for (var i = 1; i < rows.length; i++) {
    var item = rows[i];
    var constraintCells = item.cells;
    var tmpConstraint = [];

    // iterate over the cells of the row
    for (var j = 1; j < (constraintCells.length); j++) {
      var valueOfCell = new Fraction(constraintCells.item(j).firstElementChild.value);
      tmpConstraint.push(valueOfCell);
    }

    tmpArray.push(tmpConstraint);
  }
  matrix = tmpArray;
}

/**
 *
 * called from the pivotize button
 *
 * @returns
 */
function defineAndHighlightPivotElement() {

  if (pivotElementIsSet) {
    // we must reset the highligting of the old pivot element
    matrixTable.rows[pivotRowIndex + 1].childNodes[pivotColumnIndex + 1].style.backgroundColor = "white";
    pivotElementIsSet = false;
  }

  getValuesFromTableToMatrix();

  if (Iterator.checkOptimum()) {
    alert("Ist bereits Optimum!");
    return;
  }

  var optPivotColumn = Iterator.defineOptimalPivotColumn();

  if (!isNaN(optPivotColumn)) {

    pivotColumnIndex = optPivotColumn;
    var optPivotRow = Iterator.defineOptimalPivotRow();

    if (!isNaN(optPivotRow)) {
      pivotRowIndex = optPivotRow;
    } else {
      alert("Pivot Zeile kann nicht bestimmt werden!");
      return;
    }
  } else {
    alert("Pivot Spalte kann nicht bestimmt werden!");
    return;
  }

  pivotElementIsSet = true;
  // we must make plus 1 because of the row and column headers
  matrixTable.rows[pivotRowIndex + 1].childNodes[pivotColumnIndex + 1].style.backgroundColor = "red";
}

/**
 *
 * after every iteration (or whole optimization) we must set the values of the
 * js matrix array to the html table
 *
 * @returns
 */
function copyMatrixToTable() {

  // the matrixTable got 1 row and 1 column additionally because of the
  // headers
  var rows = matrixTable.rows;

  for (var i = 1; i < rows.length; i++) {
    for (var j = 1; j < rows[i].childNodes.length; j++) {
      // reset the background element of the old pivot element
      rows[i].childNodes[j].style.background = "white";
      rows[i].childNodes[j].firstElementChild.value = (matrix[i - 1][j - 1].toFraction(false));
    }
  }

}

/**
 *
 * set the default example of the grütz or lecture
 * to the html table and set the values also to the matrix array
 *
 * @returns : void
 */
function setDefaultExampleToTable() {

  TableManipulator.reset();

  var rows = matrixTable.rows;

  rows[1].childNodes[1].firstElementChild.value = 3;
  rows[1].childNodes[2].firstElementChild.value = 2;
  rows[1].childNodes[3].firstElementChild.value = 1;
  rows[1].childNodes[4].firstElementChild.value = 0;
  rows[1].childNodes[5].firstElementChild.value = 12;

  rows[2].childNodes[1].firstElementChild.value = 1;
  rows[2].childNodes[2].firstElementChild.value = 3;
  rows[2].childNodes[3].firstElementChild.value = 0;
  rows[2].childNodes[4].firstElementChild.value = 1;
  rows[2].childNodes[5].firstElementChild.value = 9;

  rows[3].childNodes[1].firstElementChild.value = -1;
  rows[3].childNodes[2].firstElementChild.value = -2;
  rows[3].childNodes[3].firstElementChild.value = 0;
  rows[3].childNodes[4].firstElementChild.value = 0;
  rows[3].childNodes[5].firstElementChild.value = 0;

  getValuesFromTableToMatrix();
}

/*
 * ###########################################################
 *
 * HELPER METHODS
 *
 * for creating input and select elements for additional table rows / cells
 *
 * ###########################################################
 */



