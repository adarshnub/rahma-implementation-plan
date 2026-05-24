import type { Metadata } from "next";
import {
  AlertTriangle,
  BellRing,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileCheck2,
  FileText,
  Globe2,
  Hospital,
  Languages,
  MapPinned,
  MessageSquareText,
  Mic,
  Palette,
  Pill,
  RadioTower,
  Route,
  School,
  Server,
  ShieldCheck,
  Siren,
  Smartphone,
  UserCheck,
  Users,
  WifiOff,
} from "lucide-react";
import { MermaidRenderer } from "./MermaidRenderer";

export const metadata: Metadata = {
  title: "Rahma Client Architecture Plan",
  description:
    "Client-facing architecture and implementation plan for Rahma Phase 1 and Phase 2.",
};

const decisions = [
  {
    topic: "Mobile technology",
    options: "Native iOS/Android, Flutter, React Native",
    recommendation:
      "Native iOS and Android for stronger device, location, SMS, background, and wearable control.",
  },
  {
    topic: "Hosting",
    options: "AWS UAE Region + Bedrock, custom on-prem, hybrid",
    recommendation:
      "AWS UAE Region with a UAE-hosted foundation-model layer, preferably Bedrock where the required model is available; use UAE-hosted private models if dedicated hosting is mandated.",
  },
  {
    topic: "AI model usage",
    options: "UAE-hosted foundation model, UAE-hosted private model, self-hosted model",
    recommendation:
      "Use a UAE-hosted foundation model for higher-quality Arabic/English understanding, such as Claude or an equivalent Bedrock model where available. Keep sensitive patient data inside approved UAE hosting.",
  },
  {
    topic: "Offline voice",
    options: "Lightweight on-device model, rules-only prompts, full offline AI triage",
    recommendation:
      "Lightweight on-device model for simple commands and yes/no; no full offline medical triage in Phase 1.",
  },
  {
    topic: "Emergency integration",
    options: "Direct approved API, gateway/call-center, simulator/manual pilot",
    recommendation:
      "Use the client-confirmed authority/API route when available; keep dashboard, call-center, or manual handoff as approved operational fallback paths.",
  },
  {
    topic: "Onboarding",
    options: "UAE Pass, mobile OTP, client SSO, assisted onboarding",
    recommendation:
      "UAE Pass if client confirms access; OTP or assisted verification as fallback.",
  },
];

const phaseOneItems = [
  {
    icon: Siren,
    title: "One-Touch Emergency Activation",
    body: "Large press-and-hold button with vibration, sound, visual confirmation, false-alarm handling, and safe escalation.",
  },
  {
    icon: MapPinned,
    title: "Location and Profile Packet",
    body: "Current GPS, network location, last known location, timestamp, confidence, language, medical flags, allergies, and caregiver contacts.",
  },
  {
    icon: BellRing,
    title: "Caregiver and Receiver Alerts",
    body: "Push and SMS fallback with secure short-lived links, acknowledgement tracking, retry rules, and receiver dashboard status.",
  },
  {
    icon: Hospital,
    title: "Hospital Finder",
    body: "Approved Dubai and Abu Dhabi facility directory with nearest emergency-ready facility suggestions and explainable routing.",
  },
  {
    icon: Pill,
    title: "Medication Reminders",
    body: "Timed reminder notifications, simple taken/skipped flow, and optional caregiver missed-dose escalation.",
  },
  {
    icon: Languages,
    title: "Arabic and English Flow",
    body: "Bilingual prompts, simple voice intent support, no-response fallback, and reviewed emergency wording.",
  },
];

const howItWorksSteps = [
  {
    title: "1. Activate Rahma",
    body:
      "The user presses and holds the main Rahma button for 2 seconds. This prevents accidental taps while still being fast enough for distress situations.",
  },
  {
    title: "2. Confirm Emergency Context",
    body:
      "The app immediately starts the emergency workflow and asks one simple voice/visual prompt such as 'Are you hurt?' or 'Do you need help?' The user can answer by voice or by tapping large Yes/No buttons.",
  },
  {
    title: "3. Capture Location and Profile",
    body:
      "The app captures current GPS/network location, falls back to last known location if needed, and attaches the minimum emergency profile: language, critical medical flags, allergies, and caregiver contacts.",
  },
  {
    title: "4. Create Emergency Event",
    body:
      "The backend creates a timestamped emergency event with status tracking, location quality, activation source, user reference, and notification state.",
  },
  {
    title: "5. Alert Caregivers and Receivers",
    body:
      "Caregivers/family and the approved receiver dashboard are alerted immediately through push and SMS fallback where approved. The target is to start alerting within 10 seconds in normal connectivity.",
  },
  {
    title: "6. Dispatch or Handoff",
    body:
      "If a direct approved authority/emergency API is available, the event packet is sent through that route. If not, the Phase 1 pilot uses an approved receiver dashboard, call-center/manual handoff, or simulator until live integration is confirmed.",
  },
  {
    title: "7. Track, Escalate, or Close",
    body:
      "Receivers can acknowledge, escalate, contact caregiver/user, mark false alarm, or close the event. Every action is stored in the audit timeline.",
  },
];

