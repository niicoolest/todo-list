import {ProjectFactory} from '../api/project-api';
import {CommonDisplayController} from './common-display-controller';

const ProjectDisplayController = (() => {
    function addNewProject() {
        let projectName = document.getElementById('project-name').value;

        ProjectFactory.createNewProject(projectName);
        CommonDisplayController.removeActiveClass('new-project-modal');
    }

    function createProjectOption(projectName) {
        let projectOption = document.createElement('option');
        projectOption.innerText = projectName;
        projectOption.value = projectName;

        return projectOption;
    }


    function addListenerToHomeProject(displayIndividualTodo) {
        let homeProj = document.getElementById('home-project');
        let homeProjAnchor = document.getElementById('home-project-anchor');
        addListenerToProjectItem(homeProj, 'Home', homeProjAnchor, displayIndividualTodo);
    }


    function addListenerToProjectItem(projectElem, projectName, anchor, displayIndividualTodo) {
        projectElem.addEventListener('click', function() {
            CommonDisplayController.resetTodoContainer();
            displayIndividualTodo(projectName);
            CommonDisplayController.resetActiveProject(anchor);
        });       
    }


    function createNewProject() {
        let projectModal = document.getElementById('new-project-modal');
        projectModal.classList.add('is-active');
    }


    function addListenerToCreateProjectButton() {
        let createNewProjectBtn = document.getElementById('create-new-project-btn');
        createNewProjectBtn.addEventListener('click', function() {
            createNewProject();
        });
    }

    function deleteProject(projectId) {
        ProjectFactory.deleteProject(projectId);
        CommonDisplayController.closeDeleteModal('delete-project-modal');
    }

    function addListenerToCloseDeleteProjectModal() {
        let closeBtn = document.getElementById('delete-project-modal-cancel-btn');
        closeBtn.addEventListener('click', function() {
            CommonDisplayController.closeDeleteModal('delete-project-modal')
        });
    }

    function addListenerToCancelCreateNewProjectBtn() {
        let cancelBtn = document.getElementById('cancel-create-project');
        cancelBtn.classList.remove('is-active');
    }

    function getProjects() {
        return ProjectFactory.getProjects();
    }

    return {
       addNewProject,
       addListenerToHomeProject,
       addListenerToProjectItem,
       createProjectOption,
       createNewProject,
       addListenerToCreateProjectButton,
       deleteProject,
       addListenerToCloseDeleteProjectModal,
       addListenerToCancelCreateNewProjectBtn,
       getProjects
    }
})();

export {ProjectDisplayController}