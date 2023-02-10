import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from "./currency-exchange.js";


async function getCurrency(amount, currSelect) {
  const apiResponse = await CurrencyExchange.getCurrency(amount, currSelect);
  if (apiResponse.documentation) {
    printCurrency(apiResponse, amount, currSelect);
  } else {
    printError(amount, currSelect);
  }
}


function printCurrency(apiResponse, amount, currSelect) {

  if (currSelect === "JPY") {
    const jpyTotal = (apiResponse.conversion_rates.JPY * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals ¥${jpyTotal} ${currSelect}`;
  } else if (currSelect === "EUR") {
    const eurTotal = (apiResponse.conversion_rates.EUR * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals €${eurTotal} ${currSelect}`;
  } else if (currSelect === "MXN") {
    const mxnTotal = (apiResponse.conversion_rates.MXN * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals $${mxnTotal} ${currSelect}`;
  } else if (currSelect === "CHF") {
    const chfTotal = (apiResponse.conversion_rates.CHF * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals ₣${chfTotal} ${currSelect}`;
  } else if (currSelect === "AUD") {
    const audTotal = (apiResponse.conversion_rates.AUD * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals $${audTotal} ${currSelect}`;
  }
}

function printError(amount, currSelect) {
  document.querySelector(`#showResponse`).innerText = `There was an error accessing the currency converter for ${amount} in ${currSelect}: We were unable to find information on that currency. Please try again.`;
}

function handleForm(event) {
  event.preventDefault();
  const amount = document.querySelector('#currency-amt').value;
  document.querySelector('#currency-amt').value = null;
  const currSelect = document.querySelector('#currency-name').value;
  getCurrency(amount, currSelect);
}


window.addEventListener('load', function () {
  document.querySelector('form').addEventListener('submit', handleForm);
});