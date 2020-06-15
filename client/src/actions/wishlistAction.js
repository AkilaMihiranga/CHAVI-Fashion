import { base_url } from "../constants/index";

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const GET_WISHLIST_DETAILS = 'GET_WISHLIST_DETAILS';
export const UPDATE_WISHLIST = 'UPDATE_WISHLIST';
export const CLEAR_WISHLIST = 'CLEAR_WISHLIST';

export const addToWishlist = (token, wishlistItem) => {
    return async dispatch => {
        try{
            const response = await fetch(`${base_url}/wishlist/add`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(wishlistItem),
                method: 'POST'
            });
            const jsonResposne = await response.json();
            if(response.status === 201){
                dispatch({
                    type: ADD_TO_WISHLIST,
                    wishlistItem: wishlistItem
                });
            }

            return jsonResposne;
        }catch(error){
            console.log(error);
        }
    }
}

export const getWishlistItems = (token, user_id) => {
    return async dispatch => {

        try{

            const response = await fetch(`${base_url}/wishlist/user/${user_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                method: 'POST'
            });

            const jsonResposne = await response.json();
            if(response.status === 200){
                dispatch({
                    type: GET_WISHLIST_DETAILS,
                    wishlistItems: jsonResposne.message[0]
                });
            }

            return jsonResposne.message[0];

        }catch(error){
            console.log(error);
        }
        
    }
}

export const updateWishlist = (token, user_id, product) => {
    return async dispatch => {
        try{

            const response = await fetch(`${base_url}/wishlist/update/quantity`,{
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
                    type: UPDATE_WISHLIST,
                    item: product
                });
            }

            return jsonResposne.message;


        }catch(error){
            console.log(error);
        }
    }
}

export const clearWishlist = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_WISHLIST,
            payload: null
        });
    }
}