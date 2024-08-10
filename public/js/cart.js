// Check-box
const productsTable = document.querySelector('[check-multi]');
if (productsTable) {
    const checkAll = productsTable.querySelector('input[name=check-all]');
    const checkId = productsTable.querySelectorAll('input[name=id]');


    checkAll.addEventListener('click', () => {
        checkId.forEach((check) => {
            check.checked = checkAll.checked;
        });
    });


    checkId.forEach(check => {
        check.addEventListener('click', () => {
            const countChecked = productsTable.querySelectorAll('input[name=id]:checked').length;
            checkAll.checked = countChecked === checkId.length;
        });
    });

    const deleteAll = productsTable.querySelector('button[name=delete-all]');
    deleteAll.addEventListener('click', () => {
        const countChecked = productsTable.querySelectorAll('input[name=id]:checked');
        const records = [...countChecked].map(item => item.value);
        if(records){
            const form = document.querySelector('[form-delete]');
            const input = form.querySelector('input[name=ids]');
            //console.log(form);
            input.value = records.join(',');
            form.submit();
        }

    })
    //console.log(deleteAll);
}

const quantityBtn = document.querySelectorAll('input[name=quantity]');
if(quantityBtn){
    quantityBtn.forEach((btn) => {
        btn.addEventListener('change', () => {
            //console.log(btn);
            const quantity = parseInt(btn.value);
            const id = btn.getAttribute('product-id');
            
            window.location.href = `/cart/update/${id}/${btn.value}`
            //console.log(quantity);
            //console.log(id);
        });
    });

}
