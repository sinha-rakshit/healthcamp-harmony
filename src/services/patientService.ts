
import { supabase } from "@/integrations/supabase/client";

export type Patient = {
  id?: string;
  patient_id: string;
  name: string;
  gender: string;
  age: number;
  phone?: string;
  address?: string;
  medical_history?: string[];
  has_alert?: boolean;
  registration_date?: string;
  blood_pressure?: string;
  diabetes?: string;
  spO2?: string;
  remarks?: string;
};

export const getPatients = async (): Promise<Patient[]> => {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("registration_date", { ascending: false });

  if (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }

  return data || [];
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching patient with id ${id}:`, error);
    return null;
  }

  return data;
};

export const createPatient = async (patient: Patient): Promise<Patient> => {
  // Generate a patient ID if not provided
  if (!patient.patient_id) {
    patient.patient_id = `P${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  }

  const { data, error } = await supabase
    .from("patients")
    .insert(patient)
    .select()
    .single();

  if (error) {
    console.error("Error creating patient:", error);
    throw error;
  }

  return data;
};

export const updatePatient = async (id: string, patient: Partial<Patient>): Promise<Patient> => {
  const { data, error } = await supabase
    .from("patients")
    .update(patient)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating patient with id ${id}:`, error);
    throw error;
  }

  return data;
};

export const deletePatient = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("patient_id", id);

  if (error) {
    console.error(`Error deleting patient with id ${id}:`, error);
    throw error;
  }
};
