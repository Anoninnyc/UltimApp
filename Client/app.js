myApp = angular.module('myApp', ['ui.router', 'ngSanitize'])

require('./config.js');


require('./source/controllers/mainController.js');
require('./source/directives/directives.js');
require('./source/services/services.js');

window.onhashchange = function() { 
     console.log("HASHCHANGED!")
}

$(window).on('hashchange', function() {
 console.log("HASHCHANGED!")
});