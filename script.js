// --- FUNÇÃO PARA OBTER CÂMBIO AUTOMATICAMENTE ---
// Usamos uma API estável e gratuita para buscar a taxa de câmbio USD/AOA.
async function carregarCambioAduaneiro() {
    const cambioInput = document.getElementById('cambioGoogle');
    cambioInput.value = "A carregar...";

    // Usaremos a taxa de câmbio do Dólar (USD) para o Kwanza (AOA).
    // Nota: Esta API pode fornecer uma taxa de mercado, que pode ser diferente da taxa oficial da AGT. 
    // O usuário deve ter a opção de ajustar o valor após o carregamento.
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.rates && data.rates.AOA) {
            const taxaAOA = data.rates.AOA.toFixed(2); // Arredonda para 2 casas decimais
            cambioInput.value = taxaAOA;
            cambioInput.disabled = false; // Desbloqueia para permitir ajustes manuais
            console.log(`Câmbio USD/AOA carregado: ${taxaAOA}`);
        } else {
            cambioInput.value = "840.00"; // Valor de segurança se a API falhar
            cambioInput.disabled = false;
        }
    } catch (error) {
        console.error("Erro ao buscar a taxa de câmbio:", error);
        cambioInput.value = "840.00"; // Valor de segurança se a requisição falhar
        cambioInput.disabled = false;
        alert("Não foi possível carregar a taxa de câmbio. Usando o valor padrão de 840.00 AOA.");
    }
    // Após carregar a taxa, rodamos o cálculo inicial com os valores padrão
    calcularPreco(); 
}

// --- FUNÇÃO PRINCIPAL DE CÁLCULO ---
function calcularPreco() {
    // 1. Obter os valores de entrada
    const cambioAduaneiro = parseFloat(document.getElementById('cambioGoogle').value); // Câmbio do Google/AGT (Base de impostos)
    const custoAquisicao = parseFloat(document.getElementById('custoAquisicao').value); // Custo real que o utilizador paga pelo dólar
    
    const precoTotalUSD = parseFloat(document.getElementById('precoTotalUSD').value); // Produto + Frete
    
    const margemLucroPorcentagem = parseFloat(document.getElementById('margemLucro').value) / 100;

    // Constantes de taxas fixas (Baseadas nas imagens da Speedaf/AGT)
    const taxaForfetaria = 0.16; // 16% Direitos de Importação
    const ivaPorcentagem = 0.14; // 14% IVA
    const nIntervencao = 1950.00; // Taxa Fixa da Speedaf em AOA

    // 2. Validação básica dos inputs
    if (isNaN(cambioAduaneiro) || isNaN(custoAquisicao) || isNaN(precoTotalUSD) || isNaN(margemLucroPorcentagem)) {
        // Se o câmbio for "A carregar...", não alerta e espera
        if (document.getElementById('cambioGoogle').value === "A carregar...") {
            return; 
        }
        alert("Por favor, preencha todos os campos obrigatórios com números válidos.");
        return;
    }

    // --- FASE 1: Cálculo dos Impostos (Baseado no Câmbio Aduaneiro) ---

    // 3. 1. Valor Aduaneiro (AOA)
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

// Inicializa o carregamento da taxa de câmbio ao carregar a página
document.addEventListener('DOMContentLoaded', carregarCambioAduaneiro);

// Adiciona um listener para recalcular sempre que um campo for alterado (melhorando a usabilidade)
document.getElementById('precoTotalUSD').addEventListener('input', calcularPreco);
document.getElementById('custoAquisicao').addEventListener('input', calcularPreco);
document.getElementById('margemLucro').addEventListener('input', calcularPreco);
document.getElementById('cambioGoogle').addEventListener('input', calcularPreco);
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
