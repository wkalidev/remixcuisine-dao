import { Address } from 'viem';

// Contract Addresses
export const USDC_ADDRESS: Address = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; // Base Mainnet USDC
export const LUCKY_DRAW_ADDRESS: Address = process.env.NEXT_PUBLIC_LUCKY_DRAW_CONTRACT as Address || '0x0000000000000000000000000000000000000000';

// USDC ABI (minimal pour approve et transfer)
export const USDC_ABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Lucky Draw Contract ABI
export const LUCKY_DRAW_ABI = [
  {
    inputs: [{ name: 'entryFee', type: 'uint256' }],
    name: 'enterDraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentPrizePool',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalEntries',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'index', type: 'uint256' }],
    name: 'getWinner',
    outputs: [
      { name: 'winner', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'timestamp', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'participant', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' }
    ],
    name: 'EnteredDraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'winner', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' }
    ],
    name: 'WinnerSelected',
    type: 'event',
  },
] as const;

// Entry fee en USDC (avec 6 décimales)
export const ENTRY_FEE = '0.1'; // 0.1 USDC
