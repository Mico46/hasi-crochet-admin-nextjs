import React from 'react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
        <header className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: August 1, 2026
          </p>
        </header>

        <div className="space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information to provide better services to our users. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong className="text-gray-900">Personal Information:</strong> Name, email address, phone number, and account details you provide upon registration.
              </li>
              <li>
                <strong className="text-gray-900">Usage Data:</strong> Pages visited, features used, IP address, device type, and operating system.
              </li>
              <li>
                <strong className="text-gray-900">Cookies:</strong> Standard web cookies used to preserve your session and preferences.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">
              We process your personal data for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>To provide, maintain, and improve our application.</li>
              <li>To notify you about changes to our service or security updates.</li>
              <li>To deliver user support and respond to inquiries.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Data Sharing & Security
            </h2>
            <p className="text-gray-600 mb-3">
              We do not sell your personal data. We only share information with third-party service providers (such as hosting or analytics providers) who assist us in operating our platform, subject to confidentiality agreements.
            </p>
            <p className="text-gray-600">
              We implement industry-standard administrative and technical safeguards to protect your data against unauthorized access, loss, or misuse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Your Rights & Choices
            </h2>
            <p className="text-gray-600 mb-3">
              You have the right to access, correct, or request the deletion of your personal data at any time. You can also opt out of promotional communications through the link provided in our emails.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions or concerns regarding this Privacy Policy, please contact us at:
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