const operator=document.querySelectorAll(".operators");
operator.forEach((button)=>{
    button.addEventListener('click', takeInput);
});

const numpad=document.querySelectorAll(".numbers");
numpad.forEach((button)=>{
    button.addEventListener('click', displayNumber);
})

const displayField=document.getElementById("display");

const evaluator=document.querySelector("#operate");
evaluator.addEventListener('click', evaluate);

const resetButton=document.getElementById("reset");
resetButton.addEventListener('click', ()=>{
    displayField.textContent='';
    math=[];
});

const clearDisplay=document.getElementById("clearDisp");
clearDisplay.addEventListener('click', ()=>{
    displayField.textContent='';
});

const backspace=document.getElementById("backspace");
backspace.addEventListener('click', charDelete);

function charDelete(){
    oldDisplay=displayField.textContent;
    //console.log("oldDisplay: "+oldDisplay);
        if(oldDisplay.length>1) displayField.textContent=oldDisplay.slice(0, oldDisplay.length-1);
        else if(oldDisplay.length===1) displayField.textContent=''
}

let math=[3];

let oldDisplay='';
/*const inputField=document.getElementById("numInput");
inputField.value='';*/

function displayNumber(e){
    displayField.textContent+=e.target.id;
}

function takeInput(e){
    /*math[0]=parseInt(inputField.value, 10);
    inputField.value='';
    console.log("takeinput id: "+e.target.id);*/
    math[0]=parseInt(displayField.textContent, 10);
    displayField.textContent='';
    math[1]=e.target.id;
    /*console.log("displaying math array...");
    console.log(math);*/
    /*switch(e.target.id){
        case 'add':
            action='a';
            break;
        case 'subtract':
            action='s';
            break;
        case 'multiply':
            action='m';
            break;
        case 'divide':
            action='d';
            break;
    }*/
}

function evaluate(){
    math[2]=parseInt(displayField.textContent, 10);
    //inputField.value='';
    switch(math[1]){
        case 'add':
            displayField.textContent=math[0]+math[2];
            break;
        case 'subtract':
            displayField.textContent=math[0]-math[2];
            break;
        case 'multiply':
            displayField.textContent=math[0]*math[2];
            break;
        case 'divide':
            if(math[2]===0){
                displayField.textContent="Can't divide by 0!";
                break;
            }
            displayField.textContent=math[0]/math[2];
            break;
    }
}

/*function add(){
    result=math[0] + math[1];
    inputField.value=result;
}

function subtract(){
    result=math[0] - math[1];
    inputField.value=result;
}

function multiply(){
    result=math[0] * math[1];
    inputField.value=result;
}

function divide(){
    result=math[0] / math[1];
    inputField.value=result;
}

/*let num1, num2;

function calculate(e){
    num1=document.getElementById("numInput").value;
    document.getElementById("numInput").value='';
    switch(e.target.id){
        case add:
            add(num1);
            break;
        case subtract:
            subtract(num1);
            break;
        case multiply:
            multiply(num1);
            break;
        case divide:
            divide(num1);
            break;
    }
}
*/