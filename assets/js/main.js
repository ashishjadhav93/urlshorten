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
const getShortenUrl = async (shortenUrlInput) => {
  try {
    const apiUrl = BASE_URL + SHORTEN_ENDPOINT + shortenUrlInput;
    const response = await axios.get(apiUrl);
    const { ok, result } = await response.data;
    printShortenTable(apiUrl, result);
    document.querySelector(".search-input").classList.remove("error");
  } catch (err) {
    document.querySelector(".search-input").classList.add("error");
    console.log("There was some error processing your request");
  }
  document.querySelector(".shorten-input").value = "";
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
  document.getElementById("shorten-rul").innerHTML = "";
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
    const ancherHref = document.createElement("a");
    const ctaAncherSpan = document.createElement("span");
    li.className = "flex justify-center align-center";
    const ctaAncher = document.createElement("a");
    paraURL.innerHTML = elem.apiUrl;
    ancherHref.setAttribute("href", elem.result);
    ancherHref.setAttribute("target", "_blank");
    ancherHref.innerHTML = elem.result;
    paraURL.appendChild(ancherHref);
    paraShortURL.appendChild(ancherHref);
    ctaAncher.className = "cta shorten-copy";
    ctaAncher.appendChild(ctaAncherSpan);
    ctaAncherSpan.innerHTML = "Copy";
    ctaAncher.addEventListener("click", () => {
      shortenCopy(elem.result);
      ctaAncherSpan.innerHTML = "Copied!";
      ctaAncher.className = "cta shorten-copy shorten-Copied";
    });

    div.className = "shorten-text flex justify-center align-center";
    div.appendChild(paraShortURL);
    div.appendChild(ctaAncher);
    li.appendChild(paraURL);
    li.appendChild(div);
    document.getElementById("shorten-rul").append(li);
  });
};

const onload = async () => {
  renderAvailableUrl();
};
window.onload = renderAvailableUrl();