const onboardingOptions = [
  {
    title: "UAE Pass",
    fit: "Best for verified patient/user identity when the client confirms access and user suitability.",
    tradeoff:
      "Requires integration access, user readiness, UAE Pass app availability, and a fallback for users who cannot complete it.",
    recommendation: "Recommended primary route for Phase 1 users.",
  },
  {
    title: "Assisted Onboarding",
    fit: "Best for elderly or special-care users who need help from pilot staff, clinic staff, or caregivers.",
    tradeoff:
      "Requires operational support and staff verification steps, but reduces user drop-off.",
    recommendation: "Recommended fallback and pilot-support route.",
  },
  {
    title: "Mobile OTP",
    fit: "Best for caregivers and family members who only need verified phone access and relationship approval.",
    tradeoff:
      "Not strong enough alone for sensitive patient identity; should be paired with relationship verification.",
    recommendation: "Recommended for caregivers, not as the only patient identity method.",
  },
  {
    title: "Client / Staff SSO",
    fit: "Best for admins, support teams, receiver dashboard users, and authority/partner staff.",
    tradeoff:
      "Depends on client identity provider readiness and role mapping.",
    recommendation: "Recommended for all staff and dashboard access.",
  },
];

const onboardingSteps = [
  "Pilot invite or staff-assisted registration starts the process.",
  "User chooses onboarding path: UAE Pass, assisted onboarding, or approved manual pilot setup.",
  "Identity is verified and a Rahma user reference is created.",
  "Minimal emergency profile is completed: language, medical flags, allergies, caregiver contacts, and medication reminders.",
  "Caregivers receive invite and verify by OTP plus relationship approval.",
  "App performs permission health check for location, notifications, microphone, and SMS fallback.",
  "User completes a guided emergency test in training mode.",
  "Account becomes pilot-ready only after profile, caregiver, permissions, and test status are complete.",
];

const mobileStack = [
  {
    icon: Smartphone,
    title: "iOS App",
    recommendation: "Swift + SwiftUI",
    details:
      "Best fit for a safety-critical iPhone app because it gives direct access to Core Location, PushKit/APNs, haptics, Keychain, background modes, HealthKit/watchOS expansion, and Apple accessibility APIs.",
  },
  {
    icon: Code2,
    title: "Android App",
    recommendation: "Kotlin + Jetpack Compose",
    details:
      "Best fit for Android because it works closely with Android permissions, foreground services, WorkManager, background location, SMS intent behavior, encrypted storage, wearable APIs, and Material accessibility patterns.",
  },
  {
    icon: Database,
    title: "Shared App Standards",
    recommendation: "Common API contract + shared design rules",
    details:
      "Keep iOS and Android consistent by using the same backend request/response definitions, emergency status names, event fields, colors, typography, spacing, and accessibility rules.",
  },
  {
    icon: Palette,
    title: "UX System",
    recommendation: "Native accessibility-first design system",
    details:
      "Large controls, high contrast, Arabic/English typography, haptic feedback, voice and tap in parallel, emergency status banners, and no typing in critical flows.",
  },
];

const offlineStack = [
  {
    icon: Mic,
    title: "Offline Voice",
    recommendation: "Use platform STT first; test WhisperKit / whisper.cpp as fallback proof",
    details:
      "For Phase 1, offline voice should only handle simple commands, language hints, and yes/no context. It should not decide whether an emergency is real.",
  },
  {
    icon: WifiOff,
    title: "Offline Data",
    recommendation: "Encrypted local cache + event queue",
    details:
      "Store only minimal emergency profile, caregiver contacts, last known location, and unsynced event logs using Keychain/SQLCipher or encrypted platform storage.",
  },
  {
    icon: MessageSquareText,
    title: "SMS Fallback",
    recommendation: "Primary: AWS End User Messaging/SNS; backup: Twilio or Infobip",
    details:
      "Use registered sender IDs, pre-approved emergency templates, delivery callbacks, retry rules, and a backup provider for high-availability fallback.",
  },
  {
    icon: Cpu,
    title: "On-Device Rules",
    recommendation: "Rules engine before AI",
    details:
      "Button activation, fall/silence, high-risk profile flags, and missing connectivity should trigger safe escalation even if speech recognition fails.",
  },
];

