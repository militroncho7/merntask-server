const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() })
    };

    //Extraer email y password del request
    const { email, password } = req.body;

    try {
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });

        if(!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe '});
        }

        //revisar password
        const passCorrecto = await bcryptjs.compare(password, usuario.password); //compara password
        if(!passCorrecto) {
            return res.status(400).json({ msg: 'Password Incorrecto' });
        }

        //Si todo es correcto: Crear y firmar el jwt (token)
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //Firmar token
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //1hora de caducidad del token
        }, (error, token) => {
            if(error) throw error;

            //Mensaje de confirmación
            res.json({ token } );
        });

    } catch (error) {
        console.log(error);        
    }

};