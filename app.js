const argv = require('./config/yargs').argv;
const porHacer = require('./core-to-do/to-do');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea)
        break;
    case 'listar':
        let listado = porHacer.getlistado();
        for (let tarea of listado) {
            console.log('========== Por hacer =========='.green);
            console.log(tarea.descripcion);
            console.log('Estado', tarea.completado)
            console.log('==============================='.green);
        }
        break;
    case 'actualizar':
        let actulizado = porHacer.actualizar(argv.descripcion, argv.c);
        console.log(actulizado);
        break;
    case 'borrar':
        let borrar = porHacer.borrar(argv.descripcion);
        console.log(borrar);
        break;
    default:
        console.log('Comando no reconocido')
        break;
}