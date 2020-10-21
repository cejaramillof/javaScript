# Porgramación funcional
Paradigma de programación, en el que se busca explicar qué hay que hacer, en vez de cómo lo debemos hacer. Tampoco utilizamos clases o constructores, más bien declaramos objetos con propiedades que actualizamos sin modificar los objetos iniciales (funciones puras e inmutabilidad).
La programación imperativa consiste en explicar paso a paso cómo conseguir un resultado, en cambio, la programación declarativa se centra en qué hay que hacer.

```javascript
// POO // Imperative // ¿cómo?
class Person{
	constructor(name, age) {
		this.name = name
		this.age = age
	}
	getOld() {
		this.age += 1
	}
}
let person = new Person('Carlos', 15)
person.getOld() // 16

// Imperative
let array = [1,2,3]
let array2 = []

for (let i = 0; i<array.length;i++) {
	array2.push(array[i]*2) // [2,4,6]
}
```
```javascript
// Functional // Declarative // ¿Qué?
const persona = {
	name: 'Carlos',
	age: 15
}

const getOld = person => Object.assign({}, person, { age: person.age + 1})
getOld(person) // 16

// Declarative
let array = [1,2,3]
let array2 = array.map(item => item*2) // [2,4,6]
```

## Pure Functions
Ever returns the same result with have the same props. Dont dependes to external factors.
```javascript
// PURE
const double = x => x*2;
double(2); // ever will return 4
double(3); // ever will return 6

// IMPURE
const time = () => new Date().toLocaleTimeString();
time();
```

# Objetos y Tipos de Memoria JS
**Stack**
Una Stack es una región de memoria que opera en modo First-In-Last-Out.
Cuando se crea un nuevo thread, puede ser por un programa, se crea una nueva pila.
Es pequeña y puede usarse para almacenar de manera rápida y obtener data temporal.
La memoria Stack es mucho más rápida y nos permite almacenar los datos de manera “organizada” y en JS la utilizamos para almacena datos primitivos (se acceden por valor).

**Heap**
También es llamado ‘free store’.
Es una región grande de memoria que puede ser usado para almacenar data de manera desorganizada y arbitraria.
Es usada para estructuras de datos.
La información se obtiene  (accede) a través de referencias.
Es un poco más lento sacar información de acá.

## Copiar y modificar objectos
```javascript
let a = 1
let b = a
console.log(a, b) // 1, 1
b += 1
console.log(a, b) // 1, 2
```
```javascript
let car = { color: 'red', year: 2019, km: 0 }

let car2 = car
car2.color = 'blue'

console.log(car, car2) // ambos objetos tienen color azul, no solo `car2`

let car = { color: 'red', year: 2019, km: 0 }

let car2 = Object.assign({} , car)
car2.color = 'blue'

console.log(car, car2) // `car` es de color rojo y `car2` de color azul
```
```javascript
let car = { color: 'red', year: 2019, km: 0, owner: { name: 'David', age: 25 } }

// El object assign, sólo copia el primer nivel, así que si modificamos el owner, modificaría ambos.
let car2 = JSON.parse(JSON.stringify(car)); // cant contain undefined or functions
car2.owner.age += 1

console.log(car, car2) // el dueño de `car2` es un año mayor al dueño de `car`
```
```javascript
var obj = {
	foo: function() {
		return "I'm a function!";
	}
};

var json = JSON.stringify(obj, function(key, value) {
	if (typeof value === 'function') {
		return value.toString();
	} else {
		return value;
	}
});

console.log(json); // {"foo":"function () { return \"I'm a function!\" }"}
```

# Inmutabilidad
```javascript
// Con mutaciones
const addToList = (list, item, quantity) => {
	list.push({ // modificamos el argumento `list`
		item,
		quantity
	})
	return list
}

//  Sin mutaciones (inmutabilidad)
const addToList = (list, item, quantity) => {
	const newList = JSON.parse(JSON.stringify(list))
	newList.push({ // modificamos la copia del argumento
		item,
		quantity
	})
	return newList
}
```

# Shared State
```javascript
const addOne = () => a.value += 1;
const timesTwo = () => a.value *= 2;

var a = {value: 2};
console.log(addOne(timesTwo(a))); // 5
console.log(a.value); // 5

var a = {value: 2};
console.log(timesTwo(addOne(a))); // 6
console.log(a.value); // 6 !?? Al ejecutarles en diferente orden
```
```javascript
const b = {value: 2};

const addOne = x => Object.assign({}, x, { value: x.value + 1 });
const timesTwo = x => Object.assign({}, x, { value: x.value * 2 });

console.log(timesTwo(addOne(b))); // 6
console.log(b.value); // 2

// Function Composition
console.log(addOne(timesTwo(b))); // 5
console.log(b.value); // 2
```

## Function Composition
Son las funciones que obtenemos como resultado de combinar otras dos o más funciones, el resultado de cada función es el argumento de la siguiente y así sucesivamente.

## Clousure
Los Closures son funciones que retornan otras funciones y recuerdan el scope en el que fueron creadas, es decir, son funciones que utilizan principios de la programación funcional, no modifica el valor de variables u objetos externos, más bien, utilizan sus propias variables independientes (a partir de los parámetros que reciban estas funciones) para dar resultados correctos.
```javascript
function buildSum(a) {
	return function(b) {
		return a + b;
	}
}
const addFive = buildSum(5);
console.log(addFive(5));
console.log(buildSum(5)(5));

const buildSum = a => b => a + b;
```

## Currying
Gracias a los closures es posible implementar el Currying, descomponer funciones complejas en otras funciones más pequeñas donde cada función recibe un solo argumento. Una de las ventajas es que si al momento de invocar una función que espera más de un parámetro, tienes solo uno de ellos, pues la función no generará un error, sino que retornará otra función que estará preparada para recibir el resto de parámetros que esperabas originalmente.

Es un poco complejo de explicar, más aún en el contexto de JavaScript… pero en lenguajes “con alma de programación funcional” como Haskell, es sumamente útil y común encontrarle uso práctico a esta técnica.

```javascript
// Sin Currying
function sumThreeNumbers(a, b, c) {
	return a + b + c;
}

console.log(sumThreeNumbers(1, 2, 3)) // 6

function sumThreeNumbers(a) {
	return function(b) {
		return function(c) {
			return a + b + c;
		}
	}
}

const sumThreeNumbers = a => b => c => a + b + c;

console.log(sumThreeNumbers(1)(2)(3)); // 6
```

## Higher Order Functions
Usualmente las funciones que construimos se pueden definir como **First Class Functions**, sin embargo, existen otro tipo de funciones que conocemos como **Higher Order Functions** o **funciones de alto orden** y podemos distinguirlas porque reciben otra función como argumento. Cómo (.map)
```javascript
// Ciclo for (sin HOF)
const array = [1, 2, 3]
const array2 = []

for (let i = 0; let i < array.length; i++) {
	array2.push(array[i] * 2)
}

// Utilizando la función .map (HOF)
const array = [1, 2, 3]
const array2 = array.map(item => item * 2)

// Ambas formas devuelven el mismo resultado,
// sin embargo, utilizando HOFs podemos escribir
// código mucho más legible y fácil de entender
console.log(array2) // [2, 4, 6]
```

### Notación point free
Al definir nuevas funciones, nos permite invocar funciones sin hacer referencia a los valores de entrada.
```javascript
const even = x => x % 2 === 0;
const filtered = [1, 2, 3, 4, 5, 6].filter(even); // => [2, 4, 6]
```