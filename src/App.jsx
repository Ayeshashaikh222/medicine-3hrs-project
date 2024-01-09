import './App.css'
import CartProvider from './Store/CartProvider'
import Header from './components/Header'
import MedicineForm from './components/MedicineForm'
import MedicineList from './components/MedicineList'

function App() {
     const [medicines, setMedicines] = useState([]);
     
     const addMedicineHandler = (medicine) => {
       setMedicines((prevMedicines) => [...prevMedicines, medicine]);

     };

  return (
    <CartProvider>
       <Header />
       <MedicineForm  onAddMedicine={addMedicineHandler}/>
       <MedicineList medicines={medicines} />
    </CartProvider>
      
  );
}

export default App
