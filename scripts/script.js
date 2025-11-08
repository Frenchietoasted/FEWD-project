document.querySelectorAll('.parallax').forEach(layer => {
    // parse speed once (or fallback to 0)
    const speed = parseFloat(layer.getAttribute('data-speed'));
    if (Number.isNaN(speed)) return;

    // handler for pointer movement when hovering this layer
    function onPointerMove(event) {
        const clientX = event.clientX ?? (event.touches && event.touches[0] && event.touches[0].clientX) ?? (window.innerWidth / 2);
        const clientY = event.clientY ?? (event.touches && event.touches[0] && event.touches[0].clientY) ?? (window.innerHeight / 2);
        // I'm not sure if we're planning on porting this to mobile devices so I'm adding touch support just in case
        // if you dont want it, just remove the "?? ..." parts above
        // "?? (event.touches && event.touches[0] && event.touches[0].clientX) ?? (window.innerWidth / 2);"
        const x = (window.innerWidth / 2 - clientX) * speed / 100;
        const y = (window.innerHeight / 2 - clientY) * speed / 100;

        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    // reset transform when pointer leaves
    function onPointerLeave() {
        layer.style.transform = '';
        layer.style.willChange = '';
    }

    // add listeners
    layer.addEventListener('pointerenter', () => layer.addEventListener('pointermove', onPointerMove));
    layer.addEventListener('pointerleave', () => {
        layer.removeEventListener('pointermove', onPointerMove);
        onPointerLeave();
    });
});
