

console.log('client side js')
var slideIn = document.getElementById('slideInTT')
slideIn.addEventListener("click",(e)=>{
  fetch('/getTimeTable').then((response)=>{
    response.json().then((data)=>{
        document.getElementById('timetable').innerHTML="<tr><th></th><th>Slot1</th><th>Slot2</th><th>Slot3</th><th>Slot4</th><th>Slot5</th><th>Slot6</th><th>Slot7</th></tr><tr><td id='day'>Monday</td><td>"+data[0].m1+"</td><td>"+data[0].m2+"</td><td>"+data[0].m3+"</td><td>"+data[0].m4+"</td><td>"+data[0].m5+"</td><td>"+data[0].m6+"</td><td>"+data[0].m7+"</td></tr><tr><td id='day'>Tuesday</td><td>"+data[0].t1+"</td><td>"+data[0].t2+"</td><td>"+data[0].t3+"</td><td>"+data[0].t4+"</td><td>"+data[0].t5+"</td><td>"+data[0].t6+"</td><td>"+data[0].t7+"</td></tr><tr><td id='day'>Wednesday</td><td>"+data[0].w1+"</td><td>"+data[0].w2+"</td><td>"+data[0].w3+"</td><td>"+data[0].w4+"</td><td>"+data[0].w5+"</td><td>"+data[0].w6+"</td><td>"+data[0].w7+"</td></tr><tr><td id='day'>Thursday</td><td>"+data[0].th1+"</td><td>"+data[0].th2+"</td><td>"+data[0].th3+"</td><td>"+data[0].th4+"</td><td>"+data[0].th5+"</td><td>"+data[0].th6+"</td><td>"+data[0].th7+"</td></tr><tr><td id='day'>Friday</td><td>"+data[0].f1+"</td><td>"+data[0].f2+"</td><td>"+data[0].f3+"</td><td>"+data[0].f4+"</td><td>"+data[0].f5+"</td><td>"+data[0].f6+"</td><td>"+data[0].f7+"</td></tr>";
    }).catch((e)=>{
      document.getElementById('add-new-tt').style.display = "block";
    })
  })
})



function insertNewClass(c){

    var str = '<div class = "a-class" id = "a-class" '
    //showClassContents('+i+')"'
    if(c.active == true){
      str += 'style = "background-color:lightgreen"'
    }
    str += '><span>' + c.className + '</span><span>'+c.teacher+'</span><span>'+c.classCode+'</span><span>';
    if(c.students != undefined){
      str += c.students.length+'</span></div>'
    }

    document.getElementById('classes').innerHTML+=str
  
  }

  function showClassContentstoStudent(data){
   
     const m =  document.getElementById('classCont');
    
     $('#classes .a-class').click(function(){
      var n = $('#classes .a-class').index(this) ;
      if(data.active == true && data.OTP != null){
        document.getElementById('OTP-generated').style.display = "block"
      }
      
      document.getElementById('details').innerHTML = "<div style = 'display:grid;grid-template-columns:50% 50%; align-items:center; text-align:center'><span style = 'background-color:#fafafa;padding:10px;border-radius:10px;margin:10px'>" + data[n-1].className+"</span>" + "<span style = 'background-color:#fafafa;margin:10px;padding:10px;border-radius:10px'>"+ data[n-1].teacher+"</span></div>"
  });


    m.style.display = "flex"
  }

  function showClassContentstoTeacher(data){
    const m =  document.getElementById('classCont');
    
     $('#classes .a-class').click(function(){
      var n = $('#classes .a-class').index(this) ;
      console.log(data)
      document.getElementById('details').innerHTML = "<div style = 'display:grid;grid-template-columns:50% 50%; align-items:center; text-align:center'><span style = 'background-color:#fafafa;padding:10px;border-radius:10px;margin:10px'>" + data[n-1].className+"</span>" + "<span style = 'background-color:#fafafa;margin:10px;padding:10px;border-radius:10px'>"+ data[n-1].teacher+"</span></div>"
      
      if(data[n-1].activeByLoc == true){
        document.getElementById('markByLoc').innerText = 'Acitvated using location'
      }
      if(data[n-1].active == true && data[n-1].OTP != null ){
        document.getElementById('generate-OTP').innerText = 'Click to Deactivate';
        flagForOTP = 1
      }
      if(data[n-1].OTP != null){
        document.getElementById('OTP-generated').innerText ="OTP : "+ data[n-1].OTP     
    }
    });
    m.style.display = "flex"
  }

    function OTPfromServer(){
      const m =  document.getElementById('classCont');
      console.log('OTP from Server requested')
     $('#classes .a-class').click(function(){
      var n = $('#classes .a-class').index(this) ;
      console.log(n)
     })
    }


  



