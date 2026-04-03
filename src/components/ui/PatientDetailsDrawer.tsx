import { Activity, Heart, X } from "lucide-react";
// import type { Patient } from "../../types/medical";
import { useEffect, useState } from "react";
import type { Patient, } from '../../types/medical';




interface PatientDetailsDrawerProps {
    onClose: () => void;
    patient: Patient | null;
    onSavePatient: (updates: Partial<Patient>) => void;

}


const PatientDetailsDrawer: React.FC<PatientDetailsDrawerProps> = ({onClose, patient, onSavePatient}) => {

    const [notes, setNotes] = useState(patient?.notes ?? '');
    const [heartRate, setHeartRate] = useState(patient?.vitals?.heart_rate ?? 0 );
    const [bloodPressure, setBloodPressure] = useState(patient?.vitals?.blood_pressure ?? '' );

   
    
   useEffect(() => {
    if(patient) {
        document.body.style.overflow = 'hidden';
    }

    return () => {document.body.style.overflow = 'unset'}
   }, [patient])

    if(!patient) return;

    const handleSave = () => {
      const updates = {
        notes:notes,
        vitals: {
          ...patient?.vitals,
          blood_pressure:bloodPressure,
          heart_rate: heartRate
        }

      };
        onSavePatient(updates)

    }

    

    const priorityColors = {
    low: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-200 text-amber-700",
    high: "bg-red-200 text-red-700",
    emergency: "bg-red-500 text-white  ",
  };

    return(
       <>
      {/* 1. BACKDROP: Dimmed background to focus the eye */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* 2. THE DRAWER: Slides in from the right */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out">
        
        {/* HEADER SECTION */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{patient.full_name}</h2>
            <p className="text-slate-500 text-sm">{patient.email}</p>
            <span className={`mt-2 inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${priorityColors[patient.priority]}`}>
              {patient.priority}
            </span>
          </div>
          <button onClick={onClose}  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* CONTENT SECTION: Vitals Grid */}
        <div className="p-6 space-y-8">
          <section>
            <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4 tracking-widest">Current Vitals</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Vitals Card Component (Mocked data since we'll add this to DB later) */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <Heart className="text-red-500 mb-2" size={20}/>
                <p className="text-xs text-slate-500 uppercase">Heart Rate</p>
                <input type="number" value={heartRate} onChange={(e) => setHeartRate(Number(e.target.value))} className="text-xl font-bold"/>
                <span className="text-sm font-normal text-slate-400">bpm</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <Activity className="text-blue-500 mb-2" size={20}/>
                <p className="text-xs text-slate-500 uppercase">Blood Pressure</p>
                <input value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} className="text-xl font-bold"/>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4 tracking-widest">Clinical Notes</h3>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl">
              <textarea placeholder="Enter clinical notes..." value={notes} onChange={(e) =>setNotes(e.target.value)} className="text-sm w-full resize-none text-slate-700 dark:text-slate-300 leading-relaxed">
              </textarea>
            </div>
          </section>
        </div>

        {/* FOOTER: Actions */}
        <div className="absolute flex gap-2 bottom-0 left-0 right-0 p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <button onClick={onClose} className="w-full bg-gray-500/20 font-bold py-3 rounded-xl transition-colors">
           Cancel
          </button>

          <button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
            Update Vitals
          </button>
          
        </div>
      </div>
    </>

    )
}

export default PatientDetailsDrawer