
import { useEffect } from 'react';
import './App.css'
import PatientList from './components/PatientList';
import usePatientStore from './store/usePatientStore';


import AddPatientModal from './components/AddPatientModal';
import { Loader } from 'lucide-react';
import { Toaster } from 'sonner';



function App() {


const patients = usePatientStore((state) => state.patients);
const isLoading = usePatientStore((state) => state.isLoading);
const fetchPatients = usePatientStore((state) => state.fetchPatients);



 useEffect(() => {
  fetchPatients();
 }, [fetchPatients])
 

 if(isLoading && patients.length === 0) {
  
  return <div className='flex flex-col gap-4 items-center justify-center mt-10' >
     <Loader/>
      <p className='text-center p-4'>Fecthing Patients from AetherCare</p> 
     </div>
 }

 


  const handleSelect = (id: string) => {
    alert(`Opening Patient ID: ${id}`);
  };



  return (
    <div className="p-6 relative bg-slate-50 dark:bg-slate-950  transition-colors duration-300 min-h-screen">

      <header className='mb-8 flex justify-between'>
       <div>
         <h1 className='text-3xl font-bold text-slate-900 dark:text-slate-100'>AetherCare Dashboard</h1>
        <p className="text-slate-500  dark:text-slate-100">
            Real-time  {patients.length === 1 ? 'Patient' : 'Patients'} Management
         </p>
       </div>
        <AddPatientModal />



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


      <Toaster position='top-right' richColors closeButton />
     
      
    </div>
  )
}

export default App;
