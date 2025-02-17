"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { signInSuccess, signOut } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const categories = [
  "All Categories",
  "Fruits & Vegetables",
  "Daily use Products",
  "Masala & Dry Fruits",
  "Toys",
  "Baby Products",
  "Dairy Bread and Eggs",
];

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [items, setItems] = useState(0);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const { quantity } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/users/getuser");
        const response = res.data;
        dispatch(signInSuccess(response.data));
      } catch (error) {
        dispatch(signOut());
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setItems(quantity);
  }, [quantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/?query=${search}&category=${category}`);
    setSearch("");
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory === "All Categories") {
      router.push("/");
    } else {
      router.push(`/${encodeURIComponent(selectedCategory)}`);
    }
  };

  return (
    <nav className="bg-gradient-to-b from-fuchsia-200 to-white p-4 sticky top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex md:flex-row flex-col justify-center gap-4 md:gap-0 items-center">
          <Link href="/" className="bg-black text-white px-4 py-2">
            Rapid Mart
          </Link>

          {/* Category & Search Bar */}
          <div className="ml-4 flex items-center gap-2">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="px-2 py-2 bg-white border rounded-md focus:outline-none"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 w-[64vw] md:w-[48vw] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </form>
          </div>
        </div>

        {/* Profile & Cart */}
        <div className="md:flex gap-3 items-center hidden">
          <Link
            href={currentUser ? "/profile" : "/login"}
            className={
              !currentUser
                ? "px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                : "px-2 py-2 text-white"
            }
          >
            {currentUser ? <CgProfile size={30} color="black" /> : "Login"}
          </Link>

          <Link href="/cart">
            <div className="cursor-pointer flex items-center justify-center relative">
              <AiOutlineShoppingCart size={30} />
              {items > 0 && (
                <Badge
                  variant="secondary"
                  className="w-4 h-4 flex items-center justify-center text-xs absolute top-0 right-0"
                >
                  {items}
                </Badge>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
