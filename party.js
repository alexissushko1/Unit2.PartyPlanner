const COHORT = "2408-Alexis";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events/`;


//---State---
  let parties = [];

const getParties = async () => {
  try {
    const response = await fetch(API_URL);
    const parsed = await response.json();
    parties = parsed.data;
  } catch (e) {
    console.error(e);
  }
};

  const addParty = async(party) => {
  try {
      const response = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(party),
    });
    if(!response.ok) {
      const parsed = await response.json();
      throw new Error(parsed.error.message);
    }
  } catch (e) {
    console.error(e);
  }
};

    const deleteParty = async (id) => {
  try {
    const response = await fetch(API_URL + id, {
      method: "DELETE",
    });
    
    if(!response.ok) {
      const parsed = await response.json();
      throw new Error(parsed.error.message);
    }
  } catch(e) {
    console.error(e);
  }
}



//---Render---
 const renderParties = () => {
  const $partyList = document.querySelector("#parties");
  if (!parties.length) {
    $partyList.innerHtml = "<li>No parties</li>";
    return;
  }

  const $parties = parties.map((party) => {
    const $li = document.createElement("li");
    const partyDate = new Date(party.date).toLocaleString();
    $li.innerHTML = 
    `<h2>${party.name}</h2>
    <p>${party.description}</p>
    <h3>${partyDate}</h3>
    <h3>${party.location}</h3>
    <button>Delete</button>`;

    const $button = $li.querySelector("button");
    $button.addEventListener("click", async(event) => {
      await deleteParty(party.id);
      await getParties();
      renderParties();
    });
    return $li;
  });
  $partyList.replaceChildren(...$parties);
}

  const init = async () => {
  await getParties();
  renderParties();
};
//---Script---
init();

const $form = document.querySelector("form");
$form.addEventListener("submit", async(event) => {
  event.preventDefault();
  const partyDate = new Date($form.date.value).toISOString();
  const party = {
  name: $form.name.value,
  description: $form.description.value,
  date: partyDate,
  location: $form.location.value,
  };
  await addParty(party);
  await getParties();
  renderParties();
  $form.reset();
});
