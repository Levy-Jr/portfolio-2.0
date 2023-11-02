const btnHamburger = document.querySelector('[data-menu-button]')
const menuActive = document.querySelectorAll('[data-menu]')

btnHamburger.addEventListener('click', () => {
    menuActive.forEach(menu => menu.toggleAttribute('data-active-menu'))
})

const navLinks = document.querySelectorAll('.nav__li')

navLinks.forEach(li => {
    li.addEventListener('click', () => {
        menuActive.forEach(menu => menu.removeAttribute('data-active-menu'))
    })
})

const changeActiveElements = (element) => {
    const tabButtonsParent = document.querySelector('[data-tab-buttons-parent]')
    const activeElement = tabButtonsParent.querySelectorAll('.active')
    if(activeElement) {
        activeElement.forEach(activeEl => activeEl.classList.remove('active'))
    }

    element.classList.add('active')
}

const changeTabPanel = (index) => {
    const tabPanelsParent = document.querySelector('[data-tab-content-text-wrapper]')
    const activePanel = tabPanelsParent.querySelectorAll('.active')
    if(activePanel) {
        activePanel.forEach(activePanel => activePanel.classList.remove('active'))
    }

    tabPanelsParent.children[index].classList.add('active')
}

const tabButtons = document.querySelectorAll('[data-tab-button]')

tabButtons.forEach((e, i) => {
    e.addEventListener('click', () => {
        if(!e.classList.contains('active')){
            changeActiveElements(e)
            changeTabPanel(i)
        }
    })
})

/*       BACKGROUND HEADER      */

const headerContainer = document.querySelector('header .container')

const lines = () => {
    let sizeW = Math.random() * 15;
    let duration = Math.random() * 3;
    let e = document.createElement("div");
    e.setAttribute("class", "header-circle");
    headerContainer.appendChild(e);
    e.style.width = 5 + sizeW + "px";
    e.style.left = Math.random() * +innerWidth + "px";
    e.style.animationDuration = 2 + duration + "s";

    setTimeout(function () {
        headerContainer.removeChild(e);
    }, 10000);
}

setInterval(() => {
    lines();
}, 200);

/* projects draggable slider */

const carousel = document.querySelector('.projects-container')

let isDragging = false, startX, startScrollLeft

const dragStart = (e) => {
    isDragging = true
    carousel.classList.add('dragging')
    /* Records the initial cursor and scroll position of the carousel */
    startX = e.pageX
    startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
    if(!isDragging) return /* if isDragging is false return from here */
    /* updates the scroll position of the carousel based on the cursor movement */
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStop = () => {
    isDragging = false
    carousel.classList.remove('dragging')
}

carousel.addEventListener('mousedown', dragStart)

carousel.addEventListener('mousemove', dragging)

document.addEventListener('mouseup', dragStop)

/* between bar section */

const scrollers = document.querySelectorAll('.scroller')

if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    addAnimation()
}

function addAnimation() {
    scrollers.forEach(scroller => {
        scroller.setAttribute('data-animated', true)


        const scrollerInner = scroller.querySelector('.between-bar-slide')
        const scrollerContent = Array.from(scrollerInner.children)

        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true)
            duplicatedItem.setAttribute('aria-hidden', true)
            scrollerInner.appendChild(duplicatedItem)
        })
    })

}

/* skill section card effect */

const updateCursor = ({ x, y }) => {
  document.documentElement.style.setProperty('--x', x)
  document.documentElement.style.setProperty('--y', y)
}

const skillSection = document.querySelector('.skills-section')

skillSection.addEventListener('pointermove', updateCursor)