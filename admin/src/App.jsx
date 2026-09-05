import { useState } from "react";
const menuGroups = [
  { title: "TỔNG QUAN", items: [["◉", "Dashboard"]] },
  { title: "QUẢN LÝ BÁN HÀNG", items: [["▣", "Tiếp nhận & Bán hàng"], ["▤", "Hóa đơn"]] },
  { title: "QUẢN LÝ SẢN PHẨM", items: [["▣", "Danh mục sản phẩm"], ["♟", "Người dùng"]] },
  { title: "QUẢN LÝ NHẬP HÀNG", items: [["▦", "Nhà cung cấp"], ["▰", "Đặt hàng & Nhập kho"]] },
  { title: "THỐNG KÊ BÁO CÁO", items: [["⌁", "Thống kê doanh thu"], ["▱", "Thống kê nhập hàng"]] },
];
const data = {
  "Tiếp nhận & Bán hàng": ["#ZT-24018", "#ZT-24017", "#ZT-24016"],
  "Hóa đơn": ["HĐ-24018", "HĐ-24017", "HĐ-24016"],
  "Danh mục sản phẩm": ["Áo polo Signature", "Set Linen Breeze", "Kính mắt Avenue"],
  "Người dùng": [
    "Nguyễn Minh Anh — Khách hàng",
    "Lê Hoàng Nam — Khách hàng",
    "Quản trị viên — Admin",
  ],
  "Đặt hàng & Nhập kho": [
    "Áo polo Signature — 4 còn lại",
    "Kính mắt Avenue — 7 còn lại",
    "Túi da Mini Tote — 9 còn lại",
  ],
  "Nhà cung cấp": ["Xưởng May An Phú", "Nhà vải Thành Công", "Kho phụ kiện Minh Anh"],
  "Thống kê doanh thu": ["Doanh thu theo ngày", "Doanh thu theo danh mục", "Doanh thu theo kênh bán"],
  "Thống kê nhập hàng": ["Nhập hàng theo tháng", "Tồn kho theo danh mục", "Nhà cung cấp"],
};
export default function App() {
  const [a, setA] = useState("Dashboard");
  const [o, setO] = useState(false);
  const list = data[a] || [];
  return (
    <div className="app">
      <aside className={o ? "open" : ""}>
        <header>
          <img src="/Name_Shop_Ko_Nen.png" alt="ZANTUSTO" />
          <button onClick={() => setO(false)}>×</button>
        </header>
        <nav className="navGroups">{menuGroups.map((group) => <div className="navGroup" key={group.title}><small>{group.title}</small>{group.items.map(([icon,label]) => <button key={label} className={a === label ? "active" : ""} onClick={() => {setA(label);setO(false);}}><i>{icon}</i>{label}</button>)}</div>)}</nav>
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
          {a === "Dashboard" ? <Dashboard /> : a === "Danh mục sản phẩm" ? <ProductManagerV4 /> : a === "Đặt hàng & Nhập kho" ? <StockInManager /> : <Page title={a} items={list} />}
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
function StockInManager() {
  const [orders, setOrders] = useState([
    { id: "PN-260901", supplier: "Xưởng May An Phú", date: "05/09/2026", quantity: 120, total: 24600000, status: "Chờ nhận" },
    { id: "PN-260902", supplier: "Nhà vải Thành Công", date: "04/09/2026", quantity: 85, total: 17850000, status: "Đang giao" },
    { id: "PN-260903", supplier: "Kho phụ kiện Minh Anh", date: "03/09/2026", quantity: 42, total: 8940000, status: "Đã nhập kho" },
  ]);
  const toInputDate = (date) => date.toISOString().slice(0, 10);
  const blankOrder = () => { const today = new Date(); const expected = new Date(today); expected.setDate(expected.getDate() + 3); return { id: `PO${String(Date.now()).slice(-6)}`, supplier: "Công Ty Cổ Phần Dệt May Kim Vàng", orderDate: toInputDate(today), expectedDate: toInputDate(expected), warehouse: "Kho TP. Hồ Chí Minh", product: "Áo polo Signature", sku: "ZT-100001", color: "Đen", size: "M", quantity: 1, cost: 0, productNote: "", note: "", creator: "Quản trị viên", status: "Chờ nhận" }; };
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState(blankOrder); const [query, setQuery] = useState(""); const [status, setStatus] = useState("Tất cả"); const [selectedOrder, setSelectedOrder] = useState(null); const [lines, setLines] = useState([]); const [productChoice, setProductChoice] = useState("Áo polo Signature"); const [lineColor, setLineColor] = useState("Đen"); const [lineSize, setLineSize] = useState("M"); const [colors, setColors] = useState(["Đen","Trắng","Xanh navy","Be"]); const [sizes, setSizes] = useState(["S","M","L","XL"]);
  const money = (value) => `${Number(value || 0).toLocaleString("vi-VN")}₫`;
  const catalog = [{name:"Áo polo Signature",sku:"ZT-100001"},{name:"Set Linen Breeze",sku:"ZT-100002"},{name:"Kính mắt Avenue",sku:"ZT-100003"}];
  const waiting = orders.filter((item) => item.status !== "Đã nhập kho");
  const received = (id) => setOrders((current) => current.map((item) => item.id === id ? { ...item, status: "Đã nhập kho" } : item));
  const addLine = () => { const product = catalog.find((item) => item.name === productChoice); if (!product) return; setLines((current) => [...current, {...product, id: Date.now(), color:lineColor, size:lineSize, quantity:1, cost:0, note:""}]); };
  const updateLine = (id, field, value) => setLines((current) => current.map((item) => item.id === id ? {...item,[field]:value} : item));
  const openPurchase = () => { setForm(blankOrder()); setLines([]); setShowForm(true); };
  const addOption = (type) => { const value = window.prompt(`Nhập ${type} mới:`)?.trim(); if (!value) return; const setter = type === "màu sắc" ? setColors : setSizes; const current = type === "màu sắc" ? colors : sizes; if (!current.includes(value)) setter([...current, value]); if (type === "màu sắc") setLineColor(value); else setLineSize(value); };
  const total = lines.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.cost || 0), 0);
  const shown = orders.filter((item) => (status === "Tất cả" || item.status === status) && `${item.id} ${item.supplier}`.toLocaleLowerCase("vi").includes(query.toLocaleLowerCase("vi")));
  const createOrder = (event) => { event.preventDefault(); if (!lines.length) return; const quantity = lines.reduce((sum, item) => sum + Number(item.quantity || 0), 0); setOrders((current) => [{ ...form, id: form.id, date: new Date(form.orderDate).toLocaleDateString("vi-VN"), product: lines.map((item) => item.name).join(", "), sku: lines.map((item) => item.sku).join(", "), quantity, total, lineItems: lines }, ...current]); setShowForm(false); setForm(blankOrder()); setLines([]); };
  const detailModal = selectedOrder && <div className="productModal detailModal" role="dialog" aria-modal="true" aria-label="Chi tiết đơn đặt hàng"><div className="detailCard"><button type="button" className="modalClose" onClick={() => setSelectedOrder(null)} aria-label="Đóng">×</button><small>CHI TIẾT ĐƠN ĐẶT HÀNG</small><h2>{selectedOrder.id}</h2><mark className={selectedOrder.status === "Đã nhập kho" ? "received" : "pending"}>{selectedOrder.status}</mark><div className="orderDetails"><p><span>Nhà cung cấp</span><b>{selectedOrder.supplier}</b></p><p><span>Ngày đặt hàng</span><b>{selectedOrder.date}</b></p><p><span>Ngày dự kiến nhận</span><b>{selectedOrder.expectedDate ? new Date(selectedOrder.expectedDate).toLocaleDateString("vi-VN") : "—"}</b></p><p><span>Kho nhận hàng</span><b>{selectedOrder.warehouse || "—"}</b></p><p><span>Sản phẩm</span><b>{selectedOrder.product || "—"}</b></p><p><span>SKU / biến thể</span><b>{selectedOrder.sku || "—"}</b></p><p><span>Màu sắc / Kích cỡ</span><b>{selectedOrder.color ? `${selectedOrder.color} / ${selectedOrder.size}` : "—"}</b></p><p><span>Số lượng đặt</span><b>{selectedOrder.quantity} sản phẩm</b></p><p><span>Người tạo</span><b>{selectedOrder.creator || "Quản trị viên"}</b></p><p><span>Tổng tiền dự kiến</span><b>{money(selectedOrder.total)}</b></p></div></div></div>;
  const purchaseForm = <div className="productModal purchaseModal" role="dialog" aria-modal="true" aria-label="Tạo đơn đặt hàng"><div className="purchaseCard purchaseCardWide"><button type="button" className="modalClose" onClick={() => setShowForm(false)} aria-label="Đóng">×</button><form className="purchaseForm" onSubmit={createOrder} onKeyDown={(event) => { if (event.key === "Enter" && event.target.tagName !== "BUTTON") event.preventDefault(); }}><b>Lập đơn đặt hàng / phiếu nhập</b><p>Tạo một phiếu nhập có thể gồm nhiều sản phẩm.</p><div className="purchaseInfoTitle">Thông tin phiếu nhập</div><label>Mã đơn đặt hàng<input value={form.id} readOnly/></label><label>Nhà cung cấp<input list="supplierSuggestions" value={form.supplier} onChange={(event) => setForm({...form,supplier:event.target.value})} required/><datalist id="supplierSuggestions"><option value="Công Ty Cổ Phần Dệt May Kim Vàng"/><option value="Xưởng May An Phú"/><option value="Nhà vải Thành Công"/><option value="Kho phụ kiện Minh Anh"/></datalist></label><label>Kho nhận hàng<select value={form.warehouse} onChange={(event) => setForm({...form,warehouse:event.target.value})}><option>Kho TP. Hồ Chí Minh</option><option>Kho Hà Nội</option><option>Kho Đà Nẵng</option></select></label><label>Ngày đặt hàng<input type="date" value={form.orderDate} onChange={(event) => setForm({...form,orderDate:event.target.value})} required/></label><label>Ngày dự kiến nhận<input type="date" min={form.orderDate} value={form.expectedDate} onChange={(event) => setForm({...form,expectedDate:event.target.value})} required/></label><label>Người tạo<input value={form.creator} readOnly/></label><section className="purchaseLines"><div className="linePicker"><div><small>THÊM SẢN PHẨM VÀO PHIẾU</small><select value={productChoice} onChange={(event) => setProductChoice(event.target.value)}>{catalog.map((item) => <option key={item.sku}>{item.name}</option>)}</select></div><button type="button" onClick={addLine}>+ Thêm sản phẩm</button></div><div className="variantTools"><span>QUẢN LÝ MÀU & KÍCH CỠ</span><button type="button" className="addOption" onClick={() => addOption("màu sắc")}>+ Thêm màu mới</button><button type="button" className="addOption" onClick={() => addOption("size")}>+ Thêm size mới</button></div><div className="lineTable"><table><thead><tr><th>Sản phẩm / SKU</th><th>Màu</th><th>Size</th><th>Số lượng</th><th>Giá nhập</th><th>Thành tiền</th><th></th></tr></thead><tbody>{lines.map((item) => <tr key={item.id}><td><b>{item.name}</b><small>{item.sku}</small></td><td><select value={item.color} onChange={(event) => updateLine(item.id,"color",event.target.value)}>{colors.map((color) => <option key={color}>{color}</option>)}</select></td><td><select value={item.size} onChange={(event) => updateLine(item.id,"size",event.target.value)}>{sizes.map((size) => <option key={size}>{size}</option>)}</select></td><td><input type="number" min="1" value={item.quantity} onChange={(event) => updateLine(item.id,"quantity",event.target.value)}/></td><td><input type="number" min="0" value={item.cost} onChange={(event) => updateLine(item.id,"cost",event.target.value)}/></td><td><b>{money(Number(item.quantity || 0) * Number(item.cost || 0))}</b></td><td><button type="button" className="removeLine" onClick={() => setLines((current) => current.filter((line) => line.id !== item.id))}>×</button></td></tr>)}{!lines.length&&<tr><td colSpan="7" className="emptyLines">Chưa có sản phẩm trong phiếu. Hãy chọn sản phẩm rồi bấm Thêm.</td></tr>}</tbody></table></div></section><label className="purchaseNote">Ghi chú đơn hàng<input value={form.note} onChange={(event) => setForm({...form,note:event.target.value})} placeholder="Ghi chú chung cho đơn hàng"/></label><label>Trạng thái<select value={form.status} onChange={(event) => setForm({...form,status:event.target.value})}><option>Chờ nhận</option><option>Đang giao</option><option>Đã nhập kho</option><option>Đã hủy</option></select></label><output>Tổng giá trị phiếu <b>{money(total)}</b></output><div><button className="savePurchase" disabled={!lines.length}>Tạo đơn đặt hàng</button><button type="button" className="cancelPurchase" onClick={() => setShowForm(false)}>Hủy</button></div></form></div></div>;
  return <><div className="welcome stockInWelcome"><div><small>QUẢN LÝ NHẬP HÀNG</small><h2>Đặt hàng & Nhập kho</h2><p>Theo dõi đơn mua từ nhà cung cấp và xác nhận hàng đã về kho.</p></div><button className="createPurchase" onClick={openPurchase}>+ Tạo đơn đặt hàng</button></div><div className="stockInCards"><article><small>ĐƠN CHỜ XỬ LÝ</small><b>{waiting.length}</b><span>Đơn đang chờ nhận hàng</span></article><article><small>GIÁ TRỊ ĐANG VỀ</small><b>{money(waiting.reduce((sum,item) => sum + item.total, 0))}</b><span>Giá trị của {waiting.length} đơn hàng</span></article><article><small>HÀNG CẦN NHẬP</small><b>6</b><span>Sản phẩm sắp hết dưới 5 cái</span></article></div><article className="orders stockInTable"><div className="tableHeading"><div><small>DANH SÁCH ĐƠN NHẬP</small><h2>Đơn đặt hàng gần đây</h2></div><span>{shown.length} đơn nhập</span></div><div className="stockInFilters"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm mã đơn hoặc nhà cung cấp..."/><select value={status} onChange={(event) => setStatus(event.target.value)}><option>Tất cả</option><option>Chờ nhận</option><option>Đang giao</option><option>Đã nhập kho</option></select></div><table><thead><tr><th>Mã đơn</th><th>Nhà cung cấp</th><th>Ngày đặt</th><th>Số lượng</th><th>Tổng tiền</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{shown.map((order) => <tr key={order.id}><td><b>{order.id}</b>{order.product&&<small className="orderProduct">{order.product}</small>}</td><td>{order.supplier}</td><td>{order.date}</td><td>{order.quantity} sản phẩm</td><td><b>{money(order.total)}</b></td><td><mark className={order.status === "Đã nhập kho" ? "received" : "pending"}>{order.status}</mark></td><td><button className="viewOrder" onClick={() => setSelectedOrder(order)}>Xem chi tiết</button>{order.status === "Đã nhập kho" ? <span className="receivedText">✓ Đã cập nhật kho</span> : <button className="receiveStock" onClick={() => received(order.id)}>Nhận vào kho</button>}</td></tr>)}{!shown.length&&<tr><td colSpan="7" className="emptyOrders">Không tìm thấy đơn nhập phù hợp.</td></tr>}</tbody></table></article>{showForm&&purchaseForm}{detailModal}<div className="stockInTips"><b>Gợi ý nhập hàng</b><p>Kiểm tra số lượng thực tế, giá vốn và hóa đơn nhà cung cấp trước khi xác nhận nhập kho.</p></div></>;
}

