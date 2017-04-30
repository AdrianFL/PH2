var paginaindex=0;
var totalpaginas=0;
var lengthpage=6;

function mostrarUltimasEntradas()
{
	let xhr = new XMLHttpRequest();
	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate()+1);
	let m = tomorrow.getMonth();
	m++;
	let url;
	if(m < 10)
	{
		url = 'http://localhost/practica2/rest/entrada/?ff='+tomorrow.getFullYear()+'-0'+m+'-';
	}
	else
	{
		url = 'http://localhost/practica2/rest/entrada/?ff='+tomorrow.getFullYear()+'-'+m+'-';
	}
	if(tomorrow.getDate() < 10)
	{
		url+="0"+tomorrow.getDate()+'&pag='+paginaindex+'&lpag='+lengthpage;
	}
	else
	{
		url+=tomorrow.getDate()+'&pag='+paginaindex+'&lpag='+lengthpage;
	}
	xhr.open('GET', url, true);
	xhr.send();
	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){
			let a, b;
			a=document.querySelector('section');
			while(b = a.querySelector('article'))
			{
				b.remove();
			}
			let html='<h2>Ultimas entradas</h2>';
			for(let i=0; i<v.FILAS.length; i++)
			{
				let e = v.FILAS[i];
				html+='<article>';
				html+='<h2>';
				html+='<a href="entrada.html?id='+e.id+'">'+e.nombre+'</a>';
				html+='</h2>';
				html+='<figure>';
				html+='<img src="fotos/'+e.fichero+'" alt="'+e.descripcion_foto+'">';
				html+='<figcaption>'+e.descripcion+'<footer><a href="entrada.html?id='+e.id+'">Ver mas...</a></footer></figcaption>';
				html+='</figure>';
				html+='<div>';
				html+='<p>Fecha de publicaci&oacute;n:<time datetime="'+e.fecha+'">'+e.fecha+'</time></p>';
				html+='<p>Autor:'+e.login+'</p>';
				html+='</div>';
				html+='<footer>';
				html+='<p>N&uacute;mero de fotos:'+e.nfotos+'</p>';
				html+='<p>Comentarios:'+e.ncomentarios+'</p>';
				html+='</footer>';
				html+='</article>';
			}
			let indexshow=paginaindex+1;
			html+='<footer>';
			html+='<button onclick="firstpage()"><<</button>';
			html+='<button onclick="previouspage()"><</button>';
			html+='<button onclick="nextpage()">></button>';
			html+='<button onclick="lastpage()">>></button>';
			html+='<p> P&aacute;gina '+indexshow+' de '+totalpaginas+'</p>';
			html+='</footer>';
			document.querySelector('section').innerHTML=html;
		}
	}
	return false;
}

function mostrarUltimosComentarios()
{
	let xhr = new XMLHttpRequest();
	let url = 'http://localhost/practica2/rest/comentario/?u=10';
	xhr.open('GET', url, true);
	xhr.send();
	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){
			let a, b;
			a=document.querySelectorAll('main>section')[1];
			while(b = a.querySelector('article')){
				b.remove();
			}
			let html='<h2>Ultimos 10 comentarios</h2>';
			for(let i=0; i<v.FILAS.length; i++)
			{
				let e = v.FILAS[i];

				html+='<article>';
				html+='<header>';
				html+='<p>Autor: '+e.login+'</p>';
				html+='<p><time datetime="'+e.fecha+'">'+e.fecha+'</time></p>';
				html+='</header>';
				html+='<h2>'+e.nombre_entrada+'</h2>';
				html+='<h3><a href="entrada.html?id='+e.id_entrada+'">'+e.titulo+'</a></h3>';
				html+='<p>'+e.texto+'</p>';
				html+='</article>';
			}
			document.querySelectorAll('main>section')[1].innerHTML=html;
		}
	}
	return false;
}

function cargarIndex()
{
	calculaTotalPaginas();
	comprobarLogin();
	mostrarUltimosComentarios();
	return false;
}

