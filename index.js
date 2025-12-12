let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list"); //метод вернёт первый на странице элемент с этим классом
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasks = localStorage.getItem('toDoTasks'); //получение данных по ключу
    if (savedTasks) {
        return JSON.parse(savedTasks); //из строки в объект
    } else {
        return items;
    }
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template"); //получить доступ к шаблону по идентификатору
	const clone = template.content.querySelector(".to-do__item").cloneNode(true); //копия списка задач
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  
  textElement.textContent = item;
  
  deleteButton.addEventListener('click', function() {
        clone.remove();
        const items = getTasksFromDOM();
        saveTasks(items);
    });

	duplicateButton.addEventListener('click', function() {
        const itemName = textElement.textContent;
        const newItem = createItem(itemName);
        listElement.prepend(newItem);
        const items = getTasksFromDOM();
        saveTasks(items);
    });

	editButton.addEventListener('click', function() {
        textElement.setAttribute('contenteditable', 'true'); //делает элемент редактируемым
        
        textElement.focus(); //установка фокуса
    });

    textElement.addEventListener('blur', function() {
        textElement.setAttribute('contenteditable', 'false'); //выход из редактора, тк с элементом не взаимодействуют
        
        const items = getTasksFromDOM();
        saveTasks(items);
    });

  return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
    const tasks = [];
    
    itemsNamesElements.forEach(element => {
        tasks.push(element.textContent);
    });
    
    return tasks; //текущие задачи
}

function saveTasks(tasks) {
	localStorage.setItem('toDoTasks', JSON.stringify(tasks));
}

items = loadTasks();
items.forEach(item => {
    const newItem = createItem(item);
    listElement.append(newItem);
});

formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = inputElement.value.trim(); // удаляет пробелы в начале и конце строки
    if (taskText === '') {
        return;
    }
    const newTaskElement = createItem(taskText);
    listElement.prepend(newTaskElement); //добавление в начало

	items = getTasksFromDOM();
	saveTasks(items);

    inputElement.value = '';
});