import { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

export const FileUploadForm = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile || !jdFile) {
      alert("Both CV and JD PDF files are required.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", cvFile);
    formData.append("jd", jdFile);

    setLoading(true); // Start loader

    try {
      const res = await axios.post("http://localhost:4000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(res.data.result.result);
    } catch (err: unknown) {
      console.error("Upload failed", err);
      setResponse("Something went wrong!");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl"
    >
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-6">
        {/* CV Upload Box */}
        <div className="relative w-60 h-48 flex flex-col items-center justify-center">
          <label
            htmlFor="cv-upload"
            className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center px-2"
          >
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
                onClick={() => setCvFile(null)}
                className="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded"
              >
                Remove
              </button>
            )}
          </label>
        </div>

        {/* JD Upload Box */}
        <div className="relative w-60 h-48 flex flex-col items-center justify-center">
          <label
            htmlFor="jd-upload"
            className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center px-2"
          >
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
                onClick={() => setJdFile(null)}
                className="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded"
              >
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
          } text-white px-6 py-2 rounded-lg shadow transition-all duration-200 flex items-center justify-center gap-2`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Analyzing...
            </>
          ) : (
            "Analyze"
          )}
        </button>
      </div>

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
