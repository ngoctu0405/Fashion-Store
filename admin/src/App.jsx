import { useState } from "react";
const nav = [
  "Tổng quan",
  "Đơn hàng",
  "Sản phẩm",
  "Người dùng",
  "Kho hàng",
  "Báo cáo",
];
const data = {
  "Đơn hàng": ["#ZT-24018", "#ZT-24017", "#ZT-24016"],
  "Sản phẩm": ["Áo polo Signature", "Set Linen Breeze", "Kính mắt Avenue"],
  "Người dùng": [
    "Nguyễn Minh Anh — Khách hàng",
    "Lê Hoàng Nam — Khách hàng",
    "Quản trị viên — Admin",
  ],
  "Kho hàng": [
    "Áo polo Signature — 4 còn lại",
    "Kính mắt Avenue — 7 còn lại",
    "Túi da Mini Tote — 9 còn lại",
  ],
};
export default function App() {
  const [a, setA] = useState("Tổng quan");
  const [o, setO] = useState(false);
  const list = data[a] || [];
  return (
    <div className="app">
      <aside className={o ? "open" : ""}>
        <header>
          <i>Z</i>
          <b>ZANTUSTO</b>
          <button onClick={() => setO(false)}>×</button>
        </header>
        <small>QUẢN TRỊ CỬA HÀNG</small>
        {nav.map((x, i) => (
          <button
            key={x}
            className={a === x ? "active" : ""}
            onClick={() => {
              setA(x);
              setO(false);
            }}
          >
            <i>{["▦", "◫", "□", "♙", "▤", "↗"][i]}</i>
            {x}
          </button>
        ))}
        <footer>
          ⚙ Cài đặt
          <br />? Trợ giúp
          <br />
          <em>↪ Đăng xuất</em>
        </footer>
      </aside>
      {o && <div className="shade" onClick={() => setO(false)} />}
      <main>
        <header className="top">
          <div>
            <button className="menu" onClick={() => setO(true)}>
              ☰
            </button>
            <small>QUẢN TRỊ CỬA HÀNG</small>
            <h1>{a}</h1>
          </div>
          <div>
            <label>
              ⌕<input placeholder="Tìm kiếm..." />
            </label>
            <span>AD</span>
            <b>Quản trị viên</b>
          </div>
        </header>
        <section>
          {a === "Tổng quan" ? <Dashboard /> : <Page title={a} items={list} />}
        </section>
      </main>
    </div>
  );
}
function Dashboard() {
  return (
    <>
      <div className="welcome">
        <div>
          <small>05 THÁNG 09, 2026</small>
          <h2>Chào buổi sáng, Quản trị viên 👋</h2>
          <p>Đây là tình hình hoạt động của ZANTUSTO hôm nay.</p>
        </div>
        <button>Xuất báo cáo →</button>
      </div>
      <div className="cards">
        {[
          ["Doanh thu hôm nay", "18.450.000₫", "↑ 12,5%"],
          ["Đơn hàng mới", "24", "↑ 8,2%"],
          ["Khách hàng mới", "18", "↑ 4,6%"],
          ["Tỷ lệ hoàn tất", "96,8%", "↑ 1,4%"],
        ].map(([x, y, z]) => (
          <article key={x}>
            <i>◈</i>
            <p>{x}</p>
            <h3>{y}</h3>
            <small>
              {z} <span>so với hôm qua</span>
            </small>
          </article>
        ))}
      </div>
      <div className="grid">
        <article>
          <small>HIỆU QUẢ KINH DOANH</small>
          <h2>Doanh thu theo tuần</h2>
          <div className="chart">
            {[40, 62, 49, 76, 64, 91, 73].map((n, i) => (
              <div key={i}>
                <i style={{ height: `${n}%` }} />
                <span>{["T2", "T3", "T4", "T5", "T6", "T7", "CN"][i]}</span>
              </div>
            ))}
          </div>
        </article>
        <article>
          <small>CẦN LƯU Ý</small>
          <h2>Tồn kho thấp</h2>
          {["Áo polo Signature", "Kính mắt Avenue", "Túi da Mini Tote"].map(
            (x, i) => (
              <p className="stock" key={x}>
                📦 <b>{x}</b>
                <span>{4 + i * 3} sản phẩm</span>
              </p>
            ),
          )}
        </article>
      </div>
    </>
  );
}
function Page({ title, items }) {
  return (
    <>
      <div className="welcome">
        <div>
          <small>QUẢN LÝ</small>
          <h2>{title}</h2>
          <p>Quản lý và theo dõi dữ liệu {title.toLowerCase()} của cửa hàng.</p>
        </div>
        <button>+ Thêm mới</button>
      </div>
      <article className="orders">
        <small>DANH SÁCH</small>
        <h2>{title} gần đây</h2>
        <table>
          <thead>
            <tr>
              <th>Tên / Mã</th>
              <th>Cập nhật</th>
              <th>Trạng thái</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((x, i) => (
              <tr key={x}>
                <td>
                  <b>{x}</b>
                </td>
                <td>Hôm nay, 09:{20 + i} </td>
                <td>
                  <mark>
                    {title === "Kho hàng" ? "Cần theo dõi" : "Đang hoạt động"}
                  </mark>
                </td>
                <td>•••</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      {title === "Báo cáo" && (
        <div className="cards">
          <article>
            <p>Doanh thu tháng</p>
            <h3>382.450.000₫</h3>
          </article>
          <article>
            <p>Đơn hoàn tất</p>
            <h3>328</h3>
          </article>
        </div>
      )}
    </>
  );
}
