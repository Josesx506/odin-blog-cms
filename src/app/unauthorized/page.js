'use client'

import { BigButton } from '@/components/Buttons';
import styles from "@/styles/unauthorized.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from 'react';

function UnauthorizedFunction() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const message = searchParams.get('message') || 'You are not authorized to access this resource';
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <h1 className={styles.statusCode}>403</h1>
        <h2 className={styles.title}>Unauthorized</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonContainer}>
          <BigButton backgroundColor='white' variant="outline" onClick={() => router.back()}>
            Go Back
          </BigButton>
          <BigButton backgroundColor='aliceblue' color='black' onClick={() => router.push("/")}>Go Home</BigButton>
        </div>
      </div>
    </div>
  )
}


export default function Unauthorized() {
  return (
    <Suspense>
      <UnauthorizedFunction />
    </Suspense>
  )
}