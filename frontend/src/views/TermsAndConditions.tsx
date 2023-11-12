import Footer from "../components/Footer";
import {Link} from "react-router-dom";


function TermsAndConditions() {
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
                            to="/security-policy"
                            className="font-semibold p-1.5 px-4 sm:px-8 bg-purple-500 rounded-lg transition-colors duration-300 hover:bg-purple-600"
                        >
                            Security Policy
                        </Link>
                    </nav>
                </header>


            <div className="bg-white mx-auto p-6 rounded-lg shadow-md mt-10">
          <h1 className="text-3xl font-semibold mb-4 text-center">Terms and Conditions</h1>
        <p className="text-gray-600 text-sm mb-6">Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Cassowary Capital Gain Calculator System (the "Service") operated by Cassowary ("us", "we", or "our").</p>

        <p className="text-gray-600 text-sm mb-6">Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>

        <h2 className="text-xl font-bold mb-4">1. Eligibility</h2>
        <p className="text-gray-600 text-sm mb-6">To be eligible to use the Service, you must be at least 18 years old and a resident of Australia. By using the Service, you represent and warrant that you meet these eligibility requirements.</p>

        <h2 className="text-xl font-bold mb-4">2. Application Process</h2>
        <p className="text-gray-600 text-sm mb-6">By submitting an application through the Service, you authorize us to obtain your credit report, verify your identity, and share your information with third parties, as necessary, to process your application. You also confirm that all information provided in your application is true and accurate to the best of your knowledge.</p>

        <h2 className="text-xl font-bold mb-4">3. Privacy</h2>
        <p className="text-gray-600 text-sm mb-6">Your use of the Service is subject to our Privacy Policy, which describes how we collect, use, and disclose your personal information. Please review the Privacy Policy carefully to understand our privacy practices.</p>

        <h2 className="text-xl font-bold mb-4">4. Intellectual Property</h2>
        <p className="text-gray-600 text-sm mb-6">The Service and its original content, features, and functionality are and will remain the exclusive property of Howzat and its licensors. The Service is protected by copyright, trademark, and other laws of both Australia and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Howzat.</p>

        <h2 className="text-xl font-bold mb-4">5. Termination</h2>
        <p className="text-gray-600 text-sm mb-6">We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>

        <h2 className="text-xl font-bold mb-4">6. Changes</h2>
        <p className="text-gray-600 text-sm mb-6">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>

        <h2 className="text-xl font-bold mb-4">7. Governing Law</h2>
        <p className="text-gray-600 text-sm mb-6">These Terms shall be governed and construed in accordance with the laws of Australia, without regard to its conflict of law provisions.</p>

        <h2 className="text-xl font-bold mb-4">8. Contact Us</h2>
        <p className="text-gray-600 text-sm mb-6">If you have any questions about these Terms, please contact us at <a href="tel:1322222" className="text-blue-600">13 2222</a>.</p>
      </div>
      
    </div>
    <Footer/>
    </div>



  );

}

export default TermsAndConditions;
