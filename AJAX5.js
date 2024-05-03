const inputPageNumber = document.getElementById("page-number");
const inputLimit = document.getElementById("limit");
const getButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector("div");

getButton.addEventListener("click", getButtonUse);

if (loadPhotosFromLocalStorage())
    write("Загружены последние просмотренные фото.");

function getButtonUse() {
    const pageNumber = inputPageNumber.value;
    const limit = inputLimit.value;

    if ((pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) && (limit < 1 || limit > 10 || isNaN(limit))) {
        write("Номер страницы и лимит вне диапазона от 1 до 10.");
        return;
    } else
    if (pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) {
        write("Номер страницы вне диапазона от 1 до 10.");
        return;
    } else
    if (limit < 1 || limit > 10 || isNaN(limit)) {
        write("Лимит вне диапазона от 1 до 10.");
        return;
    }

    write("Загружаю фото...");

    fetch(` https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=${limit}`)
        .then((response) => { return response.json(); })
        .then((json) => {
            loadPhotos(json);
            savePhotosToLocalStorage();
            write("Фото загружены.");
        })
        .catch((reason) => {
            write("Ошибка: " + reason);
        });
}

function write(text) {
    outputSpan.innerHTML = text;
}

function loadPhotos(apiData) {
    let cards = String();

    apiData.forEach(item => {
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

function savePhotosToLocalStorage() {
    localStorage.setItem("last_photos", photosContainer.innerHTML);
}

function loadPhotosFromLocalStorage() {
    photosContainer.innerHTML = localStorage.getItem("last_photos");
    return  photosContainer.innerHTML.length > 0;
}