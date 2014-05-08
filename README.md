#Salary Schedules

The City of Santa Monica publishes [employee salary schedules] (http://www.smgov.net/Departments/HR/Employees/Employees.aspx) in PDF format each fiscal year.

The aim of this project is to convert human-friendly PDF into machine-friendly JSON. 

This project uses the [AGPL] (http://www.gnu.org/licenses/agpl.html) Nuget package [iTextSharp] (http://sourceforge.net/projects/itextsharp/) to read data as text from PDF documents.

## gh-pages

This is a port of the .NET [`SalarySchedules.Web`](https://github.com/thekaveman/SalarySchedules/tree/master/SalarySchedules.Web) application into a simple HTML/JS only, github pages friendly, environment.
The json files under `/data` were generated using the [`SalarySchedules.App`](https://github.com/thekaveman/SalarySchedules/tree/master/SalarySchedules.App) console application.

See this branch in action on the [demo site](http://thekaveman.github.io/SalarySchedules).
