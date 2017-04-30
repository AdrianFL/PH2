function comprobar(){
	if(sessionStorage.getItem('logged')){
		//acceso desde el perfil
	}
	else{
		//venir de login
	}
}


function crearObjeto(){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest;
	}
	else if(window.ActiveXObject){
		xmlhttp = new ActiveObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}


function registro(form){
	var formdata = new FormData();
	if(sessionStorage.getItem('logged')){

		fd.append("clave", sessionStorage.getItem("clave"));

		fd.append("login", document.getElementById("usr").value);
		sessionStorage.setItem("login", document.getElementById("usr").value);

		fd.append("email", document.getElementById("mail").value);
		sessionStorage.setItem("email", document.getElementById("mail").value);

		fd.append("nombre", document.getElementById("nombre").value);
		sessionStorage.setItem("nombre", document.getElementById("nombre").value);

		if(document.getElementById("pass").value!=""){
			var iguales = validaPsw(document.getElementById("pass").value, document.getElementById("pass2").value)
			if(iguales==0){
				fd.append("pwd", document.getElementById("pass").value);
				fd.append("pwd2", document.getElementById("pass2").value);
				sessionStorage.setItem("pwd", document.getElementById("pass").value);
			}
			else{
				fd.append("pwd", sessionStorage.getItem("pass"));
				fd.append("pwd2", sessionStorage.getItem("pass"));
			}
		}
		else{
			fd.append("pwd", sessionStorage.getItem("pass"));
			fd.append("pwd2", sessionStorage.getItem("pass"));
		}

		var nm = sessionStorage.getItem("nombre");
		var ml = sessionStorage.getItem("email");
		var ps = sessionStorage.getItem("pwd");

	} 
	else{
		formadata = newFromData(form);
		var nm = document.getElementById("nombre").value;
		var ml = document.getElementById("mail").value;
		var ps = document.getElementById("pass").value;
	}

	var xmlhttp = crearObjeto();
	var url="rest/usuario";

	xmlhttp.onload = function(){

		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var res = JSON.parse(xmlhttp.responseText);
				console.log(xmlhttp.responseText);
				sessionStorage.setItem("nombre", nm);
				sessionStorage.setItem("email", ml);
				sessionStorage.setItem("pwd", ps);
				document.getElementById("usr").disabled=true;
				document.getElementById("pass").disabled=true;
				document.getElementById("pass2").disabled=true;
				document.getElementById("nombre").diabled=true;
				document.getElementById("mail").disabled=true;
				document.getElementById("buttonregistro").disabled=true;


				document.getElementById("transparencia").style.display="initial";
				document.getElementById("msgpwd").style.display="none";

				if(sessionStorage.getItem('logged')){
					document.getElementById("loginmsg").innerHTML="Se han cambiado los datos correctamente. Redirigiendo.<br><input type='button' value='Cerrar' onclick='GoPerfil();'/><br>";
				}
				else{
					document.getElementById("loginmsg").innerHTML="Usted se ha registrado correctamente. Redirigiendo.<br><input type='button' value='Cerrar' onclick='GoLogin();'/><br>";
				}
			}
			else if(xmlhttp.status == 400){
				validaPsw(document.getElementById("pass").value, document.getElementById("pass2").value);
			}
		}

		return false;

	};
	return false;

}

function validaPsw(pwd, pwd2){

	if(pwd1.localeCompare(pwd2)!=0){

		document.getElementById("msgpwd").style.display="initial";
		document.getElementById("pass").value="";
		document.getElementById("pass2").value="";
		document.getElementById("pass").focus();

		return pwd1.localeCompare(pwd2);
	}
	return pwd1.localeCompare(pwd2);

}

function GoLogin(){
	window.location.replace("login.html");
}

function GoPerfil(){
	window.location.replace("registro.html");
}

function validaUsr(){

	var formdata = new FormData();
	var xmlhttp = new XMLHttpRequest();
	var url = "rest/login/" + document.getElementById("usr").value;

	xmlhttp.onreadystatechange = procesaCambioVal;
	xmlhttp.open("GET", url, true);
	xmlhttp.send(fd);
	document.getElementById("msglogin").style.display="none";
	document.getElementById("logindisponible").style.display="none";
	
	function procesarCambioVal(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var res = JSON.parse(xmlhttp.responseText);
				console.clear();
				console.log(res.DISPONIBLE);
				if(!res.DISPONIBLE){
					document.getElementById("logindisponible").style.display="none";
					document.getElementById("msglogin").style.display="block";
				}
				if(res.DISPONIBLE){
					document.getElementById("msglogin").style.display="none";
					document.getElementById("logindisponible").style.display="block";
				}
			}
			else{

			}
		}
	}

	return false;
}