import {useEffect,useState} from "react";
import ProductCard from "../components/ProductCard";

export default function Shop(){

const [products,setProducts]=useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("all");

useEffect(()=>{
setLoading(true);
fetch("https://dummyjson.com/products?limit=200")
.then(r=>r.json())
.then(d=>{
  setProducts(d.products);
  setLoading(false);
})
.catch(() => {
  setLoading(false);
});
},[]);

const categories = ["all", ...new Set(products.map(p => p.category))];

const filteredProducts = products.filter(product => {
  const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       product.description?.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
  return matchesSearch && matchesCategory;
});

if(loading) {
  return (
    <div className="shop-loading">
      <div className="loading-spinner"></div>
      <p>Loading products...</p>
    </div>
  );
}

return(
  <div className="shop-page">
    <div className="shop-header">
      <h1 className="shop-title">Our Products</h1>
      <p className="shop-subtitle">Discover amazing products at unbeatable prices</p>
    </div>

    <div className="shop-filters">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-filter">
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="shop-results">
      <p className="results-count">
        Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
      </p>
    </div>

    {filteredProducts.length === 0 ? (
      <div className="shop-empty">
        <div className="empty-icon">🔍</div>
        <h2>No products found</h2>
        <p>Try adjusting your search or filter criteria</p>
        <button
          onClick={() => {
            setSearchTerm("");
            setSelectedCategory("all");
          }}
          className="btn-clear-filters"
        >
          Clear Filters
        </button>
      </div>
    ) : (
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )}
  </div>
);
}
