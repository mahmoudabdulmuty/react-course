import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import ProductsList from './components/ProductsList';
import { data } from './data';

function App() {
	const [products, setProducts] = useState(
		() => JSON.parse(localStorage.getItem('products')) || data
	);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [formData, setFormData] = useState({
		title: '',
		price: '',
		desc: ''
	});
	const [value, setValue] = useState({
		min: 200,
		max: 2000,
		range: ''
	});

	useEffect(() => {
		localStorage.setItem('products', JSON.stringify(products));
	}, [products]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleAddProduct = (e) => {
		e.preventDefault();
		setProducts([
			...products,
			{
				id: products.length + 1,
				title: formData.title,
				price: formData.price,
				desc: formData.desc
			}
		]);
	};

	const handleDeleteProduct = (id) => {
		setProducts(products.filter((item) => item.id !== id));
	};

	const handleChangeFilter = (e) => {
		if (e.target.value === 'all') setFilteredProducts([]);
		else {
			setFilteredProducts(
				products.filter((product) => product.price === +e.target.value)
			);
		}
	};

	const handleRange = (e) => {
		setFilteredProducts(
			products.filter((product) => product.price <= Number(e.target.value))
		);
		setValue({ ...value, range: e.target.value });
	};
	const handleNameChange = (e) => {
		setFilteredProducts(
			products.filter((p) =>
				p.title.toLowerCase().includes(e.target.value.toLowerCase())
			)
		);
	};

	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/products"
						element={
							<ProductsList
								products={products}
								handleDeleteProduct={handleDeleteProduct}
								handleChangeFilter={handleChangeFilter}
								handleRange={handleRange}
								value={value}
								handleNameChange={handleNameChange}
								filteredProducts={filteredProducts}
							/>
						}
					/>
					<Route
						path="/products/:id"
						element={<ProductDetails products={products} />}
					/>
					<Route
						path="/create"
						element={
							<AddProduct
								handleChange={handleChange}
								handleAddProduct={handleAddProduct}
							/>
						}
					/>
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
