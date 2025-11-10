const ul = document.querySelector('.checklist-content ul');
const taskTexts = document.getElementsByClassName('task-text');
const form= document.querySelector('form');
console.log(form)
console.log(ul);
var tasks = [
    'Wash my bellay',
    'Commit tax fraud'
]
var trashIcon='<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="delete-row" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" /><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" /></svg>'
function displayTasks() {
    ul.innerHTML='';
    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `<div class="task"> <span class="task-text">${tasks[i]}</span><button class="delete-btn" onclick="deleteTask(this)">${trashIcon}</button></div > `
        ul.appendChild(li);
    }
}

displayTasks();

function deleteTask(button){
    var task= button.parentNode.parentNode;
    task.remove();
}

//Im so sorry for this
for(let i=0;i<taskTexts.length;i++){
    //dont shoot me please
    taskTexts[i].addEventListener('click',(event)=>{
        if(taskTexts[i].classList.length == 1)
            taskTexts[i].classList.add('strike');
            
        else
            taskTexts[i].classList.remove('strike');

    });
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    try{
        var task= document.getElementById('new-task').value;
        console.log(task);
        task=task.trim();
        tasks.push(task);
        displayTasks();
    } catch (err) {
        alert('bozo');
        console.log(err);
    }
    
});

