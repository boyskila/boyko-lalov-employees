const Employee = require('./Employee')
const DateRange = require('./DateRange')
const Project = require('./Project')

module.exports = (content) => {
    const employees = {}    
    const lines = (content).split('\n');
    lines.forEach((line, i) => {
        
        if (line.length > 1 && i > 0) {

            // remove all white spces
            line = line.replace(/\s+/g, '')
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