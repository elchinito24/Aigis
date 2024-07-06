const path = require('path')
const { Sensor } = require('../models/model.js')
const fs = require('fs')

const getSensor = async (req, res) => {
    try {
        const sensores = await Sensor.find()
        return res.status(200).json({
            status: "success",
            sensores
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al obtener los sensores",
            error: error.message
        })
    }
}
// Controlador para agregar un nuevo sensor
const postSensor = async (req, res) => {
    try {
      const { tipo, precio, descripcion, estado } = req.body;
      let imagen = null;
  
      if (!tipo || !precio || !descripcion) {
        return res.status(400).json({
          status: "error",
          message: "Faltan datos por enviar"
        });
      }
  
      if (req.file) {
        imagen = `${req.file.filename}`;
      }
  
      let sensor = new Sensor({
        tipo,
        precio,
        descripcion,
        imagen,
        estado: estado || 'inactivo'
      });
  
      const sensores = await Sensor.find({ tipo: sensor.tipo });
  
      if (sensores.length >= 1) {
        return res.status(500).json({
          status: "success",
          message: "El Sensor ya existe"
        });
      }
  
      const sensorSaved = await sensor.save();
  
      return res.status(200).json({
        status: "success",
        message: 'Se registró el sensor',
        sensor: sensorSaved
      });
  
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al registrar sensor",
        error: error.message
      });
    }
  };

const mostrarImagen = (req, res )=> {
  let fichero = req.params.fichero
  let ruta_fisica = './assets/img/' + fichero
  fs.stat(ruta_fisica, (error,existe) => {
    if(existe){
      return res.sendFile(path.resolve(ruta_fisica))
    }else(
      console.log('error en mostrar imagen')
    )
  })
  return
}
const updateSensor = async (req, res) => {
    try {
        const sensorId = req.params.id
        const updateData = req.body

        const sensorUpdated = await Sensor.findByIdAndUpdate(sensorId, updateData, {new: true})

        if(!sensorUpdated){
            return res.status(404).json({
                status: "error",
                message: "Sensor no encontrado"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Sensor actualizado correctamente",
            sensor: sensorUpdated
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al actualizar el sensor",
            error: error.message
        })
    }


}
const deleteSensor = async (req, res) => {
    try {
        const sensorId = req.params.id

        const sensorDeleted = await Sensor.findByIdAndDelete(sensorId)

        if(!sensorDeleted) {
            return res.status(404).json({
                status: "error",
                message: "Sensor no encontrado"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Sensor eliminado correctamente",
            sensor: sensorDeleted
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al eliminar sensor",
            error: error.message
        })
    }

}

module.exports = {
    getSensor,
    postSensor,
    updateSensor,
    deleteSensor,
    mostrarImagen
}