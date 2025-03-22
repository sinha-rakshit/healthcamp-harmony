
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createPatient, Patient } from "@/services/patientService";

const patientFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select a gender.",
  }),
  age: z.coerce.number().min(0, {
    message: "Age must be a positive number.",
  }),
  phone: z.string().optional(),
  address: z.string().optional(),
  medical_history: z.array(z.string()).optional(),
  has_alert: z.boolean().default(false),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

export function PatientRegistrationForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newCondition, setNewCondition] = useState("");

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      age: 0,
      phone: "",
      address: "",
      medical_history: [],
      has_alert: false,
    },
  });

  const addCondition = () => {
    if (newCondition.trim() === "") return;
    
    const currentConditions = form.getValues("medical_history") || [];
    form.setValue("medical_history", [...currentConditions, newCondition.trim()]);
    setNewCondition("");
  };

  const removeCondition = (index: number) => {
    const currentConditions = form.getValues("medical_history") || [];
    const updatedConditions = [...currentConditions];
    updatedConditions.splice(index, 1);
    form.setValue("medical_history", updatedConditions);
  };

  async function onSubmit(data: PatientFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      const patientData: Patient = {
        patient_id: `P${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        name: data.name,
        gender: data.gender,
        age: data.age,
        phone: data.phone,
        address: data.address,
        medical_history: data.medical_history,
        has_alert: data.has_alert,
      };

      await createPatient(patientData);

      toast({
        title: "Patient registered successfully",
        description: `${data.name} has been registered in the system.`,
      });

      form.reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error registering patient:", err);
      setError("Failed to register patient. Please try again.");
      
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "There was an error registering the patient.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="123 Main St, City, Country" 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="medical_history"
            render={() => (
              <FormItem>
                <FormLabel>Medical History</FormLabel>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add medical condition"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCondition();
                        }
                      }}
                    />
                    <Button type="button" onClick={addCondition} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {form.watch("medical_history")?.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1.5">
                        {condition}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-4 w-4 p-0"
                          onClick={() => removeCondition(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {form.watch("medical_history")?.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No medical conditions added
                      </p>
                    )}
                  </div>
                </div>
                <FormDescription>
                  Add any pre-existing medical conditions or health issues.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="has_alert"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    className="h-4 w-4 mt-1"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Mark as urgent case</FormLabel>
                  <FormDescription>
                    This patient will be flagged for immediate attention.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register Patient"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
