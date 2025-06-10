import { calculateAnnualIncaRewards, calculateIncomePerNode } from '../src/calculator';
import { INCOME_SHARES } from '../src/constants';

const nodeConfig = {
  gb_mem: 64,
  tb_ssd: 4,
  tb_hdd: 16,
  tb_network: 1,
};



const rewards = calculateAnnualIncaRewards(nodeConfig);

console.log(`Financial Analysis for node with the following configuration:
  - Memory: ${nodeConfig.gb_mem} GB
  - SSD: ${nodeConfig.tb_ssd} TB
  - HDD: ${nodeConfig.tb_hdd} TB
  - Network: ${nodeConfig.tb_network} TB `)
console.log("=========================================")
console.log(`Annual INCA rewards: ${rewards.total_inca_rewards}`);
console.log(`Rewards details: 
   - Memory: ${rewards.mem_inca_rewards}
   - SSD: ${rewards.ssd_inca_rewards}
   - HDD: ${rewards.hdd_inca_rewards}
   - Network: ${rewards.network_inca_rewards}`);
const income = calculateIncomePerNode(rewards.total_inca_rewards, 0.1);

console.log("=========================================");
console.log(`INCA price: ${income.inca_price_eur} EUR`);
console.log("=========================================");

console.log(`Annual Income: ${income.total_income_eur} EUR`);
console.log(`Income Distribution: 
   - Farmer: ${Math.round(income.farmer_income_eur)} EUR (${INCOME_SHARES.FARMER * 100}%)
   - Farming Pool: ${Math.round(income.farming_pool_income_eur)} EUR (${INCOME_SHARES.FARMING_POOL * 100}%)
   - ThreeFold: ${Math.round(income.threefold_income_eur)} EUR (${INCOME_SHARES.THREEFOLD * 100}%)`);
