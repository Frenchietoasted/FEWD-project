document.addEventListener('DOMContentLoaded', () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    // self-explanatory
    const monthYear = document.getElementById('monthYear');
    const calendarWeekdays = document.getElementById('calendarWeekdays');
    const calendarDays = document.getElementById('calendarDays');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const inputEvent = document.getElementById('inputEvent');

    var current = new Date();

    // renders the weekday headers (sun mon tue ...)

    function renderWeekdays() {
        calendarWeekdays.innerHTML = '';
        weekdays.forEach(d => {
            const el = document.createElement('div');
            el.className = 'calendar_day weekday';
            el.textContent = d;
            calendarWeekdays.appendChild(el);
        });
    }

    // renders the title and the buttons and the days

    function renderMonth(date) {
        const today = new Date(); // to get todays date for highlighting
        const year = date.getFullYear();
        const month = date.getMonth();
        // title
        monthYear.textContent = `${monthNames[month]} ${year}`;

        calendarDays.innerHTML = '';

        const firstDayIndex = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, null).getDate();

        // fill leading blanks
        for (let i = 0; i < firstDayIndex; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar_day blank';
            calendarDays.appendChild(empty);
        }

        // fill actual dates
        for (let d = 1; d <= daysInMonth; d++) {
            const cell = document.createElement('div');
            cell.className = 'calendar_day day';
            cell.textContent = d;

            // if d is today, highlight it (d being the current date in the loop)
            if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                cell.classList.add('today');
            }

            calendarDays.appendChild(cell);
        }
    }

    // go back a month and re-render the calendar
    prevBtn.addEventListener('click', () => {
        current.setMonth(current.getMonth() - 1);
        renderMonth(current);
    });

    // go forward a month and re-render the calendar 
    nextBtn.addEventListener('click', () => {
        current.setMonth(current.getMonth() + 1);
        renderMonth(current);
    });

    function userEvent(day) {
        if (inputEvent.style.display == 'block') { alert('Finish entering the current event first!'); return 1; }
        inputEvent.style.display = 'block';
        inputEvent.focus();
        inputEvent.value = '';

        inputEvent.onkeydown = (e) => {
            if (e.key === 'Enter') {
                const eventText = inputEvent.value.trim();
                if (eventText) {
                    const eventBubble = document.createElement('div');
                    eventBubble.className = 'event_bubble';
                    eventBubble.textContent = eventText;
                    day.appendChild(eventBubble);
                }
                inputEvent.style.display = 'none';
            }
        };
        return 0;
    }

    calendarDays.addEventListener('click', (day) => {
        if (day.target.classList.contains('blank') || day.target.classList.contains('calendar_grid')) return;

        if (day.target.classList.contains('event')) {
            day.target.querySelector('.event_bubble')?.remove();
        } else {
            if (userEvent(day.target)) return;
        }
        day.target.classList.toggle('event');
    });


    // init
    renderWeekdays();
    renderMonth(current);
});