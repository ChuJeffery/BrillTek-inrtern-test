// Array of factories
const factories = [
    { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
    { name: "BR2", employees: ["Jessie", "Karen", "John"] },
    { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
    { name: "BR4", employees: [] }
];

//1. Count Employees Number by Factorys

function countEmployeesNumByFactory(){

    factories.forEach(function(factory){        // Get each factory in factories.
        console.log(factory["name"] + " have " + factory["employees"].length); //Output each factory name and employees number.
    });
}

// execute function 1
console.log("1. Count Employees Number by Factorys");
countEmployeesNumByFactory();

//2. Count Factories Number by Employee

//This function is let array to delete specific element
function removeItem(item,array){
    var i = 0;
    while( i < array.length){
        if(array[i] == item){
            array.splice(i,1);      //Using splice to delete element and don't add i.
        } else {
            i++;
        }
    }
}

function countFactoriesNumByEmployee(){

    var employeeList = [];      //This will storage all employee in each factory, it allow duplicate.

    factories.forEach(function(factory){
        factory["employees"].forEach(function(employee){
            employeeList.push(employee);        //Push all employees to employeeList.
        })
    })

    while(employeeList.length != 0){
        num = employeeList.filter(e => e == employeeList[0]).length;    //Find specific employee in employeeList and count number.
        console.log(employeeList[0] + " have " + num);
        removeItem(employeeList[0],employeeList);   //Remove previous employee in employeeList.
    }
}

// execute function 2
console.log("2. Count Factories Number by Employee")
countFactoriesNumByEmployee();

//3. Order employees list by alphabetical order

function OrderEmployeesList(){

    factories.forEach(function(factory){
        factory["employees"].sort();    //Using sort method to order employees in each factory.
    })
    console.log(factories);
}

// execute function 3
console.log("3. Order employees list by alphabetical order");
OrderEmployeesList();

//------------ The Following is next part. ------------ 

// Array of employee types
const employeeType = [
    {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
    {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
    {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

// Array of employees
const employees = [
      {id: 1, name: "Alice", type: 2},
      {id: 2, name: "Bob", type: 3},
      {id: 3, name: "John", type: 2},
      {id: 4, name: "Karen", type: 1},
      {id: 5, name: "Miles", type: 3},
      {id: 6, name: "Henry", type: 1}
];

// Array of tasks
const tasks = [
    {id: 1, title: "task01", duration: 60},
    {id: 2, title: "task02", duration: 120},
    {id: 3, title: "task03", duration: 180},
    {id: 4, title: "task04", duration: 360},
    {id: 5, title: "task05", duration: 30},
    {id: 6, title: "task06", duration: 220},
    {id: 7, title: "task07", duration: 640},
    {id: 8, title: "task08", duration: 250},
    {id: 9, title: "task09", duration: 119},
    {id: 10, title: "task10", duration: 560},
    {id: 11, title: "task11", duration: 340},
    {id: 12, title: "task12", duration: 45},
    {id: 13, title: "task13", duration: 86},
    {id: 14, title: "task14", duration: 480},
    {id: 15, title: "task15", duration: 900}
];

//4. Count total hours worked in 1 day

//This function is to calculate time interval (Suppose the work time will start or end on the hour)
function calculateEmployeeTypeTime(start,end){  // start and time format should be HH:MM:SS
    var startHour = parseInt(start.split(":")[0]); // get start hour
    var endHour = parseInt(end.split(":")[0]); // get end hour

    if(startHour > endHour){    // This is cross day situation
        return (24 - startHour) + endHour;
    } else {
        return endHour - startHour;
    }
}

function countTotalHours(){

    var totalHour = 0;

    employees.forEach(function(employee){
        typeID = employee.type;     //Get each employee's work type

        typeObject = employeeType.find(function(item){      //To find which type object is belong to employee
            return item.id == typeID;
        });

        totalHour += calculateEmployeeTypeTime(typeObject.work_begin,typeObject.work_end);      //calculate total

    })

    console.log("Work hours in 1 day = " + totalHour);

    return totalHour;
}

//execute function 4
console.log("4. Count total hours worked in 1 day")
countTotalHours();

//5. Make a function that take as parameters dayTime and return number of employee working

//This function is to check the specific time is between start and end
function isInTime(time,start,end){
    var timeHour = parseInt(time.split(":")[0]);
    var startHour = parseInt(start.split(":")[0]);
    var endHour = parseInt(end.split(":")[0]);

    if (startHour > endHour){           // if cross days
        return (timeHour > startHour || endHour > timeHour);
    } else {
        return (startHour < timeHour && timeHour < endHour);
    }

}

function howManyEmployeeByTime(time){   // The format of parameter in this function is HH:MM:SS

    var count = 0

    employees.forEach(function(employee){
        typeID = employee.type;     //Get each employee's work type

        typeObject = employeeType.find(function(item){      //To find which type object is belong to employee
            return item.id == typeID;
        });

        if (isInTime(time,typeObject.work_begin,typeObject.work_end)){      //To check the specific time is in work time
            count += 1;
        }
        
    })

    console.log(count);
}

// execute function 5
console.log("5. Make a function that take as parameters dayTime and return number of employee working")
howManyEmployeeByTime("23:00:00")   // This parameter can change, it format is HH:MM:SS.

//6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.

//This function is to calculate total task time.
function calculateTotalTaskTime(){

    var total = 0

    tasks.forEach(function(task){
        total += task.duration;
    })

    console.log("It will spend " + total + " minutes.")
    return total; // Minute
}

//Assume the work time is fixed (9:00 to 00:00)
function workDayToFinishTask(){
    tasktime = calculateTotalTaskTime() / 60; //Turn minute to hour.
    worktime = countTotalHours();   //Get work time in one day with question4.

    needDays = Math.ceil(tasktime / worktime)   //Take ceiling
    
    console.log("It need " + needDays + " to done all tasks");
}

// execute function 6
console.log("6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.")
workDayToFinishTask();