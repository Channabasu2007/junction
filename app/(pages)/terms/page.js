import React from 'react'
import Navbar from '@/Components/Navbar/mainNavContainer';
import Footer from '@/Components/Footer/Footer';
const page = () => {
  return (
    <>
    <Navbar/>
     <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 px-6 md:px-20 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">Terms & Conditions</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Welcome to <span className="font-semibold">JUNCTION</span>. By accessing or using our platform, 
          you agree to the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          By creating an account or using JUNCTION, you agree to comply with these Terms. 
          If you do not agree, please do not use the service.
        </p>

        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">2. User Responsibilities</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          You are responsible for the content you share. Do not post illegal, harmful, or abusive material.
        </p>

        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">3. Intellectual Property</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          All branding, design, and platform content belong to JUNCTION. 
          Do not copy, modify, or redistribute without permission.
        </p>

        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">4. Termination</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We may suspend or terminate accounts that violate our policies or misuse the platform.
        </p>

        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">5. Changes</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          JUNCTION reserves the right to update these Terms at any time. 
          Continued use means you accept the new Terms.
        </p>
      </div>
    </main>
    <Footer/>
    </>
  )
}

export default page