const operator=document.querySelectorAll(".operators");
operator.forEach((button)=>{
    button.addEventListener('click', takeInput);
});

const evaluator=document.querySelector("#operate");
evaluator.addEventListener('click', evaluate);

let math=[2], action='', result;
const inputField=document.getElementById("numInput");
inputField.value='';

function takeInput(e){
    math[0]=parseInt(inputField.value, 10);
    inputField.value='';
    console.log("takeinput id: "+e.target.id);
    switch(e.target.id){
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
    }
}

function evaluate(){
    math[1]=parseInt(inputField.value, 10);
    inputField.value='';
    switch(action){
        case 'a':
            add();
            break;
        case 's':
            subtract();
            break;
        case 'm':
            multiply();
            break;
        case 'd':
            divide();
            break;
    }
}

function add(){
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