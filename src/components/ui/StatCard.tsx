interface StatCardProps {
    color: 'red' | 'blue' | 'amber';
    label: string;
    value: number;
}

 const StatCard: React.FC<StatCardProps> = ({color, label, value}) => {

    const colors = {
    blue: "bg-blue-200 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800",
    red: "bg-red-200 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800",
    amber: "bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800",
  };


    return(
        <div className={`p-4 rounded-xl border ${colors[color]} shadow-sm`}>
            <p className=" text-md font-semibold uppercase tracking-wider opacity-80">{label}</p>
            <p className="text-2xl font-bold mt-1 ">{value}</p>
        </div>

    )
 }

 export default StatCard