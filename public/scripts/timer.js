
// ===================== script.js =====================
// Save this as script.js
(function () {
    // Digit mapping: segments are named a,b,c,d,e,f,g (in that order)
    const DIGIT_MAP = [
        [1, 1, 1, 1, 1, 1, 0], //0
        [0, 1, 1, 0, 0, 0, 0], //1
        [1, 1, 0, 1, 1, 0, 1], //2
        [1, 1, 1, 1, 0, 0, 1], //3
        [0, 1, 1, 0, 0, 1, 1], //4
        [1, 0, 1, 1, 0, 1, 1], //5
        [1, 0, 1, 1, 1, 1, 1], //6
        [1, 1, 1, 0, 0, 0, 0], //7
        [1, 1, 1, 1, 1, 1, 1], //8
        [1, 1, 1, 1, 0, 1, 1]  //9
    ];

    // SVG segment polygons for a 7-seg digit sized to viewBox 0 0 100 200
    // Each polygon is placed roughly where the segment should be.
    // updated to symmetric coordinates so left/right segments match visually
    const SEGMENTS_SVG = {
        // top bar
        a: '<polygon class="segment" points="14,18 86,18 72,34 28,34" />',
        // right top (stop above middle to leave a gap)
        b: '<polygon class="segment" points="72,34 86,18 86,96 72,110 72,34" />',
        // right bottom (start below middle)
        c: '<polygon class="segment" points="72,110 86,96 86,186 72,170 72,110" />',
        // bottom bar
        d: '<polygon class="segment" points="14,186 86,186 72,170 28,170" />',
        // left bottom (start below middle)
        e: '<polygon class="segment" points="28,110 14,96 14,186 28,170 28,110" />',
        // left top (stop above middle to leave a gap)
        f: '<polygon class="segment" points="28,34 14,18 14,96 28,110 28,34" />',
        // middle bar
        g: '<polygon class="segment" points="28,96 72,96 72,110 28,110" />'
    };

    function makeDigitSVG() {
        const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        return `<svg viewBox="0 0 100 208" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">${keys.map(k => SEGMENTS_SVG[k]).join('')}</svg>`;
    }
    // Render digits
    document.querySelectorAll('.digit').forEach(el => el.innerHTML = makeDigitSVG());

    function setDigit(id, num) {
        num = Math.max(0, Math.min(9, Math.floor(num)));
        const container = document.getElementById(id);
        if (!container) return;
        const segs = container.querySelectorAll('.segment');
        const map = DIGIT_MAP[num];
        segs.forEach((s, idx) => {
            if (map[idx]) s.classList.add('on'); else s.classList.remove('on');
        });
    }

    // Controls and state
    const minutesInput = document.getElementById('minutesInput');
    const secondsInput = document.getElementById('secondsInput');
    const setBtn = document.getElementById('setBtn');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const colon = document.getElementById('colon');
    const display = document.getElementById('display');

    let totalSeconds = parseInt(minutesInput.value || 0) * 60 + parseInt(secondsInput.value || 0);
    let initialSeconds = totalSeconds;
    let interval = null;
    let running = false;

    function renderTime(seconds) {
        seconds = Math.max(0, Math.floor(seconds));
        const mm = Math.floor(seconds / 60);
        const ss = seconds % 60;
        const d0 = Math.floor(mm / 10) % 10;
        const d1 = mm % 10;
        const d2 = Math.floor(ss / 10);
        const d3 = ss % 10;
        setDigit('d0', d0);
        setDigit('d1', d1);
        setDigit('d2', d2);
        setDigit('d3', d3);
    }

    function tick() {
        if (totalSeconds <= 0) {
            stop(true);
            return;
        }
        totalSeconds--;
        renderTime(totalSeconds);
    }

    function start() {
        if (running) return;
        if (totalSeconds <= 0) return;
        running = true;
        colon.classList.add('blink');
        interval = setInterval(tick, 1000);
    }
    function pause() {
        running = false;
        colon.classList.remove('blink');
        clearInterval(interval); interval = null;
    }
    function stop(timeUp = false) {
        pause();
        running = false;
        colon.classList.remove('blink');
        if (timeUp) {
            // flash display
            display.classList.add('flash');
            setTimeout(() => display.classList.remove('flash'), 3000);
        }
    }

    function reset() {
        pause();
        totalSeconds = initialSeconds;
        renderTime(totalSeconds);
    }

    // Buttons
    setBtn.addEventListener('click', () => {
        const m = Math.max(0, Math.min(99, parseInt(minutesInput.value || 0)));
        let s = Math.max(0, Math.min(59, parseInt(secondsInput.value || 0)));
        minutesInput.value = m; secondsInput.value = s;
        totalSeconds = m * 60 + s;
        initialSeconds = totalSeconds;
        renderTime(totalSeconds);
    });

    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    resetBtn.addEventListener('click', reset);

    // initialize
    renderTime(totalSeconds);

})();
