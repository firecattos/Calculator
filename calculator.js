const operator=document.querySelectorAll(".operators");
operator.forEach((button)=>{
    button.addEventListener('click', takeInput);
});

const numpad=document.querySelectorAll(".numbers");
numpad.forEach((button)=>{
    button.addEventListener('click', displayNumber);
});

const displayField=document.getElementById("display");
/*
const evaluator=document.querySelector("#operate");
evaluator.addEventListener('click', evaluate);
*/
const resetButton=document.getElementById("reset");
resetButton.addEventListener('click', resetCalc);

const clearDisplay=document.getElementById("clearDisp");
clearDisplay.addEventListener('click', ()=>{
    displayField.textContent='';
});

const backspace=document.getElementById("backspace");
backspace.addEventListener('click', bksp);

let math=[], oldDisplay='';
let resultCheck=0, terminator=0, operatorCheck=0;

function bksp(){    //Backspace
    oldDisplay=displayField.textContent;
    if(oldDisplay.charAt(0)==='C') displayField.textContent='';
    else if(oldDisplay.length>1) displayField.textContent=oldDisplay.slice(0, oldDisplay.length-1);
    else if(oldDisplay.length===1) displayField.textContent=''
}

function displayNumber(e){  //Displays the number that is clicked
    if(terminator===1){
        console.log("resetfunc call");
        resetCalc();
        terminator=0;
    }

    if(resultCheck===1){
        displayField.textContent='';
        resultCheck=0;
    }
    if(operatorCheck===1) operatorCheck=0;

    if(e.target.id==="period") displayField.textContent+=".";
    else displayField.textContent+=e.target.id;
}

function takeInput(e){  //When an operator is clicked, it takes the input and the operator
    if(terminator===1){     //Allows user to continue operating with the result, cleaning all the rest
        let swapDisp=displayField.textContent;
        console.log("resetfunc call");
        resetCalc();
        terminator=0;
        math.push(swapDisp);
        math.push(e.target.id);
        displayField.textContent='';
        return;
    }

    if(math.length===0){    //First operand check
        math.push(displayField.textContent);
        math.push(e.target.id);
        operatorCheck=1;
        displayField.textContent='';
        return;
    }

    if(operatorCheck===1){  //Check for double operator insertion
        console.log("test double operator check");
        math[math.length-1]=e.target.id;
        return;
    }

    math.push(displayField.textContent);
    math.push(e.target.id);
    operatorCheck=1;
    displayField.textContent='';

    //fix floating point operations

    let switchId=math.length;
    //console.log("switchId: "+switchId);
    if(switchId>2){
    switch(math[switchId-3]){
            case 'add':
                displayField.textContent=parseInt(math[switchId-4])+parseInt(math[switchId-2]);
                math[switchId-2]=displayField.textContent;
                break;
            case 'subtract':
                displayField.textContent=parseInt(math[switchId-4])-parseInt(math[switchId-2]);
                math[switchId-2]=displayField.textContent;
                break;
            case 'multiply':
                displayField.textContent=parseInt(math[switchId-4])*parseInt(math[switchId-2]);
                math[switchId-2]=displayField.textContent;
                break;
            case 'divide':
                if(math[switchId-2]===0){
                    displayField.textContent="Can't divide by 0!";
                    terminator=1;
                    break;
                }
                displayField.textContent=parseInt(math[switchId-4])/parseInt(math[switchId-2]);
                math[switchId-2]=displayField.textContent;
                break;
           case 'percentage':

                alert("work in progress...");
                break;
        }
    resultCheck=1;
    }
    
    if(math[switchId-1]==='operate')
        terminator=1;
}

function resetCalc(){   //Completely resets the calculator
    console.log("Reset function");
    
    displayField.textContent='';
    math=[];
    return;
}