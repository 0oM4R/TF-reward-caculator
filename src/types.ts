/**
 * INCA Rewards Calculator - Type Definitions
 */

/**
 * Node configuration parameters
 */
export interface NodeConfig {
  gb_mem: number;          // Gigabytes of Memory
  tb_ssd: number;          // Terabytes of SSD storage
  tb_hdd: number;          // Terabytes of HDD storage
  tb_network: number;      // Terabytes of Network capacity
  cpu_passmark?: number;   // Optional CPU passmark score
}

/**
 *  INCA rewards breakdown by resource type
 */
export interface IncaRewards {
  mem_inca_rewards: number;
  ssd_inca_rewards: number;
  hdd_inca_rewards: number;
  network_inca_rewards: number;
  total_inca_rewards: number;
}

/**
 * Income distribution for a node at a specific INCA price
 */
export interface IncomeDistribution {
  inca_price_eur: number;
  total_income_eur: number;
  farmer_income_eur: number;
  farming_pool_income_eur: number;
  threefold_income_eur: number;
}


/**
 * Validation result for a node configuration
 */
export interface ValidationResult {
  isValid: boolean;
  message: string;
}
