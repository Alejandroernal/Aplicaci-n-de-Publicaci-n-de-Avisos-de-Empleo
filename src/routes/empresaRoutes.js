// Rutas para gestionar empresas (Conecta con los controllers)

// routes/empresas.js
import express from 'express';
const router = express.Router();

// GET /api/empresas - Listado de empresas
const listarEmpresas = (supabase) => async (req, res) => {
  try {
    const { data: empresas, error } = await supabase
      .from('empresa')
      .select('empresa_id, nombre, descripcion')
      .order('nombre');
    
    if (error) throw error;
    
    res.json(empresas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
  // Asigna la ruta: pasa la función directamente (sin ejecutar listarEmpresas aquí)
  router.get('/', listarEmpresas);

  // Aquí puedes agregar más rutas fácilmente, ej:
  // router.post('/', async (req, res) => { /* lógica para crear empresa */ });

  // Retorna el router (¡ahora sí es legal, porque está dentro de la función!)


  
export default router;
