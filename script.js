//SCRIPT CONVERTIR BINARIO A ENTERO
	function convertir_binario(valor){
		var array = [];
		var numeros = valor.split("");
		var entero = 0;
		var contador = 0;
		for(var i = numeros.length-1; i>=0;i--){
			if(numeros[i] == 0){
				array[i] = 0;
			}
			else{
				array[i] = Math.pow(2,contador);
			}
			contador++;
		}
		for(var a = 0; a < array.length; a++){
			entero += array[a];
		}
		return entero;
	}

	//SCRIPT CONVERTIR ENTERO A BINARIO
	function convertir_entero(valor){
		var resul_div = [];
		var entradas = 0;
		var resultado_binario = '';
		while(valor > 0){
			residuo = parseInt(valor % 2);
			valor = parseInt(valor/2);
			resul_div[entradas] = residuo;
			entradas++;
		}
		for (var i = resul_div.length - 1; i >= 0; i--) {
			resultado_binario += resul_div[i];
		}
		return resultado_binario;
	}

	//SCRIPT PARA SUMAR BINARIOS
	function suma_binarios(b1,b2){

		var numerob1 = b1.split("");
		var numerob2 = b2.split("");
		var principal = (numerob1.length>numerob2.length || numerob1.length==numerob2.length) ? b1 : b2;
		var secundario = (numerob1.length<numerob2.length) ? b1 : b2;
		var minuendo = principal.split("");
		var sustraendo = secundario.split("");
		var lleva = 0;
		var resultado_arreglo = [];
		var array_sus = [];
		var pos;

		for (var i = 0; i < minuendo.length; i++) {
			array_sus.push(sustraendo[i]);
			if(array_sus[i] === undefined){
				array_sus.unshift('');
				array_sus.pop();
			}
		}
		
		for (var i = minuendo.length - 1; i >= 0; i--) {
			if(minuendo[i] == lleva){
				minuendo[i] = 0;
			} else {
				minuendo[i] = 1;
				lleva = 0;
			}
			if(minuendo[i] != array_sus[i]){
				resultado_arreglo[i] = 1;
			} else if(minuendo[i] == array_sus[i] && minuendo[i] != 1 && array_sus[i] != 1){
				resultado_arreglo[i] = 0;
			} else if(minuendo[i] == array_sus[i] && minuendo[i] == 1 && array_sus[i] == 1){
				lleva = 1;
				resultado_arreglo[i] = 0;
			}
			if(i == 0 && lleva == 1){
				resultado_arreglo.unshift(1);
			}
		};

		var resultado_suma_binario = '';
		for(var a = 0; a < resultado_arreglo.length; a++){
			resultado_suma_binario+=resultado_arreglo[a];
		}
		$(".ressumadec").val(convertir_binario(resultado_suma_binario));
		return resultado_suma_binario;

	}

	//SCRIPT PARA RESTAR BINARIOS
	function resta_binarios(b1,b2){
		if(b1 != b2){
			var numerob1 = b1.split("");
			var numerob2 = b2.split("");
			var principal = (numerob1.length>numerob2.length || numerob1.length==numerob2.length) ? b1 : b2;
			var secundario = (numerob1.length<numerob2.length) ? b1 : b2;
			var minuendo = principal.split("");
			var sustraendo = secundario.split("");
			var sustraendo_inicial = '1';
			var invertir_minuendo = [];
			var minuendo_suma_final = [];
			var invertir_minuendo_suma_final = [];
			var minuendo_final = '';
			for(var i = 0; i < minuendo.length; i++){
				invertir_minuendo[i] = (minuendo[i] == 0) ? 1 : 0;
			}
			var primera_suma = suma_binarios(invertir_minuendo.join(""),sustraendo_inicial);
			var seg_suma_binarios = suma_binarios(primera_suma,sustraendo.join(""));
			minuendo_suma_final = seg_suma_binarios.split("");
			for(var j = 0; j < minuendo_suma_final.length; j++){
				invertir_minuendo_suma_final[j] = (minuendo_suma_final[j] == 0) ? 1 : 0;
			}
			var resta_final = suma_binarios(invertir_minuendo_suma_final.join(""),sustraendo_inicial);
			$(".restadec").val(convertir_binario(resta_final));
			return resta_final;
		} else {
			$(".restadec").val(0);
			return 0;
		}

	}

	$(function(){
		$("#binario").keyup(function(){
			$("#entero").val(convertir_binario($(this).val()));
		});
		$("#decimal").keyup(function(){
			$("#entero_conv").val(convertir_entero($(this).val()));
		});
		$(".sumbin2").keyup(function(){
			$(".ressuma").val(suma_binarios($(this).val(),$(".sumbin1").val()));

		});
		$(".restabin2").keyup(function(){
			$(".restatotal").val(resta_binarios($(this).val(),$(".restabin").val()));

		});
	});