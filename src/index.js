import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency-exchange';

// Business Logic

async function getCurrency(amount, selectCurr) {
  const response = await CurrencyExchange.getCurrency(amount, selectCurr);
  if (response.documentation) {
    printCurrency(response, amount, selectCurr);
  } else {
    printError(amount, selectCurr);
  }
}

// UI Logic

function printCurrency(apiResponse, amount, currSelect) {

  if (currSelect === "euro"){
    const eurTotal = (apiResponse.conversion_rates.EUR * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD converts to ${eurTotal} ${currSelect}s.`;
  }else if (currSelect === "yen"){
    const jpyTotal = (apiResponse.conversion_rates.JPY * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD converts to ${jpyTotal} ${currSelect}.`;
  }else if (currSelect === "pound"){
    const gbpTotal = (apiResponse.conversion_rates.GBP * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD converts to ${gbpTotal} ${currSelect}s.`;
  }else if (currSelect === "can-dollar"){
    const cadTotal = (apiResponse.conversion_rates.CAD * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD converts to ${cadTotal} ${currSelect}s.`;
  }else if (currSelect === "swiss-franc"){
    const chfTotal = (apiResponse.conversion_rates.CHF * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD converts to ${chfTotal} ${currSelect}s.`;
  }
}

function printError(amount, currSelect){
  document.querySelector(`#showResponse`).innerText = `There was an error accessing the currency converter for ${amount} in ${currSelect}: We were unable to find information on that currency. Please try again.`;
}

function handleForm(event) {
  event.preventDefault();
  const amount = document.querySelector('#currency-amt').value;
  document.querySelector('#currency-amt').value = null;
  const currSelect = document.querySelector('#currency-name').value;
  getCurrency(amount, currSelect);
}


window.addEventListener('load', function() {
  document.querySelector('form').addEventListener('submit', handleForm);
});