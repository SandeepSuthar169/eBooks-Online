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
import CheckAuth from "./components/common/check-auth.jsx";
import UnauthPage from "./pages/unauthPage/index.jsx";


function App(){
  const isAuthenticated = false
  const user = null

  return (
      <div className='flex flex-col overflow-hidden bg-white'>
        <Routes>
{/* ================== Auth =========================== */}

          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout/>
            </CheckAuth>
          }>
            <Route path="login" element={<AuthLogin/>}/>
            <Route path="register" element={<AuthRegister/>}/>
          </Route>
{/* =================== Admin ========================== */}

          <Route path="/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout/>
            </CheckAuth>
          }>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="orders" element={<AdminOrders/>}/>
            <Route path="products" element={<AdminProducts/>}/>
            <Route path="features" element={<AdminFeatures/>}/>
          </Route>
{/* ====================== Shop ======================= */}
          <Route path="/shop" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout/>
            </CheckAuth>
          }>
            <Route path="account" element={<ShoppingAccount/>}/>
            <Route path="listing" element={<ShoppingListing/>}/>
            <Route path="home" element={<ShoppingHome/>}/>
            <Route path="checkout" element={<ShoppingCheckout/>}/>
          </Route>

          <Route path="/unauthPage" element={<UnauthPage/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
            
      </div>   
  )
}

export default App
