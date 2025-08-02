"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import Navbar from '@/Components/Navbar/mainNavContainer'
import Loader from '@/Components/Workers/Loader'
import { useRouter } from 'next/navigation';

const SetPageName = () => {
  const router = useRouter()
const { data: session, status } = useSession();

if (status === "loading") {
  return <Loader/>; // Or a spinner
}

if (status === "unauthenticated") {
  router.push('/login')
  return  ;
}

return (
  <div>
    <Navbar/>
    <p>Welcome, {session.user.firstname}</p>
    <p>Email: {session.user.email}</p>
  </div>
);

}

export default SetPageName