/**
 * @author Mirko Bay, 2017-04-29
 *
 *
 */
var EventHandler = (function () {

  /**
   * validates the user input for creating new variables (no value smaller than 1
   * allowed, reset to the last positive number) and triggers the creation of the
   * new variable columns
   *
   * @param event : Event, delivered from the event handler
   * @returns     : void
   */
  function processUserInputVariables(event) {
    var timeoutVariablesInput = null;
    clearTimeout(timeoutVariablesInput);
    timeoutVariablesInput = setTimeout(function () {
      // get diff from old value / new value
      var newValue = document.getElementById("numbOfVariables").value;

      if (newValue === "") {
        // nothing to do, waiting for user input
        // return; not needed, because its the end of the case
      } else if (newValue < 1) {
        // the input is negative, set the old
        // value
        document.getElementById("numbOfVariables").value = numbOfVariables;
        // return; not needed, because its the end of the case
      } else {

        var diffVariables = newValue - numbOfVariables;

        if (diffVariables > 0) {
          for (var i = 0; i < diffVariables; i++) {
            numbOfVariables++;
            TableManipulator.addVariable();
          }
        } else if (diffVariables < 0) {
          for (var j = diffVariables; j < 0; j++) {
            if (numbOfVariables < 2) {
              break;
            }
            numbOfVariables--;
            TableManipulator.removeVariable();
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
      function () {

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
            TableManipulator.addConstraint(numbOfConstraints);
          }
        } else if (diffVariables < 0) {
          for (var j = diffVariables; j !== 0; j++) {
            if (numbOfConstraints < 2) {
              break;
            }
            numbOfConstraints--;
            TableManipulator.removeConstraint();
          }
        }

      }, 500);
  }

  /**
   * checks the user input live against the pattern for a rational number so the
   * user can just type following number types: > integer, e.g. "1" > float, e.g.
   * "3/4" > mixed float, e.g. "3,2/4" or "3/4,2" > input with both comma and dot
   *
   * @returns
   */
  function checkUserNumberInput(event) {


    var input = event.target.value;

    // while typing, delete all letters

    // and all symbols except the slash, dot, comma and the minus

    var regex = new RegExp(
      "^([0-9]{1,}((\\.|,)[0-9]{1,}){0,1})(/[0-9]{1,}((\\.|,)[0-9]{1,}){0,1}){0,1}$",
      "g");

    // var pattern = new
    // RegExp("^[0-9]+[(\.|,)[0-9]+]?\/[0-9]+[(\.|,)[0-9]+]?$");

    // if invalid input
    if (input.length === 0) {
      return;
    }

//	if (regex.test(input)) {
//		console.log("passed");
//	} else {
//		// remove the last sign
//		var correctedValue = input.slice(0, input.length - 1);
//		event.target.value = correctedValue;
//	}

    // triggers the native html5 form validation
    var submitButton = document.getElementById("submitButton");
    submitButton.click();
  }

  /**
   *
   * @returns
   */
  function initEventHandler() {

    // disable the scrolling on the number inputs
    document.getElementById("numbOfVariables").addEventListener("mousewheel",
      function (event) {
        event.preventDefault();
      });

    document.getElementById("numbOfConstraints").addEventListener("mousewheel",
      function (event) {
        event.preventDefault();
      });

    document
      .getElementById("incrementNumberOfVariables")
      .addEventListener(
        "click",
        function () {
          numbOfVariables++;
          document.getElementById("numbOfVariables").value = numbOfVariables;
          TableManipulator.addVariable();
        });
    document
      .getElementById("decrementNumberOfVariables")
      .addEventListener(
        "click",
        function () {
          if (numbOfVariables > 4) {
            numbOfVariables--;
            document.getElementById("numbOfVariables").value = numbOfVariables;
            TableManipulator.removeVariable();
          }
        });

    document
      .getElementById("incrementNumberOfConstraints")
      .addEventListener(
        "click",
        function () {
          numbOfConstraints++;
          document.getElementById("numbOfConstraints").value = numbOfConstraints;
          TableManipulator.addConstraint(numbOfConstraints);
        });
    document
      .getElementById("decrementNumberOfConstraints")
      .addEventListener(
        "click",
        function () {
          if (numbOfConstraints > 1) {
            numbOfConstraints--;
            document.getElementById("numbOfConstraints").value = numbOfConstraints;
            TableManipulator.removeConstraint();
          }
        });

    document.getElementById("numbOfVariables").addEventListener("keyup", processUserInputVariables);

    document.getElementById("numbOfConstraints").addEventListener("keyup", processUserInputConstraints);

    // add the event listener for the reset button
    document.getElementById("reset").addEventListener("click", TableManipulator.reset);

    // add the event listener for the pivotize button
    document.getElementById("pivotize").addEventListener("click", defineAndHighlightPivotElement);

    // add the event listener for the loadDefaultExample button
    document.getElementById("loadExample").addEventListener("click", setDefaultExampleToTable);

    // add the event listener for the iterate button
    document.getElementById("iterate").addEventListener("click", Iterator.iterate);

  }

  return {
    initEventHandler: initEventHandler,
    checkUserNumberInput: checkUserNumberInput
  };

})();
