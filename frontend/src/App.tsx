import { FileUploadForm } from "./components/FileUploadForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text mb-10">
        CV Evaluator
      </h1>
      <FileUploadForm />
    </div>
  );
}

export default App;
