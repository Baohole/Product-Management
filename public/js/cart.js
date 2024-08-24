// Check-box
const productsTable = document.querySelector('[check-multi]');
if (productsTable) {
    const checkAll = productsTable.querySelector('input[name=check-all]');
    const checkId = productsTable.querySelectorAll('input[name=id]');

    const getTotalPrice = (check) => {
        const tr = check.closest('tr');
        const price = parseFloat(tr.querySelector('[new-price]').innerHTML);
        const quantity = parseInt(tr.querySelector('input[name=quantity]').value);
        const totalPirce = document.querySelector('[total-price]');
        if(check.checked){
            totalPirce.innerHTML = (price * quantity + parseFloat(totalPirce.innerHTML.split(' $'))) + ' $';
                        
        }
        else {
            totalPirce.innerHTML = Math.max(0, (parseFloat(totalPirce.innerHTML.split(' $')) - price * quantity )) + ' $';
        }
    }

    
    checkAll.addEventListener('click', () => {
        const totalPirce = document.querySelector('[total-price]');
        if(checkAll.checked){
            totalPirce.innerHTML = '0 $'
        }
        checkId.forEach((check) => {
            check.checked = checkAll.checked;
            getTotalPrice(check);
        });
    });


    checkId.forEach(check => {
        getTotalPrice(check);
        check.addEventListener('click', () => {
            const countChecked = productsTable.querySelectorAll('input[name=id]:checked').length;
            checkAll.checked = countChecked === checkId.length;
            getTotalPrice(check);
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

}
const quantityBtn = document.querySelectorAll('input[name=quantity]');
if(quantityBtn){
    quantityBtn.forEach((btn) => {
        btn.addEventListener('change', () => {
            //console.log(btn);
            const quantity = parseFloat(btn.value);
            const id = btn.getAttribute('product-id');
            
            window.location.href = `/cart/update/${id}/${btn.value}`
            //console.log(quantity);
            //console.log(id);
        });
    });

}

// 
const chekoutBtn = document.querySelector('button[checkout]');
if(chekoutBtn && productsTable){
    chekoutBtn.addEventListener('click', () => {
        const countChecked = productsTable.querySelectorAll('input[name=id]:checked');
        const records = [...countChecked].map(item => item.value);
        console.log(records);
        if(records){
            const form = document.querySelector('[form-checkout]');
            const input = form.querySelector('input[name=products]');
            //console.log(form);
            input.value = records.join(',');
            form.submit();
        }

    });
}

