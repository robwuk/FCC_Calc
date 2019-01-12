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

      if (isOperator(value1)) { //if first character is + or - then we need to operate that on 0
        value2 = operator;
        operator = value1;
        value1 = 0;
      }

      value1 =  getResult(parseFloat(value1), operator, parseFloat(value2));

      for (let i = 3; i< allActions.length; i++) {
        switch (isOperator(allActions[i])) {
          case false:
            operator = allActions[i-1];
            value2 = allActions[i];
            value1 = getResult(parseFloat(value1), operator, parseFloat(value2));
            break;
          case true:
            if (!isOperator(allActions[i+1])) {
              operator = allActions[i];
              console.log(operator);
              i++;
              value2 = allActions[i];
              console.log(value2);
              value1 = getResult(parseFloat(value1), operator, parseFloat(value2));
            }
            break;
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
    console.log(value);
    switch (value) {
      case "+": case "-": case "/": case "*":
        if (equals) { //respond if the last action was the = sign//
          console.log("here " + equals);
          allActions.length = 0;
          allActions.push(lastAction);
          lastAction = value;
          allActions.push(lastAction);
        } else if (allActions.length === 0) { //prevent first character of an equation being * or ? => not mathematically correct//
          if (value === "+" || value === "-") {
            allActions.push(value);
            lastAction = value;
          }
        } else if (isOperator(allActions[allActions.length-1])){
          allActions[allActions.length-1] = value;
          lastAction = value;
        } else {
          allActions.push(value);
          lastAction = value;
        }
        equals = false;
        decimal = false;
        break;
      case "=":
        equals = true;
        console.log(equals);
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
