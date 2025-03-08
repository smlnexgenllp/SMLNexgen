"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import DynamicTable from '../components/DynamicTable';
import Link from 'next/link';
import styles from './dashboardSlug.module.css'; // Use the unique CSS module for DashboardSlug

export default function DashboardSlug() {
  const router = useRouter();
  const { slug } = useParams();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      router.push('/Admin');
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);

  const dataTypeMap = {
    Bookings: 'booking',
    Contacts: 'contact',
  };

  const dataType = dataTypeMap[slug] || null;

  return (
    <div className={styles.slugDashboardContainer}>
      <div className={styles.slugDashboardContent}>
        {isAuthChecked ? (
          <>
            <div className={styles.slugHeader}>
              <h1 className={styles.slugDashboardTitle}>
                {slug === 'Bookings' ? 'Bookings' : 'Contacts'}
              </h1>
            </div>
            <Link href="/Admin/Dashboard" className={styles.slugBackLink}>
              Back to Dashboard
            </Link>
            {dataType ? (
              <DynamicTable dataType={dataType} />
            ) : (
              <h1 className={styles.slugDashboardTitle}>Invalid Section</h1>
            )}
          </>
        ) : (
          <div className={styles.loadingState}>Loading...</div>
        )}
      </div>
    </div>
  );
}