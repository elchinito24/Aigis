const login = async (req, res) => {
    try {
        let params = req.body;

        // Verificar que se enviaron los datos requeridos
        if (!params.correo || !params.contrasena) {
            return res.status(400).json({ status: "error", message: "Faltan datos por enviar" });
        }

        // Buscar al usuario por correo
        const foundUser = await Usuario.find({ correo: params.correo });

        // Verificar si el usuario existe
        if (foundUser.length === 0) {
            return res.status(404).json({ status: "error", message: "El usuario no existe" });
        }

        // Verificar la contraseña (deberías hashear y comparar en producción)
        const user = foundUser[0];
        if (params.contrasena !== user.contrasena) {
            return res.status(401).json({ status: "error", message: "Contraseña incorrecta" });
        }

        const { _id } = user;

        // Convertir el ObjectId a una cadena, si es necesario
        const userIdString = _id.toString();
        
        console.log(userIdString);
        
        req.userId = userIdString;
        // Devolver respuesta exitosa
        return res.status(200).json({ status: "success", message: "Acción de login", user, _id});

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error en el proceso de login",
            error: error.message
        });
    }
};