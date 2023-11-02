function initial() {
    if (localStorage.getItem('userData')) {
        const userData = JSON.parse(localStorage.getItem('userData'));
    
        $('#cardNumber').val(userData.cardNumber);
        $('#cardExpiration').val(userData.cardExpiration);
        $('#cvv').val(userData.cvv);
        $('#fullName').val(userData.fullName);
        $('#address').val(userData.address);
        $('#city').val(userData.city);
        $('#state').val(userData.state);
        $('#zip').val(userData.zip);
    }
    
    $('#submit').on('click', function () {
        const userData = {
            cardNumber: $('#cardNumber').val(),
            cardExpiration: $('#card_expiration').val(),
            cvv: $('#cvv').val(),
            fullName: $('#fullName').val(),
            address: $('#address').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            zip: $('#zip').val(),
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem("shoppingCartData", '');
        window.location.href = 'Index.html';
    });
}

window.onload = initial();