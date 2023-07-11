const numberSelector = document.querySelector('#selector');
const display = document.querySelector('#display');
const genBtn = document.querySelector('#generateButton');



genBtn.addEventListener('click', function() {
    numberValue = parseInt(numberSelector.value);
    display.innerHTML = createPassword(numberValue);
})



function createPassword(value){
    let result = '';
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>,.?/#@:";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "<>,.?/#@:"
    let passwordLength = characters.length;
    for(var i=0; i < value ; i++){
        result += characters.charAt(Math.floor(Math.random() * passwordLength));
    }
    return result;
}