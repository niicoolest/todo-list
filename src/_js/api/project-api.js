import {storage} from '../storage';
import {id} from '../util';

const ProjectFactory = (function() {

    function createNewProject(projectName) {
        let projProps = {
            projectName: projectName,
            id: id()
        }

        storage.addNewProjectToStorage(new TodoProject(projProps));
    }

    function getProjects() {
        return storage.getProjectItems();
    }

    function deleteProject(projectId) {
        storage.deleteProject(projectId);
    }

    class TodoProject {
        constructor(props) {
            this.projectName = props.projectName;
            this.id = props.id;
        }
    }

    return {
        createNewProject,
        getProjects,
        deleteProject
    }

})();

export {ProjectFactory}