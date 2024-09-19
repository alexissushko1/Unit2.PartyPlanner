const COHORT ="2408-Alexis"
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;


//---State---
const state = {
  events: [],
};

async function getEvents() {
  try {
    const response = await fetch (API_URL);
    const responseObj = await response.json();
    state.events = responseObj.data;
  } catch (error) {
    console.error(error);
  }
}

async function addEvent(event) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(event),
    });
    const json = await response.json();
    if(json.error) {
      throw new Error(json.error.message);
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteEvent(id) {
  try {
    const response = await fetch(API_URL + id, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}



//---Render---
async function renderEvents() {
  const eventList = document.querySelector("#events");
  if (!state.events.length) {
    eventList.innerHtml = "<li>No events</li>";
    return;
  }

  const eventsInfo = state.events.map((event) => {
    const info = document.createElement("li");
    const eventDate = new Date(event.date).toLocaleString();
    info.innerHTML = 
    `<h2>${event.name}</h2>
    <p>${event.description}</p>
    <h3>${eventDate}</h3>
    <h3>${event.location}</h3>
    <button>Delete</button>`;

    const button = document.querySelector("button");
    button.addEventListener("click", async () => {
      await getEvents();
      await deleteEvent(events.id);
      renderEvents();
    });
    return info;
  });
  const ul = document.querySelector("ul");
  eventList.replaceChildren(...eventsInfo);
}

async function render() {
  await getEvents();
  await deleteEvent(events.id);
  renderEvents();
}
//---Script---
render();

const form = document.querySelector("form");
form.addEventListener("submit", async(event) => {
  event.preventDefault();
  const eventDate = new Date(form.date.value).toISOString();
  const individualEvent = {
  name: form.partyName.value,
  description: form.description.value,
  date: eventDate,
  location: form.location.value,
  };
  await addEvent(individualEvent);
  await deleteEvent(events.id);
  render();
  form.reset();
});
