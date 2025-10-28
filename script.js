function range(min, max)
{
    return Math.floor(Math.random() * (max - min) + min);
}
// картинки используемые на главном экране
const guitarAlbum = 
[
    "./images/guitars.jpg",
    "./images/guitars2.png",
    "./images/guitars3.jpg",
]
// рандомные фразы в серч баре
const searchBar = 
[
    "cool hello kitty pink guitar...",
    "search..",
    "try minecraft",
    "buy guitar NOW",
    "also try terraria",
    "don't ever try minecraft",
    "don't ever try terraria",
    "go outside",
    "touch some grass",
    "gibson is the best",
    "don't touch my nails",
    "fender is the best",
    "sneaky catfish",
    "practice more",
    "practice for pussy",
    "fortnite battlepass...",
    "100% pure!",
    "uses LWJGL!",
    "survive!",
    "illegal in Finland...",
    "4815162342 lines of code",
    "i know where you live",
];

// Класс корзины
class Cart
{
    _productList = [];

    get productList()
    {
        return this._productList;
    }
    add(value)
    {
        for(let i = 0; i < this._productList.length; i++)
        {
            let cartProduct = this._productList[i];

            if (cartProduct.product == value.product)
            {
                cartProduct.amount += 1;
                cartRefresh;
                return;
            }
        }
            
        this._productList.push(value);
        cartRefresh();  
    }
    delete(value)
    {
        value.amount -= 1;
        value.product.inStock += 1;
        if(value.amount <= 0)
        {
            this._productList.splice(this._productList.indexOf(value), 1);
        }
        if(currentPreview == value.product.category)
        {
            showProducts(value.product.category);
        }
    }
} 

// Класс элемента корзины
class CartProduct
{
    constructor(product, amount)
    {
        this._product = product;
        this._amount = amount;
    }

    get amount() 
    {   
        return this._amount;
    }
    set amount(value)
    {
        this._amount = value;
    }
    get product() 
    {
        return this._product;
    }
}

const cart = new Cart;

// Классы для гитар(товар) и гитар(превью)
class Product 
{
    constructor(category, name, price, imageUrl, inStock, id)
    {
        this._category = category;
        this._name = name;
        this._price = price;
        this._imageUrl = imageUrl;
        this._inStock = inStock;
        this._id = 'g_' + id;
        this._category.productList.push(this);
    }
    set inStock(value)
    {
        this._inStock = value;
    }
    get category() 
    {   
        return this._category;
    }
    get name() 
    {
        return this._name;
    }
    get price() 
    {
        return this._price;
    }
    get imageUrl() 
    {
        return this._imageUrl;
    }
    get inStock() 
    {
        return this._inStock;
    }
    get id() 
    {
        return this._id;
    }
}

let currentPreview = null;
class Preview 
{
    productList = [];

    constructor(category, imageUrl, id)
    {
        this._category = category;
        this._imageUrl = imageUrl;
        this._id = 'gp_' + id;
    }

    get category() 
    {   
        return this._category;
    }
    get imageUrl() 
    {
        return this._imageUrl;
    }
    get id() 
    {
        return this._id;
    }
}

// для превью нужны классы, тк.к. далее будет к ним обращение, а классы(по идее) увеличат производительность, да и более собранный код - лучше
const preview_Q = new Preview("Q","./images/guitars/q.png", 1);
const preview_AZES = new Preview("AZES","./images/guitars/azes.png", 2);
const preview_RG = new Preview("RG","./images/guitars/rg.png", 3);
const preview_SA = new Preview("SA","./images/guitars/sa.png", 4);
const preview_RGA = new Preview("RGA","./images/guitars/rga.png", 5);
const preview_RGD = new Preview("RGD","./images/guitars/rgd.png", 6);
const catalogPreview = [preview_Q,preview_AZES,preview_RG,preview_SA,preview_RGA,preview_RGD];

