// Modelo para los avisos de empleo (funciones para interactuar con la base de datos)
// src/models/avisoModel.js
import { supabase } from '../config/database.js';

export async function getAvisos(filters = {}) {
  let query = supabase.from('aviso').select('*');
  
  // Soporte básico para filtros (opcional)
  if (filters.ubicacion) query = query.eq('ubicacion', filters.ubicacion);
  if (filters.tipo_contrato) query = query.eq('tipo_contrato', filters.tipo_contrato);
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getAvisoById(id) {
  const { data, error } = await supabase.from('aviso').select('*').eq('aviso_id', id).single();
  if (error) throw error;
  return data;
}

export async function addAviso(aviso) {
  const { data, error } = await supabase.from('aviso').insert([aviso]).select();
  if (error) throw error;
  return data[0];
}

export async function updateAviso(id, aviso) {
  const { data, error } = await supabase.from('aviso').update(aviso).eq('aviso_id', id).select();
  if (error) throw error;
  return data[0];
}

export async function deleteAviso(id) {
  const { error } = await supabase.from('aviso').delete().eq('aviso_id', id);
  if (error) throw error;
  return true;  // Retorna true para indicar éxito (opcional)
}
