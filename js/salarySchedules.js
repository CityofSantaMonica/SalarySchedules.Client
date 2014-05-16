function SalaryScheduleApp($target) {

    //knockout view models

    function salaryScheduleViewModel() {
        var self = this;

        self.BargainingUnits = ko.observableArray().extend({ rateLimit: 50 });
        self.FiscalYear = ko.observable();        
        self.JobClasses = ko.observableArray().extend({ rateLimit: 50 });
        self.ReportRunDate = ko.observable();
        self.TitleFilter = ko.observable();
        self.BargainingUnitsFilter = ko.observable();
        self.FilteredResultsCount = ko.observable(-1);

        self.FilteredJobClasses = ko.computed(function () {
            var title = self.TitleFilter() || "",
                bu = self.BargainingUnitsFilter() || "";

            if (title || bu) {
                var toKeep = ko.utils.arrayFilter(self.JobClasses(), function (jc) {
                    var keep = true;
                    
                    if (title)
                        keep = keep && (jc.Title().toLowerCase().indexOf(title.toLowerCase()) > -1);

                    if (bu)
                        keep = keep && (jc.BargainingUnit && jc.BargainingUnit.Code && jc.BargainingUnit.Code() && jc.BargainingUnit.Code().toLowerCase() === bu.toLowerCase());

                    return keep;
                });

                self.FilteredResultsCount(toKeep.length);

                return toKeep;
            }
            else {
                self.FilteredResultsCount(-1);
                return self.JobClasses();
            }
        });
        
        self.FiscalYearLabel = ko.computed(function () {
            return self.FiscalYear() ? "FY " + self.FiscalYear().ShortSpanCode : "No Fiscal Year";
        });
       
        self.ResultsCountMessage = ko.computed(function () {
            var count = self.FilteredResultsCount();
            
            if (count == 0)
                return "(no results)";
            else if (count == 1)
                return "(1 result)";
            else if (count > 1)
                return "(" + count + " results)";
            else
                return "";
        });

        self.FilterByBargainingUnit = function (bu) {
            self.BargainingUnitsFilter(bu.Code || "");
        };        
       
        self.Initialize = function (data) {
            self.ReportRunDate(data.ReportRunDate);
            self.FiscalYear(data.FiscalYear);
            
			self.BargainingUnits([]);
			
            $.each(data.BargainingUnits, function (i, e) {
                self.BargainingUnits.push(e);
            });

			self.JobClasses([]);
			
            $.each(data.JobClasses, function (i, e) {
                self.JobClasses.push(new jobClassViewModel(e));
            });
			
			self.TitleFilter("");
			self.BargainingUnitsFilter("");
        };
    };

    function jobClassViewModel(jobClassData) {
        var self = this;
        var mapping = {
            "Steps": {
                create: function (options) {
                    return new jobClassStepViewModel(options.data);
                }
            }
        };

        ko.mapping.fromJS(jobClassData, mapping, self);
    };

    function jobClassStepViewModel(jobClassStepData) {
        var self = this;
        
        self.Hourly =  ko.computed(function () {
           return self.HourlyRate() ? self.HourlyRate().toFixed(2) : "0.00";
        });
        
        self.BiWeekly =  ko.computed(function () {
           return self.BiWeeklyRate() ? self.BiWeeklyRate().toFixed(2) : "0.00";
        });
        
        self.Monthly =  ko.computed(function () {
           return self.MonthlyRate() ? self.MonthlyRate().toFixed(2) : "0.00";
        });
        
        self.Annual =  ko.computed(function () {
           return self.AnnualRate() ? self.AnnualRate().toFixed(2) : "0.00";
        });
        
        ko.mapping.fromJS(jobClassStepData, {}, self);
    };
    
    function loadComplete(data, callback) {
        rebind(data);
        
        if (callback)
            callback();
            
        $target.fadeIn();
    };

    var rebind = function (data) {
        viewModel.Initialize(data);
        
        if (!bound) {
            ko.applyBindings(viewModel);
            bound = true;
        }
    };

    var loadedData = {},
        viewModel = new salaryScheduleViewModel(),
        bound = false;

    //the public interface
    
    this.loadScheduleData = function (filePath, callback) {
        $target.fadeOut();

        if (loadedData[filePath]) {
            loadComplete(loadedData[filePath], callback);
        }
        else {
            $.ajax({
                type: "GET",
                url: filePath,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.d) data = data.d;
                    loadedData[filePath] = data;
                    loadComplete(data, callback);
                },
                error: function (e) {
                    console.log(e);
                },
            });
        }

        return false;
    };
};

$(function () {
    var $dataContainer = $("#data"),
        $loader = $("#loader"),
        app = new SalaryScheduleApp($dataContainer);
    
    $("#explore").on("click", function (e) {
        $loader.show();
        e.preventDefault();
        var filePath = $("#YearSelect").val();
        app.loadScheduleData(filePath, function () {
            window.setTimeout(function () { $loader.hide(); }, 250);            
        });
    });
	
	$("#download").on("click", function(e) {
		e.preventDefault();
		var filePath = $("#YearSelect").val();
		window.open(filePath);
	});

    $("td.code a").on("click", function () {
        $(this).parent("tr").addClass("selected");
    });
});
