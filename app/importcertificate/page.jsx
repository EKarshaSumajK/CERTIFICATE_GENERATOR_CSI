"use client"
import { Provider } from 'react-redux';
import store from '../Commonstuff/store';
import ImageUpload from './ImageEditor';

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <ImageUpload />
      </div>
    </Provider>
  );
}
