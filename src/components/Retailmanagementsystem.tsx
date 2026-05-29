import { useState } from "react";
import {
  Package,
  AlertTriangle,
  ShoppingCart,
  BarChart2,
  LogOut,
  ChevronRight,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Tag,
  Truck,
  FileText,
  RefreshCw,
  CheckCircle,
  Clock,
  Zap,
  Users,
  MapPin,
  ChevronDown,
  Eye,
  Edit2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ─── Theme & Mock Data ───────────────────────────────────────────────────────

const COLORS = {
  primary: "#E8620A",
  primaryLight: "#FF8C42",
  bg: "#0F1117",
  card: "#1A1D27",
  cardHover: "#1F2335",
  border: "#2A2E42",
  text: "#E2E8F0",
  textMuted: "#6B7280",
  textDim: "#9CA3AF",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
};

const MOCK_INVENTORY = [
  {
    id: 1,
    name: "Haldiram Khatta Meetha",
    rack: "R3",
    batch: "MAR-24",
    stock: 18,
    min: 20,
    max: 100,
    notif: 30,
    expiry: "2024-08-15",
    category: "Namkeen",
    price: 93,
    mrp: 100,
    status: "low",
  },
  {
    id: 2,
    name: "Haldiram Aloo Bhujia",
    rack: "R3",
    batch: "MAY-24",
    stock: 65,
    min: 20,
    max: 100,
    notif: 30,
    expiry: "2024-10-20",
    category: "Namkeen",
    price: 88,
    mrp: 100,
    status: "ok",
  },
  {
    id: 3,
    name: "Mirchi Powder (House)",
    rack: "R1",
    batch: "MAY-24",
    stock: 42,
    min: 10,
    max: 60,
    notif: 20,
    expiry: "2024-08-01",
    category: "Masala",
    price: 240,
    mrp: 280,
    status: "expiring",
  },
  {
    id: 4,
    name: "Haldi Powder (House)",
    rack: "R1",
    batch: "APR-24",
    stock: 8,
    min: 10,
    max: 60,
    notif: 20,
    expiry: "2024-09-12",
    category: "Masala",
    price: 190,
    mrp: 220,
    status: "critical",
  },
  {
    id: 5,
    name: "Neelam Mirch Masala",
    rack: "R2",
    batch: "APR-24",
    stock: 55,
    min: 20,
    max: 60,
    notif: 25,
    expiry: "2024-11-05",
    category: "Masala",
    price: 145,
    mrp: 180,
    status: "ok",
  },
  {
    id: 6,
    name: "Besan Sev",
    rack: "R4",
    batch: "MAY-24",
    stock: 30,
    min: 15,
    max: 80,
    notif: 25,
    expiry: "2024-07-20",
    category: "Namkeen",
    price: 65,
    mrp: 80,
    status: "expiring",
  },
  {
    id: 7,
    name: "Boney Silicone Nipple",
    rack: "R7",
    batch: "JAN-24",
    stock: 12,
    min: 5,
    max: 30,
    notif: 10,
    expiry: "2026-01-01",
    category: "Baby",
    price: 45,
    mrp: 60,
    status: "ok",
  },
];

const MOCK_BATCHES = [
  {
    id: 1,
    product: "Mirchi Powder",
    batchNo: "B-2405-01",
    date: "2024-05-10",
    rawQty: 100,
    bagWeight: 0.7,
    cleaningLoss: 2.3,
    grindingLoss: 1.1,
    laborHours: 3,
    electricity: 4.5,
    rawCost: 200,
    gst: 5,
    finalCost: 240,
    status: "complete",
  },
  {
    id: 2,
    product: "Haldi Powder",
    batchNo: "B-2405-02",
    date: "2024-05-14",
    rawQty: 50,
    bagWeight: 0.5,
    cleaningLoss: 1.2,
    grindingLoss: 0.8,
    laborHours: 1.5,
    electricity: 2.2,
    rawCost: 160,
    gst: 5,
    finalCost: 185,
    status: "complete",
  },
  {
    id: 3,
    product: "Besan Sev Masala",
    batchNo: "B-2405-03",
    date: "2024-05-20",
    rawQty: 80,
    bagWeight: 0,
    cleaningLoss: 0,
    grindingLoss: 0,
    laborHours: 8,
    electricity: 6,
    rawCost: 95,
    gst: 12,
    finalCost: 118,
    status: "in-progress",
  },
];

const MOCK_PRICING = [
  {
    id: 1,
    umbrella: "Namkeen",
    items: 24,
    tier1: "Wholesale -8%",
    tier2: "Retail -3%",
    tier3: "Normal MRP",
    active: 3,
    lastChanged: "Today 09:30",
  },
  {
    id: 2,
    umbrella: "Masala (House)",
    items: 12,
    tier1: "Wholesale -10%",
    tier2: "Retail -5%",
    tier3: "Normal MRP",
    active: 3,
    lastChanged: "May 20",
  },
  {
    id: 3,
    umbrella: "Baby Products",
    items: 8,
    tier1: "Wholesale -6%",
    tier2: "Retail -2%",
    tier3: "Normal MRP",
    active: 3,
    lastChanged: "May 15",
  },
  {
    id: 4,
    umbrella: "Beverages",
    items: 18,
    tier1: "Wholesale -7%",
    tier2: "Retail -3%",
    tier3: "Normal MRP",
    active: 3,
    lastChanged: "May 10",
  },
];

const MOCK_ALERTS = [
  {
    id: 1,
    type: "expiry",
    msg: "Besan Sev (R4) expires in 27 days — batch MAY-24",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "stock",
    msg: "Haldi Powder below minimum (8 < 10 pcs)",
    time: "15 min ago",
  },
  {
    id: 3,
    type: "fifo",
    msg: "MAR-24 Khatta Meetha still in stock! Newer batch being billed",
    time: "1 hr ago",
  },
  {
    id: 4,
    type: "expiry",
    msg: "Mirchi Powder (House) nearing expiry — 68 days left",
    time: "3 hrs ago",
  },
];

const SALES_DATA = [
  { day: "Mon", sales: 12400, orders: 38 },
  { day: "Tue", sales: 18200, orders: 52 },
  { day: "Wed", sales: 14600, orders: 44 },
  { day: "Thu", sales: 22100, orders: 67 },
  { day: "Fri", sales: 19800, orders: 59 },
  { day: "Sat", sales: 28500, orders: 84 },
  { day: "Sun", sales: 16300, orders: 48 },
];

const CATEGORY_DATA = [
  { name: "Namkeen", value: 42 },
  { name: "Masala", value: 28 },
  { name: "Beverages", value: 18 },
  { name: "Baby", value: 12 },
];

const PIE_COLORS = ["#E8620A", "#F59E0B", "#3B82F6", "#22C55E"];

const LOCATIONS = ["Hoshangabad", "Timarni", "Bhopal"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function Badge({ type, label = null }) {
  const map = {
    ok: { bg: "#14532d", text: "#86efac", dot: "#22C55E" },
    low: { bg: "#78350f", text: "#fcd34d", dot: "#F59E0B" },
    critical: { bg: "#7f1d1d", text: "#fca5a5", dot: "#EF4444" },
    expiring: { bg: "#1e3a5f", text: "#93c5fd", dot: "#3B82F6" },
    "in-progress": { bg: "#312e81", text: "#a5b4fc", dot: "#818CF8" },
    complete: { bg: "#14532d", text: "#86efac", dot: "#22C55E" },
  };
  const s = map[type] || map.ok;
  return (
    <span
      style={{
        background: s.bg,
        color: s.text,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 0.5,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: s.dot,
          display: "inline-block",
        }}
      />
      {label || type.toUpperCase()}
    </span>
  );
}

function KPICard({ icon: Icon, label, value, sub, trend, color }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 500 }}
        >
          {label}
        </span>
        <div style={{ background: color + "22", borderRadius: 8, padding: 8 }}>
          <Icon size={16} color={color} />
        </div>
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: COLORS.text,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {value}
      </div>
      <div
        style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}
      >
        {trend > 0 ? (
          <ArrowUpRight size={13} color={COLORS.success} />
        ) : (
          <ArrowDownRight size={13} color={COLORS.danger} />
        )}
        <span
          style={{
            color: trend > 0 ? COLORS.success : COLORS.danger,
            fontWeight: 600,
          }}
        >
          {Math.abs(trend)}%
        </span>
        <span style={{ color: COLORS.textMuted }}>{sub}</span>
      </div>
    </div>
  );
}

