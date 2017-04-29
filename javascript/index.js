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
		url = 'http://localhost/practica2/rest/entrada/?ff='+tomorrow.getFullYear()+'-0'+m+'-'+tomorrow.getDate()+'&pag='+paginaindex+'&lpag='+lengthpage;
	}
	else
	{
		url = 'http://localhost/practica2/rest/entrada/?ff='+tomorrow.getFullYear()+'-'+m+'-'+tomorrow.getDate()+'&pag='+paginaindex+'&lpag='+lengthpage;
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
		url = 'http://localhost/practica2/rest/entrada/?ff='+tomorrow.getFullYear()+'-0'+m+'-'+tomorrow.getDate();
	}
	else
	{
		url = 'http://localhost/practica2/rest/entrada/?ff='+tomorrow.getFullYear()+'-'+m+'-'+tomorrow.getDate();
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