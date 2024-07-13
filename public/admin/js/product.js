const changeStatus = document.querySelectorAll('[button-change-status]');
//console.log(changeStatus);
changeStatus.forEach((button) => {
    button.addEventListener('click', () => {
       const status = button.getAttribute('data-status');
       const id = button.getAttribute('data-id');
       const newStatus = (status === 'active') ? 'inactive' : 'active';
    
       const statusForm = document.querySelector('#change-status-form');
       const path = statusForm.getAttribute('data-path');
       statusForm.action = path + `${newStatus}/${id}?_method=PATCH`;
       statusForm.submit();
    });
});

const deleteItem = document.querySelectorAll('[button-delete]');
deleteItem.forEach((button) => {
    button.addEventListener('click', () => {
        const ifConfirm = confirm('Xóa sản phẩm này?')
        if(ifConfirm) { 
            const id = button.getAttribute('data-id');
            const deleteForm = document.querySelector('#delete-form');
            const path = deleteForm.getAttribute('data-path');
            //console.log(path);
            deleteForm.action = deleteForm.getAttribute('data-path') + `${id}?_method=DELETE`;
            deleteForm.submit();
        }
        
    });
});
