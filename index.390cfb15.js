!function(){var e=document.querySelector(".breed-select"),t=document.querySelector(".loader"),n=document.querySelector(".error"),r=document.querySelector(".cat-info");u(),s(),fetch("https://api.thecatapi.com/v1/breeds").then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){throw console.error("Error fetching breeds:",e),e})).then((function(e){return e.map((function(e){return{text:e.name,value:e.id}}))})).then((function(e){c.setData(e)})).catch((function(e){h(),console.error("Error fetching breeds:",e)})).finally(d);var c=new SlimSelect({select:e,placeholderText:"Select Breed",allowDeselect:!0,closeOnSelect:!1,showSearch:!0});function o(e){r.innerHTML='\n        <img src="'.concat(e.image,'" alt="').concat(e.breed,'">\n        <h2>').concat(e.breed,"</h2>\n        <p><strong>Description:</strong> ").concat(e.description,"</p>\n        <p><strong>Temperament:</strong> ").concat(e.temperament,"</p>\n    "),r.classList.remove("hidden")}function a(e){if(e.length>0){var t=e[0];return{breed:t.breeds[0].name,description:t.breeds[0].description,temperament:t.breeds[0].temperament,image:t.url}}throw new Error("No cat data found")}function i(e){h(),console.error("Error fetching cat:",e)}function s(){t.classList.add("active")}function d(){t.classList.remove("active")}function h(){n.classList.remove("hidden")}function u(){n.classList.add("hidden")}e.addEventListener("change",(function(){var t=e.value;s(),u(),r.classList.add("hidden"),(n=t,c="https://api.thecatapi.com/v1/images/search?breed_ids=".concat(n,"&api_key=").concat("live_K3pWxGPAiQFEJQ42hDV1K5hQeSWBKdnCioFta7dHuRIvGOeOj5hGbP70PmaQcOAv"),fetch(c).then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){throw console.error("Error fetching cat by breed:",e),e}))).then(a).then(o).catch(i).finally(d);var n,c}))}();
//# sourceMappingURL=index.390cfb15.js.map
