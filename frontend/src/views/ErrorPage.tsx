function ErrorPage() {
  return (
    <div>
      <h1>Yep thats an Error</h1>
      <button
        className="bg-black text-white font-bold"
        type="button"
        onClick={() => {
          window.history.back();
        }}
      >
        Back
      </button>
    </div>
  );
}

export default ErrorPage;
