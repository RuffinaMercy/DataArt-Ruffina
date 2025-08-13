const timeline = document.getElementById("timeline");
const modal = document.getElementById("modal");
const title = document.getElementById("title");
const year = document.getElementById("year");
const image = document.getElementById("image");
const description = document.getElementById("description");
const category = document.getElementById("category");
const closeBtn = document.getElementById("close");

fetch("data/events.json")
  .then(res => res.json())
  .then(events => {
    events.forEach(e => {
      let marker = document.createElement("div");
      marker.textContent = e.year;
      marker.onclick = () => {
        title.textContent = e.title;
        year.textContent = "Year: " + e.year;
        image.src = e.imageURL;
        description.textContent = e.description;
        category.textContent = "Category: " + e.category;
        modal.style.display = "block";
      };
      timeline.appendChild(marker);
    });
  });

closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = (event) => { if (event.target === modal) modal.style.display = "none"; };