function SectionHeader({ title, action = null }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <h2
        style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: 0 }}
      >
        {title}
      </h2>
      {action && (
        <button
          onClick={action.fn}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "7px 14px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Plus size={14} />
          {action.label}
        </button>
      )}
    </div>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────

function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Alerts Banner */}
      {MOCK_ALERTS.length > 0 && (
        <div
          style={{
            background: "#7f1d1d22",
            border: "1px solid #7f1d1d",
            borderRadius: 12,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <AlertTriangle size={16} color={COLORS.danger} />
          <span style={{ color: "#fca5a5", fontSize: 13, fontWeight: 500 }}>
            {MOCK_ALERTS[0].msg}
          </span>
          <span
            style={{
              color: COLORS.textMuted,
              fontSize: 12,
              marginLeft: "auto",
            }}
          >
            {MOCK_ALERTS[0].time}
          </span>
        </div>
      )}

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        <KPICard
          icon={ShoppingCart}
          label="Today's Sales"
          value="₹28,450"
          sub="vs yesterday"
          trend={12}
          color={COLORS.primary}
        />
        <KPICard
          icon={Package}
          label="Total SKUs"
          value="247"
          sub="vs last month"
          trend={4}
          color={COLORS.info}
        />
        <KPICard
          icon={AlertTriangle}
          label="Low Stock Items"
          value="6"
          sub="needs attention"
          trend={-2}
          color={COLORS.warning}
        />
        <KPICard
          icon={Clock}
          label="Near Expiry"
          value="4"
          sub="within 90 days"
          trend={-1}
          color={COLORS.danger}
        />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 14,
            padding: 24,
          }}
        >
          <SectionHeader title="Weekly Sales (₹)" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SALES_DATA} barSize={28}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={COLORS.border}
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: COLORS.textMuted, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: COLORS.textMuted, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: COLORS.cardHover,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  color: COLORS.text,
                }}
                formatter={(v) => [`₹${v.toLocaleString()}`, "Sales"]}
              />
              <Bar
                dataKey="sales"
                fill={COLORS.primary}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 14,
            padding: 24,
          }}
        >
          <SectionHeader title="Category Mix" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={CATEGORY_DATA}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {CATEGORY_DATA.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: COLORS.cardHover,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {CATEGORY_DATA.map((c, i) => (
              <span
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  color: COLORS.textDim,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: PIE_COLORS[i],
                    display: "inline-block",
                  }}
                />
                {c.name} {c.value}%
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: 24,
        }}
      >
        <SectionHeader title="System Alerts" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {MOCK_ALERTS.map((a) => {
            const icon =
              a.type === "expiry"
                ? Clock
                : a.type === "fifo"
                  ? RefreshCw
                  : AlertTriangle;
            const Icon = icon;
            const color =
              a.type === "expiry"
                ? COLORS.info
                : a.type === "fifo"
                  ? COLORS.warning
                  : COLORS.danger;
            return (
              <div
                key={a.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 16px",
                  background: COLORS.cardHover,
                  borderRadius: 10,
                  border: `1px solid ${color}33`,
                }}
              >
                <Icon size={15} color={color} />
                <span style={{ fontSize: 13, color: COLORS.text, flex: 1 }}>
                  {a.msg}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: COLORS.textMuted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.time}
                </span>
                <button
                  style={{
                    background: color + "22",
                    border: "none",
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 11,
                    color,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Resolve
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InventoryPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_INVENTORY.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || item.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {/* Search */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: "10px 16px",
          }}
        >
          <Search size={15} color={COLORS.textMuted} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: COLORS.text,
              fontSize: 14,
              flex: 1,
            }}
          />
        </div>
        {/* Filters */}
        {["all", "ok", "low", "critical", "expiring"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "9px 16px",
              borderRadius: 8,
              border: `1px solid ${filter === f ? COLORS.primary : COLORS.border}`,
              background: filter === f ? COLORS.primary + "22" : "transparent",
              color: filter === f ? COLORS.primary : COLORS.textMuted,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {f}
          </button>
        ))}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "9px 16px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Plus size={14} /> Add Item
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              {[
                "Item Name",
                "Rack",
                "Batch",
                "Stock",
                "Min/Max",
                "Expiry",
                "Category",
                "Status",
                "",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 600,
                    color: COLORS.textMuted,
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const daysLeft = Math.floor(
                (new Date(item.expiry).getTime() - new Date().getTime()) / 86400000,
              );
              const expiryColor =
                daysLeft < 30
                  ? COLORS.danger
                  : daysLeft < 90
                    ? COLORS.warning
                    : COLORS.success;
              return (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: `1px solid ${COLORS.border}`,
                    background: i % 2 === 0 ? "transparent" : "#ffffff04",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = COLORS.cardHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      i % 2 === 0 ? "transparent" : "#ffffff04")
                  }
                >
                  <td
                    style={{
                      padding: "13px 16px",
                      fontSize: 13,
                      color: COLORS.text,
                      fontWeight: 500,
                    }}
                  >
                    {item.name}
                  </td>
                  <td
                    style={{
                      padding: "13px 16px",
                      fontSize: 12,
                      color: COLORS.textDim,
                    }}
                  >
                    <span
                      style={{
                        background: COLORS.border,
                        borderRadius: 4,
                        padding: "3px 8px",
                        fontFamily: "monospace",
                      }}
                    >
                      {item.rack}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "13px 16px",
                      fontSize: 12,
                      color: COLORS.textDim,
                      fontFamily: "monospace",
                    }}
                  >
                    {item.batch}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color:
                            item.stock < item.min ? COLORS.danger : COLORS.text,
                        }}
                      >
                        {item.stock}
                      </span>
                      <div
                        style={{
                          width: 50,
                          height: 4,
                          background: COLORS.border,
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.min((item.stock / item.max) * 100, 100)}%`,
                            height: "100%",
                            background:
                              item.stock < item.min
                                ? COLORS.danger
                                : item.stock < item.notif
                                  ? COLORS.warning
                                  : COLORS.success,
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "13px 16px",
                      fontSize: 12,
                      color: COLORS.textMuted,
                    }}
                  >
                    {item.min} / {item.max}
                  </td>
                  <td
                    style={{
                      padding: "13px 16px",
                      fontSize: 12,
                      color: expiryColor,
                      fontWeight: 500,
                    }}
                  >
                    {item.expiry}{" "}
                    <span style={{ fontSize: 11, opacity: 0.7 }}>
                      ({daysLeft}d)
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "13px 16px",
                      fontSize: 12,
                      color: COLORS.textMuted,
                    }}
                  >
                    {item.category}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <Badge type={item.status} />
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        style={{
                          background: "none",
                          border: `1px solid ${COLORS.border}`,
                          borderRadius: 6,
                          padding: "4px 8px",
                          color: COLORS.textMuted,
                          cursor: "pointer",
                        }}
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        style={{
                          background: "none",
                          border: `1px solid ${COLORS.border}`,
                          borderRadius: 6,
                          padding: "4px 8px",
                          color: COLORS.textMuted,
                          cursor: "pointer",
                        }}
                      >
                        <Eye size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: 40,
              color: COLORS.textMuted,
              fontSize: 14,
            }}
          >
            No items match your filter.
          </div>
        )}
      </div>

      {/* FIFO Alert Demo */}
      <div
        style={{
          background: "#78350f22",
          border: "1px solid #78350f",
          borderRadius: 12,
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <RefreshCw size={15} color={COLORS.warning} />
          <span
            style={{ color: COLORS.warning, fontWeight: 700, fontSize: 13 }}
          >
            FIFO Warning — System Pop-up Preview
          </span>
        </div>
        <p style={{ color: "#fcd34d", fontSize: 13, margin: 0 }}>
          ⚠️ You are billing <strong>MAY-24 batch</strong> of Haldiram Khatta
          Meetha, but <strong>MAR-24 batch (18 pcs)</strong> is still in stock.
          Please bill the older batch first!
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button
            style={{
              background: COLORS.warning,
              border: "none",
              borderRadius: 6,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: "#000",
              cursor: "pointer",
            }}
          >
            Switch to MAR-24 Batch
          </button>
          <button
            style={{
              background: "transparent",
              border: `1px solid ${COLORS.warning}`,
              borderRadius: 6,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.warning,
              cursor: "pointer",
            }}
          >
            Override (Record in Log)
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductionPage() {
  const [active, setActive] = useState(null);
  const [form, setForm] = useState({
    product: "Mirchi Powder",
    rawQty: 100,
    rawCost: 200,
    bagWeight: 0.7,
    cleaningLoss: 2.3,
    laborHours: 3,
    laborRate: 1250,
    electricity: 4.5,
    electricityRate: 8,
    grindingLoss: 1.1,
    gst: 5,
  });

  const netQty =
    form.rawQty - form.bagWeight - form.cleaningLoss - form.grindingLoss;
  const laborCost = (form.laborHours / 8) * form.laborRate;
  const elecCost = form.electricity * form.electricityRate;
  const totalCost = form.rawQty * form.rawCost + laborCost + elecCost;
  const perKgCost = netQty > 0 ? totalCost / netQty : 0;
  const withGST = perKgCost * (1 + form.gst / 100);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: parseFloat(v) || 0 }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Batch History */}
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: 24,
        }}
      >
        <SectionHeader
          title="Batch Production History"
          action={{ label: "New Batch", fn: () => {} }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {MOCK_BATCHES.map((b) => (
            <div
              key={b.id}
              onClick={() => setActive(active === b.id ? null : b.id)}
              style={{
                padding: "14px 16px",
                borderRadius: 10,
                background: active === b.id ? COLORS.cardHover : "transparent",
                border: `1px solid ${active === b.id ? COLORS.primary : "transparent"}`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 16,
                transition: "all 0.15s",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}
                >
                  {b.product}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                  {b.batchNo} · {b.date}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: COLORS.primary,
                  }}
                >
                  ₹{b.finalCost}/kg
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                  Raw: ₹{b.rawCost}/kg
                </div>
              </div>
              <Badge
                type={b.status}
                label={b.status === "complete" ? "Done" : "In Progress"}
              />
              <ChevronDown
                size={14}
                color={COLORS.textMuted}
                style={{
                  transform: active === b.id ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Live Costing Calculator */}
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: 24,
        }}
      >
        <SectionHeader title="Batch Cost Calculator (Live)" />
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          {/* Inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Product Name", key: "product", type: "text" },
              { label: "Raw Material Qty (kg)", key: "rawQty" },
              { label: "Raw Material Cost (₹/kg)", key: "rawCost" },
              { label: "Bag / Sack Weight (kg)", key: "bagWeight" },
              { label: "Cleaning Loss (kg)", key: "cleaningLoss" },
              { label: "Grinding/Fume Loss (kg)", key: "grindingLoss" },
              { label: "Labor Hours", key: "laborHours" },
              { label: "Daily Labor Cost (₹)", key: "laborRate" },
              { label: "Electricity Used (units)", key: "electricity" },
              { label: "Electricity Rate (₹/unit)", key: "electricityRate" },
              { label: "GST %", key: "gst" },
            ].map(({ label, key, type = "number" }) => (
              <div
                key={key}
                style={{ display: "flex", flexDirection: "column", gap: 5 }}
              >
                <label
                  style={{
                    fontSize: 11,
                    color: COLORS.textMuted,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                >
                  {label.toUpperCase()}
                </label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) =>
                    type === "text"
                      ? setForm((p) => ({ ...p, [key]: e.target.value }))
                      : update(key, e.target.value)
                  }
                  style={{
                    background: COLORS.bg,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    padding: "9px 12px",
                    color: COLORS.text,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                background: COLORS.bg,
                borderRadius: 12,
                padding: 20,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.textMuted,
                  fontWeight: 600,
                  marginBottom: 14,
                  letterSpacing: 0.5,
                }}
              >
                COSTING BREAKDOWN
              </div>
              {[
                { label: "Raw Qty Input", val: `${form.rawQty} kg` },
                {
                  label: "Total Deductions",
                  val: `${(form.bagWeight + form.cleaningLoss + form.grindingLoss).toFixed(2)} kg`,
                  color: COLORS.danger,
                },
                {
                  label: "Net Processable Qty",
                  val: `${netQty.toFixed(2)} kg`,
                  color: COLORS.success,
                  bold: true,
                },
                {
                  label: "Raw Material Cost",
                  val: `₹${(form.rawQty * form.rawCost).toFixed(2)}`,
                },
                { label: "Labor Cost", val: `₹${laborCost.toFixed(2)}` },
                { label: "Electricity Cost", val: `₹${elecCost.toFixed(2)}` },
                {
                  label: "Total Production Cost",
                  val: `₹${totalCost.toFixed(2)}`,
                  bold: true,
                },
                {
                  label: "Cost per KG (pre-GST)",
                  val: `₹${perKgCost.toFixed(2)}`,
                  color: COLORS.warning,
                  bold: true,
                },
                {
                  label: `Cost per KG (+${form.gst}% GST)`,
                  val: `₹${withGST.toFixed(2)}`,
                  color: COLORS.primary,
                  bold: true,
                },
              ].map(({ label, val, color, bold }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  <span style={{ fontSize: 13, color: COLORS.textMuted }}>
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: bold ? 700 : 500,
                      color: color || COLORS.text,
                    }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.primary}11)`,
                border: `1px solid ${COLORS.primary}55`,
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.primary,
                  fontWeight: 600,
                  letterSpacing: 1,
                  marginBottom: 8,
                }}
              >
                FINAL PRODUCTION COST/KG
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  color: COLORS.primaryLight,
                  fontFamily: "monospace",
                }}
              >
                ₹{withGST.toFixed(2)}
              </div>
              <div
                style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 6 }}
              >
                After all deductions & GST
              </div>
            </div>

            <button
              style={{
                background: COLORS.primary,
                border: "none",
                borderRadius: 10,
                padding: "12px 20px",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <CheckCircle size={16} /> Save Batch Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingPage() {
  const [umbrellaActive, setUmbrellaActive] = useState(null);
  const [tierOverride, setTierOverride] = useState({});

  const activeTier = (id) => tierOverride[id] || 3;
  const setTier = (id, t) => setTierOverride((p) => ({ ...p, [id]: t }));

  const tierLabels = { 1: "Wholesale", 2: "Retail", 3: "Normal" };
  const tierColors = { 1: COLORS.info, 2: COLORS.warning, 3: COLORS.success };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Zap size={15} color={COLORS.warning} />
          <span
            style={{ color: COLORS.warning, fontWeight: 700, fontSize: 13 }}
          >
            Umbrella Price Control
          </span>
        </div>
        <p style={{ color: COLORS.textMuted, fontSize: 13, margin: 0 }}>
          Switching an umbrella's active tier instantly changes all items under
          it. Use for flash sales, daily pricing mode, or clearing old stock.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MOCK_PRICING.map((u) => (
          <div
            key={u.id}
            style={{
              background: COLORS.card,
              border: `1px solid ${umbrellaActive === u.id ? COLORS.primary : COLORS.border}`,
              borderRadius: 14,
              overflow: "hidden",
              transition: "border-color 0.2s",
            }}
          >
            <div
              onClick={() =>
                setUmbrellaActive(umbrellaActive === u.id ? null : u.id)
              }
              style={{
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                cursor: "pointer",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}
                >
                  {u.umbrella}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                  {u.items} items · Last changed: {u.lastChanged}
                </div>
              </div>

              {/* Tier Switcher */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "flex",
                  gap: 6,
                  background: COLORS.bg,
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                {[1, 2, 3].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTier(u.id, t)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 7,
                      border: "none",
                      background:
                        activeTier(u.id) === t ? tierColors[t] : "transparent",
                      color: activeTier(u.id) === t ? "#fff" : COLORS.textMuted,
                      fontWeight: 600,
                      fontSize: 12,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {tierLabels[t]}
                  </button>
                ))}
              </div>

              <div style={{ textAlign: "right", minWidth: 100 }}>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                  Active Tier
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: tierColors[activeTier(u.id)],
                  }}
                >
                  {tierLabels[activeTier(u.id)]}
                </div>
              </div>
              <ChevronDown
                size={15}
                color={COLORS.textMuted}
                style={{
                  transform:
                    umbrellaActive === u.id ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
            </div>

            {umbrellaActive === u.id && (
              <div
                style={{
                  borderTop: `1px solid ${COLORS.border}`,
                  padding: "16px 24px",
                  background: COLORS.cardHover,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  {[1, 2, 3].map((t) => (
                    <div
                      key={t}
                      style={{
                        background: COLORS.bg,
                        border: `1px solid ${activeTier(u.id) === t ? tierColors[t] : COLORS.border}`,
                        borderRadius: 10,
                        padding: "14px 16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: tierColors[t],
                          }}
                        >
                          {tierLabels[t]} Price
                        </span>
                        {activeTier(u.id) === t && (
                          <CheckCircle size={13} color={tierColors[t]} />
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.textDim }}>
                        {u[`tier${t}`]}
                      </div>
                      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                        <input
                          defaultValue={t === 1 ? 8 : t === 2 ? 3 : 0}
                          style={{
                            width: "60px",
                            background: COLORS.border,
                            border: "none",
                            borderRadius: 5,
                            padding: "5px 8px",
                            color: COLORS.text,
                            fontSize: 12,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 12,
                            color: COLORS.textMuted,
                            alignSelf: "center",
                          }}
                        >
                          % discount
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    style={{
                      background: COLORS.primary,
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 18px",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Apply to All {u.items} Items
                  </button>
                  <button
                    style={{
                      background: "transparent",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 8,
                      padding: "8px 18px",
                      color: COLORS.textMuted,
                      fontWeight: 600,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Schedule Price Change
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Purchase → Sale Margin Calculator */}
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: 24,
        }}
      >
        <SectionHeader title="Purchase → Sale Margin Calculator" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {[
            { label: "Purchase Price (₹)", val: "88.00" },
            { label: "GST %", val: "5" },
            { label: "Freight (₹)", val: "2.50" },
            { label: "Other Expenses (₹)", val: "1.20" },
            { label: "MRP (₹)", val: "100.00" },
          ].map(({ label, val }) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", gap: 5 }}
            >
              <label
                style={{
                  fontSize: 11,
                  color: COLORS.textMuted,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                {label.toUpperCase()}
              </label>
              <input
                defaultValue={val}
                style={{
                  background: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: "9px 12px",
                  color: COLORS.text,
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label
              style={{
                fontSize: 11,
                color: COLORS.textMuted,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              ACTUAL COST (₹)
            </label>
            <div
              style={{
                background: COLORS.bg,
                border: `1px solid ${COLORS.primary}`,
                borderRadius: 8,
                padding: "9px 12px",
                color: COLORS.primary,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              93.12
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label
              style={{
                fontSize: 11,
                color: COLORS.textMuted,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              MARGIN (₹ / %)
            </label>
            <div
              style={{
                background: "#14532d22",
                border: `1px solid ${COLORS.success}`,
                borderRadius: 8,
                padding: "9px 12px",
                color: COLORS.success,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              ₹6.88 · 6.9%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {[
          {
            icon: FileText,
            title: "Daily Book",
            desc: "Full day transactions, price changes, FIFO overrides",
            color: COLORS.primary,
          },
          {
            icon: AlertTriangle,
            title: "Expiry Report",
            desc: "Items nearing expiry & slow-moving near-expiry stock",
            color: COLORS.warning,
          },
          {
            icon: Package,
            title: "Stock Limits Report",
            desc: "Items above max or below min threshold",
            color: COLORS.info,
          },
          {
            icon: Tag,
            title: "Price Change Log",
            desc: "All umbrella or item-level price modifications",
            color: COLORS.success,
          },
          {
            icon: BarChart2,
            title: "Batch-wise P&L",
            desc: "Production batch costs vs. actual sale revenue",
            color: COLORS.primaryLight,
          },
          {
            icon: Users,
            title: "B2B / B2C Split",
            desc: "GST portal ready — registered vs unregistered",
            color: "#A78BFA",
          },
          {
            icon: MapPin,
            title: "Location-wise Sales",
            desc: "Hoshangabad, Timarni, Bhopal comparison",
            color: "#F87171",
          },
          {
            icon: Truck,
            title: "Inter-branch Transfers",
            desc: "Stock moved between locations with P&L impact",
            color: "#34D399",
          },
          {
            icon: RefreshCw,
            title: "FIFO Override Log",
            desc: "All instances where older batch was skipped",
            color: COLORS.danger,
          },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div
            key={title}
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
              padding: 20,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = color;
              e.currentTarget.style.background = COLORS.cardHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.border;
              e.currentTarget.style.background = COLORS.card;
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                background: color + "22",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <Icon size={18} color={color} />
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: COLORS.text,
                marginBottom: 6,
              }}
            >
              {title}
            </div>
            <div
              style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}
            >
              {desc}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 14,
                color,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Generate Report <ChevronRight size={13} />
            </div>
          </div>
        ))}
      </div>

      {/* Day Book Preview */}
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: 24,
        }}
      >
        <SectionHeader title="Day Book Preview — May 27, 2024" />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            {
              time: "09:12",
              type: "Price Change",
              detail: "Namkeen umbrella shifted: Normal → Wholesale by Admin",
              tag: "pricing",
            },
            {
              time: "10:34",
              type: "FIFO Override",
              detail:
                "Counter 1: MAY-24 Khatta Meetha billed (MAR-24 skipped) — Operator: Rajesh",
              tag: "warning",
            },
            {
              time: "11:20",
              type: "Stock Alert",
              detail: "Haldi Powder dropped below minimum (8 pcs < 10)",
              tag: "stock",
            },
            {
              time: "13:45",
              type: "Inter-branch",
              detail:
                "10 pcs Haldiram Aloo Bhujia: Hoshangabad → Timarni. ₹880 auto-transferred.",
              tag: "transfer",
            },
            {
              time: "16:30",
              type: "Batch Created",
              detail:
                "Production batch B-2405-03 started: Besan Sev Masala (80 kg raw)",
              tag: "production",
            },
          ].map(({ time, type, detail, tag }) => {
            const tagColor = {
              pricing: COLORS.primary,
              warning: COLORS.warning,
              stock: COLORS.danger,
              transfer: COLORS.info,
              production: COLORS.success,
            }[tag];
            return (
              <div
                key={time}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "12px 0",
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: COLORS.textMuted,
                    fontFamily: "monospace",
                    minWidth: 45,
                  }}
                >
                  {time}
                </span>
                <span
                  style={{
                    background: tagColor + "22",
                    color: tagColor,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 4,
                    whiteSpace: "nowrap",
                  }}
                >
                  {type}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: COLORS.textDim,
                    lineHeight: 1.4,
                  }}
                >
                  {detail}
                </span>
              </div>
            );
          })}
        </div>
        <button
          style={{
            marginTop: 16,
            background: "transparent",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 18px",
            color: COLORS.textMuted,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Print Full Day Book
        </button>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: BarChart2 },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "production", label: "Production", icon: Zap },
  { id: "pricing", label: "Pricing", icon: Tag },
  { id: "reports", label: "Reports", icon: FileText },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [location, setLocation] = useState("Hoshangabad");
  const [notifOpen, setNotifOpen] = useState(false);

  const pages = {
    dashboard: <Dashboard />,
    inventory: <InventoryPage />,
    production: <ProductionPage />,
    pricing: <PricingPage />,
    reports: <ReportsPage />,
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: "'Sora', 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 220,
          background: COLORS.card,
          borderRight: `1px solid ${COLORS.border}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "22px 20px 18px",
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Layers size={18} color="#fff" />
            </div>
            <div>
              <div
                style={{ fontSize: 14, fontWeight: 800, color: COLORS.text }}
              >
                StoreOS
              </div>
              <div style={{ fontSize: 10, color: COLORS.textMuted }}>
                Retail Backend
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div
          style={{
            padding: "12px 16px",
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              width: "100%",
              background: COLORS.bg,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
              padding: "7px 10px",
              color: COLORS.text,
              fontSize: 12,
              outline: "none",
              cursor: "pointer",
            }}
          >
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = page === id;
            return (
              <button
                key={id}
                onClick={() => setPage(id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "none",
                  background: active ? COLORS.primary + "22" : "transparent",
                  color: active ? COLORS.primary : COLORS.textMuted,
                  fontWeight: active ? 700 : 500,
                  fontSize: 13,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    e.currentTarget.style.background = COLORS.cardHover;
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon size={16} />
                {label}
                {id === "inventory" && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: COLORS.danger + "33",
                      color: COLORS.danger,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 10,
                    }}
                  >
                    4
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div
          style={{
            padding: "12px 10px",
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: COLORS.primary + "44",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{ fontSize: 11, fontWeight: 700, color: COLORS.primary }}
              >
                AD
              </span>
            </div>
            <div>
              <div
                style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}
              >
                Admin
              </div>
              <div style={{ fontSize: 10, color: COLORS.textMuted }}>
                Full Access
              </div>
            </div>
            <LogOut
              size={13}
              color={COLORS.textMuted}
              style={{ marginLeft: "auto", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            height: 60,
            background: COLORS.card,
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.text,
              flex: 1,
              textTransform: "capitalize",
            }}
          >
            {page} — <span style={{ color: COLORS.primary }}>{location}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: COLORS.bg,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
              padding: "7px 14px",
              fontSize: 12,
              color: COLORS.textMuted,
            }}
          >
            <Search size={13} />
            <span>Quick search…</span>
            <kbd
              style={{
                background: COLORS.border,
                borderRadius: 4,
                padding: "1px 6px",
                fontSize: 10,
                color: COLORS.textMuted,
              }}
            >
              ⌘K
            </kbd>
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              style={{
                background: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: "8px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Bell size={15} color={COLORS.textMuted} />
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 7,
                  height: 7,
                  background: COLORS.danger,
                  borderRadius: "50%",
                }}
              />
            </button>
            {notifOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  width: 320,
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  boxShadow: "0 20px 40px #00000066",
                  zIndex: 100,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "14px 16px",
                    borderBottom: `1px solid ${COLORS.border}`,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Notifications ({MOCK_ALERTS.length})
                </div>
                {MOCK_ALERTS.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      padding: "12px 16px",
                      borderBottom: `1px solid ${COLORS.border}`,
                      fontSize: 12,
                      color: COLORS.textDim,
                    }}
                  >
                    <span
                      style={{
                        color:
                          a.type === "fifo" ? COLORS.warning : COLORS.danger,
                      }}
                    >
                      ●{" "}
                    </span>
                    {a.msg}
                    <div
                      style={{
                        color: COLORS.textMuted,
                        fontSize: 11,
                        marginTop: 3,
                      }}
                    >
                      {a.time}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {pages[page]}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2A2E42; border-radius: 3px; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
