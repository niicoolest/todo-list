const Project = (function() {

    function createNewProject(projectName) {
        let projProps = {
            projectName: projectName,
            id: id
        }
        return new TodoProject(projProps);
    }

    class TodoProject {
        constructor(props) {
            this.projectName = props.projectName;
            this.id = props.id;
            this.todoList = [];
        }
    }

    return {
        createNewProject
    }

})();