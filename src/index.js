import {DisplayController} from './_js/DisplayController';

const App = (() => {
    function init() {
        DisplayController.addListeners();
    }

    return {
        init
    }
})();

App.init();
