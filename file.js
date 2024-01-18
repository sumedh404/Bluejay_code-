const fs = require('fs');

const input = fs.readFileSync('Bluejay.userData.json');
const data = JSON.parse(input);

// Group the data by employee name 

const employees = {};
data.forEach((entry)=>{
    const name = entry['Employee Name'];
    if(!employees[name]){
        employees[name] =[];
    }
        employees[name].push(entry);
});


const ids ={};
data.forEach((entry)=>{
    const id = entry['Position ID'];
    if(!ids[id]){
        ids[id] =[];
    }
    ids[id].push(entry);
})

const positions ={};
data.forEach((entry)=>{
    const position = entry['Position Status'];
    if(!positions[position]){
        positions[position] =[];
    }
    positions[position].push(entry);
})


// check for employee who worked for 7 consecutive days

Object.entries(employees).forEach(([name, entries])=>{
    let consecutiveDays = 0;
    let lastDate = null;
    entries.forEach((entry)=>{
        const date = new Date(entry.Time);
        if(lastDate && date.getDate() === lastDate.getDate() + 1){
            consecutiveDays++;
        }else{
            consecutiveDays = 1;
        }
        lastDate = date;
    });
    if(consecutiveDays ===7){
      console.log(`Employee Name: ${name}, Position Status: ${entries[0]['Position Status']} worked for 7 consecutive days`);
       }
})

// check for employee who have less  time < 10 && time > 1;

Object.entries(employees).forEach(([name, entries])=>{
    let lastTimeOut = null;
    entries.forEach((entry)=>{
        const timeOut = new Date(entry['Time Out']);
        if(lastTimeOut){
            const timeDiff = (timeOut - lastTimeOut) / (1000 * 60 * 60);
            if(timeDiff < 10 && timeDiff > 1){
              console.log(`Employee Name: ${name}, Position Status: ${entry['Position Status']} has >1 hour and <10 hours between shifts`);
            }
        }
        lastTimeOut = timeOut;
    })
})





// Check for employee who worked for more than 14 hours
Object.entries(employees).forEach(([name,entries])=>{
    entries.forEach((entry)=>{
        const timecardHours = entry['Timecard Hours (as Time)'];
        const hours = parseInt(timecardHours);
        if(hours > 14){
          console.log(`Employee Name: ${name}, Position Status: ${entry['Position Status']} worked more than 14 hours in a single shift`);
        }
    })
})