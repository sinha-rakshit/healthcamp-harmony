
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
  blood_pressure: z
  .string()
  .regex(/^\d{2,3}\/\d{2,3}$/, {
    message: "Blood Pressure must be in the format systolic/diastolic (e.g., 120/80)",
  })
  .optional(),

diabetes: z
  .string()
  .min(2, {
    message: "Diabetes info must be at least 2 characters.",
  })
  .optional(),

spO2: z
  .string()
  .refine(
    (val) => {
      const num = parseInt(val.replace("%", ""), 10);
      return num >= 50 && num <= 100;
    },
    {
      message: "SpO₂ must be a number between 50 and 100",
    }
  )
  .optional(),
  medical_history: z.array(z.string()).optional(),
  has_alert: z.boolean().default(false),
  remarks: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

export function PatientRegistrationForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newCondition, setNewCondition] = useState("");
  const commonConditions = [
    "Asthma",
    "Diabetes",
    "Hypertension",
    "Arthritis",
    "Heart Disease",
    "Epilepsy",
    "Anemia",
    "Depression",
    "Anxiety",
    "Obesity",
    "Chronic Kidney Disease",
    "HIV/AIDS",
    "Migraine",
    "Psoriasis",
    "Stroke",
    "Tuberculosis",
    "COPD",
    "Celiac Disease",
    "Hypothyroidism",
    "Hyperthyroidism",
    "Osteoporosis",
    "Alzheimer's Disease",
    "Multiple Sclerosis",
    "Parkinson's Disease",
    "Eczema",
    "Gout",
    "Ulcerative Colitis",
    "Crohn's Disease",
    "Lupus",
    "Hepatitis B",
    "Hepatitis C",
    "Pneumonia",
    "Bronchitis",
    "Glaucoma",
    "Cataracts",
    "Herniated Disc",
    "Chronic Fatigue Syndrome",
    "Fibromyalgia",
    "Endometriosis",
    "Polycystic Ovarian Syndrome (PCOS)",
    "Autism Spectrum Disorder",
    "Attention Deficit Hyperactivity Disorder (ADHD)",
    "Schizophrenia",
    "Bipolar Disorder",
    "Panic Disorder",
    "Gastroesophageal Reflux Disease (GERD)",
    "Peptic Ulcer",
    "Diverticulitis",
    "Hemophilia",
    "Sickle Cell Disease",
    "Leukemia",
    "Lymphoma",
    "Melanoma",
    "Prostate Cancer",
    "Breast Cancer",
    "Colon Cancer",
    "Liver Disease",
    "Pancreatitis",
    "Dementia",
    "Astigmatism",
    "Amblyopia",
    "Tonsillitis",
    "Appendicitis",
    "Gallstones",
    "Kidney Stones",
    "Epiglottitis",
    "Meningitis",
    "Preeclampsia",
    "Eclampsia",
    "Psoriatic Arthritis",
    "Rheumatoid Arthritis",
    "Interstitial Cystitis",
    "Pelvic Inflammatory Disease",
    "Varicose Veins",
    "Deep Vein Thrombosis (DVT)",
    "Aneurysm",
    "Arrhythmia",
    "Coronary Artery Disease",
    "Congestive Heart Failure",
    "Hemorrhoids",
    "Lyme Disease",
    "Chronic Sinusitis",
    "Huntington's Disease",
    "Amyotrophic Lateral Sclerosis (ALS)",
    "Tinnitus",
    "Vertigo",
    "Sleep Apnea",
    "Restless Leg Syndrome",
    "Narcolepsy",
    "Chronic Pain Syndrome",
    "Bursitis",
    "Tendonitis",
    "Sciatica",
    "Plantar Fasciitis",
    "Frozen Shoulder",
    "Rotator Cuff Tear",
    "Spinal Stenosis",
    "Scoliosis",
    "Kyphosis",
    "Ankylosing Spondylitis",
    "Sepsis",
    "Cellulitis",
    "Erythema Nodosum",
    "Necrotizing Fasciitis",
    "Measles",
    "Mumps",
    "Rubella",
    "Chickenpox",
    "Shingles",
    "Influenza",
    "COVID-19",
    "SARS",
    "MERS",
    "Hantavirus",
    "Plague",
    "Zika Virus",
    "Dengue Fever",
    "Yellow Fever",
    "Chikungunya",
    "Malaria",
    "Leptospirosis",
    "Typhoid Fever",
    "Cholera",
    "Giardiasis",
    "Amebiasis",
    "Hookworm Infection",
    "Tapeworm Infection",
    "Trichinosis",
    "Toxoplasmosis",
    "Histoplasmosis",
    "Candidiasis",
    "Cryptococcosis",
    "Blastomycosis",
    "Pneumocystis Pneumonia",
    "Leukoplakia",
    "Kaposi's Sarcoma",
    "Myasthenia Gravis",
    "Graves' Disease",
    "Addison's Disease",
    "Cushing's Syndrome",
    "Wilson's Disease",
    "Hemochromatosis",
    "Porphyria",
    "Sjögren's Syndrome",
    "Raynaud's Disease",
    "Bechet's Disease",
    "Kawasaki Disease",
    "Takayasu Arteritis",
    "Polymyalgia Rheumatica",
    "Giant Cell Arteritis",
    "Sarcoidosis",
    "Granulomatosis with Polyangiitis (GPA)",
    "Eosinophilic Granulomatosis with Polyangiitis (EGPA)",
    "Polyarteritis Nodosa",
    "Systemic Sclerosis",
    "Dermatomyositis",
    "Polymyositis",
    "Pemphigus",
    "Pemphigoid",
    "Vitiligo",
    "Alopecia Areata",
    "Seborrheic Dermatitis",
    "Rosacea",
    "Acne Vulgaris",
    "Hidradenitis Suppurativa",
    "Cellulitis",
    "Impetigo",
    "Scabies",
    "Lice Infestation",
    "Molluscum Contagiosum",
    "Tinea Capitis",
    "Tinea Corporis",
    "Tinea Cruris",
    "Tinea Pedis",
    "Tinea Unguium",
    "Onychomycosis",
    "Paronychia",
    "Herpes Simplex",
    "Genital Herpes",
    "Human Papillomavirus (HPV)",
    "Syphilis",
    "Gonorrhea",
    "Chlamydia",
    "Trichomoniasis",
    "Pelvic Inflammatory Disease",
    "Cervical Dysplasia",
    "Endometrial Hyperplasia",
    "Ovarian Cysts",
    "Uterine Fibroids",
    "Polycystic Ovarian Syndrome (PCOS)",
    "Premenstrual Dysphoric Disorder (PMDD)",
    "Menorrhagia",
    "Amenorrhea",
    "Dysmenorrhea",
    "Ovarian Cancer",
    "Uterine Cancer",
    "Cervical Cancer",
    "Vulvar Cancer",
    "Testicular Cancer",
    "Bladder Cancer",
    "Esophageal Cancer",
    "Stomach Cancer",
    "Pancreatic Cancer",
    "Lung Cancer",
    "Thyroid Cancer",
    "Bone Cancer",
    "Sarcoma",
    "Soft Tissue Sarcoma",
    "Brain Tumor",
    "Pituitary Tumor",
    "Neuroblastoma",
    "Wilms Tumor",
    "Retinoblastoma",
    "Multiple Myeloma",
    "Myelodysplastic Syndromes",
    "Polycythemia Vera",
    "Essential Thrombocythemia",
    "Hemochromatosis",
    "Hemophilia",
    "Thalassemia",
    "Von Willebrand Disease",
    "Sickle Cell Anemia",
    "Aplastic Anemia",
    "Iron Deficiency Anemia",
    "Megaloblastic Anemia",
    "Pernicious Anemia",
    "Chronic Lymphocytic Leukemia",
    "Acute Lymphoblastic Leukemia",
    "Chronic Myeloid Leukemia",
    "Acute Myeloid Leukemia",
    "Hodgkin's Lymphoma",
    "Non-Hodgkin's Lymphoma",
    "Mastocytosis",
    "Eosinophilia",
    "Neutropenia",
    "Thrombocytopenia",
    "Idiopathic Thrombocytopenic Purpura (ITP)",
    "Thrombotic Thrombocytopenic Purpura (TTP)",
    "Hemolytic Uremic Syndrome (HUS)",
    "Antiphospholipid Syndrome",
    "Factor V Leiden",
    "Protein C Deficiency",
    "Protein S Deficiency",
    "Prothrombin Gene Mutation",
    "Hyperhomocysteinemia",
    "Cystic Fibrosis",
    "Primary Ciliary Dyskinesia",
    "Bronchiectasis",
    "Pulmonary Fibrosis",
    "Idiopathic Pulmonary Fibrosis",
    "Pulmonary Hypertension",
    "Pulmonary Embolism",
    "Pneumothorax",
    "Pleural Effusion",
    "Empyema",
    "Lung Abscess",
    "Bronchiolitis Obliterans",
    "Respiratory Distress Syndrome",
    "Hypersensitivity Pneumonitis",
    "Asbestosis",
    "Silicosis",
    "Coal Workers' Pneumoconiosis",
    "Byssinosis",
    "Hypoxia",
    "Hypercapnia",
    "Hypoventilation Syndrome",
    "Obstructive Sleep Apnea",
    "Central Sleep Apnea",
    "Pulmonary Edema",
    "ARDS (Acute Respiratory Distress Syndrome)",
    "Croup",
    "Epiglottitis",
    "Bronchiolitis",
    "Aspiration Pneumonitis",
    "Chemical Pneumonitis",
    "Lipoid Pneumonia",
    "Bacterial Pneumonia",
    "Viral Pneumonia",
    "Fungal Pneumonia",
    "Parasitic Pneumonia",
    "Tuberculosis",
    "Atypical Pneumonia",
    "Legionnaires' Disease",
    "Mycoplasma Pneumonia",
    "Chlamydophila Pneumonia",
    "Klebsiella Pneumonia",
    "Pseudomonas Pneumonia",
    "Aspiration Pneumonia",
    "Idiopathic Interstitial Pneumonias",
    "Cryptogenic Organizing Pneumonia",
    "Nonspecific Interstitial Pneumonia",
    "Lymphocytic Interstitial Pneumonia",
    "Desquamative Interstitial Pneumonia",
    "Acute Interstitial Pneumonia",
    "Respiratory Syncytial Virus (RSV)",
    "Hantavirus Pulmonary Syndrome",
    "SARS-CoV-2",
    "MERS-CoV",
    "Avian Influenza",
    "Swine Flu",
    "H1N1 Influenza",
    "Zoonotic Diseases",
    "Brucellosis",
    "Leptospirosis",
    "Q Fever",
    "Tularemia",
    "Anthrax",
    "Botulism",
    "Smallpox",
    "Monkeypox",
    "Ebola Virus Disease",
    "Marburg Virus Disease",
    "Crimean-Congo Hemorrhagic Fever",
    "Lassa Fever",
    "Rift Valley Fever",
    "Hantavirus Cardiopulmonary Syndrome",
    "Severe Fever with Thrombocytopenia Syndrome",
    "Diphtheria",
    "Pertussis",
    "Tetanus",
    "Botulism",
    "Scarlet Fever",
    "Rheumatic Fever",
    "Kawasaki Disease",
    "Rocky Mountain Spotted Fever",
    "Typhus",
    "Relapsing Fever",
    "Leprosy",
    "Yaws",
    "Pinta",
    "Bejel",
  ]; 
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      age: 0,
      phone: "",
      address: "",
      blood_pressure: "",
      diabetes: "",
      spO2: "",
      medical_history: [],
      has_alert: false,
      remarks: "",
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
        blood_pressure: data.blood_pressure,
        diabetes: data.diabetes,
        spO2: data.spO2,
        remarks: data.remarks,
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
                    <Input placeholder="Full Name" {...field} />
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
                    placeholder="Gandhi Maidan, Patna, Bihar" 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<div className="flex flex-col md:flex-row gap-6">
            {/* Blood Pressure */}
            <FormField
              control={form.control}
              name="blood_pressure"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col items-center text-center">
                  <FormLabel className="mb-2 flex flex-col items-center">
                    <img src="/icons/bp.png" alt="Blood Pressure" className="h-10 w-10" />
                    <span className="text-sm mt-1 text-muted-foreground">Blood Pressure</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 120/80" {...field} className="text-center" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Diabetes */}
            <FormField
              control={form.control}
              name="diabetes"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col items-center text-center">
                  <FormLabel className="mb-2 flex flex-col items-center">
                    <img src="/icons/diabetes.png" alt="Diabetes" className="h-10 w-10" />
                    <span className="text-sm mt-1 text-muted-foreground">Diabetes</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Type 2, Controlled" {...field} className="text-center" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SpO₂ */}
            <FormField
              control={form.control}
              name="spO2"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col items-center text-center">
                  <FormLabel className="mb-2 flex flex-col items-center">
                    <img src="/icons/oxygen.png" alt="SpO₂" className="h-10 w-10" />
                    <span className="text-sm mt-1 text-muted-foreground">SpO₂</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 98%" {...field} className="text-center" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="medical_history"
            render={() => (
              <FormItem>
                <FormLabel>Medical History</FormLabel>
                <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    list="conditions"
                    placeholder="Add medical condition"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCondition();
                      }
                    }}
                  />
                  <datalist id="conditions">
                    {commonConditions
                      .filter((condition) =>
                        condition.toLowerCase().includes(newCondition.toLowerCase())
                      )
                      .slice(0, 10) // 👈 Limit to 10 suggestions
                      .map((condition, index) => (
                        <option key={index} value={condition} />
                      ))}
                  </datalist>
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
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter Remarks" 
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