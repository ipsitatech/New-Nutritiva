// src/pages/Dashboard.jsx

import "./dashboard.css";
import logo from "../assets/images/Nutritiva-logo.png";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiCreditCard,
  FiTag,
  FiStar,
  FiMessageCircle,
  FiSettings,
  FiLogOut,
  FiBell,
  FiSearch,
  FiClipboard,
  FiPlusCircle,
  FiPackage,
  FiDollarSign,
  FiAlertTriangle,
} from "react-icons/fi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const salesData = [
  { name: "12 May", sales: 10000 },
  { name: "13 May", sales: 18000 },
  { name: "14 May", sales: 15000 },
  { name: "15 May", sales: 25000 },
  { name: "16 May", sales: 20000 },
  { name: "17 May", sales: 18000 },
  { name: "18 May", sales: 30000 },
];

const reportData = [
  { name: "1", sales: 20000 },
  { name: "5", sales: 26000 },
  { name: "10", sales: 18000 },
  { name: "15", sales: 32000 },
  { name: "20", sales: 24000 },
  { name: "25", sales: 30000 },
  { name: "30", sales: 22000 },
];

const pieData = [
  { name: "Nuts", value: 51 },
  { name: "Dry Fruits", value: 35 },
  { name: "Seeds", value: 10 },
  { name: "Others", value: 4 },
];

const COLORS = ["#2d7a4f", "#f4b400", "#4a90e2", "#d9d9d9"];

