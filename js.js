const botoes = document.querySelectorAll('button');
        const visor = document.getElementById('visor');
        const operacaoBotoes = document.querySelectorAll('.operacao');

        let ultimaOperacao = false;
        let primeiroNumeroDigitado = false;

        botoes.forEach(function(botao) {
            botao.addEventListener('click', function() {
                const valorBotao = botao.textContent;

                if (valorBotao === '=') {
                    // Verifica se o último caractere é uma operação e remove, se necessário
                    const ultimoCaractere = visor.value.charAt(visor.value.length - 1);
                    if (['+', '-', '*', '/'].includes(ultimoCaractere)) {
                        visor.value = visor.value.slice(0, -1);
                    }
                
                    // Executa a expressão matemática
                    const expressao = visor.value;
                    if (expressao) {
                        try {
                            const resultado = eval(expressao);
                            if (isNaN(resultado)) {
                                visor.value = 'Erro';
                            } else {
                                visor.value = resultado;
                                primeiroNumeroDigitado = true; // Adiciona esta linha
                            }
                        } catch (error) {
                            visor.value = 'Erro';
                        }
                    }
                
                    // Reinicia a calculadora após um cálculo bem-sucedido
                    operacaoBotoes.forEach(function(operacaoBotao) {
                        operacaoBotao.disabled = false;
                    });
                } else if (valorBotao === 'Limpar') {
                    // Limpa o visor
                    visor.value = '';
                    ultimaOperacao = false;
                    primeiroNumeroDigitado = false;
                    operacaoBotoes.forEach(function(operacaoBotao) {
                        operacaoBotao.disabled = true;
                    });
                } else if (['*', '/'].includes(valorBotao)) {
                    if (!primeiroNumeroDigitado) {
                        // Impede que a operação * ou / seja clicada antes de qualquer número
                        return;
                    }
                    // Verifica se o último caractere é uma operação
                    const ultimoCaractere = visor.value.charAt(visor.value.length - 1);
                    if (!ultimaOperacao && ultimoCaractere !== valorBotao) {
                        visor.value += valorBotao;
                        ultimaOperacao = true;
                    } else if (ultimaOperacao && ultimoCaractere !== valorBotao) {
                        visor.value = visor.value.slice(0, -1) + valorBotao;
                    }
                } else {
                    // Verifica se um cálculo foi realizado antes de reiniciar o visor
                    if (visor.value === 'Erro') {
                        visor.value = '';
                    }
                    visor.value += valorBotao;
                    ultimaOperacao = false;
                
                    // Habilita as operações quando um número é digitado
                    operacaoBotoes.forEach(function(operacaoBotao) {
                        operacaoBotao.disabled = false;
                    });
                }
            });
        });