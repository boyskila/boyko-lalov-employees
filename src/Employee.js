function Employee(id, project) {
    this.id = id
    this.projects = {
        [project.id]: project, 
    }
    this.sharedDays = {}
    this.bestMatch = {
        ids: [],
        value: 0,
        projects: []
    }
}

Employee.prototype.getProjects = function() {
    return this.projects
}

Employee.prototype.getProjectById = function(id) {
    return this.projects[id]
}

Employee.prototype.saveBestResult = function(checkedEmployeeID) {
    if (this.sharedDays[checkedEmployeeID].value > this.bestMatch.value) {
        this.bestMatch.ids.splice(-1, 1)    
    }
    this.bestMatch.ids.push(checkedEmployeeID)
    this.bestMatch.value = this.sharedDays[checkedEmployeeID].value
}

Employee.prototype.setSharedDays = function(colleagueID, overlappedDaysPerProject, projectIDs) {
    if (this.sharedDays[colleagueID]) {
        this.sharedDays[colleagueID].value += overlappedDaysPerProject
        this.sharedDays[colleagueID].projects.push(...projectIDs)
    } else {
        this.sharedDays[colleagueID] = {
            value: overlappedDaysPerProject,
            projects: [projectIDs]
        }
    }
}

module.exports = Employee