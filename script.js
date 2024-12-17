let navbarItem = document.querySelectorAll('.item')
for (let i = 0; i < navbarItem.length; i++) {
    navbarItem[i].addEventListener('click', function () {
        for (let i = 0; i < navbarItem.length; i++) {
            navbarItem[i].classList.remove('active')
        }
        this.classList.add('active')
    })
}

var typed = new Typed('.multiple-text', {
    strings: ['前端开发工程师', '设计师', 'Web开发者', '创意工作者'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});