(function main() {
    start();

    function start() {

        const cleanButton = document.querySelector('#clean-button');
        const mainWrapper = document.querySelector('#main-wrapper');
        const orderListWrapper = document.querySelector('#order-list-wrapper');

        mainWrapper.style.visibility = 'hidden';

        cleanButton.addEventListener('click', () => {

            if (cleanButton.innerText === 'create') {
                cleanButton.innerText = 'clean';
                mainWrapper.style.visibility = 'visible';
                addOrder();
            } else {
                cleanButton.innerText = 'create';
                mainWrapper.style.visibility = 'hidden';
                orderListWrapper.textContent = '';
            }
        });
    }

    function addOrder() {
        const newOrder = document.createElement('div');
        const listOrderWrapper = document.querySelector('#order-list-wrapper');

        newOrder.classList.add('order');
        newOrder.insertAdjacentHTML('afterbegin', innerOrderTemplate);

        listOrderWrapper.appendChild(newOrder);

        const unitInput = newOrder.querySelector('input[name="unit"]');
        const priceInput = newOrder.querySelector('input[name="unit-price"]');
        const orderSelect = newOrder.querySelector('select');

        unitInput.addEventListener('input', () => showOuput(unitInput, priceInput));
        priceInput.addEventListener('input', () => showOuput(priceInput, unitInput));
        orderSelect.addEventListener('change', () => showOuput(priceInput, unitInput));

        addButtonListeners();

        function showOuput(changedInput, unchangedInput) {

           const orderOutput = newOrder.querySelector('output');

           if (Number(changedInput.value) < 0) 
               alert(changedInput.name + " can not be negative");
           else if (unchangedInput == null)
               alert(unchangedInput.name + " have to be filled first");
           else {
               const grossPrice = Number(changedInput.value) * Number(unchangedInput.value);
               const iva = Number(orderSelect.value) * grossPrice;
               const total = grossPrice + iva;
               orderOutput.innerText = total;
           }
        }

        function addButtonListeners() {
            const addButton = newOrder.querySelector('.add-button');
            const deleteButton = newOrder.querySelector('.delete-button');

            deleteButton.addEventListener('click', () => {
                newOrder.textContent = '';
                newOrder.remove();
            });

            addButton.addEventListener('click', () => {
                addOrder();
            });
        }
   }

    const innerOrderTemplate = 
        `<div>
            <button class="add-button">+</button>
        </div>
        <div>
            <input type="text" name="description">
        </div>
        <div>
            <input type="number" name="unit">
        </div>
        <div>
            <input type="number" name="unit-price">
        </div>
        <div>
            <select name="iva">
                <option value="0.04">4%</option>
                <option value="0.1">10%</option>
                <option value="0.21">21%</option>
            </select>
        </div>
        <div>
            <output></output>
        </div>
        <div>
            <button class="delete-button">delete</button>
        </div>`;
})();