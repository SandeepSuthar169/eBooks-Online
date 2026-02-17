import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout.jsx"
import AuthLogin from "./pages/auth/Login.jsx"
import AuthRegister from "./pages/auth/Register.jsx"
import AdminLayout from "./components/admin/layout.jsx";
import AdminDashboard from "./pages/admin/dashboard.jsx";
import AdminOrders from "./pages/admin/orders.jsx";
import AdminFeatures from "./pages/admin/features.jsx";
import AdminProducts from "./pages/admin/products.jsx";
import ShoppingHeader from "./components/shopping/header.jsx";
import NotFound from "./pages/not-found/index.jsx";
import ShoppingAccount from "./pages/shopping/account.jsx";
import ShoppingListing from "./pages/shopping/listing.jsx";
import ShoppingHome from "./pages/shopping/home.jsx";
import ShoppingCheckout from "./pages/shopping/checkout.jsx";
import ShoppingLayout from "./components/shopping/layout.jsx";


function App(){

  return (
      <div className='flex flex-col overflow-hidden bg-white'>
        <Routes>
          
          <Route path="/auth" element={<AuthLayout/>}>
            <Route path="login" element={<AuthLogin/>}/>
            <Route path="register" element={<AuthRegister/>}/>
          </Route>

          <Route path="/admin" element={<AdminLayout/>}>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="orders" element={<AdminOrders/>}/>
            <Route path="products" element={<AdminProducts/>}/>
            <Route path="features" element={<AdminFeatures/>}/>
          </Route>

          <Route path="/shop" element={<ShoppingLayout/>}>
            <Route path="account" element={<ShoppingAccount/>}/>
            <Route path="listing" element={<ShoppingListing/>}/>
            <Route path="home" element={<ShoppingHome/>}/>
            <Route path="checkout" element={<ShoppingCheckout/>}/>
          </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
            
      </div>   
  )
}

export default App
