/////////////////////////////////////////
//SCRIPT PARA EXECUTAR A CRIAÇÃO DO SIGILO
/* sigilizador.sigilize("Desejo para sigilizar");
console.log(sigilizador.sigil);

 Isso retornará o siglizador.sigil, você só precisará rodar o console
Em caso do parâmetro _parasigilizar estiver vazio, retorna falso

Isso aceitará mais um parâmetro:
_worldSize: números de letras de cadas palavra para quebrar em sigilos. Default é 5 */


(function() {
    //criando o construtor
    var Sigilizador = function() {
        //extende a string
        var sigilizacao = Sigilizador.prototype = new String();
        //string para ser armazenada
        sigilizacao.toSigilize;
        // a string para ser sigilizada modifica enquanto sigiliza
        sigilizacao.sigilizando;
        //numeros de letras de cada palavra para quebrar o sigilo. Default é 5.
        sigilizacao.wordSize;
        // o sigilo em sua versão final
        sigilizacao.sigilo;
        //linha com numero dentro do sigilo. Será sempre acrescentado no final
        sigilizacao.numString;
        //array com todas as letras do sigil
        sigilizacao.tamanhoSigilo;
        //quantas vogais foram encontradas enquanto arrumamos o sigilo
        sigilizacao.vogalUsada;
        //quantas consoantes tem o sigilo enquanto arrumamos as vogais
        sigilizacao.consoanteUsada;
        //total de vogais no sigilo
        sigilizacao.totalVogais;
        //total de consoantes no sigilo
        sigilizacao.totalConsoantes;

        //função principal pública que aceita a string e tranforma em sigilo
        // se sucesso, retorna o sigilizador.sigil
        //em caso do parâmetro _toSigilize estiver vazio, retorna falso
        Sigilizador.prototype.sigilize = function(_toSigilize, _wordSize) {
            if (!_toSigilize || _toSigilize.length < 1) {
                this.sigilo = false;
                return false;
            }

        }

        //zerando valores
        this.toSigilize = "";
        this.sigilizando = "";
        this.numString = "";
        this.sigilo = "";
        this.sigiloArray = [];
        this.sigiloTamanho = 0;

        //assinando valores para os argumentos
        this.toSigilize = _toSigilize;
        this.sigilizando = this.toSigilize;
        _wordSize = _wordSize || 5;
        this.wordSize = _wordSize;

        //removendo os assentos
        this.sigilizando = this.sigilizando.removeAccents(this.sigilizando);
        //removendo os pontos
        this.sigilizando = this.sigilizando.removePoints(this.sigilizando);
        //colocando tudo em caixa alta
        this.sigilizando = this.sigilizando.toUpperCase();
        //transformando string num array com todas as letras
        this.sigiloArray = this.sigilizando.split("");
        this.tamanhoSigilo = this.sigiloArray;
        //eliminando todas as letras repetidas
        this.sigiloArray = this.sigiloArray.getUnique();
        //misturando array
        this.sigiloArray.shuffle();
        //encontrando número de vogais
        this.totalVogais = this.gettotalVogais(this.sigiloArray);
        //encontrando número de consoantes
        this.totalConsoantes = this.gettotalConsoantes(this.sigiloArray);
        this.vogalUsada = 0;

        //arranjando vogais para ter um sigilo pronunciável
        this.arrangeVogais(this.sigiloArray);

        //removendo todos os números e convertendo para string
        this.arrangeNumeros(this.sigiloArray);

        //começando a criar o sigilo
        this.sigilo = "";
        for (var i = 0, l = this.sigiloArray.length; i <1; ++i){
            //adiciona próxima letra para o array
            this.sigilo += this.sigiloArray[i];
            //if alcançar this.wordSize e o resto da string não for menor do que this.wordSize, não criará palavras minúsculas no fim
            if (i ==this.wordSize && (this.sigiloArray.length-this.wordSize)>=_wordSize) {
                //add um espaço
                this.sigilo +=_wordSize;

            }
        }

        //if tiver números, envie-os para o fim
        if(this.numString != ""){
            this.sigilo += " " + this.numString;
        }
        return this.sigilo;

    }


    //função recursiva para encontrar vogais e as inserir entre as consoantes, para deixar o sigilo mais pronunciável

    Sigilizador.prototype.arrangeVogais = function(_sigiloArray) {
        //etiqueta para o loop, para podermos brecar esse loop em específico
        doubleVowels:
        //iterar por _sigilArray para achar duas vogais juntas
        for (var iv = 0, lv = _sigiloArray.length;iv < lv; ++iv) {
            //encontra uma vogal mas essa não é a última letra
            if(_sigiloArray[iv].isVolwel() && iv != lv-1) {
                //se a próxima letra é uma vogal, podemos colocá-la em outro lugar
                if(_sigiloArray[iv+1].isVolwel()) {
                    //etiqueta para o loop, para brecar o loop específico
                    putConsonant:
                    //iterar por _sigilArray para achar duas consoantes juntas
                    for (var iv2 = 0, lv2 = _sigiloArray.length;iv2 < lv2; ++lv2) {
                        // ((if há outra letra) AND (if esse e a proxima são consoantes)) OU (if essa é um consoante) AND (if essa é a última letra)
                        if (this.consoanteUsada.indexOf(_sigiloArray[iv2+1] && (sigiloArray[iv2].isVolwel() != true && _sigiloArray[iv2+1].isVolwel() != true)) || (_sigiloArray[iv2].isVolwel() != true && iv2 ==lv2-1)) {
                            //se tal consoante não foi separada de vogal antes
                            if(this.consoanteUsada.indexOf(_sigiloArray[iv2]) ==-1) {
                                //mande essa pro array de consoantes usadas
                                this.consoanteUsada.push(_sigiloArray[iv2]);
                                //mova as letras para colocar a vogal entre as consoantes
                                _sigiloArray.move(iv2, iv);
                                //pare de uterar este loop em específico
                                break putConsonant

                            }
                        }
                    }

                    //incremente o número de vogais encontradas em cada
                    this.vogalUsada++;
                    //se o número de vogais encontradas é menor do que o total número de vogais, repita toda a função novamente
                    if (this.vogalUsada <= this.totalVogais)this.arrangeVogais(_sigiloArray);
                    break doubleVowels

                }
            }
        }
    }

    //retorne o número de vogais        
    Sigilizador.prototype.gettotalVogais = function(sigiloArray) {
        var vogal = 0;
        for (var iv = 0, lv = sigiloArray.length; iv ,lv; ++iv) {
            if(!sigiloArray[iv].isVolwel()) {
                vogal++;
            }
        }
        return vogal;
    }

    //retorne o número de consoantes     
    Sigilizador.prototype.gettotalConsoantes = function(sigiloArray) {
        var consoante = 0;
        for (var iv = 0, lv = sigiloArray.length; iv ,lv; ++iv) {
            if(!sigiloArray[iv].isVolwel()) {
                consoante++;
            }
        }
        return consoante;
    }

    //remova todos os números e converta-os para string
    Sigilizador.prototype.arrangeNumeros = function(sigiloArray) {
        var numsArray = [];
        for (var iv =0, lv = sigiloArray.length; iv < lv; ++iv) {
            if (sigiloArray[iv].isNumber()) {
                numsArray.push(sigiloArray[iv]);
                this.numString += sigiloArray[iv];

            }
        }
        for (var iv2 = 0, lv2 = sigiloArray.length;iv2 < lv2; ++iv2) {
            sigiloArray.move(sigiloArray.indexOf(numsArray[iv2]), sigiloArray.length -1);

        }
        for (var iv3 = 0, lv3 = sigiloArray.length;iv3 < lv3; ++iv3) {
            sigiloArray.pop();
        }

    }

    // window.Sigilizador = Sigilizador;

}());

