document
  .querySelector(".nav-mobile-icon")
  .addEventListener("click", (event) => {
    document.getElementById("navbar-text").classList.toggle("show_list");
    document.querySelector(".nav-mobile-icon")[0].classList.toggle("active");
  });

document.querySelector(".shorten-btn").addEventListener("click", (event) => {
  shortenUrlInput = document.querySelector(".shorten-input").value;
  document.querySelector(".shorten-input").value = "";

  getShortenUrl(shortenUrlInput);
});
const getShortenUrl = async (shorten_url) => {
  try {
    const apiUrl = BASE_URL + SHORTEN_ENDPOINT + shorten_url;
    const response = await axios.get(apiUrl);
    const { ok, result } = await response.data;
    printShortenTable(apiUrl, result);
    document.querySelector(".search-input").classList.remove("error");
  } catch (err) {
    document.querySelector(".search-input").classList.add("error");
    console.log("There was some error processing your request");
  }
};

const printShortenTable = async (apiUrl, result) => {
  let storage = localStorage.getItem("urls");
  if (storage) {
    storage = JSON.parse(storage);
    storage.push({ apiUrl: apiUrl, result: result.full_short_link });
  } else {
    storage = [{ apiUrl: apiUrl, result: result.full_short_link }];
  }
  localStorage.setItem("urls", JSON.stringify(storage));
  renderAvailableUrl();
};
const shortenCopy = (copyUrl) => {
  navigator.clipboard.writeText(copyUrl);
};
const renderAvailableUrl = () => {
  let urls = window.localStorage.getItem("urls");
  if (urls) {
    urls = JSON.parse(urls);
  } else {
    urls = [];
  }
  urls.forEach((elem) => {
    const li = document.createElement("li");
    const paraURL = document.createElement("p");
    const paraShortURL = document.createElement("p");
    const div = document.createElement("div");
    const ancher = document.createElement("a");
    const ancherSpan = document.createElement("span");
    li.className = "flex justify-center align-center";
    paraURL.innerHTML = elem.apiUrl;
    paraShortURL.innerHTML = elem.result;
    ancher.className = "cta shorten-copy";
    ancher.appendChild(ancherSpan);
    ancherSpan.innerHTML = "Copy";
    ancher.addEventListener("click", () => {
      shortenCopy(elem.result);
      ancherSpan.innerHTML = "Copyed!";
      ancher.className = "cta shorten-copy shorten-Copied";
    });
    div.className = "shorten-text flex justify-center align-center";
    div.appendChild(paraShortURL);
    div.appendChild(ancher);
    li.appendChild(paraURL);
    li.appendChild(div);
    document.getElementById("shorten-rul").append(li);
  });
};

const onload = async () => {
  renderAvailableUrl();
};
window.onload = renderAvailableUrl();