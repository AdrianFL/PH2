
mostrar="";
window.onload = viajes10();

var paginaActual = 1;
var paginasTotales;


function crearObjeto(){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}
	else if(window.ActiveXObject){
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}


function buscarEntrada(){

	var xmlhttp = crearObjeto();
	url="rest/entrada/?";

	var pagina = 0;
	var pagPorRegis = 6;
	var aux=paginaActual-1;

	url+="pag"+aux+"&";
	url+="lpag"+pagPorRegis+"&";

	var n = document.getElementById('titulo').value;
	var d = document.getElementById('texto').value;
	var fi = document.getElementById('fecha1').value;
	var ff = document.getElementById('fecha2').value;
	var l = document.getElementById('autor').value;

	if(n!=""){
		url+="titulo="+n+"&";
	}
	if(d!=""){
		url+="texto="+d+"&";
	}
	if(fi!=null){
		url+="fecha1="+d+"&";
	}
	if(ff!=null){
		url+="fecha2="+ff+"&";
	}
	if(l!=""){
		url+="autor="+l+"&";
	}

	xmlhttp.onreadystatechange=busqueda;
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

		function busqueda(){

			if(xmlhttp.readyState == 4){
				if(xmlhttp.status==200){
					var res=JSON.parse(xmlhttp.responseText);
					console.log(res);
					if(res.TOTAL_COINCIDENCIAS<pagPorRegis){
						paginasTotales=1;
					}
					else{
						paginasTotales=parseInt(res.TOTAL_COINCIDENCIAS/pagPorRegis);
						paginasTotales++;
					}
					var i=0;
					for(i=0; i<res.Filas.length;i++){
						var ent=res.Filas[i];
						var aux=emt.fecha;
						var parts = aux.split(' ');
						var parts2 = parts[0].split('-');
						mostrar+='<article>';
						mostrar+='<h2>';
						mostrar+='<a href="entrada.html?id='+ent.id+'">'+ent.nombre+'</a>';
						mostrar+='</h2>';
						mostrar+='<figure>';
						mostrar+='<img src="fotos/'+ent.fichero+'" alt="'+ent.descripcion_foto+'">';
						mostrar+='<figcaption>'+ent.descripcion+'<footer><a href="entrada.html?id='+ent.id+'">Ver mas...</a></footer></figcaption>';
						mostrar+='</figure>';
						mostrar+='<div>';
						mostrar+='<p>Fecha de publicaci&oacute;n:<time datetime="'+ent.fecha+'">'+ent.fecha+'</time></p>';
						mostrar+='<p>Autor:'+ent.login+'</p>';
						mostrar+='</div>';
						mostrar+='<footer>';
						mostrar+='<p>N&uacute;mero de fotos:'+ent.nfotos+'</p>';
						mostrar+='<p>Comentarios:'+ent.ncomentarios+'</p>';
						mostrar+='</footer>';
						mostrar+='</article>';

					}

					var indexshow=paginaActual;
					mostrar+='<footer>';
					mostrar+='<button onclick="firstpage()"><<</button>';
					mostrar+='<button onclick="previouspage()"><</button>';
					mostrar+='<button onclick="nextpage()">></button>';
					mostrar+='<button onclick="lastpage()">>></button>';
					mostrar+='<p> P&aacute;gina '+indexshow+' de '+totalpaginas+'</p>';
					mostrar+='</footer>';
					document.getElementById("imprimirbusqueda").innerHTML=mostrar;

				}


			}
		}

		return false;
}

function firstpage()
{
	if(paginaActual>1){
		paginaActual=1;
		buscar();
	}
}

function previouspage()
{
	if(paginaActual>1){
		paginaActual-=1;
		buscar();
	}
}

function nextpage()
{
	if(paginaActual<paginasTotales){
		paginaActual+=1;
		buscar();
	}
}

function lastpage()
{
		if(paginaActual<=paginasTotales){
		paginaActual=paginasTotales;
		buscar();
	}
}

function entrada(id){

	localStorage.setItem("identrada", id);
	window.location.href="entrada.html";

}