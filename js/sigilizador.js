'use strict';

//variáveis globais 
var button = document.getElementById('submit');
var form = document.getElementById('form');
var radio = document.getElementsByClassName('color');
var sigil_array = [];
var sigil_space = document.getElementById('generator');
var ctx = sigil_space.getContext('2d');
var user_string;


// funções auxiliares 
function random_number (max_num, min_num) {
  var max = Math.ceil(max_num);
  var min = Math.floor(min_num);
  var num = Math.round(Math.random()*(max-min))+min;
  return num;
}

// remove letras duplicadas, junta letras individuais com os arrays da biblioteca
function process_sigil(string) {
  var user_array = Array.from(new Set(string.split('').map(letter => letter.toLowerCase())));
  var to_remove = ['a','e','i','o','u','.','!',',',' ','/'];
  user_array = user_array.filter(letter => !to_remove.includes(letter));
  var sigil_array = [];
  for (var i = 0; i < user_array.length; i++){
    var user_letter = library[user_array[i]];
    sigil_array.push(user_letter[random_number(5,0)]);
  }
  return sigil_array;
}


/* Gerando novas formas

circles precisam de 5 índices no primeiro array, 
e a string 'arc' como retângulo precisa de quatro índices.
e a string 'rect' como linha precisa de 4 índices na primeira vez,
e a string 'line' como triângulo precisa de 6 índices na primeira vez,
e a string 'tri' como 1


/* Generating new shapes:
  circles need 5 indices in their first array, and the string 'arc' as [1]
  rectangles need 4 indicies in their first array, and the string 'rect' as [1]
  lines need 4 indicies in their first array, and the string 'line' as [1]
  triangles need 6 indicies in their first array, and the string 'tri' as [1]
  If you add a new template in the write_sigil function, be sure to incriment the max number in the random_number function a few lines above.
  */