// классы для продуктов нужны, чтобы не засорять html код. + возможность последуещего расширения
const product_1 = new Product(preview_Q,"Ibanez QX52","999.9$","./images/catalog/Q/q_1.png", 5, 1);
const product_2 = new Product(preview_Q,"Ibanez Q547","999.9$","./images/catalog/Q/q_2.png", 5, 2);
const product_3 = new Product(preview_AZES,"Ibanez AZES31","499.9$","./images/catalog/AZES/a_1.png", 5, 3);
const product_4 = new Product(preview_AZES,"Ibanez AZES40","499.9$","./images/catalog/AZES/a_2.png", 5, 4);
const product_5 = new Product(preview_RG,"Ibanez RG8870","2,999.9$","./images/catalog/RG/rg_1.png", 5, 5);
const product_6 = new Product(preview_RG,"Ibanez RG9PB","1,199.9$","./images/catalog/RG/rg_2.png", 5, 6);
const product_7 = new Product(preview_SA,"Ibanez SA460MBW","799.9$","./images/catalog/SA/s_1.png", 5, 7);
const product_8 = new Product(preview_SA,"Ibanez SA360NQM","649.9$","./images/catalog/SA/s_2.png", 5, 8);
const product_9 = new Product(preview_RGA,"Ibanez RGA42HPT","1,299.9$","./images/catalog/RGA/rga_1.png", 5, 9);
const product_10 = new Product(preview_RGA,"Ibanez RGA42EX","649.9$","./images/catalog/RGA/rga_2.png", 5, 10);
const product_11 = new Product(preview_RGD,"Ibanez RGDR4327","2,999.9$","./images/catalog/RGD/rgd_1.png", 5, 11);
const product_12 = new Product(preview_RGD,"Ibanez RGD61ALA","1,499.9$","./images/catalog/RGD/rgd_2.png", 5, 12);
const catalogProducts = [product_1,product_2,product_3,product_4,product_5,product_6,product_7,product_8,product_9,product_10,product_11,product_12];

// обновление сайта
function firstAction()
{
    document.getElementById("input_1").placeholder = searchBar[range(0,searchBar.length)];
    document.getElementById("album").src = guitarAlbum[range(0,guitarAlbum.length)];
    showPreviews();
}

// генерация превью
function showPreviews() 
{
    let container = document.getElementById('cat_2');
    container.innerHTML = '';
    
    // создание html кода
    catalogPreview.forEach(function(preview)
    {   
        let html = '<img src="'+ preview.imageUrl +'" class = "guitarType" id = "'+ preview.id + '">';
        container.innerHTML += html;
    });

    catalogPreview.forEach(function(preview) 
    {
        previewProperties(preview);
    });
}

// свойства превью
function previewProperties(preview)
{
    let product = document.getElementById(preview.id);

    // появление
    product.addEventListener('mouseover', function() 
    {
        document.getElementById("model").innerHTML = preview.category;
    });
    // убирание
    product.addEventListener('mouseleave', function() 
    {
        document.getElementById("model").innerHTML = "Models";
    });
    // клик
    product.addEventListener('click', function() 
    {
        currentPreview = preview;
        showProducts(preview);
        setTimeout(showCatalog, 2, preview);
    });
}

// выпадение каталога
function showCatalog(preview)
{
    let block = document.getElementById("cat_1");

    if (block.style.height == "0px" || block.style.height == "") 
    {
        lastId = preview.id;
        let totalHeight =  document.getElementById("guitarCatalog").getBoundingClientRect().height;
        block.style.height = totalHeight + 20 + "px";
    } 

    else if (lastId == preview.id)
    {
        block.style.height = "0px";
    }
    else
    {
        lastId = preview.id;
    }
}

// нажатие на кнопку
function buttonClick(button, category)
{
    button.onclick = function()
    {
        console.log(button.id + " was" + "%c clicked" , 'color: yellow');
        let guitar = category.productList.find(product => product.id == "g_" + button.id.slice(4));
        if (guitar.inStock != 0)
        {
            guitar.inStock = guitar.inStock - 1;
            let cartProduct = new CartProduct(guitar, 1);
            cart.add(cartProduct);
            console.log(guitar.name + "%c added", 'color:green')
            console.log('\u2500'.repeat(40));
            cartRefresh();
        }
        showProducts(category);
    }
}


