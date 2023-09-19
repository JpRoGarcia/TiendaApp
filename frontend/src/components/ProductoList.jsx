import { data } from '../data';
import { useEffect, useState } from 'react';

export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
  const [backendData, setBackendData] = useState([]);

	const onAddProduct = product => {
		if (allProducts.find(item => item.id === product.id)) {
			const products = allProducts.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setTotal(total + product.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}

		setTotal(total + product.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};

	const fetchDataFromBackend = async () => {
		try {
		  const response = await fetch('http://localhost:8080/api/products', {
			method: 'GET',
		  });
		  if (!response.ok) {
			throw new Error('La solicitud no fue exitosa');
		  }
	
		  const dataFromBackend = await response.json();
		  setBackendData(dataFromBackend); // Almacena los datos del backend en el estado
	
		  console.log('Datos del backend:', dataFromBackend);
		} catch (error) {
		  console.error('Error al obtener datos del backend:', error);
		}
	  };
	
	  useEffect(() => {
		fetchDataFromBackend();
	  }, []);

	  return (
		<div className='container-items'>
		  {backendData.map((product) => (
			<div className='item' key={product.id}>
			  <figure>
				<img src={product.image} alt={product.name} />
			  </figure>
			  <div className='info-product'>
				<h2>{product.name}</h2>
				<p className='price'>${product.price}</p>
				<p className='sku'>sku: {product.sku}</p>
				<p className='description'>description: {product.description}</p>
				<button onClick={() => onAddProduct(product)}>Añadir al carrito</button>
			  </div>
			</div>
		  ))}
		</div>
	  );
};