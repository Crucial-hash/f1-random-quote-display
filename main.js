const API_ENDPOINT = "quotes.json";
let quotes = [];

const init = async () => {
try {
  const jsonRes = await fetch(API_ENDPOINT);
  quotes = await jsonRes.json();
  setMarkup();
} catch (error) {
  quotation.innerHTML = error.message;
}};

const randomIndexGenerator = (len) => {
const array = new Uint32Array(1);
window.crypto.getRandomValues(array);
const randomIndex = array[0] % len;
return randomIndex;
};

const setMarkup = () => {
const quoteData = quotes[randomIndexGenerator(quotes.length)];
const quoteText = quoteData.text || quoteData.quote;

quotation.innerHTML = `
      <span class="quote">${quoteText}</span>  
      <div class="footer">
          <span id="refresh" title="Refresh | click R">
          </span>
          <div class="author">
              <span class="line"></span>&nbsp;
              <span>${quoteData.author ? quoteData.author : "Anonymous"}</span>
          </div>
      </div>
  `;
refresh.addEventListener("click", () => {
  setMarkup();
});};

document.onkeypress = (e) => {
  if (e.key === "r" || e.key === "R") setMarkup();
};

init();