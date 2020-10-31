export const months = [
    {month:'jan', days:31},
    {month:'feb', days:28},
    {month:'mar', days:31},
    {month:'apr', days:30},
    {month:'may', days:31},
    {month:'jun', days:30},
    {month:'jul', days:31},
    {month:'aug', days:31},
    {month:'sep', days:30},
    {month:'oct', days:31},
    {month:'nov', days:30},
    {month:'dec', days:31},
]
export const getDays=month=>{
    let days='incorrect format'
    months.forEach(mth=>{
        // eslint-disable-next-line no-unused-expressions
        month==mth.month?days=mth.days:null
    })
    return days
}