var library ={
  b: [[[250, 275, 25, 0, 2], 'arc'], [[200, 175, 150, 0, 2], 'arc'], [[200, 50, 200, 450], 'line'], [[125,125,125,45,45,125], 'tri'], [[100,95, 75,175, 138,125, 62,125, 125,175, 100,95],'complex'], [[110, 102, 230, 180, 330, 440], 'bezier']],
  c: [[[200, 200, 35, 0, 1], 'arc'], [[200, 375, 50, 3, 2], 'arc'], [[300, 75, 390, 75],'line'], [[300, 200, 395,100, 300, 100], 'tri'], [[200,5, 175,85, 238,35, 162,35, 225,85, 200,5],'complex'], [[210, 202, 130, 180, 330, 440], 'bezier']],
  d: [[[200, 375, 25, 0, 2], 'arc'], [[200, 150, 20, 0, 1], 'arc'], [[50, 50, 350, 50], 'line'], [[200,200,200,250,250,200], 'tri'], [[115,200, 150, 250, 150, 200, 100, 225, 175, 225, 115,200],'complex'],[[20, 200, 380, 200, 200, 400], 'bezier']],
  f: [[[200, 50, 45, 0, 2], 'arc'], [[145, 185, 150, 150], 'rect'], [[200, 200, 200, 400], 'line'], [[100,100,150,100,100,150], 'tri'], [[300,45, 275,125, 338,75, 262,75, 325,125, 300,45],'complex'],[[100, 125, 50, 75, 300, 325], 'bezier']],
  g: [[[200, 175, 100, 0, 1],'arc'], [[200, 300, 25, 0, 1], 'arc'], [[50, 200, 350, 200], 'line'], [[300,250,300,150,200,200], 'tri'], [[2,200, 100, 250, 200, 100, 200, 100, 300, 250, 398,200],'complex'],[[390, 490, 10, 10, 300, 325], 'bezier']],
  h: [[[200, 50, 100, 0, 2],'arc'], [[200, 100, 50, 0, 2], 'arc'], [[200, 50, 200, 450], 'line'], [[150,495,250,495,200,400], 'tri'], [[100,100, 150, 150, 200, 50, 200, 50, 250, 150, 300,100],'complex'],[[250, 300, 200, 150, 350, 150], 'bezier']],
  j: [[[200, 145, 50, 0, 2 ], 'arc'], [[125, 50, 150, 13], 'rect'], [[250, 100, 250, 400], 'line'], [[100,125,125,100,90,90], 'tri'], [[100,195, 75,275, 138,225, 62,225, 125,275, 100,195],'complex'], [[200, 125, 350, 75, 375, 25], 'bezier']],
  k: [[[200, 270, 75, .15, 1], 'arc'], [[200, 250, 25, 0, 2], 'arc'], [[200, 50, 200, 450], 'line'], [[300,100,200,300,100,100], 'tri'], [[2,200, 100, 250, 150, 100, 250, 100, 300, 250, 398,200],'complex'], [[100, 125, 350, 375, 200, 25], 'bezier']],
  l: [[[135, 178, 40, 23, .5], 'arc'], [[120, 178, 160, 30], 'rect'], [[300, 150, 300, 250], 'line'], [[225,250,250,225,250,250], 'tri'], [[150,300, 100,250, 150,100, 250,100, 300,250, 250,300],'complex'], [[50, 475, 400, 475, 200, 80], 'bezier']],
  m: [[[200, 405, 60, 0, 2], 'arc'], [[170, 60, 69, 41], 'rect'], [[50, 400, 350, 400], 'line'], [[100,100,300,150,100,200], 'tri'], [[150,300, 100,250, 150,175, 250,175, 300,250, 250,300],'complex'], [[175, 25, 50, 75, 300, 325], 'bezier']],
  n: [[[300, 170, 80, 0, 1], 'arc'], [[65, 0, 275, 129], 'rect'], [[150, 150, 250, 150], 'line'], [[150,50,250,50,200,500], 'tri'], [[200,325, 100,250, 150,175, 250,175, 300,250, 200,325],'complex'], [[10, 125, 50, 275, 390, 425], 'bezier']],
  p: [[[310, 40, 35, 55, .5], 'arc'], [[200, 250, 50, 0, 2], 'arc'], [[300, 200, 300, 450], 'line'], [[300,125,260,150,250,100], 'tri'], [[200,425, 125,250, 170,100, 230,100, 275,250, 200,425],'complex'], [[200, 125, 350, 75, 100, 425], 'bezier']],
  q: [[[200, 390, 80, 0, 2], 'arc'], [[160, 104, 80, 120], 'rect'], [[2, 490, 390, 490], 'line'], [[50,125,350,125,200,200], 'tri'], [[200,195, 175,275, 238,225, 162,225, 225,275, 200,195],'complex'], [[300, 25, 350, 75, 200, 225], 'bezier']],
  r: [[[250, 150, 8, 0, 2], 'arc'], [[200, 250, 150, 0, 2], 'arc'], [[150, 250, 300, 250], 'line'], [[225,225,225,245,245,225], 'tri'], [[200,295, 175,375, 238,325, 162,325, 225,375, 200,295],'complex'], [[60, 100, 60, 300, 200, 250], 'bezier']],
  s: [[[25, 330, 70, 35, .5], 'arc'], [[200, 250, 100, 0, 2], 'arc'], [[200, 50, 200, 450], 'line'], [[150,50,250,50,200,2], 'tri'], [[200,395, 175,475, 238,425, 162,425, 225,475, 200,395],'complex'], [[10, 25, 390, 475, 200, 200], 'bezier']],
  t: [[[75, 75, 15, 0, 2], 'arc'], [[200, 250, 175, 0, 2], 'arc'], [[200, 2, 200, 500], 'line'], [[200,50,200,100,150,75], 'tri'], [[200,95, 175,175, 238,125, 162,125, 225,175, 200, 95],'complex'], [[250, 425, 5, 100, 200, 5], 'bezier']],
  v: [[[200, 75, 40, .15, 1], 'arc'], [[140, 400, 124, 147], 'rect'], [[200, 150, 200, 250], 'line'], [[200,300,200,400,300,350], 'tri'], [[200,2, 175,75, 238,25, 162,25, 225,75, 200, 2],'complex'], [[150, 175, 450, 475, 300, 250], 'bezier']],
  w: [[[200, 75, 10, 86, .5], 'arc'], [[180, 69, 40, 40], 'rect'], [[150, 250, 300, 250], 'line'], [[350,350,350,450,200,400], 'tri'], [[150,300, 150,200, 150,175, 250,175, 250,200, 250,300],'complex'], [[100, 125, 250, 275, 30, 25], 'bezier']],
  x: [[[300, 100, 95, 0, 2], 'arc'], [[72, 32, 250, 16], 'rect'], [[50, 250, 350, 250], 'line'], [[50,350,200,50,350,350], 'tri'], [[150,300, 150,200, 150,175, 250,175, 250,200, 250,300],'complex'], [[390, 425, 350, 475, 200, 225], 'bezier']],
  y: [[[280, 300, 100, 0, 1], 'arc'], [[75, 75, 250, 11], 'rect'], [[100, 50, 100, 150], 'line'], [[200,250,100,300,300,300], 'tri'], [[300,295, 275,375, 338,325, 262,325, 325,375, 300,295],'complex'], [[300, 125, 200, 75, 100, 325], 'bezier']],
  z: [[[200, 390, 100, 0, 1], 'arc'], [[48, 140, 300, 128], 'rect'], [[50, 100, 150, 100], 'line'], [[100,125,200,45,300,125], 'tri'], [[300,395, 275,475, 338,425, 262,425, 325,475, 300,395],'complex'], [[300, 225, 250, 375, 100, 225], 'bezier']],

};

