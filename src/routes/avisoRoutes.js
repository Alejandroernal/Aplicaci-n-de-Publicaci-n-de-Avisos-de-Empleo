// Rutas para gestionar avisos de empleo (Conecta con los controllers)

// src/routes/avisoRoutes.js
import express from 'express';

// Función principal que recibe supabase y retorna el router configurado
const crearRouter = (supabase) => {
  const router = express.Router();

  // POST /api/avisos - Creación con manejo de empresa
  // (Usa closure: accede a 'supabase' del scope exterior)
  const crearAviso = async (req, res) => {
    try {
      const { titulo, descripcion, ubicacion, tipodecontrato, empresaNombre, empresaDescripcion } = req.body;
      
      if (!titulo || !descripcion || !ubicacion || !tipodecontrato || !empresaNombre) {
        return res.status(400).json({ error: 'Campos obligatorios faltantes' });
      }
      
      // Buscar empresa existente por nombre
      let { data: empresa, error: errorBuscar } = await supabase
        .from('empresa')
        .select('empresa_id, nombre, descripcion')
        .eq('nombre', empresaNombre)
        .single();
      
      if (errorBuscar && errorBuscar.code !== 'PGRST116') { // No rows found
        throw errorBuscar;
      }
      
      let empresaId;
      if (!empresa) {
        // Crear nueva empresa 
        const { data: nuevaEmpresa, error: errorCrear } = await supabase
          .from('empresa')
          .insert([
            {
              nombre: empresaNombre,
              descripcion: empresaDescripcion || null
            }
          ])
          .select('empresa_id')
          .single();
        
        if (errorCrear) throw errorCrear;
        empresaId = nuevaEmpresa.empresa_id;
      } else {
        empresaId = empresa.empresa_id;
      }
      
      // Crear aviso (fecha auto-generada en DB)
      const { data: aviso, error: errorAviso } = await supabase
        .from('aviso')
        .insert([
          {
            titulo,
            descripcion,
            ubicacion,
            tipodecontrato,
            empresa_id: empresaId
            // No incluir 'fecha' - se genera automáticamente
          }
        ])
        .select(`
          *,
          empresa:empresa (
            empresa_id,
            nombre,
            descripcion
          )
        `)
        .single();
      
      if (errorAviso) throw errorAviso;
      
      res.status(201).json(aviso);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  // GET /api/avisos - Listado con filtros y paginación
  // (Usa closure para supabase)
  const listarAvisos = async (req, res) => {
    try {
      const { ubicacion, tipodecontrato, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * parseInt(limit);
      
      let query = supabase
        .from('aviso')
        .select(`
          *,
          empresa:empresa (
            empresa_id,
            nombre,
            descripcion
          )
        `, { count: 'exact', head: false })
        .order('fecha', { ascending: false })
        .range(offset, offset + parseInt(limit) - 1);
      
      // Filtros (ajustados a nombres de campos)
      if (ubicacion) {
        query = query.eq('ubicacion', ubicacion);
      }
      if (tipodecontrato) {
        query = query.eq('tipodecontrato', tipodecontrato);
      }
      
      const { data: avisos, error, count } = await query;
      
      if (error) throw error;
      
      res.json({
        avisos,
        totalPages: Math.ceil((count || 0) / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  // GET /api/avisos/:id - Detalle con empresa
  // (Usa closure para supabase)
  const detalleAviso = async (req, res) => {
    try {
      const { id } = req.params;
      
      const { data: aviso, error } = await supabase
        .from('aviso')
        .select(`
          *,
          empresa:empresa (
            empresa_id,
            nombre,
            descripcion
          )
        `)
        .eq('id', id)  // Nota: Si el campo es 'aviso_id', cambia a .eq('aviso_id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      if (!aviso) return res.status(404).json({ error: 'Aviso no encontrado' });
      
      res.json(aviso);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  // Asigna las rutas: pasa las funciones directamente (sin ejecutar aquí)
  // supabase está disponible por closure en todos los handlers
  router.post('/', crearAviso);
  router.get('/', listarAvisos);
  router.get('/:id', detalleAviso);

  // Retorna el router configurado
  return router;
};

// Exporta la función principal (usa ES Modules, no module.exports)
export default crearRouter;
