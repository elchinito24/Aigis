const { Sensor } = require('../models/model.js')

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
const postSensor = async (req, res) => {
    try {

        const params = req.body

        if (!params.tipo || !params.precio) {
            return res.status(400).json({
                status: "error",
                message: "Faltan datos por enviar"
            });
        }

        let sensor = new Sensor(params);

        const sensores = await Sensor.find({
            tipo: sensor.tipo,
        });

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
    deleteSensor
}