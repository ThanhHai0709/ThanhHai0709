const currentDate = document.querySelector(".currentDate"),
calendarDay = document.querySelector(".calandarDays"),
prevNextIcon = document.querySelectorAll(".icons span");


let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();

const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "July",
                "Aug", "Sep", "Oct", "Nov", "Dec"];

let cntNameCurrentDay = '';

const renderCalendar = () => {
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(),
    firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    var cntPrev = firstDayofMonth,
    cntFirst = 0,
    cntNext = lastDayofMonth,
    checkActive = false;

    let cntNameDayYear = currYear,
    nameDayMonth = months[currMonth],
    cntNameTodoYear = currYear,
    nameTodoMonth = months[currMonth];
    
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
            
            if(cnt === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() && checkActive === false){
                checkActive = true;
                calendarEachDay.setAttribute("id", "active");
                cntNameCurrentDay = nameDay(nameDayMonth, cntNameDayYear++);
                cntNameDayYear--;
            }
            
            calendarEachDay.textContent = cnt;
            calendarDaysColumn.appendChild(calendarEachDay);
            calendarEachDay.setAttribute("name", nameDay(nameDayMonth, cntNameDayYear++));
        }
    
        const calendarTodoColumn = document.createElement("div");
        calendarTodoColumn.classList.add("calendarTodoColumn");
        for (let k = 0; k < 7; k++) {
            const todoEvent = document.createElement("div");
            todoEvent.classList.add(`todoEvent`);
            todoEvent.setAttribute("name", nameDay(nameTodoMonth, cntNameTodoYear++));

            calendarTodoColumn.appendChild(todoEvent);
        }

        calendarRow.appendChild(calendarColumn);
        calendarRow.appendChild(calendarDaysColumn);
        calendarRow.appendChild(calendarTodoColumn);
    
        calendarDay.appendChild(calendarRow);
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`
    
}
renderCalendar();

function nameDay(month, year) {
    let result = month + year;
    return result;
}

function nameTodo(month, year) {
    let result = month + year;
    return result;
}

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
        addTodoOnClick();
    })
})

function onClickLogOut() {
    if(confirm("Do you want to log out?") == true){
        window.location.href = "http://127.0.0.1:5500/Product/Todo-2/signIn.html";
    }
}

function onClickAddTodo() {
    const currentDay = document.querySelector('.calendarEachDay#active');
    if (currentDay) {
        document.querySelectorAll('.todoEvent').forEach(todo => {
            if(todo.getAttribute("name") === cntNameCurrentDay){
                const span = document.createElement('span');
                span.textContent = prompt("Add Todo");
                const todoName = todo.getAttribute("name");
                const todoElement = currentDay.parentNode.nextSibling.querySelector(`[name="${todoName}"]`);
                todoElement.appendChild(span);
            }
        });
    }
}

document.querySelectorAll('.calendarEachDay').forEach(day => {
    day.addEventListener('click', () => {
        document.querySelectorAll('.todoEvent').forEach(todo => {
            if(todo.getAttribute("name") === day.getAttribute("name")){
                const span = document.createElement('span');
                span.textContent = prompt("Add Todo");
                const todoName = todo.getAttribute("name");
                const todoElement = day.parentNode.nextSibling.querySelector(`[name="${todoName}"]`);
                todoElement.appendChild(span);
                onClickSpanTodoEvent();
            }
        });
    });
});

function addTodoOnClick() {
    document.querySelectorAll('.calendarEachDay').forEach(day => {
        day.addEventListener('click', () => {
            document.querySelectorAll('.todoEvent').forEach(todo => {
                if(todo.getAttribute("name") === day.getAttribute("name")){
                    const span = document.createElement('span');
                    span.textContent = prompt("Add Todo");
                    const todoName = todo.getAttribute("name");
                    const todoElement = day.parentNode.nextSibling.querySelector(`[name="${todoName}"]`);
                    todoElement.appendChild(span);
                    onClickSpanTodoEvent();
                }
            });
        });
    });
}

function onClickSpanTodoEvent() {
    document.querySelectorAll('.todoEvent span').forEach(span => {
        span.addEventListener('click', () => {
            if(confirm("Do you want to remove the Todo?") === true){
                span.remove();
            }
        });
    });
}
