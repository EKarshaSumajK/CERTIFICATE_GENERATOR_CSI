"use client"
import { Provider } from 'react-redux';
import store from '../Commonstuff/store';
import UploadExcel from './UploadExcel';
// import Navbar from '@/Components/Navbar';

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        {/* <Navbar /> */}
        <UploadExcel />
      </div>
    </Provider>
  );
}
