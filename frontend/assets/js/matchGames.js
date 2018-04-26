
 angular.module('izibets').component('matchGames', {
    templateUrl: '././matchGames.html',
    controller: matchGamesController,
    controllerAs: "gameCtrl"
  });

  function matchGamesController($scope, $element, $attrs, $http, gamesData) {
    var ctrl = this;

    //functions
    ctrl.getMatcheList = getMatcheList;
  
    ctrl.$onInit = function(){
        getMatcheList()
    };

    function getMatcheList(){
        
        console.log('gamesData',gamesData);
        ctrl.groups = gamesData.groups;

    }

  }