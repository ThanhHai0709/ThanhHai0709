const currentDate = document.querySelector(".currentDate"),
calendarDay = document.querySelector(".calandarDays"),
prevNextIcon = document.querySelectorAll(".icons span");


let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();

const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "July",
                "Aug", "Sep", "Oct", "Nov", "Dec"]

const renderCalendar = () => {
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(),
    firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    var cntPrev = firstDayofMonth,
    cntFirst = 0,
    cntNext = lastDayofMonth;
    
    while (calendarDay.firstChild) {
        calendarDay.removeChild(calendarDay.firstChild);
    }

    for (let i = 0; i < 6; i++) {
        const calendarRow = document.createElement("div");
        calendarRow.classList.add("calendarRow");
    
        const calendarColumn = document.createElement("div");
        calendarColumn.classList.add("calendarColumn");
        for (let j = 0; j < 7; j++) {
            const calendarEachColumn = document.createElement("div");
            calendarEachColumn.classList.add("calendarEachColumn");
            calendarColumn.appendChild(calendarEachColumn);
        }
    
        const calendarDaysColumn = document.createElement("div");
        calendarDaysColumn.classList.add("calendarDaysColumn");
        for (let j = 0; j < 7; j++) {
            let calendarEachDay = document.createElement("div");
            calendarEachDay.classList.add("calendarEachDay");
            if(cntPrev > 0 && cntPrev != 1){
                cntPrev--;
                cnt = lastDateofLastMonth - cntPrev + 1;
                calendarEachDay.setAttribute("id", "inactive");
            }
            else if(cntFirst < lastDateofMonth){
                cntFirst++;
                cnt = cntFirst;
            }
            else{
                cnt = cntNext - lastDayofMonth + 1;
                cntNext++;
                calendarEachDay.setAttribute("id", "inactive");
            }
            
            if(cnt === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()){
                calendarEachDay.setAttribute("id", "active");
            }
            
            calendarEachDay.textContent = cnt;
            calendarDaysColumn.appendChild(calendarEachDay);
        }
    
        const calendarTodoColumn = document.createElement("div");
        calendarTodoColumn.classList.add("calendarTodoColumn");
    
        calendarRow.appendChild(calendarColumn);
        calendarRow.appendChild(calendarDaysColumn);
        calendarRow.appendChild(calendarTodoColumn);
    
        calendarDay.appendChild(calendarRow);
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`
    
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    })
})