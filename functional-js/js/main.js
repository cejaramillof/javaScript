const compose = (...functions) => data =>
	functions.reduceRight((value, func) => func(value), data)

/*
    function compose(...functions) {
        return function (data) {
            functions.reduceRight((value, function) => func(value), data){
            })
        }
    }
*/

const $DESC = document.getElementById('description');
const $CALORIES = document.getElementById('calories');
const $CARBS = document.getElementById('carbs');
const $PROTEIN = document.getElementById('protein');

const $ADD_BUTTON = document.getElementById('add');

const IS_INVALID = 'is-invalid'

let itemsList = [];

const attrToString = (obj = {}) =>
	Object.keys(obj)
		.map(key => `${key}="${obj[key]}"`)
		.join(' ')

const tagAttrs =
	obj =>
		(content = '') =>
			`<${obj.tag}${obj.attrs ? ' ' : ''}${attrToString(obj.attrs)}> ${content} </${obj.tag}>`;

const inputAttrs =
	obj =>
		`<${obj.tag}${obj.attrs ? ' ' : ''}${attrToString(obj.attrs)}>`;

const inputTag =
	nameTag =>
		typeof nameTag === 'string' ? inputAttrs({ tag: nameTag }) : inputAttrs(nameTag);

const tag =
	nameTag =>
		typeof nameTag === 'string' ? tagAttrs({ tag: nameTag }) : tagAttrs(nameTag);

// const tableRowTag = tag('tr')
const tableRowTag = index = tag({ tag: 'tr', attrs: { id: `list-item-${index}` } });

const tableCell = tag('td');
const tableCells = items => items.map(tableCell).join('');

// const tableRow = (items) => tableRowTag(tableCells(items))
const tableRow = (items) => compose(tableRowTag, tableCells)(items);

const tableRowIndexed = index => (items) => {
	tableRowTag(index);
	tableCells(items);
}

const add = (list) => {
	const newItem = {
		description: $DESC.value,
		calories: parseInt($CALORIES.value),
		carbs: parseInt($CARBS.value),
		protein: parseInt($PROTEIN.value),
	}

	list.push(newItem);
	console.log(list);
}

const clearInputs = () => {
	$DESC.value = '';
	$CALORIES.value = '';
	$CARBS.value = '';
	$PROTEIN.value = '';
}

const removeItem = index => {
	itemsList.splice(index, 1);
	updateTotal();
	renderItems();
}

const editItem = index => {
	const $rowToEdit = document.querySelectorAll(`#list-item-${index} td input`);
	const $buttonMOD = document.querySelector(`#list-item-${index} td .edit`)

	if ($buttonMOD.getAttribute('data-status') == 'start') {
		Array.prototype.map.call($rowToEdit, item => { item.disabled = false; item.classList.add('enabled') });
		$buttonMOD.setAttribute('data-status', 'finish')
	}
	else {
		const newItem = {
			description: $rowToEdit[0].value,
			calories: parseInt($rowToEdit[1].value),
			carbs: parseInt($rowToEdit[2].value),
			protein: parseInt($rowToEdit[3].value),
		}

		itemsList[index].description = newItem.description;
		itemsList[index].calories = newItem.calories;
		itemsList[index].carbs = newItem.carbs;
		itemsList[index].protein = newItem.protein;

		Array.prototype.map.call($rowToEdit, item => { item.disabled = true; item.classList.remove('enabled') });
		$buttonMOD.setAttribute('data-status', 'start')

		updateTotal();

		console.log('Elementos Editados');
	}
}

const updateTotal = () => {
	let calories = 0, carbs = 0, protein = 0;

	itemsList.map((item) => {
		calories += item.calories;
		carbs += item.carbs;
		protein += item.protein;
	});

	document.getElementById('total-calories').textContent = calories;
	document.getElementById('total-carbs').textContent = carbs;
	document.getElementById('total-protein').textContent = protein;
}

const renderItems = () => {
	const $TBODY = document.getElementById('list-items');

	const rows = itemsList.map((item, index) => {
		// const tableRowTag = tag({ tag: 'tr', attrs: { id: `list-item-${index}` } });
		// const tableRow = (items) => compose(tableRowTag, tableCells)(items);

		const descriptionInput = {
			tag: 'input',
			attrs: {
				type: 'text',
				name: 'description',
				disabled: 'true',
				value: item.description,
			}
		};

		const caloriesInput = {
			tag: 'input',
			attrs: {
				type: 'number',
				name: 'calories',
				disabled: 'true',
				value: item.calories,
			}
		};

		const carbsInput = {
			tag: 'input',
			attrs: {
				type: 'number',
				name: 'carbs',
				disabled: item.carbs,
				value: item.carbs,
			}
		};

		const proteinInput = {
			tag: 'input',
			attrs: {
				type: 'number',
				name: 'protein',
				disabled: 'true',
				value: item.protein,
			}
		};

		const description = inputAttrs(descriptionInput);
		const calories = inputAttrs(caloriesInput);
		const carbs = inputAttrs(carbsInput);
		const protein = inputAttrs(proteinInput);

		const buttonsArray = [
			{
				tag: 'button',
				attrs:
				{
					class: 'remove',
					onclick: `removeItem(${index})`,
				}
			},
			{
				tag: 'button',
				attrs:
				{
					class: 'edit',
					onclick: `editItem(${index})`,
					'data-status': 'start',
				}
			},
		]

		const buttons = buttonsArray.map(item => tag(item)('')).join('');

		return tableRowIndexed(index)([description, calories, carbs, protein, buttons]);
	}).join('');

	$TBODY.innerHTML = rows;
}

const validateInputs = () => {
	if ($DESC.value && $CALORIES.value && $CARBS.value && $PROTEIN.value) {
		add(itemsList);
		clearInputs();
		updateTotal();
		renderItems();
	}
	else {
		$DESC.classList.add(IS_INVALID);
		$CALORIES.classList.add(IS_INVALID);
		$CARBS.classList.add(IS_INVALID);
		$PROTEIN.classList.add(IS_INVALID);
	}
}

$ADD_BUTTON.addEventListener('click', validateInputs);

$DESC.addEventListener('keyup', () => { $DESC.classList.remove(IS_INVALID) });

$CALORIES.addEventListener('keyup', () => { $CALORIES.classList.remove(IS_INVALID) });

$CARBS.addEventListener('keyup', () => { $CARBS.classList.remove(IS_INVALID) });

$PROTEIN.addEventListener('keyup', () => { $PROTEIN.classList.remove(IS_INVALID) });

window.addEventListener('beforeunload', () => { localStorage.setItem('items', JSON.stringify(itemsList)) });

(() => {
	items = JSON.parse(localStorage.getItem('items'));
	console.log(items);
	items.length === 0 ? 0
		: itemsList = items,
		updateTotal(),
		renderItems();
})();