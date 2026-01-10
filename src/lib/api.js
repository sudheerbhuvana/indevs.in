/**
 * API Service for Backend Communication
 * Handles all HTTP requests to the backend with authentication
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Make authenticated API request
 */
async function apiRequest(endpoint, options = {}) {
    const config = {
        ...options,
        credentials: 'include', // Send cookies for session authentication
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, config);

        // Handle authentication errors
        if (response.status === 401) {
            // Redirect to login if unauthorized
            window.location.href = '/login';
            throw new Error('Unauthorized - please log in');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

// ==================== AUTH ENDPOINTS ====================

export const authAPI = {
    /**
     * Get current user info
     */
    getCurrentUser: async () => {
        return apiRequest('/auth/user');
    },

    /**
     * Logout current user
     */
    logout: async () => {
        return apiRequest('/auth/logout', { method: 'POST' });
    },
};

// ==================== SUBDOMAIN ENDPOINTS ====================

export const subdomainAPI = {
    /**
     * Get all subdomains for current user
     * @param {boolean} includeDeleted - Include soft-deleted subdomains
     */
    list: async (includeDeleted = false) => {
        const query = includeDeleted ? '?includeDeleted=true' : '';
        return apiRequest(`/subdomains${query}`);
    },

    /**
     * Check if a subdomain name is available
     * @param {string} name - The subdomain name to check
     */
    checkAvailability: async (name) => {
        return apiRequest(`/subdomains/check/${name}`);
    },

    /**
     * Create new subdomain
     * @param {Object} data - { name, recordType, recordValue }
     */
    create: async (data) => {
        return apiRequest('/subdomains', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * Renew a subdomain
     * @param {string} id - Subdomain ID
     */
    renew: async (id) => {
        return apiRequest(`/subdomains/${id}/renew`, {
            method: 'POST',
        });
    },

    /**
     * Soft delete a subdomain
     * @param {string} id - Subdomain ID
     */
    delete: async (id) => {
        return apiRequest(`/subdomains/${id}`, {
            method: 'DELETE',
        });
    },

    /**
     * Restore a soft-deleted subdomain
     * @param {string} id - Subdomain ID
     */
    restore: async (id) => {
        return apiRequest(`/subdomains/${id}/restore`, {
            method: 'POST',
        });
    },

    /**
     * Update subdomain (if endpoint exists)
     * @param {string} id - Subdomain ID  
     * @param {Object} data - Update data
     */
    update: async (id, data) => {
        return apiRequest(`/subdomains/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },

    /**
     * Get user activity/history
     */
    getActivity: async () => {
        return apiRequest('/subdomains/activity');
    },

    // Nameservers
    updateNameservers: (id, nameservers, recordType) =>
        apiRequest(`/subdomains/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                recordValue: Array.isArray(nameservers) ? nameservers.join(', ') : nameservers,
                recordType: recordType || 'NS'
            })
        }),

    // Generic methods for custom endpoints
    post: async (endpoint, data) => {
        return apiRequest(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    get: async (endpoint) => {
        return apiRequest(endpoint);
    },
};

export const API = {
    auth: authAPI,
    subdomains: subdomainAPI
};
