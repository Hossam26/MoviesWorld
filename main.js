
var inputname=document.getElementById("name");
var inputmail=document.getElementById("mail");
var inputphone=document.getElementById("phone");
var inputage=document.getElementById("age");
var inputpass=document.getElementById("pass");
var inputrepass=document.getElementById("repass");
var addbtn=document.getElementById("mybtn");
var name_flag=true;
var age_flag=true;
var mail_flag=true;
var phone_flag=true;
var pass_flag=true;
var repass_flag=true;
var mov_flag=true;
var tv_flag=false;
var movies=[];
var tv=[];
var searchRes=[];
let nameRejex=/[A-Za-z]{2,20}$/
let ageRejex=/^([1-9]|[1-9][0-9]|100)$/
let phoneRejex=/^(010|012|015|011)[0-9]{8}$/
let mailRejex=/[@]{1}[a-z0-9]{2,}[.][a-z]{2,}/
let pass_phase1Rejex=/[a-zA-Z]+[0-9]+/
let pass_phase2Rejex=/[a-zA-Z0-9]{8,}/
let genres=["now_playing","popular","top_rated","trending","upcoming"];
let genres_tv=["on_the_air","popular","top_rated","trending","airing_today"]
$("#slide").animate({"left":-$(".options").outerWidth()},0)
$(".first-li").addClass("changeColor")
$(".alert-danger").animate({"top":$("#contact .form-group").outerHeight})
$("#mybtn").addClass("disabled")
async function getMovies(type){
  if(type=="trending"){
    var apiresponse=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
  }
  else{
    var apiresponse=await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)

}
    movies=await apiresponse.json();
   movies=movies.results
    

}
async function getShows(type){
  if(type=="trending"){
    var apiresponse=await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
  }
  else{
    var apiresponse=await fetch(`https://api.themoviedb.org/3/tv/${type}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)

}
    tv=await apiresponse.json();
   tv=tv.results
    

}



function displayMovies(results){
    cols="";
    for(var i=0;i<results.length;i++){
      if(results[i].overview.length>455){
        results[i].overview=results[i].overview.slice(0,455)
        var last= results[i].overview.lastIndexOf(" ")
        results[i].overview= results[i].overview.slice(0,last)
        results[i].overview= results[i].overview.concat("...")

      }
     if(results[i].poster_path!=null){
        cols+=`<div class="col-lg-4 col-md-5 col-sm-auto my-3"><div class="movie rounded position-relative">
        <div class="content text-center">
        <img src="https://image.tmdb.org/t/p/w500/${results[i].poster_path}" class="img-fluid w-100" alt="">
        
        <div class="layer w-100">
          <h2>${results[i].original_title}</h2>
          <p>${results[i].overview}</p>
          <h5>rate:${results[i].vote_average}</h5>
          <h6>${results[i].release_date}</h6>
        </div>
      </div>
    </div></div>`
    }
    }

    document.getElementById("posterss").innerHTML=cols
}

function displayShows(results){
  cols="";
  for(var i=0;i<results.length;i++){
    if(results[i].overview.length>455){
      results[i].overview=results[i].overview.slice(0,455)
      var last= results[i].overview.lastIndexOf(" ")
      results[i].overview= results[i].overview.slice(0,last)
      results[i].overview= results[i].overview.concat("...")
    }
  if(results[i].poster_path!=null){
      cols+=`<div class="col-lg-4 col-md-5 col-sm-auto my-3"><div class="movie rounded position-relative">
      <div class="content text-center">
      <img src="https://image.tmdb.org/t/p/w500/${results[i].poster_path}" class="img-fluid w-100" alt="">
      
      <div class="layer w-100">
        <h2>${results[i].original_name}</h2>
        <p>${results[i].overview}</p>
        <h5>rate:${results[i].vote_average}</h5>
        <h6>${results[i].first_air_date}</h6>
      </div>
    </div>
  </div></div>`}
  }
  document.getElementById("posterss").innerHTML=cols
}
function searchShows(searchtext){
  var res=[];
  for (var i=0;i<tv.length;i++){
      if (tv[i].original_name.toLowerCase().includes(searchtext.toLowerCase())){
          res.push(tv[i])
      }

  }
  if(res.length!=0){
    displayShows(res)
  }
  else{
    displayShows(tv)
  }
}
function searchMovies(searchtext){
  var res=[];
  for (var i=0;i<movies.length;i++){
      if (movies[i].original_title.toLowerCase().includes(searchtext.toLowerCase())){
         res.push(movies[i])
      }
  }
  if(res.length!=0){
displayMovies(res);
  }
  else{
    searchMovies(movies)
  }
}
function search(searchtext){
   if (mov_flag==true){
    searchMovies(searchtext)
   }
   else if (tv_flag==true){
    searchShows(searchtext)
   }
}
async function getSearch(searchtext){
    if (mov_flag==true){
      var search_response=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${searchtext}`)

    }
    else if(tv_flag==true){
      var search_response=await fetch(`https://api.themoviedb.org/3/search/tv?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${searchtext}`)
    }
    searchRes=await search_response.json();
    searchRes=searchRes.results
  }
