const fs = require('fs');

let listadoPorHacer = [];

const guardaDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('no se pudo grabar ', err);
    });
}

const crear = (descripcion) => {
    cargarBd();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardaDB();
    return porHacer;
}

const cargarBd = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getlistado = () => {
    cargarBd();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarBd();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardaDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarBd();

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardaDB();
        return true;
    }
}

module.exports = {
    crear,
    getlistado,
    actualizar,
    borrar
}