import {TodoFactory} from './api/todo-api';
import {ProjectFactory} from './api/project-api';

const DisplayController = (function() {
    function addNewProject() {
        let projectName = document.getElementById('project-name').value;

        createNewProject(projectName);
        removeActiveClass('new-project-modal');
        init();
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
        removeActiveClass('new-todo-modal');
        init();

    }


    function createProjectOption(projectName) {
        let projectOption = document.createElement('option');
        projectOption.innerText = projectName;
        projectOption.value = projectName;

        return projectOption;
    }

    function addListenerToHomeProject() {
        let homeProj = document.getElementById('home-project');
        let homeProjAnchor = document.getElementById('home-project-anchor');
        addListenerToProjectItem(homeProj, 'Home', homeProjAnchor);
    }

    function resetActiveProject(newActiveProject) {
        let activeProjects = document.getElementById('menu-list')
            .getElementsByClassName('is-active');
        
        for(let activeProj of activeProjects) {
            activeProj.classList.remove('is-active');
        }

        newActiveProject.classList.add('is-active');
        console.log(newActiveProject.classList);
    }

    function createProjectItem(project) {
        let projectElem = document.createElement('li');
        let anchor = document.createElement('a');
        let divInsideAnchor = document.createElement('div');
        let span1 = document.createElement('span');
        span1.innerText = project['projectName'];
        let span2 = document.createElement('span');
        let delBtn = document.createElement('button');
        delBtn.className = 'float-right';
        delBtn.id = project['id'];

        let trash = document.createElement('i');
        trash.className = 'fa fa-trash';
        delBtn.addEventListener('click', function() {
            openDeleteModal('delete-project-modal');
            addListenerToDeleteProject(project['id']);
        });

        delBtn.appendChild(trash);
        span2.appendChild(delBtn);

        divInsideAnchor.appendChild(span1);
        divInsideAnchor.appendChild(span2);

        anchor.appendChild(divInsideAnchor);

        projectElem.className = 'project';
        projectElem.appendChild(anchor);

        addListenerToProjectItem(projectElem, project['projectName'], 
            anchor);
        return projectElem;
    }

    function addListenerToProjectItem(projectElem, projectName, anchor) {
        projectElem.addEventListener('click', function() {
            resetTodoContainer();
            displayIndividualTodo(projectName);
            resetActiveProject(anchor);
        });
            
    }

    function createNewToDo() {
        let todoModal = document.getElementById('new-todo-modal');
        todoModal.classList.add('is-active');
    }

    function createNewProject() {
        let projectModal = document.getElementById('new-project-modal');
        projectModal.classList.add('is-active');
    }

    function removeActiveClass(elementId) {
        let modal = document.getElementById(elementId);
        modal.classList.remove('is-active');
    }

    function addListeners() {
        addListenerToCreateNewButton();
        addListenerToCreateProjectButton();
        addListenerToCancelCreateNewTodoBtn();
        addListenerToCancelCreateNewProjectBtn();
        addListenerToCreateNewToDoSubmitBtn();
        addListenerToCreateNewProjectSubmitBtn();
        addListenerToPriorities();
        addListenerToDisplayModalCloseBtn();
        addListenerToCloseDelete();
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
        init();
    }

    function addListenerToCreateNewProjectSubmitBtn() {
        let submitBtn = document.getElementById('submit-create-project');
        submitBtn.addEventListener('click', addNewProject);
        init();
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

    function displayIndividualTodo(projectName) {
        let todos = TodoFactory.getTodosOfAProject(projectName);
        
        let parentBlock = document.getElementById('parent-todo-container');
        todos.forEach(todo => {
            parentBlock.appendChild(createTodoElement(todo['title'], 
                todo['priority'], todo['id'], todo['duedate']));
        });
    }

    function createTodoElement(title, priority, id, dueDate) {
        let todoItemPanel = document.createElement('div');
        todoItemPanel.setAttribute('class', 'panel-block todo-item');
        todoItemPanel.id = id;

        if(priority == "High") {
            todoItemPanel.classList.add('todo-item-green');
        } else if (priority == "Normal") {
            todoItemPanel.classList.add('todo-item-blue');
        } else if(priority == "Low") {
            todoItemPanel.classList.add('todo-item-yellow');
        }

        let inputCheckBox = document.createElement('i');
        inputCheckBox.setAttribute('class', 'fa fa-check');

        let labelItem = document.createElement('label');

        let todoTitleElem = document.createElement('span');
        todoTitleElem.className = 'title is-3';
        todoTitleElem.innerText = `  ${title}\n`;

        let dueDateElem = document.createElement('span');
        dueDateElem.innerText = `Due at ${dueDate}`;

        labelItem.appendChild(inputCheckBox);
        labelItem.appendChild(todoTitleElem);
        labelItem.appendChild(dueDateElem);
        

        let buttonGroup = document.createElement('div');
        buttonGroup.setAttribute('class', 'field is-grouped add-button buttons are-small');
        
        let eyeButton = createDetailsButton(id);
        let trashButton = createDeleteTodoBtn(id);

        buttonGroup.appendChild(eyeButton);
        buttonGroup.appendChild(trashButton);

        todoItemPanel.appendChild(labelItem);
        todoItemPanel.appendChild(buttonGroup);

        return todoItemPanel;
    }

    function createDeleteTodoBtn(todoId) {
        let btn = document.createElement('button');
        btn.className = 'button';
        btn.setAttribute('type', 'button');

        let icon = document.createElement('i');
        icon.setAttribute('class', 'fa fa-trash');
        btn.appendChild(icon);

        btn.addEventListener('click', function() {
            openDeleteModal('delete-todo-modal');
            addListenerToDeleteTodo(todoId);
        });

        return btn;
    }

    function createDetailsButton(todoId) {
        let btn = document.createElement('button');
        btn.className = 'button';
        btn.setAttribute('type', 'button');

        let icon = document.createElement('i');
        icon.setAttribute('class', 'fa fa-eye');
        btn.appendChild(icon);

        let todo = TodoFactory.getTodoDetails(todoId);
        btn.addEventListener('click', function() {
            openDetailModal(todo);
        });

        return btn;
    }

    function openDeleteModal(modalId) {
        let deleteModal = document.getElementById(modalId);
        deleteModal.classList.add('is-active');
    }

    function addListenerToDeleteTodo(todoId) {
        let deleteTodoBtn = document.getElementById('delete-todo-modal-btn');
        deleteTodoBtn.removeEventListener('click', function() {deleteTodo(todoId)});
        deleteTodoBtn.addEventListener('click', function() {deleteTodo(todoId)});
    }


    function addListenerToDeleteProject(projectId) {
        let deleteProjectBtn = document.getElementById('delete-project-modal-btn');
        deleteProjectBtn.removeEventListener('click', function() {deleteProject(projectId)});
        deleteProjectBtn.addEventListener('click', function() {deleteProject(projectId)});
    }

    function deleteTodo(todoId) {
        TodoFactory.deleteTodo(todoId)
        closeDeleteModal('delete-todo-modal');
        init();
    }

    function deleteProject(projectId) {
        ProjectFactory.deleteProject(projectId);
        closeDeleteModal('delete-project-modal');
        init();
    }

    function addListenerToCloseDelete() {
        let closeBtn = document.getElementById('delete-todo-modal-cancel-btn');
        closeBtn.addEventListener('click', function() {closeDeleteModal('delete-todo-modal')});
    }


    function addListenerToCloseDelete() {
        let closeBtn = document.getElementById('delete-project-modal-cancel-btn');
        closeBtn.addEventListener('click', function() {closeDeleteModal('delete-project-modal')});
    }

    function closeDeleteModal(modalId) {
        let deleteModal = document.getElementById(modalId);
        deleteModal.classList.remove('is-active');
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

    function addNewProject() {
        let projectName = document.getElementById('project-name').value;

        ProjectFactory.createNewProject(projectName);
        removeActiveClass('new-project-modal');
        init();
    }

    function createNewProject() {
        let projectModal = document.getElementById('new-project-modal');
        projectModal.classList.add('is-active');
    }

    function addListenerToCreateNewProjectSubmitBtn() {
        let submitBtn = document.getElementById('submit-create-project');
        submitBtn.addEventListener('click', addNewProject);
        init();
    }

    function displayProjectList() {
        let projects = ProjectFactory.getProjects();
        let projectListElem = document.getElementById('project-list');
        let selectProject = document.getElementById('project');
        selectProject.appendChild(createProjectOption('Home'));
        addListenerToHomeProject();

        projects.forEach((item) => {
            projectListElem.appendChild(createProjectItem(item));
            selectProject.appendChild(createProjectOption(item['projectName']));
        });
        
    }

    function createProjectOption(projectName) {
        let projectOption = document.createElement('option');
        projectOption.innerText = projectName;
        projectOption.value = projectName;

        return projectOption;
    }

    function createProjectItem(project) {
        let projectElem = document.createElement('li');
        let anchor = document.createElement('a');
        let divInsideAnchor = document.createElement('div');
        let span1 = document.createElement('span');
        span1.innerText = project['projectName'];
        let span2 = document.createElement('span');
        let delBtn = document.createElement('button');
        delBtn.className = 'float-right';
        delBtn.id = project['id'];

        let trash = document.createElement('i');
        trash.className = 'fa fa-trash';
        delBtn.addEventListener('click', function() {
            openDeleteModal('delete-project-modal');
            addListenerToDeleteProject(project['id']);
        });

        delBtn.appendChild(trash);
        span2.appendChild(delBtn);

        divInsideAnchor.appendChild(span1);
        divInsideAnchor.appendChild(span2);

        anchor.appendChild(divInsideAnchor);

        projectElem.className = 'project';
        projectElem.appendChild(anchor);

        addListenerToProjectItem(projectElem, project['projectName'], 
            anchor);
        return projectElem;
    }

    function openDeleteModal(modalId) {
        let deleteModal = document.getElementById(modalId);
        deleteModal.classList.add('is-active');
    }


    function addListenerToProjectItem(projectElem, projectName, anchor) {
        projectElem.addEventListener('click', function() {
            resetTodoContainer();
            displayIndividualTodo(projectName);
            resetActiveProject(anchor);
        });       
    }

    function addListenerToDeleteProject(projectId) {
        let deleteProjectBtn = document.getElementById('delete-project-modal-btn');
        deleteProjectBtn.removeEventListener('click', function() {deleteProject(projectId)});
        deleteProjectBtn.addEventListener('click', function() {deleteProject(projectId)});
    }


    function deleteProject(projectId) {
        ProjectFactory.deleteProject(projectId);
        closeDeleteModal('delete-project-modal');
        init();
    }

    function closeDeleteModal(modalId) {
        let deleteModal = document.getElementById(modalId);
        deleteModal.classList.remove('is-active');
    }

    function addListenerToCreateProjectButton() {
        let createNewProjectBtn = document.getElementById('create-new-project-btn');
        createNewProjectBtn.addEventListener('click', function() {
            createNewProject();
        });
    }


    function addListenerToCancelCreateNewProjectBtn() {
        let cancelBtn = document.getElementById('cancel-create-project');
        cancelBtn.classList.remove('is-active');
    }

    function resetDisplay() {
        let projectListElem = document.getElementById('project-list');
        let selectProject = document.getElementById('project');
       
        projectListElem.textContent = '';
        selectProject.textContent = '';
        resetTodoContainer();
    }

    function resetTodoContainer() {
        let parentBlock = document.getElementById('parent-todo-container');
        parentBlock.textContent = '';
    }

    function init() {
        resetDisplay();
        displayProjectList();
        displayIndividualTodo('Home');
    }

    return {
        addListeners,
        init,
        createNewToDo,
        createNewProject,
    }
})();

export {DisplayController};