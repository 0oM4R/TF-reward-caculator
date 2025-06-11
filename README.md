# INCA Rewards Calculator

A TypeScript library for computing INCA token rewards and financial projections for ThreeFold nodes and farming pools.

## Overview

This calculator provides functionality to:

- Calculate annual INCA rewards for ThreeFold nodes based on resource configuration
- Calculate node license fees according to hardware specifications
- Calculate income distribution between farmers, farming pools, and ThreeFold

## Installation

```bash
# Clone the repository
git clone https://github.com/0oM4R/TF-reward-caculator.git
cd ts-v4-rewards

# Install dependencies
yarn install
```

## Examples

The project includes examples that demonstrate how to use the calculator:

### Annual Rewards Example

This example calculates the annual INCA rewards and income distribution for a node with specific hardware configuration:

```bash
yarn 

# Run the example
yarn run ts-node examples/annualRewards.ts
```

The example shows:

- Annual INCA rewards calculation for a specified node configuration
- Breakdown of rewards by resource (memory, SSD, HDD, network)
- Income distribution between farmer, farming pool, and ThreeFold

## API Reference

### Core Functions

```typescript
// Calculate annual INCA rewards for a node
calculateAnnualIncaRewards(nodeConfig: NodeConfig): IncaRewards

// Calculate node license fee
calculateNodeLicenseFee(nodeConfig: NodeConfig): number

// Calculate income distribution for a node
calculateIncomePerNode(total_inca_rewards_annual: number, inca_price_eur: number): IncomeDistribution

// Validate a node configuration
validateNodeConfig(nodeConfig: NodeConfig): ValidationResult
```

## Constants

The calculator uses the key constants defined in the [constants.ts](./src/constants.ts) file.