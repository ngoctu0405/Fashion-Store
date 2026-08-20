import menImage from "../assets/About/banner1.png";
import accessoryImage from "../assets/About/banner2.png";
import womenImage from "../assets/About/banner3.png";

const groups = [
  { category: "Mẫu Áo", image: menImage, names: ["Áo sơ mi Forme", "Áo thun Essential", "Áo khoác Urban", "Áo polo Signature"] },
  { category: "Mẫu Quần", image: womenImage, names: ["Quần tây Modern", "Quần jeans Straight", "Quần kaki Relaxed", "Quần ống suông Soft"] },
  { category: "Set Đồ", image: menImage, names: ["Set Linen Breeze", "Set Minimal Daily", "Set Weekend Edit", "Set City Ready"] },
  { category: "Phụ Kiện", image: accessoryImage, names: ["Kính mắt Avenue", "Túi da Mini Tote", "Mũ lưỡi trai Classic", "Thắt lưng Leather"] },
];

export const products = Array.from({ length: 60 }, (_, index) => {
  const group = groups[index % groups.length];
  const round = Math.floor(index / groups.length) + 1;
  const price = 249000 + (index % 6) * 90000;
  return {
    id: index + 1,
    category: group.category,
    name: `${group.names[index % group.names.length]} ${round}`,
    image: group.image,
    price: `${price.toLocaleString("vi-VN")}₫`,
    oldPrice: index % 3 === 0 ? `${(price + 100000).toLocaleString("vi-VN")}₫` : null,
    badge: index % 4 === 0 ? "NEW" : index % 5 === 0 ? "-15%" : null,
  };
});