function calculaTotalPaginas()
{
	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate()+1);
	let m = tomorrow.getMonth();
	m++;
	let url;
	if(m < 10)
	{
		url = 'http://localhost/practica2/rest/entrada/?ff='+tomorrow.getFullYear()+'-0'+m+'-';
	}
	else
	{
		url = 'http://localhost/practica2/rest/entrada/?ff='+tomorrow.getFullYear()+'-'+m+'-';
	}
	if(tomorrow.getDate() < 10)
	{
		url+="0"+tomorrow.getDate();
	}
	else
	{
		url+=tomorrow.getDate();
	}

	xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.send();
	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok')
		{
			totalpaginas= Math.floor(v.FILAS.length/lengthpage);
			if(v.FILAS.length%lengthpage!=0){
				totalpaginas++;
			}
			mostrarUltimasEntradas();
		}
	}
}

function firstpage()
{
	paginaindex=0;
	mostrarUltimasEntradas();
	return false;
}

function previouspage()
{
	if(paginaindex > 0)
	{
		paginaindex--;
		mostrarUltimasEntradas();
	}
	return false;
}

function nextpage()
{
	if(paginaindex < totalpaginas-1)
	{
		paginaindex++;
		mostrarUltimasEntradas();
	}
	return false;
}

function lastpage()
{
	paginaindex=totalpaginas-1;
	mostrarUltimasEntradas();
	return false;
}

function comprobarLogin()
{
	if(window.sessionStorage)
	{
		if(sessionStorage.getItem("Login"))
		{
			document.getElementById("ckb-login").remove();
			document.getElementById("ckb-register").remove();
		}
		else
		{
			document.getElementById("ckb-logout").remove();
			document.getElementById("ckb-newentry").remove();
		}
	}
	else
	{
		alert("Tu navegador no soporta sessionStorage");
	}
	return false;
}

function inicializarEntrada()
{
	cargarEntrada();
	comprobarLogin();
	cargarFormularioRespuesta();
	return false;
}

function cargarEntrada()
{
	let e = window.location.search;
	let varsurl = e.split("&");
	if(varsurl[0].indexOf("id") >= 0)
	{
		let identrada = varsurl[0].split("=")[1];
		let xhr = new XMLHttpRequest();
		let url = 'http://localhost/practica2/rest/entrada/'+identrada;
		xhr.open('GET', url, true);
		xhr.send();
		xhr.onload = function() {
			let v = JSON.parse(xhr.responseText);
			if(v.RESULTADO == 'ok')
			{
				let entrada = v.FILAS[0];
				let html='<h2>'+entrada.nombre+'</h2>';
				html+='<div>';
				html+='<p>Fecha de publicaci&oacute;n:<time datetime="'+entrada.fecha+'">'+entrada.fecha+'</time></p>';
				html+='<p>Autor:'+entrada.login+'</p>';
				html+='</div>';
				html+='<p>'+entrada.descripcion+'</p>';
				html+='<footer>';
				html+='<a href="entrada.html?id='+entrada.id+'#fotos">'+entrada.nfotos+' Fotos</a><br>';
				html+='<a href="entrada.html?id='+entrada.id+'#comentarios">'+entrada.ncomentarios+' Comentarios</a>';
				html+='</footer>';
				document.getElementById("entrada").innerHTML=html;
				cargarFotos(entrada.id);
				cargarComentarios(entrada.id);
			}
		}
	}
	else
	{
		window.location.replace("http://localhost/practica2");
	}
}

function cargarFotos(eid)
{
	let xhr = new XMLHttpRequest();
	let url = 'http://localhost/practica2/rest/entrada/'+eid+'/fotos';
	xhr.open('GET', url, true);
	xhr.send();
	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok')
		{
			let html = '<h3 id="fotos">Fotograf&iacute;as:</h3><div>';
			for(let i=0; i<v.FILAS.length; i++)
			{
				let e = v.FILAS[i];
				html+='<p>'+(i+1)+'</p>';
				html+='<figure>';
				html+='<img src="fotos/'+e.fichero+'" alt="'+e.texto+'">';
				html+='<figcaption>'+e.texto+'</figcaption>';
				html+='</figure>';
			}
			html+='</div>';
			document.getElementById("entrada").innerHTML+=html;
		}
	}
}

