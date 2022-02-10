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
		JSON.parse(localStorage.getItem('products')) || data
	);
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
		if (e.target.value === 'all') setProducts(data);
		else {
			setProducts(data.filter((p) => p.price === +e.target.value));
		}
	};

	const handleRange = (e) => {
		setProducts(data.filter((p) => p.price <= +e.target.value));
		setValue({
			min: 200,
			range: e.target.value,
			max: 2000
		});
	};
	const handleNameChange = (e) => {
		setProducts(
			data.filter((p) =>
				p.title.toLowerCase().includes(e.target.value.toLowerCase())
			)
		);
	};
	useEffect(() => {
		localStorage.setItem('products', JSON.stringify(data));
	});
	console.log();
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
