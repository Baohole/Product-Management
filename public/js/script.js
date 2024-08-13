const pagination = document.querySelectorAll('[button-pagination]');
if (pagination.length > 0) {
    const url = new URL(window.location.href);
    pagination.forEach((button) => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('button-pagination');
            url.searchParams.set('page', page);
            window.location.href = url.href;
        });
    });
}

const showAlert = document.querySelector('[show-alert]');
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
