/**
 * 
 * creates initial the thead element for the matrix table
 * 
 * @returns void
 */
function createMatrixHeader() {
	// createTHead() returns the existing <thead> element
	var header = matrixTable.createTHead();
	var headerRow = header.insertRow();
	headerRow.id = "matrixHeader";
	headerRow.insertCell(0); // the first cell is empty

	for (var i = 0; i < numbOfVariables; i++) {
		var cell = headerRow.insertCell();
		cell.innerHTML = "x<sub>" + (i + 1) + "</sub>";
	}
	headerRow.insertCell().innerHTML = "b";
}

/**
 * 
 * creates initial the row for the objective function for the matrix table
 * 
 * @returns void
 */
function createTargetFunction() {

	var objectiveFunction = matrixTable.getElementsByTagName('tbody')[0]
			.insertRow();
	objectiveFunction.id = "objectiveFunction";
	var lineHeading = objectiveFunction.insertCell();
	lineHeading.innerHTML = headerMatrixTargetFunction;

	for (var i = 0; i < numbOfVariables; i++) {
		var tempCell = objectiveFunction.insertCell();
		tempCell.appendChild(createInputElement());
	}

	var rightHand = objectiveFunction.insertCell();
	rightHand.appendChild(createInputElement());
	
}

/**
 * reset the two tables and set the default size of 2 variables & constraints
 * 
 * @returns
 */
function reset() {

	numbOfVariables = 4;
	numbOfConstraints = 2;

	document.getElementById("numbOfVariables").value = numbOfVariables;
	document.getElementById("numbOfConstraints").value = numbOfConstraints;

	// remove the content of the thead
	while (matrixTable.firstElementChild.hasChildNodes()) {
		matrixTable.firstElementChild
				.removeChild(matrixTable.firstElementChild.lastChild);
	}
	// and the tbody of the matrixTable
	while (matrixTable.lastElementChild.hasChildNodes()) {
		matrixTable.lastElementChild
				.removeChild(matrixTable.lastElementChild.lastChild);
	}

	// repeat the steps which are used in the init function
	// (except of adding the event handlers)

	// create the header element, depending on the amount of variables
	createMatrixHeader();
	
	// same for the objective function
	createTargetFunction();

	// create rows for the constraints
	for (var i = 0; i < numbOfConstraints; i++) {
		addConstraint(i + 1);
	}

}

/**
 * 
 * @param numb :
 *            used for the id of the row
 * @returns
 */
function addConstraint(numb) {

	// createTBody() returns the existing <tbody> element
	var tBody = matrixTable.tBodies[0];
	var objectiveFunction = document.getElementById("objectiveFunction");
	
	// remove the last row (= the objective function)
	tBody.removeChild(objectiveFunction);
	
	// insert a new row to the table body
	var matrixRow = matrixTable.tBodies[0].insertRow();
	// set the id
	matrixRow.id = "constraint_" + numb;
	// create and set the class
	var att = document.createAttribute("class");
	att.value = "constraint";
	matrixRow.setAttributeNode(att);

	// create the line heading
	var lineHeading = matrixRow.insertCell();
	lineHeading.innerHTML = headerMatrixConstraintRow + " " + numb;

	// create and insert the new input elements
	for (var i = 0; i < numbOfVariables; i++) {
		var tempCell = matrixRow.insertCell();
		tempCell.appendChild(createInputElement());
	}
	// create and insert the rhs
	var rightHand = matrixRow.insertCell();
	rightHand.appendChild(createInputElement());

	// insert the objective function again
	var newObjFunc = matrixTable.tBodies[0].insertRow();
	tBody.replaceChild(objectiveFunction, newObjFunc);
}

/**
 * 
 * @returns
 */
function removeConstraint() {

	// get the row collection of all constraints
	var constraintRows = document.getElementsByClassName("constraint");
	// get the parent of the constraintRows (the tbody element)
	// and remove the last element
	constraintRows[0].parentNode.removeChild(constraintRows
			.item(constraintRows.length - 1));
}

/**
 * 
 * adds a new variable to the matrix and the bounds table
 * 
 * @returns
 */
function addVariable() {

	// matrix header
	var headerRow = document.getElementById("matrixHeader");
	headerRow.deleteCell(-1);

	var cell = headerRow.insertCell();
	cell.innerHTML = "x<sub>" + numbOfVariables + "</sub>";

	headerRow.insertCell().innerHTML = "b";

	// objective function
	var objectiveFunctionRow = document.getElementById("objectiveFunction");
	objectiveFunctionRow.deleteCell(-1);

	var cell = objectiveFunctionRow.insertCell();
	cell.appendChild(createInputElement());

	var rightHand = objectiveFunctionRow.insertCell();
	rightHand.appendChild(createInputElement());

	// extend constraints row
	var constraintRows = document.getElementsByClassName("constraint");
	for (var i = 0; i < constraintRows.length; i++) {

		// remove the right hand side
		constraintRows[i].deleteCell(-1);

		// add the cell for the new variable
		var newCell = constraintRows[i].insertCell();
		newCell.appendChild(createInputElement());

		// add the right hand side
		var rightHand = constraintRows[i].insertCell();
		rightHand.appendChild(createInputElement());
	}

}

/**
 * 
 * remove a single variable (with saving the value of the righthandside)
 * 
 * @returns
 */
function removeVariable() {
	// tablaeu header
	var headerRow = document.getElementById("matrixHeader");
	headerRow.deleteCell(-1); // one time for the "right hand side"
	headerRow.deleteCell(-1); // one time for the deleted variable

	headerRow.insertCell().innerHTML = "b";

	// objective function
	var objectiveFunctionRow = document.getElementById("objectiveFunction");
	objectiveFunctionRow.deleteCell(-1);
	objectiveFunctionRow.deleteCell(-1);

	var rightHand = objectiveFunctionRow.insertCell();
	rightHand.appendChild(createInputElement());

	// constraints
	var constraintRows = document.getElementsByClassName("constraint");
	for (var i = 0; i < constraintRows.length; i++) {

		// remove the right hand side
		var valueOfRightHandSide = constraintRows[i].lastChild.lastChild.value;
		constraintRows[i].deleteCell(-1);

		// remove the removed variable ;)
		constraintRows[i].deleteCell(-1);

		// add the right hand side
		var rightHand = constraintRows[i].insertCell();
		rightHand.appendChild(createInputElement(valueOfRightHandSide));
	}
}