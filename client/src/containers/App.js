import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducers from '../reducers/authReducers';
import Shop from './Shop/index';
import Login from './Login/loginIndex';
import Signup from './SignUp/SignUpIndex';
import Admin from './AdminDashboard';
import UserList from './AdminDashboard/UserManagement/UsersList';
import EditUser from './AdminDashboard/UserManagement/EditUser';
import AdminList from './AdminDashboard/AdminManagement/AdminsList';
import EditAdmin from './AdminDashboard/AdminManagement/EditAdmin';
import AddAdmin from './AdminDashboard/AdminManagement/AddAdmin';
import StoreManager from './StoreManagerDashboard/index';
import StoreManagerList from './AdminDashboard/ManagerManagement/StoreManagersList';
import AddStoreManager from './AdminDashboard/ManagerManagement/AddStoreManager';
import EditStoreManager from './AdminDashboard/ManagerManagement/EditStoreManager';

import CategoryList from './AdminDashboard/ManageCategory/CategoryList';
import AddCategory from './AdminDashboard/ManageCategory/AddCategory';
import EditCategory from './AdminDashboard/ManageCategory/EditCategory';

import UploadProduct from './ProductManagemet/UploadProduct';
import ProductList from './ProductManagemet/ProductList';
import ProductDetail from './ProductManagemet/ProductDetail';
import EditProduct from './ProductManagemet/EditProduct';

import Profile from './Profile/Profile';
import EditProfile from './Profile/EditProfile';
import UpdatePassword from './Profile/UpdatePassword';
import Cart from './Cart/index';
import cartReducers from '../reducers/cartReducers';
import PlaceOrder from './PlaceOrder/PlaceOrderIndex';
import Orders from './Orders/OrderIndex';
import PrivateRoute from '../PrivateRoute';
import ThankYou from './ThankYou';
import Wishlist from './Wishlist/index';
import wishlistReducers from '../reducers/wishlistReducers';
import AllOrders from './AdminDashboard/OrderManagement/AllOrders';
import AdminRoute from '../AdminRoute';
import ManagerRoute from '../ManagerRoute';
import allproduct from '../components/ShopStore/Products/AllProducts';
import Error from '../containers/Error/index';

const rootReducers = combineReducers({
    auth: authReducers,
    cart: cartReducers,
    wishlist: wishlistReducers
});

const store = createStore(rootReducers, applyMiddleware(thunk));

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Switch>
                        <AdminRoute path="/admin-dashboard"  component={Admin} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <AdminRoute path="/users-list" component={UserList} />
                        <AdminRoute path="/edit-user/:id" component={EditUser} />
                        <AdminRoute path="/admins-list" component={AdminList} />
                        <AdminRoute path="/edit-admin/:id" component={EditAdmin} />
                        <AdminRoute path="/add-admin" component={AddAdmin} />
                        <AdminRoute path="/store-managers-list" component={StoreManagerList} />
                        <AdminRoute path="/add-store-manager" component={AddStoreManager} />
                        <AdminRoute path="/edit-store-manager/:id" component={EditStoreManager} />
                        <AdminRoute path="/edit-category/:id" component={EditCategory} />
                        <AdminRoute path="/add-category" component={AddCategory} />
                        <AdminRoute path="/category-list" component={CategoryList} />
                        <ManagerRoute path="/add-product" component={UploadProduct} />
                        <ManagerRoute path="/product-list" component={ProductList} />
                        <PrivateRoute path="/my-account" component={Profile} />
                        <PrivateRoute path="/update-profile/:id" component={EditProfile} />
                        <PrivateRoute path="/update-password/:id" component={UpdatePassword} />
                        <Route path="/product/:productId" component={ProductDetail} />
                        <ManagerRoute path="/edit-product/:id" component={EditProduct} />
                        <PrivateRoute path="/cart" component={Cart} />
                        <PrivateRoute path="/wishlist" component={Wishlist} />
                        <Route path="/403-error" component={Error} />

                        <PrivateRoute path="/place-order" component={PlaceOrder} />
                        <Route path="/products/all" component={allproduct} />

                        <PrivateRoute path="/all-orders" component={AllOrders} />
                        
                        <PrivateRoute path="/orders" component={Orders} />
                        <PrivateRoute path="/thank-you" component={ThankYou} />

                        <ManagerRoute path="/store-manager-dashboard"  component={StoreManager} />
                        <Route path="/"  component={Shop} />

                        
                        

                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
