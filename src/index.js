import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from "./currency-exchange.js";


async function getCurrency(amount, currency) {
  const apiResponse = await CurrencyExchange.getCurrency(amount, currency);
  if (apiResponse.documentation) {
    printCurrency(apiResponse, amount, currency);
  } else {
    printError(amount, currency);
  }
}

function printCurrency(apiResponse, amount, currency) {
  if (currency === "JPY") {
    const jpyTotal = (apiResponse.conversion_rates.JPY * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals ¥${jpyTotal} ${currency}`;
    document.querySelector("img#yen-img").setAttribute("class", "show");
  } else if (currency === "EUR") {
    const eurTotal = (apiResponse.conversion_rates.EUR * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals €${eurTotal} ${currency}`;
    document.querySelector("img#euro-img").setAttribute("class", "show");
  } else if (currency === "MXN") {
    const mxnTotal = (apiResponse.conversion_rates.MXN * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals $${mxnTotal} ${currency}`;
    document.querySelector("img#peso-img").setAttribute("class", "show");
  } else if (currency === "CHF") {
    const chfTotal = (apiResponse.conversion_rates.CHF * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals ₣${chfTotal} ${currency}`;
    document.querySelector("img#franc-img").setAttribute("class", "show");
  } else if (currency === "AUD") {
    const audTotal = (apiResponse.conversion_rates.AUD * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals $${audTotal} ${currency}`;
    document.querySelector("img#aud-img").setAttribute("class", "show");
  } else {
    document.querySelector(`#showResponse`).innerText = `There was an error accessing the currency exchange data for ${currency}. Please select a valid country.`;
  }
}

function printError(amount, currency) {
  document.querySelector(`#showResponse`).innerText = `There was an error accessing the currency exchange API for $${amount} in ${currency}. Please try again.`;
}

function getRate(event) {
  event.preventDefault();
  const amount = document.querySelector('#currency-amt').value;
  document.querySelector('#currency-amt').value = null;
  const currency = document.querySelector('#currency-name').value;
  getCurrency(amount, currency);
  document.getElementById('showResponse').hidden = false;
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
  document.getElementById('showResponse').hidden = true;
}

window.addEventListener('load', function () {
  document.querySelector('form').addEventListener('submit', getRate);
  document.querySelector("button.delete").addEventListener("click", startOver);
});