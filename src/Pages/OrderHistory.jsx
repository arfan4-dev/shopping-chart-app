import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import NavbarAdmin from './NavbarAdmin';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const OrderHistory = () => {
  const [productList, setProductList] = useState([]);
  const [data, setData] = useState({
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Price',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(25, 90, 13, 0.5)',
      },
      {
        label: 'Sales',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    // Reference to the Firestore collection
    const db = getFirestore();
    const productsCollection = collection(db, 'products');

    // Fetch data from Firestore
    const fetchDataStore = async () => {
      const querySnapshot = await getDocs(productsCollection);
      const productData = [];
      querySnapshot.forEach((doc) => {
        // Get the data for each product
        productData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      // Update the products state with the data from Firestore
      setProductList(productData[0].addProducts);
    };

    fetchDataStore();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let dataSet1 = productList.length;
      let dataSet2 = productList.reduce((sum, item) => sum + item.price, 0);

      setData({
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: 'Price',
            data: [dataSet1, 0, 0, 0, 0, 0, 0],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(99, 132, 0.5)',
          },
          {
            label: 'Sales',
            data: [dataSet2, 0, 0, 0, 0, 0, 0],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 235, 0.5)',
          },
        ],
      });
    };

    fetchData();
  }, [productList]);

  return (
    <div>
      <div className="bg-slate-900">
        <NavbarAdmin />
      </div>
      <h2 className="text-3xl mb-4 font-bold text-center text-blue-700">Financial Overview</h2>
      <div className="flex flex-col justify-center items-center h-[600px]">
        <h2 className="text-3xl mb-4 font-bold text-center text-blue-700">Financial Overview</h2>
        <div className="w-8/12">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
