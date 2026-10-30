/**
 * Campus Eco-Drop
 * Smart Campus Recycling & Micro-Rewards Platform
 * DBS Global University (DGU), Dehradun
 * Created for: aman.0251mba505@dgu.ac.in
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { DepositDashboardView } from './components/DepositDashboardView';
import { DepositModal } from './components/DepositModal';
import { VoucherWallet } from './components/VoucherWallet';
import { DropBoxDirectory } from './components/DropBoxDirectory';
import { CommunityLeaderboard } from './components/CommunityLeaderboard';
import { CanteenPOS } from './components/CanteenPOS';
import { FacilitiesPortal } from './components/FacilitiesPortal';
import { VentureExplorer } from './components/VentureExplorer';
import {
  INITIAL_DROP_BOXES,
  CANTEEN_PARTNERS,
  INITIAL_STUDENT_VOUCHERS,
  INITIAL_DEPOSIT_RECORDS,
  INITIAL_HOSTEL_STANDINGS,
  INITIAL_STUDENT_CHAMPIONS,
} from './data/initialData';
import {
  DropBoxLocation,
  CanteenPartner,
  DigitalVoucher,
  DepositRecord,
  HostelStanding,
  StudentChampion,
} from './types';
import { VENTURE_METADATA } from './data/ventureData';
import { Leaf, ExternalLink, ShieldCheck, Building2, Github, Cloud } from 'lucide-react';

function CampusEcoDropMain() {
  const { currentUser, updateUserStats } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('deposit');
  const [dropBoxes, setDropBoxes] = useState<DropBoxLocation[]>(INITIAL_DROP_BOXES);
  const [canteens, setCanteens] = useState<CanteenPartner[]>(CANTEEN_PARTNERS);
  const [vouchers, setVouchers] = useState<DigitalVoucher[]>(INITIAL_STUDENT_VOUCHERS);
  const [recentDeposits, setRecentDeposits] = useState<DepositRecord[]>(INITIAL_DEPOSIT_RECORDS);
  const [hostelStandings, setHostelStandings] = useState<HostelStanding[]>(INITIAL_HOSTEL_STANDINGS);
  const [studentChampions, setStudentChampions] = useState<StudentChampion[]>(INITIAL_STUDENT_CHAMPIONS);
  const [ecoPoints, setEcoPoints] = useState<number>(385);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [selectedDropBoxId, setSelectedDropBoxId] = useState<string | undefined>(undefined);

  const activeVouchersCount = vouchers.filter((v) => !v.isRedeemed).length;
  const totalKgRecycled = recentDeposits.reduce((sum, d) => sum + d.totalWeightKg, 0) + 18.6;

  // Handle new waste deposit
  const handleDepositComplete = (record: DepositRecord, voucher: DigitalVoucher) => {
    setRecentDeposits((prev) => [record, ...prev]);
    setVouchers((prev) => [voucher, ...prev]);
    setEcoPoints((prev) => prev + record.totalPoints);
    updateUserStats(record.totalPoints, record.totalWeightKg);

    // Update Drop Box capacity
    setDropBoxes((prev) =>
      prev.map((box) => {
        if (box.code === record.dropBoxCode) {
          const newCapacity = Math.min(100, box.capacityPercent + 6);
          const newTotalKg = Number((box.totalCollectedKg + record.totalWeightKg).toFixed(2));
          return {
            ...box,
            capacityPercent: newCapacity,
            totalCollectedKg: newTotalKg,
            status: newCapacity >= 80 ? 'nearly_full' : 'active',
          };
        }
        return box;
      })
    );

    // Update Hostel Standing
    setHostelStandings((prev) =>
      prev.map((hostel) => {
        if (hostel.name.includes('Shivalik')) {
          return {
            ...hostel,
            totalKg: Number((hostel.totalKg + record.totalWeightKg).toFixed(1)),
          };
        }
        return hostel;
      })
    );
  };

  // Handle voucher redemption
  const handleRedeemVoucher = (voucherId: string) => {
    let targetCanteenId: string | undefined;

    setVouchers((prev) =>
      prev.map((v) => {
        if (v.id === voucherId) {
          targetCanteenId = v.canteenId;
          return {
            ...v,
            isRedeemed: true,
            redeemedAt: 'Just now',
          };
        }
        return v;
      })
    );

    if (targetCanteenId) {
      setCanteens((prev) =>
        prev.map((c) =>
          c.id === targetCanteenId
            ? { ...c, vouchersRedeemedCount: c.vouchersRedeemedCount + 1 }
            : c
        )
      );
    }
  };

  const handleOpenDepositForBox = (boxId?: string) => {
    setSelectedDropBoxId(boxId);
    setIsDepositModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ecoPoints={currentUser ? currentUser.ecoPoints : ecoPoints}
        activeVouchersCount={activeVouchersCount}
        onOpenDeposit={() => handleOpenDepositForBox()}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'deposit' && (
          <DepositDashboardView
            dropBoxes={dropBoxes}
            recentDeposits={recentDeposits}
            activeVouchers={vouchers.filter((v) => !v.isRedeemed)}
            ecoPoints={currentUser ? currentUser.ecoPoints : ecoPoints}
            onOpenDeposit={handleOpenDepositForBox}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'wallet' && (
          <VoucherWallet
            vouchers={vouchers}
            ecoPoints={currentUser ? currentUser.ecoPoints : ecoPoints}
            totalKgRecycled={totalKgRecycled}
            onRedeemVoucher={handleRedeemVoucher}
            onOpenDeposit={() => handleOpenDepositForBox()}
          />
        )}

        {activeTab === 'dropboxes' && (
          <DropBoxDirectory
            dropBoxes={dropBoxes}
            onSelectBoxForDeposit={handleOpenDepositForBox}
          />
        )}

        {activeTab === 'leaderboard' && (
          <CommunityLeaderboard
            hostelStandings={hostelStandings}
            studentChampions={studentChampions}
            onOpenDeposit={() => handleOpenDepositForBox()}
          />
        )}

        {activeTab === 'canteen-pos' && (
          <CanteenPOS
            canteens={canteens}
            vouchers={vouchers}
            onRedeemVoucher={handleRedeemVoucher}
          />
        )}

        {activeTab === 'facilities' && (
          <FacilitiesPortal
            dropBoxes={dropBoxes}
            depositRecords={recentDeposits}
          />
        )}

        {activeTab === 'venture' && <VentureExplorer />}
      </main>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        dropBoxes={dropBoxes}
        canteens={canteens}
        selectedDropBoxId={selectedDropBoxId}
        onDepositComplete={handleDepositComplete}
      />

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">Campus Eco-Drop</span>
            <span>·</span>
            <span>DBS Global University (DGU), Dehradun</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('facilities')}
              className="hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>University Facilities View</span>
            </button>
            <button
              onClick={() => setActiveTab('venture')}
              className="hover:text-emerald-700 transition-colors"
            >
              Venture Plan (Missions 0–12)
            </button>
            <a
              href={VENTURE_METADATA.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              <span>Download Plan PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-slate-400">
            Student: <span className="font-mono text-slate-600">{currentUser?.email || 'aman.0251mba505@dgu.ac.in'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CampusEcoDropMain />
    </AuthProvider>
  );
}
