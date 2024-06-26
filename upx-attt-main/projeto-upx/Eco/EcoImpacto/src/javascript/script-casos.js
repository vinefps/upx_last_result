// URL da API para gerar dados de empresas fictícias
const apiUrl = 'https://fakerapi.it/api/v1/companies?_locale=en_US&_quantity=3';

// Função para buscar dados da API e exibir no DOM
function fetchCompanies() {
    const companies = [
        {
            name: "Parisian-Schoen",
            country: "French Guiana",
            feedback: "A plataforma EcoImpacto nos proporcionou ferramentas valiosas para identificar e reduzir nossas emissões de carbono. Implementamos a utilização de fontes de energia renovável em nossas operações e otimizamos nosso processo de produção para minimizar o desperdício. Como resultado, reduzimos nossas emissões em 30% no último ano."
        },
        {
            name: "Cronin-Kshlerin",
            country: "Switzerland",
            feedback: "A EcoImpacto nos ajudou a entender melhor nossas pegadas de carbono e a encontrar soluções práticas para reduzi-las. Investimos em tecnologia verde e iniciamos programas de reciclagem em toda a nossa cadeia de fornecimento. Graças a essas iniciativas, conseguimos diminuir nossas emissões de carbono em 45%."
        },
        {
            name: "Stoltenberg Inc",
            country: "Uzbekistan",
            feedback: "Com o auxílio da plataforma EcoImpacto, conseguimos mapear todas as fontes de emissão de carbono em nossa empresa. Tomamos medidas significativas, como a substituição de combustíveis fósseis por biocombustíveis e a implementação de um sistema de transporte mais eficiente. Essas ações resultaram em uma redução de 50% nas emissões totais."
        }
    ];

    const container = document.getElementById('companies-container');
    container.innerHTML = ''; // Limpa o conteúdo existente

    companies.forEach(company => {
        const companyDiv = document.createElement('div');
        companyDiv.classList.add('card');
        companyDiv.innerHTML = `
            <div class="content">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z">
                    </path>
                </svg>
                <p class="para">
                    <strong>Name:</strong> ${company.name}<br>
                    <strong>Country:</strong> ${company.country}<br>
                    <strong>Feedback:</strong> ${company.feedback}
                </p>
            </div>
        `;
        container.appendChild(companyDiv);
    });
}

// Chama a função para gerar e exibir os dados ao carregar a página
document.addEventListener('DOMContentLoaded', fetchCompanies);


// Chama a função para buscar e exibir os dados ao carregar a página
document.addEventListener('DOMContentLoaded', fetchCompanies);

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
