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
        result.push(i+1)
    }

    return result
}

const createData = () => {
    const current = new Date();
    //current.set(1)
    const startDay = new Date(current.getFullYear(), current.getMonth(), 1).getDay(); // First day of the month
    const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate(); // Total days in the month

    const weeks = createArray(5)
    const days = createArray(7)
    const result = [];

    for (const weekIndex of weeks) {
        result.push({
            week: weekIndex,
            days: []
        });

        for (const dayIndex of days) {
            const day = (dayIndex - startDay) + ((weekIndex -1) * 7);
            const isValid = day > 0 && day <= daysInMonth;

            result[weekIndex-1].days.push({
                dayOfWeek: dayIndex,
                value: isValid ? day : '',
            });
        }
    }

    return result;
}
console.log(createData())

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
        //console.log(week.days)
        // console.log(data[0].days)
        let inner = ""
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week.week}`)
        let count = 0
        for (const day of week.days) {
            const isToday = new Date().getDate() === day.value
            // count += 1
            // console.log(count)
            const isWeekend = day.dayOfWeek == 1 || day.dayOfWeek == 7
            //console.log(week.week, day.dayOfWeek,day.value)

            const isAlternate = week.week % 2 === 0
            //console.log(isAlternate)
            
			let classString = 'table__cell'

            
            isWeekend ? classString = `table__cell ${'table__cell_weekend'}`: '';
            isAlternate ? classString = `table__cell ${'table__cell_weekend'} ${'table__cell_alternate'}`:'';
            isToday ? classString = `table__cell ${'table__cell_today'}`: '';
            
            inner = addCell(inner, classString, day.value)
            console.log(inner)
            console.log('')
        }

        result = 
        `${result}
        <tr>${inner}</tr>
        `
    }
    
    return result
}
//console.log(createHtml(createData()))

//Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)