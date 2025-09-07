import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Eye,
  Plus,
} from "lucide-react";
import { api } from "../config/apiConfig";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Product states
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    discountPresent: "",
    quantity: "",
    brand: "",
    numRatings: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/admin/products/all");
      if (Array.isArray(res.data)) setProducts(res.data);
      else setProducts([]);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "products") fetchProducts();
  }, [activeTab]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/admin/products/", {
        ...formData,
        createdAt: new Date().toISOString(),
      });
      setFormData({
        imageUrl: "",
        title: "",
        description: "",
        price: "",
        discountPrice: "",
        discountPresent: "",
        quantity: "",
        brand: "",
        numRatings: "",
        topLevelCategory: "",
        secondLevelCategory: "",
        thirdLevelCategory: "",
      });
      fetchProducts();
      alert(" Product added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
      alert(" Failed to add product");
    }
    setLoading(false);
  };

  // Dummy dashboard stats + orders
  const stats = [
    { name: "Total Users", value: "1,234", icon: Users },
    { name: "Total Orders", value: "567", icon: ShoppingBag },
    { name: "Total Products", value: products.length, icon: Package },
    { name: "Revenue", value: "$45,678", icon: BarChart3 },
  ];

  const orders = [
    { id: "#1001", customer: "John Doe", total: "$120.00", date: "2023-06-01", status: "Delivered" },
    { id: "#1002", customer: "Jane Smith", total: "$85.50", date: "2023-06-02", status: "Processing" },
    { id: "#1003", customer: "Mike Johnson", total: "$230.75", date: "2023-06-03", status: "Shipped" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Render dashboard
  const renderDashboard = () => (
    <div className="space-y-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{item.name}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            </div>
            <item.icon className="w-10 h-10 text-amber-700" />
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.total}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setSelectedOrder(order)} className="text-amber-700 flex items-center">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render products
  const renderProducts = () => (
    <div className="space-y-6 mt-6">
      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Plus className="w-5 h-5 mr-2 text-amber-700" /> Add New Product
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type={key.includes("price") || key === "quantity" || key === "numRatings" ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key}
              className="border rounded-lg p-2 text-sm w-full"
              required
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">All Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-3">
                      <img src={p.imageUrl} alt={p.title} className="w-12 h-12 object-cover rounded" />
                    </td>
                    <td className="px-4 py-3">{p.title}</td>
                    <td className="px-4 py-3">Rs {p.price}</td>
                    <td className="px-4 py-3">{p.brand}</td>
                    <td className="px-4 py-3">{p.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="p-6 flex items-center justify-between lg:justify-center border-b">
          <h1 className="text-xl font-bold text-amber-700">Admin Panel</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-10">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "users", label: "Users", icon: Users },
            { id: "orders", label: "Orders", icon: ShoppingBag },
            { id: "products", label: "Products", icon: Package },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-2 text-sm rounded-lg ${
                activeTab === item.id ? "bg-amber-100 text-amber-700 font-medium" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="lg:ml-64 flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="p-6 flex-1">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "users" && <div>Users Management</div>}
          {activeTab === "orders" && <div>Orders Management</div>}
          {activeTab === "products" && renderProducts()}
          {activeTab === "analytics" && <div>Analytics</div>}
          {activeTab === "settings" && <div>Settings</div>}
        </main>
      </div>

      {/* Order details modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 flex justify-between items-center border-b">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="font-medium mb-2">Order ID: {selectedOrder.id}</p>
              <p>Customer: {selectedOrder.customer}</p>
              <p>Total: {selectedOrder.total}</p>
              <p>Date: {selectedOrder.date}</p>
              <p>Status: {selectedOrder.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
