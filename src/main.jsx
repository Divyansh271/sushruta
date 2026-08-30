import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  appointments as appointmentSeed,
  accommodations,
  cases as caseSeed,
  complianceChecklist,
  doctors,
  hospitals,
  networkChains,
  pathlabs,
  patients,
  pharmacies,
  reviews,
  schemes,
} from "./mockData";
import "./styles.css";

const statusLabels = {
  raised: "Raised",
  "in-progress": "In Progress",
  closed: "Closed",
  accepted: "Accepted",
  rejected: "Rejected",
  "not-selected": "Not selected",
};

function App() {
  const [cases, setCases] = useState(caseSeed);
  const [appointments, setAppointments] = useState(appointmentSeed);
  const [patientLocation, setPatientLocation] = useState("");
  const [applications, setApplications] = useState([
    { id: "app-1", caseId: "case-101", patientName: "Meera Sharma", hospitalId: "hosp-1", status: "accepted" },
    { id: "app-2", caseId: "case-102", patientName: "Arjun Rao", hospitalId: "hosp-5", status: "raised" },
    { id: "app-3", caseId: "case-103", patientName: "Fatima Khan", hospitalId: "hosp-4", status: "accepted" },
    { id: "app-4", caseId: "case-104", patientName: "Ishaan Verma", hospitalId: "hosp-2", status: "accepted" },
  ]);

  const data = useMemo(
    () => ({ cases, setCases, appointments, setAppointments, applications, setApplications, patientLocation, setPatientLocation }),
    [cases, appointments, applications, patientLocation],
  );

  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/login" element={<AuthPage mode="Login" />} />
          <Route path="/signup" element={<AuthPage mode="Sign Up" />} />
          <Route path="/dashboard" element={<Dashboard data={data} />} />
          <Route path="/cases/new" element={<NewCase data={data} />} />
          <Route path="/cases/:id" element={<CaseDetail data={data} />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/hospitals/:id" element={<HospitalProfile data={data} />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/appointments" element={<Appointments data={data} />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/coordination" element={<CoordinationHub />} />
          <Route path="/hospital/dashboard" element={<HospitalPanel data={data} />} />
          <Route path="/reviews/:targetId" element={<ReviewForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}

function Shell({ children }) {
  return (
    <div>
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand-mark">AY</span>
          <span>Patient Case-Taking Platform</span>
        </Link>
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/hospitals">Hospitals</NavLink>
          <NavLink to="/appointments">Appointments</NavLink>
          <NavLink to="/schemes">Schemes</NavLink>
          <NavLink to="/coordination">Care Network</NavLink>
          <NavLink to="/hospital/dashboard">Hospital Panel</NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

function Home({ data }) {
  const [manualLocation, setManualLocation] = useState(data.patientLocation);
  const saveLocation = (location) => {
    const nextLocation = location || manualLocation.trim();
    if (nextLocation) data.setPatientLocation(nextLocation);
  };
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">SIH26047 • Ministry of Ayush theme</p>
        <h1>Patient Case-Taking Platform</h1>
        <p>
          A clickable prototype for raising Ayush care cases, hospital pickup and transfer,
          locked treatment files, DigiLocker-ready paperwork, dummy SBI payments, attendant stays,
          labs, pharmacies, reviews, and scheme matching.
        </p>
        <div className="actions">
          <Link className="btn primary" to="/login">Login</Link>
          <Link className="btn secondary" to="/signup">Sign Up</Link>
        </div>
        <div className="location-card">
          <span className="eyebrow">Location setup</span>
          <strong>{data.patientLocation || "Set a location to prioritise nearby care"}</strong>
          <div className="location-actions">
            <input value={manualLocation} onChange={(event) => setManualLocation(event.target.value)} placeholder="City, State" aria-label="Patient location" />
            <button className="btn ghost" type="button" onClick={() => saveLocation()}>Save location</button>
            <button className="link-button light" type="button" onClick={() => { setManualLocation("Jaipur, Rajasthan"); saveLocation("Jaipur, Rajasthan"); }}>Use demo GPS</button>
          </div>
          <small>Maps is a safe integration point in this prototype; no location is transmitted to a third party.</small>
        </div>
      </div>
      <div className="hero-panel">
        <Metric label="Active Cases" value="4" />
        <Metric label="Hospitals Listed" value="6" />
        <Metric label="Avg Response" value="18h" />
        <Metric label="Demo Integrations" value="Maps, DigiLocker, SBI" />
      </div>
    </section>
  );
}

function AuthPage({ mode }) {
  const navigate = useNavigate();
  const isSignup = mode === "Sign Up";
  return (
    <section className="auth-wrap">
      <form className="card form-card" onSubmit={(event) => { event.preventDefault(); navigate("/dashboard"); }}>
        <p className="eyebrow">Prototype access</p>
        <h1>{mode}</h1>
        {isSignup && <input placeholder="Full name" />}
        {isSignup && <input placeholder="Age / gender, e.g. 17M" />}
        {isSignup && <input placeholder="City, state" />}
        {isSignup && <label>I am registering as<select defaultValue="Patient"><option>Patient</option><option>Hospital representative</option><option>Doctor</option><option>Lab representative</option></select></label>}
        <input type="email" placeholder="Email or mobile number" />
        <input type="password" placeholder="Password" />
        <button className="btn primary full" type="submit">{mode}</button>
        <div className="divider">or</div>
        <button className="btn ghost full" type="button" onClick={() => navigate("/dashboard")}>Continue with Google</button>
        <button className="btn ghost full" type="button" onClick={() => navigate("/dashboard")}>Continue with Facebook</button>
        <button className="btn ghost full" type="button" onClick={() => navigate("/dashboard")}>Continue with DigiLocker</button>
        <p className="fineprint">DigiLocker placeholder can later fetch Ayushman card, identity documents, and consented health paperwork.</p>
        <p className="muted">
          {isSignup ? "Already registered?" : "New to the platform?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"}>{isSignup ? "Login" : "Create account"}</Link>
        </p>
      </form>
    </section>
  );
}

function Dashboard({ data }) {
  const featuredCase = data.cases.find((item) => item.id === "case-104") || data.cases[0];
  return (
    <Page title="Patient Dashboard" action={<Link className="btn primary" to="/cases/new">Raise New Case</Link>}>
      <div className="alert-band feature-strip">
        <div>
          <span className="eyebrow">Live workflow demo</span>
          <h2>{featuredCase.title}</h2>
          <p>{featuredCase.transferHistory?.join(" -> ")}</p>
        </div>
        <Link className="btn secondary" to={`/cases/${featuredCase.id}`}>Open Case File</Link>
      </div>
      <div className="grid cards feature-strip">
        <InfoTile title="Security Ready" text="Prototype marks case files as password-protected and audit-ready for ISO 27001, CERT-In, and ABDM-style controls." />
        <InfoTile title="Nearby Matching" text="Raised cases can be discovered by hospitals using dummy distance, region, and expertise matching." />
        <InfoTile title="Guest-to-Verified Flow" text="Patients can browse as guests, then login with own auth, Google/Facebook, or DigiLocker before raising a case." />
      </div>
      <div className="grid two">
        <section>
          <h2>Active Cases</h2>
          <div className="stack">
            {data.cases.slice(0, 4).map((item) => (
              <Link className="card case-card" key={item.id} to={`/cases/${item.id}`}>
                <div>
                  <span className={`pill ${item.status}`}>{statusLabels[item.status]}</span>
                  <h3>{item.title}</h3>
                  <p>{item.symptoms}</p>
                </div>
                <span className="muted">{item.location} • {item.urgency} urgency</span>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h2>Upcoming Appointments</h2>
          <div className="stack">
            {data.appointments.slice(0, 3).map((appt) => (
              <AppointmentCard appointment={appt} key={appt.id} />
            ))}
          </div>
          <div className="card lower-grid">
            <h2>Attendant Stay</h2>
            <div className="stack small-stack">
              {accommodations.slice(0, 2).map((stay) => (
                <div className="mini-row" key={stay.id}>
                  <strong>{stay.name}</strong>
                  <span>{stay.type} • {stay.available} available • {stay.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
}

function NewCase({ data }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    symptoms: "",
    location: "",
    expertise: "Ayurveda",
    urgency: "Medium",
    choice1: hospitals[0].id,
    choice2: hospitals[1].id,
  });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  function submit(event) {
    event.preventDefault();
    const nextCase = {
      id: `case-${Date.now()}`,
      patientId: "patient-1",
      title: form.title || "New Consultation Request",
      symptoms: form.symptoms || "Symptoms shared through case form.",
      location: form.location || "Not specified",
      urgency: form.urgency,
      requiredExpertise: [form.expertise],
      status: "raised",
      hospitalChoiceList: [form.choice1, form.choice2].filter(Boolean),
      currentHospitalId: null,
      currentDoctorId: null,
      privacy: "Patient-only until a hospital doctor accepts. Labs can upload reports without reading the case file.",
      transferHistory: ["Patient raised case", "Visible to preferred hospitals and matching hospitals"],
      payments: [{ label: "Initial estimate", amount: "To be quoted", status: "Pending approval", channel: "Dummy SBI MOPS" }],
      vitals: ["Weight pending", "Symptom images pending"],
      createdAt: new Date().toISOString(),
      caseFile: {
        passwordHint: "Demo password: case123",
        reports: ["Uploaded report placeholder"],
        symptomImages: ["Symptom image placeholder"],
        treatmentNotes: ["Case file created and locked for authorized users."],
      },
      timeline: [
        { at: "Just now", label: "Case raised", note: "Patient submitted the initial case details." },
        { at: "Pending", label: "Triage review", note: "Nearest Ayush case desk will review symptoms." },
      ],
    };
    data.setCases([nextCase, ...data.cases]);
    const selectedHospitals = [form.choice1, form.choice2].filter(Boolean);
    data.setApplications([
      ...selectedHospitals.map((hospitalId, index) => ({
        id: `app-${Date.now()}-${index}`,
        caseId: nextCase.id,
        patientName: "Meera Sharma",
        hospitalId,
        status: "raised",
      })),
      ...data.applications,
    ]);
    navigate("/dashboard");
  }

  return (
    <Page title="Raise a Case">
      <form className="card form-grid" onSubmit={submit}>
        <label>Case title<input name="title" value={form.title} onChange={update} placeholder="Recurring migraine and fatigue" /></label>
        <label>Symptoms<textarea name="symptoms" value={form.symptoms} onChange={update} placeholder="Describe symptoms, duration, and severity" /></label>
        <label>Required expertise<select name="expertise" value={form.expertise} onChange={update}>
          <option>Ayurveda</option><option>Panchakarma</option><option>Siddha</option><option>Unani</option><option>Yoga</option><option>Naturopathy</option><option>Dermatology</option><option>Orthopedics</option><option>Rheumatology support</option>
        </select></label>
        <label>Urgency<select name="urgency" value={form.urgency} onChange={update}><option>Low</option><option>Medium</option><option>High</option></select></label>
        <label>Location<input name="location" value={form.location} onChange={update} placeholder="City, State" /></label>
        <label>Preferred hospital, choice 1<select name="choice1" value={form.choice1} onChange={update}>{hospitals.map((hospital) => <option value={hospital.id} key={hospital.id}>{hospital.name}</option>)}</select></label>
        <label>Preferred hospital, choice 2<select name="choice2" value={form.choice2} onChange={update}>{hospitals.map((hospital) => <option value={hospital.id} key={hospital.id}>{hospital.name}</option>)}</select></label>
        <label>Attach reports<input type="file" multiple /></label>
        <div className="consent-note"><strong>Consent captured for this demo.</strong> The patient controls who can view the case file; selected hospitals only receive a triage summary until they accept.</div>
        <p className="fineprint">Maps, file storage, and DigiLocker are intentionally simulated in this front-end prototype. Production requires patient consent, encrypted storage, and server-side access controls.</p>
        <button className="btn primary" type="submit">Submit Case</button>
      </form>
    </Page>
  );
}

function CaseDetail({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = data.cases.find((caseItem) => caseItem.id === id) || data.cases[0];
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [accessMessage, setAccessMessage] = useState("");
  const nearbyHospitals = hospitals
    .filter((hospital) => item.requiredExpertise?.some((tag) => hospital.specialties.includes(tag) || hospital.expertiseBranches.includes(tag)))
    .slice(0, 3);
  const patient = patients.find((entry) => entry.id === item.patientId);
  const currentDoctor = doctors.find((doctor) => doctor.id === item.currentDoctorId);
  const currentHospital = hospitals.find((hospital) => hospital.id === item.currentHospitalId);
  const choiceHospitals = item.hospitalChoiceList?.map((hospitalId) => hospitals.find((hospital) => hospital.id === hospitalId)).filter(Boolean) || [];
  const unlockFile = () => {
    if (password === "case123") {
      setUnlocked(true);
      setAccessMessage("Access granted for this demo. An audit timestamp would be written by the secure backend.");
    } else {
      setAccessMessage("Incorrect demo password. Use case123 to view the prototype case file.");
    }
  };
  const recordDummyPayment = () => {
    const paymentIndex = item.payments?.findIndex((payment) => payment.status !== "Paid") ?? -1;
    if (paymentIndex < 0) {
      setAccessMessage("All recorded installments are already marked paid in this demo.");
      return;
    }
    data.setCases(data.cases.map((caseItem) => caseItem.id !== item.id ? caseItem : {
      ...caseItem,
      payments: caseItem.payments.map((payment, index) => index === paymentIndex ? { ...payment, status: "Demo paid" } : payment),
      timeline: [...caseItem.timeline, { at: "Just now", label: "Dummy payment recorded", note: "No payment was processed. This is an SBI MOPS integration placeholder." }],
    }));
  };
  const withdrawCase = () => {
    if (item.status === "closed") return;
    data.setCases(data.cases.map((caseItem) => caseItem.id !== item.id ? caseItem : {
      ...caseItem,
      status: "closed",
      privacy: "Case withdrawn by the patient. Historical access remains restricted and audit logged.",
      transferHistory: [...caseItem.transferHistory, "Patient withdrew case"],
      timeline: [...caseItem.timeline, { at: "Just now", label: "Case withdrawn", note: "Only the patient can close or withdraw an active case." }],
    }));
  };
  return (
    <Page title={item.title} action={<div className="actions"><button className="btn primary" onClick={() => navigate("/hospitals")}>Choose Hospital</button>{item.status !== "closed" && <button className="btn danger" onClick={withdrawCase}>Withdraw Case</button>}</div>}>
      <div className="grid two">
        <section className="card detail">
          <span className={`pill ${item.status}`}>{statusLabels[item.status]}</span>
          <p>{item.symptoms}</p>
          <dl>
            <dt>Patient</dt><dd>{patient ? `${patient.name}, ${patient.age}${patient.gender}` : "Patient profile"}</dd>
            <dt>Location</dt><dd>{item.location}</dd>
            <dt>Urgency</dt><dd>{item.urgency}</dd>
            <dt>Expertise Needed</dt><dd>{item.requiredExpertise?.join(", ")}</dd>
            <dt>Current Doctor</dt><dd>{currentDoctor ? `${currentDoctor.name}, ${currentHospital?.name}` : "Awaiting hospital pickup"}</dd>
            <dt>Created</dt><dd>{new Date(item.createdAt).toLocaleDateString()}</dd>
          </dl>
        </section>
        <section>
          <h2>Progress Log</h2>
          <Timeline items={item.timeline} />
        </section>
      </div>
      <div className="grid two lower-grid">
        <section className="card">
          <h2>Password-Protected Case File</h2>
          <p className="fineprint">{item.privacy}</p>
          {!unlocked ? (
            <div className="unlock-box">
              <p className="muted">{item.caseFile?.passwordHint}</p>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter demo password" />
              <button className="btn primary" onClick={unlockFile}>Unlock File</button>
              {accessMessage && <p className={unlocked ? "success" : "error-text"}>{accessMessage}</p>}
            </div>
          ) : (
            <CaseFile file={item.caseFile} vitals={item.vitals} />
          )}
        </section>
        <section className="card">
          <h2>Nearby Hospital Matches</h2>
          <div className="mock-map">
            <span>Google Maps API placeholder</span>
            <strong>{item.location}</strong>
          </div>
          <div className="stack small-stack">
            {nearbyHospitals.map((hospital) => (
              <Link key={hospital.id} to={`/hospitals/${hospital.id}`} className="mini-row">
                <strong>{hospital.name}</strong>
                <span>{hospital.distanceKm} km • {hospital.specialties.slice(0, 2).join(", ")}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <div className="grid cards lower-grid">
        <InfoTile title="Choice List" text={choiceHospitals.map((hospital) => hospital.name).join(" -> ") || "No hospital choice list yet."} />
        <InfoTile title="Eligible Schemes" text={patient?.ayushmanEligible ? `${patient.insurer}; PM-JAY and state support shown before payment agreement.` : `${patient?.insurer || "Insurance"} and private bundles shown before payment.`} />
        <InfoTile title="Hospital Rule" text="A hospital that picks a case cannot drop it. It can only request transfer; only the patient can withdraw." />
      </div>
      <div className="grid two lower-grid">
        <section className="card">
          <h2>Payments</h2>
          <div className="stack small-stack">
            {item.payments?.map((payment) => (
              <div className="payment-row" key={`${payment.label}-${payment.amount}`}>
                <div>
                  <strong>{payment.label}</strong>
                  <span>{payment.channel}</span>
                </div>
                <div>
                  <strong>{payment.amount}</strong>
                  <span>{payment.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn secondary section-actions" onClick={recordDummyPayment}>Record Dummy SBI MOPS Payment</button>
          <p className="fineprint">No banking details are requested, stored, or transmitted by this prototype.</p>
        </section>
        <section className="card">
          <h2>Transfer & Access History</h2>
          <ul className="clean-list">{item.transferHistory?.map((entry) => <li key={entry}>{entry}</li>)}</ul>
        </section>
      </div>
      <div className="grid two lower-grid">
        <section className="card">
          <h2>Lab Updates</h2>
          <p className="fineprint">Labs can push reports into the file but cannot unlock patient notes or doctor notes.</p>
          <div className="stack small-stack">
            {pathlabs.slice(0, 2).map((lab) => <div className="mini-row" key={lab.id}><strong>{lab.name}</strong><span>{lab.services.join(", ")} • Upload-only permission</span></div>)}
          </div>
        </section>
        <section className="card">
          <h2>Attendant & Pharmacy</h2>
          <div className="stack small-stack">
            {accommodations.slice(0, 2).map((stay) => <div className="mini-row" key={stay.id}><strong>{stay.name}</strong><span>{stay.available} available • {stay.price}</span></div>)}
            {pharmacies.slice(0, 2).map((pharmacy) => <div className="mini-row" key={pharmacy.id}><strong>{pharmacy.name}</strong><span>{pharmacy.stock} • {pharmacy.delivery}</span></div>)}
          </div>
        </section>
      </div>
    </Page>
  );
}

function Hospitals() {
  const [specialty, setSpecialty] = useState("All");
  const [region, setRegion] = useState("All");
  const specialties = ["All", ...new Set(hospitals.flatMap((hospital) => [...hospital.specialties, ...hospital.expertiseBranches]))];
  const regions = ["All", ...new Set(hospitals.map((hospital) => hospital.region))];
  const filtered = hospitals.filter((hospital) => {
    const matchesExpertise = specialty === "All" || hospital.specialties.includes(specialty) || hospital.expertiseBranches.includes(specialty);
    const matchesRegion = region === "All" || hospital.region === region;
    return matchesExpertise && matchesRegion;
  });

  return (
    <Page title="Browse Hospitals">
      <div className="filters card">
        <label>Expertise / branch<select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>{specialties.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Region<select value={region} onChange={(event) => setRegion(event.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <div className="mock-map wide">
        <span>Google Maps API placeholder</span>
        <strong>Nearby Ayush hospitals rendered from dummy coordinates</strong>
      </div>
      <div className="grid cards">
        {filtered.map((hospital) => <HospitalCard hospital={hospital} key={hospital.id} />)}
      </div>
    </Page>
  );
}

function HospitalProfile({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const hospital = hospitals.find((item) => item.id === id) || hospitals[0];
  const hospitalDoctors = doctors.filter((doctor) => doctor.hospitalId === hospital.id);
  const [paid, setPaid] = useState(false);

  function book() {
    const appointment = {
      id: `appt-${Date.now()}`,
      hospitalId: hospital.id,
      doctorId: hospitalDoctors[0]?.id,
      date: "2026-09-05",
      time: "10:30 AM",
      status: "upcoming",
      reason: "Ayush consultation",
    };
    data.setAppointments([appointment, ...data.appointments]);
    navigate("/appointments");
  }

  return (
    <Page title={hospital.name} action={<button className="btn primary" onClick={book}>Book Appointment</button>}>
      <div className="grid two">
        <section className="card detail">
          <p>{hospital.description}</p>
          <p><strong>{hospital.location}</strong> • {hospital.rating} stars</p>
          <p className="muted">{hospital.distanceKm} km away • {hospital.mapZone}</p>
          <TagRow tags={hospital.specialties} />
          <TagRow tags={hospital.expertiseBranches} />
          <div className="actions section-actions">
            <button className="btn secondary" onClick={() => setPaid(true)}>Pay Now via SBI MOPS</button>
            <Link className="btn ghost" to={`/reviews/${hospital.id}`}>Review Hospital</Link>
          </div>
          {paid && <p className="success">Dummy SBI MOPS payment successful. Receipt generated for demo.</p>}
        </section>
        <section>
          <h2>Doctors</h2>
          <div className="stack">
            {hospitalDoctors.map((doctor) => <DoctorMini doctor={doctor} key={doctor.id} />)}
          </div>
        </section>
      </div>
      <div className="grid cards lower-grid">
        <InfoTile title="Hospital Conditions" text={`Cleanliness ${hospital.conditionAudit.cleanliness}/5 • Waste ${hospital.conditionAudit.wasteManagement}/5 • Staff ${hospital.conditionAudit.staffBehaviour}/5`} />
        <InfoTile title="Stay-In Rooms" text={`${hospital.stayRooms.hospital} hospital rooms and ${hospital.stayRooms.nearby} nearby locality stays available for attendants.`} />
        <InfoTile title="Certification" text={hospital.certification} />
      </div>
      <div className="grid two lower-grid">
        <section className="card">
          <h2>Extraordinary Treatments</h2>
          <ul className="clean-list">{hospital.treatmentShowcases.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="card">
          <h2>Hospital-Lab-Pharmacy Network</h2>
          <p>{hospital.networkPartners.join(" • ")}</p>
          <div className="actions">
            <button className="btn ghost">Request Pathlab Scan</button>
            <button className="btn ghost">Request Pharma Supplies</button>
          </div>
        </section>
      </div>
    </Page>
  );
}

function DoctorProfile() {
  const { id } = useParams();
  const doctor = doctors.find((item) => item.id === id) || doctors[0];
  const doctorReviews = reviews.filter((review) => review.targetId === doctor.id);
  return (
    <Page title={doctor.name} action={<Link className="btn primary" to={`/reviews/${doctor.id}`}>Review Doctor</Link>}>
      <section className="card detail">
        <p>{doctor.bio}</p>
        <dl>
          <dt>Qualification</dt><dd>{doctor.qualification}</dd>
          <dt>Doctor Expertise</dt><dd>{doctor.specialties.join(", ")}</dd>
          <dt>Rating</dt><dd>{doctor.rating} stars</dd>
        </dl>
      </section>
      <h2>Patient Reviews</h2>
      <div className="grid cards compact">
        {doctorReviews.map((review) => <ReviewCard review={review} key={review.id} />)}
      </div>
    </Page>
  );
}

function Appointments({ data }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ date: "", time: "", hospitalId: hospitals[0].id });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  function submit(event) {
    event.preventDefault();
    data.setAppointments([
      { id: `appt-${Date.now()}`, ...form, status: "upcoming", reason: "New patient booking" },
      ...data.appointments,
    ]);
    setOpen(false);
  }

  return (
    <Page title="Appointments" action={<button className="btn primary" onClick={() => setOpen(!open)}>Book New</button>}>
      {open && (
        <form className="card form-grid booking" onSubmit={submit}>
          <label>Date<input name="date" type="date" value={form.date} onChange={update} /></label>
          <label>Time<input name="time" type="time" value={form.time} onChange={update} /></label>
          <label>Hospital<select name="hospitalId" value={form.hospitalId} onChange={update}>{hospitals.map((hospital) => <option value={hospital.id} key={hospital.id}>{hospital.name}</option>)}</select></label>
          <button className="btn primary" type="submit">Confirm Booking</button>
        </form>
      )}
      <div className="grid two lower-grid">
        <section className="card">
          <h2>Book Scans</h2>
          <div className="stack small-stack">
            {pathlabs.map((lab) => <div className="mini-row" key={lab.id}><strong>{lab.name}</strong><span>{lab.services.join(", ")} • ETA {lab.eta}</span></div>)}
          </div>
        </section>
        <section className="card">
          <h2>Pharmacy Supply Requests</h2>
          <div className="stack small-stack">
            {pharmacies.map((pharmacy) => <div className="mini-row" key={pharmacy.id}><strong>{pharmacy.name}</strong><span>{pharmacy.stock} • {pharmacy.delivery}</span></div>)}
          </div>
        </section>
      </div>
      <div className="grid cards">
        {data.appointments.map((appointment) => <AppointmentCard appointment={appointment} key={appointment.id} />)}
      </div>
    </Page>
  );
}

function Schemes() {
  const [active, setActive] = useState(null);
  return (
    <Page title="Schemes" action={<Link className="btn primary" to="/reviews/doc-1">Write Review</Link>}>
      <div className="grid cards">
        {schemes.map((scheme) => (
          <article className="card" key={scheme.id}>
            <h3>{scheme.name}</h3>
            <p>{scheme.eligibility}</p>
            <button className="link-button" onClick={() => setActive(scheme)}>Learn More</button>
          </article>
        ))}
      </div>
      {active && (
        <div className="modal-backdrop" onClick={() => setActive(null)}>
          <div className="modal card" onClick={(event) => event.stopPropagation()}>
            <h2>{active.name}</h2>
            <p>{active.details}</p>
            <button className="btn primary" onClick={() => setActive(null)}>Close</button>
          </div>
        </div>
      )}
    </Page>
  );
}

function HospitalPanel({ data }) {
  const [hospitalId, setHospitalId] = useState("hosp-5");
  const hospital = hospitals.find((item) => item.id === hospitalId);
  const hospitalDoctors = doctors.filter((doctor) => doctor.hospitalId === hospitalId);
  const applications = data.applications.filter((application) => application.hospitalId === hospitalId);
  const availableCases = data.cases.filter((caseItem) => {
    const isMatching = caseItem.requiredExpertise?.some((tag) => hospital.specialties.includes(tag) || hospital.expertiseBranches.includes(tag));
    return caseItem.status === "raised" && !caseItem.currentHospitalId && isMatching;
  });
  const acceptCase = (caseId, applicationId) => {
    const caseItem = data.cases.find((item) => item.id === caseId);
    const assignedDoctor = hospitalDoctors.find((doctor) => caseItem.requiredExpertise?.some((tag) => doctor.specialties.includes(tag))) || hospitalDoctors[0];
    data.setCases(data.cases.map((item) => item.id !== caseId ? item : {
      ...item,
      status: "in-progress",
      currentHospitalId: hospitalId,
      currentDoctorId: assignedDoctor?.id || null,
      privacy: `Only patient and ${assignedDoctor?.name || "the assigned doctor"} can access the current case file. Labs remain upload-only.`,
      transferHistory: [...item.transferHistory, `${hospital.name} accepted the case`, `Current owner: ${assignedDoctor?.name || hospital.name}`],
      timeline: [...item.timeline, { at: "Just now", label: "Case accepted", note: `${hospital.name} assigned ${assignedDoctor?.name || "its care team"}. Patient notification is queued.` }],
    }));
    data.setApplications([
      ...(applicationId ? data.applications.map((application) => application.caseId === caseId ? {
        ...application,
        status: application.id === applicationId ? "accepted" : "not-selected",
      } : application) : [{
        id: `app-${Date.now()}`,
        caseId,
        patientName: patients.find((patient) => patient.id === caseItem?.patientId)?.name || "Patient",
        hospitalId,
        status: "accepted",
      }, ...data.applications]),
    ]);
  };
  const rejectApplication = (id) => {
    data.setApplications(data.applications.map((application) => application.id === id ? { ...application, status: "rejected" } : application));
  };
  return (
    <Page title="Hospital Panel" action={<label className="panel-selector">Acting as<select value={hospitalId} onChange={(event) => setHospitalId(event.target.value)}>{hospitals.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}>
      <div className="grid two lower-grid">
        <InfoTile title="Case pickup policy" text="Before accepting, the hospital sees a triage summary. After pickup it becomes responsible for care and may only transfer—not drop—the case." />
        <InfoTile title="Operations desk" text="Coordinate digitised paperwork, pathlab uploads, scans and time-sensitive pharmaceutical supply requests from one queue." />
      </div>
      <section className="lower-grid">
        <h2>Patient choice-list applications</h2>
        <div className="grid cards">
        {applications.length ? applications.map((app) => {
          const caseItem = data.cases.find((item) => item.id === app.caseId);
          return (
            <article className="card" key={app.id}>
              <span className={`pill ${app.status}`}>{statusLabels[app.status]}</span>
              <h3>{app.patientName}</h3>
              <p>{caseItem?.title || "New case application"} for {hospital?.name}</p>
              <TagRow tags={caseItem?.requiredExpertise || []} />
              {app.status === "raised" && !caseItem?.currentHospitalId && <div className="actions">
                <button className="btn primary" onClick={() => acceptCase(app.caseId, app.id)}>Accept & Assign Doctor</button>
                <button className="btn danger" onClick={() => rejectApplication(app.id)}>Decline Before Pickup</button>
              </div>}
              {app.status === "accepted" && <p className="success">Case is assigned. Use a formal transfer request if clinical escalation is needed.</p>}
              {app.status === "not-selected" && <p className="muted">This case has been assigned to another hospital from the patient’s choice list.</p>}
            </article>
          );
        }) : <p className="muted">No patient choice-list applications for this hospital yet.</p>}
        </div>
      </section>
      <section className="lower-grid">
        <h2>Matching regional cases</h2>
        <p className="fineprint">These patients did not name this hospital first. A hospital can offer to pick up a matching case; the patient receives an acceptance notification.</p>
        <div className="grid cards">
          {availableCases.filter((caseItem) => !applications.some((app) => app.caseId === caseItem.id)).map((caseItem) => <article className="card" key={caseItem.id}>
            <span className="pill raised">Open regional case</span>
            <h3>{caseItem.title}</h3>
            <p>{caseItem.location} • {caseItem.urgency} urgency</p>
            <TagRow tags={caseItem.requiredExpertise} />
            <button className="btn primary" onClick={() => acceptCase(caseItem.id)}>Offer Pickup & Assign Doctor</button>
          </article>)}
          {!availableCases.filter((caseItem) => !applications.some((app) => app.caseId === caseItem.id)).length && <p className="muted">No unrequested regional cases match this hospital’s listed expertise.</p>}
        </div>
      </section>
    </Page>
  );
}

function ReviewForm() {
  const { targetId } = useParams();
  const [done, setDone] = useState(false);
  return (
    <Page title="Submit Review">
      <form className="card form-grid" onSubmit={(event) => { event.preventDefault(); setDone(true); }}>
        <label>Target ID<input value={targetId} readOnly /></label>
        <label>Rating<select defaultValue="5"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label>
        <label>Comment<textarea placeholder="Share your experience" /></label>
        <button className="btn primary" type="submit">Submit Review</button>
        {done && <p className="success">Review submitted successfully for demo.</p>}
      </form>
    </Page>
  );
}

function CaseFile({ file, vitals = [] }) {
  return (
    <div className="case-file">
      <h3>Reports</h3>
      <ul className="clean-list">{file?.reports.map((item) => <li key={item}>{item}</li>)}</ul>
      <h3>Symptom Images</h3>
      <ul className="clean-list">{file?.symptomImages.map((item) => <li key={item}>{item}</li>)}</ul>
      <h3>Treatment Notes</h3>
      <ul className="clean-list">{file?.treatmentNotes.map((item) => <li key={item}>{item}</li>)}</ul>
      <h3>Timestamped observations</h3>
      <ul className="clean-list">{vitals.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

function InfoTile({ title, text }) {
  return (
    <article className="card info-tile">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Page({ title, action, children }) {
  return (
    <section className="page">
      <div className="page-head">
        <h1>{title}</h1>
        {action}
      </div>
      {children}
    </section>
  );
}

function HospitalCard({ hospital }) {
  return (
    <Link className="card hospital-card" to={`/hospitals/${hospital.id}`}>
      <div className="rating">{hospital.rating} ★</div>
      <h3>{hospital.name}</h3>
      <p>{hospital.location}</p>
      <p className="muted">{hospital.distanceKm} km • {hospital.certification}</p>
      <TagRow tags={hospital.specialties} />
      <TagRow tags={hospital.expertiseBranches.slice(0, 3)} />
    </Link>
  );
}

function DoctorMini({ doctor }) {
  return (
    <Link className="card mini" to={`/doctors/${doctor.id}`}>
      <h3>{doctor.name}</h3>
      <p>{doctor.qualification}</p>
      <span>{doctor.rating} ★</span>
    </Link>
  );
}

function AppointmentCard({ appointment }) {
  const hospital = hospitals.find((item) => item.id === appointment.hospitalId);
  const doctor = doctors.find((item) => item.id === appointment.doctorId);
  return (
    <article className="card appointment">
      <span className={`pill ${appointment.status}`}>{appointment.status}</span>
      <h3>{hospital?.name || "Selected hospital"}</h3>
      <p>{doctor?.name || "Doctor to be assigned"} • {appointment.reason}</p>
      <strong>{appointment.date} at {appointment.time}</strong>
    </article>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="card">
      <strong>{review.rating} ★</strong>
      <p>{review.comment}</p>
      <span className="muted">By {review.reviewerName}</span>
    </article>
  );
}

function Timeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((entry) => (
        <li key={`${entry.at}-${entry.label}`}>
          <span>{entry.at}</span>
          <h3>{entry.label}</h3>
          <p>{entry.note}</p>
        </li>
      ))}
    </ol>
  );
}

function TagRow({ tags }) {
  return <div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>;
}

function Metric({ label, value }) {
  return <div><strong>{value}</strong><span>{label}</span></div>;
}

function NotFound() {
  return <Page title="Page Not Found"><Link className="btn primary" to="/">Return Home</Link></Page>;
}

createRoot(document.getElementById("root")).render(<App />);
