import { ADD_TO_WISHLIST, GET_WISHLIST_DETAILS, UPDATE_WISHLIST, CLEAR_WISHLIST } from "../actions/wishlistAction";

const initState = {
    wishlistItem: [],
    totalAmount: 0,
    wishlistCount: 0
}

const wishlistReducers = (state = initState, actions) => {
    switch(actions.type){
        case ADD_TO_WISHLIST:
            const wishlistItem = state.wishlistItem;
            let updatedWishlistItem = [];
            let totalAmount;

            const itemCount = state.wishlistItem.filter(item => item.product === actions.wishlistItem.product);

            if(itemCount.length === 0){
                updatedWishlistItem = [
                    ...wishlistItem,
                    {
                        product: actions.wishlistItem.product,
                        name: actions.wishlistItem.name,
                        image: actions.wishlistItem.image,
                        price: actions.wishlistItem.price,
                        quantity: actions.wishlistItem.quantity,
                        total: actions.wishlistItem.quantity * actions.wishlistItem.price
                    }
                ];
            }else{
                updatedWishlistItem = wishlistItem.map(item => 
                    item.product === actions.wishlistItem.product ?
                    {
                        ...item,
                        quantity: item.quantity + actions.wishlistItem.quantity,
                        total: item.total + actions.wishlistItem.price
                    } : item
                    )
            }
            totalAmount = state.totalAmount + actions.wishlistItem.price
            state = {
                wishlistItem: updatedWishlistItem,
                totalAmount: totalAmount,
                wishlistCount: state.wishlistCount + 1
            }
            break;
        case GET_WISHLIST_DETAILS:
            const cItem = actions.wishlistItems.wishlist;
            let totalAmt = 0;
            let quantityCount = 0;
            const updateWishlistItem = cItem.map(item => {
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
                wishlistItem: updateWishlistItem,
                totalAmount: totalAmt,
                wishlistCount: quantityCount
            }
            break;
        case UPDATE_WISHLIST:
            const updateItem = actions.item;
            const wishlistItems = state.wishlistItem.map(item => {
                return item.product === updateItem.productId ? 
                {
                    ...item,
                    quantity: updateItem.quantity,
                    total: updateItem.total
                } : item
            });
            state = {
                wishlistItem: wishlistItems,
                totalAmount: parseFloat(state.totalAmount) + parseFloat(updateItem.price * updateItem.newQuantity),
                wishlistCount: parseInt(state.wishlistCount) + parseInt(updateItem.newQuantity)
            }
            break;
        case CLEAR_WISHLIST:
            state = {
                wishlistItem: [],
                totalAmount: 0,
                wishlistCount: 0
            }
            break;
        default:
            break;
    }

    return state;
}

export default wishlistReducers;