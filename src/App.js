import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import ProductsList from './components/ProductsList';
import { data } from './data';

class App extends Component {
	state = {
		products: JSON.parse(localStorage.getItem('products')) || data,
		title: '',
		price: '',
		desc: '',
		value: {
			min: 200,
			max: 2000,
			range: ''
		}
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleAddProduct = (e) => {
		e.preventDefault();
		this.setState({
			products: [
				...this.state.products,
				{
					id: this.state.products.length + 1,
					title: this.state.title,
					price: this.state.price,
					desc: this.state.desc
				}
			]
		});
	};

	handleDeleteProduct = (id) => {
		this.setState({
			products: this.state.products.filter((item) => item.id !== id)
		});
	};

	handleChangeFilter = (e) => {
		if (e.target.value === 'all') this.setState({ products: data });
		else {
			this.setState({
				products: data.filter((p) => p.price === +e.target.value)
			});
		}
	};

	handleRange = (e) => {
		this.setState({
			products: data.filter((p) => p.price <= +e.target.value),
			value: {
				min: 200,
				range: e.target.value,
				max: 2000
			}
		});
	};
	handleNameChange = (e) => {
		this.setState({
			products: data.filter((p) =>
				p.title.toLowerCase().includes(e.target.value.toLowerCase())
			)
		});
	};
	componentDidUpdate() {
		localStorage.setItem('products', JSON.stringify(this.state.products));
	}
	render() {
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
									products={this.state.products}
									handleDeleteProduct={this.handleDeleteProduct}
									handleChangeFilter={this.handleChangeFilter}
									handleRange={this.handleRange}
									rangeValue={this.rangeValue}
									value={this.state.value}
									handleNameChange={this.handleNameChange}
								/>
							}
						/>
						<Route
							path="/products/:id"
							element={<ProductDetails products={this.state.products} />}
						/>
						<Route
							path="/create"
							element={
								<AddProduct
									handleChange={this.handleChange}
									handleAddProduct={this.handleAddProduct}
								/>
							}
						/>
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		);
	}
}

export default App;