function cargarComentarios(eid)
{
	let xhr = new XMLHttpRequest();
	let url = 'http://localhost/practica2/rest/entrada/'+eid+'/comentarios';
	xhr.open('GET', url, true);
	xhr.send();
	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok')
		{
			let html = '<h3>Comentarios:</h3>';
			for(let i=0; i<v.FILAS.length; i++)
			{
				let e = v.FILAS[i];
				html+='<article>';
				html+='<header>';
				html+='<p>Autor: '+e.login+'</p>';
				html+='<p><time datetime="'+e.fecha+'">'+e.fecha+'</time></p>';
				html+='</header>';
				html+='<h4>'+e.titulo+'</h4>';
				html+='<p>'+e.texto+'</p>';
				if(window.sessionStorage)
				{
					if(sessionStorage.getItem("Login"))
					{
						html+='<footer>';
						html+='<button onclick="responderComentario(this);">Responder</button>';
						html+='</footer>';
					}
				}
				else
				{
					alert("Tu navegador no soporta sessionStorage");
				}
				html+='</article>';
			}
			document.getElementById("comentarios").innerHTML=html;
		}
	}
}

function cargarFormularioRespuesta()
{
	if(sessionStorage)
	{
		if(sessionStorage.getItem("Login"))
		{
			let html = '<form id="comentar" onsubmit="return postearComentario(this);">';
			html+='<h3>Dejar un comentario:</h3>';
			html+='<label for="titulo"><b>T&iacute;tulo:</b></label>';
			html+='<input type="text" name="titulo" id="titulo" placeholder="T&iacute;tulo" maxlength="50" required>';
			html+='<label for="comentario"><b>Comentario:</b></label>';
			html+='<textarea id="comentario" placeholder="Escribe aqu&iacute; tu comentario" required></textarea>';
			html+='<input type="submit" value="Enviar comentario">';
			html+='</form>';

			document.querySelector("main").innerHTML+=html;
		}
		else
		{
			let html = '<p>Para dejar un comentario debes estar <a href="login.html">logueado</a></p>';
			document.querySelector("main").innerHTML+=html;
		}
	}
	else
	{
		alert("Tu navegador no soporta sessionStorage");
	}
}

function postearComentario(frm)
{
	if(sessionStorage)
	{
		if(sessionStorage.getItem("Login") && sessionStorage.getItem("Clave"))
		{
			let xhr = new XMLHttpRequest();
			let url = 'http://localhost/practica2/rest/comentario/';
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', sessionStorage.getItem("Clave"));
			let fd = new FormData();
			fd.append("login", sessionStorage.getItem("Login"));
			fd.append("titulo", frm.titulo.value);
			fd.append("texto", frm.comentario.value);
			let e = window.location.search;
			let varsurl = e.split("&");
			let id=varsurl[0].split("=")[1];
			fd.append("id_entrada", id);
			xhr.send(fd);
			xhr.onload = function(){
				console.log(xhr.responseText);
				let v = JSON.parse(xhr.responseText);
				if(v.RESULTADO == 'ok')
				{
					let capa_fondo = document.createElement('div');
					let capa_frente = document.createElement('article');
					let texto = 'Comentario enviado correctamente';
					let html = '';

					capa_fondo.appendChild(capa_frente);
					html+='<h2>MENSAJE EMERGENTE</h2>';
					html+='<p>'+texto+'</p>';
					html+='<button onclick="comentarioCorrecto(this);">Cerrar</button>';
					capa_frente.innerHTML=html;

					capa_fondo.classList.add('capa-fondo');
					capa_frente.classList.add('capa-frente');

					document.body.appendChild(capa_fondo);
				}
				else
				{
					let capa_fondo = document.createElement('div');
					let capa_frente = document.createElement('article');
					let texto = 'Error al enviar el comentario';
					let html = '';

					capa_fondo.appendChild(capa_frente);
					html+='<h2>MENSAJE EMERGENTE</h2>';
					html+='<p>'+texto+'</p>';
					html+='<button onclick="comentarioIncorrecto(this);">Cerrar</button>';
					capa_frente.innerHTML=html;

					capa_fondo.classList.add('capa-fondo');
					capa_frente.classList.add('capa-frente');

					document.body.appendChild(capa_fondo);
				}
			}
		}
	}
	else
	{
		alert("Tu navegador no soporta sessionStorage");
	}
	return false;
}