const timeline = [
  {
    period: "Weeks 1-2",
    title: "Discovery and Scope Lock",
    output:
      "Final scope, hosting decision, onboarding decision, emergency handoff path, UX wireframes, data inventory, and risk register.",
  },
  {
    period: "Weeks 3-6",
    title: "Core App and Backend MVP",
    output:
      "Native app MVP, profile service, emergency service, caregiver flow, notifications, hospital directory, and dashboard MVP.",
  },
  {
    period: "Weeks 7-9",
    title: "Offline and Emergency Reliability",
    output:
      "SMS fallback, local event queue, last-known location, receiver lifecycle, false-alarm handling, and poor-connectivity tests.",
  },
  {
    period: "Weeks 10-12",
    title: "AI, Security, and Script Validation",
    output:
      "Arabic/English prompts, confidence policy, reviewed scripts, access testing, audit review, and support runbook.",
  },
  {
    period: "Weeks 13-16",
    title: "Pilot Readiness and Launch",
    output:
      "Production deployment, pilot onboarding, dashboards, incident process, support training, and Phase 2 backlog.",
  },
];

const risks = [
  {
    risk: "Emergency API access is delayed",
    mitigation: "Build simulator and manual handoff paths in parallel.",
  },
  {
    risk: "AI misunderstands distressed speech",
    mitigation: "Button activation starts the emergency flow regardless of AI confidence.",
  },
  {
    risk: "Weak GPS indoors",
    mitigation: "Use GPS, network location, last known location, timestamp, and confidence.",
  },
  {
    risk: "Internet unavailable",
    mitigation: "Use local event creation, SMS fallback, receiver dashboard/manual handoff, and later sync.",
  },
  {
    risk: "Caregiver access misconfigured",
    mitigation: "Verify caregivers, use RBAC, short-lived links, and audit access.",
  },
  {
    risk: "Custom hosting required",
    mitigation: "Prepare a separate infrastructure proposal if the client rejects managed cloud.",
  },
];

const clientDecisions = [
  "Hosting preference: AWS UAE Region with a UAE-hosted foundation-model layer, dedicated on-premises infrastructure, or hybrid.",
  "Onboarding preference: UAE Pass, mobile OTP, client SSO, or assisted/manual onboarding.",
  "Patient information data access method linked to UAE Pass: approved API, secure client integration, controlled data feed, or manual pilot import.",
  "Emergency handoff model for Phase 1.",
  "SMS payload approval for fallback alerts.",
  "Receiver roles for Phase 1 alerts.",
  "Approved hospital directory source.",
  "Medication reminder scope for Phase 1.",
  "Voice/audio retention policy.",
  "Phase 2 priority order.",
  "Any specific audit, security, data residency, or documentation requirements to be met.",
];

