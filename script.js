window.addEventListener("load",init);
function ID(elem) {
    return document.getElementById(elem);
}
var nrow =3;
var ncell = 3;
var tt  = new Array(nrow);
var newrow;
var empty;
var rowwalker;
var cellwalker;
var lepes=0;
var kever=true;




function init(){
tabla();

ID("gomb").addEventListener("click", function () {
  
    shuffle();
} );

}

function tabla(){
for(var i=0;i<nrow;i++){
    newrow=document.getElementById("tologatos").insertRow(i);//tr
    tt[i] = new Array(ncell); //tömb 2. dimenziója
    for(var j=0;j<ncell;j++){
        tt[i][j]=newrow.insertCell(j);//td
        tt[i][j].id=i*ncell+j;
        tt[i][j].onclick=function(){mystep(this);};
        tt[i][j].style.width="50px";
        tt[i][j].style.height="50px";
        tt[i][j].style.color="black";
        tt[i][j].style.background="blue";
        tt[i][j].innerHTML=parseInt(tt[i][j].id)+1;
        // A JS 0-tol szamolja a tombelemeket, de a puzzle 1-tol!
      }
  }
  
  // ============ Ures cella az utolso helyre
  empty=nrow*ncell-1;
 
  document.getElementById(empty.toString()).style.background="beige";
  document.getElementById(empty.toString()).innerHTML="";
 
}
// ============ Lepesek kezelese
function mystep(obj){ //az obj az egy td
  
  var nid = parseInt(obj.id); //amit mozgatunk
  var nempty = parseInt(empty); //üres

    if (nid+ncell==nempty|| nid-ncell==nempty ||
       nid+1==nempty && nempty%ncell!=0||
       nid-1==nempty && nid%ncell!=0){//alatta,fölötte,jobbra, balra van az üres
       
       document.getElementById(empty.toString()).innerHTML = document.getElementById(obj.id).innerHTML; 
       document.getElementById(empty.toString()).style.background = document.getElementById(obj.id).style.background;
       document.getElementById(obj.id).style.background="beige";
       document.getElementById(obj.id).innerHTML="";
       empty=obj.id;
       lepes++;
       vege();
    }
}
  
// ============ Cellakevero
function shuffle(){
  kever=true;
  for(var i=0;i<nrow*ncell*4;i++){
    rowwalker=Math.floor(empty/ncell);//melyik sorban van az üres
    cellwalker=empty%ncell;//soron belül melyik helyen
  
    
    switch(Math.floor(Math.random()*4)) {
      case 0: // right or left
        cellwalker+=(cellwalker<ncell-1)?1:-1;
        break;
      case 1: // left or right
        cellwalker+=(cellwalker>0)?-1:1;
        break;
      case 2: // down or up
        rowwalker+=(rowwalker<nrow-1)?1:-1;
        break;
      case 3: // up or down
        rowwalker+=(rowwalker>0)?-1:1;
        break;
    }
  
    mystep(document.getElementById((rowwalker*ncell+cellwalker).toString()));//td-t kap
  }
  lepes=0;
  kever=false;
}

function vege(){
  var db=0;
  if (kever==true){
    return;
  }
  for(var i=0;i<nrow;i++){
   
    for(var j=0;j<ncell;j++){
      if(tt[i][j].innerHTML==parseInt(tt[i][j].id)+1){
        db++;
      }
    }
  }
  setTimeout(function () {
  if (db==8 && lepes!=0){
    alert("Gratulálok! Vége a játéknak. Lépések száma: "+lepes);//keverésnél ne írja ki, fejlesztési lehetőség
  }
  }, 200);
}

