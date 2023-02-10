import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from "./currency-exchange.js";


async function getCurrency(amount, selectCurr) {
  const apiResponse = await CurrencyExchange.getCurrency(amount, selectCurr);
  if (apiResponse.documentation) {
    printCurrency(apiResponse, amount, selectCurr);
  } else {
    printError(amount, selectCurr);
  }
}


function printCurrency(apiResponse, amount, selectCurr) {
  if (selectCurr === "JPY") {
    const jpyTotal = (apiResponse.conversion_rates.JPY * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals ¥${jpyTotal} ${selectCurr}`;
    document.querySelector("img#yen-img").setAttribute("class", "show");
  } else if (selectCurr === "EUR") {
    const eurTotal = (apiResponse.conversion_rates.EUR * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals €${eurTotal} ${selectCurr}`;
    document.querySelector("img#euro-img").setAttribute("class", "show");
  } else if (selectCurr === "MXN") {
    const mxnTotal = (apiResponse.conversion_rates.MXN * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals $${mxnTotal} ${selectCurr}`;
    document.querySelector("img#peso-img").setAttribute("class", "show");
  } else if (selectCurr === "CHF") {
    const chfTotal = (apiResponse.conversion_rates.CHF * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals ₣${chfTotal} ${selectCurr}`;
    document.querySelector("img#franc-img").setAttribute("class", "show");
  } else if (selectCurr === "AUD") {
    const audTotal = (apiResponse.conversion_rates.AUD * amount).toFixed(2);
    document.querySelector('#showResponse').innerText = `$${amount} USD equals $${audTotal} ${selectCurr}`;
    document.querySelector("img#aud-img").setAttribute("class", "show");
  } 
}

function printError(error, selectCurr) {
  document.querySelector(`#showResponse`).innerText = `There was an error accessing the currency data for ${selectCurr}: ${error}`;
}

function getRate(event) {
  event.preventDefault();
  const amount = document.querySelector('#currency-amt').value;
  document.querySelector('#currency-amt').value = null;
  const selectCurr = document.querySelector('#currency-name').value;
  getCurrency(amount, selectCurr);
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