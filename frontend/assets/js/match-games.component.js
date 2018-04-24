
  angular.module('izibets').component('matcheGamesComponent', {
    templateUrl: 'matcheGamesComponent.html',
    controller: MatcheGamesController,
    controllerAs: "gameCtrl"
  });

  function MatcheGamesController($scope, $element, $attrs, $http) {
    var ctrl = this;

    //functions
    ctrl.getMatcheList = getMatcheList;
  
    ctrl.$onInit() = function (){
        getMatcheList()
    };

    function getMatcheList(){
        
        $http({
            method: 'GET',
            url: '/someUrl'
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });

    }

    ctrl.list = [
      {
        name: 'Superman',
        location: ''
      },
      {
        name: 'Batman',
        location: 'Wayne Manor'
      }
    ];
  
    ctrl.updateHero = function(hero, prop, value) {
      hero[prop] = value;
    };
  
    ctrl.deleteHero = function(hero) {
      var idx = ctrl.list.indexOf(hero);
      if (idx >= 0) {
        ctrl.list.splice(idx, 1);
      }
    };
  }