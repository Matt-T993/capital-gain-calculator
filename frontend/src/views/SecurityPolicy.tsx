import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function SecurityPolicy() {
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

                <div className="bg-white  mx-auto p-6 rounded-lg shadow-md  mt-10">
                    <section className="mb-8">
                    <h1 className="text-3xl font-semibold mb-4 text-center">IT Security Policy</h1>
                        <p className="mb-6">
                            This IT security policy outlines the security measures that are to be taken to ensure the protection of sensitive data in the credit card application. The policy includes guidelines for the security of the application, data protection, network security, access control, and incident management.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Application Security</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> The credit card application must be developed with secure coding practices and follow OWASP (Open Web Application Security Project) guidelines.
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">b. </span> Regular security assessments and penetration testing must be conducted to identify vulnerabilities and mitigate risks.
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">c. </span> Access controls must be implemented to prevent unauthorized access to the application.
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">d. </span> The application must be protected against cross-site scripting (XSS) and SQL injection attacks.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Data Protection</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> All sensitive data related to the credit card application must be encrypted in transit and at rest.
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">b. </span> Data should only be stored for as long as necessary, and secure disposal procedures must be followed when the data is no longer needed.
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">c. </span> Data backup and disaster recovery procedures must be implemented to ensure the availability and integrity of the data.
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">d. </span> Access to sensitive data must be restricted to authorized personnel only.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Network Security</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> The capital gains system must be hosted on a secure network with firewalls and intrusion detection and prevention systems in place.
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">b. </span> Network segmentation must be implemented to limit access to sensitive data.
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">c. </span> All network devices must be kept up to date with the latest security patches and firmware updates.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Access Control</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> Access to the capital gains system must be granted on a need-to-know basis.
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">b. </span> Authentication mechanisms such as passwords, two-factor authentication, and biometric identification must be implemented to control access.
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">c. </span> Access to sensitive data must be logged and audited to detect any unauthorized access attempts.
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">d. </span> Access privileges must be revoked immediately upon termination of an employee's contract.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Incident Management</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> An incident response plan must be in place in the event of a security breach.
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">b. </span> All security incidents must be reported to the appropriate authorities and affected individuals.
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">c. </span> Regular security awareness training must be conducted for all employees to ensure they are aware of security best practices and potential risks.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Compliance</h2>
                        <p className="mb-4">
                            <span className="font-semibold">a. </span> The security policy must be reviewed and updated regularly to ensure compliance with changing regulations and best practices.
                        </p>
                        <p className="mb-6">
                            <span className="font-semibold">b. </span> Comply with applicable privacy regulations, like the General Data Protection Regulation (GDPR) and Privacy Act 1988, by implementing proper data handling and processing practices and providing users with control over their personal data.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Conclusion</h2>
                        <p className="mb-6">
                            This IT security policy outlines the measures that must be taken to protect the sensitive data in the credit card application. All employees must adhere to this policy, and any violations may result in disciplinary action or legal consequences.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SecurityPolicy;
