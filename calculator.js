const operator=document.querySelectorAll(".operators");
operator.forEach((button)=>{
    button.addEventListener('click', takeInput);
});

const numpad=document.querySelectorAll(".numbers");
numpad.forEach((button)=>{
    button.addEventListener('click', displayNumber);
});

const displayField=document.getElementById("display");

const resetButton=document.getElementById("reset");
resetButton.addEventListener('click', resetCalcTotal);

const clearDisplay=document.getElementById("clearDisp");
clearDisplay.addEventListener('click', ()=>{
    displayField.textContent='';
    if(periodCheck===true) periodCheck=false;
});

const backspace=document.getElementById("backspace");
backspace.addEventListener('click', bksp);

let math=[];
let terminator=false, resultCheck=false, operatorCheck=false, periodCheck=false;

function bksp(){    //Backspace
    let oldDisplay=displayField.textContent;
    if(oldDisplay.charAt(0)==='C') displayField.textContent='';
    else if(oldDisplay.length>1) displayField.textContent=oldDisplay.slice(0, oldDisplay.length-1);
    else if(oldDisplay.length===1) displayField.textContent=''
}

function displayNumber(e){  //Displays the number that is clicked
    if(terminator===true){
        resetCalc();
        terminator=false;
    }

    if(resultCheck===true){
        displayField.textContent='';
        resultCheck=false;
    }
    if(operatorCheck===true) operatorCheck=false;

    if(e.target.id==="period"){ //Correctly displays the dot and disables it after the first insertion in display
        if(periodCheck===false){
            displayField.textContent+=".";
            periodCheck=true;
        }
        return;
    }
    displayField.textContent+=e.target.id;
}

function takeInput(e){  //When an operator is clicked, it takes the input and the operator
    if(periodCheck===true) periodCheck=false;
    if(terminator===true){     //Allows user to continue operating with the result, cleaning all the rest...
        let swapDisp=displayField.textContent;
        //console.log("resetfunc call");
        if(swapDisp.charAt(0)==='C'){   //...If a valid result is displayed
            resetCalcTotal();
            return;
        }
        resetCalc();
        terminator=false;
        math.push(swapDisp);
        math.push(e.target.id);
        displayField.textContent='';
        return;
    }

    if(math.length===0){    //First operand check
        /*math.push(displayField.textContent);
        math.push(e.target.id);*/
        pushElement(e);
        operatorCheck=true;
        displayField.textContent='';
        return;
    }

    if(operatorCheck===true){  //Check for double operator insertion
        //console.log("double operator check");
        math[math.length-1]=e.target.id;
        return;
    }

    /*math.push(displayField.textContent);
    math.push(e.target.id);*/
    pushElement(e);
    operatorCheck=true;
    displayField.textContent='';

    let switchId=math.length;

    if(math[switchId-1]==='percentage'){
        let tempPercentage=(parseFloat(math[switchId-4])/100)*parseFloat(math[switchId-2]);
        console.log("temp percentage: "+tempPercentage);
        math[switchId-2]=tempPercentage;
        terminator=true;
    }
    computeOperation(switchId);

    resultCheck=true;
    
    if(math[switchId-1]==='operate')
        terminator=true;
}

function computeOperation(switchId){
    switch(math[switchId-3]){
        case 'add':
            displayField.textContent=parseFloat(math[switchId-4])+parseFloat(math[switchId-2]);
            math[switchId-2]=displayField.textContent;
            break;
        case 'subtract':
            displayField.textContent=parseFloat(math[switchId-4])-parseFloat(math[switchId-2]);
            math[switchId-2]=displayField.textContent;
            break;
        case 'multiply':
            displayField.textContent=parseFloat(math[switchId-4])*parseFloat(math[switchId-2]);
            math[switchId-2]=displayField.textContent;
            break;
        case 'divide':
            if(math[switchId-2]==0){
                displayField.textContent="Can't divide by 0!";
                terminator=true;
                break;
            }
            displayField.textContent=parseFloat(math[switchId-4])/parseFloat(math[switchId-2]);
            math[switchId-2]=displayField.textContent;
            break;
    }
}

function pushElement(e){
    math.push(displayField.textContent);
    math.push(e.target.id);
}

function resetCalcTotal(){   //Completely resets the calculator
    resetCalc();
    terminator=false;
    resultCheck=false;
    operatorCheck=false;
    periodCheck=false;
}

function resetCalc(){   //Resets only the operations history
    displayField.textContent='';
    math=[];
    return;
}