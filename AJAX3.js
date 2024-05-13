const input = document.querySelector("input");
const getButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector("div");

getButton.addEventListener("click", getButtonUse);

function getButtonUse() {
    const value = document.querySelector('input').value;

    if (value >= 1 && value <= 10 && !isNaN(value)) {
        useRequest(`https://jsonplaceholder.typicode.com/photos?_limit=${value}`, loadPhotos);
        write("Загружаю фото...");
    } else {
        write("Число вне диапазона от 1 до 10.");
    }
}

function write(text) {
    outputSpan.innerHTML = text;
}

function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status !== 200) {
            write("Статус ответа: ", xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
            write("Фото загружены.");
        }
    };

    xhr.onerror = function() {
        write("Ошибка! Статус ответа: ", xhr.status);
    };

    xhr.send();
};

function loadPhotos(value) {
    let cards = String();

    value.forEach(item => {
        const cardBlock =     `<div>
                                <img
                                  src="${item.thumbnailUrl}"
                                  style="width: 150px; margin-right: 30px"
                                />
                                <p>${item.id}</p>
                              </div>`;
        cards += cardBlock;
    });

    photosContainer.innerHTML = cards;
}