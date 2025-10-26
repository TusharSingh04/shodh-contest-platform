import { useState } from 'react';
import { Play } from 'lucide-react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function CodeEditor({ code, onChange, onSubmit, disabled = false }: CodeEditorProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Code Editor</h3>
        <button
          onClick={handleSubmit}
          disabled={loading || disabled}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          <Play className="w-4 h-4 mr-2" />
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      <div className="h-96">
        <MonacoEditor
          height="100%"
          language="java"
          value={code}
          onChange={(value) => onChange(value || '')}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
}
