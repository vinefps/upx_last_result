//NAV-BAR:
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');

    // Adiciona ou remove a classe 'scrolled' com base na posição de rolagem
    if (window.scrollY == 0 || window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

//modal:

// Obtém o modal
var modal = document.getElementById("carbon-footprint-modal");

// Obtém o botão que abre o modal
var btn = document.getElementById("learn-more-btn");

// Obtém o elemento <span> que fecha o modal
var span = document.getElementsByClassName("close-btn")[0];

// Quando o usuário clica no botão, abre o modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// Quando o usuário clica em <span> (x), fecha o modal
span.onclick = function () {
    modal.style.display = "none";
}

// Quando o usuário clica fora do modal, fecha o modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Função para abrir as abas
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Esconde todo o conteúdo das abas
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove a classe "active" de todos os botões de aba
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostra a aba atual e adiciona a classe "active" ao botão que abriu a aba
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Abre a primeira aba por padrão
document.getElementsByClassName("tablinks")[0].click();




//calculadora:
let currentStep = 1;

function nextStep() {
    const currentPane = document.querySelector(`.step-pane[data-step="${currentStep}"]`);
    const currentStepElement = document.querySelector(`.step[data-step="${currentStep}"]`);
    currentPane.classList.remove('active');
    currentStepElement.classList.remove('active');

    currentStep++;

    const nextPane = document.querySelector(`.step-pane[data-step="${currentStep}"]`);
    const nextStepElement = document.querySelector(`.step[data-step="${currentStep}"]`);
    nextPane.classList.add('active');
    nextStepElement.classList.add('active');
}

function calculateResults() {
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const fuel = parseFloat(document.getElementById('fuel').value) || 0;
    const transport = parseFloat(document.getElementById('transport').value) || 0;
    const waste = parseFloat(document.getElementById('waste').value) || 0;

    const carbonEmission = (electricity * 0.233) + (fuel * 2.31) + (transport * 0.21) + (waste * 0.5);
    const treesNeeded = carbonEmission / 0.084;

    document.getElementById('results').innerText = `Sua empresa emite aproximadamente ${carbonEmission.toFixed(2)} kg de CO2 por mês. Você precisará plantar cerca de ${treesNeeded.toFixed(2)} árvores para compensar essas emissões.`;

    nextStep();
}

function resetCalculator() {
    currentStep = 1;
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.querySelectorAll('.step-pane').forEach(pane => pane.classList.remove('active'));
    document.querySelector(`.step[data-step="1"]`).classList.add('active');
    document.querySelector(`.step-pane[data-step="1"]`).classList.add('active');

    document.getElementById('electricity').value = '';
    document.getElementById('fuel').value = '';
    document.getElementById('transport').value = '';
    document.getElementById('waste').value = '';
    document.getElementById('results').innerText = '';
}

//dashboard
document.addEventListener('DOMContentLoaded', function () {
    initializeDashboard();
});

let carbonChart;
let treesChart;
let trendsChart;
let sourceBreakdownChart;

function initializeDashboard() {
    const carbonCtx = document.getElementById('carbonChart').getContext('2d');
    const treesCtx = document.getElementById('treesChart').getContext('2d');
    const trendsCtx = document.getElementById('trendsChart').getContext('2d');
    const sourceBreakdownCtx = document.getElementById('sourceBreakdownChart').getContext('2d');

    carbonChart = new Chart(carbonCtx, {
        type: 'bar',
        data: {
            labels: ['Electricidade', 'Combustíveis Fósseis', 'Transporte', 'Resíduos'],
            datasets: [{
                label: 'Emissões de Carbono (kg CO2)',
                data: [0, 0, 0, 0],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    treesChart = new Chart(treesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Árvores Necessárias'],
            datasets: [{
                label: 'Árvores para Compensar Emissões',
                data: [0],
                backgroundColor: ['#4caf50'],
            }]
        }
    });

    trendsChart = new Chart(trendsCtx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
            datasets: [{
                label: 'Tendência de Emissões',
                data: [0, 0, 0, 0, 0, 0],
                borderColor: '#ff6384',
                fill: false,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    sourceBreakdownChart = new Chart(sourceBreakdownCtx, {
        type: 'pie',
        data: {
            labels: ['Electricidade', 'Combustíveis Fósseis', 'Transporte', 'Resíduos'],
            datasets: [{
                label: 'Proporção de Fontes de Emissão',
                data: [0, 0, 0, 0],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
            }]
        }
    });

    document.getElementById('treesNeededText').textContent = 'Árvores necessárias: 0';
}

function updateDashboard(carbonEmission, treesNeeded) {
    const carbonCtx = document.getElementById('carbonChart').getContext('2d');
    const treesCtx = document.getElementById('treesChart').getContext('2d');
    const trendsCtx = document.getElementById('trendsChart').getContext('2d');
    const sourceBreakdownCtx = document.getElementById('sourceBreakdownChart').getContext('2d');

    if (carbonChart) {
        carbonChart.destroy();
    }

    if (treesChart) {
        treesChart.destroy();
    }

    if (trendsChart) {
        trendsChart.destroy();
    }

    if (sourceBreakdownChart) {
        sourceBreakdownChart.destroy();
    }

    const electricity = parseFloat(document.getElementById('electricity').value) * 0.233;
    const fuel = parseFloat(document.getElementById('fuel').value) * 2.31;
    const transport = parseFloat(document.getElementById('transport').value) * 0.21;
    const waste = parseFloat(document.getElementById('waste').value) * 0.5;

    carbonChart = new Chart(carbonCtx, {
        type: 'bar',
        data: {
            labels: ['Electricidade', 'Combustíveis Fósseis', 'Transporte', 'Resíduos'],
            datasets: [{
                label: 'Emissões de Carbono (kg CO2)',
                data: [electricity, fuel, transport, waste],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    treesChart = new Chart(treesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Árvores Necessárias'],
            datasets: [{
                label: 'Árvores para Compensar Emissões',
                data: [treesNeeded],
                backgroundColor: ['#4caf50'],
            }]
        }
    });

    trendsChart = new Chart(trendsCtx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
            datasets: [{
                label: 'Tendência de Emissões',
                data: [0, 0, 0, 0, 0, carbonEmission],
                borderColor: '#ff6384',
                fill: false,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    sourceBreakdownChart = new Chart(sourceBreakdownCtx, {
        type: 'pie',
        data: {
            labels: ['Electricidade', 'Combustíveis Fósseis', 'Transporte', 'Resíduos'],
            datasets: [{
                label: 'Proporção de Fontes de Emissão',
                data: [electricity, fuel, transport, waste],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
            }]
        }
    });

    document.getElementById('treesNeededText').textContent = `Árvores necessárias: ${treesNeeded}`;
}

function calculateResults() {
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const fuel = parseFloat(document.getElementById('fuel').value) || 0;
    const transport = parseFloat(document.getElementById('transport').value) || 0;
    const waste = parseFloat(document.getElementById('waste').value) || 0;

    const carbonEmission = (electricity * 0.233) + (fuel * 2.31) + (transport * 0.21) + (waste * 0.5);
    const treesNeeded = carbonEmission / 0.084;

    document.getElementById('results').innerText = `Sua empresa emite aproximadamente ${carbonEmission.toFixed(2)} kg de CO2 por mês. Você precisará plantar cerca de ${treesNeeded.toFixed(2)} árvores para compensar essas emissões.`;

    updateDashboard(carbonEmission, treesNeeded);
    nextStep();
}

function nextStep() {
    const currentPane = document.querySelector(`.step-pane[data-step="${currentStep}"]`);
    const currentStepElement = document.querySelector(`.step[data-step="${currentStep}"]`);
    currentPane.classList.remove('active');
    currentStepElement.classList.remove('active');

    currentStep++;

    const nextPane = document.querySelector(`.step-pane[data-step="${currentStep}"]`);
    const nextStepElement = document.querySelector(`.step[data-step="${currentStep}"]`);
    nextPane.classList.add('active');
    nextStepElement.classList.add('active');
}

function resetCalculator() {
    currentStep = 1;
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.querySelectorAll('.step-pane').forEach(pane => pane.classList.remove('active'));
    document.querySelector(`.step[data-step="1"]`).classList.add('active');
    document.querySelector(`.step-pane[data-step="1"]`).classList.add('active');

    document.getElementById('electricity').value = '';
    document.getElementById('fuel').value = '';
    document.getElementById('transport').value = '';
    document.getElementById('waste').value = '';
    document.getElementById('results').innerText = '';
}


//NEWS:

document.addEventListener('DOMContentLoaded', function () {
    const newsData = [
        {
            title: "Emissões Globais em 2024",
            description: "As emissões globais de dióxido de carbono atingiram um nível recorde em 2024, mas o crescimento das tecnologias de energia limpa, como solar e eólica, ajudou a limitar o aumento, registrando um crescimento de apenas 1.1%. Os veículos elétricos também contribuíram significativamente para evitar um aumento maior na demanda por petróleo.",
            source: "euronews",
            source_url: "https://www.euronews.com",
            image: "./src/images/news-img/emissao_1.jpeg"
        },
        {
            title: "Brasil Reduz Emissões na Geração de Energia",
            description: "A emissão de CO2 na geração de energia elétrica no Brasil em 2024 foi a menor dos últimos 12 anos, com uma média de 38,5 kg de CO2 por megawatt-hora. Esta redução é atribuída ao aumento do uso de fontes renováveis e à menor necessidade de termelétricas.",
            source: "Serviços e Informações do Brasil",
            source_url: "https://www.servicos.gov.br",
            image: "./src/images/news-img/emissao_2.jpeg"
        },
        {
            title: "Impacto das Empresas",
            description: "Um relatório da InfluenceMap revelou que 80% das emissões de CO2 de 2016 a 2022 vieram de apenas 57 entidades, incluindo grandes empresas estatais como a Saudi Aramco, Gazprom e Coal India. Essas empresas aumentaram a produção de combustíveis fósseis, contribuindo significativamente para o aumento das emissões.",
            source: "Antena 1",
            source_url: "https://www.antena1.com.br",
            image: "./src/images/news-img/emissao_3.jpeg"
        },
        {
            title: "Energia Limpa e Emissões",
            description: "Segundo a Agência Internacional de Energia (AIE), sem as tecnologias de energia limpa, as emissões globais de carbono nos últimos cinco anos teriam sido três vezes maiores. Apesar disso, as emissões globais de CO2 ainda atingiram um novo recorde em 2024.",
            source: "euronews",
            source_url: "https://www.euronews.com",
            image: "./src/images/news-img/emissao_4.jpeg"
        },
        {
            title: "Patamar de Emissões",
            description: "As emissões globais de CO2 têm mostrado um platô na última década, indicando a dificuldade em alcançar reduções substanciais. Estratégias mais agressivas e inovadoras são necessárias para quebrar esta tendência e reduzir efetivamente as emissões.",
            source: "Sigma Earth",
            source_url: "https://www.sigmaearth.com",
            image: "./src/images/news-img/emissao_5.jpeg"
        },
        {
            title: "Tendências Regionais",
            description: "As tendências das emissões variam entre as regiões, com reduções significativas na Europa e nos EUA, atribuídas ao aumento da energia renovável e políticas ambientais, enquanto China e Índia continuam a ver um aumento nas emissões devido ao crescimento econômico e à demanda energética.",
            source: "Sigma Earth",
            source_url: "https://www.sigmaearth.com",
            image: "./src/images/news-img/emissao_6.jpeg"
        },
        {
            title: "Transição Energética",
            description: "A expansão das fontes de energia limpa tem levado a uma desaceleração estrutural no crescimento das emissões de CO2 relacionadas à energia. Esta mudança é vital para combater o impacto do aumento da demanda de energia global.",
            source: "IEA",
            source_url: "https://www.iea.org",
            image: "./src/images/news-img/emissao_7.jpeg"
        },
        {
            title: "Maior Emissor",
            description: "A China continua a ser o maior emissor de CO2 do mundo, destacando os desafios das economias em rápido desenvolvimento em equilibrar o crescimento econômico com a sustentabilidade ambiental. A dependência do carvão para eletricidade é um fator chave nesse cenário.",
            source: "Sigma Earth",
            source_url: "https://www.sigmaearth.com",
            image: "./src/images/news-img/emissao_8.jpeg"
        }
    ];

    const newsContainer = document.getElementById('news-container');

    newsData.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const link = document.createElement('a');
        link.href = article.source_url;
        link.target = '_blank'; // Abre o link em uma nova aba
        link.style.textDecoration = 'none';
        link.style.color = 'inherit';

        const img = document.createElement('img');
        img.src = article.image; // URL da imagem ou imagem padrão
        img.alt = article.title; // Adiciona um texto alternativo à imagem

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description;

        link.appendChild(img);
        link.appendChild(title);
        link.appendChild(description);
        newsItem.appendChild(link);
        newsContainer.appendChild(newsItem);
    });
});



//ASKS:

document.getElementById('qa-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Capture os dados do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const question = document.getElementById('question').value;

    // Validação simples (pode ser expandida conforme necessário)
    if (name && email && question) {
        alert('Sua pergunta foi enviada com sucesso!');
        // Aqui você pode adicionar código para enviar os dados para um servidor
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

function toggleAnswer(element) {
    var answer = element.nextElementSibling;
    var arrow = element.querySelector('.arrow');
    if (answer.style.display === "block") {
        answer.style.display = "none";
        arrow.textContent = "▼";
    } else {
        answer.style.display = "block";
        arrow.textContent = "▲";
    }
}

