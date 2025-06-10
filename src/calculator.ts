/**
 * INCA Rewards Calculator - Core calculation functions
 */

import {
  CERTIFIED_REWARDS,
  LICENSE_FEES,
  INCOME_SHARES
} from './constants';

import {
  NodeConfig,
  IncaRewards,
  IncomeDistribution,
} from './types';

/**
 * Calculate annual INCA rewards for a single node based on its configuration
 * 
 * @param nodeConfig The node configuration parameters
 * @returns The annual INCA rewards breakdown by resource type
 */
export function calculateAnnualIncaRewards(nodeConfig: NodeConfig): IncaRewards {
  const { gb_mem, tb_ssd, tb_hdd, tb_network } = nodeConfig;
  
  // Calculate annual INCA rewards by resource type
  const mem_inca_rewards = gb_mem * CERTIFIED_REWARDS.MEM_PER_GB_MONTH * 12;
  const ssd_inca_rewards = tb_ssd * CERTIFIED_REWARDS.SSD_PER_TB_MONTH * 12;
  const hdd_inca_rewards = tb_hdd * CERTIFIED_REWARDS.HDD_PER_TB_MONTH * 12;
  const network_inca_rewards = tb_network * CERTIFIED_REWARDS.NETWORK_PER_TB_MONTH * 12;
  
  // Calculate total annual INCA rewards
  const total_inca_rewards = 
    mem_inca_rewards +
    ssd_inca_rewards +
    hdd_inca_rewards +
    network_inca_rewards;
  
  return {
    mem_inca_rewards,
    ssd_inca_rewards,
    hdd_inca_rewards,
    network_inca_rewards,
    total_inca_rewards
  };
}

/**
 * Calculate the license fee for a node
 * 
 * @param tb_ssd Terabytes of SSD storage
 * @param tb_hdd Terabytes of HDD storage
 * @returns The total license fee in EUR
 */
export function calculateNodeLicenseFee(nodeConfig: NodeConfig): number {
  const { gb_mem, tb_ssd, tb_hdd } = nodeConfig;
  return LICENSE_FEES.SETUP + tb_ssd * LICENSE_FEES.SSD_PER_TB + tb_hdd * LICENSE_FEES.HDD_PER_TB + gb_mem * LICENSE_FEES.MEM_PER_GB;
}


/**
 * Calculate income distribution for a node at a specific INCA price
 * 
 * @param total_inca_rewards_annual Total annual INCA rewards
 * @param inca_price_eur INCA price in EUR
 * @returns Income distribution breakdown in EUR
 */
export function calculateIncomePerNode(
  total_inca_rewards_annual: number, 
  inca_price_eur: number
): IncomeDistribution {
  // Calculate total annual income in EUR
  const total_income_eur_annual = total_inca_rewards_annual * inca_price_eur;
  
  // Calculate income distribution based on shares
  const farmer_income_eur_annual = total_income_eur_annual * INCOME_SHARES.FARMER;
  const farming_pool_income_eur_annual = total_income_eur_annual * INCOME_SHARES.FARMING_POOL;
  const threefold_income_eur_annual = total_income_eur_annual * INCOME_SHARES.THREEFOLD;
  
  return {
    inca_price_eur,
    total_income_eur: total_income_eur_annual,
    farmer_income_eur: farmer_income_eur_annual,
    farming_pool_income_eur: farming_pool_income_eur_annual,
    threefold_income_eur: threefold_income_eur_annual
  };
}





