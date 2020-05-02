
var killcookie;
var clikccookie;
var count = 0;
var gt,av,pt;
var wait = false;
var seq = 1;
var cseq = 0;
var play = true;
var winterval;
var sinterval;
var cinterval;
var wtran;
var stran;
var ctran = 0;
var cspacewidth = 0;
var soapimpact = false;
var waterimpact = false;
var kills = 0;
var clicksperkill = 0;
var splashdelay = 2000;
var level = 0;
var killtest = 45; //25
var dropspeed = 30;
var cspeed = 200;
var csin = 0.1;

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
      }
    }
    return "";
  }

function pollkills(){
    fetch('/kills', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      gt.innerHTML = Number(data[0].gt).toLocaleString('en-US');
      av.innerHTML = Number(data[0].av).toLocaleString('en-US');
    })
    .catch(function(error) {
      console.log(error);
    });
}

function sortByProperty(property){  
  return function(a,b){  
     if(a[property] < b[property])  
        return 1;  
     else if(a[property] > b[property])  
        return -1;  
 
     return 0;  
  }  
}

function addtoChart(data,max){
  var list = document.getElementById("clist");
  var p = document.createElement("p");
  p.setAttribute('id',data.name);
  p.textContent = data.name;
  list.appendChild(p);
  var div1 = document.createElement("div");
  div1.setAttribute('class','chart');
  var div2 = document.createElement('div');
  div2.setAttribute('class','C');
  div2.style.width = (data.val/max * 100) + '%';
  div2.textContent = data.val;
  div1.appendChild(div2);
  list.appendChild(div1);
  
}

function pollreg(){
  fetch('/reg', {method: 'GET'})
  .then(function(response) {
    if(response.ok) return response.json();
    throw new Error('Request failed.');
  })
  .then(function(data) {
    data.sort(sortByProperty("val"));
    var max = data[0].val;
    for(d in data){
          addtoChart(data[d],max);
    }
  })
  .catch(function(error) {
    console.log(error);
  });
}


