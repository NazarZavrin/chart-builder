// Include in progect: 
// import "./addEventListenerN and removeEventListenerN.js";

// ↓код функций addEventListenerN и removeEventListenerN
function addEventListenerN(eventType, handler, options) {
    // функция принимает те же аргументы ↑, что и addEventListener
    if (this && this.addEventListener) {
        // ↑ существует ли элемент и есть ли у него метод addEventListener
        this.addEventListener(eventType, handler, options);
        let removeEventListenerN = () => {
            this.removeEventListener(eventType, handler, options);
            // ↑ у этого элемента удалить переданный обработчик
        }
        return removeEventListenerN;
        // ↑ возвратить функцию для удаления
    }
}
EventTarget.prototype.addEventListenerN = addEventListenerN;
/* ↑
поместить addEventListenerN в EventTarget.prototype по одноимённому ключу,
чтобы у всех элементов, которые могут генерировать события и могут иметь 
обработчик события, можно было вызвать addEventListenerN
*/

