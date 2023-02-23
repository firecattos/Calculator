const operator=document.querySelectorAll(".operators");
operator.forEach((button)=>{
    button.addEventListener('click', ()=>{
        takeInput(button.id);
    });
});

const numpad=document.querySelectorAll(".numbers");
numpad.forEach((button)=>{
    button.addEventListener('click', ()=>{
        displayNumber(button.id);
    });
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

document.addEventListener('keydown', keyDisplay);

let math=[];
let terminator=false, resultCheck=false, operatorCheck=false, periodCheck=false;

function bksp(){    //Backspace
    let oldDisplay=displayField.textContent;
    if(oldDisplay.charAt(0)==='C') displayField.textContent='';
    else if(oldDisplay.length>1) displayField.textContent=oldDisplay.slice(0, oldDisplay.length-1);
    else if(oldDisplay.length===1) displayField.textContent=''
}

function displayNumber(num){  //Displays the number that is clicked
    if(terminator===true){
        resetCalc();
        terminator=false;
    }

    if(resultCheck===true){
        displayField.textContent='';
        resultCheck=false;
    }
    if(operatorCheck===true) operatorCheck=false;

    if(num==="period"){ //Correctly displays the dot and disables it after the first insertion in display
        if(periodCheck===false){
            displayField.textContent+=".";
            periodCheck=true;
        }
        return;
    }
    displayField.textContent+=num;
}

function takeInput(operatorId){  //When an operator is clicked, it takes the number and the operator
    if(periodCheck===true) periodCheck=false;
    if(terminator===true){     //Allows user to continue operating with the result, cleaning all the rest...
        let swapDisp=displayField.textContent;
        if(swapDisp.charAt(0)==='C'){   //...If a valid result is displayed
            resetCalcTotal();
            return;
        }
        resetCalc();
        terminator=false;
        math.push(swapDisp);
        math.push(operatorId);
        displayField.textContent='';
        return;
    }

    if(math.length===0){    //First operand check
        if(displayField.textContent===''){      //Empty display check, assume the value '0' if empty;
            math.push('0');
            math.push(operatorId);
            return;
        }
        pushElement(operatorId);
        operatorCheck=true;
        displayField.textContent='';
        return;
    }

    if(operatorCheck===true){  //Check for double operator insertion and eventually replaces it with the new one
        math[math.length-1]=operatorId;
        return;
    }

    pushElement(operatorId);
    operatorCheck=true;
    displayField.textContent='';
    let switchId=math.length;

    if(math[switchId-1]==='percentage'){
        let percentageValue=(parseFloat(math[switchId-4])/100)*parseFloat(math[switchId-2]);
//        console.log("Percentage value: "+percentageValue);
        math[switchId-2]=percentageValue;
        terminator=true;
    }

    computeOperation(switchId);
    resultCheck=true;
    if(math[switchId-1]==='operate')
        terminator=true;
}

function computeOperation(switchId){    //Actually does the math required other than the percentage calculation
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

function pushElement(operatorId){   //Puts number and operator in the operands array
    math.push(displayField.textContent);
    math.push(operatorId);
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

function keyDisplay(e){     //Takes eventual input from the keyboard
    if(e.key>=0 && e.key<=9){
        displayNumber(e.key);
        return;
    }
    switch(e.key){
        case '.':
            displayNumber("period");
            break;
        //Operators
        case '+':
            takeInput("add");
            break;
        case '-':
            takeInput("subtract");
            break;
        case '*':
            takeInput("multiply");
            break;
        case '/':
            e.preventDefault();     //Prevents the "Quick Find" box from being called when running on Firefox
            takeInput("divide");
            break;
        case '%':
            takeInput("percentage");
            break;
        case 'Enter':
            takeInput("operate");
            break;
        //Functions
        case 'Backspace':
            bksp();
            break;
        case 'Delete':
            resetCalcTotal();
            break;
    }
}