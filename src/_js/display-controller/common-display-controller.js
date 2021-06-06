const CommonDisplayController = (() => {

    function removeActiveClass(elementId) {
        let modal = document.getElementById(elementId);
        modal.classList.remove('is-active');
    }

    function resetTodoContainer() {
        let parentBlock = document.getElementById('parent-todo-container');
        parentBlock.textContent = '';
    }

    function resetDisplay() {
        let projectListElem = document.getElementById('project-list');
        let selectProject = document.getElementById('project');
       
        projectListElem.textContent = '';
        selectProject.textContent = '';
        resetTodoContainer();
    }


    function resetActiveProject(newActiveProject) {
        let activeProjects = document.getElementById('menu-list')
            .getElementsByClassName('is-active');
        
        for(let activeProj of activeProjects) {
            activeProj.classList.remove('is-active');
        }

        newActiveProject.classList.add('is-active');
    }


    function closeDeleteModal(modalId) {
        let deleteModal = document.getElementById(modalId);
        deleteModal.classList.remove('is-active');
    }

    function openDeleteModal(modalId) {
        let deleteModal = document.getElementById(modalId);
        deleteModal.classList.add('is-active');
    }

    return {
        removeActiveClass,
        resetDisplay,
        resetTodoContainer,
        resetActiveProject,
        closeDeleteModal,
        openDeleteModal

    }
})();

export {CommonDisplayController}