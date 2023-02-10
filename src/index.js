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
    document.querySelector("img#yen-img").setAttribute("class", "show");
  } else if (currSelect === "EUR") {
    const eurTotal = (apiResponse.conversion_rates.EUR * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals €${eurTotal} ${currSelect}`;
    document.querySelector("img#euro-img").setAttribute("class", "show");
  } else if (currSelect === "MXN") {
    const mxnTotal = (apiResponse.conversion_rates.MXN * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals $${mxnTotal} ${currSelect}`;
    document.querySelector("img#peso-img").setAttribute("class", "show");
  } else if (currSelect === "CHF") {
    const chfTotal = (apiResponse.conversion_rates.CHF * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals ₣${chfTotal} ${currSelect}`;
    document.querySelector("img#franc-img").setAttribute("class", "show");
  } else if (currSelect === "AUD") {
    const audTotal = (apiResponse.conversion_rates.AUD * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals $${audTotal} ${currSelect}`;
    document.querySelector("img#aud-img").setAttribute("class", "show");
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
  document.getElementById("reset").setAttribute("class", "show");
  document.getElementById("submit").disabled = true;
  document.getElementById("reset").disabled = false;
}

function startOver() {
  document.getElementById("submit").disabled = false;
  document.getElementById("reset").disabled = true;
  document.getElementById("reset").setAttribute("class", "hidden");
  document.querySelector("img#yen-img").setAttribute("class", "hidden");
  document.querySelector("img#euro-img").setAttribute("class", "hidden");
  document.querySelector("img#peso-img").setAttribute("class", "hidden");
  document.querySelector("img#franc-img").setAttribute("class", "hidden");
  document.querySelector("img#aud-img").setAttribute("class", "hidden");
}

window.addEventListener('load', function () {
  document.querySelector('form').addEventListener('submit', handleForm);
  document.querySelector("button.delete").addEventListener("click", startOver);
});