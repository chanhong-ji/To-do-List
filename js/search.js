const searchForm = document.querySelector(".search-form");
const searchFormInput = searchForm.querySelector("input");

searchForm.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  const searchInput = searchFormInput.value;
  searchFormInput.value = "";
  window.open(`https://google.com/search?q=${searchInput}`);
}
