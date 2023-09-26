import { useEffect, useState } from 'react';

export const Header = ({
	cart,
	setcart,
	total,
	setTotal,
	countProducts,
	setCountProducts,
}) => {
	const [active, setActive] = useState(false);


	const onDeleteProduct = async (product) => {
		try {
			const sku = product.sku;
		  const response = await fetch(`http://localhost:8080/api/cart/remove/${sku}`, {
			method: 'DELETE',
		  });
	  
		  if (!response.ok) {
			throw new Error('La solicitud de eliminación no fue exitosa');
		  }
	  
		  // Si la eliminación en el backend fue exitosa, actualiza la interfaz de usuario
		  setTotal((prevTotal) => (prevTotal - product.precio * product.quantity).toFixed(2));
		  setCountProducts((prevCount) => prevCount - product.quantity);
	  
		  // Filtra los productos para mostrar solo los que no se han eliminado
		  const updatedCartContents = cart.filter((item) => item.product.sku !== product.product.sku);
		  setcart(updatedCartContents);
	  
		  console.log('Producto eliminado del carrito:', product.product.name);
		} catch (error) {
		  console.error('Error al eliminar el producto del carrito:', error);
		}
	  };

	const onCleanCart = () => {

		setTotal(0);
		setCountProducts(0);
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

	  useEffect(() => {
		fetchDataFromBackendCart();
	  }, []);

	return (
		<header>
			<h1>Tienda</h1>

			<div className='container-icon'>
				<div
					className='container-cart-icon'
					onClick={() => setActive(!active)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='icon-cart'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
						/>
					</svg>
					<div className='count-products'>
						<span id='contador-productos'>{countProducts}</span>
					</div>
				</div>

				<div
					className={`container-cart-products ${
						active ? '' : 'hidden-cart'
					}`}
				>
					{cart.length ? (
						<>
							<div className='row-product'>
								{cart.map(item => (
									<div className='cart-product' key={item.product.sku}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{item.quantity}
											</span>
											<p className='titulo-producto-carrito'>
												{item.product.name}
											</p>
											<span className='precio-producto-carrito'>
												${item.precio}
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(item)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>	
									</div>
								))}
							</div>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}</span>
							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
						</>
					) : (
						<p className='cart-empty'>El carrito está vacío</p>
					)}
				</div>
			</div>
		</header>
	);
};