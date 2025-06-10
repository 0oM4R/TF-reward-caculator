/**
 * INCA Rewards Calculator - Constants
 */

// Core constants as defined in the requirements
export const LICENSE_FEES = {
  SETUP: 3, // EUR
  SSD_PER_TB: 10, // EUR
  HDD_PER_TB: 4, // EUR
  MEM_PER_GB: 3, // EUR
};

// Reward constants
export const CERTIFIED_REWARDS = {
  MEM_PER_GB_MONTH: 8.0, // INCA
  SSD_PER_TB_MONTH: 31.5, // INCA
  HDD_PER_TB_MONTH: 7.0, // INCA
  NETWORK_PER_TB_MONTH: 30.0, // INCA
};

// Minimum requirements
export const MIN_REQUIREMENTS = {
  CPU_PASSMARK_PER_GB_MEM: 200,
  GB_MEM: 16,
  TB_SSD_COUNT: 2, // 2x 1TB SSDs minimum
};

// Income shares
export const INCOME_SHARES = {
  FARMER: 0.60, // 60%
  FARMING_POOL: 0.20, // 20%
  THREEFOLD: 0.20, // 20%
};

// Time periods
export const GUARANTEED_REWARD_MONTHS = 18;
export const INCA_LOCKUP_MONTHS = 24;
