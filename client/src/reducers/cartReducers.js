import { ADD_TO_CART, GET_CART_DETAILS, UPDATE_CART, CLEAR_CART, DELETE_CART_ITEM  } from "../actions/cartAction";

const initState = {
    cartItem: [],
    totalAmount: 0,
    cartCount: 0
}

const cartReducers = (state = initState, actions) => {
    switch(actions.type){
        case ADD_TO_CART:
            const cartItem = state.cartItem;
            let updatedCartItem = [];
            let totalAmount;

            const itemCount = state.cartItem.filter(item => item.product === actions.cartItem.product);

            if(itemCount.length === 0){
                updatedCartItem = [
                    ...cartItem,
                    {
                        product: actions.cartItem.product,
                        name: actions.cartItem.name,
                        image: actions.cartItem.image,
                        price: actions.cartItem.price,
                        quantity: actions.cartItem.quantity,
                        total: actions.cartItem.quantity * actions.cartItem.price
                    }
                ];
            }else{
                updatedCartItem = cartItem.map(item => 
                    item.product === actions.cartItem.product ?
                    {
                        ...item,
                        quantity: item.quantity + actions.cartItem.quantity,
                        total: item.total + actions.cartItem.price
                    } : item
                    )
            }
            totalAmount = state.totalAmount + actions.cartItem.price
            state = {
                cartItem: updatedCartItem,
                totalAmount: totalAmount,
                cartCount: state.cartCount + 1
            }
            break;
        case GET_CART_DETAILS:
            const cItem = actions.cartItems.cart;
            let totalAmt = 0;
            let quantityCount = 0;
            const updateCartItem = cItem.map(item => {
                totalAmt += item.total;
                quantityCount += item.quantity;
                return {
                    product: item.product._id,
                    name: item.product.product_name,
                    image: item.product.product_image[0],
                    price: item.price,
                    quantity: item.quantity,
                    total: item.total
                }
            })
            state = {
                cartItem: updateCartItem,
                totalAmount: totalAmt,
                cartCount: quantityCount
            }
            break;
        case UPDATE_CART:
            const updateItem = actions.item;
            const cartItems = state.cartItem.map(item => {
                return item.product === updateItem.productId ? 
                {
                    ...item,
                    quantity: updateItem.quantity,
                    total: updateItem.total
                } : item
            });
            state = {
                cartItem: cartItems,
                totalAmount: parseFloat(state.totalAmount) + parseFloat(updateItem.price * updateItem.newQuantity),
                cartCount: parseInt(state.cartCount) + parseInt(updateItem.newQuantity)
            }
            break;
        case DELETE_CART_ITEM:
            const deleteItem = actions.item;
            const dCartItems = state.cartItem.map(item => {
                return item.product === deleteItem.productId ? 
                {
                    ...item,
                    quantity: deleteItem.quantity,
                    total: deleteItem.total
                } : item
            });
            state = {
                cartItem: dCartItems,
                totalAmount: parseFloat(state.totalAmount) + parseFloat(deleteItem.price * deleteItem.newQuantity),
                cartCount: parseInt(state.cartCount) + parseInt(deleteItem.newQuantity)
            }
            break;    
        case CLEAR_CART:
            state = {
                cartItem: [],
                totalAmount: 0,
                cartCount: 0
            }
            break;
        default:
            break;
    }

    return state;
}

export default cartReducers;