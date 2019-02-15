
//método para acionar mais de um evento no JS. Método não nativo
//imagine., por exemplo, botões que possam ser tanto clicados quando arrastados pelo usuário, logo precisamos de dois eventos para acionar a função



addEventListenerAll (elementClicked, events, funcao){ //observe os três parametros (elemento HTML que foi clicado, string'll become a Array, function )

	events.split(" ").forEach(event =>{ //getting all events (plural) and spliting them and making a forEach in each event (singular).

		elementClicked.addEventListener(event, funcao, false); // para o elemento clicado, execute
	})                                                 //como se trata de um botão que tem um texto (ou seja, dois elementos HTML)
													   //é bom necessário cancelar o evento, com o parametro false, para ele não executar duas vezes
}

initButtonsEvents() {
	//bom lembra que tanto os botões quanto seus respectivos textos tem a mesma classe
		let buttons = document.querySelectorAll("#buttons > g, #parts > g"); //pegando os dois elementos HTML

		buttons.forEach((btn, index)=>{

			btn.addEventListenerAll (btn, "click drag", e => { //addEventListenerAll é um método criado, não nativo

				console.log(btn.className.baseVal.replace("btn-","")); //.
				
			});

			this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{ //pegando as movimentações do mouse

				btn.style.cursor = "pointer"; //trocando a setinha do mause pela mão

			})

		});
	}


