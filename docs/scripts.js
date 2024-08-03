const cities = [
    "Адлер", "Азов", "Аксай", "Анапа", "Ангарск", "Армавир", "Афипский", "Ачинск", "Астрахань", "Балаково",
    "Батайск", "Белореченск", "Биробиджан", "Благовещенск", "Братск", "Валуйки", "Владикавказ", "Волгодонск",
    "Волжский", "Вологда", "Воронеж", "Гданьск", "Геленджик", "Дербент", "Динская", "Донецк", "Ейск",
    "Екатеринбург", "Екатерининская", "Иноземцево", "Иркутск", "Ивановская", "Избербаш", "Казань",
    "Калининград", "Каспийск", "Кемерово", "Керчь", "Кизляр", "Колпино", "Копейск", "Кострома", "Краснодар",
    "Красный Сулин", "Кущёвская", "Луганск", "Махачкала", "Минусинск", "Михайловск", "Моздок", "Москва",
    "Назрань", "Нальчик", "Невинномысск", "Нижнеудинск", "Новая Адыгея", "Новороссийск", "Новосибирск",
    "Новочеркасск", "Омск", "Оренбург", "Пермь", "Прохладный", "Пятигорск", "Ростов", "Ростов-на-Дону",
    "Салехард", "Сальск", "Самара", "Санкт-Петербург", "Саранск", "Саратов", "Светлоград", "Симферополь",
    "Славянск-на-Кубани", "Сочи", "Ставрополь", "Стерлитамак", "Старомарьевка", "Сызрань", "Таганрог",
    "Тамбов", "Тверь", "Тимашевск", "Тихорецк", "Томск", "Троицкая", "Туапсе", "Тюмень", "Улан-Удэ", "Урай",
    "Усолье-Сибирское", "Усть-Илимск", "Устье", "Уфа", "Хасавюрт", "Хвалынск", "Хомутово", "Челябинск",
    "Череповец", "Шахты", "Элиста", "Энгельс", "Ярославль"
];

document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    const cityList = document.getElementById('cityList');
    const cityItems = document.getElementById('cityItems');
    const citySearch = document.getElementById('citySearch');
    const productList = document.getElementById('productList');
    const noProductsMessage = document.getElementById('noProductsMessage');
    const productDetail = document.getElementById('productDetail');
    const mainContainer = document.getElementById('mainContainer');
    const loadingIcon = document.getElementById('loadingIcon');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    function toggleCityList() {
        cityList.style.display = cityList.style.display === 'block' ? 'none' : 'block';
        citySearch.value = '';
        updateCityItems(cities);
    }

    function updateCityItems(filteredCities) {
        cityItems.innerHTML = '';
        filteredCities.forEach(city => {
            const div = document.createElement('div');
            div.textContent = city;
            div.classList.add('city-item');
            div.onclick = () => selectCity(city);
            cityItems.appendChild(div);
        });
    }

    function selectCity(city) {
        citySelect.textContent = city;
        cityList.style.display = 'none';
        fetchProducts(city);
    }

    function fetchProducts(city) {
        loadingIcon.style.display = 'block';
        fetch(`https://qkefkfgk.github.io/999999qwfqgwqwg/data.json`)
            .then(response => response.json())
            .then(data => {
                loadingIcon.style.display = 'none';
                const products = data[city];
                if (products && products.length > 0) {
                    productList.innerHTML = '';
                    products.forEach(product => {
                        const productDiv = document.createElement('div');
                        productDiv.classList.add('product-item');
                        productDiv.textContent = product.name;
                        productDiv.onclick = () => showProductDetails(product);
                        productList.appendChild(productDiv);
                    });
                    noProductsMessage.style.display = 'none';
                } else {
                    noProductsMessage.style.display = 'block';
                    productList.innerHTML = '';
                }
            })
            .catch(error => {
                loadingIcon.style.display = 'none';
                showError(`Ошибка загрузки товаров: ${error.message}`);
            });
    }

    function showProductDetails(product) {
        document.getElementById('detailName').textContent = product.name;
        document.getElementById('shortDescription').textContent = product.shortDescription;
        document.getElementById('fullDescription').textContent = product.fullDescription;

        const productOptions = document.getElementById('productOptions');
        productOptions.innerHTML = '';
        product.options.forEach(option => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${option.location}</td>
                <td>${option.weight}</td>
                <td>${option.type}</td>
                <td>${option.price} ₽</td>
            `;
            productOptions.appendChild(row);
        });

        productDetail.style.display = 'block';
        mainContainer.style.display = 'none';
    }

    function toggleProductDetails() {
        const productDetails = document.getElementById('productDetails');
        productDetails.style.display = productDetails.style.display === 'none' ? 'block' : 'none';
    }

    function showError(message) {
        errorMessage.style.display = 'block';
        errorText.textContent = message;
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    citySelect.addEventListener('click', toggleCityList);
    citySearch.addEventListener('input', () => {
        const searchText = citySearch.value.toLowerCase();
        const filteredCities = cities.filter(city => city.toLowerCase().includes(searchText));
        updateCityItems(filteredCities);
    });
});
