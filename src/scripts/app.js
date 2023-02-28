(function main() {
    start();

    function start() {

        const cleanButton = document.querySelector('#clean-button');
        const mainWrapper = document.querySelector('#main-wrapper');
        const orderListWrapper = document.querySelector('#order-list-wrapper');
        const headerInputs = document.querySelector('header').querySelectorAll('input');

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
                headerInputs.forEach(input => input.value = null);
                resetTotalBill();
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

function showBill() {
    const orderList = document.querySelectorAll('.order');
    
    if (orderList.length == 0) {
        alert('Can not show total of the bill if there is no order');
    } 
    else {

        document.querySelector('#total-output').style.visibility = 'visible';

        let fourIvaTotal = 0;
        let tenIvaTotal = 0;
        let twentyOneIvaTotal = 0;

        orderList.forEach(order => {
            const iva = Number(order.querySelector('select').value);
            const total = Number(order.querySelector('output').innerText);
            console.log(total);
            console.log(iva)
            switch (iva) {
                case 0.04:
                    fourIvaTotal += getIvaFromTotal(total, iva);
                    break;
                case 0.1:
                    tenIvaTotal += getIvaFromTotal(total, iva);
                    break;
                case 0.21:
                    twentyOneIvaTotal += getIvaFromTotal(total, iva);
                    break;
                default:
                    break;
            }
        });

        function getIvaFromTotal(total, iva) {
            return total - total / (1 + iva);
        }

        console.log(fourIvaTotal + " " + tenIvaTotal + " " + twentyOneIvaTotal);

        document.querySelector('#total-21').innerText = twentyOneIvaTotal;
        document.querySelector('#total-10').innerText = tenIvaTotal;
        document.querySelector('#total-4').innerText = fourIvaTotal;
    }
    
}

function resetTotalBill() {
    const totalBillOutput = document.querySelector('#total-output');
    totalBillOutput.style.visibility = 'hidden';
    totalBillOutput
        .querySelectorAll('span')
        .forEach(span => span.innerText = '');
}