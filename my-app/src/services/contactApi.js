const API_BASE = import.meta.env.DEV
  ? 'http://localhost:5000'
  : '';

export async function submitContactForm(formData) {
  const response = await fetch(
    `${API_BASE}/api/contact`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message || 'Unable to submit your enquiry.'
    );
  }

  return result;
}
