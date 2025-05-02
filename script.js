document.getElementById('convert-btn').addEventListener('click', function() {
    const conversionType = document.getElementById('conversionType').value;
    const inputValue = document.getElementById('number').value.trim(); // Updated to match #number
    const resultElement = document.getElementById('output'); // Updated to match #output
    
    if (!inputValue) {
        resultElement.textContent = "Please enter a valid number";
        return;
    }
    
    try {
        if (conversionType === 'toRoman') {
            const number = parseInt(inputValue);
            if (isNaN(number)) {
                throw new Error("Please enter a valid number");
            }
            if (number < 1) {
                throw new Error("Please enter a number greater than or equal to 1");
            }
            if (number > 3999) {
                throw new Error("Please enter a number less than or equal to 3999");
            }
            resultElement.textContent = decimalToRoman(number);
        } else {
            if (!isValidRoman(inputValue.toUpperCase())) {
                throw new Error("Please enter a valid Roman numeral");
            }
            resultElement.textContent = romanToDecimal(inputValue.toUpperCase());
        }
    } catch (error) {
        resultElement.textContent = error.message;
    }
});

function decimalToRoman(num) {
    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];
    
    let result = '';
    
    for (const numeral of romanNumerals) {
        while (num >= numeral.value) {
            result += numeral.symbol;
            num -= numeral.value;
        }
    }
    
    return result;
}

function romanToDecimal(roman) {
    const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    
    for (let i = 0; i < roman.length; i++) {
        const current = romanMap[roman[i]];
        const next = romanMap[roman[i + 1]];
        
        if (next && current < next) {
            result += next - current;
            i++;
        } else {
            result += current;
        }
    }
    
    return result;
}

function isValidRoman(roman) {
    const romanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    return romanRegex.test(roman);
}