function EmployeesGrid(employees) {
    const html = [`
        <div class="columns-titles">
            <div class="column-title"><div class="truncate">Employee ID #1</div></div>
            <div class="column-title"><div class="truncate">Employee ID #2</div></div>
            <div class="column-title"><div class="truncate">Project IDs</div></div>
            <div class="column-title"><div class="truncate">Days Worked</div></div>
        </div>  
    `]
    console.log(employees);
    
    for (const key in employees) {
        const employee = employees[key]
        employee.bestMatch.ids.forEach(emp => {
            // remove duplicates
            if (employees[emp] && employees[emp].bestMatch.ids.length === 1 && employees[emp].bestMatch.ids[0] === employee.id) {
                delete employees[emp]
            }
        })
    }
    Object.keys(employees)
          .sort((a, b) => employees[b].bestMatch.value - employees[a].bestMatch.value)
          .map(key => employees[key])
          .forEach((employee) => {
                const bestMatchesIds = employee.bestMatch.ids;
                if (bestMatchesIds.length) {
                    const overlappedPlayersIds = bestMatchesIds.join(', ')
                    const uniqueProjectsFromList = [
                        ...new Set(
                            ...bestMatchesIds.map((e, i) => employee.sharedDays[bestMatchesIds[i]].projects)
                    )]
                    html.push(`
                        <div class="row">
                            <div class="row-item">${employee.id}</div>
                            <div class="row-item">${overlappedPlayersIds}</div>
                            <div class="row-item">${uniqueProjectsFromList.join(', ')}</div>
                            <div class="row-item">${employee.bestMatch.value}</div>
                        </div>`
                    )
                }
            })
    
    document.querySelector('#grid')
            .innerHTML = `<div class="rows-holder">${html.join('')}</div>`
    document.querySelector('.upload-wrapper')
            .classList
            .add('animated')
}