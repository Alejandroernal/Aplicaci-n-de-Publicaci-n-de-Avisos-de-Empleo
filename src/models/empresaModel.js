// Modelo para las empresas (Funciones para interactuar con la base de datos)

import { supabase } from './config/database.js'

export async function getEmpresas() {
  const { data, error } = await supabase.from('empresa').select('*')
  if (error) throw error
  return data
}

export async function addEmpresa(empresa) {
  const { data, error } = await supabase.from('empresa').insert([empresa]).select()
  if (error) throw error
  return data[0]
}

export async function deleteEmpresa(empresa_id) {
  const { error } = await supabase.from('empresa').delete().eq('empresa_id', empresa_id)
  if (error) throw error
}