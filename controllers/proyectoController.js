const Proyecto = require('../models/Proyecto');

exports.crearProyecto = async (req, res) => {

    try {
        //Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //Guardar el creador via jwt
        proyecto.creador = req.usuario.id;

        //Guardamos el proyemos
        proyecto.save();
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    };
};