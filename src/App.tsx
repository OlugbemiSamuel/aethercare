
import { useEffect } from 'react';
import './App.css'
import PatientList from './components/PatientList';
import usePatientStore from './store/usePatientStore';
import type { Patient } from './types/medical';
import { Button } from './components/ui/Button';
import { Plus } from 'lucide-react';
import AddPatientModal from './components/AddPatientModal';



function App() {

 const patients = usePatientStore((state) => state.patients);
 const setPatients = usePatientStore((state) => state.setPatients);

 useEffect(() => {
   const initialData: Patient[] = [
    {
      id: '1',
      full_name: 'John Doe',
      email: 'john@gmail.com',
      phone: '08141378689',
      date_of_birth: '1985-05-15',
      gender: 'male',
      blood_group: 'O+',
      created_at: new Date().toISOString(),
    },
     


  ];

  setPatients(initialData);
 }, [setPatients])


  const handleSelect = (id: string) => {
    alert(`Opening Patient ID: ${id}`);
  };



  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-950  transition-colors duration-300 min-h-screen">

      <header className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900 dark:text-slate-100'>AetherCare Dashboard</h1>
        <p className="text-slate-500  dark:text-slate-100">
            Real-time {patients.length} {patients.length === 1 ? 'Patient' : 'Patients'} Management
         </p>

        <AddPatientModal/>

      </header>

      <main>
        { patients.length > 0 ? (
          <PatientList
        patients={patients}
        onSelectPatient={handleSelect}/>
        ) : (
          <div className="p-10 text-center border-2 border-dashed rounded-xl border-slate-200">
            <p className="text-slate-400">No Patient found in the system</p>
          </div>
        )
        

        }
        
      </main>
     
      
    </div>
  )
}

export default App;
