import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CategoryProvider } from "@/context/CategoryContext";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
// import ProductPage from "@/pages/ProductPage"; // Commented out since module not found
import CartPage from "@/pages/CartPage";
import AuthPage from "@/pages/AuthPage";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CategoryProvider>
          <CartProvider>
            <Layout>
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/products" component={ProductsPage} />
                <Route path="/cart" component={CartPage} />
                <Route path="/auth" component={AuthPage} />
              </Switch>
            </Layout>
          </CartProvider>
        </CategoryProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
