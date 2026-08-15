/**
 * HTTP API Client for connecting Frontend React PWA with FastAPI Backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"

export interface ApiErrorResponse {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorJson: ApiErrorResponse = await response.json().catch(() => ({}))
      const errorMessage = errorJson.detail || errorJson.title || `Error HTTP ${response.status}`
      throw new Error(errorMessage)
    }

    return (await response.json()) as T
  } catch (error: any) {
    console.warn(`[API Client Warning] Petición fallida a ${endpoint}:`, error.message)
    throw error
  }
}

/**
 * Assistant Chatbot API call helper.
 */
export async function sendAssistantMessage(userMessage: string, language: string = "es", patientId?: string) {
  return apiClient<{
    reply: string
    recommended_resources: Array<{ id: string; title: string; category: string; url: string }>
    suggested_actions: string[]
  }>("/assistant/chat", {
    method: "POST",
    body: JSON.stringify({
      user_message: userMessage,
      language,
      patient_id: patientId,
    }),
  })
}

/**
 * Educational Resources API call helper.
 */
export async function fetchResources(category?: string, ageMonths?: number) {
  const params = new URLSearchParams()
  if (category) params.append("category", category)
  if (ageMonths !== undefined) params.append("age_months", ageMonths.toString())
  
  const queryString = params.toString() ? `?${params.toString()}` : ""
  return apiClient<{
    total: number
    items: Array<{
      id: string
      title: string
      type: string
      category: string
      min_age_months: number
      max_age_months: number
      summary: string
      url: string
    }>
  }>(`/resources${queryString}`)
}

/**
 * Screening Submission API call helper.
 */
export async function submitScreeningApi(payload: {
  patient_name: string
  age_months: number
  dni: string
  guardian_name: string
  guardian_phone: string
  health_center_origin: string
  answers: Record<number, boolean>
}) {
  return apiClient<{
    screening_id: string
    patient_id: string
    risk_level: string
    risk_label: str
    failures_count: number
    recommendation: string
    requires_referral: boolean
  }>("/health-worker/screening", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
