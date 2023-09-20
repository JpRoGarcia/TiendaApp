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
  const [counter, setCounter] = useState(1); // Contador independiente

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

	const agregarProductoAlCarrito = async (product, counter) => {
		const sku = product.sku;
	  
		const requestBody = {
			product: product,
			counter: counter, // Agregamos el valor de counter al cuerpo de la solicitud
		};

		try {
		  const response = await fetch(`http://localhost:8080/api/products/sell/${sku}`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json', // Asegúrate de establecer el tipo de contenido adecuado
			},
			body: JSON.stringify(requestBody),
		  });
	  
		  if (!response.ok) {
			// Manejar errores de respuesta aquí si es necesario
			console.error('Error en la solicitud:', response.status);
			return;
		  }
	  
		  const data = await response.json(); // Convierte la respuesta a JSON
	  
		  // Maneja la respuesta del backend aquí
		  console.log(data.message);

		  fetchDataFromBackend();

		} catch (error) {
		  // Manejar errores de red o de la solicitud aquí
		  console.error('Error en la solicitud:', error);
		}

		try {
			const response = await fetch(`http://localhost:8080/api/cart/add`, {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json', // Asegúrate de establecer el tipo de contenido adecuado
			  },
			  body: JSON.stringify(requestBody),
			});
		
			if (!response.ok) {
			  // Manejar errores de respuesta aquí si es necesario
			  console.error('Error en la solicitud:', response.status);
			  return;
			}
		
			const data = await response.json(); // Convierte la respuesta a JSON
		
			// Maneja la respuesta del backend aquí
			console.log(data.message);
  
			fetchDataFromBackend();
  
		  } catch (error) {
			// Manejar errores de red o de la solicitud aquí
			console.error('Error en la solicitud:', error);
		  }
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
	

	  const handleIncreaseQuantity = () => {
		// Incrementa el contador independiente en 1
		setCounter(counter + 1);
	  };
	
	  const handleDecreaseQuantity = () => {
		// Verifica que el contador independiente no sea menor que 1 antes de disminuir
		if (counter > 1) {
		  setCounter(counter - 1);
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
				<p className='quantity'>quantity: {product.quantity}</p>
				<div className='quantity-container'>
					<button onClick={handleDecreaseQuantity}>-</button>
					<span className='quantity'>{counter}</span>
					<button onClick={handleIncreaseQuantity}>+</button>
           		</div>
				<button onClick={() => agregarProductoAlCarrito(product, counter)}>Añadir al carrito</button>
			  </div>
			</div>
		  ))}
		</div>
	  );
};