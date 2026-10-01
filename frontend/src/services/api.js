const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';

/**
 * Fetch all registered villages (Objective 03)
 */
export async function getVillages() {
  const response = await fetch(`${API_BASE_URL}/villages`);
  if (!response.ok) throw new Error('Failed to fetch villages');
  return response.json();
}

/**
 * Fetch risk assessment overview (Objective 02)
 */
export async function getRiskAssessment() {
  const response = await fetch(`${API_BASE_URL}/risk/assessment`);
  if (!response.ok) throw new Error('Failed to fetch risk assessment');
  return response.json();
}

/**
 * Fetch active delivery routes
 */
export async function getActiveRoutes() {
  const response = await fetch(`${API_BASE_URL}/routing/active`);
  if (!response.ok) throw new Error('Failed to fetch active routes');
  return response.json();
}

/**
 * Optimize route delivery
 */
export async function optimizeRoute(payload) {
  const response = await fetch(`${API_BASE_URL}/routing/optimize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Failed to optimize route');
  return response.json();
}

/**
 * Fetch case-study corridors (Objective 06)
 */
export async function getCorridors() {
  const response = await fetch(`${API_BASE_URL}/corridors`);
  if (!response.ok) throw new Error('Failed to fetch corridors');
  return response.json();
}

/**
 * Fetch multimodal modes & vehicle types (Objective 01)
 */
export async function getMultimodalModes() {
  const response = await fetch(`${API_BASE_URL}/multimodal/modes`);
  if (!response.ok) throw new Error('Failed to fetch multimodal modes');
  return response.json();
}

/**
 * Recommend risk-aware mode (Objective 04)
 */
export async function recommendMode(payload) {
  const response = await fetch(`${API_BASE_URL}/multimodal/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Failed to recommend mode');
  return response.json();
}
