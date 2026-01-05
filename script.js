function calcularPreco() {
    // 1. Obter os valores de entrada
    const cambio = parseFloat(document.getElementById('cambio').value);
    const precoProdutoUSD = parseFloat(document.getElementById('precoProduto').value); // FOB
    const custoEnvioUSD = parseFloat(document.getElementById('custoEnvio').value); // Frete
    
    const margemLucroPorcentagem = parseFloat(document.getElementById('margemLucro').value) / 100;
    const nIntervencao = parseFloat(document.getElementById('nIntervencao').value); // Taxa Fixa da Speedaf em AOA

    // Taxas AGT fixas pela Circular
    const taxaForfetaria = 0.16; // 16% Direitos de Importação
    const ivaPorcentagem = 0.14; // 14% IVA

    // 2. Validação básica dos inputs
    if (isNaN(cambio) || isNaN(precoProdutoUSD) || isNaN(custoEnvioUSD) || isNaN(margemLucroPorcentagem) || isNaN(nIntervencao)) {
        alert("Por favor, preencha todos os campos obrigatórios com números válidos.");
        return;
    }

    // --- FASE 1: Conversão e Cálculo dos Impostos ---

    // 3. 1. Valor da Fatura em AOA (Base de Cálculo para 16%)
    // 16% é sobre o valor da fatura (FOB)
    const valorFatura_AOA = precoProdutoUSD * cambio; 
    
    // 3. 2. Cálculo da Taxa Forfetária (16%)
    const valorTaxaForfetaria = valorFatura_AOA * taxaForfetaria; // 16% sobre o FOB em AOA

    // 3. 3. Base de Cálculo do IVA (Base = FOB em AOA + Taxa Forfetária)
    const baseCalculoIVA = valorFatura_AOA + valorTaxaForfetaria;
    const valorIVA = baseCalculoIVA * ivaPorcentagem; // 14% sobre a base

    // --- FASE 2: Cálculo do Custo Final ---

    // 4. Conversão do Custo de Envio (Frete)
    const custoEnvio_AOA = custoEnvioUSD * cambio;

    // 5. Custo Final (Ponto de Equilíbrio)
    // Custo Final = (FOB em AOA) + (Frete em AOA) + (Taxa Forfetária) + (IVA) + (Intervenção Fixa da Speedaf)
    const custoFinal_AOA = valorFatura_AOA + custoEnvio_AOA + valorTaxaForfetaria + valorIVA + nIntervencao;

    // --- FASE 3: Cálculo do Preço de Venda Sugerido ---
    
    // 6. Preço de Venda Sugerido (com Margem de Lucro)
    const precoVendaSugerido = custoFinal_AOA * (1 + margemLucroPorcentagem);

    // 7. Exibir os resultados
    document.getElementById('custoTotal').textContent = formatarAOA(custoFinal_AOA);
    document.getElementById('precoVenda').textContent = formatarAOA(precoVendaSugerido);

    // Função de formatação para Kwanza
    function formatarAOA(valor) {
        // Formata o número para moeda Angolana, ajustando casas decimais e separadores.
        return valor.toLocaleString('pt-AO', {
            style: 'currency',
            currency: 'AOA',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}

// Inicializa o cálculo com os valores padrão ao carregar a página
document.addEventListener('DOMContentLoaded', calcularPreco);
