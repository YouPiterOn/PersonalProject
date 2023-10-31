function loadShoppingCart() {
    if (localStorage.getItem("shoppingCartData")) {
        var cartData = JSON.parse(localStorage.getItem("shoppingCartData"));
        return cartData;
    } else {
        return [];
    }
}

function saveShoppingCart(cartData) {
    var cartDataJSON = JSON.stringify(cartData);

    localStorage.setItem("shoppingCartData", cartDataJSON);
}

function displayShoppingCart() {
    let shoppingCartData = loadShoppingCart();

    const cartList = $("#cartList");
    
    shoppingCartData.forEach(item => {
        const cartItem = $("<li>").addClass("cartItem");
        const itemImg = $("<img>").addClass("itemImg").attr("src", item.images[0]);
        const infoDiv = $("<div>").addClass("info");
        const nameP = $("<p>").addClass("name").text(item.title);
        const priceP = $("<p>").addClass("price").text("$"+item.price);
        const removeButton = $("<button>").addClass("removeButton").text("Remove");
        cartItem.on("click", function() {
            window.location.href = 'entityDisplay.html?id='+item.id;
        });
        removeButton.on("click", function() {
            _.remove(shoppingCartData, x => x.id == item.id)
            cartItem.remove();
            saveShoppingCart(shoppingCartData);
        });

        infoDiv.append(nameP, priceP);
        cartItem.append(itemImg, infoDiv, removeButton);
        cartList.append(cartItem);
    });
}


window.onload = displayShoppingCart();