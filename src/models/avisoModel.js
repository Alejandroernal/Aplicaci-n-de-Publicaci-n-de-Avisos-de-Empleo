// Modelo para los avisos de empleo (funciones para interactuar con la base de datos)

import { supabase } from './config/database.js'

export async function getAvisos() {
  // Incluye el nombre de la empresa asociada usando empresa_id
  const { data, error } = await supabase
    .from('aviso')
    .select('*, empresa(nombre)')
  if (error) throw error
  return data
}

export async function getAvisoById(id) {
  const { data, error } = await supabase
    .from('aviso')
    .select('*, empresa(nombre)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function addAviso(aviso) {
  const { data, error } = await supabase.from('aviso').insert([aviso]).select()
  if (error) throw error
  return data[0]
}

export async function deleteAviso(id) {
  const { error } = await supabase.from('aviso').delete().eq('id', id)
  if (error) throw error
}