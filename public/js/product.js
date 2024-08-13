const form = document.querySelector('[get-quantity]');
if(form){
    const id = form.getAttribute('product-id');

    const addCartBtn = document.querySelector('button[add-cart]');
    if (addCartBtn) {
        addCartBtn.addEventListener('click', () => {
            form.action = `/cart/add/${id}`;
            form.submit();
        });
    }

    const buyBtn = document.querySelector('button[buy-product]');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            form.action = `/checkout/buynow/${id}`;
            form.submit();
        });

    }
}
