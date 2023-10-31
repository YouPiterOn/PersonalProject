async function fetchData() {
    let data = await (await fetch('https://dummyjson.com/products')).json();
    return data.products;
}

async function getEntityById(id) {
    const entities = await fetchData();
    return entities.find(entity => entity.id == id);
}

function getId() {
    const regex = new RegExp('[?&]id(=([^&#]*)|&|#|$)');
    const results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function loadShoppingCart() {
    if (localStorage.getItem("shoppingCartData")) {
        var cartData = JSON.parse(localStorage.getItem("shoppingCartData"));
        return cartData;
    } else {
        return [];
    }
}

let shoppingCartData = loadShoppingCart();
let imageNum = 0;

async function initial() {
    shoppingCartData
    const id = getId();
    const entity = await getEntityById(parseInt(id));
    if (entity) {
        $('#entity-img').attr('src', entity.images[imageNum]);
        $('#entity-name').text(entity.title);
        $('#entity-price').text("$"+entity.price);
        $('#entity-description').text(entity.description);
        $('#entity-tags').append(`<li>${entity.category}</li>`);
    }
    else {
        $('#entity-display').text('Entity not found.');
    }
    
}

window.onload = initial();

async function previousImg() {
    const entity = await getEntityById(parseInt(getId()));
    if(imageNum == 0){
        imageNum = entity.images.length-1
        $('#entity-img').attr('src', entity.images[imageNum]);
        return;
    }
    imageNum--;
    $('#entity-img').attr('src', entity.images[imageNum]);
}

async function nextImg() {
    const entity = await getEntityById(parseInt(getId()));
    if(imageNum == entity.images.length-1){
        imageNum = 0;
        $('#entity-img').attr('src', entity.images[imageNum]);
        return;
    }
    imageNum++;
    $('#entity-img').attr('src', entity.images[imageNum]);
}

function saveShoppingCart(cartData) {
    var cartDataJSON = JSON.stringify(cartData);

    localStorage.setItem("shoppingCartData", cartDataJSON);
}

async function addItemToShoppingCart() {
    const entity = await getEntityById(parseInt(getId()));
    shoppingCartData.push(entity);
    saveShoppingCart(shoppingCartData);
}
