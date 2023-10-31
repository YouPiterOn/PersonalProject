
async function fetchData() {
    let data = await (await fetch('https://dummyjson.com/products')).json();
    return data.products;
}

let allProducts = [];
let allTags = [];


function shortenStr(str) {
    if(str.length > 26){
        let result = str.slice(0, 23);
        result += "...";
        return result;
    }
    return str;
}

function displayEntity(entity) 
{
    const entityDiv = document.createElement("div");
    entityDiv.classList.add("entity");

    entityDiv.onclick = function() {
        window.location.href = 'entityDisplay.html?id='+entity.id;
    };

    const entityImage = document.createElement("img");
    entityImage.src = entity.images[0];
    entityImage.alt = entity.title;
    entityImage.classList.add("entityImage");

    const entityName = document.createElement("p");
    entityName.textContent = shortenStr(entity.title);
    entityName.classList.add("name");

    const entityPrice = document.createElement("p");
    entityPrice.textContent = '$' + entity.price;
    entityPrice.classList.add("price");

    entityDiv.appendChild(entityImage);
    entityDiv.appendChild(entityName);
    entityDiv.appendChild(entityPrice);
    document.getElementById("entitiesDisplay").appendChild(entityDiv);
}

function displayTag(tag)
{
    const $formField = $('<div>', { class: 'formField' });
    const $label = $('<label>', { text: tag, class: 'formText' });  
    const $input = $('<input>', { type: 'checkbox', name: tag });
    const $customCheckbox = $('<span>', { class: 'custom-checkbox' });

    $label.append($input, $customCheckbox);
    $formField.append($label);

    $('#filters').append($formField);
}

function createSubmitButton()
{
    const $submitButton = $('<button>', {
        type: 'submit',
        text: 'Apply Filters',
        class: 'submitButton'
    });
    $('#filters').append($submitButton);

    $('#filters').on('submit', function(event) {
        event.preventDefault();

        const selectedTags = [];
        $('input:checked').each(function() {
            selectedTags.push($(this).attr('name'));
        });
        $("#entitiesDisplay").children().remove();
        if(selectedTags.length == 0){
            allProducts.forEach(entity => {
                displayEntity(entity);
            })
            return;
        }
        const filteredEntities = _.filter(allProducts, entity => {
            return selectedTags.includes(entity.category);
        });
        if(filteredEntities.length == 0) {
            $("#entitiesDisplay").append("<p class='error-message'>No products found</p>")
            return;
        }
        filteredEntities.forEach(entity => {
            displayEntity(entity);
        })
        
    });
}

async function displayInitial() 
{
    allProducts = await fetchData();
    allTags = [...new Set(allProducts.flatMap(entity => entity.category))];
    allProducts.forEach(entity => {
        displayEntity(entity);
    })
    allTags.forEach(tag => {
        displayTag(tag);
    })
    createSubmitButton();
}

window.onload = displayInitial();
