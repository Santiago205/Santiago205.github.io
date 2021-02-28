﻿﻿const rutaBase = "https://www.youtube.com/embed/";

function cambiar(direccion){
	let rutaActual = document.getElementById('videos').src.substr(30);	
	let rutas = [];
	let coinciden = false;

	readJsonFile(function(articulos){
		for (let i = 0; i < articulos.length; i++){
			if (articulos[i].ruta != undefined){
				rutas.push(articulos[i].ruta);
			}			
		}
		if(direccion === 'previo'){
			rutas.reverse();
		}	
	
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
	})	
}

function animateImg(e, r = ''){
	e.children[0].src = "img/videos/" + r + e.children[0].id + ".webp"
}

function cargarVideos(e){
	let videos = document.querySelector('.main')
	let filtrar = false;
	let busqueda = '';
	if (e != undefined){
		if(e.key === undefined){
			busqueda = e.value.toUpperCase();
		}else{
			busqueda = e.target.value.toUpperCase();
		}
	}	
	if (busqueda.length > 0){
		filtrar = true;		
	}
	if (videos.childElementCount > 0){
		videos.innerHTML = '';
	}
	readJsonFile(function(articulos){
		for (let i = 1; i < articulos.length; i++){
			if(articulos[i].titulo.toUpperCase().indexOf(busqueda) != -1 || filtrar === false){
				let video = document.createElement('div')
				video.setAttribute('class', 'tarjeta');
				video.setAttribute('onmouseover', 'animateImg(this, "webp/")');
				video.setAttribute('onmouseout', 'animateImg(this)');	
				video.setAttribute('onclick', 'cargar("video", this)');	
				video.innerHTML += '<img id="img' + i + '" class="miniatura" src="img/videos/img' + i + '.webp" alt="video"/>';
				video.innerHTML += "<h3>" + articulos[i].titulo + "</h3>";
				videos.appendChild(video);
			}
		}
	})
}

function cargar(state, e){
	let logo = '<div class="group"><div class="logo"><a ><img id="imgLogo" src="img/photo.jpg" alt="logo"/></a></div><h1>SJ Discover</h1></div><div class="group"><div class="menu">'
	let menu1 = '<a class="boton_personalizado" onclick="cargar(\'';
	let menu2 = '';
	let menu3 = '</h3></a></div>';
	let buscador = '';
	let header = document.querySelector('header');
	let container = document.querySelector('.container');
	let footer = document.querySelector('footer');
	header.innerHTML = '';
	container.innerHTML = '';
	footer.innerHTML = '';
	let titulo = '';
	let texto = '';

	if(state === 'articulos'){
		state = 'inicio';
		menu2 = 'Inicio'
		buscador = '<input id="buscador" type="search" onsearch="cargarVideos(this)"/>';
		container.classList.add('main');
		cargarVideos();		
	}else if(state === 'inicio'){
		state = 'articulos';
		menu2 = 'Articulos cientificos';	
		container.classList.remove('main');	
		container.insertAdjacentHTML('afterbegin', '<div class="slider"><a onclick="cambiar(\'previo\')" class="prev" >&#10094;</a><iframe id="videos" width="90%" height="350" src="https://www.youtube.com/embed/LUPpLl1cRDI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><a onclick="cambiar(\'siguiente\')" class="next" >&#10095;</a></div>');
		readJsonFile(function(articulos){
			titulo = '<h2 class="tituloprincipal">' + articulos[0].titulo + '</h2>';
			for (let p of articulos[0].texto){
				texto += '<p class="textprincipal">' + p + '</p>';
			}
			container.insertAdjacentHTML('beforeend', titulo + texto)
		})		
	}else if(state === 'video'){
		let n = parseInt(e.children[0].id.substr(3));
		state = 'articulos';
		menu2 = 'Articulos cientificos';	
		container.classList.remove('main');			
		readJsonFile(function(articulos){
			container.insertAdjacentHTML('afterbegin', '<div class="slider"><iframe id="videos" width="90%" height="350" src="https://www.youtube.com/embed/' + articulos[n].ruta + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');
			titulo = '<h2 class="tituloprincipal">' + articulos[n].titulo + '</h2>';
			for (let p of articulos[n].texto){
				texto += '<p class="textprincipal">' + p + '</p>';
			}
			container.insertAdjacentHTML('beforeend', titulo + texto)
		})		
	}

	header.insertAdjacentHTML('afterbegin', logo + menu1 + state + '\')" ><h3>' + menu2 + menu3 + buscador + '</div>');
	footer.insertAdjacentHTML('afterbegin', '<div class="group"><h2>SJ Discover &copy; 2020 Diseñado por su Papá.</h2></div><div class="group"><a class="icon-sololearn redes" href="https://www.sololearn.com/Profile/17309722" target="_blank"></a><a class="icon-github redes" href="https://github.com/Santiago205" target="_blank"></a><a class="icon-facebook redes" href="https://www.facebook.com/lacienciaestaaqui/?modal=admin_todo_tour" target="_blank"></a><a class="icon-youtube redes" href="https://www.youtube.com/channel/UC_mdhS565pyju92xduvJhmg?view_as=subscriber" target="_blank"></a><a class="icon-twitter redes" href="https://twitter.com/CienciaEsta" target="_blank"></a></div>');
	
	if(buscador != ''){
		var buscar = document.querySelector('#buscador');
		buscar.addEventListener('keyup', cargarVideos);
	}
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