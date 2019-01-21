const CONSTANTS = require('./constants')

function DateRange(startDate, endDate) {
    this.start = Date.parse(startDate)
    this.end = endDate.trim() === CONSTANTS.NOW ? Date.now() : Date.parse(endDate)
    if (this.start > this.end) {
        throw new Error('Invalid date range --> start date should be before end date')
    }
}

DateRange.prototype.getIntersectionDaysCount = function(dateTwo) {
    const hasIntersection = this.start <= dateTwo.end && this.end >= dateTwo.start
    if (!hasIntersection) {
        // console.log("No overlaping days were detected");
        return 0
    }
    const start = Math.max(this.start, dateTwo.start)
    const end = Math.min(this.end, dateTwo.end)
    
    return Math.round((end - start) / CONSTANTS.ONE_DAY)
}

DateRange.prototype.getDays = function() {
    return Math.ceil(Math.abs(this.start - this.end) / CONSTANTS.ONE_DAY)
}

module.exports = DateRange