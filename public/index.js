const template = Handlebars.compile(`
<ul>
    <li>{{nombre}}</li>
    <li>{{apellido}}</li>
    <li>{{edad}}</li>
    <li>{{email}}</li>
    <li>{{telefono}}</li>


</ul>
`)

const html = template ({
    nombre: 'susana',
    apellido: 'oria',
    edad: '25',
    email: 'susana@coderhouse.com',
    telefono: '123465'
})

document.getElementById('data').innerHTML = html