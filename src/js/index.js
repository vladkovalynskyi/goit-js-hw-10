import { fetchBreeds, fetchCatByBreed } from './cats-api.js';
import SlimSelect from 'slim-select';


const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

hideStatus(error);
showStatus(loader);

fetchBreeds()
    .then(mapBreedsToOptions)
    .then(renderBreedOptions)
    .catch(handleError)
    .finally(() => hideStatus(loader));


breedSelect.addEventListener('change', handleBreedSelectChange);
 
function mapBreedsToOptions(breeds) {
    return breeds.map(breed => ({
        text: breed.name,
        value: breed.id
    }));

    
}

function renderBreedOptions(breedOptions) {
    const slimSelect = new SlimSelect({
        select: breedSelect,
        placeholderText: 'Select Breed',
        allowDeselect: true,
        closeOnSelect: false,
        showSearch: true,
    });
    slimSelect.setData(breedOptions);
}

function handleError(error) {
    showError();
    console.error('Error fetching breeds:', error);
}


function handleBreedSelectChange() {
    const selectedBreedId = breedSelect.value;

    showStatus(loader);
    hideStatus(error);
    hideStatus(catInfo);

    fetchCatByBreed(selectedBreedId)
        .then(formatCatData)
        .then(updateCatInfo)
        .catch(handleCatError)
        .finally(() => hideStatus(loader));
};

function updateCatInfo(catData) { 
    const catInfoContainer = document.createElement('div');
    const catImage = document.createElement('img');
    const catName = document.createElement('h2');
    const catDescription = document.createElement('p');
    const catTemperament = document.createElement('p');

    catImage.src = catData.image;
    catImage.alt = catData.breed;
    catName.textContent = catData.breed;
    catDescription.innerHTML = `<strong>Description:</strong> ${catData.description}`;
    catTemperament.innerHTML = `<strong>Temperament:</strong> ${catData.temperament}`;

    catInfoContainer.appendChild(catImage);
    catInfoContainer.appendChild(catName);
    catInfoContainer.appendChild(catDescription);
    catInfoContainer.appendChild(catTemperament);

    catInfo.innerHTML = '';
    catInfo.appendChild(catInfoContainer);
    showStatus(catInfo);
}

function formatCatData(catData) {
    if (catData.length > 0) {
        const cat = catData[0];
        return {
        breed: cat.breeds[0].name,
        description: cat.breeds[0].description,
        temperament: cat.breeds[0].temperament,
        image: cat.url
        };
    } else {
        throw new Error('No cat data found');
    }
};

function handleCatError(error) {
    showError();
    console.error('Error fetching cat:', error);
}

function showStatus(element) {
    element.classList.remove('hidden');
}

function hideStatus(element) {
    element.classList.add('hidden');
}