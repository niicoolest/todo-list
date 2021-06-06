import { ProjectDisplayController } from './display-controller/project-display-controller';
import {CommonDisplayController} from './display-controller/common-display-controller';
import {TodoDisplayController} from './display-controller/todo-display-controller';

const DisplayController = (function() {

    function addNewTask() {
        TodoDisplayController.addNewTask();
        init();
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
            CommonDisplayController.openDeleteModal('delete-project-modal');
            addListenerToDeleteProject(project['id']);
        });

        delBtn.appendChild(trash);
        span2.appendChild(delBtn);

        divInsideAnchor.appendChild(span1);
        divInsideAnchor.appendChild(span2);

        anchor.appendChild(divInsideAnchor);

        projectElem.className = 'project';
        projectElem.appendChild(anchor);

        ProjectDisplayController.addListenerToProjectItem(projectElem, project['projectName'], 
            anchor, displayIndividualTodo);
        return projectElem;
    }

    function addListeners() {
        TodoDisplayController.addListenerToCreateNewButton();
        ProjectDisplayController.addListenerToCreateProjectButton();
        TodoDisplayController.addListenerToCancelCreateNewTodoBtn();
        ProjectDisplayController.addListenerToCancelCreateNewProjectBtn();
        addListenerToCreateNewToDoSubmitBtn();
        addListenerToCreateNewProjectSubmitBtn();
        TodoDisplayController.addListenerToPriorities();
        TodoDisplayController.addListenerToDisplayModalCloseBtn();
        ProjectDisplayController.addListenerToCloseDeleteProjectModal();
        TodoDisplayController.addListenerToCloseDeleteTodoModal();
    }

    function addListenerToCreateNewToDoSubmitBtn() {
        let submitBtn = document.getElementById('submit-create-todo');
        submitBtn.addEventListener('click', addNewTask);
        init();
    }

    function addListenerToCreateNewProjectSubmitBtn() {
        let submitBtn = document.getElementById('submit-create-project');
        submitBtn.addEventListener('click', function() {
            ProjectDisplayController.addNewProject();
            init();
        });
        init();
    }

    function displayIndividualTodo(projectName) {
        let todos = TodoDisplayController.getTodosOfAProject(projectName);
        
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
            CommonDisplayController.openDeleteModal('delete-todo-modal');
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

        let todo = TodoDisplayController.getTodoDetails(todoId);
        btn.addEventListener('click', function() {
            TodoDisplayController.openDetailModal(todo);
        });

        return btn;
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
        TodoDisplayController.deleteTodo(todoId)
        init();
    }


    function displayProjectList() {
        let projects = ProjectDisplayController.getProjects();
        let projectListElem = document.getElementById('project-list');
        let selectProject = document.getElementById('project');
        selectProject.appendChild(ProjectDisplayController.createProjectOption('Home'));
        ProjectDisplayController.addListenerToHomeProject(
            displayIndividualTodo);

        projects.forEach((item) => {
            projectListElem.appendChild(createProjectItem(item));
            selectProject.appendChild(ProjectDisplayController.createProjectOption(item['projectName']));
        });
        
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
            CommonDisplayController.openDeleteModal('delete-project-modal');
            addListenerToDeleteProject(project['id']);
        });

        delBtn.appendChild(trash);
        span2.appendChild(delBtn);

        divInsideAnchor.appendChild(span1);
        divInsideAnchor.appendChild(span2);

        anchor.appendChild(divInsideAnchor);

        projectElem.className = 'project';
        projectElem.appendChild(anchor);

        ProjectDisplayController.addListenerToProjectItem(projectElem, project['projectName'], 
            anchor, displayIndividualTodo);
        return projectElem;
    }

    function addListenerToDeleteProject(projectId) {
        let deleteProjectBtn = document.getElementById('delete-project-modal-btn');
        deleteProjectBtn.removeEventListener('click', function() {deleteProject(projectId)});
        deleteProjectBtn.addEventListener('click', function() {deleteProject(projectId)});
    }


    function deleteProject(projectId) {
        ProjectDisplayController.deleteProject(projectId);
        init();
    }

    function init() {
        CommonDisplayController.resetDisplay();
        displayProjectList();
        displayIndividualTodo('Home');
    }

    return {
        addListeners,
        init
    }
})();

export {DisplayController};