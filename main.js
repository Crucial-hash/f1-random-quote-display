const API_ENDPOINT = "quotes.json";
let quotes = [];

const init = async () => {
  try {
    const jsonRes = await fetch(API_ENDPOINT);
    quotes = await jsonRes.json();
    setMarkup();
  } catch (error) {
    quotation.innerHTML = error.message;
  }
};

const randomIndexGenerator = (len) => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  const randomIndex = array[0] % len;
  return randomIndex;
};

const setMarkup = () => {
  const quoteData = quotes[randomIndexGenerator(quotes.length)];
  const quoteText = quoteData.text || quoteData.quote; // Handle both 'text' and 'quote' properties

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
  });
};

var button = document.getElementById("homea");

// Add a click event listener to the button
button.addEventListener("click", function() {
  // Redirect to the desired website
  window.location.href = "http://homeassistant.local:8123/dashboard-ximi/0";
});

// Initialize the application
init();
