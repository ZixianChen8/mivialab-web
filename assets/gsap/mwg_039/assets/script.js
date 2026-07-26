window.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector('.mwg_effect039'),
        card = document.querySelector('.mwg_effect039 .card'),
        media = document.querySelector('.mwg_effect039 .media'),
        // Creates a fast function to animate the 'x' position of 'card' with a 1s duration and 'power4' easing.
        xTo = gsap.quickTo(card, "x", {duration: 1, ease: "power4"}),  
        // Creates a function to animate the 'y' position of 'card' with a 1s duration and 'power4' easing.
        yTo = gsap.quickTo(card, "y", {duration: 1, ease: "power4"}),  
        // Creates a function to animate the 'rotationY' of 'card' smoothly over 1s.
        rotationYTo = gsap.quickTo(card, "rotationY", {duration: 1, ease: "power4"}),  
        // Creates a function to animate the 'rotationX' of 'card' smoothly over 1s.
        rotationXTo = gsap.quickTo(card, "rotationX", {duration: 1, ease: "power4"}),  
        // Creates a function to animate the horizontal scaling ('scaleX') of 'media' over 2s using 'power1' easing.
        scaleXTo = gsap.quickTo(media, "scaleX", {duration: 2, ease: "power1"}),  
        // Creates a function to animate the vertical scaling ('scaleY') of 'media' over 2s using 'power1' easing.
        scaleYTo = gsap.quickTo(media, "scaleY", {duration: 2, ease: "power1"}),  
        W = window.innerWidth,
        H = window.innerHeight

    let isMoving,
        oldPosX = 0,
        oldPosY = 0

    window.addEventListener("mousemove", e => {

        rotationYTo(e.clientX - oldPosX)
        rotationXTo(-(e.clientY - oldPosY))

        // I subtract half of the screen width since our image starts at the center
        xTo(e.clientX - W/2)
        // I subtract the already scrolled distance + half of the screen height since our image starts at the center
        yTo(e.clientY - root.getBoundingClientRect().top - H/2)

        // I zoom out the image until it reaches its original size
        scaleXTo(1)
        scaleYTo(1)

        oldPosX = e.clientX
        oldPosY = e.clientY

        window.clearTimeout( isMoving );
        isMoving = setTimeout( () => {
            rotationYTo(0)
            rotationXTo(0)

            // Once the movement is complete, I zoom the image back in
            scaleXTo(1.2)
            scaleYTo(1.2)
        }, 66);
    })
})