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
