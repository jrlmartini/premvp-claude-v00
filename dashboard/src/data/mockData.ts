// Mock data for Conatus Environmental Technologies Executive Dashboard
// All values in BRL

export const revenueData = {
  mtd: {
    actual: 2_847_350.00,
    goal: 3_200_000.00,
    average: 2_650_000.00,
  },
  ytd: {
    actual: 8_542_050.00,
    goal: 9_600_000.00,
    average: 7_950_000.00,
  },
  monthly: [
    { month: 'Jan', actual: 2_710_400, goal: 3_200_000 },
    { month: 'Fev', actual: 2_984_300, goal: 3_200_000 },
    { month: 'Mar', actual: 2_847_350, goal: 3_200_000 },
  ],
  dailyMTD: [
    { day: '01', value: 95_000 },
    { day: '02', value: 110_000 },
    { day: '03', value: 145_000 },
    { day: '04', value: 89_000 },
    { day: '05', value: 201_000 },
    { day: '06', value: 175_000 },
    { day: '07', value: 130_000 },
    { day: '08', value: 98_000 },
    { day: '09', value: 156_000 },
    { day: '10', value: 188_000 },
    { day: '11', value: 210_000 },
    { day: '12', value: 167_000 },
    { day: '13', value: 143_000 },
    { day: '14', value: 195_000 },
    { day: '15', value: 220_000 },
    { day: '16', value: 125_350 },
    { day: '17', value: 140_000 },
  ],
}

export const topCustomers = [
  { rank: 1, name: 'BRF S.A.', revenue: 1_245_000, share: 14.6, trend: 'up' as const },
  { rank: 2, name: 'JBS S.A.', revenue: 987_500, share: 11.6, trend: 'up' as const },
  { rank: 3, name: 'Ambev S.A.', revenue: 876_300, share: 10.3, trend: 'stable' as const },
  { rank: 4, name: 'Suzano Papel e Celulose', revenue: 754_200, share: 8.8, trend: 'up' as const },
  { rank: 5, name: 'Klabin S.A.', revenue: 623_100, share: 7.3, trend: 'down' as const },
  { rank: 6, name: 'Raízen S.A.', revenue: 589_800, share: 6.9, trend: 'up' as const },
  { rank: 7, name: 'CMPC Celulose', revenue: 534_600, share: 6.3, trend: 'stable' as const },
  { rank: 8, name: 'Minerva Foods', revenue: 478_900, share: 5.6, trend: 'down' as const },
  { rank: 9, name: 'Marfrig Global', revenue: 445_200, share: 5.2, trend: 'up' as const },
  { rank: 10, name: 'Usiminas', revenue: 398_700, share: 4.7, trend: 'stable' as const },
]

export const cashPosition = {
  current: 4_567_890.00,
  previousMonth: 3_890_450.00,
  change: 17.4,
  history: [
    { month: 'Out', value: 3_120_000 },
    { month: 'Nov', value: 3_450_000 },
    { month: 'Dez', value: 3_890_450 },
    { month: 'Jan', value: 4_100_000 },
    { month: 'Fev', value: 4_250_000 },
    { month: 'Mar', value: 4_567_890 },
  ],
}

export const operationalCashflow = {
  mtd: {
    inflow: 2_340_000,
    outflow: 1_890_000,
    net: 450_000,
  },
  ytd: {
    inflow: 7_820_000,
    outflow: 6_540_000,
    net: 1_280_000,
  },
  monthly: [
    { month: 'Jan', inflow: 2_650_000, outflow: 2_210_000, net: 440_000 },
    { month: 'Fev', inflow: 2_830_000, outflow: 2_440_000, net: 390_000 },
    { month: 'Mar', inflow: 2_340_000, outflow: 1_890_000, net: 450_000 },
  ],
}

export const ebitdaData = {
  ytdAccrued: 2_145_600,
  ytdGoal: 2_400_000,
  margin: 25.1,
  monthly: [
    { month: 'Jan', value: 678_400, margin: 25.0 },
    { month: 'Fev', value: 745_200, margin: 24.9 },
    { month: 'Mar', value: 722_000, margin: 25.4 },
  ],
  trend: [
    { month: 'Jul', value: 580_000 },
    { month: 'Ago', value: 612_000 },
    { month: 'Set', value: 645_000 },
    { month: 'Out', value: 658_000 },
    { month: 'Nov', value: 690_000 },
    { month: 'Dez', value: 710_000 },
    { month: 'Jan', value: 678_400 },
    { month: 'Fev', value: 745_200 },
    { month: 'Mar', value: 722_000 },
  ],
}

// RFM Analysis - 5x5 matrix
// Recency (columns): 1=Most Recent, 5=Least Recent
// Frequency (rows): 5=Most Frequent, 1=Least Frequent
// Values represent number of customers in each segment
export const rfmData = {
  matrix: [
    // Row 5 (Highest Frequency)
    [42, 28, 15, 8, 3],   // R1-R5
    // Row 4
    [35, 31, 22, 12, 6],
    // Row 3
    [18, 24, 28, 19, 11],
    // Row 2
    [8, 14, 20, 25, 18],
    // Row 1 (Lowest Frequency)
    [3, 7, 12, 21, 32],
  ],
  segments: {
    champions: { count: 42, revenue: 2_100_000, label: 'Campeões' },
    loyal: { count: 94, revenue: 3_200_000, label: 'Leais' },
    atRisk: { count: 63, revenue: 1_450_000, label: 'Em Risco' },
    lost: { count: 71, revenue: 890_000, label: 'Perdidos' },
    newCustomers: { count: 26, revenue: 560_000, label: 'Novos' },
  },
  recencyLabels: ['1 (Recente)', '2', '3', '4', '5 (Antigo)'],
  frequencyLabels: ['5 (Alta)', '4', '3', '2', '1 (Baixa)'],
}

// Additional data for extra cards
export const contractsData = {
  active: 156,
  expiringSoon: 12,
  newThisMonth: 8,
  churnRate: 2.3,
  renewalRate: 94.5,
}

export const waterTreatmentMetrics = {
  volumeProcessed: 45_780, // m³
  efficiency: 97.8,
  activeUnits: 234,
  alerts: 3,
  monthlyVolume: [
    { month: 'Out', volume: 38_200 },
    { month: 'Nov', volume: 41_500 },
    { month: 'Dez', volume: 39_800 },
    { month: 'Jan', volume: 43_100 },
    { month: 'Fev', volume: 44_600 },
    { month: 'Mar', volume: 45_780 },
  ],
}

export const arAgingData = [
  { range: 'A vencer', value: 2_340_000, color: '#14A676' },
  { range: '1-30 dias', value: 890_000, color: '#62B6CB' },
  { range: '31-60 dias', value: 456_000, color: '#F4A261' },
  { range: '61-90 dias', value: 234_000, color: '#E63946' },
  { range: '90+ dias', value: 178_000, color: '#84112e' },
]