async function searchbyword(searchtext){
  
   await getSearch(searchtext) 
   if(mov_flag==true){
    displayMovies(searchRes)
   }
   else{
     displayShows(searchRes)
   }
   
}
async function sequnce(genre){
    if(mov_flag==true){
      await getMovies(genres[genre])
    displayMovies(movies)
    }
    else if (tv_flag==true){
     await getShows(genres_tv[genre])
     displayShows(tv)
    }
}
sequnce(0)

$(window).resize(function() {
  $("#slide").animate({"left":-$(".options").outerWidth()},1000,function(){
   if(window.outerWidth>600){
    $(".mylist").animate({"top":"100%","visibility":"hidden"},1000)
   }
  })
  $(".change i").removeClass("fa-times")
 
});
$(".change").click(function(){
   $(".change i").toggleClass("fa-times")

   if ($("#slide").css("left")=="0px"){
    $("#slide").animate({"left":-$(".options").outerWidth()},1000,function(){
    if(window.outerWidth>600){
      $(".mylist").animate({"top":"100%","visibility":"hidden"})}
    })
   
   }
   else{
    $("#slide").animate({"left":0},1000,function(){
      if(window.outerWidth>600){
      $(".mylist").animate({"top":0,"visibility":"visible"},1000)
      }
    })
   
   }
})
    
$(".options li").click(function(){
   $(this).addClass("changeColor")
   $(this).siblings().removeClass("changeColor")
  if(window.outerWidth<=600){
    $("#slide").animate({"left":-$(".options").outerWidth()},1000)
    $(".change i").toggleClass("fa-times")
  }
  if($(this).index()==5){
       $(`#linked`).attr("href","#contact")
  }
  else{
    sequnce($(this).index())
  }
})
function message(where,mess){
  $(`#${where}alert`).html(mess)
}
function validateName(){ 
  if(inputname.value===""||inputname.value===" "){
    message("name","Enter valid Name")
    $("#namealert").css("display","flex")
    name_flag=true
    return true
  }
  else if(!nameRejex.test(inputname.value)) {
   message("name","Your Name is not valid")
   $("#namealert").css("display","flex")
   name_flag=true
   return true
  }

  else{
      $("#namealert").css("display","none")
      name_flag=false
      return false
  }
}
function rightName(){
  if(nameRejex.test(inputname.value)) {
    $("#namealert").css("display","none")
      name_flag=false
  }
  else
  name_flag=true
}
function validateAge(){
   if(!ageRejex.test(inputage.value)) {
     $("#agealert").css("display","flex")
     age_flag=true
       return true
   }

   else{
       $("#agealert").css("display","none")
       age_flag=false
       return false
   }
}
function rightAge(){
  if(ageRejex.test(inputage.value)) {
    $("#agealert").css("display","none")
    age_flag=false
  }
  else
  age_flag=true
}
function validatePhone(){
  if(!phoneRejex.test(inputphone.value)) {
     $("#phonealert").css("display","flex")
      phone_flag=true;
       return true
   }
 
   else{
     $("#phonealert").css("display","none")
     phone_flag=false;
       return false
   }
 }
 function rightPhone(){
  if(phoneRejex.test(inputphone.value)) {
     $("#phonealert").css("display","none")
     phone_flag=false;
  }
  else 
  phone_flag=true
 }
 function validateMail(){
   if(!mailRejex.test(inputmail.value)) {
     $("#mailalert").css("display","flex")
     mail_flag=true
       return true
   }
 
   else{
     $("#mailalert").css("display","none")
     mail_flag=false
       return false
   }
 }
 function rightMail(){
  if(mailRejex.test(inputmail.value)) {
    $("#mailalert").css("display","none")
    mail_flag=false
  }
  else
  mail_flag=true
 }
 function validatePass(){
  
   if(!pass_phase1Rejex.test(inputpass.value)) {
       $("#passalert").css("display","flex")
       pass_flag=true
       return true
   }
 
   else if(pass_phase1Rejex.test(inputpass.value)){
     if(pass_phase2Rejex.test(inputpass.value)){
       $("#passalert").css("display","none")
       pass_flag=false
       return false
     
   }
   else{
    $("#passalert").css("display","flex")
    pass_flag=true
    return true
   }
   }
 }
 function rightPass(){
  if(pass_phase1Rejex.test(inputpass.value)){
    if(pass_phase2Rejex.test(inputpass.value)){
      pass_flag=false
      $("#passalert").css("display","none")
    
  }
  else
  pass_flag=true
 }
 else{
  pass_flag=true
 }
}
 function validateRepass(){
  if(inputpass.value==inputrepass.value&&inputrepass.value!=""&&validatePass()==false) {
    $("#repassalert").css("display","none")
    repass_flag=false
      return false
  }
  else if(validatePass()){
    message("repass","Enter correct password first")
    $("#repassalert").css("display","flex")
    repass_flag=true
    return true
  }
  else if(inputpass.value==""){
    message("repass","Enter password first")
    $("#repassalert").css("display","flex")
    repass_flag=true
    return true
  }

  else {
    message("repass","Enter valid RePassword ")
    repass_flag=true
      return true
    
  }
  }
  function rightRepass(){
    if(inputpass.value==inputrepass.value&&inputrepass.value!=""&&validatePass()==false) {
      $("#repassalert").css("display","none")
      repass_flag=false
    }
    else{
      repass_flag=true
    }
  }
