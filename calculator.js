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

const upperDisp=document.getElementById("upperRow");
const lowerDisp=document.getElementById("lowerRow");

const resetButton=document.getElementById("reset");
resetButton.addEventListener('click', resetCalcTotal);

const clearDisplay=document.getElementById("clearDisp");
clearDisplay.addEventListener('click', ()=>{
    lowerDisp.textContent='';
    if(terminator===true) resetCalc();
    if(periodCheck===true) periodCheck=false;
});

const backspace=document.getElementById("backspace");
backspace.addEventListener('click', bksp);

document.addEventListener('keydown', keyDisplay);

let math=[];
let terminator=false, resultCheck=false, operatorCheck=false, periodCheck=false;

function bksp(){    //Backspace
    let oldDisplay=lowerDisp.textContent;
    if(oldDisplay.charAt(0)==='C') resetCalc();
    else if(terminator===true) return;
    else if(oldDisplay.length>1) lowerDisp.textContent=oldDisplay.slice(0, oldDisplay.length-1);
    else if(oldDisplay.length===1) lowerDisp.textContent=''
}

function displayNumber(num){  //Displays the number that is clicked
    if(terminator===true){
        resetCalc();
        terminator=false;
    }

    if(resultCheck===true){
        lowerDisp.textContent='';
        resultCheck=false;
    }
    if(operatorCheck===true) operatorCheck=false;

    if(num==="period"){ //Correctly displays the dot and disables it after the first insertion in display
        if(periodCheck===false){
            lowerDisp.textContent+=".";
            periodCheck=true;
        }
        return;
    }
    lowerDisp.textContent+=num;
}

function takeInput(operatorId){  //When an operator is clicked, it takes the number and the operator
    if(periodCheck===true) periodCheck=false;
    if(terminator===true){     //Allows user to continue operating with the result, cleaning all the rest...
        if(operatorId==="operate") return;
        let lowerSwap=lowerDisp.textContent;
        if(lowerSwap.charAt(0)==='C'){   //...If a valid result is displayed
            resetCalcTotal();
            return;
        }
        let upperSwap=upperDisp.textContent;
        resetCalc();
        terminator=false;
        lastOperation(upperSwap, lowerSwap, operatorId);
        return;
    }

    if(math.length===0){    //First operand check
        if(operatorId==="operate") return;
        if(lowerDisp.textContent===''){      //Empty display check, assume the value '0' if empty;
            math.push('0');
            math.push(operatorId);
            upperDisp.textContent+="0+";
            return;
        }
        pushElement(operatorId);
        operatorCheck=true;
        lowerDisp.textContent='';
        return;
    }

    if(operatorCheck===true){   //Check for double operator insertion and eventually replaces it
                                //with the new one
        math[math.length-1]=operatorId;
        return;
    }

    pushElement(operatorId);
    operatorCheck=true;
    lowerDisp.textContent='';
    let switchId=math.length;

    if(math[switchId-1]==='percentage'){    //Percentage calculation
        let percentageValue=(parseFloat(math[switchId-4])/100)*parseFloat(math[switchId-2]);
        upperDisp.textContent+=" ("+percentageValue+")=";
        math[switchId-2]=percentageValue;
        computeOperation(switchId);
        resultCheck=true;
        terminator=true;
        return;
    }

    computeOperation(switchId);
    resultCheck=true;
    if(math[switchId-1]==='operate')
        terminator=true;
}

function computeOperation(switchId){    //Actually does the math required other than the
                                        //percentage calculation
    switch(math[switchId-3]){
        case 'add':
            lowerDisp.textContent=parseFloat(math[switchId-4])+parseFloat(math[switchId-2]);
            math[switchId-2]=lowerDisp.textContent;
            break;
        case 'subtract':
            lowerDisp.textContent=parseFloat(math[switchId-4])-parseFloat(math[switchId-2]);
            math[switchId-2]=lowerDisp.textContent;
            break;
        case 'multiply':
            lowerDisp.textContent=parseFloat(math[switchId-4])*parseFloat(math[switchId-2]);
            math[switchId-2]=lowerDisp.textContent;
            break;
        case 'divide':
            if(math[switchId-2]==0){
                lowerDisp.textContent="Can't divide by 0!";
                terminator=true;
                break;
            }
            lowerDisp.textContent=parseFloat(math[switchId-4])/parseFloat(math[switchId-2]);
            math[switchId-2]=lowerDisp.textContent;
            break;
    }
}

function pushElement(operatorId){   //Puts number and operator in the operands array and populate the
                                    //upper display
    math.push(lowerDisp.textContent);
    math.push(operatorId);
    upperDisp.textContent+=lowerDisp.textContent+operatorSymbol(operatorId);
}

function operatorSymbol(operatorId){
    switch(operatorId){
        case "add":
            return "+";
        case "subtract":
            return "-";
        case "multiply":
            return "*";
        case "divide":
            return "/";
        case "percentage":
            return "%";
        case "operate":
            return "=";
    }

}

function resetCalcTotal(){   //Completely resets the calculator
    resetCalc();
    terminator=false;
    resultCheck=false;
    operatorCheck=false;
    periodCheck=false;
}

function resetCalc(){   //Resets only the operations history
    resetDisplays();
    math=[];
}

function resetDisplays(){   //Resets both displays
    upperDisp.textContent='';
    lowerDisp.textContent='';
}

function lastOperation(upperSwap, lowerSwap, operatorId){
    math.push(lowerSwap);
    math.push(operatorId);
    upperDisp.textContent+=upperSwap+lowerSwap+operatorSymbol(operatorId);
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