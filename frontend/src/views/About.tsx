import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function About() {
  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto p-8 w-1/2">
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
              to="/register"
              className="font-semibold p-1.5 px-4 sm:px-8 bg-purple-500 rounded-lg transition-colors duration-300 hover:bg-purple-600"
            >
              Get Started
            </Link>
          </nav>
        </header>
        <div className="bg-white mx-auto p-6 rounded-lg shadow-md mt-10">
          <h1 className="text-3xl font-semibold mb-4 text-center">About</h1>
          <h2 className="text-xl font-semibold mb-4">Capital Gains Tracker</h2>
          <p className="text-gray-600 leading-6">
            The Capital Gains Tracker is an essential tool for managing your financial transactions
            in the digital asset market. It simplifies the process of recording all stock and crypto
            buy and sell events, ensuring that you have a comprehensive record at your fingertips
            when tax time arrives.
          </p>
          <p className="text-gray-600 leading-6 mt-4">
            Our user-friendly interface makes it easy to log each financial event, and when tax
            season approaches, the Capital Gains Tracker will generate a summary of your capital
            gains, helping you understand your tax obligations better.
          </p>
          <p className="text-gray-600 leading-6 mt-4">
            Please note that while CGT can assist you in organizing your financial data, it should
            not be considered an official authority on your tax obligations. Always consult with a
            tax professional for accurate and up-to-date advice.
          </p>
          <h2 className="text-xl font-semibold mb-4 mt-6">Disclaimer</h2>
          <p className="text-gray-600 leading-6">
            The information provided by the App is intended to serve as a guide for Australian
            capital gains tax scenarios. However, we do not guarantee its accuracy or completeness.
            It is not a substitute for professional financial or tax advice, as tax laws in
            Australia are complex and subject to change. Consult with a registered tax agent or
            legal professional before making any financial or tax decisions. Visit the{' '}
            <a
              href="https://www.ato.gov.au/General/Capital-gains-tax/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Australian Taxation Office (ATO) website
            </a>{' '}
            for official information. We disclaim all liability for actions based on any content in
            the App.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
