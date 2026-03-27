import { Search } from "lucide-react";
import { Button } from "./ui/Button";

interface EmptyStateProps{
    onClear: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClear }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
     <Search className="w-12 h-12" />
      
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
        No patients found
      </h3>
      
      <p className="mt-2 text-sm text-slate-500 max-w-xs">
        We couldn't find any medical records matching your search. Try a different name or email .
      </p>

      <div className="mt-6">
        <Button onClick={onClear} variant="primary">
          Clear Search
        </Button>
      </div>
    </div>
  );
};

export default EmptyState