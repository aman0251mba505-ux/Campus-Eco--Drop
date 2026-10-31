/**
 * Campus Eco-Drop
 * Smart Campus Recycling & Micro-Rewards Platform
 * DBS Global University (DGU), Dehradun
 * Created for: aman.0251mba505@dgu.ac.in
 */

import React, { useState, useEffect } from 'react';
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
import { db } from './lib/firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { Leaf, ExternalLink, Building2 } from 'lucide-react';

function CampusEcoDropMain() {
  const { currentUser, firebaseUser, updateUserStats } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('deposit');
  const [dropBoxes, setDropBoxes] = useState<DropBoxLocation[]>(INITIAL_DROP_BOXES);
  const [canteens, setCanteens] = useState<CanteenPartner[]>(CANTEEN_PARTNERS);

  // User-specific data: clean zero slate for new users!
  const [vouchers, setVouchers] = useState<DigitalVoucher[]>([]);
  const [userDeposits, setUserDeposits] = useState<DepositRecord[]>([]);

  const [hostelStandings, setHostelStandings] = useState<HostelStanding[]>(INITIAL_HOSTEL_STANDINGS);
  const [studentChampions, setStudentChampions] = useState<StudentChampion[]>(INITIAL_STUDENT_CHAMPIONS);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [selectedDropBoxId, setSelectedDropBoxId] = useState<string | undefined>(undefined);

  // Sync user's personal vouchers and deposits from Firestore
  useEffect(() => {
    if (!currentUser?.email) {
      setVouchers([]);
      setUserDeposits([]);
      return;
    }

    const loadUserData = async () => {
      try {
        const vouchersQuery = query(
          collection(db, 'vouchers'),
          where('studentEmail', '==', currentUser.email)
        );
        const vSnap = await getDocs(vouchersQuery);
        const loadedVouchers: DigitalVoucher[] = [];
        vSnap.forEach((d) => {
          loadedVouchers.push(d.data() as DigitalVoucher);
        });
        setVouchers(loadedVouchers);

        const depositsQuery = query(
          collection(db, 'deposits'),
          where('studentEmail', '==', currentUser.email)
        );
        const dSnap = await getDocs(depositsQuery);
        const loadedDeposits: DepositRecord[] = [];
        dSnap.forEach((d) => {
          loadedDeposits.push(d.data() as DepositRecord);
        });
        setUserDeposits(loadedDeposits);
      } catch (err) {
        console.warn('Could not fetch user records from Firestore, starting clean state:', err);
      }
    };

    loadUserData();
  }, [currentUser?.email]);

  const activeVouchersCount = vouchers.filter((v) => !v.isRedeemed).length;
  const userKgRecycled = currentUser ? currentUser.totalWeightKg : 0;
  const userEcoPoints = currentUser ? currentUser.ecoPoints : 0;

  // Handle new waste deposit
  const handleDepositComplete = async (record: DepositRecord, voucher: DigitalVoucher) => {
    // 1. Update local states
    setUserDeposits((prev) => [record, ...prev]);
    setVouchers((prev) => [voucher, ...prev]);
    updateUserStats(record.totalPoints, record.totalWeightKg);

    // 2. Persist to Firestore if online
    try {
      await setDoc(doc(db, 'deposits', record.id), {
        ...record,
        studentUid: currentUser?.uid || 'guest-uid',
        createdAt: serverTimestamp(),
      });

      await setDoc(doc(db, 'vouchers', voucher.id), {
        ...voucher,
        studentUid: currentUser?.uid || 'guest-uid',
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn('Firestore write warning (offline or local):', e);
    }

    // 3. Update Drop Box capacity
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

    // 4. Update Hostel Standing
    const userHostel = currentUser?.hostel || 'Shivalik Boys Hostel';
    setHostelStandings((prev) =>
      prev.map((hostel) => {
        if (hostel.name.includes(userHostel.split(' ')[0])) {
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
  const handleRedeemVoucher = async (voucherId: string) => {
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

    try {
      await setDoc(
        doc(db, 'vouchers', voucherId),
        { isRedeemed: true, redeemedAt: new Date().toISOString() },
        { merge: true }
      );
    } catch (e) {
      console.warn('Could not update voucher in Firestore:', e);
    }

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
        ecoPoints={userEcoPoints}
        activeVouchersCount={activeVouchersCount}
        onOpenDeposit={() => handleOpenDepositForBox()}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'deposit' && (
          <DepositDashboardView
            dropBoxes={dropBoxes}
            recentDeposits={userDeposits}
            activeVouchers={vouchers.filter((v) => !v.isRedeemed)}
            ecoPoints={userEcoPoints}
            onOpenDeposit={handleOpenDepositForBox}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'wallet' && (
          <VoucherWallet
            vouchers={vouchers}
            ecoPoints={userEcoPoints}
            totalKgRecycled={userKgRecycled}
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
            depositRecords={userDeposits}
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
            Student: <span className="font-mono text-slate-600">{currentUser?.email || 'Guest Student'}</span>
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
