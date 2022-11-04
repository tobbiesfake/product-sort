import React, { useState, useEffect } from "react";

const tags = [
  {
    id: 1,
    category: "Men's Clothing"
  },
  {
    id: 2,
    category: "Jewelery"
  },
  {
    id: 3,
    category: "Women's Clothing"
  },
  {
    id: 4,
    category: "Electronics"
  },
];

function Content() {
  const [input, setInput] = useState("");
  const [star, setStar] = useState("0");
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((dataParse) => setProducts(dataParse));
  }, []);

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSetFilters(category) {
    setFilters(
      filters.includes(category)
        ? filters.filter((ele) => ele !== category)
        : [...filters, category]
    );
  }

  function handleFilterProducts() {
    if (!filters.length) return products;

    return products.filter((product) => {
      for (let filt of filters) {
        if (product.category === filt) return true;
      }
      return false;
    });
  }

  function handleStarFilter(products) {
    return products.filter((product) => product.rating.rate >= star / 10);
  }

  return (
    <React.Fragment>
      <div className="header">
        <div className="search">
          SEARCH
          <div className="search-bar">
            <input
              spellCheck='false'
              placeholder="What you need?"
              value={input}
              onChange={handleInput}
              />
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#D9D9D9"/>
              <path d="M20.4859 16.2907C21.0033 14.7515 20.9411 13.0763 20.3109 11.5796C19.6807 10.083 18.526 8.86778 17.0634 8.16218C15.6008 7.45658 13.9309 7.30909 12.3673 7.74739C10.8036 8.1857 9.45375 9.17966 8.57101 10.5427C7.68826 11.9057 7.33337 13.5441 7.57295 15.1502C7.81254 16.7563 8.63012 18.2198 9.87222 19.2659C11.1143 20.3119 12.6955 20.8687 14.319 20.8316C15.9425 20.7945 17.4966 20.1661 18.6896 19.0643" stroke="#95A793" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.75 19.1316L22.9167 23.2983" stroke="#95A793" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="rating">
          Rating ⭐ from {(star / 10).toFixed(1)}
          <input
            type="range"
            min="0"
            max="50"
            value={star}
            onChange={(e) => setStar(e.target.value)}
          />
        </div>

        <div className="filters">
          {tags.map((tag) => (
            <div key={tag.id}>
              <input
                onChange={() => {
                  handleSetFilters(tag.category.toLocaleLowerCase());
                }}
                checked={filters.includes(tag.category.toLocaleLowerCase())}
                type="checkbox"
              />
              <label>{tag.category}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="products-container">
        {handleStarFilter(handleFilterProducts())
          .filter((product) =>
            product.title.toLowerCase().includes(input.toLowerCase())
          )
          .map((product) => (
            <Product key={product.id} props={product} />
          ))}
      </div>
    </React.Fragment>
  );
}

function Product({ props }) {
  return (
    <div className="product">
      <h5 className="product-tag">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.34715 16.4445C4.49624 15.1733 4 13.6446 4 12C4 7.58174 7.58172 4.00002 12 4.00002C16.4183 4.00002 20 7.58174 20 12C20 16.4183 16.4183 20 12 20C10.4044 20 8.91785 19.5329 7.66974 18.7279" stroke="#C3D3C1" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12.5 17L12.5 11" stroke="#C3D3C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.5 11L12.5 11" stroke="#C3D3C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 8.00002L12.5 7.00002" stroke="#C3D3C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {props.category.charAt(0).toUpperCase()}
        {props.category.slice(1)}
      </h5>
      <h1 className="product-title">{props.title}</h1>
      <p className="product-description">{props.description}</p>
      <h1 className="product-price"><span>$</span>{props.price}</h1>
      <div className="product-rating">
        <div className="cover" style={{width: `calc(${( (5 - props.rating.rate) / 5 * 100) * (100/104)}% + 2px)`}}></div>
        <svg width="104" height="24" viewBox="0 0 104 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5001 3.5L13.0275 2.71236C12.5617 1.93617 11.4371 1.93543 10.9703 2.71101L8.6414 6.58087C8.47384 6.85928 8.20055 7.05784 7.88398 7.13116L3.48096 8.15091C2.59978 8.35499 2.25259 9.42356 2.84552 10.1066L5.80824 13.5196C6.02125 13.765 6.12564 14.0863 6.09755 14.41L5.98972 15.6525M15.1682 6.2644L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.15078 20.2144C6.41756 20.525 5.61731 19.9436 5.68616 19.1503V19.1503L5.7241 18.713" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M93.5001 3.5L93.0275 2.71236C92.5617 1.93617 91.4371 1.93543 90.9703 2.71101L88.6414 6.58087C88.4738 6.85928 88.2005 7.05784 87.884 7.13116L83.481 8.15091C82.5998 8.35499 82.2526 9.42356 82.8455 10.1066L85.8082 13.5196C86.0213 13.765 86.1256 14.0863 86.0975 14.41L85.9897 15.6525M95.1682 6.2644L95.3586 6.58087C95.5262 6.85928 95.7995 7.05784 96.116 7.13116L100.519 8.15091C101.4 8.35499 101.747 9.42356 101.155 10.1066L98.1918 13.5196C97.9788 13.765 97.8744 14.0863 97.9025 14.41L98.2932 18.9127C98.3714 19.8138 97.4625 20.4742 96.6296 20.1214L92.4681 18.3583C92.1689 18.2316 91.8311 18.2316 91.5319 18.3583L87.1508 20.2144C86.4176 20.525 85.6173 19.9436 85.6862 19.1503V19.1503L85.7241 18.713" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M53.5001 3.5L53.0275 2.71236C52.5617 1.93617 51.4371 1.93543 50.9703 2.71101L48.6414 6.58087C48.4738 6.85928 48.2005 7.05784 47.884 7.13116L43.481 8.15091C42.5998 8.35499 42.2526 9.42356 42.8455 10.1066L45.8082 13.5196C46.0213 13.765 46.1256 14.0863 46.0975 14.41L45.9897 15.6525M55.1682 6.2644L55.3586 6.58087C55.5262 6.85928 55.7995 7.05784 56.116 7.13116L60.5191 8.15091C61.4002 8.35499 61.7474 9.42356 61.1545 10.1066L58.1918 13.5196C57.9788 13.765 57.8744 14.0863 57.9025 14.41L58.2932 18.9127C58.3714 19.8138 57.4625 20.4742 56.6296 20.1214L52.4681 18.3583C52.1689 18.2316 51.8311 18.2316 51.5319 18.3583L47.1508 20.2144C46.4176 20.525 45.6173 19.9436 45.6862 19.1503V19.1503L45.7241 18.713" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M33.5001 3.5L33.0275 2.71236C32.5617 1.93617 31.4371 1.93543 30.9703 2.71101L28.6414 6.58087C28.4738 6.85928 28.2005 7.05784 27.884 7.13116L23.481 8.15091C22.5998 8.35499 22.2526 9.42356 22.8455 10.1066L25.8082 13.5196C26.0213 13.765 26.1256 14.0863 26.0975 14.41L25.9897 15.6525M35.1682 6.2644L35.3586 6.58087C35.5262 6.85928 35.7995 7.05784 36.116 7.13116L40.5191 8.15091C41.4002 8.35499 41.7474 9.42356 41.1545 10.1066L38.1918 13.5196C37.9788 13.765 37.8744 14.0863 37.9025 14.41L38.2932 18.9127C38.3714 19.8138 37.4625 20.4742 36.6296 20.1214L32.4681 18.3583C32.1689 18.2316 31.8311 18.2316 31.5319 18.3583L27.1508 20.2144C26.4176 20.525 25.6173 19.9436 25.6862 19.1503V19.1503L25.7241 18.713" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M73.5001 3.5L73.0275 2.71236C72.5617 1.93617 71.4371 1.93543 70.9703 2.71101L68.6414 6.58087C68.4738 6.85928 68.2005 7.05784 67.884 7.13116L63.481 8.15091C62.5998 8.35499 62.2526 9.42356 62.8455 10.1066L65.8082 13.5196C66.0213 13.765 66.1256 14.0863 66.0975 14.41L65.9897 15.6525M75.1682 6.2644L75.3586 6.58087C75.5262 6.85928 75.7995 7.05784 76.116 7.13116L80.5191 8.15091C81.4002 8.35499 81.7474 9.42356 81.1545 10.1066L78.1918 13.5196C77.9788 13.765 77.8744 14.0863 77.9025 14.41L78.2932 18.9127C78.3714 19.8138 77.4625 20.4742 76.6296 20.1214L72.4681 18.3583C72.1689 18.2316 71.8311 18.2316 71.5319 18.3583L67.1508 20.2144C66.4176 20.525 65.6173 19.9436 65.6862 19.1503V19.1503L65.7241 18.713" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
         </svg>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Content />
    </div>
  );
}

export default App;
