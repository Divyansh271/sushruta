export const patients = [
  { id: "patient-1", name: "Meera Sharma", age: 34, location: "Jaipur, Rajasthan" },
  { id: "patient-2", name: "Arjun Rao", age: 42, location: "Bengaluru, Karnataka" },
];

export const hospitals = [
  {
    id: "hosp-1",
    name: "National Institute of Ayurveda Hospital",
    location: "Jaipur, Rajasthan",
    region: "North",
    specialties: ["Ayurveda", "Panchakarma", "Chronic Care"],
    rating: 4.8,
    description: "Government Ayush institute with specialist OPD, wellness therapies, and case referral support.",
  },
  {
    id: "hosp-2",
    name: "All India Institute of Ayurveda",
    location: "New Delhi",
    region: "North",
    specialties: ["Ayurveda", "Respiratory", "Geriatric Care"],
    rating: 4.7,
    description: "Tertiary Ayurveda center offering integrated consultation, diagnostics, and treatment planning.",
  },
  {
    id: "hosp-3",
    name: "Morarji Desai National Yoga Hospital",
    location: "New Delhi",
    region: "North",
    specialties: ["Yoga", "Lifestyle", "Rehabilitation"],
    rating: 4.5,
    description: "Yoga and naturopathy-focused care center for lifestyle conditions and recovery programs.",
  },
  {
    id: "hosp-4",
    name: "Government Siddha Medical College Hospital",
    location: "Chennai, Tamil Nadu",
    region: "South",
    specialties: ["Siddha", "Dermatology", "Women Health"],
    rating: 4.4,
    description: "Siddha care hospital with outpatient clinics and traditional medicine case management.",
  },
  {
    id: "hosp-5",
    name: "Regional Research Institute of Unani Medicine",
    location: "Hyderabad, Telangana",
    region: "South",
    specialties: ["Unani", "Digestive Care", "Pain Management"],
    rating: 4.3,
    description: "Unani research and care center supporting clinical assessment and follow-up pathways.",
  },
  {
    id: "hosp-6",
    name: "Kerala Naturopathy Wellness Centre",
    location: "Kochi, Kerala",
    region: "South",
    specialties: ["Naturopathy", "Nutrition", "Wellness"],
    rating: 4.6,
    description: "Private wellness partner with naturopathy consultations, diet planning, and therapy bookings.",
  },
];

export const doctors = [
  {
    id: "doc-1",
    hospitalId: "hosp-1",
    name: "Dr. Kavita Menon",
    qualification: "MD Ayurveda",
    specialties: ["Panchakarma", "Metabolic Disorders"],
    rating: 4.9,
    bio: "Senior Ayurveda physician with 14 years of clinical experience in chronic lifestyle cases.",
  },
  {
    id: "doc-2",
    hospitalId: "hosp-1",
    name: "Dr. Raghav Joshi",
    qualification: "BAMS, PG Diploma in Kshar Sutra",
    specialties: ["Pain Management", "Digestive Care"],
    rating: 4.6,
    bio: "Ayush clinician focused on minimally invasive traditional procedures and follow-up care.",
  },
  {
    id: "doc-3",
    hospitalId: "hosp-2",
    name: "Dr. Nisha Verma",
    qualification: "MD Kayachikitsa",
    specialties: ["Respiratory", "Geriatric Care"],
    rating: 4.8,
    bio: "Consultant for respiratory and elderly care programs using evidence-informed Ayurveda protocols.",
  },
  {
    id: "doc-4",
    hospitalId: "hosp-3",
    name: "Dr. Farhan Ali",
    qualification: "BNYS, MSc Yoga Therapy",
    specialties: ["Yoga", "Rehabilitation"],
    rating: 4.5,
    bio: "Yoga therapy specialist helping patients with recovery, stress management, and mobility plans.",
  },
  {
    id: "doc-5",
    hospitalId: "hosp-4",
    name: "Dr. Lakshmi Narayanan",
    qualification: "MD Siddha",
    specialties: ["Dermatology", "Women Health"],
    rating: 4.7,
    bio: "Siddha physician with experience in skin disorders and women's health case pathways.",
  },
  {
    id: "doc-6",
    hospitalId: "hosp-5",
    name: "Dr. Sameer Qureshi",
    qualification: "MD Unani",
    specialties: ["Unani", "Digestive Care"],
    rating: 4.4,
    bio: "Unani medicine consultant focused on digestive care, pain management, and preventive routines.",
  },
  {
    id: "doc-7",
    hospitalId: "hosp-6",
    name: "Dr. Anjali Nair",
    qualification: "BNYS",
    specialties: ["Naturopathy", "Nutrition"],
    rating: 4.8,
    bio: "Naturopathy specialist designing nutrition, detox, and wellness plans for urban patients.",
  },
];

