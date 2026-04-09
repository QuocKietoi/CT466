//TRANG CHỦ

//thêm sản phẩm
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', function () {

    const product = {
      name: this.dataset.name,
      price: this.dataset.price,
      img: this.dataset.img,
      qty: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(item => item.name === product.name);

    if (existing) {
      existing.qty++;
    } else {
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  });
});


//THANH TÌM KIẾM

const input = document.getElementById("search-input");
const btn = document.getElementById("search-btn");

if (input && btn) {
  const products = ["áo phông xanh dương", "áo phông màu hồng", "áo phông màu đỏ"];

  function checkSearch() {
    const keyword = input.value.toLowerCase().trim();

    if (keyword === "") {
      alert("Vui lòng nhập từ khóa!");
      return;
    }

    const found = products.some(p => p.includes(keyword));

    if (found) {
      alert("Đã tìm thấy sản phẩm!");
    } else {
      alert("Sản phẩm này hiện chưa đăng bán");
    }
  }

  btn.addEventListener("click", checkSearch);

  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkSearch();
    }
  });
}

//TRANG GIỎ HÀNG
const cartItems = document.querySelectorAll('.cart-item');

if (cartItems.length > 0) {

  function updateTotal() {
    let total = 0;

    document.querySelectorAll('.cart-item').forEach(item => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      const qtyInput = item.querySelector('input[type="text"]');
      const priceEl = item.querySelector('.price');

      if (!checkbox || !qtyInput || !priceEl) return;

      if (checkbox.checked) {
        const qty = parseInt(qtyInput.value) || 0;
        const price = parseInt(priceEl.dataset.price) || 0;

        total += qty * price;
      }
    });

    const totalEl = document.getElementById('total-price');
    if (totalEl) {
      totalEl.textContent = total.toLocaleString('vi-VN') + 'đ';
    }
  }

  //tăng, giảm số lượng
  document.querySelectorAll('.qty-btn').forEach(button => {
    button.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      if (!input) return;

      let value = parseInt(input.value) || 1;

      if (this.innerText.includes('+')) {
        value++;
      } else {
        if (value > 1) value--;
      }

      input.value = value;
      updateTotal();
    });
  });

  //xoá sản phẩm
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function () {
      const cartItem = this.closest('.cart-item');
      if (cartItem) cartItem.remove();
      updateTotal();
    });
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', updateTotal);
  });

  updateTotal();
}

//CHI TIẾT SẢN PHẨM
const params = new URLSearchParams(window.location.search);
const name = params.get("name");

// dữ liệu sản phẩm
const data = {
  "áo phông xanh dương": {
    price: 150000,
    img: "Images/blue.png",
    desc: "Áo thun xanh dương mang phong cách trẻ trung, năng động.",
    info: [
      "Chất liệu: Cotton 100%",
      "Kiểu dáng: Form rộng",
      "Độ co giãn: Tốt",
      "Xuất xứ: Việt Nam"
    ]
  },
  "áo phông màu hồng": {
    price: 160000,
    img: "Images/pink.png",
    desc: "Áo phông hồng nhẹ nhàng, phù hợp đi chơi và dạo phố.",
    info: [
      "Chất liệu: Cotton lạnh",
      "Kiểu dáng: Slim fit",
      "Độ co giãn: Trung bình",
      "Xuất xứ: Thái Lan"
    ]
  },
  "áo phông màu đỏ": {
    price: 155000,
    img: "Images/red.png",
    desc: "Áo đỏ nổi bật, cá tính, phù hợp mọi phong cách.",
    info: [
      "Chất liệu: Cotton cao cấp",
      "Kiểu dáng: Form basic",
      "Độ co giãn: Cao",
      "Xuất xứ: Việt Nam"
    ]
  }
};

// hiển thị
const product = data[name];

if (product) {
  document.getElementById("product-name").innerText = name;
  document.getElementById("product-price").innerText = product.price.toLocaleString("vi-VN") + "đ";
  document.getElementById("product-img").src = product.img;
  document.getElementById("product-desc").innerText = product.desc;

  document.getElementById("product-info").innerHTML =
    product.info.map(i => `<li>${i}</li>`).join("");
}

// thêm giỏ hàng
document.getElementById("add-to-cart").addEventListener("click", () => {
  const size = document.getElementById("size").value;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === name && item.size === size);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      name: name,
      price: product.price,
      img: product.img,
      size: size,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Đã thêm vào giỏ hàng!");
});


//SẢN PHẨM CHI TIẾT
// Đợi load xong HTML
document.addEventListener("DOMContentLoaded", function () {

  // LẤY PARAM TỪ URL
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  // DATA SẢN PHẨM
  const products = {
    "ao-xanh": {
      name: "Áo phông xanh dương",
      img: "Images/blue.png",
      price: 150000
    },
    "ao-hong": {
      name: "Áo phông màu hồng",
      img: "Images/pink.png",
      price: 150000
    },
    "ao-do": {
      name: "Áo phông màu đỏ",
      img: "Images/red.png",
      price: 150000
    }
  };

  const product = products[name];

  // KIỂM TRA SẢN PHẨM
  if (!product) {
    document.body.innerHTML = "<h2 class='text-center mt-5'>Không tìm thấy sản phẩm</h2>";
    return;
  }

  // HIỂN THỊ DỮ LIỆU
  document.getElementById("name").innerText = product.name;
  document.getElementById("img").src = product.img;
  document.getElementById("price").innerText =
    product.price.toLocaleString("vi-VN") + "đ";

  // THÊM GIỎ HÀNG
  document.getElementById("add").addEventListener("click", function () {

    const size = document.getElementById("size").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item =>
      item.name === product.name && item.size === size
    );

    if (existing) {
      existing.qty++;
    } else {
      cart.push({
        name: product.name,
        price: product.price,
        img: product.img,
        size: size,
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Đã thêm vào giỏ hàng!");
  });

});