export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_CART_DETAILS = 'GET_CART_DETAILS';
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (token, cartItem) => {
    return async dispatch => {
        try{
            const response = await fetch(`/cart/add`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(cartItem),
                method: 'POST'
            });
            const jsonResposne = await response.json();
            if(response.status === 201){
                dispatch({
                    type: ADD_TO_CART,
                    cartItem: cartItem
                });
            }

            return jsonResposne;
        }catch(error){
            console.log(error);
        }
    }
}

export const getCartItems = (token, user_id) => {
    return async dispatch => {

        try{

            const response = await fetch(`/cart/user/${user_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                method: 'POST'
            });

            const jsonResposne = await response.json();
            if(response.status === 200){
                dispatch({
                    type: GET_CART_DETAILS,
                    cartItems: jsonResposne.message[0]
                });
            }

            return jsonResposne.message[0];

        }catch(error){
            console.log(error);
        }
        
    }
}

export const updateCart = (token, user_id, product) => {
    return async dispatch => {
        try{

            const response = await fetch(`/cart/update/quantity`,{
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                method: 'PUT',
                body: JSON.stringify({
                    user_id: user_id,
                    productId: product.productId,
                    quantity: product.quantity,
                    total: product.total
                })
            });
            const jsonResposne = await response.json();

            if(response.status === 201){
                dispatch({
                    type: UPDATE_CART,
                    item: product
                });
            }

            return jsonResposne.message;


        }catch(error){
            console.log(error);
        }
    }
}

export const deleteCartItem = (user_id, product) => {
    return async dispatch => {
        try{

            const response = await fetch(`/cart/delete`,{
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({
                    user_id: user_id,
                    productId: product.productId
                })
            });
            const jsonResposne = await response.json();

            if(response.status === 201){
                dispatch({
                    type: DELETE_CART_ITEM,
                    payload: null
                });
            }

            return jsonResposne.message;


        }catch(error){
            console.log(error);
        }
    }
}

export const clearCart = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_CART,
            payload: null
        });
    }
}