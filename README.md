# Salary Schedules

The City of Santa Monica publishes [employee salary schedules](http://www.smgov.net/Departments/HR/Employees/Employees.aspx)
in PDF format each fiscal year.

The aim of this project is to convert human-friendly PDF into machine-friendly JSON.

This project uses the [AGPL-licensed](http://www.gnu.org/licenses/agpl.html) Nuget package [iTextSharp](https://github.com/itext/itextsharp)
to read data as text from PDF documents.

See this branch in action on the [demo site](http://cityofsantamonica.github.io/SalarySchedules).

All data provided in this repository is licensed under the [Open Data Commons Attribution License (ODC-By) v1.0](./ODC-By).

The code in this repository is licensed under the [MIT license](./LICENSE).

## The Data

The `json` files under `/data` were generated by running the corresponding PDF through the [SalarySchedules.App](https://github.com/thekaveman/SalarySchedules/tree/master/SalarySchedules.App) console app.

### FY 10/11

Currently, the `json` file for FY 10/11 is unavailable due to a bug (still unknown) in the parser. As time allows, the bug will be resolved and `json` data for FY 10/11 will be made available.

### Data Definitions

Each `json` file corresponds to a single fiscal year's salary schedule. A salary schedule is made up of a number of components.

#### The date the schedule was generated

```json
"ReportRunDate": "2014-10-27T00:00:00"
```

#### The fiscal year of the schedule

A fiscal year is defined by its start and end dates, and a short code.

```json
"FiscalYear": {
  "StartDate": "2014-07-01T00:00:00",
  "EndDate": "2015-06-30T11:59:59",
  "ShortSpanCode": "14/15"
}
```

#### The bargaining units represented in the schedule

An individual bargaining unit is made up of its code and name.

```json
{
  "Code": "ATA",
  "Name": "Administrative Team Associates"
}
```

The salary schedule then has an array of bargaining units.

```json
"BargainingUnits": [{
  "Code": "ATA",
  "Name": "Administrative Team Associates"
}, ...]
```

#### The job classes represented in the schedule

A job class is composed of a title, code, grade, bargaining unit (from the above array), and one or more steps (up to a maximum of 5).

A step has a number, and the rate broken out by hourly, biweekly, monthly, and annual pay.

```json
{
  "StepNumber": 1,
  "HourlyRate": 29.80,
  "BiWeeklyRate": 2383.85,
  "MonthlyRate": 5165.00,
  "AnnualRate": 61980.00
}
```

The job class then has an array of steps, along with the other properties.

```json
{
  "Title": "Accountant-Collections",
  "Code": "1109",
  "Grade": "060",
  "BargainingUnit": {
    "Code": "ATA",
    "Name": "Administrative Team Associates"
  },
  "Steps": [{
    "StepNumber": 1,
    "HourlyRate": 29.80,
    "BiWeeklyRate": 2383.85,
    "MonthlyRate": 5165.00,
    "AnnualRate": 61980.00
  }, ...]
}
```

The schedule then has an array of these job classes

```json
"JobClasses": [{
  "Title": "Accountant-Collections",
  "Code": "1109",
  "Grade": "060",
  "BargainingUnit": {
    "Code": "ATA",
    "Name": "Administrative Team Associates"
  },
  "Steps": [
    //see above
  ]
}, ...]
```
