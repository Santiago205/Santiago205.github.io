var buscar = null;
const rutaBase = "https://www.youtube.com/embed/";
const rutaVideo = [
		"vG1TVXWvncA",		
		"eDXHP5WF8yc",
		"D5GP5zZORF4",
		"2QqY1dvmojM",
		"17tthLrI_Dg",
		"WUKEl5BWHas",
		"JVPLDSU02q0",
		"bxIP3kjEtzc",
		"xUag_KNC3tc",
		"H4BgUiGLfHE",
		"Y7Wescxw0ss",
		"yjlgSxX--DQ",
		"a7Op2r8-WVo",
		"bAQJfFC-maI",
		"tg6YhExqJYg",
		"zj42IGZvBbA",
		"ddQNFBVmtuw",
		"ePALzFsJyvI",
		"r0O6P_dz5ZU",
		"VwZewFip65I",
		"50HJByeMGhc",
		"fwRvYU9JR3E",
		"-d2nBQWMohs",
		"5B9p3lxF7uo"
	];
const img = [
	"¿Que es la ciencia?", 
	"Tiempo y espacio entre los planetas con el sol", 
	"Las cosas mas rapidas del universo", 
	"Todas las ciencias que existen", 
	"la sensacion del tiempo en animales", 
	"Maduro evitando la ayuda humanitaria",
	"Los ciervos zombis", 
	"Las cosas mas rapidas del universo #2", 
	"hemos existido y seguiremos existiendo", 
	"¿Porque las galaxias son planas?", 
	"20 curiosidades de la luna", 
	"agua en marte", 
	"¿El tiempo es el creador del universo?", 
	"¿Que Habia Antes Del Big Bang?", 
	"La primera imagen de un agujero negro", 
	"la evolucion del ser humano #1", 
	"Ideas antiguas y actuales del universo", 
	"Meteoroides, meteoros y meteoritos", 
	"Elementos y distancias del universo", 
	"origen y organizacion del sistema solar", 
	"¿Que es una estrella?", 
	"¿Existe realmente la nada?", 
	"La velocidad warp", 
	"Las 5 Extinciones Masivas", 
	"Test de Astronomia"
	];

function siguiente(){	
	let rutaActual = document.getElementById('videos').src.substr(30);
	let rutas = rutaVideo.slice();
	let coinciden = false;
	
	for (let i = 0; i < rutas.length; i++){
		if (coinciden){
			document.getElementById('videos').src = rutaBase + rutas[i];
			coinciden = false;
		}
		if (rutas[i] === rutaActual){						
			coinciden = true;
			if(i === (rutas.length - 1)){
				document.getElementById('videos').src = rutaBase + rutas[0];
				coinciden = false;
			}
		}else{
			coinciden = false;
		}		
	}
}

function previo(){
	let rutaActual = document.getElementById('videos').src.substr(30);	
	let rutas = rutaVideo.slice();	
	let coinciden = false;
	rutas.reverse();
	
	for (let i = 0; i < rutas.length; i++){	
		if (coinciden){
			document.getElementById('videos').src = rutaBase + rutas[i];
			coinciden = false;
		}
		if (rutas[i] === rutaActual){		
			coinciden = true;
			if(i === (rutas.length - 1)){
				document.getElementById('videos').src = rutaBase + rutas[0];
				coinciden = false;
			}
		}else{
			coinciden = false;
		}		
	}
}

function animateImg(e){
	e.children[0].src = "img/videos/webp/" + e.children[0].id + ".webp"
}

function normalImg(e){
	e.children[0].src = "img/videos/" + e.children[0].id + ".webp"
}

function cargarVideos(){
	let videos = document.querySelector('.main')
	
	for (let i = 0; i < img.length; i++){
		let video = document.createElement('div')
		video.setAttribute('class', 'tarjeta');
		video.setAttribute('onmouseover', 'animateImg(this)');
		video.setAttribute('onmouseout', 'normalImg(this)');		
		video.innerHTML += '<img id="img' + (i + 1) + '" class="miniatura" src="img/videos/img' + (i + 1) + '.webp" alt="video"/>';
		video.innerHTML += "<h3>" + img[i] + "</h3>";
		videos.appendChild(video);
	}
	buscar = document.querySelector('#buscador');
	buscar.addEventListener('keyup', filtrar);
}

function filtrar(e){
	let videos = document.querySelector('.main')
	if (e.target.value.length > 0){
		videos.innerHTML = '';
		for (let i = 0; i < img.length; i++){
			if(img[i].toUpperCase().indexOf(e.target.value.toUpperCase()) != -1){
				let video = document.createElement('div')
				video.setAttribute('class', 'tarjeta');
				video.setAttribute('onmouseover', 'animateImg(this)');
				video.setAttribute('onmouseout', 'normalImg(this)');		
				video.innerHTML += '<img id="img' + (i + 1) + '" class="miniatura" src="img/videos/img' + (i + 1) + '.webp" alt="video"/>';
				video.innerHTML += "<h3>" + img[i] + "</h3>";
				videos.appendChild(video);
			}
		}
	}else{
		videos.innerHTML = '';
		cargarVideos();
	}
}

function cargar(){
	let header = document.querySelector('header');
	let footer = document.querySelector('footer');
	
	header.insertAdjacentHTML('afterbegin', '<div class="group"><div class="logo"><a href="index.html"><img id="imgLogo" src="img/photo.jpg" alt="logo"/></a></div><h1>La Ciencia Esta Aqui</h1></div><div class="group"><div class="menu"><a class="boton_personalizado" href="index.html"><h3>Inicio</h3></a><a class="boton_personalizado" href="videos.html"><h3>Videos</h3></a><a class="boton_personalizado" href="videos_por_escrito_mas_recientes.html"><h3>Artí­culos cientí­ficos</h3></a></div><input id="buscador" type="search" onsearch="filtrar()"/></div>');
	footer.insertAdjacentHTML('afterbegin', '<div class="group"><h2>La ciencia esta aquí &copy; 2020 Diseñado por su Papá.</h2></div><div class="group"><a class="icon-sololearn redes" href="https://www.sololearn.com/Profile/17309722" target="_blank"></a><a class="icon-github redes" href="https://github.com/Santiago205" target="_blank"></a><a class="icon-facebook redes" href="https://www.facebook.com/lacienciaestaaqui/?modal=admin_todo_tour" target="_blank"></a><a class="icon-youtube redes" href="https://www.youtube.com/channel/UC_mdhS565pyju92xduvJhmg?view_as=subscriber" target="_blank"></a><a class="icon-twitter redes" href="https://twitter.com/CienciaEsta" target="_blank"></a></div>');
	
}

function readJsonFile(callback){
	let file = "articulos/articulos.json";
	let request = new XMLHttpRequest();
	request.open('GET', file);
	request.responseType = 'json';
	request.send();
	request.onload = function(){
		callback(request.response);
	}
}



