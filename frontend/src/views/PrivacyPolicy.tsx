import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-8 lg:w-1/2">
                <header className="fixed top-0 inset-x-0 z-50 flex flex-col sm:flex-row items-center sm:items-start text-white p-4 lg:px-8">
                    <h1 className="flex-1 mb-6 sm:mb-0 text-3xl font-bold text-center sm:text-left text-black">
                        Capital Gains Calculator
                    </h1>
                    <nav className="flex items-center space-x-2 justify-center sm:justify-start mb-4 sm:mb-0">
                        <Link
                            to="/login"
                            className="font-bold rounded-lg transition-colors duration-300 hover:underline text-gray-500"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/privacy-policy"
                            className="font-semibold p-1.5 px-4 sm:px-8 bg-purple-500 rounded-lg transition-colors duration-300 hover:bg-purple-600"
                        >
                            Privacy Policy
                        </Link>
                    </nav>
                </header>

                <div className="bg-white mx-auto p-6 rounded-lg shadow-md mt-10">
                    <h1 className="text-3xl font-semibold mb-4 text-center">Privacy Policy</h1>
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Introduction</h2>
                        <p className="mb-6">
                            This privacy policy outlines how we collect, use, disclose, and protect personal information in relation to the capital gains tax system. This policy complies with the Australian Privacy Principles (APPs) set out in the Privacy Act 1988.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Collection of Personal Information</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> We only collect personal information that is necessary for the capital gain tax process, such as name, contact details, date of birth, and financial information.
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">b. </span> We will inform the applicant of the purpose of collecting their personal information and the consequences of not providing the information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Use and Disclosure of Personal Information</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> We use the personal information collected to process the credit card application and for other purposes related to the application, such as verifying the applicant's identity, assessing their creditworthiness, and managing the credit card account.
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">b. </span> We may disclose the personal information collected to third parties, such as credit reporting agencies, identity verification providers, and other financial institutions, to assist with the application process.
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">c. </span> We will not disclose personal information to third parties for marketing purposes without the applicant's consent.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Storage and Security of Personal Information</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> We store personal information securely, using appropriate physical, technical, and administrative measures to prevent unauthorized access, use, disclosure, and modification of the information.
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">b. </span> We will retain personal information only for as long as necessary to fulfill the purposes for which it was collected and to comply with legal and regulatory requirements.
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">c. </span> We will destroy or de-identify personal information once it is no longer needed.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Access and Correction of Personal Information</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> Applicants have the right to access the personal information we hold about them and to request corrections if the information is inaccurate, incomplete, or out of date.
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">b. </span> We will respond to access and correction requests within a reasonable timeframe and may charge a fee for providing access to personal information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Complaints and Feedback</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> Applicants who have concerns about how their personal information is being handled may contact us at 13 2222 to lodge a complaint or provide feedback.
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">b. </span> We will investigate complaints and respond to feedback in accordance with the Privacy Act 1988.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Changes to the Privacy Policy</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">b. </span> Any changes to the privacy policy will be posted on our website, and applicants will be notified of significant changes.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Conclusion</h2>
                        <p className="mb-6">
                            We take our obligations under the Privacy Act 1988 seriously and are committed to protecting the personal information of our customers. If you have any questions about our privacy policy or how we handle personal information, please contact us.
                        </p>
                    </section>

             

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PrivacyPolicy;
