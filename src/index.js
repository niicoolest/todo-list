import {DisplayController} from './_js/DisplayController';

const App = (() => {
    function init() {
        addListeners();
    }

    function addListeners() {
        addListenerToCreateNewButton();
        addListenerToCreateProjectButton();
    }

    function addListenerToCreateNewButton() {
        let createNewToDoBtn = document.getElementById('create-new-todo-btn');
        createNewToDoBtn.addEventListener('click', function() {
            DisplayController.createNewToDo();
        });
    }

    function addListenerToCreateProjectButton() {
        let createNewProjectBtn = document.getElementById('create-new-project-btn');
        createNewProjectBtn.addEventListener('click', function() {
            DisplayController.createNewProject();
        });
    }

    return {
        init
    }
})();

App.init();
