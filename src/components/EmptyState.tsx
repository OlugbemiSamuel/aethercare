import {  SearchX,  } from "lucide-react";
import { Button } from "./ui/Button";

interface EmptyStateProps{
    onAction: () => void;
    title: string;
    description: string;
    actionText?: string;


}

const EmptyState: React.FC<EmptyStateProps> = ({ onAction, title, description, actionText }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
     <div className="bg-white p-4 rounded-full shadow-sm mb-4">
      <SearchX className="text-slate-400" size={40} />
    </div>
      
      <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      
      <p className="mt-2 text-lg text-center text-slate-500 max-w-sm">
        {description}
      </p>

      <div className="mt-6">
        <Button onClick={onAction} variant="primary">
         
          {actionText}
        </Button>
      </div>
    </div>
  );
};

export default EmptyState