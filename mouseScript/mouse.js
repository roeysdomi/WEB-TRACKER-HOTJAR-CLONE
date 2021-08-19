let g = 1
let session = [];
let id = getRandomInt(5000)
let screensize = 0;
let startTime = new Date();
//-----------------------------
window.addEventListener('mousemove', function(e) {
  if (g == 2) {
    document.getElementById('x-value').textContent = e.x;
    document.getElementById('y-value').textContent = e.y;
    session.push(e.x.toString()+"-"+e.y.toString())
    let time=getTime()
    if (session.length > 500) {
      screensize = getScreenSize()
       let data={
         screensize,
         date:startTime,
         time:time,
         record:session,
         sesid:id
       }
       sendRecord(data)
      console.log(id)

      console.log(screensize)
      console.log(getTime())
      session = []
    }
  }
  if (g == 2) {
    g = 1
  } else {
    g = 2
  }
});
window.addEventListener('click', function(e) {
  if (e.which == 1) {
    session.push("click-click")
  }
});

const sendRecord = async (data) => {
  const rawResponse = await fetch('http://localhost:4000/addrecord', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body:"record="+data.record+"&date="+data.date+"&screensize="+data.screensize+"&time="+data.time+"&sesid="+data.sesid
  });
  const content = await rawResponse.json();

  console.log(content);
};
const getScreenSize = () => {
  if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
    var w = window.innerWidth;
    var h = window.innerHeight;
  } else {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
  }
  var txt =  w + "x" + h;
  return txt
}
const getTime = () => {
  var endTime = new Date();
  var difference = endTime - startTime;
  var seconds = difference / 1000;
  var resultInMinutes = Math.floor(seconds / 60);
  seconds = Math.round(seconds % 60)
  return resultInMinutes + ":" + seconds
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
