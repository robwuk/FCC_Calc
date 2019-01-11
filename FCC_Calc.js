  var lastAction;
  var allActions = new Array();
  var equals = false;
  var decimal = false;

  function clearData() {
    equals = false;
    decimal = false;
    lastAction = "0";
    allActions.length = 0;

    updateTotal();
    updateRunningTotal();
  }

  function updateTotal(){
    document.getElementById("display").innerHTML = lastAction;
  }

  function updateRunningTotal(){
    var runningTotal = "";

    if (allActions.length==0) {
      runningTotal = "0";
    } else {
      for (let i=0; i < allActions.length; i++) {
        runningTotal += allActions[i];
      };
    }

    document.getElementById("display__running").innerHTML = runningTotal;
  }

  function isOperator(value){
    if (value ==="+" || value ==="-" || value ==="/" || value ==="*") {
      return true;
    } else {
      return false;
    }
  }

  function calculateSum(){
    if (allActions.length >= 3) {
      let value1 = allActions[0];
      let operator = allActions[1];
      let value2 = allActions[2];

      value1 =  getResult(parseFloat(value1), operator, parseFloat(value2));

      for (let i = 3; i< allActions.length; i+=2) {
        if (allActions.length - i >= 2) {
          operator = allActions[i];
          value2 = allActions[i+1];
          value1 = getResult(parseFloat(value1), operator, parseFloat(value2));
        }
      }

      lastAction = value1.toString();
      updateTotal();
    }
  }

  function getResult(v1, op, v2){
    switch (op) {
      case "+":
        return v1 + v2;
        break;
      case "*":
        return v1 * v2;
        break;
      case "-":
        return v1 - v2;
        break;
      case "/":
        return v1 / v2;
        break;
    }
  }

  function buttonPress(value){

    switch (value) {
      case "+": case "-": case "/": case "*":
        if (equals) {
          allActions.length = 0;
          allActions.push(lastAction);
        }
        allActions.push(value);
        lastAction = value;
        equals = false;
        decimal = false;
        break;
      case "=":
        equals = true;
        calculateSum();
        decimal = false;
        break;
      case ".":
        equals = false;
        if (!decimal){
          if (isOperator(lastAction)) {
            lastAction="0.";
          } else {
            allActions.pop();
            lastAction = lastAction.concat(value);
          }
          allActions.push(lastAction);
        }
        decimal = true;
        break;
      default:
        if (equals) {
          lastAction = "";
          allActions.length = 0;
        } else if (isOperator(lastAction)) {
          lastAction = "";
        } else if (lastAction =="0"){
          allActions.pop();
          lastAction="";
        } else {
          allActions.pop();
        }
        lastAction = lastAction.concat(value);
        allActions.push(lastAction);
        equals = false;
    }

    updateRunningTotal();
    updateTotal();
  }


window.onload=clearData();
