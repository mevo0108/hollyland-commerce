import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckIcon } from "@/lib/icons";
import { Order } from "@shared/schema";

const OrderConfirmationPage = () => {
  const params = useParams();
  const orderId = params?.id;
  const [_, navigate] = useLocation();
  
  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: [`/api/orders/${orderId}`],
    enabled: !!orderId,
  });
  
  // If the page is refreshed and there's no order data, redirect to home
  useEffect(() => {
    if (!isLoading && !order && !error) {
      navigate("/");
    }
  }, [isLoading, order, error, navigate]);
  
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the order you're looking for.</p>
        <Button onClick={() => navigate("/")}>
          Return to Home
        </Button>
      </div>
    );
  }
  
  // Format date
  const orderDate = new Date(order.orderDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckIcon className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Order #{order.id}</span>
            <span className="text-sm font-normal text-gray-500">{orderDate}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
              <div className="text-gray-600">
                <p>{order.customerName}</p>
                <p>{order.address}</p>
                <p>{order.city}, {order.state} {order.postalCode}</p>
                <p>{order.country}</p>
                <p className="mt-2">Email: {order.email}</p>
                <p>Phone: {order.phone}</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden mr-4">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          ${parseFloat(item.price.toString()).toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="font-medium">
                      ${(parseFloat(item.price.toString()) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${parseFloat(order.totalAmount.toString()).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          We've sent a confirmation email to {order.email} with your order details.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            Print Receipt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
