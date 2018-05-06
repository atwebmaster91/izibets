angular.module('izibets').component('allGames', {
  templateUrl: '././allGames.html',
  controller: allGamesController,
  controllerAs: "allGamesCtrl"
});

allGamesController.$inject = ['$scope','$element','$attrs','$http','gamesData','$state'];

function allGamesController($scope, $element, $attrs, $http, gamesData, $state) {

  //variables
  var ctrl = this;
  ctrl.curent_date = new Date();

  //functions
  ctrl.getMatcheList = getMatcheList;
  ctrl.redirectToGamePage = redirectToGamePage;

  ctrl.$onInit = function () {
    getMatcheList()
  };

  function getMatcheList() {
    ctrl.matches = gamesData.matches;
    //
    setGamesStatusAndTeamsNames();
    console.log('gamesData', gamesData);
  }

  function setGamesStatusAndTeamsNames() {
    if (ctrl.matches && ctrl.matches.length > 0) {
      for (var i = 0; i < ctrl.matches.length; i++) {
        var match = ctrl.matches[i];
        match.home_team_name = gamesData.teams.find(x => x.id === match.home_team).name;
        match.away_team_name = gamesData.teams.find(x => x.id === match.away_team).name;
        //
        var matchDate = new Date(match.date);
        if (matchDate.getTime() < ctrl.curent_date.getTime()) {
          match.status = 'over';
        } else {
          match.status = 'done';
        }
      }
    }
    //sort the games
    ctrl.matches.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    });
  }

  function redirectToGamePage() {
    //
    $state.go('game');
  }

}