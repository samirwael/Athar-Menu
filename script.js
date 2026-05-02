// ── FULL ATHAR MENU DATA ──
const menuData = [
  // HOT DRINKS
  { cat: "Hot Drinks", name: "Espresso", desc: "Bold single-origin shot, rich and full-bodied.", price: "50 EGP",
    img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80" },
  { cat: "Hot Drinks", name: "Turkish Coffee", desc: "Traditional finely ground coffee, slow-simmered to perfection.", price: "45 EGP",
    img: "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=600&q=80" },
  { cat: "Hot Drinks", name: "Americano", desc: "Espresso diluted with hot water for a smooth, long cup.", price: "60 EGP",
    img: "https://images.unsplash.com/photo-1521302200778-33500795e128?w=600&q=80" },
  { cat: "Hot Drinks", name: "Macchiato", desc: "Espresso topped with a small dollop of foam.", price: "60 EGP",
    img: "https://images.unsplash.com/photo-1485808191679-5f86510bd652?w=600&q=80" },
  { cat: "Hot Drinks", name: "Cortado", desc: "Equal parts espresso and warm steamed milk.", price: "65 EGP",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80" },
  { cat: "Hot Drinks", name: "Flat White", desc: "Ristretto double shot with silky microfoam — bold and smooth.", price: "85 EGP",
    img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&q=80" },
  { cat: "Hot Drinks", name: "Hot Chocolate", desc: "Rich, velvety hot chocolate made with premium cocoa.", price: "85 EGP",
    img: "https://images.unsplash.com/photo-1542990253-a781e3ec2b6f?w=600&q=80" },
  { cat: "Hot Drinks", name: "Cappuccino", desc: "Double espresso with equal parts steamed milk and velvety foam.", price: "80 EGP",
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80" },
  { cat: "Hot Drinks", name: "French Coffee", desc: "Rich and aromatic French-press style coffee.", price: "55 EGP",
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80" },
  { cat: "Hot Drinks", name: "Hazelnut Coffee", desc: "Espresso with a warm, nutty hazelnut twist.", price: "60 EGP",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80" },
  { cat: "Hot Drinks", name: "Hot Latte", desc: "Espresso and silky steamed milk in perfect balance.", price: "85 EGP",
    img: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80" },
  { cat: "Hot Drinks", name: "Hot Spanish Latte", desc: "Espresso with condensed milk for a creamy, sweet kick.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1622597467836-f3e6707b7ff8?w=600&q=80" },
  { cat: "Hot Drinks", name: "Hot Mocha", desc: "Espresso, chocolate, and steamed milk — indulgent and rich.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80" },
  { cat: "Hot Drinks", name: "Hot White Mocha", desc: "White chocolate, espresso, and steamed milk — dreamy and sweet.", price: "110 EGP",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { cat: "Hot Drinks", name: "Espresso Alferado", desc: "A bold espresso float over cold cream — unique and refreshing.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80" },
  { cat: "Hot Drinks", name: "Con Panna Espresso", desc: "Espresso crowned with a generous swirl of whipped cream.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1517256673644-36ad11246d21?w=600&q=80" },
  { cat: "Hot Drinks", name: "Hot Salted Caramel Latte", desc: "Sweet caramel with a pinch of sea salt over espresso and milk.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1579888944880-d98341245702?w=600&q=80" },
  { cat: "Hot Drinks", name: "Hot Caramel Macchiato", desc: "Vanilla-scented milk, espresso, and caramel drizzle.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80" },
  { cat: "Hot Drinks", name: "Hot Spicy Spanish Latte", desc: "Spanish latte with a warm spicy kick — bold and addictive.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1568649929103-28ffb3fa53a6?w=600&q=80" },
  { cat: "Hot Drinks", name: "Hot Peanut Butter Latte", desc: "Nutty, creamy peanut butter blended into a latte.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80" },
  { cat: "Hot Drinks", name: "Hot Pistachio Latte", desc: "Aromatic pistachio syrup with espresso and steamed milk.", price: "130 EGP",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80" },

  // ICED COFFEE
  { cat: "Iced Coffee", name: "Iced Americano", desc: "Espresso over ice — clean, crisp, and energising.", price: "75 EGP",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Macchiato", desc: "Bold and creamy iced macchiato with rich espresso layered over chilled milk.", price: "75 EGP",
    img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Latte", desc: "Chilled espresso with cold milk over a bed of ice.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1582197329436-9b45ccd9b2b5?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Spanish Latte", desc: "Condensed milk and espresso on ice — sweet and creamy.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Salted Caramel", desc: "Smooth chilled coffee, rich buttery caramel, and a hint of sea salt.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1593790012132-e2e96efed22e?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Mocha", desc: "Espresso, chocolate sauce, and milk — chilled and luscious.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Caramel Macchiato", desc: "Layered vanilla milk, espresso, and caramel drizzle over ice.", price: "110 EGP",
    img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&q=80" },
  { cat: "Iced Coffee", name: "Iced Pistachio Latte", desc: "Creamy espresso with sweet nutty pistachio and milk over ice.", price: "130 EGP",
    img: "https://images.unsplash.com/photo-1648920035823-7a62f1e53545?w=600&q=80" },

  // COFFEE BLENDED
  { cat: "Coffee Blended", name: "Salted Caramel Coffee", desc: "Blended espresso with caramel and a touch of sea salt.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80" },
  { cat: "Coffee Blended", name: "Spanish Coffee", desc: "Classic Spanish latte blended into a creamy frozen treat.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?w=600&q=80" },
  { cat: "Coffee Blended", name: "Spicy Spanish Coffee", desc: "A spicy twist on the Spanish latte — blended and bold.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=600&q=80" },
  { cat: "Coffee Blended", name: "White Mocha Coffee", desc: "White chocolate and espresso blended into a frosty delight.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80" },
  { cat: "Coffee Blended", name: "Peanut Butter Coffee", desc: "Creamy peanut butter and espresso blended with ice.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80" },

  // NON-COFFEE BLENDED
  { cat: "Non-Coffee Blended", name: "Vanilla Classic Blend", desc: "Smooth vanilla blended coffee — a timeless classic.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=600&q=80" },
  { cat: "Non-Coffee Blended", name: "Caramel Blend", desc: "Creamy caramel blended with ice and milk for a smooth frozen treat.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1605944797578-cfa5052e3803?w=600&q=80" },
  { cat: "Non-Coffee Blended", name: "Chocolate Blend", desc: "Rich chocolate blended with ice and milk for an indulgent frozen treat.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80" },
  { cat: "Non-Coffee Blended", name: "Piña Colada Blend", desc: "Tropical pineapple and creamy coconut blended with ice.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=600&q=80" },
  { cat: "Non-Coffee Blended", name: "Pistachio Blend", desc: "The premium combo — pistachio and matcha, blended over ice.", price: "130 EGP",
    img: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&q=80" },

  // MILKSHAKES
  { cat: "Milkshakes", name: "Mango Milkshake", desc: "Thick and tropical mango shake, velvety and refreshing.", price: "95 EGP",
    img: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=600&q=80" },
  { cat: "Milkshakes", name: "Strawberry Milkshake", desc: "Sweet and creamy strawberry shake made with real fruit.", price: "95 EGP",
    img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80" },
  { cat: "Milkshakes", name: "Blueberry Milkshake", desc: "Rich blueberry shake with a deep, fruity flavour.", price: "95 EGP",
    img: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=600&q=80" },
  { cat: "Milkshakes", name: "Chocolate Milkshake", desc: "Classic chocolate shake — thick, creamy, and indulgent.", price: "95 EGP",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80" },
  { cat: "Milkshakes", name: "Oreo Milkshake", desc: "Crushed Oreos blended into a silky, dreamy shake.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1586917049352-3c4aac24f7b8?w=600&q=80" },
  { cat: "Milkshakes", name: "Pistachio Milkshake", desc: "Premium pistachio shake — aromatic and luxuriously creamy.", price: "120 EGP",
    img: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=600&q=80" },
  { cat: "Milkshakes", name: "ATHAR Premium Shake", desc: "Our signature premium blend — a café secret worth trying.", price: "120 EGP",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80" },

  // FRESH JUICE
  { cat: "Fresh Juice", name: "Orange Juice", desc: "Freshly squeezed orange — bright, tropical, and naturally sweet.", price: "55 EGP",
    img: "https://images.unsplash.com/photo-1534353473418-4cfa0e1e11b7?w=600&q=80" },
  { cat: "Fresh Juice", name: "Guava Juice", desc: "A sweet and tropical guava juice bursting with refreshing flavour.", price: "65 EGP",
    img: "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=600&q=80" },
  { cat: "Fresh Juice", name: "Lemon Mint", desc: "Freshly squeezed lemon with cool mint — the ultimate refresher.", price: "70 EGP",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80" },
  { cat: "Fresh Juice", name: "Mango Juice", desc: "Freshly squeezed mango — bright, tropical, and naturally sweet.", price: "75 EGP",
    img: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80" },
  { cat: "Fresh Juice", name: "Strawberry Juice", desc: "Pure fresh strawberries pressed into a vibrant, sweet juice.", price: "75 EGP",
    img: "https://images.unsplash.com/photo-1495478137967-e7cbe7ebf5b7?w=600&q=80" },
  { cat: "Fresh Juice", name: "Strawberry Vanilla", desc: "Sweet strawberry and creamy vanilla blended with ice.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=600&q=80" },

  // REFRESHERS
  { cat: "Refreshers", name: "Sunshine", desc: "A bright citrus refresher that wakes up your senses.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80" },
  { cat: "Refreshers", name: "Sunrise", desc: "A layered citrus and berry refresher — beautiful and bold.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1609258396839-40e2a374cdae?w=600&q=80" },
  { cat: "Refreshers", name: "Jelly Cola", desc: "Icy cold mint refresher — clean and invigorating.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&q=80" },
  { cat: "Refreshers", name: "Mojito", desc: "Lime, mint, and soda — the classic non-alcoholic mojito.", price: "80 EGP",
    img: "https://images.unsplash.com/photo-1571950006418-f26b66c56fba?w=600&q=80" },
  { cat: "Refreshers", name: "Pineapple Lemon", desc: "Sweet pineapple and zesty lemon with a vibrant Blue Curaçao layer.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=600&q=80" },
  { cat: "Refreshers", name: "Double Gum", desc: "Watermelon, fresh strawberry, and minty mojito — vibrant and cooling.", price: "120 EGP",
    img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80" },
  { cat: "Refreshers", name: "Energy Mojito", desc: "Mojito with Red Bull — refreshing with a buzz.", price: "130 EGP",
    img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80" },
  { cat: "Refreshers", name: "Water", desc: "Still mineral water — pure and simple.", price: "10 EGP",
    img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80" },

  // MATCHA
  { cat: "Matcha", name: "Hot Matcha", desc: "Ceremonial grade matcha whisked with steamed oat milk.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80" },
  { cat: "Matcha", name: "Iced Matcha", desc: "Chilled matcha over ice — earthy, smooth, and energising.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1610874696409-2e71b17a7a70?w=600&q=80" },
  { cat: "Matcha", name: "Strawberry Matcha", desc: "A smooth blend of earthy matcha and sweet strawberry.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&q=80" },
  { cat: "Matcha", name: "Iced Spanish Matcha", desc: "Matcha with condensed milk on ice — sweet and indulgent.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1615615228002-890bb61cac6e?w=600&q=80" },
  { cat: "Matcha", name: "Matcha Blended", desc: "Blended matcha frappe — icy cold and vibrantly green.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1582396269698-0b99de6a1a24?w=600&q=80" },
  { cat: "Matcha", name: "Spanish Matcha Blended", desc: "Condensed milk and matcha blended with ice — rich and creamy.", price: "100 EGP",
    img: "https://images.unsplash.com/photo-1548455850-74c48b05e5af?w=600&q=80" },
  { cat: "Matcha", name: "Salted Caramel Matcha Blended", desc: "Matcha meets salted caramel in this frozen luxurious blend.", price: "110 EGP",
    img: "https://images.unsplash.com/photo-1605944797578-cfa5052e3803?w=600&q=80" },
  { cat: "Matcha", name: "White Chocolate Matcha", desc: "White chocolate and matcha blended — sweet, creamy perfection.", price: "130 EGP",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80" },
  { cat: "Matcha", name: "Pistachio Matcha Blended", desc: "The premium combo — pistachio and matcha, blended over ice.", price: "130 EGP",
    img: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=600&q=80" },

  // TEA
  { cat: "Tea", name: "Tea", desc: "Classic hot brewed tea — simple, warming, and comforting.", price: "35 EGP",
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80" },
  { cat: "Tea", name: "Ice Tea — Peach", desc: "Chilled peach-infused iced tea — fruity and perfectly sweet.", price: "60 EGP",
    img: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=600&q=80" },
  { cat: "Tea", name: "Ice Tea — Passion Fruit", desc: "Passion fruit iced tea — tangy, tropical, and refreshing.", price: "60 EGP",
    img: "https://images.unsplash.com/photo-1587888637140-849b37ba2dc4?w=600&q=80" },

  // DESSERTS
  { cat: "Desserts", name: "Honey Cake", desc: "Layers of honey-soaked sponge — moist, sweet, and beautiful.", price: "80 EGP",
    img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80" },
  { cat: "Desserts", name: "Cheese Cake", desc: "Creamy classic cheesecake on a buttery biscuit base.", price: "80 EGP",
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80" },
  { cat: "Desserts", name: "Red Velvet Cake", desc: "Velvety red sponge with cream cheese frosting — iconic.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&q=80" },
  { cat: "Desserts", name: "Chocolate Brownie", desc: "Dense, fudgy brownie with a crinkly top — pure chocolate bliss.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80" },
  { cat: "Desserts", name: "Tiramisu", desc: "Classic Italian espresso dessert — light, creamy, and irresistible.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80" },
  { cat: "Desserts", name: "Dark Molten Cake", desc: "Rich dark chocolate blended with a decadent, fudgy frozen treat.", price: "90 EGP",
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80" },
  { cat: "Desserts", name: "Nutella Molten Cake", desc: "Creamy Nutella blended into a rich chocolate-hazelnut frozen treat.", price: "120 EGP",
    img: "https://images.unsplash.com/photo-1611329532992-0b7fa4c4d98e?w=600&q=80" },

  // EXTRAS
  { cat: "Extras", name: "Caramel", desc: "Add a drizzle of rich caramel to any drink.", price: "20 EGP",
    img: "https://images.unsplash.com/photo-1561040359-21b5a6f5e06b?w=600&q=80" },
  { cat: "Extras", name: "Nutella", desc: "A generous swirl of Nutella added to your order.", price: "25 EGP",
    img: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&q=80" },
  { cat: "Extras", name: "Milk", desc: "Add extra milk to your drink.", price: "25 EGP",
    img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80" },
  { cat: "Extras", name: "Syrup", desc: "Your choice of flavour syrup.", price: "25 EGP",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80" },
  { cat: "Extras", name: "Sauce", desc: "Add a sauce topping to your drink.", price: "25 EGP",
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80" },
  { cat: "Extras", name: "Ice Cream", desc: "Add a scoop of ice cream.", price: "25 EGP",
    img: "https://images.unsplash.com/photo-1567206563114-c179706688d4?w=600&q=80" },
  { cat: "Extras", name: "Pistachio", desc: "Premium pistachio syrup or topping added to your drink.", price: "35 EGP",
    img: "https://images.unsplash.com/photo-1617957689233-207e3cd3c610?w=600&q=80" },
];

// ── CATEGORY ACCENT COLORS ──
const catColors = {
  "Hot Drinks":         { bg: "#4a2810", accent: "#c9a97a" },
  "Iced Coffee":        { bg: "#1a3040", accent: "#7ab8d4" },
  "Coffee Blended":     { bg: "#3a2010", accent: "#c4a060" },
  "Non-Coffee Blended": { bg: "#1a2818", accent: "#8ac48a" },
  "Milkshakes":         { bg: "#3a1030", accent: "#d490b0" },
  "Fresh Juice":        { bg: "#2a3010", accent: "#b0c860" },
  "Refreshers":         { bg: "#102830", accent: "#60c0c0" },
  "Matcha":             { bg: "#142814", accent: "#70b870" },
  "Tea":                { bg: "#301818", accent: "#c48050" },
  "Desserts":           { bg: "#2a1018", accent: "#c06880" },
  "Extras":             { bg: "#282010", accent: "#b8924a" },
};

let activeCategory = "All";
let activeSearch = "";
let activeSort = "default";
const featuredPageSize = 3;
let featuredTimer = null;
let featuredHistory = [];
let featuredHistoryIndex = -1;

function toPriceNumber(value) {
  return Number.parseFloat(String(value).replace(/[^\d.]/g, "")) || 0;
}

function getFilteredItems(category) {
  let items = category === "All" ? [...menuData] : menuData.filter((i) => i.cat === category);

  if (activeSearch.trim()) {
    const q = activeSearch.trim().toLowerCase();
    items = items.filter((item) =>
      `${item.name} ${item.desc} ${item.cat}`.toLowerCase().includes(q)
    );
  }

  if (activeSort === "price-asc") items.sort((a, b) => toPriceNumber(a.price) - toPriceNumber(b.price));
  if (activeSort === "price-desc") items.sort((a, b) => toPriceNumber(b.price) - toPriceNumber(a.price));
  if (activeSort === "name-asc") items.sort((a, b) => a.name.localeCompare(b.name));

  return items;
}

function pickRandomFeaturedSet(excludedKey = "") {
  if (menuData.length <= featuredPageSize) return [...menuData];

  let picked = [];
  let guard = 0;
  do {
    const pool = [...menuData];
    picked = [];
    while (picked.length < featuredPageSize && pool.length) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool[idx]);
      pool.splice(idx, 1);
    }
    guard += 1;
  } while (picked.map((i) => i.name).join("|") === excludedKey && guard < 8);

  return picked;
}

function renderFeatured(items) {
  const grid = document.getElementById("featuredGrid");
  const status = document.getElementById("featuredStatus");
  if (!grid) return;

  grid.classList.remove("is-switching");
  grid.innerHTML = items
    .map(
      (item, idx) => `
      <article class="featured-card" style="animation-delay:${idx * 0.08}s">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <span>${item.price}</span>
      </article>
    `
    )
    .join("");

  requestAnimationFrame(() => grid.classList.add("is-switching"));
  if (status) status.textContent = `Auto Random • ${featuredHistoryIndex + 1}`;
}

function showRandomFeatured(pushHistory = true) {
  const current = featuredHistory[featuredHistoryIndex] || [];
  const currentKey = current.map((i) => i.name).join("|");
  const nextSet = pickRandomFeaturedSet(currentKey);

  if (pushHistory) {
    featuredHistory = featuredHistory.slice(0, featuredHistoryIndex + 1);
    featuredHistory.push(nextSet);
    featuredHistoryIndex = featuredHistory.length - 1;
  }

  renderFeatured(nextSet);
}

function stepFeatured(direction) {
  if (direction < 0 && featuredHistoryIndex > 0) {
    featuredHistoryIndex -= 1;
    renderFeatured(featuredHistory[featuredHistoryIndex]);
    return;
  }

  if (direction > 0 && featuredHistoryIndex < featuredHistory.length - 1) {
    featuredHistoryIndex += 1;
    renderFeatured(featuredHistory[featuredHistoryIndex]);
    return;
  }

  showRandomFeatured(true);
}

function initFeatured() {
  const nextBtn = document.getElementById("featuredNext");
  const prevBtn = document.getElementById("featuredPrev");
  const wrap = document.querySelector(".featured-inner");

  showRandomFeatured(true);

  if (nextBtn) nextBtn.addEventListener("click", () => stepFeatured(1));
  if (prevBtn) prevBtn.addEventListener("click", () => stepFeatured(-1));

  if (featuredTimer) clearInterval(featuredTimer);
  featuredTimer = setInterval(() => showRandomFeatured(true), 3600);

  if (wrap) {
    wrap.addEventListener("mouseenter", () => {
      if (featuredTimer) clearInterval(featuredTimer);
    });
    wrap.addEventListener("mouseleave", () => {
      if (featuredTimer) clearInterval(featuredTimer);
      featuredTimer = setInterval(() => showRandomFeatured(true), 3600);
    });
  }
}

// ── RENDER MENU ──
function renderMenu(category) {
  const grid = document.getElementById("menuGrid");
  const items = getFilteredItems(category);
  const showCat = category === "All";

  if (!items.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#7a6040;padding:30px;">No items match your search.</p>';
    return;
  }

  grid.innerHTML = items.map((item, idx) => {
    const col = catColors[item.cat] || { bg: "#2e1a0e", accent: "#b8924a" };
    return `
    <div class="menu-card" style="animation-delay:${(idx % 20) * 0.04}s">
      <div class="card-thumb" style="background:linear-gradient(145deg,${col.bg}ee,${col.bg}99);">
        <svg width="38" viewBox="0 0 40 56" xmlns="http://www.w3.org/2000/svg" fill="${col.accent}" style="display:flex">
          <path d="M20 2 C13 11 7 18 7 28 C7 40 13 50 20 54 C27 50 33 40 33 28 C33 18 27 11 20 2Z"/>
        </svg>
      </div>
      <div class="card-body">
        ${showCat ? `<div class="card-cat">${item.cat}</div>` : ""}
        <div class="card-name">${item.name}</div>
        ${item.desc ? `<div class="card-desc">${item.desc}</div>` : `<div class="card-desc"></div>`}
        <div class="card-price">${item.price}</div>
      </div>
    </div>`;
  }).join("");
}

// ── TAB SWITCHING ──
function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.dataset.cat;
      renderMenu(activeCategory);
      tab.scrollIntoView({ inline: "center", behavior: "smooth" });
    });
  });
}

function initMenuControls() {
  const search = document.getElementById("menuSearch");
  const sort = document.getElementById("menuSort");

  if (search) {
    search.addEventListener("input", () => {
      activeSearch = search.value;
      renderMenu(activeCategory);
    });
  }

  if (sort) {
    sort.addEventListener("change", () => {
      activeSort = sort.value;
      renderMenu(activeCategory);
    });
  }
}

// ── NAVBAR SCROLL EFFECT ──
function initNavbar() {
  const nav = document.getElementById("navbar");
  const topBtn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
    if (topBtn) topBtn.classList.toggle("show", window.scrollY > 520);
  });

  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const next = !menu.classList.contains("open");
    menu.classList.toggle("open", next);
    toggle.setAttribute("aria-expanded", String(next));
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initReveal() {
  const blocks = document.querySelectorAll(".reveal");
  if (!blocks.length || !("IntersectionObserver" in window)) {
    blocks.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  blocks.forEach((el) => observer.observe(el));
}

// ── INIT ──
document.addEventListener("DOMContentLoaded", () => {
  initFeatured();
  renderMenu(activeCategory);
  initTabs();
  initMenuControls();
  initNavbar();
  initMobileMenu();
  initReveal();
});
