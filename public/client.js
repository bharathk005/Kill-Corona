console.log('in js');

var cookie;
var count = 0;
var gt,av,pt;

function addComma() { 


    gt.innerHTML = Number(gt.innerHTML).toLocaleString('en-US');
    av.innerHTML = Number(av.innerHTML).toLocaleString('en-US');
    pt.innerHTML = Number(pt.innerHTML).toLocaleString('en-US');
 

}

function addCookie(name,value,t){
    var exp = "";
    if(t){
        var date = new Date();
        date.setTime(date.getTime() + (t*24*60*60*1000));
        exp = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "")  + exp + "; path=/";
        console.log("added cookie");
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        console.log("found cookie");
      }
    }
    return "";
  }

function poll(){
    fetch('/clicks', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      gt.innerHTML = data[0].gt;
      av.innerHTML = data[0].av;
    })
    .catch(function(error) {
      console.log(error);
    });
    // addComma();
}

function cupd(){
    console.log('button clicked');
    count = count + 1;
    addCookie("wtdmts2020",count.toString(),365)
    pt.innerHTML = count;
    fetch('/clicked', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
}

function addUser(){
    fetch('/addUser', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('user added');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
}

$(document).ready(function(){
    document.getElementById("waste").addEventListener('click',cupd);
    gt = document.getElementById("gt");
    av = document.getElementById("av");
    pt = document.getElementById("pt");
    cookie = getCookie("wtdmts2020")
    if(cookie != ""){
        console.log("cookie:" + cookie);
        count = Number(cookie);
        
    }
    else{
        console.log("calling to add cookie");
        addCookie("wtdmts2020","0",365);
        addUser();
        count = 0;
    }
    pt.innerHTML = count;
    setInterval(poll,500);
    
  });