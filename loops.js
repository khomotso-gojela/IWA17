const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

const createArray = (length) => {
    const result = []

    for (let i = 0; i < length; i++) {
        result.push(i)
    }

    return result
}

const createData = () => {
    const current = new Date();
    //current.set(1)
    const startDay = new Date(current.getFullYear(), current.getMonth(), 1).getDay();
    const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
    
    const weeks = createArray(5)
    const days = createArray(7)
    const result = [];

    for (const weekIndex of weeks) {
        result.push({
            week: weekIndex+1,
            days: []
        });

        for (const dayIndex of days) {

            const day = ((dayIndex+1) - startDay) + (weekIndex * 7)
            const isValid = day > 0 && day <= daysInMonth;

            result[weekIndex].days.push({
                dayOfWeek: dayIndex,
                value: isValid ? day : '',
            });
        }
    }

    return result;
}

const addCell = (existing, classString, value) => {
    const result = /* html */ 
    `${existing}
        <td class="${classString}">
            ${value}
        </td>
    `

    return result
}

const createHtml = (data) => {
    let result = ''
    
    for (const week of data) {
        let inner = ""
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week.week}`)

        for (const day of week.days) {

            const isToday =new Date().getDate() === day.value
            const isWeekend = day.dayOfWeek == 1 || day.dayOfWeek == 7
            const isAlternate = week.week % 2 === 0
            
			let classString = 'table__cell'
            
            isAlternate ? classString = `table__cell ${'table__cell_alternate'}`:'';
            isWeekend ? classString = `table__cell ${'table__cell_weekend'}`: '';
            isToday ? classString = `table__cell ${'table__cell_today'}`: '';
            isWeekend && isAlternate ? classString = `table__cell ${'table__cell_weekend'} ${'table__cell_alternate'}`: '';
            isWeekend && isToday ? classString = `table__cell ${'table__cell_today'}`: '';

            inner = addCell(inner, classString, day.value)
        }

        result = 
        `${result}
        <tr>${inner}</tr>
        `        
    }
    
    return result

}

//Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)