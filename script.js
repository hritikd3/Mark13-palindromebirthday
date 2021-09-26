var input = document.querySelector("#input");
var output = document.querySelector("#output");
var btn = document.querySelector("#btn");


function reverseString(str){
    var listOfChars = str.split('')
    var reversedList = listOfChars.reverse()
    var reversedStr = reversedList.join('')

    return reversedStr
}

function isPalindrome(str){
    var reverse = reverseString(str)
    return str === reverse
    // if(str === reverse){
    //     return true
    // }
    // return false
}

function dateToString(date){
    var dateStr = {day: '' , month: '' , year: ''}

    if(date.day < 10){
        dateStr.day = '0' + date.day
    }
    else{
        dateStr.day = date.day.toString()
    }

    if(date.month < 10){
        dateStr.month = '0' + date.month
    }
    else{
        dateStr.month = date.month.toString()
    }

    dateStr.year = date.year.toString()

    return dateStr
}

function allDateFormat(date){
    var dateStr = dateToString(date)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    var yymmdd =dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

function checkPalindromeDates(date){
    var palindromeList = allDateFormat(date)

    var flag = false

    for(var i=0;i<palindromeList.length;i++){
        if(isPalindrome(palindromeList[i])){
            flag = true
            break
        }
    }
    return flag
}


function isLeapYear(year){
    if(year % 400 === 0){
        return true
    }
    if(year % 100 === 0){
        return false
    }
    if(year % 4 === 0){
        return true
    }
    return false
}

function getNextDate(date){
    var day = date.day + 1
    var month = date.month
    var year = date.year

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1
                month++
            }
        }
        else{
            if(day > 28){
                day = 1
                month++
            }
        }
    }
    else{
        if(day > daysInMonth[month - 1]){
            day = 1
            month++
        }
    }
    if(month > 12){
        month = 1
        year++
    }

    return {
        day : day,
        month : month,
        year : year
    }
}

function nextPalindromeDate(date){
    var dte = 0
    var nextDate = getNextDate(date)

    while(1){
        dte++
        var isPalindrome = checkPalindromeDates(nextDate)

        if(isPalindrome){
            break
        }
        nextDate = getNextDate(nextDate)
    }
    return [dte, nextDate]
}

function clickHandler(e){
    var bdayStr = input.value

    if(bdayStr !== ""){
        var dateList = bdayStr.split('-')
        var date = {
            day : Number(dateList[2]),
            month : Number (dateList[1]),
            year : Number(dateList[0])
        }

        var isPalindrome = checkPalindromeDates(date)
        if(isPalindrome){
            output.innerText = "Hurrey! Your Birthday Is A Palindrome! 🎂"
        }
        else{
            var [dte, nextDate] = nextPalindromeDate(date)

            output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} , you missed it by ${dte} days. 🙁`
        }
    }
}

btn.addEventListener("click", clickHandler)