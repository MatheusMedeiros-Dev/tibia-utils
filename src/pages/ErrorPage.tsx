interface ErrorPageProps {
  errorMessage?: string | null;
}

const ErrorPage = ({ errorMessage }: ErrorPageProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center w-[400px] bg-overlay-bg rounded-b-lg">
        <div className="bg-error-bg m-4 rounded-sm">
          <p className="text-error-text p-2 font-semibold">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