function write_sigil(sigil_array){

  ctx.clearRect(0,0,400,500);
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'miter';
  ctx.shadowColor = (102, 102, 153, .75);
  ctx.shadowBlur = 10;
  ctx.beginPath();

  for (var l = 0; l < sigil_array.length; l ++){
    if (sigil_array[l][1] === 'rect'){
      ctx.rect(sigil_array[l][0][0], sigil_array[l][0][1], sigil_array[l][0][2], sigil_array[l][0][3]);
    }
    else if (sigil_array[l][1] === 'arc'){
      ctx.arc(sigil_array[l][0][0], sigil_array[l][0][1], sigil_array[l][0][2], sigil_array[l][0][3], sigil_array[l][0][4] * Math.PI);
    }
    else if (sigil_array[l][1] === 'line'){
      ctx.moveTo(sigil_array[l][0][0], sigil_array[l][0][1]);
      ctx.lineTo(sigil_array[l][0][2], sigil_array[l][0][3]);
    }
    else if (sigil_array[l][1] === 'tri'){
      ctx.lineTo(sigil_array[l][0][0], sigil_array[l][0][1]);
      ctx.lineTo(sigil_array[l][0][2], sigil_array[l][0][3]);
      ctx.lineTo(sigil_array[l][0][4], sigil_array[l][0][5]);
      ctx.closePath();
    }
    else if (sigil_array[l][1] === 'complex') {
      ctx.lineTo(sigil_array[l][0][0], sigil_array[l][0][1]);
      ctx.lineTo(sigil_array[l][0][2], sigil_array[l][0][3]);
      ctx.lineTo(sigil_array[l][0][4], sigil_array[l][0][5]);
      ctx.lineTo(sigil_array[l][0][6], sigil_array[l][0][7]);
      ctx.lineTo(sigil_array[l][0][8], sigil_array[l][0][9]);
      ctx.lineTo(sigil_array[l][0][10], sigil_array[l][0][11]);

    }
    else if (sigil_array[l][1] === 'bezier'){
      ctx.bezierCurveTo(sigil_array[l][0][0], sigil_array[l][0][1], sigil_array[l][0][2], sigil_array[l][0][3], sigil_array[l][0][4], sigil_array[l][0][5]);

    }
    ctx.stroke();
  }
}

