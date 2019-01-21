
const bestMatchesFinder = (employees) => {
    const bestMatches = {
        value: 0,
        id: "",
        ids: {}
    };

    for (const processedEmployeeID in employees) {
        const processedEmployee = employees[processedEmployeeID]

        for (const checkedEmployeeID in employees) { // loop others
            const checkedEmployee = employees[checkedEmployeeID]

            // skip self
            if (processedEmployeeID !== checkedEmployeeID) {
                // try get value from its colleague if its already cached there
                if (checkedEmployee.sharedDays[processedEmployeeID]) {
                    processedEmployee.setSharedDays(
                        checkedEmployeeID,
                        checkedEmployee.sharedDays[processedEmployeeID].value,
                        checkedEmployee.sharedDays[processedEmployeeID].projects
                    )
                } else {

                    const processedEmployeeProjects = processedEmployee.projects;
    
                    for (const projectID in processedEmployeeProjects) {
                        const checkedEmployeeProject = checkedEmployee.projects[projectID]
    
                        // check whether checked employee is part of this project
                        if (checkedEmployeeProject) {
    
                            const processedEmployeeProject = processedEmployeeProjects[projectID]
    
                            // compare both projects how much overlaps (meassured in days)
                            const overlappedDaysPerProject = processedEmployeeProject.getOverlappedDaysCount(checkedEmployeeProject) // get overlapped days count
                            
                            if (overlappedDaysPerProject) {
                                processedEmployee.setSharedDays(checkedEmployeeID, overlappedDaysPerProject, [projectID])
                            }
                        }
                    }
                }
                // save best mach so far for this employee
                if (processedEmployee.sharedDays[checkedEmployeeID] && processedEmployee.sharedDays[checkedEmployeeID].value >= processedEmployee.bestMatch.value) {
                    processedEmployee.saveBestResult(checkedEmployeeID)
                }
            }

        }
        const processedEmployeeBestMatch = processedEmployee.bestMatch.value;
        // save best match so far for all users
        if (processedEmployeeBestMatch >= bestMatches.value) {
            if (processedEmployeeBestMatch > bestMatches.value) {
                delete bestMatches.ids[bestMatches.id]
            }
            bestMatches.ids[processedEmployeeID] = processedEmployee.bestMatch.ids
            bestMatches.value = processedEmployeeBestMatch
            bestMatches.id = processedEmployeeID
        }
    }

    return {
        bestMatches,
        employees
    }
}

module.exports = bestMatchesFinder