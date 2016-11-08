myApp = angular.module('myApp', ['ui.router', 'ngSanitize']);

require('./source/controllers/mainController.js');
require('./source/directives/directives.js');
require('./source/services/services.js');
require('./config.js');

