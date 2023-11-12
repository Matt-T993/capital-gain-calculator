import { useEffect, useRef } from 'react';

function DisclaimerModal({ onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 bg-white p-4 rounded-md shadow-lg" ref={modalRef}>
        <h2 className="mb-4 text-xl font-bold">Disclaimer</h2>
        <p className="text-gray-600 leading-6">
          The information provided by the App is intended to serve as a guide for Australian capital
          gains tax scenarios. However, we do not guarantee its accuracy or completeness. It is not
          a substitute for professional financial or tax advice, as tax laws in Australia are
          complex and subject to change. Consult with a registered tax agent or legal professional
          before making any financial or tax decisions. Visit the{' '}
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
        <button
          type="button"
          onClick={onClose}
          className="mt-4 bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default DisclaimerModal;
