(function () {
  "use strict";

  angular
    .module("salaries.schedules", [])
    .component("salarySchedules", {
      controller: ["$filter", "$http", "$window", SalariesSchedulesController],
      templateUrl: "salary-schedules/index.html"
    });

  function SalariesSchedulesController($filter, $http, $window) {
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.data = {};
      ctrl.file = "";
      ctrl.reset();
    };

    ctrl.downloadData = function () {
      $window.open(ctrl.file);
    };
    
    ctrl.loadData = function () {
      ctrl.reset();
      $http.get(ctrl.file, { cache: true }).then(function (result) {
        ctrl.data = result.data;
      });
    };
    
    ctrl.loadJobs = function () {
      ctrl.jobs = [];
      angular.forEach(ctrl.units, function(unit) {
        var jobs = $filter("filter")(ctrl.data.JobClasses, { BargainingUnit: { Code : unit.Code } });
        ctrl.jobs = ctrl.jobs.concat(jobs);
      });
    };

    ctrl.reset = function () {
      ctrl.units = [];
      ctrl.jobs = [];
      ctrl.titleFilter = "";
    };
    
    ctrl.toggleUnit = function (unit) {
      var i = ctrl.units.indexOf(unit);
      if (i === -1) {
        ctrl.units.push(unit);
      }
      else {
        ctrl.units.splice(i, 1);
      }
    };
  }
})();