//Armazenando input localmente
var save_button = document.getElementById('save');
var text_array = [];
var img_array = [];


var local_storage = function(event){

  event.preventDefault();
  
  //Transforma a imagem do canvas numa URL
  var new_img = sigil_space.toDataURL(); 
  //  Se o armazenamento local existe, add parse image URl e o add para o array
  if (localStorage.getItem('pic')){ 
    var stringy_img_array = localStorage.getItem('pic');
    img_array=JSON.parse(stringy_img_array);}

  if(localStorage.getItem('text')){
    var stringy_text_array = localStorage.getItem('text');
    text_array = JSON.parse(stringy_text_array);}
    // Adicionando nova imagem para o array
    img_array.push(new_img); 
    text_array.push(user_string);
    console.log(img_array);
    console.log(text_array);

    //Transformando em string e armazenando img_array localmente

    stringy_img_array = JSON.stringify(img_array); 
    localStorage.setItem('pic', stringy_img_array);
    stringy_text_array = JSON.stringify(text_array);
    localStorage.setItem('text', stringy_text_array);
};
save_button.addEventListener('click', local_storage);



//object instantnation(necessary?)

//event lisiteners
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var container = document.querySelector('.container');
var flyText = document.querySelector('.fly-text');
var xButton = document.querySelector('#xbutton');

var target_left_arrow = document.getElementById('left-arrow');
var target_right_arrow = document.getElementById('right-arrow');


function render_sigil(event){
  event.preventDefault();
  user_string = document.getElementById('text-input').value;
  console.log('user_string', user_string);

  var sigil_array = process_sigil(user_string);

  console.log(sigil_array);
  write_sigil(sigil_array);
}

// Saving sigils made into local storage

//radio buttons
var moods = document.getElementById('form');
var mood_value;

function handle_mood(color_selection){
  color_selection.preventDefault();
  if(document.getElementById('happy').checked){
    mood_value = document.getElementById('happy').value;
  }else if(document.getElementById('chill').checked){
    mood_value = document.getElementById('chill').value;
  }else if(document.getElementById('chaotic').checked){
    mood_value = document.getElementById('chaotic').value;
  }else if(document.getElementById('sad').checked){
    mood_value = document.getElementById('sad').value;
  }
  return(mood_value);
}

function change_color(render_color_theme){
  if(mood_value === 'happy'){
    ctx.strokeStyle = '#000';

    sigil_space.style.backgroundImage = 'url(/img/newhappy.jpg)';

  }else if(mood_value === 'chill'){
    ctx.strokeStyle = '#000';
    sigil_space.style.backgroundImage = 'url(/img/chill.jpg)';

  }else if(mood_value === 'chaotic'){
    ctx.strokeStyle = '#fff';
    sigil_space.style.backgroundImage = 'url(/img/chaos.jpg)';

  }else if(mood_value === 'sad'){
    ctx.strokeStyle = '#000';
    sigil_space.style.backgroundImage = 'url(/img/sad3.jpg)';
  } else{
    ctx.strokeStyle = '#ffffff';
  }
  
}

moods.addEventListener('submit', function(event){
  handle_mood(event);
  change_color(event);
  render_sigil(event);
});

// Criando função download para o canva

var canvas = document.getElementById('generator');  
window.onload = function(){  
    init();  
};    
function init(){  
    var context = canvas.getContext('2d');    
    context.beginPath();       
}
// Criando função de download do sigilo gerado

function downloadCanvas(){  
    // pegando dados do canva 
    var image = canvas.toDataURL();   
    // create link temporário
    const tmpLink = document.createElement( 'a' );  
    tmpLink.download = 'sigilo.png'; 
    tmpLink.href = image;  
    // adiciona temporariamente link para o corpo da página e faz o download
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink );  
}