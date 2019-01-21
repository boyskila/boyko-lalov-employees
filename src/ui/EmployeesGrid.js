function EmployeesGrid(employees) {
    const html = [`
        <div class="columns-titles">
            <div class="column-title"><div class="truncate">Employee ID #1</div></div>
            <div class="column-title"><div class="truncate">Employee ID #2</div></div>
            <div class="column-title"><div class="truncate">Project IDs</div></div>
            <div class="column-title"><div class="truncate">Days Worked</div></div>
        </div>  
    `]
    employees.forEach((employee) => {
        const projects = employee.bestMatch
                                    .ids
                                    .map((e, i) => employee.sharedDays[employee.bestMatch.ids[i]].projects)
        const overlappedPlayersIds = employee.bestMatch.ids.join(', ')
        html.push(`
            <div class="row">
                <div class="row-item">${employee.id}</div>
                <div class="row-item">${overlappedPlayersIds}</div>
                <div class="row-item">${projects.join(', ')}</div>
                <div class="row-item">${employee.bestMatch.value}</div>
            </div>`
        )
    })
    
    document.querySelector('#grid')
            .innerHTML = `<div class="rows-holder">${html.join('')}</div>`
    document.querySelector('.upload-wrapper')
            .classList
            .add('animated')
}