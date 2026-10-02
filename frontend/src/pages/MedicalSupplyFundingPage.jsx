import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const medicalKitPresets = [
  {
    id: 'first_aid',
    title: 'Emergency Trauma & First-Responder Kit',
    icon: '🩹',
    priceINR: 2500,
    priceUSD: 30,
    description: 'Hemostatic gauze, compression bandages, tourniquets, sterile suture sets, burn gel, and emergency analgesics.',
    patientsImpacted: 15,
    weightKg: 4.5,
    recommendedMode: 'High-Speed Cargo Drone (UAV)',
    urgency: 'High Priority'
  },
  {
    id: 'cold_chain',
    title: 'Cold-Chain Insulin & Antivenom Pod',
    icon: '🧊',
    priceINR: 7500,
    priceUSD: 90,
    description: 'Autonomous isothermal active-cooling container (+2°C to +8°C) with antivenom vials, rabies vaccines, and insulin pens.',
    patientsImpacted: 40,
    weightKg: 8.0,
    recommendedMode: 'Autonomous UAV Drone Delivery',
    urgency: 'Critical Priority'
  },
  {
    id: 'water_sanitation',
    title: 'Water Purification & Flood Sanitation Pod',
    icon: '💧',
    priceINR: 15000,
    priceUSD: 180,
    description: 'Rapid solar water filtration units, chlorine tablets, electrolyte rehydration packs, and cholera antibiotics.',
    patientsImpacted: 120,
    weightKg: 18.0,
    recommendedMode: 'Alluvial Riverine Cargo Barge',
    urgency: 'Severe Flood Alert'
  },
  {
    id: 'drone_flight',
    title: 'Full Autonomous Heavy Cargo UAV Flight',
    icon: '🚁',
    priceINR: 35000,
    priceUSD: 420,
    description: 'Sponsors 1 complete dedicated UAV air-drop mission carrying 50 kg of critical medicines directly over blocked mountain passes.',
    patientsImpacted: 350,
    weightKg: 50.0,
    recommendedMode: 'Heavy Cargo Drone (UAV)',
    urgency: 'Lifesaving Staging Mission'
  }
];

const targetSettlements = [
  {
    id: 'shitalpur',
    name: 'Shitalpur Border Outpost',
    region: 'Himalayan High Altitude Pass (3,120m)',
    isolationDays: 42,
    population: 1450,
    urgency: 'Critical Cutoff',
    urgencyColor: '#ef4444',
    neededSupplies: 'Cold-chain antivenom, frostbite kits, trauma packs'
  },
  {
    id: 'majuli',
    name: 'Majuli Riverine Island Settlement',
    region: 'Brahmaputra Flood Delta (88m)',
    isolationDays: 78,
    population: 3200,
    urgency: 'Flood Severed',
    urgencyColor: '#f59e0b',
    neededSupplies: 'Water purification, oral rehydration, insulin pods'
  },
  {
    id: 'longewala',
    name: 'Longewala Desert Settlement',
    region: 'Thar Arid Frontier (190m)',
    isolationDays: 14,
    population: 890,
    urgency: 'Extreme Heatwave',
    urgencyColor: '#818cf8',
    neededSupplies: 'IV Saline drips, emergency burn dressings, electrolytes'
  },
  {
    id: 'general_pool',
    name: 'National Emergency Strategic Relief Reserve',
    region: 'Dynamic Disruption Allocation',
    isolationDays: 'Real-time',
    population: 'Multi-Settlement',
    urgency: 'Automated Dispatch',
    urgencyColor: '#10b981',
    neededSupplies: 'Dispatched autonomously by AI Risk Engine based on active cutoff alerts'
  }
];

