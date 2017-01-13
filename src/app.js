(function () {
  "use strict";

  angular
    .module("salaries", [])
    .component("salarySchedules", {
      controller: ["$filter", "$http", "$window", SalariesSchedulesController],
      templateUrl: "salary-schedules.html"
    });

  function SalariesSchedulesController($filter, $http, $window) {
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.data = {};
      ctrl.file = "";
      ctrl.jobs = [];
      ctrl.titleFilter = "";
    };

    ctrl.load = function () {
      $http.get(ctrl.file, { cache: true }).then(function (result) {
        ctrl.data = result.data;
      });
    };

    ctrl.loadJobs = function (bargainingUnit) {
      ctrl.jobs = $filter("filter")(ctrl.data.JobClasses, { BargainingUnit: { Code : bargainingUnit } });
    };

    ctrl.view = function () {
      $window.open(ctrl.file);
    };
  }
})();