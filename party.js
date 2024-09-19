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
      body: JSON.stringify(artist),
    });
    const json = await response.json();
    if(json.error) {
      throw new Error(json.error.message);
    }
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
    info.innerHTML = 
    `<h2>${event.name}</h2>
    <p>${event.description}</p>
    <h3>${event.date}</h3>
    <h3>${event.location}</h3>`;
    return info;
  });
  eventList.replaceChildren(...eventsInfo);
}

async function render() {
  await getEvents();
  renderEvents();
}
//---Script---
render();