const MedicalSupplyFundingPage = () => {
  const { isDark } = useTheme();

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    donorType: 'INDIVIDUAL',
    organizationName: '',
    password: '',
    confirmPassword: '',
    anonymousDonation: false,
    receiveTelemetryUpdates: true
  });

  // Funding Mission State
  const [selectedSettlement, setSelectedSettlement] = useState(targetSettlements[0]);
  const [selectedKit, setSelectedKit] = useState(medicalKitPresets[1]);
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD'
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'CARD' | 'NETBANKING' | 'CSR_WIRE'

  // Submission / Receipt State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedCertificate, setGeneratedCertificate] = useState(null);
  const [validationError, setValidationError] = useState('');

  const currentAmount = customAmount
    ? Number(customAmount)
    : currency === 'INR' ? selectedKit.priceINR : selectedKit.priceUSD;

  // Impact Calculations
  const calculatedImpact = Math.max(1, Math.round(
    currency === 'INR'
      ? (currentAmount / 2500) * 15
      : (currentAmount / 30) * 15
  ));

  const calculatedWeightKg = Math.max(1, (
    currency === 'INR'
      ? (currentAmount / 2500) * 4.5
      : (currentAmount / 30) * 4.5
  ).toFixed(1));

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setValidationError('');
  };

  const handleRegisterAndFund = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setValidationError('Please enter your full name or registered donor title.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Please provide a valid official email address for dispatch receipts.');
      return;
    }
    if (currentAmount <= 0) {
      setValidationError('Please select or specify a valid funding amount.');
      return;
    }

    // Generate Mission Dispatch Certificate
    const certId = `MED-RELIEF-${Math.floor(100000 + Math.random() * 900000)}`;
    const droneFlightId = `UAV-MISSION-${Math.floor(10 + Math.random() * 90)}`;

    setGeneratedCertificate({
      certId,
      droneFlightId,
      donorName: formData.anonymousDonation ? 'Anonymous Humanitarian Donor' : formData.fullName,
      email: formData.email,
      settlement: selectedSettlement.name,
      amount: currentAmount,
      currency,
      packageTitle: customAmount ? 'Custom Relief Supply Sponsorship' : selectedKit.title,
      patientsHelped: calculatedImpact,
      weightKg: calculatedWeightKg,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      taxExemptionCode: `SEC80G-RELIEF-IND-${Math.floor(1000 + Math.random() * 9000)}`
    });

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '1.75rem 2rem' }}>
      {/* Hero Header */}
      <div style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.18) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(16, 185, 129, 0.12) 100%)'
          : 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(16, 185, 129, 0.08) 100%)',
        border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(2, 132, 199, 0.3)'}`,
        borderRadius: '20px',
        padding: '2rem 2.25rem',
        marginBottom: '2rem',
        boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.4)' : '0 4px 20px rgba(15, 23, 42, 0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.35)', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '12px' }}>
              <span>❤️ EMERGENCY RELIEF SUPPLY GRID</span>
              <span>•</span>
              <span>100% Tax Deductible (80G / 501c3)</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: isDark ? '#f8fafc' : '#020617', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
              Fund Autonomous Medical Supplies for Isolated Settlements
            </h1>
            <p style={{ fontSize: '0.95rem', color: isDark ? '#cbd5e1' : '#1e293b', margin: '12px 0 0 0', lineHeight: 1.55 }}>
              Register as an individual humanitarian, NGO partner, or CSR donor. Every contribution directly funds cold-chain vaccines, trauma first-aid kits, and autonomous heavy UAV cargo drone flights to villages severed by landslides, monsoons, and extreme terrain.
            </p>
          </div>

          {/* Quick Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            background: isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff',
            padding: '16px',
            borderRadius: '16px',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.8)'}`,
            minWidth: '280px'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                Relief Dispatched
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#38bdf8' }}>1,480 kg</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                Villages Reached
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#10b981' }}>18 Settlements</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                Active UAV Sorties
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#f59e0b' }}>6 Missions</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                Registered Donors
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#a78bfa' }}>342 Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Certificate State */}
      {isSubmitted && generatedCertificate && (
        <div style={{
          background: isDark ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
          border: '2px solid #10b981',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 12px 35px rgba(16, 185, 129, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🎉</span>
            <div>
              <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                MISSION DISPATCH CONFIRMED
              </span>
              <h2 style={{ margin: '4px 0 0 0', fontSize: '1.5rem', fontWeight: 900, color: isDark ? '#f8fafc' : '#020617' }}>
                Thank You, {generatedCertificate.donorName}!
              </h2>
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: isDark ? '#cbd5e1' : '#1e293b', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            Your registration and funding pledge has been officially allocated to the emergency relief grid. An autonomous cargo UAV has been staged to deliver your sponsored medical package to <strong>{generatedCertificate.settlement}</strong>.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            background: isDark ? 'rgba(7, 11, 20, 0.8)' : '#f8fafc',
            padding: '1.25rem',
            borderRadius: '12px',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'}`,
            marginBottom: '1.5rem'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Tracking Dispatch ID</div>
              <strong style={{ color: '#38bdf8', fontSize: '0.95rem' }}>{generatedCertificate.certId}</strong>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Assigned UAV Flight</div>
              <strong style={{ color: '#10b981', fontSize: '0.95rem' }}>{generatedCertificate.droneFlightId}</strong>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Funded Amount</div>
              <strong style={{ color: isDark ? '#f8fafc' : '#020617', fontSize: '0.95rem' }}>
                {generatedCertificate.currency === 'INR' ? '₹' : '$'}{generatedCertificate.amount.toLocaleString()}
              </strong>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Patients Assisted</div>
              <strong style={{ color: '#f59e0b', fontSize: '0.95rem' }}>~{generatedCertificate.patientsHelped} Villagers</strong>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Tax Exemption Code</div>
              <strong style={{ color: '#818cf8', fontSize: '0.85rem' }}>{generatedCertificate.taxExemptionCode}</strong>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Timestamp</div>
              <span style={{ fontSize: '0.78rem', color: isDark ? '#cbd5e1' : '#1e293b' }}>{generatedCertificate.date}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => window.print()}
              style={{
                background: '#0284c7',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              🖨️ Print Relief Contribution Certificate
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setGeneratedCertificate(null);
              }}
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
                color: isDark ? '#f8fafc' : '#0f172a',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '8px 16px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              ← Fund Another Mission
            </button>
          </div>
        </div>
      )}

      {/* Main Workflow: Registration (Left) + Mission Selection & Funding (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.25fr)',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* LEFT COLUMN: User Registration & Donor Profile */}
        <div style={{
          background: isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff',
          border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.25)' : '#cbd5e1'}`,
          borderRadius: '18px',
          padding: '1.75rem',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 4px 16px rgba(15, 23, 42, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '1.4rem' }}>📝</span>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#f8fafc' : '#020617', margin: 0 }}>
                Step 1: Donor Registration
              </h2>
              <p style={{ margin: 0, fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                Create your account to track delivery telemetry and receive tax receipts.
              </p>
            </div>
          </div>

          <form onSubmit={handleRegisterAndFund}>
            {/* Donor Classification */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: isDark ? '#e2e8f0' : '#0f172a' }}>
                Donor Category / Organization Type *
              </label>
              <select
                name="donorType"
                value={formData.donorType}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  background: isDark ? '#0b1120' : '#ffffff',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'}`,
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <option value="INDIVIDUAL">Individual Humanitarian Donor</option>
                <option value="NGO">NGO / Non-Profit Relief Organization</option>
                <option value="CSR">Corporate CSR Partner Foundation</option>
                <option value="HEALTHCARE">Hospital / Medical Network</option>
                <option value="GOVERNMENT">Disaster Agency Liaison (NDRF / SDMA)</option>
              </select>
            </div>

            {/* Full Name */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: isDark ? '#e2e8f0' : '#0f172a' }}>
                Full Name / Contact Lead *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Dr. Priya Sharma / Alex Vance"
                required
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  background: isDark ? '#0b1120' : '#ffffff',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'}`,
                  fontSize: '0.85rem'
                }}
              />
            </div>

            {/* Email & Phone Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: isDark ? '#e2e8f0' : '#0f172a' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="donor@example.org"
                  required
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: isDark ? '#0b1120' : '#ffffff',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'}`,
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: isDark ? '#e2e8f0' : '#0f172a' }}>
                  Phone / WhatsApp (Updates)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: isDark ? '#0b1120' : '#ffffff',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'}`,
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            {/* Organization Name (if CSR or NGO) */}
            {['NGO', 'CSR', 'HEALTHCARE', 'GOVERNMENT'].includes(formData.donorType) && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: isDark ? '#e2e8f0' : '#0f172a' }}>
                  Organization / Entity Name
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="e.g. Apex Health Foundation / Rotary Club"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: isDark ? '#0b1120' : '#ffffff',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'}`,
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            )}

            {/* Password Credentials */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: isDark ? '#e2e8f0' : '#0f172a' }}>
                  Create Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: isDark ? '#0b1120' : '#ffffff',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'}`,
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: isDark ? '#e2e8f0' : '#0f172a' }}>
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: isDark ? '#0b1120' : '#ffffff',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'}`,
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: isDark ? '#cbd5e1' : '#1e293b', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="receiveTelemetryUpdates"
                  checked={formData.receiveTelemetryUpdates}
                  onChange={handleInputChange}
                />
                <span>Receive live UAV flight telemetry and village delivery confirmation alerts</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: isDark ? '#cbd5e1' : '#1e293b', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="anonymousDonation"
                  checked={formData.anonymousDonation}
                  onChange={handleInputChange}
                />
                <span>Make contribution anonymous on the public donor recognition board</span>
              </label>
            </div>

            {validationError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                color: '#fca5a5',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                marginBottom: '1rem'
              }}>
                ⚠️ {validationError}
              </div>
            )}

            {/* Payment Method Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: isDark ? '#e2e8f0' : '#0f172a' }}>
                Payment / Contribution Method
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {[
                  { id: 'UPI', label: '📱 Instant UPI' },
                  { id: 'CARD', label: '💳 Card' },
                  { id: 'NETBANKING', label: '🏛️ NetBanking' },
                  { id: 'CSR_WIRE', label: '🏢 CSR Wire' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    style={{
                      background: paymentMethod === m.id ? '#0284c7' : isDark ? 'rgba(255, 255, 255, 0.06)' : '#f1f5f9',
                      color: paymentMethod === m.id ? '#fff' : isDark ? '#cbd5e1' : '#0f172a',
                      border: `1px solid ${paymentMethod === m.id ? '#0284c7' : isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'}`,
                      borderRadius: '8px',
                      padding: '8px 4px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: '1px solid rgba(16, 185, 129, 0.5)',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '0.95rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 18px rgba(16, 185, 129, 0.4)'
              }}
            >
              <span>❤️ Register & Fund Mission: {currency === 'INR' ? '₹' : '$'}{currentAmount.toLocaleString()}</span>
              <span>→</span>
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Supply Mission & Impact Calculator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Section A: Target Settlement Selection */}
          <div style={{
            background: isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.25)' : '#cbd5e1'}`,
            borderRadius: '18px',
            padding: '1.5rem',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 4px 16px rgba(15, 23, 42, 0.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.25rem' }}>📍</span>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: isDark ? '#f8fafc' : '#020617' }}>
                  Step 2: Choose Target Settlement
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Real-time Cutoff Grid</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {targetSettlements.map((settlement) => {
                const isSelected = selectedSettlement.id === settlement.id;
                return (
                  <div
                    key={settlement.id}
                    onClick={() => setSelectedSettlement(settlement)}
                    style={{
                      background: isSelected ? 'rgba(56, 189, 248, 0.12)' : isDark ? 'rgba(11, 17, 32, 0.6)' : '#f8fafc',
                      border: `1.5px solid ${isSelected ? '#38bdf8' : isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ color: isDark ? '#f8fafc' : '#020617', fontSize: '0.85rem' }}>
                          {settlement.name}
                        </strong>
                        <span style={{
                          background: `${settlement.urgencyColor}22`,
                          color: settlement.urgencyColor,
                          border: `1px solid ${settlement.urgencyColor}55`,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontSize: '0.65rem',
                          fontWeight: 700
                        }}>
                          {settlement.urgency}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                        {settlement.region} • Cutoff: {settlement.isolationDays} days/yr • Pop: {settlement.population}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#38bdf8', marginTop: '2px' }}>
                        Urgent Need: {settlement.neededSupplies}
                      </div>
                    </div>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? '#38bdf8' : '#64748b'}`,
                      background: isSelected ? '#38bdf8' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSelected && <span style={{ color: '#0f172a', fontSize: '0.65rem', fontWeight: 900 }}>✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section B: Medical Supply Kit Package */}
          <div style={{
            background: isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.25)' : '#cbd5e1'}`,
            borderRadius: '18px',
            padding: '1.5rem',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 4px 16px rgba(15, 23, 42, 0.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.25rem' }}>📦</span>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: isDark ? '#f8fafc' : '#020617' }}>
                  Step 3: Choose Relief Package
                </h3>
              </div>

              {/* Currency Toggle */}
              <div style={{
                display: 'flex',
                background: isDark ? 'rgba(0, 0, 0, 0.4)' : '#f1f5f9',
                borderRadius: '6px',
                padding: '2px'
              }}>
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  style={{
                    background: currency === 'INR' ? '#0284c7' : 'transparent',
                    color: currency === 'INR' ? '#fff' : '#94a3b8',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ₹ INR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  style={{
                    background: currency === 'USD' ? '#0284c7' : 'transparent',
                    color: currency === 'USD' ? '#fff' : '#94a3b8',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  $ USD
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '12px' }}>
              {medicalKitPresets.map((kit) => {
                const isSelected = selectedKit.id === kit.id && !customAmount;
                const cost = currency === 'INR' ? `₹${kit.priceINR.toLocaleString()}` : `$${kit.priceUSD}`;
                return (
                  <div
                    key={kit.id}
                    onClick={() => {
                      setSelectedKit(kit);
                      setCustomAmount('');
                    }}
                    style={{
                      background: isSelected ? 'rgba(16, 185, 129, 0.15)' : isDark ? 'rgba(11, 17, 32, 0.6)' : '#f8fafc',
                      border: `1.5px solid ${isSelected ? '#10b981' : isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1.5rem' }}>{kit.icon}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#10b981' }}>{cost}</span>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.82rem', color: isDark ? '#f8fafc' : '#020617', marginTop: '6px' }}>
                        {kit.title}
                      </div>
                      <p style={{ fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#64748b', margin: '4px 0', lineHeight: 1.35 }}>
                        {kit.description}
                      </p>
                    </div>

                    <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0'}`, display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem' }}>
                      <span style={{ color: '#38bdf8' }}>~{kit.patientsImpacted} Patients</span>
                      <span style={{ color: '#f59e0b' }}>{kit.weightKg} kg Payload</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Amount Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: isDark ? '#cbd5e1' : '#1e293b' }}>
                Or Enter Custom Relief Sponsorship Amount ({currency}):
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  min="100"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder={`e.g. ${currency === 'INR' ? '50000' : '500'}`}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: isDark ? '#0b1120' : '#ffffff',
                    color: isDark ? '#f8fafc' : '#020617',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'}`,
                    fontSize: '0.85rem'
                  }}
                />
                {customAmount && (
                  <button
                    type="button"
                    onClick={() => setCustomAmount('')}
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#f87171',
                      border: '1px solid #ef4444',
                      borderRadius: '8px',
                      padding: '0 12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section C: Live AI Mission Impact Meter */}
          <div style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(2, 132, 199, 0.15) 100%)'
              : 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(2, 132, 199, 0.08) 100%)',
            border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.35)' : 'rgba(16, 185, 129, 0.4)'}`,
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ⚡ Real-time Mission Impact Projection
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: isDark ? '#f8fafc' : '#020617', marginTop: '2px' }}>
                Helps ~{calculatedImpact} Villagers in {selectedSettlement.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#475569', marginTop: '2px' }}>
                Payload: {calculatedWeightKg} kg • Assigned Mode: Heavy Cargo Drone (UAV) • ETA: &lt; 3.5 Hours
              </div>
            </div>

            <div style={{
              background: isDark ? 'rgba(15, 23, 42, 0.9)' : '#ffffff',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '10px',
              padding: '8px 16px',
              textAlign: 'right'
            }}>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Total Allocation</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#10b981' }}>
                {currency === 'INR' ? '₹' : '$'}{currentAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalSupplyFundingPage;
