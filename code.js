console.clear();

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openSubItem = document.querySelector('.item.active .sub-item.active');
        if (openSubItem) {
            const subHeader = openSubItem.querySelector('.sub-title');
            subHeader.click();
            return;
        }
        if (currentItem !== null) {
            const mainHeader = items[currentItem].querySelector('.section-header');
            mainHeader.click();
            currentItem = null;
        }
    }
});

const items = gsap.utils.toArray('.item');
let currentItem = null;

items.forEach((e, i) => {
    const header = e.querySelector('.section-header');
    const content = e.querySelector('.section-content');
    const icon = header.querySelector('.fa-angle-down');

    header.addEventListener('click', () => {
        const isOpening = !e.classList.contains('active');
        e.classList.toggle('active');

        if (isOpening) {
            gsap.fromTo(content, { height: 0 }, {
                height: () => content.scrollHeight,
                duration: 0.5,
                ease: 'power2.out'
            });
            gsap.to(icon, { duration: 0.2, rotate: '180deg' });
        } else {
            gsap.to(content, { height: 0, duration: 0.5, ease: 'power2.in' });
            gsap.to(icon, { duration: 0.2, rotate: '0deg' })
        }

        if (currentItem !== null && currentItem !== i) {
            const prevItem = items[currentItem];
            const prevIcon = prevItem.querySelector('.fa-angle-down');
            gsap.to(prevItem.querySelector('.section-content'), { height: 0, duration: 0.5, ease: 'power2.in' });
            gsap.to(prevIcon, { duration: 0.2, rotate: '0deg' });
            prevItem.classList.remove('active');
        }

        currentItem = isOpening ? i : null;
    });
});

const subItems = gsap.utils.toArray('.sub-item');

subItems.forEach((subItem) => {
    const subHeader = subItem.querySelector('.sub-title');
    const subContent = subItem.querySelector('.sub-content');
    const subIcon = subHeader.querySelector('.fa-angle-down');
    
    subHeader.addEventListener('click', (event) => {
        event.stopPropagation();
        const isSubOpening = !subItem.classList.contains('active');

        adjustParentHeight(subItem, isSubOpening);

        subItem.classList.toggle('active');

        if (isSubOpening) {
            gsap.fromTo(subContent, { height: 0 }, {
                height: () => subContent.scrollHeight,
                duration: 0.5,
                ease: 'power2.out'
            });
            gsap.to(subIcon, { duration: 0.2, rotate: '180deg' });
        } else {
            gsap.to(subContent, { height: 0, duration: 0.5, ease: 'power2.in' });
            gsap.to(subIcon, { duration: 0.2, rotate: '0deg' });
        }
    });
});

const adjustParentHeight = (subItem, isSubOpening) => {
    const parentContent = subItem.closest('.section-content');
    if (!parentContent) return;

    const subContentHeight = subItem.querySelector('.sub-content').scrollHeight;
    let newHeight = isSubOpening
        ? parentContent.scrollHeight + subContentHeight
        : parentContent.scrollHeight - subContentHeight;

        newHeight = Math.max(newHeight, 0);
    
    gsap.to(parentContent, {
        height: newHeight,
        duration: 0.5,
        ease: 'power2.out'
    });
}