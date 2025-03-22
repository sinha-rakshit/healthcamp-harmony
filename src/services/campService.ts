
import { supabase } from "@/integrations/supabase/client";

export type Camp = {
  id?: string;
  name: string;
  location: string;
  description?: string;
  organizer?: string;
  contact?: string;
  start_date: string;
  end_date: string;
  capacity: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
};

export const getCamps = async (): Promise<Camp[]> => {
  const { data, error } = await supabase
    .from("camps")
    .select("*")
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Error fetching camps:", error);
    throw error;
  }

  // Ensure the status is one of the expected values
  return (data || []).map(camp => ({
    ...camp,
    status: camp.status as Camp['status'] // Cast to our specific enum type
  }));
};

export const getCampById = async (id: string): Promise<Camp | null> => {
  const { data, error } = await supabase
    .from("camps")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching camp with id ${id}:`, error);
    return null;
  }

  if (!data) return null;
  
  // Ensure the status is one of the expected values
  return {
    ...data,
    status: data.status as Camp['status'] // Cast to our specific enum type
  };
};

export const createCamp = async (camp: Camp): Promise<Camp> => {
  const { data, error } = await supabase
    .from("camps")
    .insert(camp)
    .select()
    .single();

  if (error) {
    console.error("Error creating camp:", error);
    throw error;
  }

  // Ensure the status is one of the expected values
  return {
    ...data,
    status: data.status as Camp['status'] // Cast to our specific enum type
  };
};

export const updateCamp = async (id: string, camp: Partial<Camp>): Promise<Camp> => {
  const { data, error } = await supabase
    .from("camps")
    .update(camp)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating camp with id ${id}:`, error);
    throw error;
  }

  // Ensure the status is one of the expected values
  return {
    ...data,
    status: data.status as Camp['status'] // Cast to our specific enum type
  };
};

export const deleteCamp = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("camps")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting camp with id ${id}:`, error);
    throw error;
  }
};
