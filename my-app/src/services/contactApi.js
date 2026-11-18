
const API_URL = import.meta.env.VITE_API_URL;

export async function submitContactForm(formData) {
  if (!API_URL) {
    throw new Error(
      'The contact service is not configured yet. Please contact us directly by email.'
    );
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    const response = await fetch(
      `${API_URL.replace(/\/$/, '')}/api/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      }
    );

    let result = {};

    try {
      result = await response.json();
    } catch {
      // Handle non-JSON responses.
    }

    if (!response.ok) {
      throw new Error(
        result.message ||
        'Unable to send your enquiry. Please try again.'
      );
    }

    return result;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(
        'The request timed out. Please try again.'
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
