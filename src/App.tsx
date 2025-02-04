import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductInfo from './components/ProductInfo';
import SalesChart from './components/SalesChart';
import SalesTable from './components/SalesTable';
import logo from "./stackline_logo (1).png";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-[#052849] shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img 
                    src={logo}
                    alt="Stackline" 
                    className="h-8 w-auto brightness-0 invert"
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <ProductInfo />
            </div>
            <div className="col-span-12 md:col-span-9 space-y-6">
              <SalesChart />
              <SalesTable />
            </div>
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;