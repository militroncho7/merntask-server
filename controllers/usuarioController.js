const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

exports.crearUsuario = async (req, res) => {

    //Extraer email y password
    const { email, password } = req.body;
    
    try{
        //revisar que el usuario registrado sea único
        let usuario = await Usuario.findOne({ email });

        if(usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe'} );
        }

        //Crea nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //Guarda usuario
        await usuario.save();

        //Mensaje de confirmación
        res.json({ msg: 'Usuario creado correctamente'} );

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};