function MultiPicker({ label, values, choices, onChange }) {
  const [open, setOpen] = useState(false); const [query, setQuery] = useState("");
  const toggle = (choice) => onChange(values.includes(choice) ? values.filter((item) => item !== choice) : [...values, choice]);
  const summary = values.join(", "); const matching = choices.filter((choice) => choice.toLocaleLowerCase("vi").includes(query.toLocaleLowerCase("vi")));
  return <div className="multiPicker" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <span>{label}</span>
    <button type="button" className="multiTrigger" onClick={() => setOpen(!open)}>{summary || "Chọn nội dung"}<i>⌄</i></button>
    {open && <div className="multiMenu"><input className="multiSearch" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm trong gợi ý..." />{matching.map((choice) => <label key={choice}><input type="checkbox" checked={values.includes(choice)} onChange={() => toggle(choice)} />{choice}</label>)}{!matching.length&&<small>Không có gợi ý phù hợp.</small>}</div>}
  </div>;
}

function ProductManagerV4() {
  const [items,setItems]=useState([{id:1,sku:"ZT-100001",name:"Áo polo Signature",category:"Mẫu Áo",cost:390000,margin:40,stock:18,visible:true},{id:2,sku:"ZT-100002",name:"Set Linen Breeze",category:"Set Đồ",cost:890000,margin:40,stock:7,visible:true}]);
  const blank=()=>({sku:`ZT-${String(Date.now()).slice(-6)}`,name:"",category:"Mẫu Áo",cost:"",margin:20,stock:0,brand:"ZANTUSTO",pattern:"Trơn",styleTags:[],origin:"Việt Nam",length:"Vừa",occasions:[],fit:"Regular",plusSize:"Không",manufacturer:"Đang cập nhật",materialTags:[],composition:"",shipFrom:"TP. Hồ Chí Minh",imageFile:""});
  const [form,setForm]=useState(blank),[show,setShow]=useState(false),[editing,setEditing]=useState(null);
  const money=n=>`${Number(n||0).toLocaleString("vi-VN")}₫`;const price=Math.round(Number(form.cost||0)*(1+Number(form.margin||0)/100));
  const condition=(stock)=>Number(stock)<=0?"Hết hàng":Number(stock)<5?"Sắp hết":"Còn hàng";
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  const save=e=>{e.preventDefault();if(!form.name||!form.cost)return;const value={...form,cost:Number(form.cost),margin:Number(form.margin),stock:Number(form.stock),condition:condition(form.stock)};setItems(xs=>editing?xs.map(x=>x.id===editing?{...x,...value}:x):[...xs,{...value,id:Date.now(),visible:true}]);setShow(false)};
  const setMaterials=(materialTags)=>setForm({...form,materialTags,composition:materialTags.map(item=>`__% ${item}`).join(", ")});
  const editor=<form className="productForm" onSubmit={save}><b>{editing?"Sửa sản phẩm":"Thêm sản phẩm mới"}</b><label>Mã sản phẩm<input value={form.sku} readOnly/></label><label>Tên sản phẩm<input name="name" value={form.name} onChange={update} required/></label><label>Danh mục<select name="category" value={form.category} onChange={update}><option>Mẫu Áo</option><option>Mẫu Quần</option><option>Set Đồ</option><option>Phụ Kiện</option></select></label><label>Giá vốn<input name="cost" type="number" value={form.cost} onChange={update} required/></label><label>% lợi nhuận<input name="margin" type="number" value={form.margin} onChange={update}/></label><label>Tồn kho<input name="stock" type="number" min="0" value={form.stock} onChange={update}/></label><label>Tình trạng<output className={`stockCondition ${condition(form.stock).replaceAll(" ","")}`}>{condition(form.stock)} · còn {Number(form.stock||0)} sản phẩm</output></label><label>Ảnh sản phẩm<input type="file" accept="image/*" onChange={(event)=>setForm({...form,imageFile:event.target.files?.[0]?.name||""})}/><small>{form.imageFile||"Chọn ảnh từ máy tính"}</small></label><label>Thương hiệu<input name="brand" list="brands" value={form.brand} onChange={update}/><datalist id="brands"><option value="ZANTUSTO"/><option value="Y2010"/><option value="Routine"/></datalist></label><label>Họa tiết<select name="pattern" value={form.pattern} onChange={update}><option>Trơn</option><option>Kẻ sọc</option><option>Caro</option><option>In hình</option></select></label><MultiPicker label="Phong cách" values={form.styleTags} choices={["Cơ bản","Chỉn chu","Công sở","Đường phố"]} onChange={(styleTags)=>setForm({...form,styleTags})}/><label>Xuất xứ<input name="origin" list="origins" value={form.origin} onChange={update}/><datalist id="origins"><option value="Việt Nam"/><option value="Hàn Quốc"/><option value="Trung Quốc"/></datalist></label><label>Độ dài<select name="length" value={form.length} onChange={update}><option>Ngắn</option><option>Vừa</option><option>Dài</option></select></label><MultiPicker label="Dịp sử dụng" values={form.occasions} choices={["Hằng ngày","Đi làm","Đi chơi","Dự tiệc"]} onChange={(occasions)=>setForm({...form,occasions})}/><label>Kiểu dáng<select name="fit" value={form.fit} onChange={update}><option>Ôm</option><option>Ôm vừa</option><option>Regular</option><option>Oversize</option></select></label><label>Kích cỡ lớn<select name="plusSize" value={form.plusSize} onChange={update}><option>Có</option><option>Không</option></select></label><label>Tên nhà sản xuất<input name="manufacturer" value={form.manufacturer} onChange={update}/></label><MultiPicker label="Chất liệu" values={form.materialTags} choices={["Modal","Polyester","Cotton","Linen"]} onChange={setMaterials}/><label>Thành phần chất liệu<input name="composition" value={form.composition} onChange={update} placeholder="__% Modal, __% Polyester"/></label><label>Gửi từ<select name="shipFrom" value={form.shipFrom} onChange={update}><option>TP. Hồ Chí Minh</option><option>Hà Nội</option><option>Đà Nẵng</option></select></label><output>Giá bán tự tính: <b>{money(price)}</b></output><button className={editing?"saveEdit":"saveNew"}>Lưu sản phẩm</button><button type="button" onClick={()=>setShow(false)}>Hủy</button></form>;
  return <><div className="welcome"><div><small>QUẢN LÝ CỬA HÀNG</small><h2>Sản phẩm</h2><p>Quản lý sản phẩm, giá bán và trạng thái hiển thị.</p></div><button className="addProduct" onClick={()=>{setForm(blank());setEditing(null);setShow(true)}}>+ Thêm sản phẩm</button></div>{show&&<div className={`productModal ${editing?"modalEdit":"modalAdd"}`} role="dialog" aria-modal="true" aria-label={editing?"Sửa sản phẩm":"Thêm sản phẩm"}><div className="modalCard"><button type="button" className="modalClose" onClick={()=>setShow(false)} aria-label="Đóng">×</button>{editor}</div></div>}<article className="orders productList"><table><thead><tr><th>Mã SP</th><th>Sản phẩm</th><th>Danh mục</th><th>Giá bán</th><th>Tồn kho</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{items.map(x=><tr key={x.id} className={!x.visible?"hiddenProduct":""}><td><b>{x.sku}</b></td><td>{x.name}</td><td>{x.category}</td><td><b>{money(Math.round(x.cost*(1+x.margin/100)))}</b></td><td><b>{x.stock}</b><small className={`tableCondition ${condition(x.stock).replaceAll(" ","")}`}>{condition(x.stock)}</small></td><td><mark className={x.visible?"isVisible":"isHidden"}>{x.visible?"Đang hiển thị":"Đã ẩn"}</mark></td><td><button className="edit" onClick={()=>{setForm({...blank(),...x});setEditing(x.id);setShow(true)}}>Sửa sản phẩm</button><button className={`state ${x.visible?"isVisible":"isHidden"}`} onClick={()=>setItems(xs=>xs.map(y=>y.id===x.id?{...y,visible:!y.visible}:y))}>{x.visible?"Ẩn sản phẩm":"Hiện sản phẩm"}</button></td></tr>)}</tbody></table></article></>;
}

function ProductManagerV3() {
  const [items,setItems]=useState([{id:1,sku:"ZT-100001",name:"Áo polo Signature",category:"Mẫu Áo",cost:390000,margin:40,stock:18},{id:2,sku:"ZT-100002",name:"Set Linen Breeze",category:"Set Đồ",cost:890000,margin:40,stock:7}]);
  const blank=()=>({sku:`ZT-${String(Date.now()).slice(-6)}`,name:"",category:"Mẫu Áo",cost:"",margin:20,stock:0});
  const [form,setForm]=useState(blank);const [show,setShow]=useState(false);const [editing,setEditing]=useState(null);
  const price=Math.round(Number(form.cost||0)*(1+Number(form.margin||0)/100));const money=n=>`${Number(n||0).toLocaleString("vi-VN")}₫`;
  const openNew=()=>{setForm(blank());setEditing(null);setShow(true)};const edit=x=>{setForm(x);setEditing(x.id);setShow(true)};
  const save=e=>{e.preventDefault();if(!form.name||!form.cost)return;setItems(current=>editing?current.map(x=>x.id===editing?{...form,id:editing,cost:Number(form.cost),margin:Number(form.margin),stock:Number(form.stock)}:x):[...current,{...form,id:Date.now(),cost:Number(form.cost),margin:Number(form.margin),stock:Number(form.stock)}]);setShow(false)};
  return <><div className="welcome"><div><small>QUẢN LÝ CỬA HÀNG</small><h2>Sản phẩm</h2><p>Quản lý mã sản phẩm, giá vốn, lợi nhuận và tồn kho.</p></div><button onClick={openNew}>+ Thêm sản phẩm</button></div>{show&&<form className="productForm" onSubmit={save}><b>{editing?"Sửa thông tin sản phẩm":"Thêm sản phẩm mới"}</b><label>Mã sản phẩm<input value={form.sku} readOnly /></label><label>Tên sản phẩm<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required /></label><label>Danh mục<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Mẫu Áo</option><option>Mẫu Quần</option><option>Set Đồ</option><option>Phụ Kiện</option></select></label><label>Giá vốn<input type="number" value={form.cost} onChange={e=>setForm({...form,cost:e.target.value})} required /></label><label>% lợi nhuận<input type="number" value={form.margin} onChange={e=>setForm({...form,margin:e.target.value})} /></label><label>Tồn kho<input type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} /></label><output>Giá bán tự tính: <b>{money(price)}</b></output><button>Lưu thông tin</button><button type="button" onClick={()=>setShow(false)}>Hủy</button></form>}<article className="orders productList"><table><thead><tr><th>Mã SP</th><th>Sản phẩm</th><th>Danh mục</th><th>Giá vốn</th><th>% lãi</th><th>Giá bán</th><th>Tồn kho</th><th>Thao tác</th></tr></thead><tbody>{items.map(x=><tr key={x.id}><td><b>{x.sku}</b></td><td>{x.name}</td><td>{x.category}</td><td>{money(x.cost)}</td><td>{x.margin}%</td><td><b>{money(Math.round(x.cost*(1+x.margin/100)))}</b></td><td>{x.stock}</td><td><button className="edit" onClick={()=>edit(x)}>Sửa thông tin</button></td></tr>)}</tbody></table></article></>;
}

