type AuthButtonProps = {
  type?: 'button' | 'submit';
  isSubmitting?: boolean;
  submittingText?: string;
  defaultText: string;
  onClick?: () => void;
};

function AuthButton({
  type = 'button',
  isSubmitting = false,
  submittingText = 'Submitting',
  defaultText,
  onClick,
}: AuthButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      className={`${
        isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-700'
      } mt-4 text-white rounded-full h-10 focus:outline-none focus:ring focus:border-indigo-500`}
      disabled={isSubmitting}
    >
      {isSubmitting ? submittingText : defaultText}
    </button>
  );
}

export default AuthButton;
