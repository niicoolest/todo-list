import {TodoFactory} from './todo-factory';
import {ProjectFactory} from './project-factory';

const DisplayController = (function() {
    function addNewProject() {
        let projectName = document.getElementById('project-name').value;

        console.log(projectName);
        ProjectFactory.createNewProject(projectName);
    }

    function addNewTask() {
        let title = document.getElementById('title').value;
        let projectName = document.getElementById('project').value;
        let description = document.getElementById("details").value;
        let dueDate = document.getElementById('duedate').value;
        let priority = document.getElementsByClassName('priority-option');
        let chosenPrio = '';
        for(let i = 0; i < priority.length; i++) {
            if(priority[i].classList.contains('is-selected')) {
                chosenPrio = priority[i].innerText;
            }
        }

        console.log(title, projectName, description, dueDate, chosenPrio);
        TodoFactory.createTodo(projectName,
            title, description, dueDate, chosenPrio);

    }

    function getNewTodoListInputs() {
        
    }

    function createNewToDo() {
        let todoModal = document.getElementById('new-todo-modal');
        todoModal.classList.add('is-active');
    }

    function createNewProject() {
        let projectModal = document.getElementById('new-project-modal');
        projectModal.classList.add('is-active');
    }

    function addListeners() {
        addListenerToCreateNewButton();
        addListenerToCreateProjectButton();
        addListenerToCancelCreateNewTodoBtn();
        addListenerToCancelCreateNewProjectBtn();
        addListenerToCreateNewToDoSubmitBtn();
        addListenerToCreateNewProjectSubmitBtn();
        addListenerToPriorities();
    }

    function addListenerToCreateNewButton() {
        let createNewToDoBtn = document.getElementById('create-new-todo-btn');
        createNewToDoBtn.addEventListener('click', function() {
            createNewToDo();
        });
    }

    function addListenerToCreateProjectButton() {
        let createNewProjectBtn = document.getElementById('create-new-project-btn');
        createNewProjectBtn.addEventListener('click', function() {
            createNewProject();
        });
    }

    function addListenerToCancelCreateNewTodoBtn() {
        let cancelBtn = document.getElementById('cancel-create-todo');
        cancelBtn.classList.remove('is-active');
    }

    function addListenerToCancelCreateNewProjectBtn() {
        let cancelBtn = document.getElementById('cancel-create-project');
        cancelBtn.classList.remove('is-active');
    }

    function addListenerToCreateNewToDoSubmitBtn() {
        let submitBtn = document.getElementById('submit-create-todo');
        submitBtn.addEventListener('click', addNewTask);
    }

    function addListenerToCreateNewProjectSubmitBtn() {
        let submitBtn = document.getElementById('submit-create-project');
        submitBtn.addEventListener('click', addNewProject);
    }

    function addListenerToPriorities() {
        let priorities = document.getElementsByClassName('priority-option');
        let highButton = priorities[0];
        let normalButton = priorities[1];
        let lowButton = priorities[2];
        
        highButton.addEventListener('click', function() {
            if(!highButton.classList.contains('is-selected')) {
                highButton.classList.add('is-selected', 'is-success');
            }

            lowButton.classList.remove('is-selected', 'is-warning');
            normalButton.classList.remove('is-selected', 'is-info');
        });


        normalButton.addEventListener('click', function() {
            if(!normalButton.classList.contains('is-selected')) {
                normalButton.classList.add('is-selected', 'is-info');
            }

            lowButton.classList.remove('is-selected', 'is-warning');
            highButton.classList.remove('is-selected', 'is-success');
        });


        lowButton.addEventListener('click', function() {
            if(!lowButton.classList.contains('is-selected')) {
                lowButton.classList.add('is-selected', 'is-warning');
            }

            highButton.classList.remove('is-selected', 'is-success');
            normalButton.classList.remove('is-selected', 'is-info');
        });

    }

    return {
        addListeners,
        createNewToDo,
        createNewProject,
    }
})();

export {DisplayController};