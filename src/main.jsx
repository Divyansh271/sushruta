import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  appointments as appointmentSeed,
  cases as caseSeed,
  doctors,
  hospitals,
  pathlabs,
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
};

function App() {
  const [cases, setCases] = useState(caseSeed);
  const [appointments, setAppointments] = useState(appointmentSeed);
  const [applications, setApplications] = useState([
    { id: "app-1", caseId: "case-101", patientName: "Meera Sharma", hospitalId: "hosp-1", status: "raised" },
    { id: "app-2", caseId: "case-102", patientName: "Arjun Rao", hospitalId: "hosp-2", status: "raised" },
    { id: "app-3", caseId: "case-103", patientName: "Fatima Khan", hospitalId: "hosp-4", status: "raised" },
  ]);

  const data = useMemo(
    () => ({ cases, setCases, appointments, setAppointments, applications, setApplications }),
    [cases, appointments, applications],
  );

  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
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
          <NavLink to="/hospital/dashboard">Hospital Panel</NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

function Home() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">SIH26047 • Ministry of Ayush theme</p>
        <h1>Patient Case-Taking Platform</h1>
        <p>
          A clickable prototype for raising Ayush care cases, discovering verified hospitals,
          booking appointments, tracking protected case files, and exploring support schemes.
        </p>
        <div className="actions">
          <Link className="btn primary" to="/login">Login</Link>
          <Link className="btn secondary" to="/signup">Sign Up</Link>
        </div>
      </div>
      <div className="hero-panel">
        <Metric label="Active Cases" value="3" />
        <Metric label="Hospitals Listed" value="6" />
        <Metric label="Avg Response" value="18h" />
        <Metric label="Demo Integrations" value="Maps + SBI MOPS" />
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
        <input type="email" placeholder="Email or mobile number" />
        <input type="password" placeholder="Password" />
        <button className="btn primary full" type="submit">{mode}</button>
        <div className="divider">or</div>
        <button className="btn ghost full" type="button">Continue with Google</button>
        <button className="btn ghost full" type="button">Continue with Facebook</button>
        <button className="btn ghost full" type="button">Continue with DigiLocker</button>
        <p className="fineprint">DigiLocker placeholder can later fetch Ayushman card and identity documents.</p>
        <p className="muted">
          {isSignup ? "Already registered?" : "New to the platform?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"}>{isSignup ? "Login" : "Create account"}</Link>
        </p>
      </form>
    </section>
  );
}

function Dashboard({ data }) {
  return (
    <Page title="Patient Dashboard" action={<Link className="btn primary" to="/cases/new">Raise New Case</Link>}>
      <div className="grid cards compact feature-strip">
        <InfoTile title="Security Ready" text="Prototype marks case files as password-protected and audit-ready for ISO 27001, CERT-In, and ABDM-style controls." />
        <InfoTile title="Nearby Matching" text="Raised cases can be discovered by hospitals using dummy distance, region, and expertise matching." />
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
                <span className="muted">{item.location}</span>
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
        </section>
      </div>
    </Page>
  );
}

function NewCase({ data }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", symptoms: "", location: "", expertise: "Ayurveda" });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  function submit(event) {
    event.preventDefault();
    const nextCase = {
      id: `case-${Date.now()}`,
      patientId: "patient-1",
      title: form.title || "New Consultation Request",
      symptoms: form.symptoms || "Symptoms shared through case form.",
      location: form.location || "Not specified",
      requiredExpertise: [form.expertise],
      status: "raised",
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
    navigate("/dashboard");
  }

  return (
    <Page title="Raise a Case">
      <form className="card form-grid" onSubmit={submit}>
        <label>Case title<input name="title" value={form.title} onChange={update} placeholder="Recurring migraine and fatigue" /></label>
        <label>Symptoms<textarea name="symptoms" value={form.symptoms} onChange={update} placeholder="Describe symptoms, duration, and severity" /></label>
        <label>Required expertise<select name="expertise" value={form.expertise} onChange={update}>
          <option>Ayurveda</option><option>Panchakarma</option><option>Siddha</option><option>Unani</option><option>Yoga</option><option>Naturopathy</option><option>Dermatology</option>
        </select></label>
        <label>Location<input name="location" value={form.location} onChange={update} placeholder="City, State" /></label>
        <label>Attach reports<input type="file" /></label>
        <p className="fineprint">Google Maps, file upload storage, and location permissions are represented as UI-only placeholders.</p>
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
  const nearbyHospitals = hospitals
    .filter((hospital) => item.requiredExpertise?.some((tag) => hospital.specialties.includes(tag) || hospital.expertiseBranches.includes(tag)))
    .slice(0, 3);
  return (
    <Page title={item.title} action={<button className="btn primary" onClick={() => navigate("/hospitals")}>Apply to Hospital</button>}>
      <div className="grid two">
        <section className="card detail">
          <span className={`pill ${item.status}`}>{statusLabels[item.status]}</span>
          <p>{item.symptoms}</p>
          <dl>
            <dt>Location</dt><dd>{item.location}</dd>
            <dt>Expertise Needed</dt><dd>{item.requiredExpertise?.join(", ")}</dd>
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
          {!unlocked ? (
            <div className="unlock-box">
              <p className="muted">{item.caseFile?.passwordHint}</p>
              <input type="password" placeholder="Enter demo password" />
              <button className="btn primary" onClick={() => setUnlocked(true)}>Unlock File</button>
            </div>
          ) : (
            <CaseFile file={item.caseFile} />
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
  const updateStatus = (id, status) => {
    data.setApplications(data.applications.map((app) => app.id === id ? { ...app, status } : app));
  };
  return (
    <Page title="Hospital Panel">
      <div className="grid two lower-grid">
        <InfoTile title="Nearby Raised Cases" text="Hospitals can discover cases by region, distance, urgency, and required branch of Ayush expertise." />
        <InfoTile title="Operations Requests" text="Panel placeholders cover document filling, pathlab coordination, scans, and immediate pharmaceutical supplies." />
      </div>
      <div className="grid cards">
        {data.applications.map((app) => {
          const caseItem = data.cases.find((item) => item.id === app.caseId);
          const hospital = hospitals.find((item) => item.id === app.hospitalId);
          return (
            <article className="card" key={app.id}>
              <span className={`pill ${app.status}`}>{statusLabels[app.status]}</span>
              <h3>{app.patientName}</h3>
              <p>{caseItem?.title || "New case application"} for {hospital?.name}</p>
              <TagRow tags={caseItem?.requiredExpertise || []} />
              <div className="actions">
                <button className="btn primary" onClick={() => updateStatus(app.id, "accepted")}>Accept</button>
                <button className="btn danger" onClick={() => updateStatus(app.id, "rejected")}>Reject</button>
              </div>
            </article>
          );
        })}
      </div>
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

function CaseFile({ file }) {
  return (
    <div className="case-file">
      <h3>Reports</h3>
      <ul className="clean-list">{file?.reports.map((item) => <li key={item}>{item}</li>)}</ul>
      <h3>Symptom Images</h3>
      <ul className="clean-list">{file?.symptomImages.map((item) => <li key={item}>{item}</li>)}</ul>
      <h3>Treatment Notes</h3>
      <ul className="clean-list">{file?.treatmentNotes.map((item) => <li key={item}>{item}</li>)}</ul>
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
