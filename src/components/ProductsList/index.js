import React from 'react';
import { NavLink } from 'react-router-dom';

function ProductsList(props) {
	return (
		<>
			<select onChange={props.handleChangeFilter}>
				<option value="all">All</option>
				<option value="1000">1000</option>
				<option value="2000">2000</option>
			</select>
			<div>
				{props.value.min}
				<input
					type="range"
					id="price-range"
					name="price-range"
					min="200"
					max="2000"
					onChange={props.handleRange}
				/>
				{props.value.max}
				<p>{props.value.range}</p>
			</div>
			<div>
				<input type="text" onChange={props.handleNameChange} />
			</div>
			<div className="products">
				{props.products.length === 0 && <div>There is No Products </div>}

				{props.products.map((product) => (
					<div className="product-item" key={product.id}>
						<NavLink to={`/products/${product.id}`}>
							<p>{product.title}</p>
							<p>{product.price}</p>
							<p>{product.desc}</p>
						</NavLink>
						<button onClick={() => props.handleDeleteProduct(product.id)}>
							delete
						</button>
					</div>
				))}
			</div>
		</>
	);
}

export default ProductsList;
