const Employee = require('./Employee')
const DateRange = require('./DateRange')
const Project = require('./Project')

module.exports = (content) => {
    const employees = {}
    const lines = (content).split('\n');
    
    lines.forEach((line) => {
        line = line.replace(/\s+/g, '')

        if (line.length) {
            // remove all white spaces
            const rowSplited = line.split(",")

            const [ employeeId, projectId, dateFrom, dateTo ] = rowSplited;

            const dateRange = new DateRange(dateFrom, dateTo)
            const employee = employees[employeeId]

            if (employee) {
                const project = employee.projects[projectId]
                if (project) {
                    project.datesRanges.push(dateRange)
                } else {
                    employee.projects[projectId] = new Project(projectId, dateRange)
                }
            } else {
                employees[employeeId] = new Employee(employeeId, new Project(projectId, dateRange))
            }

        }
    });


    return employees;
}
