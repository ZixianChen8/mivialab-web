const root = document.querySelector('.mwg_effect020')
const images = []
root.querySelectorAll('.medias img').forEach(image => {
    images.push(image.getAttribute('src'))
})

let incr = 0, 
    oldIncrX = 0, 
    oldIncrY = 0, 
    resetDist = window.innerWidth / 8, 
    indexImg = 0

window.addEventListener("DOMContentLoaded", () => {
    root.addEventListener("mousemove", e => {
        oldIncrX = e.clientX
        oldIncrY = e.clientY
    }, {once: true})

    root.addEventListener("mousemove", e => {
        const valX = e.clientX
        const valY = e.clientY
        
        // Add the distance traveled on x + y
        incr += Math.abs(valX - oldIncrX) + Math.abs(valY - oldIncrY)

        if(incr > resetDist) {
            incr = 0 // Reset the variable incr
            createMedia(valX, valY - root.getBoundingClientRect().top, valX - oldIncrX, valY - oldIncrY)  
        }
  
        // Reset after calculation to add the new delta on the next call
        // Also reset after the createMedia() function
        oldIncrX = valX
        oldIncrY = valY
    })
})


function createMedia(x, y, deltaX, deltaY) {

    // We create an image and set its url with the current item of the images array
    const image = document.createElement("img")
    image.setAttribute('src', images[indexImg])

    // We add this image to the DOM
    root.appendChild(image)

    const tl = gsap.timeline({
        onComplete: () => {
            // when our timeline is finished, we remove our image from the DOM
            root.removeChild(image);
            tl && tl.kill()
        }
    })

    tl.fromTo(image, {
        // Add some randomness
        xPercent: -50 + (Math.random() - 0.5) * 80,
        yPercent: -50 + (Math.random() - 0.5) * 10,
        scaleX: 1.3,
        scaleY: 1.3
    }, {
        scaleX:1,
        scaleY:1,
        ease:'elastic.out(2, 0.6)', // Easing property responsible of the rebound effect
        duration:0.6
    })

    tl.fromTo(image, {
        // The first and second parameters are x and y (cursor position)
        // We set the image at the current cursor position
        x,
        y,
        rotation:(Math.random() - 0.5) * 20,
    }, {
        // We add deltaX and deltaY (the third and fourth parameters of the function)
        x: '+=' + deltaX * 4,
        y: '+=' + deltaY * 4,
        rotation:(Math.random() - 0.5) * 20,
        ease:'power4.out',
        duration: 1.5
    }, '<') // Means that the animation starts at the start of the previous tween
    
    tl.to(image, {
        duration: 0.3,
        scale: 0.5, // Reduce the image later
        delay: 0.1,
        ease:'back.in(1.5)'
    })

    // Loop back to the first item when we're out of range in our images array
    indexImg = (indexImg + 1) % images.length
}