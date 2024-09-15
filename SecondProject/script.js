function showWorks() {
    let works = localStorage.getItem('works');
    works = works ? JSON.parse(works) : [];
    works.forEach(work => {
        createWork(work);
    });
}

function createWork(work) {
    let tasks = localStorage.getItem(work);
    tasks = tasks ? JSON.parse(tasks) : [];

    let taskBar = document.createElement('div');
    taskBar.className = 'taskBar';

    let taskName = document.createElement('h3');
    taskName.textContent = work;
    taskBar.appendChild(taskName);

    let deletefull = document.createElement('button');
    deletefull.textContent = 'Delete work';
    deletefull.onclick = () => deleteWork(work);
    taskBar.appendChild(deletefull);

    let addTask = document.createElement('div');
    addTask.className = 'addTask';

    let taskInput = document.createElement('input');
    taskInput.type = 'text';
    let submitTask = document.createElement('button');
    submitTask.textContent = 'Add task';
    submitTask.onclick = () => {
        if (taskInput.value) {
            let tasks = JSON.parse(localStorage.getItem(work)) || [];
            tasks.push(taskInput.value);
            localStorage.setItem(work, JSON.stringify(tasks));
            showTask(taskInput.value, taskBar.querySelector('ol'), work);
            taskInput.value = '';
        }
    };
    addTask.appendChild(taskInput);
    addTask.appendChild(submitTask);
    taskBar.appendChild(addTask);

    let tasksContainer = document.createElement('div');
    tasksContainer.className = 'tasks';
    let ol = document.createElement('ol');
    tasks.forEach(task => {
        showTask(task, ol, work);
    });
    tasksContainer.appendChild(ol);
    taskBar.appendChild(tasksContainer);

    document.getElementById('works').appendChild(taskBar);
}

function showTask(task, ol, work) {
    let taskItem = document.createElement('li');

    let chbtn = document.createElement('input');
    chbtn.type = 'checkbox';
    chbtn.onclick = (event) => finishTask(event, taskItem)
    taskItem.appendChild(chbtn);

    let content = document.createElement('span');
    content.textContent = task;
    taskItem.appendChild(content);

    let delbtn = document.createElement('button');
    delbtn.textContent = 'Delete';
    delbtn.onclick = () => deleteTask(task, work);
    taskItem.appendChild(delbtn);

    let upbtn = document.createElement('button');
    upbtn.textContent = 'Update';
    upbtn.onclick = () => showUpdate(task, work);
    taskItem.appendChild(upbtn);

    ol.appendChild(taskItem);
}

function deleteTask(task, work) {
    let tasks = JSON.parse(localStorage.getItem(work));
    tasks = tasks.filter(item => item !== task);
    localStorage.setItem(work, JSON.stringify(tasks));
    location.reload();
}

function addWork(event) {
    event.preventDefault();
    let workInput = document.getElementById('work-input');
    if (workInput.value !== '') {
        let works = JSON.parse(localStorage.getItem('works')) || [];
        works.push(workInput.value);
        localStorage.setItem('works', JSON.stringify(works));
        location.reload();
    }
}

function deleteWork(work) {
    let works = JSON.parse(localStorage.getItem('works'));
    works = works.filter(item => item !== work);
    localStorage.setItem('works', JSON.stringify(works));
    localStorage.removeItem(work);
    location.reload();
}

function showUpdate(task, work) {
    document.getElementById('overlay-container').style.display = 'flex';
    document.getElementById('update-input').value = task;
    document.getElementById('overlay-button').onclick = () => updateTask(task, work);
}

function updateTask(task, work) {
    let updated = document.getElementById('update-input').value;
    let tasks = JSON.parse(localStorage.getItem(work));
    tasks[tasks.indexOf(task)] = updated;
    localStorage.setItem(work, JSON.stringify(tasks));
    document.getElementById('overlay-container').style.display = 'none';
    location.reload();
}

function finishTask(event, li) {
    if (event.target.checked) {
        li.children[1].style.textDecoration = 'line-through';
    } else {
        li.children[1].style.textDecoration = 'none';
    }
}

function closeOverlay() {
document.getElementById('overlay-container').style.display='none';
}

window.onload = showWorks;