inputname.onblur=function(){
  validateName()
}

 
inputage.onblur=function(){
    validateAge()
}

inputphone.onblur=function(){
  validatePhone()
}

inputmail.onblur=function(){
  validateMail()
}

inputpass.onblur=function(){

  validatePass()
}

inputrepass.onblur=function(){
  validateRepass()
}
inputname.onkeyup=function(){
  rightName()
}


inputage.onkeyup=function(){
    rightAge()
}

inputphone.onkeyup=function(){
  rightPhone()
}

inputmail.onkeyup=function(){
  rightMail()
}

inputpass.onkeyup=function(){

  rightPass()
}

inputrepass.onkeyup=function(){
  rightRepass()
}

$("#contact input").focus(function(){
  switch (this.id) {
    case "name":
      if(validateName()==true){
        $(`#${this.id}alert`).css("display","flex")
      }
      break;
      case "phone":
      if(validatePhone()==true){
        $(`#${this.id}alert`).css("display","flex")
      }
      break;
      case "mail":
      if(validateMail()==true){
        $(`#${this.id}alert`).css("display","flex")
      }
      break;
      case "age":
      if(validateAge()==true){
        $(`#${this.id}alert`).css("display","flex")
      }
      break;
      case "pass":
      if(validatePass()==true){
        $(`#${this.id}alert`).css("display","flex")
      }
      break;
      case "repass":
      if(validateRepass()==true){
        $(`#${this.id}alert`).css("display","flex")
      }
      break;
  
    default:
      break;
  }
})


document.addEventListener("keyup",function(){
  if(phone_flag==false&&mail_flag==false&&repass_flag==false&&pass_flag==false&&age_flag==false&&name_flag==false){
    $("#mybtn").removeClass("disabled")
  }
  else
  {
    $("#mybtn").addClass("disabled")

  }
})

$(".btn_tv").click(function(){
  if(window.outerWidth<=600){
    $("#slide").animate({"left":-$(".options").outerWidth()},1000)
    $(".change i").toggleClass("fa-times")
  }
  $(".first-li a").html("On the Air")
  $(".first-li").addClass("changeColor")
  $(".second-li a").html("Airing Today")
  $(".btn_tv").addClass("alter")
  $(".btn_movie").removeClass("alter")
  $(".first-li").siblings().removeClass("changeColor")
  mov_flag=false;
  tv_flag=true;
sequnce(0)
})
$(".btn_movie").click(function(){
  if(window.outerWidth<=600){
    $("#slide").animate({"left":-$(".options").outerWidth()},1000)
    $(".change i").toggleClass("fa-times")
  }
  $(".first-li").addClass("changeColor")
  $(".first-li a").html("Now playing")
  $(".second-li a").html("Upcoming")
  $(".btn_tv").removeClass("alter")
 $(".btn_movie").addClass("alter")
 $(".first-li").siblings().removeClass("changeColor")
  mov_flag=true;
  tv_flag=false;
sequnce(0)
})