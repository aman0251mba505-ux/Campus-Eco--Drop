/**
 * Campus Eco-Drop Data Types
 * DGU Venture Quest - DBS Global University
 */

export type WasteCategory = 'plastic' | 'aluminum' | 'paper';

export interface RecyclableItem {
  id: WasteCategory;
  name: string;
  itemDescription: string;
  unitWeightKg: number; // approximate kg per unit
  pointsPerUnit: number;
  marketRatePerKgInr: number; // Dehradun market benchmark
  co2SavedPerUnitKg: number;
  iconName: string;
}

export interface DropBoxLocation {
  id: string;
  code: string;
  name: string;
  campusZone: string;
  landmark: string;
  capacityPercent: number;
  totalCollectedKg: number;
  acceptedMaterials: WasteCategory[];
  lastEmptied: string;
  status: 'active' | 'nearly_full' | 'maintenance';
}

export interface CanteenPartner {
  id: string;
  name: string;
  location: string;
  category: 'Cafe' | 'Mess' | 'Fast Food' | 'Stationery';
  offerTitle: string;
  discountValueInr: number;
  minSpendInr: number;
  vouchersRedeemedCount: number;
  imageUrl?: string;
}

export interface DigitalVoucher {
  id: string;
  code: string;
  canteenId: string;
  canteenName: string;
  title: string;
  discountValueInr: number;
  minSpendInr: number;
  earnedAt: string;
  expiresAt: string;
  isRedeemed: boolean;
  redeemedAt?: string;
  studentEmail: string;
}

export interface DepositRecord {
  id: string;
  timestamp: string;
  dropBoxCode: string;
  dropBoxName: string;
  studentEmail: string;
  studentName: string;
  items: {
    category: WasteCategory;
    name: string;
    quantity: number;
    weightKg: number;
    points: number;
  }[];
  totalPoints: number;
  totalWeightKg: number;
  co2OffsetKg: number;
  voucherIssued?: DigitalVoucher;
}

export interface HostelStanding {
  id: string;
  name: string;
  totalKg: number;
  participantsCount: number;
  rank: number;
  trend: 'up' | 'steady' | 'down';
}

export interface StudentChampion {
  rank: number;
  name: string;
  email: string;
  hostel: string;
  points: number;
  kgRecycled: number;
  badge: string;
}
