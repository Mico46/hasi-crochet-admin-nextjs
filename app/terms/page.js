import React from 'react';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using our website and services.',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
        <header className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: August 1, 2026
          </p>
        </header>

        <div className="space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600">
              By accessing or using our website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Account Responsibilities
            </h2>
            <p className="text-gray-600 mb-3">
              When you create an account with us, you must provide accurate and complete information. You are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Maintaining the confidentiality of your account password.</li>
              <li>All activities that occur under your account.</li>
              <li>Notifying us immediately of any unauthorized use or security breach.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Prohibited Conduct
            </h2>
            <p className="mb-3 text-gray-600">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Violating any local, state, national, or international law.</li>
              <li>Attempting to interfere with or compromise system integrity or security.</li>
              <li>Uploading viruses, malware, or harmful code.</li>
              <li>Scraping or harvesting user data without authorization.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Intellectual Property
            </h2>
            <p className="text-gray-600">
              All content, trademarks, graphics, and software available on our service are the exclusive property of our company or its licensors and are protected by applicable intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-600">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Termination
            </h2>
            <p className="text-gray-600">
              We reserve the right to suspend or terminate your account or access to our services at our sole discretion, without prior notice, for conduct that violates these Terms.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Contact Us
            </h2>
            <p className="text-gray-600">
              If you have questions regarding these Terms, please reach out to us at:
            </p>
            <p className="mt-2 font-medium text-gray-900">
            tex.mic22@gmail.com
            </p>
            <p className="mt-2 font-medium text-gray-900">
            Michael Samson
            +251912469372
            
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}