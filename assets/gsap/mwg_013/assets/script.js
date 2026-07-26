let wheel = 0
let total = 0
let xTo

window.addEventListener("DOMContentLoaded", () => {

    document.fonts.ready.then(() => {
        const content = document.querySelector('.mwg_effect013 .container')
        const half = document.querySelector('.mwg_effect013 .phrase').clientWidth

        const wrap = gsap.utils.wrap(-half, 0)
        xTo = gsap.quickTo(content, "x", {
            duration:0.5, // Will transition over 0.5s
            ease:'power3', // Non-linear
            modifiers: {
                x: gsap.utils.unitize(wrap)
            },
        })

        gsap.ticker.add(tick)

    })

    let isWheeling;
    window.addEventListener('wheel', (e) => {
        wheel = e.deltaY
        
        window.clearTimeout( isWheeling ) // setTimeout is cancelled
        isWheeling = setTimeout( () => {
            wheel = 0 // Force a reset of the wheel value if we dont enter the event after 66ms
        }, 66) 
    }, {passive: true});

})

function tick (time, dt) {
    total -= wheel + dt/5
    xTo(total)
}