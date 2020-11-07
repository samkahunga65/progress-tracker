

export const getMonthDays = () =>{
    const months = [
        {month: 'jan', days:31},
        {month: 'feb', days:28},
        {month: 'mar', days:31},
        {month: 'apr', days:30},
        {month: 'may', days:31},
        {month: 'jun', days:30},
        {month: 'jul', days:31},
        {month: 'aug', days:31},
        {month: 'sep', days:30},
        {month: 'oct', days:31},
        {month: 'nov', days:30},
        {month: 'dec', days:31},
    ]
    function leapYear(years){
        var result; 
        if (years/400){
          result = true
        }
        else if(years/100){
          result = false
        }
        else if(years/4){
          result= true
        }
        else{
          result= false
        }
        return result
     }
    let today = new Date()
    let month = today.getMonth()
    let year = today.getFullYear()
    if(leapYear(year) && month ===1){
        return 29
    }else{
        return months[month].days
    }

}
export const getMonthName = () =>{
    const months = [
        {month: 'JANUARY', days:31},
        {month: 'FEBRUARY', days:28},
        {month: 'MARCH', days:31},
        {month: 'APRIL', days:30},
        {month: 'MAY', days:31},
        {month: 'JUNE', days:30},
        {month: 'JULY', days:31},
        {month: 'AUGUST', days:31},
        //
        {month: 'SEPTEMBER', days:30},
        {month: 'OCTOBER', days:31},
        {month: 'NOVEMBER', days:30},
        {month: 'DECEMBER', days:31},
    ]
    function leapYear(years){
        var result; 
        if (years/400){
          result = true
        }
        else if(years/100){
          result = false
        }
        else if(years/4){
          result= true
        }
        else{
          result= false
        }
        return result
     }
    let today = new Date()
    let month = today.getMonth()
    let year = today.getFullYear()
    if(leapYear(year) && month ===1){
        return 29
    }else{
        return months[month].month
    }

}