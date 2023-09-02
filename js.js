

const botoes = document.querySelectorAll('button');
const visor = document.getElementById('visor');

botoes.forEach(function(botao) {
    botao.addEventListener('click', function() {
        

        const valorBotao = botao.textContent;

        if (valorBotao === '=') {
            // Executa a expressão matemática
            const expressao = visor.value;
            try {
                const resultado = eval(expressao);
                visor.value = resultado;
            } catch (error) {
                visor.value = 'Erro';
            }
        } else if (valorBotao === 'Limpar') {
            // Limpa o visor
            visor.value = '';
        } else {
            visor.value += valorBotao;
        }

    });
});