function cupd(){
    
    count = count + 1;
    addCookie("killcor2020clicks",count.toString(),365)
    //pt.innerHTML = Number(count).toLocaleString('en-US');
    // fetch('/clicked', {method: 'POST'})
    // .then(function(response) {
    //   if(response.ok) {
    //     
    //     return;
    //   }
    //   throw new Error('Request failed.');
    // })
    // .catch(function(error) {
    //   console.log(error);
    // });
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

function insertImg(src,parent,animation,width,height,message){
  wait = true;
  var img = document.createElement("img");
  img.setAttribute('class',animation)
  img.setAttribute('id','tempImg');
  img.width = width;
  img.height = height;
  img.src = src;
  img.addEventListener('click',cupd)
  var pt = document.getElementById(parent);
  var chat = document.getElementById("chat");
  chat.textContent = message;
  // var x = pt.offsetTop - pt.height;
  // var y = pt.offsetLeft + pt.width;
  // img.style.left = '' + x + 'px' ;
  // // img.style.top = '' + y + 'px' ;
  // img.offsetTop = x;
  // img.offsetLeft = y;
   document.getElementById(parent).appendChild(img);
  setTimeout(function(){
    document.getElementById("tempImg").remove();
    chat.textContent = "";
    cseq++;
    wait = false;
  },3000);
}

function story(){
  if(!wait){

    if(seq == 1){
      wait = true;
      setTimeout(function(){
        insertImg("./res/N3.png","rtxt","fade",100,150,"NAMASTE!");
    },2000);
     }

     if(seq == 2){
       wait = true;
      setTimeout(function(){
        insertImg("./res/T1.png","rtxt","fade",100,150,"Howdy Modi! Good to see ya''");
    },2000);
     }

    if(seq == 3){
      wait = true;
     setTimeout(function(){
       insertImg("./res/N4.png","rtxt","fade",100,150,"Who is this joker! Did you wash your hands?");
   },2000);
    }

    if(seq == 4){
      wait = true;
     setTimeout(function(){
       insertImg("./res/T2.png","rtxt","fade",100,150,"No, no, I never wash my hands");
   },2000);
    }

    if(seq == 5){
      wait = true;
     setTimeout(function(){
       insertImg("./res/N21.png","bparent","popup",150,250,"Irresponsible!");
   },2000);
    }

    if(seq == 6){
      wait = true;
     setTimeout(function(){
       insertImg("./res/T4.png","rtxt","fade",100,150,"Waaow! Thats scary.");
   },2000);
    }

    if(seq == 7){
      wait = false;
      var chat = document.getElementById("chat");
      chat.textContent = "Drama is over. Now Waste this Moment!";
    }
  }
}

function createsplashw(id){
  var element = document.getElementById(id);
  var topPos = element.getBoundingClientRect().top ;
  var leftPos = element.getBoundingClientRect().left ;
  var splash = document.createElement('img');
  splash.setAttribute('class','wsfade');
  splash.setAttribute('id','splash'+id);
  splash.style.left = leftPos +'px';
  splash.style.top = topPos +'px';
  splash.width = 40;
  splash.height = 60;
  splash.src = "./res/"+id+".png";
  document.body.appendChild(splash);
  setTimeout(function(){
    document.getElementById('splash'+id).remove();
  },splashdelay);
}

function createsplashs(id){
  var element = document.getElementById(id);
  var topPos = element.getBoundingClientRect().top ;
  var leftPos = element.getBoundingClientRect().left ;
  var splash = document.createElement('img');
  splash.setAttribute('class','wsfade');
  splash.setAttribute('id','splash'+id);
  splash.style.left = leftPos +'px';
  splash.style.top = topPos +'px';
  splash.width = 40;
  splash.height = 60;
  splash.src = "./res/"+id+".png";
  document.body.appendChild(splash);
  setTimeout(function(){
    document.getElementById('splash'+id).remove();
  },splashdelay);
}

function resetImpact(id){
    id =='tempw'? waterimpact = false: soapimpact = false;
    document.getElementById("coronaspace").style.backgroundColor = "bisque";
   // document.getElementById("comment").textContent = "Try Again! you need be faster than corona."
    comment.style.backgroundColor = "white";
}

function removedrop(id){
  var drop = document.getElementById(id);
  if(id =='tempw'){createsplashw(id);}
  else if(id =='temps'){createsplashs(id);}
  
  drop.remove();
 
}

function getcoronapos(){
  var element = document.getElementById('cimg');
 // var topPos = element.getBoundingClientRect().top;
  var leftPos = element.getBoundingClientRect().left;
  return leftPos;
}

function celebration(){
  if(cseq == 1){
    wait = true;
    setTimeout(function(){
      insertImg("./res/T3.png","chat","fade",100,150,"Wohoo! We are saved! Thanks buddy!");
  },1000);
   }

   if(cseq == 2){
     wait = true;
    setTimeout(function(){
      insertImg("./res/N3.png","chat","fade",100,150,"Thanks.. Well Done.");
  },1000);
   }

  if(cseq == 3){
    wait = true;
   setTimeout(function(){
     insertImg("./res/T1.png","chat","fade",100,150,"I appreciate it..");
 },1000);
  }
}

function destroycorona(){
   var corona = document.getElementById("cimg");
   corona.src = "./res/corona"+((level%2)+1)+"killed.png";
   
 setTimeout(function(){
    corona.remove()
 },2000);
}

function killed(){
   clearInterval(cinterval);
    document.getElementById("coronaspace").style.backgroundColor = "rgb(68, 226, 121)";
    comment.textContent = "Well Done! You killed a virus. But there are many more to go.";
    comment.style.backgroundColor = "rgb(68, 226, 121)";
    kills++;
    var element = document.getElementById('water');
    element.disabled = true;
    element = document.getElementById('soap');
    element.disabled = true;
    pt.innerHTML = Number(kills).toLocaleString('en-US');
    fetch('/killed', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
    addCookie("killcor2020kills",kills.toString(),365);
    destroycorona();
    celebration();
    setTimeout(function(){
      var element = document.getElementById('water');
      element.disabled = false;
      element = document.getElementById('soap');
      element.disabled = false;
      createcorona();
   },5000);
}

function movedrop(id){
  var drop = document.getElementById(id);
  if(id == 'tempw'){wtran = wtran+dropspeed;drop.style.transform = "translateY(-"+wtran+"px)";}
  else if(id =='temps'){stran = stran+dropspeed;drop.style.transform = "translateY(-"+stran+"px)";}
   //"translate(x,y)"
   var cleft = getcoronapos();
   var droppos = drop.getBoundingClientRect();
   var cspace =  document.getElementById("coronaspace");
  if( droppos.top < cspace.getBoundingClientRect().top + 27) {
    id == 'tempw'? clearInterval(winterval):clearInterval(sinterval);
    id =='tempw'? document.getElementById('water').disabled = false : document.getElementById('soap').disabled = false;
    removedrop(id);
    if( (0-killtest) < (droppos.left-cleft) && (droppos.left-cleft) < killtest){
        id =='tempw'? waterimpact = true: soapimpact = true;
        setTimeout(resetImpact,splashdelay,id);
        var comment = document.getElementById("comment");
        if(waterimpact && soapimpact){
          killed()
        }
        else if(waterimpact){
          comment.textContent = "Corona is hit by Water. Hit is with Soap before water dries out";
          comment.style.backgroundColor = "rgb(154, 207, 243)";
            document.getElementById("coronaspace").style.backgroundColor = "rgb(154, 207, 243)";
        }
        else if(soapimpact){
          comment.textContent = "Corona is hit by SOAP. Hit is with Water before SOAP dries out";
          comment.style.backgroundColor = "rgb(250, 121, 61)"
          document.getElementById("coronaspace").style.backgroundColor = "rgb(250, 121, 61)";
      }

    }
    
  }
}



function createwaterdrop(){
  var element = document.getElementById('water');
  var topPos = element.getBoundingClientRect().top + window.scrollY - 30;
  var leftPos = element.getBoundingClientRect().left + window.scrollX + element.width;
  element.disabled = true;
  var wdrop = document.createElement('img');
  wdrop.setAttribute('class','waterclass');
  wdrop.setAttribute('id','tempw');
  wdrop.style.left = leftPos +'px';
  wdrop.style.top = topPos +'px';
  wtran = 0;
  wdrop.width = 30;
  wdrop.height = 50;
  wdrop.src = "./res/wd.png";
  document.body.appendChild(wdrop);
  winterval = setInterval(movedrop,100,'tempw');
}

function createsoapdrop(){
  var element = document.getElementById('soap');
  var topPos = element.getBoundingClientRect().top + window.scrollY - 30;
  var leftPos = element.getBoundingClientRect().left + window.scrollX;
  element.disabled = true;
  var sdrop = document.createElement('img');
  sdrop.setAttribute('class','soapclass');
  sdrop.setAttribute('id','temps');
  sdrop.style.left = leftPos +'px';
  sdrop.style.top = topPos +'px';
  stran = 0;
  sdrop.width = 60;
  sdrop.height = 60;
  sdrop.src = "./res/sd.png";
  document.body.appendChild(sdrop);
  sinterval = setInterval(movedrop,100,'temps');
}

function movecorona(){
  var corona = document.getElementById("cimg");
  var tran = Math.sin(ctran) * cspacewidth/2.5;
  ctran = ctran + csin;
  corona.style.transform = "translateX("+tran+"px)";
}

function createcorona(){
   var cspace = document.getElementById("coronaspace");
    properties = window.getComputedStyle(cspace, null);
    cspacewidth = parseInt(properties.width);
   var topPos = cspace.getBoundingClientRect().top;
   var leftPos = cspace.getBoundingClientRect().left;
   var corona = document.createElement("img");
   corona.setAttribute('class','cimg');
   corona.setAttribute('id','cimg');
   corona.style.left = leftPos +'px';
   corona.style.top = topPos +'px';
   corona.width = 70;
   corona.height = 70;
   level++;
   corona.src = "./res/corona"+((level%2)+1)+".png";
   cspace.appendChild(corona);
  
   var lvl = document.getElementById('level');
   lvl.textContent = "LEVEL "+level;
   cspeed = 220 - (120>(level*20)?(level*20):120);
   killtest = 45 - (level*3);
   killtest = killtest < 27?27:killtest;
   csin = (0.1 + level*0.05);
   console.log(cspeed,killtest,csin);
   cinterval = setInterval(movecorona,cspeed);
}

$(document).ready(function(){
  var waterd = document.getElementById("water");
  var soapd = document.getElementById("soap");
    waterd.addEventListener('click',cupd);
    soapd.addEventListener('click',cupd);
    waterd.addEventListener('click',createwaterdrop);
    soapd.addEventListener('click',createsoapdrop);
    gt = document.getElementById("gt");
    av = document.getElementById("av");
    pt = document.getElementById("pt");
    var listen = document.getElementById("listen");
    clickcookie = getCookie("killcor2020clicks");
    killcookie = getCookie("killcor2020kills");
    if(clickcookie != ""){
     //  listen.textContent = "You have already listened to the leaders. Now Waste This Moment! Consume cookie to watch again"
        play = false;
        kills = killcookie != ""? Number(killcookie): 0;        
    }
    else{
   //   listen.textContent = "Listen to the leaders:"

        addCookie("killcor2020clicks","0",365);
        addUser();
        kills = 0;
    }
    pt.innerHTML = kills;
    setInterval(pollkills,2000);
    setTimeout(function(){
      insertImg("./res/N2.png","rtxt","popup",100,150,"C'mon Kill this");
    },5000);
    //setInterval(pollreg,500);
    pollreg();
    // if(play){
    // setInterval(story,500);
    // }
    createcorona();
  });