function Dashboard() {
  return (
    <div className="dashboard">

      {/* SIDEBAR */}

      <div className="sidebar">

        <div>

          <div className="logo-section">
  <img src={logo} alt="Nutritiva Logo" className="sidebar-logo" />

  <div className="logo-text">
    <h2>Nutritiva</h2>
    <p>Dry Fruits</p>
  </div>
</div>

          <ul className="menu">

            <li className="active">
              <FiHome /> Dashboard
            </li>

            <li>
              <FiBox /> Products
            </li>

            <li>
              <FiShoppingCart /> Orders
            </li>

            <li>
              <FiUsers /> Customers
            </li>

            <li>
              <FiCreditCard /> Payments
            </li>

            <li>
              <FiClipboard /> Inventory
            </li>

            <li>
              <FiTag /> Reports
            </li>

            <li>
              <FiStar /> Reviews
            </li>

            <li>
              <FiMessageCircle /> Messages
            </li>

            <li>
              <FiSettings /> Settings
            </li>

          </ul>

        </div>

        <div className="logout">
          <FiLogOut /> Logout
        </div>

      </div>

      {/* MAIN */}

      <div className="main">

        {/* TOPBAR */}

        <div className="topbar">

          <div className="search-box">
            <FiSearch />
            <input type="text" placeholder="Search anything..." />
          </div>

          <div className="top-right">

            <FiBell className="icon" />

            <select className="role-select">
              <option>Vendor</option>
              <option>Seller</option>
            </select>

            <div className="profile">
              <div className="avatar">NS</div>
              <h4>Nutritiva Store</h4>
            </div>

          </div>

        </div>

        {/* WELCOME */}

        <div className="welcome">
          <h1>Welcome back, Nutritiva Store 👋</h1>
          <p>Here's what's happening with your business today.</p>
        </div>

        {/* CARDS */}

        <div className="cards">

          <div className="card">
            <h4>Total Orders</h4>
            <h2>248</h2>
            <p>↑ 12.5%</p>
          </div>

          <div className="card">
            <h4>Total Sales</h4>
            <h2>₹85,420</h2>
            <p>↑ 15.3%</p>
          </div>

          <div className="card">
            <h4>Total Customers</h4>
            <h2>632</h2>
            <p>↑ 8.7%</p>
          </div>

          <div className="card">
            <h4>Pending Orders</h4>
            <h2>32</h2>
            <p className="red">↓ 5.1%</p>
          </div>

          <div className="card">
            <h4>Total Earnings</h4>
            <h2>₹4,85,240</h2>
            <p>↑ 18.4%</p>
          </div>

        </div>

        {/* CHARTS */}

        <div className="charts">

          {/* SALES OVERVIEW */}

          <div className="chart-card">

            <h3>Sales Overview</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>

                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2d7a4f"
                  strokeWidth={3}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

          {/* CATEGORY SALES */}

          <div className="chart-card">

            <h3>Category Sales</h3>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={90}
                  innerRadius={55}
                  label
                >

                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* BOTTOM GRID */}

        <div className="bottom-grid">

          {/* SALES REPORT */}

          <div className="report-card">

            <div className="card-header">
              <h3>Sales Report</h3>

              <select>
                <option>This Month</option>
              </select>
            </div>

            <div className="report-stats">

              <div>
                <h4>Total Sales</h4>
                <h2>₹2,45,680</h2>
              </div>

              <div>
                <h4>Total Orders</h4>
                <h2>732</h2>
              </div>

              <div>
                <h4>Avg. Order Value</h4>
                <h2>₹335</h2>
              </div>

            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={reportData}>

                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="sales"
                  fill="#2d7a4f"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* INVENTORY SUMMARY */}

          <div className="inventory-card">

            <div className="card-header">
              <h3>Inventory Summary</h3>
            </div>

            <div className="inventory-item">
              <span>Total Products</span>
              <h4>136</h4>
            </div>

            <div className="inventory-item">
              <span>Low Stock Items</span>
              <h4>18</h4>
            </div>

            <div className="inventory-item">
              <span>Out of Stock</span>
              <h4>5</h4>
            </div>

            <div className="inventory-item">
              <span>Active Listings</span>
              <h4>126</h4>
            </div>

            <button className="inventory-btn">
              Manage Inventory
            </button>

          </div>

          {/* PAYMENT OVERVIEW */}

          <div className="payment-card">

            <div className="card-header">

              <h3>Payment Overview</h3>

              <select>
                <option>This Month</option>
              </select>

            </div>

            <div className="payment-content">

              <div className="payment-total">
                <h2>₹45,680</h2>
                <p>Total Earnings</p>
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={85}
                    innerRadius={50}
                    label
                  >

                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}

                  </Pie>

                  <Tooltip />
                  <Legend />

                </PieChart>
              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* QUICK ACTIONS & ALERTS */}

        <div className="action-alert-grid">

          {/* QUICK ACTIONS */}

          <div className="quick-actions">

            <div className="section-header">
              <h3>Quick Actions</h3>
            </div>

            <div className="action-grid">

              <div className="action-card">
                <FiPlusCircle className="action-icon" />
                <span>Add Product</span>
              </div>

              <div className="action-card">
                <FiShoppingCart className="action-icon" />
                <span>New Orders</span>
              </div>

              <div className="action-card">
                <FiPackage className="action-icon" />
                <span>Manage Stocks</span>
              </div>

              <div className="action-card">
                <FiDollarSign className="action-icon" />
                <span>Payouts</span>
              </div>

              <div className="action-card">
                <FiMessageCircle className="action-icon" />
                <span>Messages</span>
              </div>

              <div className="action-card">
                <FiTag className="action-icon" />
                <span>Coupons</span>
              </div>

            </div>

          </div>

          {/* ALERTS */}

          <div className="alert-card">

            <div className="section-header">
              <h3>Alerts & Notifications</h3>
            </div>

            <div className="alert-item">
              <FiAlertTriangle className="alert-icon" />
              <span>Almonds 1kg stock is running low</span>
            </div>

            <div className="alert-item">
              <FiShoppingCart className="alert-icon" />
              <span>12 new orders received today</span>
            </div>

            <div className="alert-item">
              <FiAlertTriangle className="alert-icon" />
              <span>Pistachios are almost out of stock</span>
            </div>

            <div className="alert-item">
              <FiDollarSign className="alert-icon" />
              <span>New payout received successfully</span>
            </div>

          </div>

        </div>

        {/* RECENT ORDERS */}

        <div className="table-card">

          <h3>Recent Orders</h3>

          <table>

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>#ORD1021</td>
                <td>Rahul Sharma</td>
                <td>Almonds 1kg</td>
                <td>Delivered</td>
                <td>₹850</td>
              </tr>

              <tr>
                <td>#ORD1022</td>
                <td>Priya Das</td>
                <td>Cashew Nuts</td>
                <td>Pending</td>
                <td>₹1020</td>
              </tr>

              <tr>
                <td>#ORD1023</td>
                <td>Aman Roy</td>
                <td>Walnuts</td>
                <td>Shipped</td>
                <td>₹760</td>
              </tr>

              <tr>
                <td>#ORD1024</td>
                <td>Ritika Sen</td>
                <td>Pistachios</td>
                <td>Delivered</td>
                <td>₹1120</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;