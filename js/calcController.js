class CalcController { //criando uma classe

	constructor () {
		this._displayCalcEl = document.querySelector("#display");
		this._dateEl = document.querySelector("#data");
		this._timeEl = document.querySelector("#hora");
		 // anderline no JS significa que o atributos é privado
		this._currentDate;
		this.initialize(); //função que chama o que deve iniciar junto com a página 
	}

	initialize() { //o que deve ser iniciado quando intanciarmos está classe
		//setTimeOut(()=>{}, time); função que gera apena uma vez após o tempo determinado
		
		this.setDisplayDateTime();	//para a calculadora não ficar 1 segundo sem a informações do tempo, chamamos a função antes do setInterval	
	
		setInterval (()=>{ //setInterval demora um segundo +/- para iniciar o método e acionar ao display
	
			this.setDisplayDateTime();
				
		}, 1000);
	}

//methods

setDisplayDateTime() {
			this.displayDate = this.currentDate.toLocaleDateString("pt-Br",{ 
				day: "2-digit",
				month: "short",
				year: "numeric"
			});
			this.displayTime = this.currentDate.toLocaleTimeString("pt-Br");
	
}	

//time----------------------------
	get displayTime(){
		return this._timeEl.innerHTML;
	}

	set displayTime(value){
		this._timeEl.innerHTML = value;
	}


//date-----------------------------
	get currentDate(){

		return new Date; //retornando a data de hoje
		
	}

	set currentDate (valor) {
		this._currentDate = valor;

	}


	get displayDate() {
		return this._dateEl.innerHTML;
	}


	set displayDate(value) {
		this._dateEl.innerHTML = value;
	}



//Display-------------------------------
	get displayCalc () {

		return this._displayCalcEl.innerHTML;
	
	}


	set displayCalc(valor){
		this._displayCalcEl.innerHTML = valor;
	}

	
}
