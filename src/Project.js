function Project(id, dateRange) {
    this.id = id
    this.datesRanges = [dateRange]
}

Project.prototype.getOverlappedDaysCount = function(otherProject) {
    let overlappedDays = 0
    for (let index = 0; index < this.datesRanges.length; index++) {
        const d1 = this.datesRanges[index]
        for (let index = 0; index < otherProject.datesRanges.length; index++) {
            const d2 = otherProject.datesRanges[index]
            overlappedDays += d1.getIntersectionDaysCount(d2)
        }
    }
    return overlappedDays;
}

module.exports = Project