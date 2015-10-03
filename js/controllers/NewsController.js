app.controller('NewsController', ['$scope', 'news', '$routeParams', function($scope, news, $routeParams) {
  news.success(function(data) {
    $scope.readmore = data.response.results[$routeParams.id];
    $scope.readmoreBody = data.response.results[$routeParams.id].fields.body;
  });
}]);