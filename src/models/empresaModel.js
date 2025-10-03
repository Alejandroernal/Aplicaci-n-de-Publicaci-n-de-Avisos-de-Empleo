// Modelo para las empresas (funciones para interactuar con la base de datos)
// src/models/empresaModel.js
import { supabase } from '../config/database.js';

export async function getEmpresas(filters = {}) {
  let query = supabase.from('empresa').select('*');
  
  // Soporte básico para filtros (opcional, ej. por nombre o email)
  if (filters.nombre) query = query.ilike('nombre', `%${filters.nombre}%`);  // Búsqueda parcial insensible a mayúsculas
  if (filters.email) query = query.eq('email', filters.email);
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getEmpresaById(id) {
  const { data, error } = await supabase.from('empresa').select('*').eq('empresa_id', id).single();
  if (error) throw error;
  return data;
}

export async function addEmpresa(empresa) {
  const { data, error } = await supabase.from('empresa').insert([empresa]).select();
  if (error) throw error;
  return data[0];
}

export async function updateEmpresa(id, empresa) {
  const { data, error } = await supabase.from('empresa').update(empresa).eq('empresa_id', id).select();
  if (error) throw error;
  return data[0];
}

export async function deleteEmpresa(id) {
  const { error } = await supabase.from('empresa').delete().eq('empresa_id', id);
  if (error) throw error;
  return true;  // Retorna true para indicar éxito (opcional)
}
