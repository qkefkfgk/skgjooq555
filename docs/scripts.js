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
    "Черемхово", "Черкесск", "Чита", "Чунский", "Шахты", "Шахтёрск", "Якутск", "Ярославль"
];

let allProducts = [];

async function displayProducts(products) {
    const productList = document.getElementById('productList');
    const noProductsMessage = document.getElementById('noProductsMessage');
    productList.innerHTML = '';

    if (products.length === 0) {
        noProductsMessage.style.display = 'block';
    } else {
        noProductsMessage.style.display = 'none';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <div class="name">${product.name}</div>
                <div class="price-button">
                    <div class="promotional-price">${product.price} ₽</div>
                </div>
            `;
            productDiv.onclick = () => showProductDetail(product);
            productList.appendChild(productDiv);
        });
    }
}

async function fetchProducts(city) {
    showLoadingIcon(true);
    try {
        const response = await fetch(`https://qkefkfgk.github.io/999999qwfqgwqwg/data/${city}.json`);
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        const products = await response.json();
        allProducts = products;
        displayProducts(products);
    } catch (error) {
        showError(error.message);
    } finally {
        showLoadingIcon(false);
    }
}

function showProductDetail(product) {
    const productDetail = document.getElementById('productDetail');
    const detailName = document.getElementById('detailName');
    const shortDescription = document.getElementById('shortDescription');
    const fullDescription = document.getElementById('fullDescription');
    const productOptions = document.getElementById('productOptions');

    detailName.textContent = product.name;
    shortDescription.textContent = product.shortDescription;
    fullDescription.textContent = product.fullDescription;

    productOptions.innerHTML = '';
    product.options.forEach(option => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${option.location}</td>
            <td>${option.weight}</td>
            <td>${option.type}</td>
            <td>
                <div class="price-container">
                    <div class="promotional-price">${option.price} ₽</div>
                    <button class="buy-button" onclick="confirmOrder('${product.name}', '${option.location}', '${option.weight}', '${option.type}', '${option.price}')">Купить</button>
                </div>
            </td>
        `;
        productOptions.appendChild(row);
    });

    productDetail.style.display = 'block';
    window.scrollTo(0, 0);
}

function confirmOrder(name, location, weight, type, price) {
    const confirmationName = document.getElementById('confirmationName');
    const confirmationLocation = document.getElementById('confirmationLocation');
    const confirmationWeight = document.getElementById('confirmationWeight');
    const confirmationType = document.getElementById('confirmationType');
    const confirmationPrice = document.getElementById('confirmationPrice');

    confirmationName.textContent = name;
    confirmationLocation.textContent = location;
    confirmationWeight.textContent = weight;
    confirmationType.textContent = type;
    confirmationPrice.textContent = price;

    document.getElementById('orderConfirmation').style.display = 'block';
}

function toggleProductDetails() {
    const productDetails = document.getElementById('productDetails');
    productDetails.style.display = productDetails.style.display === 'none' ? 'block' : 'none';
}

function applyPromocode() {
    const promocodeInput = document.getElementById('promocodeInput');
    const promocode = promocodeInput.value.trim();
    if (promocode === 'SALE20') {
        alert('Промокод применен! Скидка 20%');
    } else {
        alert('Недействительный промокод');
    }
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

function showLoadingIcon(show) {
    const loadingIcon = document.getElementById('loadingIcon');
    loadingIcon.style.display = show ? 'block' : 'none';
}

document.getElementById('citySelect').onclick = () => {
    const cityList = document.getElementById('cityList');
    cityList.style.display = cityList.style.display === 'none' ? 'block' : 'none';
};

document.getElementById('citySearch').oninput = function() {
    const filter = this.value.toLowerCase();
    const cityItems = document.getElementById('cityItems');
    cityItems.innerHTML = '';

    cities.forEach(city => {
        if (city.toLowerCase().includes(filter)) {
            const cityDiv = document.createElement('div');
            cityDiv.classList.add('city-item');
            cityDiv.textContent = city;
            cityDiv.onclick = function() {
                document.getElementById('citySelect').textContent = city;
                document.getElementById('cityList').style.display = 'none';
                fetchProducts(city);
            };
            cityItems.appendChild(cityDiv);
        }
    });
};

document.getElementById('productsIcon').onclick = function() {
    document.getElementById('mainContainer').style.display = 'block';
    document.getElementById('productDetail').style.display = 'none';
    document.getElementById('orderConfirmation').style.display = 'none';
};

document.getElementById('profileIcon').onclick = function() {
    alert('Функция профиля в разработке');
};

document.getElementById('chatIcon').onclick = function() {
    alert('Функция чата в разработке');
};

function preorderProducts() {
    alert('Предзаказ оформлен!');
}

window.onload = function() {
    showLoadingIcon(true);
    setTimeout(() => {
        showLoadingIcon(false);
    }, 1000);
};
