# javaScript (básico)
## Variables:
JS es debilmente tipado. (weakly typed)

```javascript
var mayoriaEdad = 18 // Magic Number
const MAYORIA_EDAD // constante
```

### Strings
```javascript
var nombre = 'Carlos', apellido = 'Jaramillo'.toLowerCase();
var nombreConcatenado = `${nombre.toUpperCase()} ${apellido}`;

var nombreMayusculas = nombre.toUpperCase();
var apellidoMinusculas = apellido.toLowerCase();

var primeraLetraNombre = nombre.charAt(0);
var cantidadLetrasNombre = nombre.lenght; // attribute.

var nombreCompleto = nombre + '' + apellido;
var nombreCompletoST = `${nombre.toUpperCase()} ${apellido}` // StringTemplate or TemplateLiterals.

var str = nombre.substr(1,2); // (posicion inicial, cantidad de chars).
```

### Números
```javascript
var edad = 27;

edad = edad + 1;
edad += 1;

var precio = 200.3 * 3;
// No da exacto, porque la manera de guardar decimales de JS no es muy precisa.
// Porque destina una cantidad de bytes en la ram, para asignarle un decimal.
var precioFixed = 200.3 * 100 * 3 / 100; // Solo funciona con 1 decimal.
var priceFixed = Math.round(200.3 * 100 * 3) / 100; // es un poco más exacta.

var totalStr = priceFixed.toFixed(3); // Convertir a string y cantidad de decimales.
var totalNum = parseFloat(totalStr); // Convertir a número float.
```
    
## Funciones
Son pedazos de código reutilizables.
    
```javascript
function nombreFuncion(parametrosRecibidos) { // Los Parametros, son opcionales, porque es weakly typed.
    // cuerpo función.
    return // Valor retornado por la función
}
```
Se puede asignar a una variable, una función.
Si una función no tiene nombre, es anonima.

```javascript
var ó const  esMayorEdad = function (persona) {
    return persona.edad >= MAYORIA_EDAD
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}
```
### Arrow Function 

se le quita la palabra function, y se agrega =>

Si solo recibe un parametro, podemos obviar los parentesis. (persona)
```javascript
const esMayorEdad = persona => { 
    return persona.edad >= MAYORIA_EDAD
}
```
Si una función solo retorna algo, podemos borrar el return y las { llaves }
```javascript
    const esMayorEdad = persona => persona.edad >= MAMAYORIA_EDAD
```
   
### Alcance Funciones (Scopes)
- Las variables se envian por referencia a scopes descendientes predeterminadamente.
 
**Global Scope** (*var* o *let*) Estando fuera de una función/clase
```javascript    
a = 'xd'; // Global Scope (Default Scope)

var b; // Global Scope - Hoisting (Declarar una variable, sin asignarle valor)
b = 'xd'; 

var c = 'xd'; // Global Scope - Permite Hoisting 
let c = 'xd'; // Global Scope - No permite Hoisting
```
 **Local Scope** (*var* o *let*) Estando dentro de una función/clase
```javascript
function foo() {
    var d = 'lol'; // Local Scope
    var e = 'lol'; // Local Scope
}
```
  - Se puede tener una variable global y una local con el mismo nombre y diferente valor
   
 **block scope** (*let* o *const*) *let* necesita estar dentro de un bloque *(if, while, for, loops, { }, etc)*

    if (true) {
        let i = 1; // Block Scope
    }
    console.log(i); // ReferenceError: i is not defined

    const f = 'constante'; // No permite hoisting
  - const crea una referencia inmutable, no variables inmutables
  - las constantes no son reasignables, pero pueden ser mutables. 
    
 ### Side Effect (daño colateral)
 Cuando al ejecutar una función, ella modifica variables que no estan definidas dentro de ella.
 