export const cases = [
  {
    id: "case-101",
    patientId: "patient-1",
    title: "Chronic joint stiffness",
    symptoms: "Morning stiffness, knee discomfort, and reduced mobility for three months.",
    location: "Jaipur, Rajasthan",
    status: "in-progress",
    createdAt: "2026-08-20T10:30:00.000Z",
    timeline: [
      { at: "20 Aug, 10:30 AM", label: "Case raised", note: "Patient submitted symptoms and location." },
      { at: "20 Aug, 02:15 PM", label: "Triage completed", note: "Marked suitable for Ayurveda OPD review." },
      { at: "21 Aug, 09:20 AM", label: "Hospital shortlisted", note: "National Institute of Ayurveda Hospital recommended." },
      { at: "22 Aug, 11:00 AM", label: "Doctor assigned", note: "Dr. Kavita Menon reviewing the case." },
    ],
  },
  {
    id: "case-102",
    patientId: "patient-2",
    title: "Recurring acidity and sleep disturbance",
    symptoms: "Digestive discomfort with irregular sleep and stress-triggered flare-ups.",
    location: "Bengaluru, Karnataka",
    status: "raised",
    createdAt: "2026-08-23T15:45:00.000Z",
    timeline: [
      { at: "23 Aug, 03:45 PM", label: "Case raised", note: "Patient requested Ayush guidance." },
      { at: "23 Aug, 04:05 PM", label: "Documents added", note: "Previous prescription attached through demo file input." },
      { at: "Pending", label: "Hospital response", note: "Awaiting confirmation from shortlisted care center." },
    ],
  },
  {
    id: "case-103",
    patientId: "patient-1",
    title: "Skin allergy follow-up",
    symptoms: "Seasonal flare-up with itching and mild inflammation.",
    location: "Chennai, Tamil Nadu",
    status: "closed",
    createdAt: "2026-08-12T09:00:00.000Z",
    timeline: [
      { at: "12 Aug, 09:00 AM", label: "Case raised", note: "Patient submitted photos and symptom notes." },
      { at: "13 Aug, 01:00 PM", label: "Siddha consultation booked", note: "Doctor appointment confirmed." },
      { at: "18 Aug, 05:20 PM", label: "Treatment plan shared", note: "Diet and topical routine provided." },
      { at: "22 Aug, 10:00 AM", label: "Case closed", note: "Patient reported improvement during follow-up." },
    ],
  },
];

export const appointments = [
  { id: "appt-1", hospitalId: "hosp-1", doctorId: "doc-1", date: "2026-08-29", time: "11:30 AM", status: "upcoming", reason: "Joint stiffness review" },
  { id: "appt-2", hospitalId: "hosp-2", doctorId: "doc-3", date: "2026-09-02", time: "02:00 PM", status: "upcoming", reason: "Respiratory wellness consult" },
  { id: "appt-3", hospitalId: "hosp-4", doctorId: "doc-5", date: "2026-08-18", time: "10:00 AM", status: "past", reason: "Skin allergy follow-up" },
];

export const schemes = [
  {
    id: "scheme-1",
    name: "Ayushman Bharat PM-JAY",
    eligibility: "Eligible low-income families can receive cashless secondary and tertiary care benefits.",
    details: "Demo details: patients can check family eligibility, covered procedures, nearby empaneled hospitals, and e-card status.",
  },
  {
    id: "scheme-2",
    name: "National Ayush Mission Support",
    eligibility: "Patients using public Ayush facilities may access subsidized services in selected states.",
    details: "Demo details: state programs can cover OPD support, wellness centers, and referral-based treatment pathways.",
  },
  {
    id: "scheme-3",
    name: "State Health Assurance Plan",
    eligibility: "Residents with valid state ID may qualify for hospital-linked financial assistance.",
    details: "Demo details: the app can surface region-specific coverage, documents required, and help desk contact.",
  },
  {
    id: "scheme-4",
    name: "Senior Citizen Wellness Grant",
    eligibility: "Citizens above 60 can apply for preventive care and chronic disease wellness packages.",
    details: "Demo details: includes routine consultation, yoga therapy, nutrition counseling, and follow-up reminders.",
  },
  {
    id: "scheme-5",
    name: "Private Hospital Care Bundle",
    eligibility: "Partner hospitals can offer discounted consultation and therapy bundles for referred patients.",
    details: "Demo details: bundle terms, package price, validity, and included follow-ups can be shown here.",
  },
];

export const reviews = [
  { id: "rev-1", targetId: "doc-1", reviewerName: "Meera Sharma", rating: 5, comment: "Clear explanation and practical therapy plan." },
  { id: "rev-2", targetId: "doc-1", reviewerName: "Ritu S.", rating: 4, comment: "Good consultation, appointment started a little late." },
  { id: "rev-3", targetId: "doc-3", reviewerName: "Arjun Rao", rating: 5, comment: "Helpful respiratory care guidance for my father." },
];
