import React from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct(props) {
	const navigate = useNavigate(); // Not Work on Class Based
	return (
		<form
			className="product-form"
			onSubmit={(e) => {
				props.handleAddProduct(e);
				navigate('/products');
			}}
		>
			<input
				type="text"
				name="title"
				placeholder="Enter Title"
				onChange={props.handleChange}
			/>
			<input
				type="text"
				placeholder="Enter Desc"
				name="desc"
				onChange={props.handleChange}
			/>
			<input
				type="number"
				placeholder="Enter Price"
				name="price"
				onChange={props.handleChange}
			/>
			<input type="submit" value="Add Product" />
		</form>
	);
}
export default AddProduct;
