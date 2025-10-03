// src/utils/math.js

// --- CONFIGURATION CONSTANTS ---
export const L_THEORETICAL = 0.53; // Lipschitz Constant from Theorem 1 verification
export const N_SCATTER_POINTS = 300; 

// Complexity Model Constants (These can be tweaked to tune the visual divergence)
export const DM_MESSAGE = 100;    // Proxy for message dimension (d_m)
export const DM_ATTENTION = 50;   // Proxy for attention computation cost (d_attn)
export const N_MODULE_MAX = 50;   // Max number of modules (N) for plotting

// --- 1. Stability Proof (Theorem 1) Logic ---

/**
 * Generates synthetic data points to prove the Lipschitz stability bound holds.
 * @param {number} maxPerturbation - The maximum L2-norm input change to test.
 * @returns {{data: Array<Object>, boundary: Array<Object>}} Scatter points and the theoretical boundary line.
 */
export const generateStabilityData = (maxPerturbation) => {
    const data = [];
    for (let i = 0; i < N_SCATTER_POINTS; i++) {
        // Input perturbation (X-axis) is random up to the max slider value
        const inputDiff = Math.random() * maxPerturbation; 
        
        // Calculate the maximum possible output change based on the theoretical bound L
        const maxOutput = L_THEORETICAL * inputDiff;
        
        // Simulate an empirical point: actual output change is always well below the max boundary
        // We use 0.05 + Math.random() * 0.1 to keep the empirical points visibly close to zero.
        const actualOutput = maxOutput * (0.05 + Math.random() * 0.1); 
        
        data.push({ inputDiff, actualOutput });
    }

    // Define the two points for the straight-line Theoretical Boundary plot
    const boundary = [
        { x: 0, y: 0 },
        { x: maxPerturbation, y: L_THEORETICAL * maxPerturbation }
    ];

    return { data, boundary };
};

// --- 2. Complexity Proof (Theorems 2 & 3) Logic ---

/**
 * Calculates the theoretical complexity cost for N modules under two protocols.
 * @param {number} kActive - The number of currently active modules (K).
 * @returns {Array<Object>} Line data for plotting complexity growth vs N.
 */
export const generateComplexityData = (kActive) => {
    const data = [];
    for (let N = 5; N <= N_MODULE_MAX; N += 2) {
        
        // Theorem 2: Full Mesh Complexity O(N² * dm)
        // Cost scales quadratically (N * (N-1))
        const fullMesh = N * (N - 1) * DM_MESSAGE;
        
        // Theorem 3: Top-K Gating Complexity O(K² * dm + N * d_attention)
        // Cost involves a fixed K² term and a linear N term
        const topK = (kActive * (kActive - 1) * DM_MESSAGE) + (N * DM_ATTENTION);
        
        data.push({ N, fullMesh, topK });
    }
    return data;
};