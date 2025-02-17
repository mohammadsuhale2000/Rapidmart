"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, addItem, clearCart } from "@/store/cartSlice";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.quantity);
  const totalPrice = useSelector((state) => state.cart.price);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <AiOutlineClose
          size={24}
          className="cursor-pointer"
          onClick={onClose}
        />
        {/* comment */}
      </div>

      {/* Cart Items */}
      <div className="p-4 overflow-y-auto h-[70vh]">
        {Object.keys(items).length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <ul>
            {Object.keys(items).map((key) => {
              const item = items[key];
              return (
                <li key={key} className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-3">
                    <img src={item.images} alt={item.name} className="w-12 h-12 rounded" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => dispatch(addItem({ ...item, _id: key }))}
                    >
                      +
                    </button>
                    <p>{item.qty}</p>
                    <button 
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => dispatch(removeItem({ ...item, _id: key }))}
                    >
                      -
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Cart Total & Checkout */}
      <div className="p-4 border-t">
        <p className="font-semibold">Total Items: {totalQuantity}</p>
        <p className="font-semibold">Total Price: ₹{totalPrice.toFixed(2)}</p>
        <Button className="w-full mt-4" onClick={() => router.push(`/payment/?amount=${totalPrice}`)}>
          Checkout
        </Button>
        <Button className="w-full mt-2" variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default CartDrawer;