// генерация товаров
function showProducts(category) 
{
    let container = document.getElementById('cat_1');
    container.innerHTML = '';
    let html = '';
        
    html += '<div id = "guitarCatalog">'
    category.productList.forEach(function(product)
    {   
        html += '<div class="guitar" id = "'+ product.id + '">';
        html += '<div class="guitaImg">';
        html += '<img src="' + product.imageUrl + '">';
        html += '</div>';

        html += '<div class="guitarTxt">';
        html += '<p>' + product.name + '</p>';
        html += '<p>' + product.price + '</p>';
        html += '<p>In Stock: ' + product.inStock + '</p>';
        if(product.inStock != 0)
        {
            html += '<input type="button" class = "buyButton" value="BUY ONLINE" id = "but_' + product.id.slice(2) + '">';
        }
        else
        {
            html += '<input type="button" class = "disabledButton" value="OUT OF STOCK">';
        }
        html += '</div>';
        html += '</div>';
    });
    html += '</div>'

    container.innerHTML += html;
    console.log(html + "%c- DISPLAYED" , 'color: red');
    console.log('\u2500'.repeat(40));

    let buttons = document.querySelectorAll(".buyButton");
    buttons.forEach(function(button)
    {
        buttonClick(button,category);
    })
}

// нажатие на кнопку удаления товара
function buttonCartCancelClick(guitar)
{
    cart.delete(guitar);
    cartRefresh();
}

// нажатие на корзину
let buttonCart = document.getElementById("icon_1");
let buttonCartCounter = 1;

function buttonCartClick()
{
    if(buttonCartCounter % 2 != 0)
    {
        cartRefresh(cartIsEmpty());
        cartShow();
    }
    else if (buttonCartCounter % 2 == 0)
    {
        cartHide();
    }

    buttonCartCounter++;
};

// обновление корзины
function cartRefresh(isEmpty)
{
    let container = document.getElementById('cart');
    container.innerHTML = "";
    let html = "";

    if (isEmpty)
    {
        html += '<div class = "cartEmpty">';
        html += '<p> nothing here yet... </p>';
        html += '</div>';
        container.innerHTML = html;
        return;
    }

    for(var i = 0, length1 = cart.productList.length; i < length1; i++)
    {
        html = "";
        let cartProduct = cart.productList[i];
        let guitar = cartProduct.product;

        html += '<div class = "cartGuitar">';
        html += '<div class = "cartGuitarContent">';
        html += '<div class="cartImg">';
        html += '<img src="' + guitar.imageUrl + '">'
        html += '</div>';

        html += '<div class="cartText">';
        html += '<p>' + guitar.name + ': </p>';
        html += '</div>';

        html += '<div class="cartOthers">';
        html += '<div class = "cartOthersText">';
        html += '<p>' + cartProduct.amount + '</p>';
        html += '</div>';

        html += '<div class = "cartOthersButton">';
        let id = "cancelBut_" + guitar.id.slice(2);
        html += '<input type = "button" class = "cancelButton" value = "x" id = "' + id + '">';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        container.innerHTML += html;
    }

    for(var i = 0, length1 = cart.productList.length; i < length1; i++)
    {
        let cartProduct = cart.productList[i];
        let guitar = cartProduct.product;
        let id = "cancelBut_" + guitar.id.slice(2);

        cancelButtonSubscription(id, cartProduct);
    }
}

function cancelButtonSubscription(id, cartProduct)
{
    document.getElementById(id).onclick = function()
    {
        buttonCartCancelClick(cartProduct);
    };
}

// появление корзины
function cartShow()
{
    let cartContainer = document.getElementById('cart');
    cartContainer.style.display = "inline";
}

// сокрытие корзины
function cartHide()
{
    let cartContainer = document.getElementById('cart');
    cartContainer.style.display = "none";
}

buttonCart.addEventListener("click", buttonCartClick);

// проверка корзины на пустоту 
function cartIsEmpty()
{
    return cart.productList.length == 0;
}