var flag = 0
function pullItDown(){
    if(flag == 0)
    {
        document.getElementById('pull-down-contactus').style.transform = "translateY(100px)"
        document.getElementById('pull-down-contactus').innerText = "Close"
        document.getElementById('help-box').style.transform = "translateY(0px)";
        flag = 1
        
    }
    else{
        document.getElementById('pull-down-contactus').style.transform = "translateY(0px)"
        document.getElementById('pull-down-contactus').innerText = "Help"
        document.getElementById('help-box').style.transform = "translateY(-100px)";
        flag = 0
    }
    
}
var flagnew = 0
function showLogin(){
  if(flagnew == 0)
  {
      document.getElementById('login-instead').style.transform = "translateX(-248px)"
      document.getElementById('login-instead').innerText = "Close"
      document.getElementById('loginForm').style.transform = "translateX(0px)";
      document.getElementById('submit-login-form').style.display = "block";
      
      flagnew = 1
      
  }
  else{
      document.getElementById('login-instead').style.transform = "translateX(0px)"
      document.getElementById('login-instead').innerText = "Login"
      document.getElementById('loginForm').style.transform = "translateX(250px)";
      document.getElementById('submit-login-form').style.display = "none";
      flagnew = 0
  }
  
}
var flagnew1 = 0
function showTimeTable(){
  if(flagnew1 == 0)
  {
      document.getElementById('slideInTT').style.transform = "translateX(-800px)"
      document.getElementById('slideInTT-btn').innerText = "Close"
      document.getElementById('tt-nav').style.transform = "translateX(0px)"
      
      flagnew1 = 1
      
  }
  else{
      document.getElementById('slideInTT').style.transform = "translateX(0px)"
      document.getElementById('slideInTT-btn').innerText = "TimeTable"
      document.getElementById('tt-nav').style.transform = "translateX(800px)";
      flagnew1 = 0
  }
  
}
function submitTT(){
  console.log('submitting')
  var tt = document.getElementById('TimeTableForm')
  tt.submit()
}
var flagnew2 = 0
function editTimeTable(n){
  if(flagnew2 ==0)
  {
    
      //addnew 
      document.getElementById('timetable').style.display = "none";
      document.getElementById('edit-timetable').style.display="block"
      document.getElementById('add-new-tt').innerText = "Cancel"
      document.getElementById('save-timetable').style.display="inline"
    // else{
    //   //edit
    //   document.getElementById('timetable').style.display = "none";
    // document.getElementById('edit-timetable').innerHTML='<tr><th></th><th>Slot1</th><th>Slot2</th><th>Slot3</th><th>Slot4</th><th>Slot5</th><th>Slot6</th><th>Slot7</th></tr><form id="TimeTableform"method="POST"action="updateTimeTable"><tr><td id="day">Monday</td><td><input type="text"name="m1"></td><td><input type="text"name="m2"></td><td><input type="text"name="m3"></td><td><input type="text"name="m4"></td><td><input type="text"name="m5"></td><td><input type="text"name="m6"></td><td><input type="text"name="m7"></td></tr><tr><td id="day">Tuesday</td><td><input type="text"name="t1"></td><td><input type="text"name="t2"></td><td><input type="text"name="t3"></td><td><input type="text"name="t4"></td><td><input type="text"name="t5"></td><td><input type="text"name="t6"></td><td><input type="text"name="t7"></td></tr><tr><td id="day">Wednesday</td><td><input type="text"name="w1"></td><td><input type="text"name="w2"></td><td><input type="text"name="w3"></td><td><input type="text"name="w4"></td><td><input type="text"name="w5"></td><td><input type="text"name="w6"></td><td><input type="text"name="w7"></td></tr><tr><td id="day">Thursday</td><td><input type="text"name="th1"></td><td><input type="text"name="th2"></td><td><input type="text"name="th3"></td><td><input type="text"name="th4"></td><td><input type="text"name="th5"></td><td><input type="text"name="th6"></td><td><input type="text"name="th7"></td></tr><tr><td id="day">Friday</td><td><input type="text"name="f1"></td><td><input type="text"name="f2"></td><td><input type="text"name="f3"></td><td><input type="text"name="f4"></td><td><input type="text"name="f5"></td><td><input type="text"name="f6"></td><td><input type="text"name="f7"></td></tr></form>';
    // document.getElementById('edit-tt-button').innerText = "Cancel"
    // document.getElementById('save-timetable').style.display="inline"
    // }
    flagnew2 = 1
  }
  else{
      document.getElementById('timetable').style.display = "block";
      document.getElementById('edit-timetable').style.display = "none";
      document.getElementById('add-new-tt').innerText = "Add new.."
      document.getElementById('save-timetable').style.display="none"
      flagnew2 = 0
  }
  
}

var flagnew4 = 0
function showNewClass(){
  if(flagnew4 ==0)
  {
    document.getElementById('code-new').style.display = "block"
    document.getElementById('submit-new-class').style.display = "block"
    document.getElementById('join-button').innerText = "Cancel"

    flagnew4 = 1
  }
  else{
    document.getElementById('code-new').style.display = "none"
    document.getElementById('submit-new-class').style.display = "none"
    document.getElementById('join-button').innerText = "Join Class"

    flagnew4 = 0
  }
  
}



var corners=[];
var coords={
  lat:0,
  long:0
};


function getLocation() {
  console.log('getLocation')
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log('Error');
  }
}

function showPosition(position) {
  coords.lat = position.coords.latitude
  coords.long = position.coords.longitude;
  corners.push(coords)
}


function getLocationS() {
  console.log('getLocation')
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendPos);
  } else {
    console.log('Error');
  }
}

function sendPos(position){
  var latitude = position.coords.latitude
  var longitude = position.coords.longitude
  return {latitude,longitude}
}


function submitNewClass(){

  var child = document.createElement("input")
  child.type = "hidden"
  child.name = "location"
  child.value = JSON.stringify(corners)
  document.getElementById('new-class-form').appendChild(child)
  document.getElementById('new-class-form').submit();
}


    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    var x=5;
    var y=5;
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Key', 'No. of classes'],
        ['Present',x],
        ['Absent',y]
      ]);

      var options = {
        title: 'Class-Attendance Record',
        pieHole: 0.5,
      };

      var chart = new google.visualization.PieChart(document.getElementById('graph'));
      chart.draw(data, options);
    }
