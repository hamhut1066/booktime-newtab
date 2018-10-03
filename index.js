var refresh = 5; // Time in secs between refreshes
var current_date;

function runClock() {

  var nowtime = new Date();

  // Exit if we're within the refresh period
  if (current_date !== undefined && current_date.getMinutes() === nowtime.getMinutes()) {
    var t = setTimeout(runClock, 1000 * refresh);
    return;
  }

  // Get the new time and quote
  current_date = nowtime;
  var h = nowtime.getHours();
  var m = nowtime.getMinutes();
  h = checkTime(h);
  m = checkTime(m);
  var timeCode = h + "_" + m;

  // Get the corresponding quote array from the 'times' variable
  var qjson = times[timeCode];

  // select single random text from the various options, if any
  var qjson_single = qjson[Math.floor(Math.random() * qjson.length)]

  // get quote_len
  var quote_len = (qjson_single.q1 + qjson_single.qt + qjson_single.q2).length

  // Write to HTML
  try {

    document.getElementById("quote").innerHTML = qjson_single.q1 + '<em>' + qjson_single.qt + '</em>' + qjson_single.q2;
    document.getElementById("book").innerHTML = qjson_single.t;
    document.getElementById("author").innerHTML = qjson_single.a;

    // set fontsize according to length
    // Equation to make fontsize match
    // y = 6.190864 - 0.01211676*x + 0.00001176814*x^2 - 1.969435e-9*x^3, where x is quote_len
    var fs = ((6.000864 - 0.01211676 * quote_len + 0.00001176814 * quote_len ** 2 - 1.969435e-9 * quote_len ** 3) + "vw");
    document.getElementById("quote").style.fontSize = fs;

  } catch (e) {
    console.log(e);
  }

  // Timeout
  var t = setTimeout(runClock, 1000 * refresh);
}


function checkTime(i) {
  if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
  return i;
}
