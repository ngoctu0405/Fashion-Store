export default function Dashboard() {
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
