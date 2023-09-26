import { useEffect, useState } from 'react';

export const ProductList = ({
	cart,
	setcart,
	total,
	setTotal,
	countProducts,
	setCountProducts,
}) => {
  const [backendData, setBackendData] = useState([]);

	const agregarProductoAlCarrito = async (product, counter) => {
		const sku = product.sku;
		const requestBody = {
		  product: product,
		  counter: counter,
		};
	  
		try {
			await agregarProductoASellAPI(sku, requestBody);
			await agregarProductoAlCarritoAPI(requestBody);

			fetchDataFromBackendCart()

		} catch (error) {
		  console.error('Error en la solicitud:', error);
		}
		fetchDataFromBackendProducts();
	  };
	  
	  const agregarProductoASellAPI = async (sku, requestBody) => {
		try {
		  const response = await fetch(`http://localhost:8080/api/products/sell/${sku}`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		  });
	  
		  if (!response.ok) {
			console.error('Error en la solicitud a la API de productos:', response.status);
		  } else {
			const data = await response.json();
			console.log(data.message);
		  }
		} catch (error) {
		  console.error('Error en la solicitud a la API de productos:', error);
		}
	  };
	  
	  const agregarProductoAlCarritoAPI = async (requestBody) => {
		try {
		  const response = await fetch(`http://localhost:8080/api/cart/add`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		  });
	  
		  if (!response.ok) {
			console.error('Error en la solicitud al carrito de compras:', response.status);
		  } else {
			const data = await response.json();
			console.log(data.message);
		  }
		} catch (error) {
		  console.error('Error en la solicitud al carrito de compras:', error);
		}
	  };

	  const fetchDataFromBackendProducts = async () => {
		try {
		  const response = await fetch('http://localhost:8080/api/products', {
			method: 'GET',
		  });
		  if (!response.ok) {
			throw new Error('La solicitud no fue exitosa');
		  }
	  
		  const dataFromBackend = await response.json();
		  // Agrega la cantidad inicial a cada producto
		  const productsWithCounter = dataFromBackend.map((product) => ({
			...product,
			counter: 1,
		  }));
		  setBackendData(productsWithCounter);
	  
		  console.log('Datos del backend:', dataFromBackend);
		} catch (error) {
		  console.error('Error al obtener datos del backend:', error);
		}
	  };

	  const fetchDataFromBackendCart = async () => {
		try {
		  const response = await fetch('http://localhost:8080/api/cart/contents', {
			method: 'GET',
		  });
		  if (!response.ok) {
			throw new Error('La solicitud no fue exitosa');
		  }
	
		  const dataFromBackend = await response.json();
		  const totalFromBackend = parseFloat(dataFromBackend.totalPrice[0]).toFixed(2);
		  const cantidadFromBackend = dataFromBackend.totalPrice[1]
		  setcart(dataFromBackend.cartContents);
		  setTotal(totalFromBackend);
		  setCountProducts(cantidadFromBackend) // Almacena los datos del backend en el estado
		} catch (error) {
		  console.error('Error al obtener datos del backend:', error);
		}
	  };
	  
	
	  const handleIncreaseQuantity = (index) => {
		const updatedData = [...backendData];
		updatedData[index].counter += 1;
		setBackendData(updatedData);
	  };
	
	  const handleDecreaseQuantity = (index) => {
		if (backendData[index].counter > 1) {
		  const updatedData = [...backendData];
		  updatedData[index].counter -= 1;
		  setBackendData(updatedData);
		}
	  };

	  useEffect(() => {
		fetchDataFromBackendProducts();
	  }, []);

	  return (
		<div className='container-items'>
		  {backendData.map((product, index) => (
			<div className='item' key={product.id}>
			  <figure>
				<img src={product.image} alt={product.name} />
			  </figure>
			  <div className='info-product'>
				<h2>{product.name}</h2>
				<p className='sku'>SKU: {product.sku}</p>
				<p className='price'>Precio: ${product.price}</p>
				<p className='quantity'>Cantidad: {product.quantity}</p>
				<div className='quantity-container'>
				<button onClick={() => handleDecreaseQuantity(index)}> - </button>
           			<span className='quantity'>{product.counter}</span>
            <	button onClick={() => handleIncreaseQuantity(index)}> + </button>
				</div>
				<button onClick={() => agregarProductoAlCarrito(product, product.counter)}>Añadir al carrito</button>
			  </div>
			</div>
		  ))}
		</div>
	  );
};