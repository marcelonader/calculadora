var ehNovoNumero = true;
var valor = "0";
var valorAnterior = 0;
var operacaoPendente = null;

function atualizaVisor(){
		var [parteInteira, parteDecimal] = valor.split(',');
		var v = '';
		var c = 0;
		for(var i = parteInteira.length-1; i >=0; i--){
			if(++c>3){
				v = '.' + v;
				c = 1;
			}
			v = parteInteira[i] + v;
		} 
		v = v + (parteDecimal ? ',' + parteDecimal : '')	
document.querySelector('#campoResultado').innerHTML = v;
}

function insert (n) {
	if(ehNovoNumero){
		valor = n;
		ehNovoNumero = false;
	} else {
		valor += n;
	} atualizaVisor();
}

		
function clean (){
	valor = "0"
		ehNovoNumero=true;
		operacaoPendente = null;
		valorAnterior = 0;
		atualizaVisor();
}

function virgula(){
	if(ehNovoNumero){
		valor = "0,";
		ehNovoNumero = false;
	}else if (valor.indexOf(',') == -1) {
		valor += ',';
	}
	atualizaVisor();
}


function valorAtual (){
	return parseFloat(valor.replace(',', '.'));
}

function operator(op){
	valorAnterior = valorAtual();
	operacaoPendente = op;
	ehNovoNumero = true;
}

function calc(){
	
	if(operacaoPendente != null){
		var result = 0;
		switch(operacaoPendente){
			case '+': 
			result = valorAnterior + valorAtual(); 
			break;
			case '-': 
			result = valorAnterior - valorAtual();
			break;
			case '/': 
            result = valorAnterior / valorAtual();
            break;
			case '*': 
			result = valorAnterior * valorAtual();
			break;
			case '%': 
			result = (valorAnterior / 100) * valorAtual();
			break;
		}
		valor = result.toString().replace('.', ',');
	}
	ehNovoNumero = true;
	operacaoPendente = null;
	valorAnterior = 0;
	atualizaVisor();
}

function backSpace (){
		valor = valor.substring(0, valor.length - 1);
		atualizaVisor();
}