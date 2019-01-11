  var lastAction;
  var allActions = new Array();

  function clearData() {
    lastAction = 0;
    allActions.length = 0;

    updateTotal();
    updateRunningTotal();
  }

  function updateTotal(){
    document.getElementById("display__total").innerHTML = lastAction;
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

    document.getElementById("display__running").innerHTML = runningTotal
  }


window.onload=clearData();
