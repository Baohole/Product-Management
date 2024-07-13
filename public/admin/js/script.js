const buttonAttribute = document.querySelectorAll('[button-status]');
if(buttonAttribute.length > 0){
    let url = new URL(window.location.href);

    buttonAttribute.forEach((button) => {
        button.addEventListener('click', (e) => {
           //e.preventDefault();
            const buttonStatus = button.getAttribute('button-status');

            if(buttonStatus){
                url.searchParams.set('status', buttonStatus);
            }
            else{
                url.searchParams.delete('status');
            }

            window.location.href = url.href;
        });
    });
}

const formSearch = document.querySelector('#form-search');
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e);
        const key =  e.target.elements.search_query.value;
        console.log(key);
        if(key){
            url.searchParams.set('search_query', key);
            window.location.href = url.href;
            //console.log(url.href)
        }
        
    });
}

const pagination = document.querySelectorAll('[button-pagination]');
//console.log(pagination);
if(pagination.length > 0){
    const url = new URL(window.location.href);
    pagination.forEach((button) => {
        button.addEventListener('click', () => {
           const page = button.getAttribute('button-pagination');
           url.searchParams.set('page', page);
           window.location.href = url.href;
        });
    });
}

const productsTable = document.querySelector('[check-multi]');
if(productsTable){
    const changeMultiForm = document.querySelector('[form-change-multi]');
    const checkAll = productsTable.querySelector('input[name=check-all]');
    const checkId = productsTable.querySelectorAll('input[name=id]');

    checkAll.addEventListener('click', () => {
        checkId.forEach((check) => {
            check.checked = checkAll.checked;
        });
    });

    checkId.forEach(check =>{
        check.addEventListener('click', () => {
            const countChecked = productsTable.querySelectorAll('input[name=id]:checked').length;
            checkAll.checked = countChecked === checkId.length;
        });
    });

    changeMultiForm.addEventListener('submit', (e) => {
        //e.preventDefault();
        const idSaver = changeMultiForm.querySelector('input[name=ids]');
        const checkedIDs = productsTable.querySelectorAll('input[name=id]:checked');
        const type = changeMultiForm.querySelector('select[name=type]').value;
        //console.log(type);
        if(!type){
            alert('Vui lòng chọn 1 hành động!!!');
            e.preventDefault();
        }
        else if(idSaver && checkedIDs.length > 0){
            if(type == 'delete'){
                if(!confirm(`Xóa ${checkedIDs.length} sản phẩm đã chọn ?`)){
                    e.preventDefault();
                    return;
                }
            }
            if(type == 'position'){
                idSaver.value = Array.from(checkedIDs).map((id) => {
                    const position = id.closest('tr').querySelector('input[name=position]').value;
                    const data = `${id.value}-${position}`;
                    return data;
                }).join(',');
            }
            else{
                idSaver.value = Array.from(checkedIDs).map((id) => id.value).join(',');
            }
        }
        else{
            alert("Vui lòng chọn 1 bản ghi");
            e.preventDefault();
        }
        //console.log(idSaver.value);
        //changeMultiForm.submit();
    });
}

const showAlert = document.querySelector('[show-alert]');
console.log(showAlert);
if (showAlert) {
    const time = parseInt(showAlert.getAttribute('data-time'));

    setTimeout(() => {
        showAlert.style.display = 'none';
    }, time);

    const close = showAlert.querySelector('[close-alert]');
    close.addEventListener('click', () => {
        showAlert.style.display = 'none';
    });
}





