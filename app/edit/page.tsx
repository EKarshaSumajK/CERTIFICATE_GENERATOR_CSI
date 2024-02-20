"use client"
import { Provider } from 'react-redux';
import store from '../Commonstuff/store';
import ImageUploadComponent from './editor';

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        {/* <Navbar/> */}
        <ImageUploadComponent />
      </div>
    </Provider>
  );
}
