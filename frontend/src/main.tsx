import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from './components/Header.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductDetail } from './components/ProductDetail.tsx';
import CheckoutPage from './components/CheckoutPage.tsx';
import NotFound from './NotFound.tsx';
import { CartProvider } from './context/CartContext.tsx';
import Home from './components/Home.tsx';
import CustomControllerPage from './components/CustomControllerPage.tsx';
import DropsPage from './components/DropsPage.tsx';
import ForgeAssistant from './components/ForgeAssistant.tsx'
import GalleryPage from './components/GalleryPage.tsx';

// --- INTRANET COMPONENTES ---
import IntranetLayout from './components/IntranetLayout.tsx';
import IntranetHome from './components/IntranetHome.tsx';
import ClockInPage from './components/ClockInPage.tsx';
import ClockHistory from './components/ClockHistory.tsx';
import OrdersPanel from './components/OrdersPanel.tsx';
import IntranetCatalog from './components/IntranetCatalog.tsx';
import AddProductPage from './components/AddProductPage.tsx';
import ComiteSection from './components/ComiteSection.tsx';
import IntranetUsers from './components/IntranetUsers.tsx';
import TablonLogros from './components/TablonLogros.tsx'; 
import DerechosSection from './components/DerechosSection.tsx';
import ContactoComite from './components/ContactoComite.tsx';
import ContactPage from './components/ContactPage.tsx';
import ComingSoon from './components/ComingSoon.tsx';

// --- ADMIN & USER COMPONENTES ---
import AdminUsers from './components/AdminUsers.tsx';
import LoginPage from './components/LoginPage.tsx';
import RegisterPage from './components/RegisterPage.tsx';
import OrderHistory from './components/OrderHistory.tsx';
import OrderSuccess from './components/OrderSuccess.tsx';
import ProfilePage from './components/ProfilePage.tsx';
import { UserProvider, useUser } from './context/UserContext.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

function AppContent() {
  const { loading } = useUser();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Iniciando BlueForge...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<App />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/personalizador" element={<CustomControllerPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/xbox-elite" element={<ComingSoon />} />
        <Route path="/drops" element={<DropsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/assistant" element={<ForgeAssistant />} />
        <Route path="checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
        <Route path="/mis-pedidos" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/order-success" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />
        
        {/* 🔥 EL BLOQUE DE LA INTRANET 🔥 */}
        <Route path="/intranet" element={
          <PrivateRoute roles={["employee", "admin"]}>
            <IntranetLayout />
          </PrivateRoute>
        }>
          <Route index element={<IntranetHome />} />
          
          {/* AQUÍ ESTÁN LAS RUTAS QUE FALTABAN*/}
          <Route path="logros" element={<TablonLogros />} />
          <Route path="derechos" element={<DerechosSection />} />
          <Route path="contacto-comite" element={<ContactoComite />} />
          
          <Route path="fichajes" element={<ClockInPage />} />
          <Route path="pedidos" element={<OrdersPanel />} />
          <Route path="catalogo" element={<IntranetCatalog />} />
          <Route path="catalogo/nuevo" element={<AddProductPage />} />
          <Route path="usuarios" element={<IntranetUsers />} />
          <Route path="historico" element={<ClockHistory />} />
          <Route path="comite" element={<ComiteSection />} />
        </Route>
        
        <Route path="/admin/users" element={<PrivateRoute roles={["admin"]}><AdminUsers /></PrivateRoute>} />
        <Route path="/admin/orders" element={<PrivateRoute roles={["employee", "admin"]}><OrdersPanel /></PrivateRoute>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </UserProvider>
  </StrictMode>,
)