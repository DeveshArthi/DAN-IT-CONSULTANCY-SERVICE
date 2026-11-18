const API_BASE = (
  import.meta.env.VITE_API_URL || ''
).replace(/\/$/, '');

let csrfToken = '';

export function setCsrfToken(token) {
  csrfToken = token || '';
}

export async function adminRequest(
  path,
  { method = 'GET', body } = {}
) {
  const response = await fetch(
    `${API_BASE}/api/admin${path}`,
    {
      method,
      credentials: 'include',
      headers: {
        ...(body !== undefined
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...(!['GET', 'HEAD'].includes(method) && csrfToken
          ? { 'X-CSRF-Token': csrfToken }
          : {}),
      },
      ...(body !== undefined
        ? { body: JSON.stringify(body) }
        : {}),
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      result.message || 'Request failed.'
    );
    error.status = response.status;
    throw error;
  }

  return result;
}

export async function initializeCsrf() {
  const result = await adminRequest('/auth/csrf');
  setCsrfToken(result.csrfToken);
  return result.csrfToken;
}

export const adminApi = {
  login: (email, password) =>
    adminRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    }),

  me: () => adminRequest('/auth/me'),

  logout: () =>
    adminRequest('/auth/logout', {
      method: 'POST',
    }),

  stats: () => adminRequest('/stats'),

  enquiries: (params) =>
    adminRequest(`/enquiries?${params.toString()}`),

  enquiry: (id) =>
    adminRequest(`/enquiries/${encodeURIComponent(id)}`),

  updateStatus: (id, status) =>
    adminRequest(
      `/enquiries/${encodeURIComponent(id)}/status`,
      {
        method: 'PATCH',
        body: { status },
      }
    ),
};
