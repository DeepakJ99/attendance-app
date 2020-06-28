var i = 0;
var txt = '                      Let us manage your attendance!!';
var speed = 100;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("left").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}



var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
 // document.getElementById("nextBtn").innerHTML = "abc";

  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  }
  else {
    document.getElementById("prevBtn").style.display = "inline";
  }


}

function nextPrev(n) {

  var x = document.getElementsByClassName("tab");
  console.log(currentTab)
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  
  if (currentTab >= x.length){
      document.getElementById("regForm").submit();
  }

  showTab(currentTab);
}

