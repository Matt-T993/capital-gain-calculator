import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className=" shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{' '}
          <a href="https://www.fdmgroup.com/en-au/au-home/" className="hover:underline">
            FDM Group™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6">
              About
            </Link>
          </li>
          <li>
            <Link to="/privacyPolicy" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/termsAndConditions" className="mr-4 hover:underline md:mr-6">
              Terms and Conditions
            </Link>
          </li>
          <li>
            <Link to="/securityPolicy" className="mr-4 hover:underline md:mr-6">
              Security Policies
            </Link>
          </li>
          <li>
            <Link to="/faq" className="mr-4 hover:underline md:mr-6">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
