const restaurants = [];

fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
    .then(blob => blob.json())
    .then(data => restaurants.push(...data))

function findMatches(wordsToMatch, restaurants) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordsToMatch, 'gi');
        return place.name.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, restaurants);
    console.log(matchArray);
    const html = matchArray.map(place => {
        return `
            <li>
                <span class="name">${place.name}, ${place.state}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const textInput = document.querySelector('.textinput');
const suggestions = document.querySelector('.suggestions');

textInput.addEventListener('change', displayMatches);
textInput.addEventListener('keyup', displayMatches);