//HTML Elements
const  country=document.querySelectorAll(".country select")
const swaps = document.querySelector('.country .swap');
// const currencyOne=document.getElementById()

for(let i=0;i<country.length;i++){
    for(currencyCode in countryList){
        let selected = i == 0 ? currencyCode == "USD" ? "selected" : "" : currencyCode == "INR" ? "selected" : "";
        let optionTag=`<option value="${currencyCode}"${selected}>${currencyCode}</option>`;
        country[i].insertAdjacentHTML("beforeend",optionTag);
    }
    country[i].addEventListener("change",e=>{
        loadFlag(e.target);
    });
}



const currencyEl_one = document.getElementById('currency-one'); 
const amountEl_one = document.getElementById('amount-one')
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate'); //to display the basic rate of 1

// Fetch exchange rates and update the DOM
function calculate () {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    // console.log(currency_one, currency_two);

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            const rate = data.rates[currency_two];
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2) //???
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`; //displaying the basic rate of 1
        })
}


function loadFlag(element){
    for(flag in countryList){
        if(flag== element.value){
            let imgTag=element.parentElement.querySelector("img");
            imgTag.src=`https://flagcdn.com/48x36/${countryList[flag].toLowerCase()}.png`;
        }
    }
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swaps.addEventListener('click', () => { //swapping the function
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    loadFlag(currencyEl_one);
    loadFlag(currencyEl_two);
    calculate();
});

calculate();