/**
 * INCA Rewards Calculator - Input validation
 */

import { NodeConfig, ValidationResult } from './types';
import { MIN_REQUIREMENTS, MIN_UPTIME_PERCENTAGE } from './constants';



/**
 * Validates uptime percentage against minimum requirements for rewards
 * 
 * @param uptimePercentage The node's uptime percentage
 * @returns Validation result with error messages if invalid
 */
export function validateUptimePercentage(uptimePercentage: number): ValidationResult {
  if (uptimePercentage < MIN_UPTIME_PERCENTAGE) {
    return { 
      isValid: false, 
      message: `The node must have an uptime of at least ${MIN_UPTIME_PERCENTAGE}% to receive rewards (provided: ${uptimePercentage}%)`
    };
  }
  
  if (uptimePercentage > 100) {
    return { 
      isValid: false, 
      message: `Uptime percentage cannot exceed 100% (provided: ${uptimePercentage}%)`
    };
  }
  
  return { isValid: true, message: "" };
}

/**
 * Validates a node configuration against minimum requirements
 * 
 * @param nodeConfig Node configuration to validate
 * @returns Validation result with error messages if invalid
 */
export function validateNodeConfig(nodeConfig: NodeConfig): ValidationResult {
  const { gb_mem, tb_ssd, tb_hdd, cpu_passmark } = nodeConfig;

  // Check minimum memory requirement
  if (gb_mem < MIN_REQUIREMENTS.GB_MEM) {
    return { 
      isValid: false, 
      message: `Memory must be at least ${MIN_REQUIREMENTS.GB_MEM} GB (provided: ${gb_mem} GB)`
    };
  }

  // Check minimum SSD requirement
  if (tb_ssd < MIN_REQUIREMENTS.TB_SSD_COUNT) {
    return { 
      isValid: false, 
      message: `SSD storage must be at least ${MIN_REQUIREMENTS.TB_SSD_COUNT} TB (provided: ${tb_ssd} TB)`
    };
  }

  // Check CPU passmark requirement if provided
  if (cpu_passmark !== undefined) {
    const minRequiredPassmark = gb_mem * MIN_REQUIREMENTS.CPU_PASSMARK_PER_GB_MEM;
    if (cpu_passmark < minRequiredPassmark) {
      return { 
        isValid: false, 
        message: `CPU passmark must be at least ${minRequiredPassmark} for ${gb_mem} GB memory ` +
                 `(${MIN_REQUIREMENTS.CPU_PASSMARK_PER_GB_MEM} per GB) - provided: ${cpu_passmark}`
      };
    }
  }

  // Check for negative values
  if (gb_mem <= 0) {
    return { 
      isValid: false, 
      message: 'Memory (gb_mem) must be positive'
    };
  }

  if (tb_ssd <= 0) {
    return { 
      isValid: false, 
      message: 'SSD storage (tb_ssd) must be positive'
    };
  }

  if (tb_hdd < 0) {
    return { 
      isValid: false, 
      message: 'HDD storage (tb_hdd) cannot be negative'
    };
  }

  if (nodeConfig.tb_network < 0) {
    return { 
      isValid: false, 
      message: 'Network capacity (tb_network) cannot be negative'
    };
  }

  return { isValid: true, message: "" };
}
