let allButtonsClick = document.querySelectorAll(".calc button");
let display1 = document.querySelector(".display");
var current = "";
let active = document.querySelector(".active");

for (var i = 0; i < allButtonsClick.length; i++) {
    allButtonsClick[i].addEventListener("click", function () {
        display(this.textContent);
        keyPress(this.textContent);
    });
}

document.addEventListener("keydown",function (e){
    if(e.key === "Backspace"){display(e.key);keyPress(e.key);}
    else if(e.key === "Enter"){display("=");keyPress(e.key);}
    else if(!isNaN(e.key) || isOperator(e.key) || e.key==="."){display(e.key);keyPress(e.key);}
})

function display(value) {
    if (value === "Clear") {
        display1.textContent = "0";
        current = "";
        clearActiveClass();
    } else if (value === "=") {
        try {
            display1.textContent = eval(current);
            current = eval(current).toString();
        } catch {
            display1.textContent = "ERROR";
            current = "";
        }
        clearActiveClass();
    } else if (isOperator(value)) {
        if (!isOperator(current.slice(-1))) {
            current += value;
            display1.textContent = current;
            setActiveClass(value);
        } 
        else{
            current = current.slice(0,-1) + value;
            clearActiveClass();
            display1.textContent = current;
            setActiveClass(value);
        }
    } else if(value === "Backspace" || value === "Del"){
        clearActiveClass();
        current = current.slice(0,-1);
        if(current === "") display1.textContent = "0";
        else {
        display1.textContent = current;}
    }else if(value === "."){
        if(isOperator(current.slice(-1)) || current.slice(-1) === "."){
            display1.textContent = current;
        }else{
            current += value;
            display1.textContent = current;
        }
    }
    else {
        current += value;
        display1.textContent = current;
        clearActiveClass();
    }
}

function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

function setActiveClass(button) {
    clearActiveClass();
    if(button === "+"){button = "add";}
    else if(button === "-"){button = "sub";}
    else if(button === "*"){button = "mul";}
    else if(button === "/"){button = "div";}
    document.querySelector("."+button).classList.add("active");
}

function clearActiveClass() {
    for (var i = 0; i < allButtonsClick.length; i++) {
        allButtonsClick[i].classList.remove("active");
    }
}

function keyPress(key){
    if(key==="="){var active = document.querySelector("eq");}
    else if(key === "+"){var active = document.querySelector("add");}
    else if(key === "-"){var active = document.querySelector("sub");}
    else if(key === "*"){var active = document.querySelector("mul");}
    else if(key === "/"){var active = document.querySelector(".div");}
    else{var active = document.querySelector(".a"+key);}
    active.classList.add("pressed");
    setTimeout(function () {
        active.classList.remove("pressed");
    },100);
}