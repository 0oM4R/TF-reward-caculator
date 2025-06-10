/**
 * INCA Rewards Calculator - Input validation
 */

import { NodeConfig, ValidationResult } from './types';
import { MIN_REQUIREMENTS } from './constants';

/**
 * Validates a node configuration against minimum requirements
 * 
 * @param nodeConfig Node configuration to validate
 * @returns Validation result with error messages if invalid
 */
export function validateNodeConfig(nodeConfig: NodeConfig): ValidationResult {
  const { gb_mem, tb_ssd, tb_hdd, cpu_passmark } = nodeConfig;
  const messages: string[] = [];
  let isValid = true;

  // Check minimum memory requirement
  if (gb_mem < MIN_REQUIREMENTS.GB_MEM) {
    messages.push(`Memory must be at least ${MIN_REQUIREMENTS.GB_MEM} GB (provided: ${gb_mem} GB)`);
    isValid = false;
  }

  // Check minimum SSD requirement
  if (tb_ssd < MIN_REQUIREMENTS.TB_SSD_COUNT) {
    messages.push(`SSD storage must be at least ${MIN_REQUIREMENTS.TB_SSD_COUNT} TB (provided: ${tb_ssd} TB)`);
    isValid = false;
  }

  // Check CPU passmark requirement if provided
  if (cpu_passmark !== undefined) {
    const minRequiredPassmark = gb_mem * MIN_REQUIREMENTS.CPU_PASSMARK_PER_GB_MEM;
    if (cpu_passmark < minRequiredPassmark) {
      messages.push(
        `CPU passmark must be at least ${minRequiredPassmark} for ${gb_mem} GB memory ` +
        `(${MIN_REQUIREMENTS.CPU_PASSMARK_PER_GB_MEM} per GB) - provided: ${cpu_passmark}`
      );
      isValid = false;
    }
  }

  // Check for negative values
  if (gb_mem <= 0) {
    messages.push('Memory (gb_mem) must be positive');
    isValid = false;
  }

  if (tb_ssd <= 0) {
    messages.push('SSD storage (tb_ssd) must be positive');
    isValid = false;
  }

  if (tb_hdd < 0) {
    messages.push('HDD storage (tb_hdd) cannot be negative');
    isValid = false;
  }

  if (nodeConfig.tb_network < 0) {
    messages.push('Network capacity (tb_network) cannot be negative');
    isValid = false;
  }

  return { isValid, messages };
}
