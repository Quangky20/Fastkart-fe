;
import { Routes, Route } from "react-router-dom";
import Home from "./pages/user/home";
import Dashboard from "./pages/admin/dashboard/dashboard";
import ProductList from "./pages/admin/products/product-list";
import UserList from "./pages/admin/users/user-list";
import Login from "./pages/login";
import Admin from "./pages/admin/admin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { getMe } from "./redux/authSlice";
import { useAuth } from "./hooks/useAuth";
import { useSocket } from "./hooks/useSocket";
import NotFound from "./NotFound";
import Shipping from "./pages/admin/shipping/shipping";
import Profile from "./pages/admin/setting/profile";
import ProductDetail from "./pages/user/ProductDetail";
import CartPage from "./pages/user/CartPage";





function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMe());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      console.log("connect");
    }

    function onDisconnect() {
      console.log("disconnect");
    }

    function onBarEvent(value: string) {
      console.log(value);
    }

    setTimeout(() => {
      socket.emit("foo", "client sent foo");
    }, 3000);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("bar", onBarEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("bar", onBarEvent);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>

        {/* Add more routes here as needed */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toast container */}
      <div
        className="toast toast-bottom toast-center"
        id="toast-container"
      ></div>
    </>
  );
}

export default App;
