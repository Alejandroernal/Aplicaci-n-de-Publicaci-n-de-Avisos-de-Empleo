import * as empresaModel from '../models/empresaModel.js';

export const empresaController = {
  async getAll(req, res, next) {
    try {
      const { nombre, email } = req.query;  // Filtros opcionales de query params
      const filters = {};

      if (nombre) filters.nombre = nombre;
      if (email) filters.email = email;

      const empresas = await empresaModel.getEmpresas(filters);  //  Pasa filters si se proporcionan
      res.json(empresas);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const empresa = await empresaModel.getEmpresaById(id);

      if (!empresa) {
        return res.status(404).json({
          error: 'Empresa no encontrada'
        });
      }

      res.json(empresa);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const nuevaEmpresa = await empresaModel.addEmpresa(req.body);
      const empresaCompleta = await empresaModel.getEmpresaById(nuevaEmpresa.empresa_id);  // Usa empresa_id (ajusta si es 'id')

      res.status(201).json(empresaCompleta);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;

      const empresaActualizada = await empresaModel.updateEmpresa(id, req.body);

      if (!empresaActualizada) {
        return res.status(404).json({
          error: 'Empresa no encontrada'
        });
      }

      const empresaCompleta = await empresaModel.getEmpresaById(empresaActualizada.empresa_id);  //  Usa empresa_id
      res.json(empresaCompleta);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const success = await empresaModel.deleteEmpresa(id);  // Renombré para claridad

      if (!success) {
        return res.status(404).json({
          error: 'Empresa no encontrada'
        });
      }

      res.json({
        message: 'Empresa eliminada exitosamente'
        // No incluyas 'empresa: success' ya que es true, no el objeto
      });
    } catch (error) {
      next(error);
    }
  }
};