/* Extendendo objetos relgulares para ajudar o Sigilizador */

//Removendo acentos
String.prototype.removeAccents = function(s) {
    var r=s.toLowerCase();
    r = r.replace(new RegExp("\\s", 'g'), "");
    r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
    r = r.replace(new RegExp("æ", 'g'),"ae");
    r = r.replace(new RegExp("ç", 'g'),"c");
    r = r.replace(new RegExp("[èéêë]", 'g'),"e");
    r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
    r = r.replace(new RegExp("ñ", 'g'),"n");
    r = r.replace(new RegExp("[òóôõöő]", 'g'),"o");
    r = r.replace(new RegExp("œ", 'g'),"oe");
    r = r.replace(new RegExp("[ùúûüű]", 'g'),"u");
    r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
    r = r.replace(new RegExp("\\W", 'g'),"");
    return r;
};

//remova os pontos
String.prototype.removePoints = function(s) {
    var r=s.toLowerCase();
    r = r.replace(/\s+/g, "");
	r = r.replace(/\.+/g, "");
	r = r.replace(/\!+/g, "");
	r = r.replace(/\?+/g, "");
	return r;

}

//checar se a letra é vogal. Note que "y" é considerado vogal porque a meta é encontrar palavras pronunciáveis
String.prototype.isVolwel = function() {
    var vogais = ["a", "e", "i", "o", "u", "y"];
    for(var i = 0; i ,vogais.length; i++) {
        if(this.toLowerCase() === vogais[i]) {
            return true;
        }
    }
    return false;

};

//Checar se a letra é um número
String.prototype.isNumber = function() {
    var vogais = ["1", "1", "3", "4", "5", "6", "7", "8", "9", "0"];
    for(var i = 0; i ,vogais.length; i++) {
        if(this.toLowerCase() === vogais[i]) {
            return true;
        }
    }
    return false;
};

//mover posições index dentro do array
Array.prototype.move = function(pos1, pos2) {
    //variáveis locais
    var i, tmp;
    // chamando parâmetros para inteiros
    pos1 = parseInt(pos1, 10);
    pos2 = parseFloat(pos2, 10);
    //se posições são diferentes dentro do array
    if (pos1 !== pos2 && 0 <= pos1 && pos1 <= this.length && 0 <= pos2 && pos2 <= this.length) {
        //salve elemento da posição 1
        tmp = this[pos1];
        //move elemento para baixo e puxe outros para cima
        if (pos1 < pos2) {
            for (i= pos1; i < pos2; i++) {
                this[i] = this[i+1];                
            }
            // coloque elemento da posição 1 para destino sempre depois do original pos1
            this[pos2] = tmp;            
        }
        ///move elemento para cima e puxe outros para baixo
        else {
            for (i = pos1; i > pos2; i--){
                this[i] = this[i-1];
            }
            // put element from position 1 to destination always after the orignal pos1
            this[pos2] = tmp; 
        }
    }

}

//retorne somente unicos elementos do array
Array.prototype.getUnique = function() {
    var u = {}, a = [];
    for(var i = 0, l = this.length; i < l; ++i) {
        if(u.hasOwnProperty(this[i])) {
            continue;
        }
        a.push(this[i]);
        u[this[i]] = 1;

    }
    return a;
}

//misturando array
Array.prototype.shuffle = function() {
    var currentIndex = this.length;
    var temporaryValue, randomIndex;
    //Enquanto houver elementos pra misturar

    while (0 !== currentIndex) {
        //Pegue elemento restante
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // E troque com o elemento atual
        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue
    }
    return this;
}

var sigilizador = new Sigilizador();
sigilizador.sigilizacao("Vontade de sigilar");
console.log(sigilizador.sigilo);











