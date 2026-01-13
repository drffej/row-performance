export type AttributeDomain = 'physiology' | 'technique' | 'performance';

export interface Attribute {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  domain: AttributeDomain;
  order: number;
  scale: {
    min: number;
    max: number;
    step: number;
  };
  guidance: {
    low: string;
    mid: string;
    high: string;
  };
}

export const ATTRIBUTES: Attribute[] = [
  {
    id: 'aerobic_capacity',
    label: 'Aerobic Capacity',
    shortLabel: 'Aerobic',
    description: 'Ability to sustain hard work over time.',
    domain: 'physiology',
    order: 1,
    scale: { min: 0, max: 10, step: 1 },
    guidance: {
      low: 'Struggles to sustain steady work',
      mid: 'Can hold workload but fades',
      high: 'Exceptional endurance and recovery'
    }
  },
  {
    id: 'anaerobic_power',
    label: 'Anaerobic Power',
    shortLabel: 'Anaerobic',
    description: 'Ability to produce short-duration power.',
    domain: 'physiology',
    order: 2,
    scale: { min: 0, max: 10, step: 1 },
    guidance: {
      low: 'Limited change of pace',
      mid: 'Some sprint capacity',
      high: 'Explosive and repeatable'
    }
  },
  {
    id: 'length',
    label: 'Length',
    shortLabel: 'Length',
    description: 'Effective stroke length without loss of posture.',
    domain: 'technique',
    order: 3,
    scale: { min: 0, max: 10, step: 1 },
    guidance: {
      low: 'Short or rushed stroke',
      mid: 'Reasonable but inconsistent',
      high: 'Long, relaxed, connected'
    }
  },
  {
    id: 'catch_connection',
    label: 'Catch Connection',
    shortLabel: 'Catch',
    description: 'Quality of connection at the front end.',
    domain: 'technique',
    order: 4,
    scale: { min: 0, max: 10, step: 1 },
    guidance: {
      low: 'Misses water',
      mid: 'Intermittent connection',
      high: 'Immediate and clean'
    }
  },
  {
    id: 'power_application',
    label: 'Power Application',
    shortLabel: 'Power',
    description: 'Effectiveness of force through the drive.',
    domain: 'technique',
    order: 5,
    scale: { min: 0, max: 10, step: 1 },
    guidance: {
      low: 'Power leaks',
      mid: 'Uneven application',
      high: 'Strong and smooth'
    }
  },
  {
    id: 'balance_run',
    label: 'Balance & Run',
    shortLabel: 'Balance',
    description: 'Boat stability and run.',
    domain: 'technique',
    order: 6,
    scale: { min: 0, max: 10, step: 1 },
    guidance: {
      low: 'Unstable',
      mid: 'Occasionally composed',
      high: 'Calm and efficient'
    }
  },
  {
    id: 'consistency',
    label: 'Consistency',
    shortLabel: 'Consistent',
    description: 'Ability to reproduce performance.',
    domain: 'performance',
    order: 7,
    scale: { min: 0, max: 10, step: 1 },
    guidance: {
      low: 'Highly variable',
      mid: 'Reasonably repeatable',
      high: 'Reliable under pressure'
    }
  },
  {
    id: 'race_execution',
    label: 'Race Execution',
    shortLabel: 'Race',
    description: 'Composure and delivery under pressure.',
    domain: 'performance',
    order: 8,
    scale: { min: 0, max: 10, step: 1 },
    guidance: {
      low: 'Drops under pressure',
      mid: 'Inconsistent execution',
      high: 'Delivers when it matters'
    }
  }
];
