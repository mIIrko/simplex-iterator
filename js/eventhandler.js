/**
 * 
 * validates the user input for creating new variables (no value smaller than 1
 * allowed, reset to the last positive number) and triggers the creation of the
 * new variable columns
 * 
 * 
 * @param event :
 *            deliverd from the eventhandler
 * @returns
 */
function processUserInputVariables(event) {
	var timeoutVariablesInput = null;
	clearTimeout(timeoutVariablesInput);
	timeoutVariablesInput = setTimeout(function() {
		// get diff from old value / new value
		var newValue = document.getElementById("numbOfVariables").value;

		if (newValue === "") {
			// nothing to do, waiting for user input
			return;
		} else if (newValue < 1) {
			// the input is negative, set the old
			// value
			document.getElementById("numbOfVariables").value = numbOfVariables;
			return;
		} else {

			var diffVariables = newValue - numbOfVariables;

			if (diffVariables > 0) {
				for (var i = 0; i < diffVariables; i++) {
					numbOfVariables++;
					addVariable();
				}
			} else if (diffVariables < 0) {
				for (var i = diffVariables; i < 0; i++) {
					if (numbOfVariables < 2) {
						break;
					}
					numbOfVariables--;
					removeVariable();
				}
			}
		}

	}, 500);

}
/**
 * 
 * validates the user input for the constrain input field. Minimum number of
 * constraints is 1. Triggers the creation of the constraint rows
 * 
 * @param event
 * @returns
 */
function processUserInputConstraints(event) {
	var timeoutConstraintInput = null;
	clearTimeout(timeoutConstraintInput);
	timeoutConstraintInput = setTimeout(
			function() {

				var newValue = document.getElementById("numbOfConstraints").value;

				// if the value from the user is lower than
				// 1, insert the previous positive
				if (newValue < 2) {
					document.getElementById("numbOfConstraints").value = numbOfConstraints;
					return;
				} 

				var diffVariables = newValue - numbOfConstraints;
				if (diffVariables > 0) {
					for (var i = 0; i < diffVariables; i++) {
						numbOfConstraints++;
						addConstraint(numbOfConstraints);
					}
				} else if (diffVariables < 0) {
					for (var i = diffVariables; i != 0; i++) {
						if (numbOfConstraints < 2) {
							break;
						}
						numbOfConstraints--;
						removeConstraint();
					}
				}

			}, 500);
}



/**
 * 
 * @returns
 */
function addEventHandler() {

	// disable the scrolling on the number inputs
	document.getElementById("numbOfVariables").addEventListener("mousewheel",
			function(event) {
				event.preventDefault();
			});

	document.getElementById("numbOfConstraints").addEventListener("mousewheel",
			function(event) {
				event.preventDefault();
			});

	document
			.getElementById("incrementNumberOfVariables")
			.addEventListener(
					"click",
					function() {
						numbOfVariables++;
						document.getElementById("numbOfVariables").value = numbOfVariables;
						addVariable();
					});
	document
			.getElementById("decrementNumberOfVariables")
			.addEventListener(
					"click",
					function() {
						if (numbOfVariables > 4) {
							numbOfVariables--;
							document.getElementById("numbOfVariables").value = numbOfVariables;
							removeVariable();
						}
					});

	document
			.getElementById("incrementNumberOfConstraints")
			.addEventListener(
					"click",
					function() {
						numbOfConstraints++;
						document.getElementById("numbOfConstraints").value = numbOfConstraints;
						addConstraint(numbOfConstraints);
					});
	document
			.getElementById("decrementNumberOfConstraints")
			.addEventListener(
					"click",
					function() {
						if (numbOfConstraints > 1) {
							numbOfConstraints--;
							document.getElementById("numbOfConstraints").value = numbOfConstraints;
							removeConstraint();
						}
					});

	document.getElementById("numbOfVariables").addEventListener("keyup",
			processUserInputVariables);

	document.getElementById("numbOfConstraints").addEventListener("keyup",
			processUserInputConstraints);

	// add the event listener for the reset button
	document.getElementById("reset").addEventListener("click", reset);
	
	// add the event listener for the pivotize button
	document.getElementById("pivotize").addEventListener("click", defineAndHighlightPivotElement);
	
	// add the event listener for the loadDefaultExample button
	document.getElementById("loadExample").addEventListener("click", setDefaultExampleToTable);
	
	// add the event listener for the iterate button
	document.getElementById("iterate").addEventListener("click", iterate);
	
	// add the event listener for the solve button
	//document.getElementById("solve").addEventListener("click", collectTaskData);

}