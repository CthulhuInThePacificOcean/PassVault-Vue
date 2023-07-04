const numberSelector = document.getElementById('selector');
const display = document.getElementById('display');



numberSelector.onchange = function() {
    numberValue = parseInt(numberSelector.value);
    display.innerHTML = createPassword(numberValue);
}



function createPassword(value){
    let result = '';
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>,.?/#@:";
    let passwordLength = characters.length;
    for(var i=0; i < value ; i++){
        result += characters.charAt(Math.floor(Math.random() * passwordLength));
    }
    return result;
}