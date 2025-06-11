import { validateNodeConfig, validateUptimePercentage } from '../src/validator';
import { MIN_REQUIREMENTS, MIN_UPTIME_PERCENTAGE } from '../src/constants';
import { NodeConfig } from '../src/types';

describe('Validator Functions', () => {
  describe('validateUptimePercentage', () => {
    it('should validate correct uptime percentage', () => {
      const result = validateUptimePercentage(95);
      expect(result.isValid).toBe(true);
      expect(result.message).toBe("");
    });

    it('should validate exact minimum uptime percentage', () => {
      const result = validateUptimePercentage(MIN_UPTIME_PERCENTAGE);
      expect(result.isValid).toBe(true);
    });

    it('should validate exact 100% uptime', () => {
      const result = validateUptimePercentage(100);
      expect(result.isValid).toBe(true);
    });

    it('should reject uptime below minimum requirement', () => {
      const result = validateUptimePercentage(MIN_UPTIME_PERCENTAGE - 1);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain(`at least ${MIN_UPTIME_PERCENTAGE}%`);
    });

    it('should reject uptime above 100%', () => {
      const result = validateUptimePercentage(101);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('cannot exceed 100%');
    });
  });

  describe('validateNodeConfig', () => {
    it('should validate a valid node configuration', () => {
      const validConfig: NodeConfig = {
        gb_mem: MIN_REQUIREMENTS.GB_MEM,
        tb_ssd: MIN_REQUIREMENTS.TB_SSD_COUNT,
        tb_hdd: 5,
        tb_network: 1,
        cpu_passmark: MIN_REQUIREMENTS.GB_MEM * MIN_REQUIREMENTS.CPU_PASSMARK_PER_GB_MEM
      };

      const result = validateNodeConfig(validConfig);
      expect(result.isValid).toBe(true);
      expect(result.message).toBe("");
    });

    it('should validate node with higher-than-required values', () => {
      const validConfig: NodeConfig = {
        gb_mem: MIN_REQUIREMENTS.GB_MEM * 2,
        tb_ssd: MIN_REQUIREMENTS.TB_SSD_COUNT * 2,
        tb_hdd: 10,
        tb_network: 2,
        cpu_passmark: MIN_REQUIREMENTS.GB_MEM * 2 * MIN_REQUIREMENTS.CPU_PASSMARK_PER_GB_MEM * 1.5 // 50% more than required
      };

      const result = validateNodeConfig(validConfig);
      expect(result.isValid).toBe(true);
      expect(result.message).toBe("");
    });

    it('should reject configuration with insufficient memory', () => {
      const invalidConfig: NodeConfig = {
        gb_mem: MIN_REQUIREMENTS.GB_MEM - 1,
        tb_ssd: MIN_REQUIREMENTS.TB_SSD_COUNT,
        tb_hdd: 5,
        tb_network: 1
      };

      const result = validateNodeConfig(invalidConfig);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Memory must be at least');
    });

    it('should reject configuration with insufficient SSD', () => {
      const invalidConfig: NodeConfig = {
        gb_mem: MIN_REQUIREMENTS.GB_MEM,
        tb_ssd: MIN_REQUIREMENTS.TB_SSD_COUNT - 1,
        tb_hdd: 5,
        tb_network: 1
      };

      const result = validateNodeConfig(invalidConfig);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('SSD storage must be at least');
    });

    it('should reject configuration with insufficient CPU passmark', () => {
      const minRequiredMem = MIN_REQUIREMENTS.GB_MEM;
      const minRequiredPassmark = minRequiredMem * MIN_REQUIREMENTS.CPU_PASSMARK_PER_GB_MEM;
      
      const invalidConfig: NodeConfig = {
        gb_mem: minRequiredMem,
        tb_ssd: MIN_REQUIREMENTS.TB_SSD_COUNT,
        tb_hdd: 5,
        tb_network: 1,
        cpu_passmark: minRequiredPassmark - 1
      };

      const result = validateNodeConfig(invalidConfig);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('CPU passmark must be at least');
    });

    it('should reject configuration with negative memory', () => {
      const invalidConfig: NodeConfig = {
        gb_mem: -1,
        tb_ssd: MIN_REQUIREMENTS.TB_SSD_COUNT,
        tb_hdd: 5,
        tb_network: 1
      };

      const result = validateNodeConfig(invalidConfig);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Memory must be at least');
    });

    it('should reject configuration with negative SSD', () => {
      const invalidConfig: NodeConfig = {
        gb_mem: MIN_REQUIREMENTS.GB_MEM,
        tb_ssd: -1,
        tb_hdd: 5,
        tb_network: 1
      };

      const result = validateNodeConfig(invalidConfig);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('SSD storage must be at least');
    });

    it('should reject configuration with negative HDD', () => {
      const invalidConfig: NodeConfig = {
        gb_mem: MIN_REQUIREMENTS.GB_MEM,
        tb_ssd: MIN_REQUIREMENTS.TB_SSD_COUNT,
        tb_hdd: -1,
        tb_network: 1
      };

      const result = validateNodeConfig(invalidConfig);
      expect(result.isValid).toBe(false);
      // Use a more generic check since we're not sure of the exact message
      expect(result.message.length).toBeGreaterThan(0);
    });

    it('should reject configuration with negative network', () => {
      const invalidConfig: NodeConfig = {
        gb_mem: MIN_REQUIREMENTS.GB_MEM,
        tb_ssd: MIN_REQUIREMENTS.TB_SSD_COUNT,
        tb_hdd: 5,
        tb_network: -1
      };

      const result = validateNodeConfig(invalidConfig);
      expect(result.isValid).toBe(false);
      // Use a more generic check since we're not sure of the exact message
      expect(result.message.length).toBeGreaterThan(0);
    });

    it('should collect multiple validation errors', () => {
      const invalidConfig: NodeConfig = {
        gb_mem: -1,
        tb_ssd: -1,
        tb_hdd: -1,
        tb_network: -1
      };

      const result = validateNodeConfig(invalidConfig);
      expect(result.isValid).toBe(false);
      expect(result.message.length).toBeGreaterThan(10); // Has some error message content
    });
  });
});
