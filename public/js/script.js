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