function ProductManagerV2() {
  const [items,setItems]=useState([{id:1,sku:"ZT-100001",name:"Áo polo Signature",cost:390000,margin:40,stock:18},{id:2,sku:"ZT-100002",name:"Set Linen Breeze",cost:890000,margin:40,stock:7}]);
  const [form,setForm]=useState({name:"",cost:"",margin:20,stock:0});
  const sale=Math.round(Number(form.cost||0)*(1+Number(form.margin||0)/100)); const money=(n)=>`${Number(n||0).toLocaleString("vi-VN")}₫`;
  const save=(e)=>{e.preventDefault();if(!form.name||!form.cost)return;setItems(x=>[...x,{...form,id:Date.now(),sku:`ZT-${String(Date.now()).slice(-6)}`,cost:Number(form.cost),stock:Number(form.stock)}]);setForm({name:"",cost:"",margin:20,stock:0})};
  return <><div className="welcome"><div><small>QUẢN LÝ CỬA HÀNG</small><h2>Sản phẩm</h2><p>Giá bán tự tính theo giá vốn và % lợi nhuận.</p></div></div><form className="productForm" onSubmit={save}><b>Thêm sản phẩm mới</b><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Tên sản phẩm" required/><input type="number" value={form.cost} onChange={e=>setForm({...form,cost:e.target.value})} placeholder="Giá vốn" required/><input type="number" value={form.margin} onChange={e=>setForm({...form,margin:e.target.value})} placeholder="% lợi nhuận"/><input type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} placeholder="Tồn kho"/><output>Giá bán: <b>{money(sale)}</b></output><button>Lưu sản phẩm</button></form><article className="orders productList"><table><thead><tr><th>Mã SP</th><th>Sản phẩm</th><th>Giá vốn</th><th>Lợi nhuận</th><th>Giá bán</th><th>Tồn kho</th><th /></tr></thead><tbody>{items.map(x=>{const price=Math.round(x.cost*(1+x.margin/100));return <tr key={x.id}><td><b>{x.sku}</b></td><td>{x.name}</td><td>{money(x.cost)}</td><td>{x.margin}%</td><td><b>{money(price)}</b></td><td>{x.stock}</td><td><button className="delete" onClick={()=>setItems(a=>a.filter(y=>y.id!==x.id))}>Xóa</button></td></tr>})}</tbody></table></article></>;
}

