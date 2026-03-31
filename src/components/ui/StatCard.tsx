interface StatCardProps {
    color: 'red' | 'blue' | 'amber';
    label: string;
    value: number;
    onSetStatus?: () => void;
    isActive: boolean;
}

 const StatCard: React.FC<StatCardProps> = ({color, label, value, onSetStatus, isActive}) => {

    const colors = {
    blue: "bg-blue-200 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800",
    red: "bg-red-200 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800",
    amber: "bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800",
  };

  const activeRings = {
    blue: 'ring-blue-500',
    red: 'ring-red-500',
    amber: 'ring-amber-500'
  }




    return(
        <div onClick={onSetStatus} className={`p-4 rounded-xl border ${isActive && `ring-4 ring-offset-2 ${activeRings[color]}'`} ${colors[color]}  shadow-sm`}>
            <p className=" text-md font-semibold uppercase tracking-wider opacity-80">{label}</p>
            <p className="text-2xl font-bold mt-1 ">{value}</p>
        </div>

    )
 }

 export default StatCard