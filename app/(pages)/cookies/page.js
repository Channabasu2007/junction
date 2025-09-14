import React from 'react'
import Navbar from '@/Components/Navbar/mainNavContainer';
import Footer from '@/Components/Footer/Footer';
const page = () => {
  return (
    <>
    <Navbar/>
        <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 px-6 md:px-20 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">Cookies Policy</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          JUNCTION uses cookies to improve your browsing experience. 
          By using our platform, you agree to the use of cookies as described in this policy.
        </p>

        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">What Are Cookies?</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Cookies are small text files stored on your device to help us 
          remember your preferences, login sessions, and improve website performance.
        </p>

        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">How We Use Cookies</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Authentication – keeping you logged in.</li>
          <li>Preferences – saving your theme and settings.</li>
          <li>Analytics – understanding how users interact with JUNCTION.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-4">Managing Cookies</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          You can disable cookies in your browser settings, 
          but some features may not work properly without them.
        </p>
      </div>
    </main>
<Footer/>
    </>
  )
}

export default page