function ProductManager() {
  const [items, setItems] = useState([
    { id: 1, name: "Áo polo Signature", category: "Mẫu Áo", price: "549.000₫", stock: 18, active: true },
    { id: 2, name: "Set Linen Breeze", category: "Set Đồ", price: "1.249.000₫", stock: 7, active: true },
    { id: 3, name: "Kính mắt Avenue", category: "Phụ Kiện", price: "399.000₫", stock: 0, active: false },
  ]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "Mẫu Áo", cost: 0, margin: 20, stock: 0 });
  const salePrice = Math.round(Number(form.cost || 0) * (1 + Number(form.margin || 0) / 100));
  const money = (value) => `${Number(value || 0).toLocaleString("vi-VN")}₫`;
  const shown = items.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  const save = (event) => { event.preventDefault(); if (!form.name || !form.cost) return; const product = { ...form, stock: Number(form.stock), cost: Number(form.cost), margin: Number(form.margin), price: money(salePrice) }; setItems((current) => editing ? current.map((item) => item.id === editing ? { ...item, ...product } : item) : [...current, { ...product, id: Date.now(), sku: `ZT-${String(Date.now()).slice(-6)}`, active: true }]); setEditing(null); setForm({ name: "", category: "Mẫu Áo", cost: 0, margin: 20, stock: 0 }); };
  const edit = (item) => { setEditing(item.id); setForm({ ...item, cost: item.cost || 0, margin: item.margin || 20 }); };
  return <><div className="welcome"><div><small>QUẢN LÝ CỬA HÀNG</small><h2>Sản phẩm</h2><p>Thêm, cập nhật trạng thái và theo dõi số lượng tồn kho.</p></div><button onClick={() => { setEditing(0); setForm({ name: "", category: "Mẫu Áo", price: "", stock: 0 }); }}>+ Thêm sản phẩm</button></div>{editing !== null && <form className="productForm" onSubmit={save}><b>{editing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</b><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tên sản phẩm" required /><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Mẫu Áo</option><option>Mẫu Quần</option><option>Set Đồ</option><option>Phụ Kiện</option></select><input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Giá bán, VD: 549.000₫" required /><input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="Tồn kho" /><button>Lưu sản phẩm</button><button type="button" onClick={() => setEditing(null)}>Hủy</button></form>}<article className="orders productList"><div className="productTools"><b>{items.length} sản phẩm</b><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm tên hoặc danh mục..." /></div><table><thead><tr><th>Sản phẩm</th><th>Danh mục</th><th>Giá</th><th>Tồn kho</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{shown.map((item) => <tr key={item.id}><td><b>{item.name}</b></td><td>{item.category}</td><td>{item.price}</td><td className={item.stock < 8 ? "lowStock" : ""}>{item.stock} sản phẩm</td><td><button className="state" onClick={() => setItems((current) => current.map((x) => x.id === item.id ? { ...x, active: !x.active } : x))}>{item.active ? "Đang bán" : "Tạm ẩn"}</button></td><td><button className="edit" onClick={() => edit(item)}>Sửa</button><button className="delete" onClick={() => setItems((current) => current.filter((x) => x.id !== item.id))}>Xóa</button></td></tr>)}</tbody></table></article></>;
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
