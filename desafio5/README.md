# CLASE 9 - Motores de Plantillas

## MVC

### Model View Controller

El controlador se encargará de obtener la plantilla desde el modelo.
Es el cerebro de estos motores, ya que aquí es donde se encuentra la lógica.

## Motores de plantilla

- Un motor de plantillas lee un archivo de texto que contiene la presentación ya preparada en un lenguaje pseudo HTML. e inserta en él la información dinámica que le ordena el "controlador"
- La sintaxis depende del motor de plantillas utilizado

### Ventajas

- El código es más organizado, y tenemos garantía de que no habrá HTML mal formado.
- Podemos separar nuestro equipo en dos, al trabajar interfaces de usuario sin necesidad de desarrollar en Backend
- Los motores de plantilla nos permiten reutilizar secciones de código ayudando a mantener nuestro proyecto optimizado.

### Desventajas

- La no utilización de un motor de plantillas puede afectar la velocidad de nuestro desarrollos de aplicaciones
- El riesgo de hacer HTML mal formado es mucho mayor
- El código resultante puede resultar difícil de documentar y de compartir con otros desarrolladores

```handlebars
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Document</title>
</head>
<body>
Hola {{nombre}}
</body>

```

## Handlebars

- Handlebars es un lenguaje de plantillas simple
- Utiliza una plantilla y un objeto de entrada para generar un HTML, u otros formatos de texto.
- Las plantillas de HBS tienen el aspecto de texto normal con expresiones de handlebars _incrustadas_
- Una expresión de HBS se compone de {{ + algunos contenidos + }}

### Implementación de HANDLEBARS desde el CDN

```HTML
<span></span> //  Para incrustar el resultado
<script src="CDN HANDLEBARS"></script>
<script>
    const template = Handlebars.compile('<h1>{{nombre}}</h1>') // Compila la plantilla
    const html = template({nombre: "Felipao"}) // Genera el HTML
    document.querySelector('span').innerHTML = html // Inyecta el resultado en la vista
</script>
```

### Creando un motor de plantillas custom para express

- Utilizamos el método

```javascript
app.engine(ext, callback);
```

para crear nuestro propio motor de plantilla. _ext_ hace referencia a la extensión de archivo y _callback_ es la función de motor de plantilla, que acepta como parámetros la ubicación del archivo, el objeto options y la función callback

- El método

```javascript
app.set("views", path);
```

especifica la carpeta de plantillas.

- El método

```javascript
app.set("view engine", name);
```

registra el motor de plantillas.

#### Ejemplo

Implementación de motor de plantilla para la representación de archivos _.coder_

```javascript
app.engine("coder", async (filePath, options, callback) => {
  // model
  const { nombre } = options;

  // views
  const template = await fs.promises.readFile(filePath, "utf-8");
  //* <h1>hola {{nombre}}</h1>

  // controller
  const rendered = template.replace("{{nombre}}", nombre);

  return callback(null, rendered);
});

app.set("views", "./views");
app.set("view engine", "coder");

app.get("/", (req, res) => {
  const data = {
    nombre: "Felipe",
  };

  res.render("index", data);
});
```

# Para usar handlebars desde el lado del SERVER

## Ejecutamos el siguiente comando

```
npm i express-handlebars
```

### Configuración

```javascript
// Cargo el módulo handlebars
const handlebars = require("express-handlebars");

// establecemos la configuración de HBS

app.engine(
  "hbs", // Nombre referencia a la plantilla (se usa luego en set)
  handlebars({
    // Función de configuración HBS
    extname: ".hbs", // Extensión a utilizar (en lugar de HBS por defecto)
    defaultLayout: "index.hbs", // Plantilla principal
    layoutsDir: _dirname + "/views/layouts", // Ruta a la plantilla principal
    partialsDir: _dirname + "/views/partials", // Ruta a las plantillas parciales
  })
);

// Establecemos el motor de plantilla
app.set("view engine", "hbs");

// Establecemos directorio donde se encuentren los motores de plantillas

app.set("views", "./views");

// Espacio público del servidor
app.use(express.static("public"));
```

# CLASE 10 - Pug & Ejs

### Instalar PUG

```
$ npm i pug
```

- Se creará un directorio en la carpeta raiz de nuestro proyecto, para guardar las plantillas que se utilizarán en la aplicación. (views)
- Necesitamos indicarle a express que _views_ será nuestro directorio de plantillas. Y también indicar cuál será el motor de plantillas que se usará.

