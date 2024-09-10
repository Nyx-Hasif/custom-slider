const container = document.getElementById("carousel-container");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const cardContainer = document.getElementById("card-container");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  let currentIndex = 0;
  let data = [];

  fetch("slides.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((json) => {
      data = json;
      renderCard(data[currentIndex]);
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );

  function renderCard(cardData, test = "") {
    container.innerHTML = `<div class="card" id="card-container">
      <div class="list ${test}">
      <img src="${cardData.image}" alt="${cardData.title}" />
      <div class="card-content">
        <h2 class="card-title">${cardData.title}</h2>

        <div class="card-details">
            ${cardData.details
              .map((detail) => {
                return `<span class="badge">${detail}</span>`;
              })
              .join("")}
        </div>

        <p class="card-description">
          ${cardData.description}
        </p>
        <div class="card-actions">
          <button class="btn-primary">Watch Now</button>
          <button class="btn-secondary">Bookmark</button>
        </div>

        <div class="button-group">
          <button id="prev">‹</button>
          <button id="next">›</button>
        </div>
      </div>
    </div>
    </div>`;

    document.getElementById("prev").addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        addPrevClass();
      }
    });

    document.getElementById("next").addEventListener("click", () => {
      if (currentIndex < data.length - 1) {
        currentIndex++;
        addNextClass();
      }
    });
  }
  function addNextClass() {
    const test = "next";
    renderCard(data[currentIndex], test);
  }

  function addPrevClass() {
    const test = "prev";
    renderCard(data[currentIndex], test);
  }
});
