import { fetchBreeds, fetchCatByBreed } from './cats-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

hideError();
showLoader();

fetchBreeds()
    .then(mapBreedsToOptions)
    .then(renderBreedOptions)
    .catch(handleError)
    .finally(hideLoader);

const slimSelect = new SlimSelect({
    select: breedSelect,
    placeholderText: 'Select Breed',
    allowDeselect: true,
    closeOnSelect: false,
    showSearch: true,
});

breedSelect.addEventListener('change', handleBreedSelectChange);
 
function mapBreedsToOptions(breeds) {
    return breeds.map(breed => ({
        text: breed.name,
        value: breed.id
    }));
}

function renderBreedOptions(breedOptions) {
    slimSelect.setData(breedOptions);
}

function handleError(error) {
    showError();
    console.error('Error fetching breeds:', error);
}


function handleBreedSelectChange() {
    const selectedBreedId = breedSelect.value;

    showLoader();
    hideError();
    hideCatInfo();

    fetchCatByBreed(selectedBreedId)
        .then(formatCatData)
        .then(updateCatInfo)
        .catch(handleCatError)
        .finally(hideLoader);
};

function updateCatInfo(catData) {  
    catInfo.innerHTML = `
        <img src="${catData.image}" alt="${catData.breed}">
        <h2>${catData.breed}</h2>
        <p><strong>Description:</strong> ${catData.description}</p>
        <p><strong>Temperament:</strong> ${catData.temperament}</p>
    `;
    showCatInfo();
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

function showLoader() {
    loader.classList.add('active');
};
    
function hideLoader() {
    loader.classList.remove('active');
};

function showError() {
    error.classList.remove('hidden');
};

function hideError() {
    error.classList.add('hidden');
};

function showCatInfo() {
    catInfo.classList.remove('hidden');
};

function hideCatInfo() {
    catInfo.classList.add('hidden');
};