```javascript
app.set("views", "./views");

app.set("view engine", "pug");
```

- La función _"render"_ del objeto res(response) recibe dos parámetros: el primero es el **nombre** de la plantilla a mostrar y el segundo un objeto con los valores a reemplazar.

```javascript
res.render(view: string, options?: Object)
```

#### USANDO PUG JS EN EXPRESS

```javascript
app.get("/hello", (req, res) => {
  res.render("hello.pug", { mensaje: "Usando Pug JS en Express" });
});
```

### Instalar EJS

```
$ npm i ejs
```

## Configuración

- Configuramos EJS como el motor de visualización de nuestra aplicación Express usando...

```javascript
app.set("view engine", "ejs");
```

- Creamos una carpeta de vistas; **views**
- EJS enviará una vista al usuario usando _res.render()_. Es importante tener en cuenta que res.render() buscará la vista en una carpeta **views**
- Por ejemplo, si definimos _pages/index_ dentro de views, **_res.render('pages/index')_** buscará en views/pages/index.

## Sintaxis básica (etiquetas)

- `<%= Incrusta en la plantilla el valor tal cual está `
- `<%- Incrusta en la plantilla el valor renderizado como HTML `
- `<% 'Scriptlet': Admite instrucciones en JS para declaración de variables y control de flujo `

#### Ejemplo

```html
<% const estilo = "color:crimson"; %> <% if (message) { %>
<h2 style="<%" ="estilo%">><%= message.name %></h2>
<% } %>
```

## Creando plantillas PARCIALES

- Al igual que muchas aplicaciones que creamos, hay mucho **código que se reutiliza.** En EJS llamamos a estos códigos **parciales**.
- En el ejemplo que mostramos a continuación, los definimos dentro de la **carpeta 'partials'**

### Añadiendo los partials de EJS a Views

Ahora que tenemos nuestros parciales deifinidos, lo que debemos hacer es **incluirlos en nuestras vistas.**

- Utilizamos `<%- include('RELATIVE/PATH/TO/FILE') %>` para integrar un parcial de EJS en otro archivo
- El guión `<%-` en lugar de solo `<%` es para indicar a EJS que **renderice HTML sin formato.**
- La ruta al parcial es **relativa** al archivo actual.

## Pasando datos a VIEWS

```javascript
app.get("/", (req, res) => {
  let mascots = [
    { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
  ];

  let tagline =
    "No programming concept is complete without a cute animal mascot.";

  res.render("pages/index", {
    mascots: mascots,
    tagline: tagline,
  });
});
```

### Renderizar una variable única en EJS

+ Para utilizar una de las variables pasada, usamos directamente el nombre de la misma. En este caso: <%= tagline %>

```html
<h2>Variable</h2>
<p><%= tagline %></p>
```
### Iterar sobre datos contenidos en una variable

+ Aquí utilizamos código JS. Por ejemplo, podemos usar *.forEach():*

```html
<ul>
<% mascots.forEach(mascot=>{)%>
<li>
  <strong><%= mascot.name %></strong>
  representing <%= mascot.organization %>, born <%= mascot.birth_year %>
</li>
<% }) %>
</ul>
```
### Pasando datos a un parcial en EJS

Si deseamos referenciar una variable en un parcial que puede no definirse siempre, y darle un valor predeterminado, podemos hacerlo de esta forma:

```html
<em>Variant: <%= typeof variant != 'undefined' ? variant : 'default' %></em>
```
*El código EJS renderizará el valor de **variant** si está definido y de **default** si no lo está*



***¿Cuál es el mejor y más cómodo de usar?***

#### EJS, HBS o PUG

Cada *motor de plantilla* tiene sus *ventajas y desventajas*. **PUG** posee una sintaxis única y sencilla pero se pierde demasiado tiempo con la indentación, **EJS** es simplemente espectacular al contar con una síntaxis similar al html con agregados que permite iterar objetos o poner condicionales. **HBS** también es simple pero al no ser una librería propia de express, debe contar con una configuración extra que puede resultar tediosa para quienes recién se inician con los motores de plantillas.
Es por eso que prefiero usar **EJS**, al ser sencillo de manejar y contar con herramientas que pueden facilitar el *armado de plantillas*, además que cuenta con extensiones como ejs Snippets que *mejora la visual*al momento de escribir códigos en este motor.

# EJS