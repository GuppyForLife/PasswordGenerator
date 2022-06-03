window.onload = init;

function init() {
    //Declare all elements needed
    const result = document.getElementById('result');
    const lengthElement = document.getElementById('length');
    const upperCaseElement = document.getElementById('uppercase');
    const lowerCaseElement = document.getElementById('lowercase');
    const numbersElement = document.getElementById('numbers');
    const symbolsElement = document.getElementById('symbols')
    const generateButton = document.getElementById('generate');
    const copyButtonElement = document.getElementById('clipboard');

    //Declare necessary variable for random generation
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = '!@#$%^&*()_'

    //Add event listeners for changes and clicks
   lengthElement.addEventListener('change', updateLengthValue);
   function updateLengthValue(e) {
       lengthElement.value = e.target.value;
   }
   upperCaseElement.addEventListener('change', updateUpperCaseBool);
   function updateUpperCaseBool(e) {
       upperCaseElement.checked ? false : true;
   }
   lowerCaseElement.addEventListener('change', updateLowerCaseBool);
   function updateLowerCaseBool(e) {
       lowerCaseElement.checked ? false : true;
   }
   numbersElement.addEventListener('change', updateNumbersBool);
   function updateNumbersBool(e) {
       numbersElement.checked ? false : true;
   }
   symbolsElement.addEventListener('change', updateSymbolsBool);
   function updateSymbolsBool(e) {
       symbolsElement.checked ? false : true;
   }
    generateButton.addEventListener('click', () => {
        generatePassword(lengthElement, upperCaseElement, lowerCaseElement, numbersElement, symbolsElement);
    });
    copyButtonElement.addEventListener('click', () => {
        copyPassword();
    })

    //Generate random characters using above variables and Math.random
   function getRandomUppercase() {
       const randomNum = Math.floor(Math.random() * (26 - 1 + 1))
       return alphabet[randomNum];
    }
   function getRandomLowercase() {
        const randomNum = Math.floor(Math.random() * (26 - 1 + 1))
        return alphabet[randomNum].toLowerCase();
    }
    function getRandomNumber() {
        const randomNum = Math.floor(Math.random() * (10 - 1 + 1))
        return randomNum.toString();
    }
    function getRandomSymbol() {
        const randomNum = Math.floor(Math.random() * (10 - 1 + 1))
        return symbols[randomNum];
    }

    //Take in bools and assign them to easy to use variables
    function generatePassword(lengthElement, upperCaseElement, lowerCaseElement, numbersElement, symbolsElement) {
        const length = lengthElement.value;
        const uppercase = upperCaseElement.checked;
        const lowercase = lowerCaseElement.checked;
        const numbers = numbersElement.checked;
        const symbols = symbolsElement.checked;
        let string = '';
        let password = '';
        //Loop to generate enough characters if checked true and for desired length
        for(let i = 0; string.length < length; i++){
            if(uppercase){
                string += getRandomUppercase();
            }
            if(lowercase){
                string += getRandomLowercase();
            }
            if(numbers){
                string += getRandomNumber();
            }
            if(symbols){
                string += getRandomSymbol();
            }
            //If no boxes are checked, alert to check at least one
            else if(!uppercase && !lowercase && !numbers && !symbols){
                alert("Please select at least one box.")
                break;
            }
        }

        //Once string is generated, shuffle the word to create a truly random password
        string = string.split('');
        while(string.length > 0){
            password += string.splice(string.length * Math.random() << 0,1);
        }
        //update the result in the correct result box
        return result.innerHTML = password;
    }
    
    //Copy pass word function. Create new textarea to store value, use document.exe to copy to clipboard. once copied, remove temp textarea
    function copyPassword(){
        const text = document.createElement('textarea');
        const pword = result.innerHTML;
        text.value = pword;
        document.body.appendChild(text);
        text.select();
        document.execCommand('copy');
        text.remove();

        alert(`Your password was copied to your clipboard.`)
    }

}