function comentarioCorrecto(t)
{
	t.parentNode.parentNode.remove();
	let e = window.location.search;
	let varsurl = e.split("&");
	let id=varsurl[0].split("=")[1];
	cargarComentarios(id);
	document.getElementById("titulo").value = "";
	document.getElementById("comentario").value = "";
	return false;
}

function comentarioIncorrecto(t)
{
	t.parentNode.parentNode.remove();
	document.getElementById("titulo").focus();
	return false;
}

function hacerLogin(form){
	let fd = new FormData();
	let objetoaj = new XMLHttpRequest();
	let url = "http://localhost/practica2/rest/login/";

	objetoaj.open("POST", url, true);
	fd.append("login", form.login.value);
	fd.append("pwd", form.pass.value);
	objetoaj.send(fd);
	objetoaj.onload = function(){
		let v = JSON.parse(objetoaj.responseText);
		if(v.RESULTADO == 'ok')
		{
			if(sessionStorage)
			{
				sessionStorage.setItem("Login", v.login);
				sessionStorage.setItem("Clave", v.clave);
				sessionStorage.setItem("Nombre", v.nombre);
				sessionStorage.setItem("Email", v.email);
				sessionStorage.setItem("Ultimo_Acceso", v.ultimo_acceso);

				let capa_fondo=document.createElement('div');
				let capa_frente=document.createElement('article');
				let texto='Bienvenido '+v.nombre+', tu &uacute;ltima conexi&oacute;n fue: '+v.ultimo_acceso;
				let html='';

				capa_fondo.appendChild(capa_frente);
				html+='<h2>Inicio de sesi&oacute;n correcto</h2>';
				html+='<p>'+texto+'</p>';
				html+='<button onclick="document.location.href=\'index.html\'">Cerrar</button>';
				capa_frente.innerHTML=html;

				capa_fondo.classList.add('capa-fondo');
				capa_frente.classList.add('capa-frente');

				document.body.appendChild(capa_fondo);
			}
			else
			{
				alert("Tu navegador no soporta sessionStorage");
			}
		}
		else
		{
			let capa_fondo=document.createElement('div');
			let capa_frente=document.createElement('article');
			let texto='Revise su Login/Contrase&ntilde;a y vuelva a intentarlo';
			let html='';

			capa_fondo.appendChild(capa_frente);
			html+='<h2>Inicio de sesi&oacute;n incorrecto.</h2>';
			html+='<p>'+texto+'</p>';
			html+='<button onclick="loginFallido(this);">Cerrar</button>';
			capa_frente.innerHTML=html;

			capa_fondo.classList.add('capa-fondo');
			capa_frente.classList.add('capa-frente');

			document.body.appendChild(capa_fondo);


		}

	}

	return false;
}

function loginFallido(t)
{
	t.parentNode.parentNode.remove();
	document.getElementById("login").focus();
	return false;
}

function cerrarSesion()
{
	sessionStorage.clear();
	window.location.replace('http://localhost/practica2');
}

function cargarLogin()
{
	redirigirLogueados();
	comprobarLogin();
	return false;
}

function redirigirLogueados()
{
	if(sessionStorage)
	{
		if(sessionStorage.getItem("Login"))
		{
			window.location.replace("http://localhost/practica2");
		}
	}
	else
	{
		alert("Tu navegador no soporta sessionStorage");
	}
}

function responderComentario(t)
{
	document.getElementById("comentario").focus();
	document.getElementById("titulo").value = "Re:"+t.parentNode.parentNode.querySelector("h4").innerHTML;
	return false;
}