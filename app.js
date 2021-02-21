const API_KEY = "563492ad6f9170000100000195cfe7b79a8241ce9d4bb1cf2a27704c";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;

//Functions

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function genImg(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<div class="gallery-info">
                            <p>${photo.photographer}</p>
                            <a href="${photo.src.original}">Download</a>
                            </div>
                            <img src="${photo.src.large}"></img>`;
    gallery.appendChild(galleryImg);
  });
}

//Get Random Photos

async function curatedPhotos() {
  searchValue = "";
  fetchLink = "https://api.pexels.com/v1/curated/?page=1&per_page=15";
  const data = await fetchApi(fetchLink);
  genImg(data);
}

//Get Photos with Search Query

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchValue = e.target.firstElementChild.value;
  searchPhotos(searchValue);
});

async function searchPhotos(query) {
  gallery.innerHTML = "";
  searchInput.value = "";
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  genImg(data);
}

//Load more

more.addEventListener("click", async () => {
  page++;
  if (searchValue) {
    fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated/?page=${page}&per_page=15`;
  }
  const data = await fetchApi(fetchLink);
  genImg(data);
});

curatedPhotos();
