const restaurants = [];

fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
    .then(blob => blob.json())
    .then(data => restaurants.push(...data))

function findMatches(wordsToMatch, restaurants) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordsToMatch, 'gi');
        return place.name.match(regex) || place.category.match(regex) || place.inspection_results.match(regex) || place.address_line_1.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map(place => {
        if(matchArray.length == 1000){
            return [];
        }
        return `
            <li>
                <span class="name">${place.name}</span><br>
                <span class="address">${place.address_line_1}</span><br>
                <span class="cityandzip">${place.city}, ${place.zip}</span><br>
                <span class="category">Category: ${place.category}</span><br>
                <span class="inspection">Inspection Results: ${place.inspection_results}</span>                
                </span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const textInput = document.querySelector('.textinput');
const suggestions = document.querySelector('.suggestions');

textInput.addEventListener('input', displayMatches);