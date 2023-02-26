(function main() {
    start();

    function start() {

        const cleanButton = document.querySelector('#clean-button');
        const mainWrapper = document.querySelector('#main-wrapper');

        mainWrapper.style.visibility = 'hidden';

        cleanButton.addEventListener('click', () => {

            if (cleanButton.innerText === 'create') {
                cleanButton.innerText = 'clean';
                mainWrapper.style.visibility = 'visible';
            } else {
                cleanButton.innerText = 'create';
                mainWrapper.style.visibility = 'hidden';
            }
        });

        function addOrder() {
             
        }
    }

    const orderHtml = 
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
                <option value="4%">4%</option>
                <option value="10%">10%</option>
                <option value="21%">21%</option>
            </select>
        </div>
        <div>
            <output>
                <span>&euro;</span>
            </output>
        </div>
        <div>
            <button class="delete-button">delete</button>
        </div>`;
})();