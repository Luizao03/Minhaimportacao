function calcularPreco() {
    // 1. Obter os valores de entrada
    const cambioAduaneiro = parseFloat(document.getElementById('cambioGoogle').value); // Câmbio do Google/AGT (Base de impostos)
    const custoAquisicao = parseFloat(document.getElementById('custoAquisicao').value); // Custo real que o utilizador paga pelo dólar
    
    const precoTotalUSD = parseFloat(document.getElementById('precoTotalUSD').value); // Produto + Frete
    
    const margemLucroPorcentagem = parseFloat(document.getElementById('margemLucro').value) / 100;

    // Constantes de taxas fixas (Baseadas nas imagens da Speedaf/AGT)
    const taxaForfetaria = 0.16; // 16% Direitos de Importação (sobre o FOB Aduaneiro)
    const ivaPorcentagem = 0.14; // 14% IVA (sobre a Base de Cálculo)
    const nIntervencao = 1950.00; // Taxa Fixa da Speedaf em AOA

    // 2. Validação básica dos inputs
    if (isNaN(cambioAduaneiro) || isNaN(custoAquisicao) || isNaN(precoTotalUSD) || isNaN(margemLucroPorcentagem)) {
        alert("Por favor, preencha todos os campos obrigatórios com números válidos.");
        return;
    }

    // --- FASE 1: Cálculo dos Impostos (Baseado no Câmbio Aduaneiro) ---

    // 3. 1. Valor Aduaneiro (AOA) - Base para 16%
    const valorAduaneiro_AOA = precoTotalUSD * cambioAduaneiro; 
    
    // 3. 2. Cálculo da Taxa Forfetária (16%)
    const valorTaxaForfetaria = valorAduaneiro_AOA * taxaForfetaria; 

    // 3. 3. Cálculo do IVA (14% sobre a Base de Cálculo)
    const baseCalculoIVA = valorAduaneiro_AOA + valorTaxaForfetaria;
    const valorIVA = baseCalculoIVA * ivaPorcentagem;

    // 4. Custo Total de Impostos e Taxas (Em AOA)
    const totalImpostosTaxas_AOA = valorTaxaForfetaria + valorIVA + nIntervencao;


    // --- FASE 2: Cálculo do Custo Real (Baseado no Custo de Aquisição) ---
    
    // 5. Custo Real do Produto e Frete (Usando o seu Custo de Aquisição do Dólar)
    const custoRealProdutoEnvio_AOA = precoTotalUSD * custoAquisicao;
    
    // 6. Custo Final (Ponto de Equilíbrio)
    const custoFinal_AOA = custoRealProdutoEnvio_AOA + totalImpostosTaxas_AOA;

    // --- FASE 3: Cálculo do Preço de Venda Sugerido ---
    
    // 7. Preço de Venda Sugerido (com Margem de Lucro)
    const precoVendaSugerido = custoFinal_AOA * (1 + margemLucroPorcentagem);

    // 8. Exibir os resultados
    document.getElementById('custoTotal').textContent = formatarAOA(custoFinal_AOA);
    document.getElementById('precoVenda').textContent = formatarAOA(precoVendaSugerido);

    // Função de formatação para Kwanza
    function formatarAOA(valor) {
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
    // Função de formatação para Kwanza
    function formatarAOA(valor) {
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


    // --- FASE 2: Cálculo do Custo Real (Baseado no Custo de Aquisição) ---
    
    // 5. Custo Real do Produto e Frete (Usando o seu Custo de Aquisição do Dólar)
    const custoRealProdutoEnvio_AOA = precoTotalUSD * custoAquisicao;
    
    // 6. Custo Final (Ponto de Equilíbrio)
    // Custo Final = (Custo Real do Produto/Frete) + (Total de Impostos e Taxas)
    const custoFinal_AOA = custoRealProdutoEnvio_AOA + totalImpostosTaxas_AOA;

    // --- FASE 3: Cálculo do Preço de Venda Sugerido ---
    
    // 7. Preço de Venda Sugerido (com Margem de Lucro)
    const precoVendaSugerido = custoFinal_AOA * (1 + margemLucroPorcentagem);

    // 8. Exibir os resultados
    document.getElementById('custoTotal').textContent = formatarAOA(custoFinal_AOA);
    document.getElementById('precoVenda').textContent = formatarAOA(precoVendaSugerido);

    // Função de formatação para Kwanza
    function formatarAOA(valor) {
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
