import {TodoFactory} from '../api/todo-api';
import {CommonDisplayController} from './common-display-controller';

const TodoDisplayController = (() => {

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

        TodoFactory.createTodo(projectName,
            title, description, dueDate, chosenPrio);
        CommonDisplayController.removeActiveClass('new-todo-modal');
    }

    function createNewToDo() {
        let todoModal = document.getElementById('new-todo-modal');
        todoModal.classList.add('is-active');
    }


    function addListenerToCreateNewButton() {
        let createNewToDoBtn = document.getElementById('create-new-todo-btn');
        createNewToDoBtn.addEventListener('click', function() {
            createNewToDo();
        });
    }

    function addListenerToCancelCreateNewTodoBtn() {
        let cancelBtn = document.getElementById('cancel-create-todo');
        cancelBtn.classList.remove('is-active');
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


    function deleteTodo(todoId) {
        TodoFactory.deleteTodo(todoId)
        CommonDisplayController.closeDeleteModal('delete-todo-modal');
    }


    function addListenerToCloseDeleteTodoModal() {
        let closeBtn = document.getElementById('delete-todo-modal-cancel-btn');
        closeBtn.addEventListener('click', function() {CommonDisplayController.closeDeleteModal('delete-todo-modal')});
    }

    function openDetailModal(todo) {
        let sectionDetails = document.getElementById('section-details');
        sectionDetails.textContent = '';
        let p1 = document.createElement('p');
        p1.innerText = `Title: ${todo['title']}`;
        let p2 = document.createElement('p');
        p2.innerText = `Details: ${todo['description']}`;
        let p3 = document.createElement('p');
        p3.innerText = `Due Date: ${todo['duedate']}`;
        let p4 = document.createElement('p');
        p4.innerText = `Priority: ${todo['priority']}`;
        let p5 = document.createElement('p');
        p5.innerText = `Project Name: ${todo['projectName']}`;

        sectionDetails.appendChild(p1);
        sectionDetails.appendChild(p2);
        sectionDetails.appendChild(p3);
        sectionDetails.appendChild(p4);
        sectionDetails.appendChild(p5);

        let detailModal = document.getElementById('details-modal');
        detailModal.classList.add('is-active');
    }

    function addListenerToDisplayModalCloseBtn() {
        let btn = document.getElementById('detail-modal-close-btn');
        btn.addEventListener('click', function() {
            let detailModal = document.getElementById('details-modal');
            detailModal.classList.remove('is-active');
            let sectionDetails = document.getElementById('section-details');
            sectionDetails.textContent = '';
        });
    }

    function getTodosOfAProject(projectName) {
        return TodoFactory.getTodosOfAProject(projectName);
    }

    function getTodoDetails(todoId) {
        return TodoFactory.getTodoDetails(todoId);
    }


    return {
        addNewTask,
        addListenerToCreateNewButton,
        addListenerToCancelCreateNewTodoBtn,
        addListenerToPriorities,
        deleteTodo,
        addListenerToCloseDeleteTodoModal,
        openDetailModal,
        addListenerToDisplayModalCloseBtn,
        getTodosOfAProject,
        getTodoDetails
    }
})();

export {TodoDisplayController}