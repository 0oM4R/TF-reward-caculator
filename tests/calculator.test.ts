import { 
  calculateAnnualIncaRewards, 
  calculateMonthlyIncaRewards, 
  calculateNodeLicenseFee, 
  calculateIncomePerNode 
} from '../src/calculator';
import { CERTIFIED_REWARDS, LICENSE_FEES, INCOME_SHARES } from '../src/constants';
import { NodeConfig } from '../src/types';

// Mock console.warn
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('Calculator Functions', () => {
  beforeEach(() => {
    // Clear mock history
    mockConsoleWarn.mockClear();
  });

  describe('calculateAnnualIncaRewards', () => {
    const validNodeConfig: NodeConfig = {
      gb_mem: 64,
      tb_ssd: 4,
      tb_hdd: 16,
      tb_network: 1
    };

    it('should calculate correct annual rewards with valid uptime', () => {
      const rewards = calculateAnnualIncaRewards(validNodeConfig, 100);
      
      // Expected rewards at 100% uptime
      const expectedMem = validNodeConfig.gb_mem * CERTIFIED_REWARDS.MEM_PER_GB_MONTH * 12;
      const expectedSsd = validNodeConfig.tb_ssd * CERTIFIED_REWARDS.SSD_PER_TB_MONTH * 12;
      const expectedHdd = validNodeConfig.tb_hdd * CERTIFIED_REWARDS.HDD_PER_TB_MONTH * 12;
      const expectedNetwork = validNodeConfig.tb_network * CERTIFIED_REWARDS.NETWORK_PER_TB_MONTH * 12;
      const expectedTotal = expectedMem + expectedSsd + expectedHdd + expectedNetwork;
      
      expect(rewards.mem_inca_rewards).toBeCloseTo(expectedMem);
      expect(rewards.ssd_inca_rewards).toBeCloseTo(expectedSsd);
      expect(rewards.hdd_inca_rewards).toBeCloseTo(expectedHdd);
      expect(rewards.network_inca_rewards).toBeCloseTo(expectedNetwork);
      expect(rewards.total_inca_rewards).toBeCloseTo(expectedTotal);
    });

    it('should adjust rewards based on uptime percentage', () => {
      const uptimePercentage = 95;
      const rewards = calculateAnnualIncaRewards(validNodeConfig, uptimePercentage);
      
      // With 95% uptime, rewards should be 95% of full rewards
      const expectedMem = validNodeConfig.gb_mem * CERTIFIED_REWARDS.MEM_PER_GB_MONTH * 12 * (uptimePercentage / 100);
      const expectedSsd = validNodeConfig.tb_ssd * CERTIFIED_REWARDS.SSD_PER_TB_MONTH * 12 * (uptimePercentage / 100);
      const expectedHdd = validNodeConfig.tb_hdd * CERTIFIED_REWARDS.HDD_PER_TB_MONTH * 12 * (uptimePercentage / 100);
      const expectedNetwork = validNodeConfig.tb_network * CERTIFIED_REWARDS.NETWORK_PER_TB_MONTH * 12 * (uptimePercentage / 100);
      const expectedTotal = expectedMem + expectedSsd + expectedHdd + expectedNetwork;
      
      expect(rewards.mem_inca_rewards).toBeCloseTo(expectedMem);
      expect(rewards.ssd_inca_rewards).toBeCloseTo(expectedSsd);
      expect(rewards.hdd_inca_rewards).toBeCloseTo(expectedHdd);
      expect(rewards.network_inca_rewards).toBeCloseTo(expectedNetwork);
      expect(rewards.total_inca_rewards).toBeCloseTo(expectedTotal);
    });

    it('should return zero rewards for invalid uptime (too low)', () => {
      const rewards = calculateAnnualIncaRewards(validNodeConfig, 80);
      
      expect(rewards.mem_inca_rewards).toBe(0);
      expect(rewards.ssd_inca_rewards).toBe(0);
      expect(rewards.hdd_inca_rewards).toBe(0);
      expect(rewards.network_inca_rewards).toBe(0);
      expect(rewards.total_inca_rewards).toBe(0);
      expect(mockConsoleWarn).toHaveBeenCalled();
    });

    it('should return zero rewards for invalid uptime (too high)', () => {
      const rewards = calculateAnnualIncaRewards(validNodeConfig, 110);
      
      expect(rewards.mem_inca_rewards).toBe(0);
      expect(rewards.ssd_inca_rewards).toBe(0);
      expect(rewards.hdd_inca_rewards).toBe(0);
      expect(rewards.network_inca_rewards).toBe(0);
      expect(rewards.total_inca_rewards).toBe(0);
      expect(mockConsoleWarn).toHaveBeenCalled();
    });
  });

  describe('calculateMonthlyIncaRewards', () => {
    const validNodeConfig: NodeConfig = {
      gb_mem: 64,
      tb_ssd: 4,
      tb_hdd: 16,
      tb_network: 1
    };

    it('should calculate correct monthly rewards with valid uptime', () => {
      const rewards = calculateMonthlyIncaRewards(validNodeConfig, 100);
      
      // Expected rewards at 100% uptime
      const expectedMem = validNodeConfig.gb_mem * CERTIFIED_REWARDS.MEM_PER_GB_MONTH;
      const expectedSsd = validNodeConfig.tb_ssd * CERTIFIED_REWARDS.SSD_PER_TB_MONTH;
      const expectedHdd = validNodeConfig.tb_hdd * CERTIFIED_REWARDS.HDD_PER_TB_MONTH;
      const expectedNetwork = validNodeConfig.tb_network * CERTIFIED_REWARDS.NETWORK_PER_TB_MONTH;
      const expectedTotal = expectedMem + expectedSsd + expectedHdd + expectedNetwork;
      
      expect(rewards.mem_inca_rewards).toBeCloseTo(expectedMem);
      expect(rewards.ssd_inca_rewards).toBeCloseTo(expectedSsd);
      expect(rewards.hdd_inca_rewards).toBeCloseTo(expectedHdd);
      expect(rewards.network_inca_rewards).toBeCloseTo(expectedNetwork);
      expect(rewards.total_inca_rewards).toBeCloseTo(expectedTotal);
    });

    it('should adjust monthly rewards based on uptime percentage', () => {
      const uptimePercentage = 95;
      const rewards = calculateMonthlyIncaRewards(validNodeConfig, uptimePercentage);
      
      // With 95% uptime, rewards should be 95% of full rewards
      const expectedMem = validNodeConfig.gb_mem * CERTIFIED_REWARDS.MEM_PER_GB_MONTH * (uptimePercentage / 100);
      const expectedSsd = validNodeConfig.tb_ssd * CERTIFIED_REWARDS.SSD_PER_TB_MONTH * (uptimePercentage / 100);
      const expectedHdd = validNodeConfig.tb_hdd * CERTIFIED_REWARDS.HDD_PER_TB_MONTH * (uptimePercentage / 100);
      const expectedNetwork = validNodeConfig.tb_network * CERTIFIED_REWARDS.NETWORK_PER_TB_MONTH * (uptimePercentage / 100);
      const expectedTotal = expectedMem + expectedSsd + expectedHdd + expectedNetwork;
      
      expect(rewards.mem_inca_rewards).toBeCloseTo(expectedMem);
      expect(rewards.ssd_inca_rewards).toBeCloseTo(expectedSsd);
      expect(rewards.hdd_inca_rewards).toBeCloseTo(expectedHdd);
      expect(rewards.network_inca_rewards).toBeCloseTo(expectedNetwork);
      expect(rewards.total_inca_rewards).toBeCloseTo(expectedTotal);
    });

    it('should return zero rewards for invalid uptime (too low)', () => {
      const rewards = calculateMonthlyIncaRewards(validNodeConfig, 80);
      
      expect(rewards.mem_inca_rewards).toBe(0);
      expect(rewards.ssd_inca_rewards).toBe(0);
      expect(rewards.hdd_inca_rewards).toBe(0);
      expect(rewards.network_inca_rewards).toBe(0);
      expect(rewards.total_inca_rewards).toBe(0);
      expect(mockConsoleWarn).toHaveBeenCalled();
    });
  });

  describe('calculateNodeLicenseFee', () => {
    it('should calculate the correct license fee', () => {
      const nodeConfig: NodeConfig = {
        gb_mem: 64,
        tb_ssd: 4,
        tb_hdd: 16,
        tb_network: 1 // Network doesn't affect license fee
      };
      
      const expectedLicenseFee = 
        LICENSE_FEES.SETUP + 
        (nodeConfig.tb_ssd * LICENSE_FEES.SSD_PER_TB) + 
        (nodeConfig.tb_hdd * LICENSE_FEES.HDD_PER_TB) +
        (nodeConfig.gb_mem * LICENSE_FEES.MEM_PER_GB);
      
      const result = calculateNodeLicenseFee(nodeConfig);
      expect(result).toBe(expectedLicenseFee);
    });
    
    it('should work with zero values', () => {
      const nodeConfig: NodeConfig = {
        gb_mem: 0,
        tb_ssd: 0,
        tb_hdd: 0,
        tb_network: 0
      };
      
      const expectedLicenseFee = LICENSE_FEES.SETUP;
      
      const result = calculateNodeLicenseFee(nodeConfig);
      expect(result).toBe(expectedLicenseFee);
    });
  });

  describe('calculateIncomePerNode', () => {
    it('should calculate correct income distribution', () => {
      const totalIncaRewards = 5000;
      const incaPriceEur = 0.5;
      
      const result = calculateIncomePerNode(totalIncaRewards, incaPriceEur);
      
      const expectedTotalIncome = totalIncaRewards * incaPriceEur;
      const expectedFarmerIncome = expectedTotalIncome * INCOME_SHARES.FARMER;
      const expectedFarmingPoolIncome = expectedTotalIncome * INCOME_SHARES.FARMING_POOL;
      const expectedThreefoldIncome = expectedTotalIncome * INCOME_SHARES.THREEFOLD;
      
      expect(result.inca_price_eur).toBe(incaPriceEur);
      expect(result.total_income_eur).toBe(expectedTotalIncome);
      expect(result.farmer_income_eur).toBeCloseTo(expectedFarmerIncome);
      expect(result.farming_pool_income_eur).toBeCloseTo(expectedFarmingPoolIncome);
      expect(result.threefold_income_eur).toBeCloseTo(expectedThreefoldIncome);
    });
    
    it('should handle zero INCA price', () => {
      const totalIncaRewards = 5000;
      const incaPriceEur = 0;
      
      const result = calculateIncomePerNode(totalIncaRewards, incaPriceEur);
      
      expect(result.total_income_eur).toBe(0);
      expect(result.farmer_income_eur).toBe(0);
      expect(result.farming_pool_income_eur).toBe(0);
      expect(result.threefold_income_eur).toBe(0);
    });
    
    it('should handle zero rewards', () => {
      const totalIncaRewards = 0;
      const incaPriceEur = 0.5;
      
      const result = calculateIncomePerNode(totalIncaRewards, incaPriceEur);
      
      expect(result.total_income_eur).toBe(0);
      expect(result.farmer_income_eur).toBe(0);
      expect(result.farming_pool_income_eur).toBe(0);
      expect(result.threefold_income_eur).toBe(0);
    });
  });
});
