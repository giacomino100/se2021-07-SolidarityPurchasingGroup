import {Container, Table, ListGroup, InputGroup, Row, Col, Form, Button, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import Select from 'react-select'
import { iconAdd, iconSub, iconAddDisabled, iconSubDisabled, basket } from "./Icons";
import HomeButton from './HomeButton'

function ProductAction(props){
    return (<>
            <Link to={{
                        pathname: "/editProduct",
                        state: { id: props.id, name: props.name, description: props.description, category: props.category, typeofproduction: props.typeofproduction, measure: props.measure, picture: props.picture}
                    }}><Button>edit</Button>
            </Link>&nbsp; 
        </>
    )
}


function ProductRow(props){  
    const {product} = props;

    return( <tr>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td><Image style={{width: "100px"}} src={product.picture} fluid/></td>
              <td><ProductAction id={product.id} name={product.name} description={product.description} category={product.category} typeofproduction={product.typeofproduction} measure={product.measure} picture={product.picture}></ProductAction></td>
            </tr>
    )
  }

  function ProductAvailableRow(props){  
    const {product} = props;
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const add = () => {
        let x = quantity + 1;
        handleProductsAvailable(x, price)
    }

    const sub = () => {
        if (quantity > 0) {
            let x = quantity - 1;
            handleProductsAvailable(x, price)
        }
    }

    const handleProductsAvailable = (newQuantity, newPrice) => {
        setPrice(newPrice);
        setQuantity(newQuantity);
        if (props.productsAvailable.length === 0) {
            const newProduct = { productid: product.id, name: product.name, quantity: newQuantity, measure: product.measure, price: newPrice };
            props.setProductsAvailable([newProduct])
        } else {
            const otherProducts = props.productsAvailable.filter(p => p.productid !== product.id)
            if (newQuantity === 0) {
                props.setProductsAvailable(otherProducts);
            } else {
                const newProduct = { productid: product.id, name: product.name, quantity: newQuantity, measure: product.measure, price: newPrice};
                const newProducts = [...otherProducts, newProduct];
                props.setProductsAvailable(newProducts);
            }
        }
    }

    return( <tr>
              <td style={{ fontSize: "18pt"}}>{product.name}</td>
              <td>       
                <Form.Group className="m-2" controlId="formBasicPrice">
                        {"€ "}
                        <input
                            type="number"
                            min={1}
                            max={1000}
                            step={0.01}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                </Form.Group>                      
              </td>
              <td><Image style={{width: "100px"}} src={product.picture} fluid/></td>
              <td className="align-middle">{(quantity > -1) ? <span style={{ cursor: 'pointer' }} className={"add-btn-" + props.index} onClick={add}>{iconAdd}</span>
                    : <span style={{ cursor: 'pointer' }}>{iconAddDisabled}</span>}&nbsp;
                    {quantity > 0 ? <span style={{ cursor: 'pointer' }} className={"sub-btn-" + props.index} onClick={sub}>{iconSub}</span>
                        : <span style={{ cursor: 'pointer' }}>{iconSubDisabled}</span>}
                </td>
              <td>{quantity + " " + product.measure}</td>
            </tr>
    )
  }


export default function ReportAvailability(props){
    const [products, setProducts] = useState([{
            id: 1,
            name: "Carrots",
            description: "Organic carrots are a versatile and nutritious addition to any meal. They are rich in beta-carotene, vitamin A, and potassium. Carrots can be roasted, mashed, and mixed into salads. They can also be steamed and served with a flavorful sauce",
        	farmerid: 1,
            price: 4.17,
            measure: "kg",
            category: "Fruit and Vegetables",
            typeofproduction: "Local farm",
            picture: "/img/carote.jfif"}]);
    
    const [productsAvailable, setProductsAvailable] = useState([]);
    const [dirty, setDirty] = useState(false)

    //this use effect is used to get the products of a farmer
    useEffect(() => {
        //getProductsByFarmer when it will be implemented
        if(dirty){
            setDirty(false);
        }
    }, [dirty]);

    const handleReport = () => {
        console.log(productsAvailable);
    }

    return( <Container className="justify-content-center" style={{width: "70%"}}>
                
                <h1>Hello {props.username}!</h1>
                <h3>These are all your products</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map(product => <ProductRow key={product.id} product={product}></ProductRow>)}
                    </tbody>
                </Table>
                <hr></hr>
                <h3>Select the availability for the next week</h3>
                <Table className="mt-3" striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Available</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map(product => <ProductAvailableRow key={product.id} product={product} productsAvailable={productsAvailable} setProductsAvailable={setProductsAvailable}></ProductAvailableRow>)}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between mb-4">
                    <Link to="/employeehome"><Button variant="danger" className="back-btn">Back</Button></Link>
                    <Button className="order-btn" variant="yellow" onClick={() => handleReport()}>Send report</Button>
                </div>
                <HomeButton  logged={props.logged} />

            </Container>)
}