const ul = document.querySelector('.checklist-content ul');

var tasks=JSON.parse(localStorage.getItem('tasks')) || []

var trashIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="delete-row" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" /><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" /></svg>'
function displayTasks() {
    ul.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement('li');
        if (tasks[i].strike) {
            li.classList.add('strike');
        }
        li.innerHTML = `<div class="task"> <span class="task-text">${tasks[i].text}</span><button class="delete-btn" onclick="deleteTask(this)">${trashIcon}</button></div > `
        ul.appendChild(li);
    }
}

displayTasks();

function deleteTask(button) {
    var delTask = button.parentNode.parentNode;
    let delText = delTask.querySelector('span').innerHTML;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].text == delText) {
            tasks.splice(i, 1);
            break;
        }
    }
    delTask.remove();
}

//Im so sorry for this

//dont shoot me please
ul.addEventListener('click', (event) => {
    let task = event.target.closest('li');
    try {
        let taskText = task.querySelector('span').textContent;
        console.log(task.closest('li'));
        tasks.forEach(elem => {
            if (elem.text == taskText) {
                if (!elem.strike) {
                    task.classList.add('strike');
                    elem.strike = 1;
                }
                else {
                    task.classList.remove('strike');
                    elem.strike = 0;
                }
            }
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    } catch (err) {
        console.log(err);
    }
});


function addTask(button) {
    try {
        var task = document.getElementById('newTask').value;
        if (task.length < 2) {
            alert('Enter a proper task.');
            return;
        }
        task = task.trim();
        
        tasks.push(
            {
                text: task,
                striked: 0
            });

        localStorage.setItem('tasks',JSON.stringify(tasks));    
        displayTasks();
    } catch (err) {
        alert('Enter a proper task.');
        console.log(err);
    }
}



