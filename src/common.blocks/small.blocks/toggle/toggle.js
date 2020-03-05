document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('.check');
    var slider = document.querySelector('.slider');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            slider.classList.add('move')

        } else {
            slider.classList.remove('move')
        }
    });
});