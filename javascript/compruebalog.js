

if(window.localStorage){
	var nav="";
	if(sessionStorage.getItem('logged')){
		nav='<ul><li><label for="ckb-menu"><span>&equiv;</span></label></li><li><a href="index.html"><span class="icon-home"></span>Indice</a></li><li><a href="buscar.html"><span class="icon-search"></span>Buscar</a></li><li><a href="javascript:logout()"><span class="icon-logout"></span>Logout</a></li><li><a href="registro.html"><span class="icon-user-plus"></span>Perfil</a></li><li><a href=""><span class="icon-logout"></span>Logout</a></li><li><a href="nueva-entrada.html"><span class="icon-doc-new"></span>Nueva entrada</a></li></ul>'
	}
	else{
		nav='<ul><li><label for="ckb-menu"><span>&equiv;</span></label></li><li><a href="index.html"><span class="icon-home"></span>Indice</a></li><li><a href="buscar.html"><span class="icon-search"></span>Buscar</a></li><li><a href="login.html"><span class="icon-login"></span>Login</a></li><li><a href="registro.html"><span class="icon-user-plus"></span>Registro</a></li><li><a href=""><span class="icon-logout"></span>Logout</a></li><li><a href="nueva-entrada.html"><span class="icon-doc-new"></span>Nueva entrada</a></li></ul>'
	}
	document.getElementById("navegacion").innerHTML=nav;
}

function logout(){
	sessionStorage.clear();
	location.reload();
}