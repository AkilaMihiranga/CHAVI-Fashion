import React, {Component} from "react"
import Header from "../../components/Header/Header";
import * as authActions from '../../actions/authActions';
import {connect} from 'react-redux';
import {base_url} from "../../constants/index";
import './style.css';
import Footer from '../../components/Footer/index';

class Orders extends Component {
    
    state = {
        ordersList: []
        
    }
    
    componentDidMount() {
        if (!this.props.auth.isAuthenticated){
            this.props.getToken()
            .then(result => {
                if(result){
                    this.getOrders();
                }else{
                    this.props.history.push('/login');
                }
            })
        }else{
            this.getOrders();
        }
    }

    getOrders = () => {
        console.log(this.props.auth.isAuthenticated);
        const token =  this.props.auth.token;
        const user_id = this.props.auth.user.user_id;
        fetch(`${base_url}/order/getorders/${user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    ordersList: jsonResponse.message
                });
            })
            .catch(error => {
                console.log(error);
            })
    };

    getTotalOrder = (id) => {
        const singleOrder = this.state.ordersList.find(order => order._id === id);
        let orderTotal = 0;
        singleOrder.order.forEach(order => {
            orderTotal = orderTotal + (order.price * order.quantity)
        });
        return orderTotal;
    };

    dateFormat = (date) => {
        let d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    render() {
        return (
            <React.Fragment>
                <Header />
                
                    <div className="Content">
                        <div className="card card-body">
                            <h1 className="text-center"><b>MY ORDERS</b></h1>
                            {
                                this.state.ordersList.map(order => {
                                    return (
                                        <div key={order._id} className="Order">
                                            <div className="OrderHeader">
                                                <a href="/orders">{order._id}</a>
                                            </div>
                                            <div className="OrderDescription">
                                                <div className="od1">
                                                    <p className="odTitle">Delivered Address</p>
                                                    <p>{`${order.address.address} ${order.address.cityDistrictTown} ${order.address.state} - ${order.address.pinCode}`}</p>
                                                </div>
                                                <div className="od2">
                                                    <p className="odTitle">Payment Type</p>
                                                    <p className="odp1">{order.paymentType}</p>
                                                </div>
                                                <div className="od3">
                                                    <p className="odTitle">Payment Status</p>
                                                    <p className="odp2">{order.paymentStatus}</p>
                                                </div>

                                            </div>
                                            <div>
                                                {order.order.map(item => (
                                                    <div key={item._id} style={{display: 'flex', alignItems: 'center', margin: '5px 0', borderBottom: '1px solid #cecece'}}>
                                                        <div style={{width: '100px', height: '100px', overflow: 'hidden', position: 'relative'}} className="ImageContainer">
                                                            <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={`http://localhost:5000/${item.product.product_image}`} alt="ordered_product"/>
                                                        </div>
                                                        <div>
                                                            <p className="odTitle">{item.product.name}</p>
                                                            <div style={{fontSize: '14px', color: '#555', fontWeight: 'bold'}}>
                                                                <p>Quantity: {item.quantity}</p>
                                                                <p>Rs. {item.price * item.quantity}</p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="OrderFooter">
                                                <p>Ordered On <span>{this.dateFormat(order.orderDate)}</span></p>
                                                <p><b>Order Total <span>Rs. {this.getTotalOrder(order._id)}</span></b></p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div><br/><br/><br/>
                    <Footer />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken())
    }
};


export default  connect(mapStateToProps, mapDispatchToProps)(Orders);

