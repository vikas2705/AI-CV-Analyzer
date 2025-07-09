import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useFileUpload } from "../hooks/useFileUpload";
import { validateFiles } from "../utils/fileValidation";

export const FileUploadForm = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const { response, setResponse, loading, error, uploadFiles, clearError } =
    useFileUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateFiles(cvFile, jdFile);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    if (cvFile && jdFile) {
      await uploadFiles({ cv: cvFile, jd: jdFile });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-6">
        {/* CV Upload Box */}
        <div className="relative w-60 h-48 flex flex-col items-center justify-center">
          <label
            htmlFor="cv-upload"
            className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center px-2">
            <FaUpload className="text-blue-500 text-3xl mb-2" />
            <p className="text-gray-600 font-medium w-full truncate overflow-hidden text-ellipsis">
              {cvFile ? cvFile.name : "Upload CV PDF"}
            </p>
            <input
              id="cv-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
            />
            {cvFile && (
              <button
                type="button"
                onClick={() => {
                  setCvFile(null);
                  setResponse("");
                }}
                className="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded">
                Remove
              </button>
            )}
          </label>
        </div>

        {/* JD Upload Box */}
        <div className="relative w-60 h-48 flex flex-col items-center justify-center">
          <label
            htmlFor="jd-upload"
            className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center px-2">
            <FaUpload className="text-blue-500 text-3xl mb-2" />
            <p className="text-gray-600 font-medium w-full truncate overflow-hidden text-ellipsis">
              {jdFile ? jdFile.name : "Upload JD PDF"}
            </p>
            <input
              id="jd-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setJdFile(e.target.files?.[0] || null)}
            />
            {jdFile && (
              <button
                type="button"
                onClick={() => {
                  setJdFile(null);
                  setResponse("");
                }}
                className="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded">
                Remove
              </button>
            )}
          </label>
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-6 py-2 rounded-lg shadow transition-all duration-200 flex items-center justify-center gap-2`}>
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            "Analyze"
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUpload className="text-red-500" />
              <h2 className="text-lg font-semibold text-red-700">Error</h2>
            </div>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 text-sm">
              Dismiss
            </button>
          </div>
          <p className="text-red-600 mt-2">{error.message}</p>
        </div>
      )}

      {/* Response Box */}
      {response && (
        <div className="mt-8 bg-gray-100 border border-gray-300 rounded-lg p-4 max-h-96 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {response}
          </pre>
        </div>
      )}
    </form>
  );
};