export default function ClientPlanPage() {
  return (
    <main className="client-plan">
      <MermaidRenderer />

      <header className="plan-hero">
        <nav className="plan-nav" aria-label="Client plan navigation">
          <span className="plan-brand">Rahma Client Plan</span>
          <div>
            <a href="#how">How it works</a>
            <a href="#architecture">Architecture</a>
            <a href="#flows">Flows</a>
            <a href="#options">Options</a>
            <a href="#timeline">Timeline</a>
            <a href="#decisions">Decisions</a>
          </div>
        </nav>

        <div className="plan-hero-grid">
          <section>
            <p className="plan-eyebrow">Client review document</p>
            <h1>Rahma AI Guardian App Architecture and Implementation Plan</h1>
            <p>
              A detailed Phase 1 and Phase 2 plan covering system architecture,
              emergency flows, offline fallback, server architecture, open
              technical options, recommended decisions, and launch readiness.
            </p>
            <div className="plan-actions">
              <a href="#architecture">View architecture</a>
              <a href="/Rahma_Client_Architecture_Implementation_Plan.pdf">Open PDF</a>
            </div>
          </section>

          <aside className="plan-summary">
            <span>Prepared: 22 May 2026</span>
            <strong>Recommended path</strong>
            <p>
              Native iOS and Android apps, AWS UAE Region with a UAE-hosted
              foundation-model layer, constrained on-device fallback, SMS fallback,
              reusable backend services, and a receiver dashboard.
            </p>
          </aside>
        </div>
      </header>

      <section className="plan-section">
        <div className="plan-section-head">
          <p className="plan-eyebrow">Executive recommendation</p>
          <h2>Build Phase 1 as a controlled emergency-care pilot first.</h2>
          <p>
            Rahma should first prove one reliable path: activate, locate,
            identify basic context, alert caregiver or receiver, support
            hospital/emergency handoff, log every action, and continue safely
            when connectivity is weak.
          </p>
        </div>

        <div className="plan-card-grid three">
          <article>
            <Smartphone size={24} />
            <h3>Native Mobile</h3>
            <p>
              Better control over permissions, background location, SMS fallback,
              haptics, voice, and future wearables.
            </p>
          </article>
          <article>
            <Cloud size={24} />
            <h3>Client-Approved Hosting</h3>
            <p>
              Production data, logs, backups, and keys stay inside the approved
              hosting boundary unless formally approved otherwise.
            </p>
          </article>
          <article>
            <ShieldCheck size={24} />
            <h3>Evidence-Ready Controls</h3>
            <p>
              We will meet any compliance, audit, data handling, or security
              requirement specifically confirmed by the client.
            </p>
          </article>
        </div>
      </section>

      <section className="plan-section muted">
        <div className="plan-section-head">
          <p className="plan-eyebrow">Confirmed scope</p>
          <h2>Phase 1 focuses on the emergency foundation.</h2>
        </div>

        <div className="plan-card-grid">
          {phaseOneItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon size={24} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="plan-section how-section" id="how">
        <div className="plan-section-head">
          <p className="plan-eyebrow">How the app works</p>
          <h2>From button press to emergency handoff.</h2>
          <p>
            The app should be usable by an elderly or special-care user without
            typing or menu navigation. A 2-second press-and-hold starts the
            emergency path, while voice, visual buttons, location fallback, and
            SMS fallback help the system continue safely when conditions
            are imperfect.
          </p>
        </div>

        <div className="flow-explainer">
          <div className="flow-video-card" aria-label="Animated Rahma emergency flow explainer">
            <div className="video-card-head">
              <span className="play-dot" />
              <div>
                <strong>Animated flow demo</strong>
                <p>Activation → location → alerts → dispatch/handoff</p>
              </div>
            </div>

            <div className="video-stage">
              <div className="demo-phone">
                <div className="demo-top">
                  <span>Rahma</span>
                  <strong className="state-chip" />
                </div>
                <div className="demo-screen">
                  <div className="state-layer state-ready">
                    <div className="demo-button">
                      <Siren size={30} />
                      <span>Hold 2s</span>
                    </div>
                    <div className="demo-caption">Ready for emergency activation</div>
                  </div>

                  <div className="state-layer state-holding">
                    <div className="hold-ring">
                      <span />
                    </div>
                    <div className="demo-button pressed">
                      <Siren size={30} />
                      <span>Activating</span>
                    </div>
                    <div className="demo-caption">Press and hold confirmed</div>
                  </div>

                  <div className="state-layer state-prompt">
                    <div className="demo-prompt">Are you hurt?</div>
                    <div className="demo-choice-row">
                      <span>Yes</span>
                      <span>No</span>
                    </div>
                    <div className="demo-caption">Voice and tap both accepted</div>
                  </div>

                  <div className="state-layer state-location">
                    <div className="location-card">
                      <MapPinned size={24} />
                      <strong>Location captured</strong>
                      <p>GPS + last known fallback</p>
                    </div>
                    <div className="mini-profile">
                      <span>Language: Arabic / English</span>
                      <span>Medical flags attached</span>
                      <span>Caregiver contacts ready</span>
                    </div>
                  </div>

                  <div className="state-layer state-alerts">
                    <div className="alert-burst">
                      <BellRing size={28} />
                    </div>
                    <div className="notification-stack">
                      <span>Caregiver alert sent</span>
                      <span>Receiver dashboard updated</span>
                      <span>SMS fallback queued if needed</span>
                    </div>
                  </div>

                  <div className="state-layer state-dispatch">
                    <div className="dispatch-card">
                      <RadioTower size={30} />
                      <strong>Emergency handoff started</strong>
                      <p>Approved API, receiver dashboard, or manual handoff</p>
                    </div>
                    <div className="status-pill-row">
                      <span>Event ID</span>
                      <span>Audit on</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="demo-flow-panel">
                <div className="demo-row active-one">
                  <span>01</span>
                  <strong>Emergency event created</strong>
                </div>
                <div className="demo-row active-two">
                  <span>02</span>
                  <strong>Location and profile attached</strong>
                </div>
                <div className="demo-row active-three">
                  <span>03</span>
                  <strong>Caregiver and receiver alerted</strong>
                </div>
                <div className="demo-row active-four">
                  <span>04</span>
                  <strong>Approved dispatch/handoff starts</strong>
                </div>
              </div>
            </div>

            <div className="video-progress">
              <span />
            </div>
          </div>

          <div className="how-step-list">
            {howItWorksSteps.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title.replace(/^\d+\.\s*/, "")}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="print-diagram how-print-diagram">
          <h3>How Rahma Works in Phase 1</h3>
          <div className="print-flow-grid">
            <span>1. User presses and holds the Rahma button for 2 seconds</span>
            <span>2. App asks one simple voice/visual prompt</span>
            <span>3. App captures current or last-known location</span>
            <span>4. Minimal emergency profile is attached</span>
            <span>5. Backend creates a timestamped emergency event</span>
            <span>6. Caregivers and receiver dashboard are alerted</span>
            <span>7. Approved authority API, dashboard, or manual handoff starts</span>
            <span>8. Receiver actions and delivery status are audited</span>
          </div>
        </div>

      </section>

      <section className="plan-section onboarding-section">
        <div className="plan-section-head">
          <p className="plan-eyebrow">User onboarding</p>
          <h2>Onboard safely without making elderly users do all the work.</h2>
          <p>
            Our recommendation is to use UAE Pass as the primary verified
            identity route where approved, assisted onboarding as the elderly
            friendly fallback, OTP plus relationship approval for caregivers,
            and client SSO for staff/dashboard users.
          </p>
        </div>

        <div className="onboarding-layout">
          <div className="onboarding-flow-card">
            <div className="flow-card-head">
              <UserCheck size={24} />
              <h3>Recommended Phase 1 onboarding flow</h3>
            </div>
            <ol>
              {onboardingSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="onboarding-options">
            {onboardingOptions.map((option) => (
              <article key={option.title}>
                <span>{option.title}</span>
                <p><strong>Best fit:</strong> {option.fit}</p>
                <p><strong>Condition:</strong> {option.tradeoff}</p>
                <p><strong>Our recommendation:</strong> {option.recommendation}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="diagram-shell compact-diagram onboarding-diagram">
          <pre className="mermaid">{`flowchart TD
  A["Pilot invite or assisted registration"] --> B{"Onboarding path"}
  B -- "Verified user" --> C["UAE Pass authentication"]
  B -- "Needs help" --> D["Assisted onboarding by approved staff"]
  B -- "Caregiver" --> E["Mobile OTP + relationship approval"]
  B -- "Staff / receiver" --> F["Client SSO + role mapping"]
  C --> G["Create Rahma user reference"]
  D --> G
  E --> H["Link caregiver to user"]
  F --> I["Dashboard access approved"]
  G --> J["Emergency profile<br/>language, medical flags,<br/>allergies, medication reminders"]
  J --> K["Caregiver invite and verification"]
  K --> L["Permission health check<br/>location, push, microphone,<br/>SMS fallback"]
  L --> M["Training-mode emergency test"]
  M --> N["Pilot-ready account"]

  classDef main fill:#e8f5f3,stroke:#0f766e,stroke-width:2px,color:#17202a;
  classDef support fill:#fff7ed,stroke:#b45309,stroke-width:2px,color:#17202a;
  class A,C,G,J,K,L,M,N main;
  class B,D,E,F,H,I support;`}</pre>
        </div>
        <div className="print-diagram">
          <h3>Recommended Phase 1 Onboarding Flow</h3>
          <div className="print-flow vertical">
            <span>Pilot invite or assisted registration</span>
            <span>Choose onboarding path: UAE Pass, assisted, caregiver OTP, or staff SSO</span>
            <span>Create Rahma user reference or approve dashboard access</span>
            <span>Complete emergency profile and medication reminder details</span>
            <span>Invite and verify caregivers</span>
            <span>Run permission health check</span>
            <span>Complete training-mode emergency test</span>
            <span>Pilot-ready account</span>
          </div>
        </div>
      </section>

      <section className="plan-section stack-section">
        <div className="plan-section-head">
          <p className="plan-eyebrow">Recommended app stack</p>
          <h2>Use true native apps for the safety-critical mobile experience.</h2>
          <p>
            Rahma depends on background location, emergency fallback, haptics,
            push delivery, encrypted local data, accessibility, voice prompts,
            and future wearables. Those are exactly the areas where native iOS
            and Android implementation gives us the most control.
          </p>
        </div>

        <div className="stack-layout">
          <div className="phone-preview" aria-label="Rahma app visual concept">
            <div className="phone-frame">
              <div className="phone-status">
                <span>Rahma</span>
                <strong>Ready</strong>
              </div>
              <div className="emergency-orb">
                <Siren size={38} />
                <span>Hold 2s</span>
              </div>
              <div className="app-prompt">Are you hurt?</div>
              <div className="app-actions">
                <button>Yes</button>
                <button>No</button>
              </div>
              <div className="app-status">
                <MapPinned size={16} />
                Last location saved · caregiver ready
              </div>
            </div>
          </div>

          <div className="stack-card-grid">
            {mobileStack.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <Icon size={23} />
                  <span>{item.title}</span>
                  <h3>{item.recommendation}</h3>
                  <p>{item.details}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="plan-section muted">
        <div className="plan-section-head">
          <p className="plan-eyebrow">Offline and SMS stack</p>
          <h2>Design offline mode as a safe degraded emergency path.</h2>
          <p>
            Offline mode should not promise the full Rahma product without
            internet. It should guarantee that emergency activation, local
            profile lookup, last-known location, SMS fallback, and event
            sync are handled safely.
          </p>
        </div>

        <div className="stack-card-grid four">
          {offlineStack.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon size={23} />
                <span>{item.title}</span>
                <h3>{item.recommendation}</h3>
                <p>{item.details}</p>
              </article>
            );
          })}
        </div>

        <div className="provider-panel">
          <article>
            <h3>Recommended SMS provider order</h3>
            <p>
              <strong>Primary:</strong> AWS End User Messaging SMS / SNS if the
              backend is hosted on AWS UAE, because it keeps provider operations
              close to the cloud stack and simplifies monitoring.
            </p>
            <p>
              <strong>Secondary:</strong> Twilio or Infobip as a backup route if
              the client wants multi-provider failover, better regional routing
              coverage, or a separate messaging vendor.
            </p>
            <p>
              <strong>Condition:</strong> UAE SMS should use registered sender
              IDs and approved templates. Emergency SMS content should be short,
              pre-approved, and avoid unnecessary sensitive data.
            </p>
          </article>
          <article>
            <h3>Fallback message model</h3>
            <p>
              SMS should include the user reference, emergency status, timestamp,
              last/current location text, and a secure short-lived link only if
              URLs are approved for the sender registration.
            </p>
            <p>
              If URLs are not approved, the SMS should send a plain location
              coordinate or last known area and ask the caregiver/receiver to
              open the dashboard.
            </p>
          </article>
        </div>
      </section>

      <section className="plan-section" id="architecture">
        <div className="plan-section-head">
          <p className="plan-eyebrow">High-level architecture</p>
          <h2>Mobile-first platform with reusable Phase 2 foundations.</h2>
          <p>
            The architecture separates mobile experience, receiver interfaces,
            backend services, AI/voice support, data storage, and partner
            integrations so Phase 2 can expand without rebuilding the core.
          </p>
        </div>
        <div className="diagram-shell compact-diagram">
          <pre className="mermaid">{`flowchart TB
  A["Native mobile app<br/>one-touch button, voice prompts,<br/>offline fallback"] --> B["API gateway<br/>authentication, rate limits,<br/>request validation"]
  R["Receiver interfaces<br/>caregiver view, dashboard,<br/>admin console"] --> B
  B --> C["Core backend services<br/>identity, profile, consent,<br/>emergency events"]
  C --> D["Operational services<br/>location, notifications,<br/>reminders, hospital directory"]
  D --> E["Data layer<br/>encrypted database, queues,<br/>audit logs, monitoring"]
  D --> F["Integration adapters<br/>SMS, push, maps, hospital data,<br/>emergency handoff"]
  F --> G["Phase 2 partners<br/>schools, pharmacies,<br/>wearables"]
  A --> H["Encrypted local store<br/>minimal profile, caregiver contacts,<br/>last known location"]
  C --> I["AI orchestration<br/>language detection, intent support,<br/>confidence policy"]

  classDef main fill:#e8f5f3,stroke:#0f766e,stroke-width:2px,color:#17202a;
  classDef support fill:#fff7ed,stroke:#b45309,stroke-width:2px,color:#17202a;
  class A,B,C,D,E,F main;
  class R,G,H,I support;`}</pre>
        </div>
        <div className="print-diagram">
          <h3>High-Level Architecture</h3>
          <div className="print-flow-grid">
            <span>Native mobile app<br />one-touch, voice, offline fallback</span>
            <span>Receiver interfaces<br />caregiver, support, admin</span>
            <span>API gateway<br />auth, validation, routing</span>
            <span>Core backend services<br />identity, consent, emergency events</span>
            <span>Operational services<br />location, notifications, reminders, hospitals</span>
            <span>Data layer<br />encrypted DB, queues, audit, monitoring</span>
            <span>Integration adapters<br />SMS, push, maps, emergency handoff</span>
            <span>Phase 2 partners<br />schools, pharmacies, wearables</span>
          </div>
        </div>
      </section>

      <section className="plan-section dark" id="flows">
        <div className="plan-section-head">
          <p className="plan-eyebrow">Emergency and offline flows</p>
          <h2>Help must start even when the internet is imperfect.</h2>
          <p>
            The offline path should not repeat the normal emergency flow. It
            should show exactly how Rahma behaves when internet, GPS, push
            notifications, or authority APIs are unavailable.
          </p>
        </div>

        <div className="diagram-shell compact-diagram">
          <pre className="mermaid">{`flowchart TD
  A["1. Activation succeeds<br/>2-second hold, silent panic, or future wearable trigger"] --> B["2. Local emergency record created<br/>event id, activation source, device time"]
  B --> C["3. Minimal encrypted profile loaded<br/>language, medical flags, allergies, caregivers"]
  C --> D{"4. Location quality"}
  D -- "Fresh GPS/network location" --> E["Attach current coordinates<br/>accuracy + timestamp"]
  D -- "GPS delayed or unavailable" --> F["Attach last-known location<br/>last area + timestamp + low confidence"]
  E --> G{"5. Internet data available?"}
  F --> G
  G -- "Yes" --> H["Send event packet to backend<br/>profile summary + location + device status"]
  H --> I["Backend sends push alerts<br/>caregiver + receiver dashboard"]
  I --> J{"6. Approved authority route live?"}
  J -- "Yes" --> K["Send emergency packet<br/>through approved API/handoff route"]
  J -- "Fallback route" --> L["Receiver dashboard or call-center<br/>manual handoff/simulator"]
  G -- "No" --> M["Build SMS-safe payload<br/>user ref + emergency status + location text"]
  M --> N["Send SMS to approved caregivers<br/>and approved handoff number if configured"]
  N --> O["Show offline reassurance<br/>help is being contacted"]
  O --> P["Queue encrypted event locally<br/>alerts, retries, diagnostics"]
  P --> R{"7. Connection restored?"}
  R -- "Yes" --> S["Sync event timeline<br/>delivery results + location confidence"]
  R -- "No" --> T["Continue local retry policy<br/>preserve audit trail"]
  K --> U["Audit timeline updated"]
  L --> U
  S --> U

  classDef main fill:#e8f5f3,stroke:#0f766e,stroke-width:2px,color:#17202a;
  classDef warn fill:#fff7ed,stroke:#b45309,stroke-width:2px,color:#17202a;
  classDef risk fill:#fee2e2,stroke:#b91c1c,stroke-width:2px,color:#17202a;
  class A,B,C,E,H,I,K,L,S,U main;
  class D,F,G,J,M,N,O,P,R,T warn;`}</pre>
        </div>
        <div className="print-diagram">
          <h3>Offline and Weak-Network Flow</h3>
          <div className="print-flow vertical">
            <span>Activation succeeds: 2-second hold, silent panic, or future wearable trigger</span>
            <span>Create local emergency record and load encrypted profile</span>
            <span>Attach fresh GPS/network location, or last-known location with low-confidence timestamp</span>
            <span>If internet is available: send event packet to backend and alert caregiver/dashboard</span>
            <span>If approved authority route is live: send emergency packet through approved route</span>
            <span>If authority route is pending: use receiver dashboard, manual handoff, or simulator</span>
            <span>If internet is unavailable: send SMS-safe payload to approved caregivers or approved handoff number</span>
            <span>Queue encrypted event locally and sync timeline, delivery results, and diagnostics when connection returns</span>
          </div>
        </div>
      </section>

      <section className="plan-section" id="options">
        <div className="plan-section-head">
          <p className="plan-eyebrow">Open options</p>
          <h2>Recommended decisions for unconfirmed items.</h2>
        </div>
        <div className="decision-table">
          <div className="decision-row head">
            <span>Topic</span>
            <span>Options</span>
            <span>Recommended by us</span>
          </div>
          {decisions.map((decision) => (
            <div className="decision-row" key={decision.topic}>
              <strong>{decision.topic}</strong>
              <p>{decision.options}</p>
              <p>{decision.recommendation}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="plan-section muted" id="timeline">
        <div className="plan-section-head">
          <p className="plan-eyebrow">Implementation plan</p>
          <h2>16-week Phase 1 delivery timeline.</h2>
        </div>
        <div className="plan-timeline">
          {timeline.map((item) => (
            <article key={item.period}>
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.output}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="plan-section">
        <div className="plan-section-head">
          <p className="plan-eyebrow">Phase 2 readiness</p>
          <h2>Design Phase 1 so children, geofencing, pharmacy, and languages fit later.</h2>
        </div>
        <div className="phase-path">
          <article>
            <Users size={24} />
            <h3>Flexible Roles</h3>
            <p>Add child, parent, school, pharmacy, and support roles without changing the identity model.</p>
          </article>
          <article>
            <Route size={24} />
            <h3>Location Service</h3>
            <p>Emergency-only location in Phase 1, safe zones and geofencing in Phase 2.</p>
          </article>
          <article>
            <School size={24} />
            <h3>School Workflows</h3>
            <p>Parent/school permissions, escalation rules, and authorized receiver dashboards.</p>
          </article>
          <article>
            <Globe2 size={24} />
            <h3>Localization Pipeline</h3>
            <p>Versioned prompts and reviewer workflow for additional languages.</p>
          </article>
        </div>
      </section>

      <section className="plan-section dark">
        <div className="plan-section-head">
          <p className="plan-eyebrow">Server architecture</p>
          <h2>Recommended AWS UAE Region architecture with UAE-hosted AI.</h2>
        </div>
        <div className="diagram-shell">
          <pre className="mermaid">{`flowchart TB
  A["iOS / Android apps<br/>and dashboards"] --> B["WAF + API Gateway"]
  B --> C["Private VPC"]
  C --> D["Application services<br/>containers + serverless workers"]
  D --> E["Encrypted data services<br/>relational DB, cache, queues,<br/>object storage"]
  D --> F["UAE-hosted foundation-model layer<br/>Bedrock or approved private model"]
  E --> G["Key management<br/>secrets, encryption keys,<br/>backup controls"]
  D --> H["Monitoring and logs<br/>alerts, audit events,<br/>operational dashboards"]

  classDef main fill:#e8f5f3,stroke:#0f766e,stroke-width:2px,color:#17202a;
  classDef support fill:#fff7ed,stroke:#b45309,stroke-width:2px,color:#17202a;
  class A,B,C,D,E main;
  class F,G,H support;`}</pre>
        </div>
        <div className="print-diagram">
          <h3>Preferred Server Architecture</h3>
          <div className="print-flow vertical">
            <span>iOS / Android apps and dashboards</span>
            <span>WAF + API Gateway</span>
            <span>Private VPC</span>
            <span>Application services: containers + serverless workers</span>
            <span>Encrypted data services: relational DB, cache, queues, object storage</span>
            <span>UAE-hosted foundation-model layer: Bedrock or approved private model</span>
            <span>Key management, secrets, backups, monitoring, logs, and audit events</span>
          </div>
        </div>
        <div className="plan-card-grid three dark-cards">
          <article>
            <Server size={24} />
            <h3>Custom On-Prem</h3>
            <p>Maximum control, but higher cost, procurement, GPU sizing, MLOps, patching, and 24/7 operations.</p>
          </article>
          <article>
            <Database size={24} />
            <h3>Hybrid</h3>
            <p>Managed app services plus private AI server. Useful if AI workloads need stricter isolation.</p>
          </article>
          <article>
            <WifiOff size={24} />
            <h3>Offline Boundary</h3>
            <p>Offline mode covers emergency-critical fallback, not the full product experience.</p>
          </article>
        </div>
      </section>

      <section className="plan-section muted">
        <div className="plan-section-head">
          <p className="plan-eyebrow">Risk handling</p>
          <h2>Expected risks and mitigation.</h2>
        </div>
        <div className="risk-panel">
          {risks.map((item) => (
            <article key={item.risk}>
              <AlertTriangle size={18} />
              <div>
                <h3>{item.risk}</h3>
                <p>{item.mitigation}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="plan-section" id="decisions">
        <div className="plan-section-head">
          <p className="plan-eyebrow">Client decisions needed</p>
          <h2>Items to confirm before Phase 1 build lock.</h2>
        </div>
        <ol className="client-decision-list">
          {clientDecisions.map((item) => (
            <li key={item}>
              <CheckCircle2 size={18} />
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="plan-close">
        <FileCheck2 size={30} />
        <h2>Final recommendation</h2>
        <p>
          Proceed with a disciplined Phase 1 pilot focused on emergency
          reliability, accessibility, location capture, caregiver/receiver
          alerting, medication reminders, auditability, and operational
          readiness. Approve Phase 2 after Phase 1 validates real-world
          activation, alert delivery, location quality, false alarm management,
          support capacity, and the agreed hosting/requirement model.
        </p>
      </section>
    </main>
  );
}
