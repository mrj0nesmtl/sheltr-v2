interface DonorStats {
  totalDonations: number;
  donationCount: number;
  impactScore: number;
  lastDonation?: Date;
}

export interface DonorAnalytics extends DonorStats {
  recentTransactions?: Transaction[];
  donationTrends?: {
    period: string;
    amount: number;
  }[];
}