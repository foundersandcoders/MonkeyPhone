app.factory('news', ['$http', function($http) {
  return $http.get('http://content.guardianapis.com/search?q=technology&show-fields=all&api-key=test')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
