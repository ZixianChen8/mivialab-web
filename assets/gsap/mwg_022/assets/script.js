gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    /* LENIS SMOOTH SCROLL (OPTIONAL) */
    lenis = new Lenis({
        autoRaf: true,
    })
    /* LIENIS SMOOTH SCROLL (OPTIONAL) */

    const root = document.querySelector('.mwg_effect022')
    const pinHeight = root.querySelector('.pin-height')
    const container = root.querySelector('.container')
    const paragraphs = root.querySelectorAll('.paragraph')

    paragraphs.forEach(paragraph => {
        wrapWordsInSpan(paragraph)
    })
    
    ScrollTrigger.create({
        trigger: pinHeight, // Listens to pin-height
        start: 'top top',
        end: 'bottom bottom',
        pin: container // The pinned section
    })

    const tl = gsap.timeline({
        scrollTrigger: { // All tweens of my timeline will have the same scrollTrigger properties
            trigger: pinHeight,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true // Progresses with the scroll
        }
    })

    paragraphs.forEach((paragraph, index) => {
        if(paragraphs[index+1]) { // Check if there is a next paragraph
            tl.to(paragraphs[index].querySelectorAll('.word span'), {
                y:'100%', // Disappearance of words from paragraphs[index]
                duration:1,
                stagger:0.2,
                ease:'power4.in',
            }) // Both tweens will play at the same time
            tl.to(paragraphs[index+1].querySelectorAll('.word span'), {
                y:'0%', // Appearance of words from paragraphs[index+1]
                duration:1,
                delay:1,
                stagger:0.2,
                ease:'power4.out',
            }, '<') // This means the animation starts at the beginning of the previous tween
        }
    })
})

// UTIL METHOD
function wrapWordsInSpan(element) {
    const text = element.textContent;
    element.innerHTML = text
        .split(' ')
        .map(word => `<span class="word"><span>${word}</span></span>`)
        .join(' ');
}