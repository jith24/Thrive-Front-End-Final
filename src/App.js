import React, { Component } from 'react';
//import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");
import {Table,Form, FormControl,Row,Col,Container} from 'react-bootstrap'


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      items:[],
      isLoaded:false,
      city: 'Chennai',
      search: '',

    }
  }

  //handlePageChange(pageNumber) {
  //  console.log(`active page is ${pageNumber}`);
  //  this.setState({activePage: pageNumber});
  //}

  handleCityChange = event => {
		this.setState({
      city: event.target.value,
      isLoaded:false,
      items:[],
    },()=>fetch('https://vast-shore-74260.herokuapp.com/banks?city='+this.state.city.toUpperCase())
    .then(res => res.json())
    .then(json =>{
      this.setState({
        isLoaded:true,
        items: json,
      })
    }))
    //console.log(this.state.city);
    
    }
    
    handleSearchChange = event => {  
		this.setState({
			search: event.target.value
        })
  }
  

  componentDidMount(){
    fetch('https://vast-shore-74260.herokuapp.com/banks?city='+this.state.city.toUpperCase())
    .then(res => res.json())
    .then(json =>{
      this.setState({
        isLoaded: true,
        items: json,
      })
    });

  }

  

  render(){
   // const { city,search } = this.state
    var {isLoaded,items,city,search}=this.state;
    var newArray = items.filter(function (item) {
        return item.city.toUpperCase()===city.toUpperCase();
    });
    //console.log(newArray);

    var newArray_final = newArray.filter(function (item) {
      return item.ifsc.toUpperCase().includes(search.toUpperCase())||item.bank_id.toString().includes(search.toUpperCase())||item.branch.toUpperCase().includes(search.toUpperCase())||item.address.toUpperCase().includes(search.toUpperCase())||item.city.toUpperCase().includes(search.toUpperCase())||item.district.toUpperCase().includes(search.toUpperCase())||item.state.toUpperCase().includes(search.toUpperCase())||item.bank_name.toUpperCase().includes(search.toUpperCase());
  });

    
    if(!isLoaded)
      return <div>Loading...</div>
    else{
      return(
        <Container>
        <div className="App">
          <br />
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><h1 class="col-centered">Bank Branches</h1></div><br />
          <div>
            <Form><Row><Col>
					  <select value={city} onChange={this.handleCityChange}>
						  <option value="Mumbai">Mumbai</option>
						  <option value="Chennai">Chennai</option>
						  <option value="Bangalore">Bangalore</option>
              <option value="Delhi">Delhi</option>
						  <option value="Pune">Pune</option>
            </select></Col>
            <Col xs={10}>
            <FormControl type='text' value={search} onChange={this.handleSearchChange}></FormControl></Col>
				  </Row></Form>
          </div><br /> 
          {/* <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        /> */}
          <Table hover bordered responsive variant = "dark">
            <thead><tr>
            <th>IFSC</th>
            <th>Bank ID</th>
            <th>Branch</th>
            <th>Address</th>
            <th>City</th>
            <th>District</th>
            <th>State</th>
            <th>Bank Name</th>     
            </tr></thead>
            <tbody>     
            {newArray_final.map(item =>(
              <tr key ={item.ifsc}>
                <td>{item.ifsc}</td>
                <td>{item.bank_id}</td>
                <td>{item.branch}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.district}</td>
                <td>{item.state}</td>
                <td>{item.bank_name}</td>
              </tr>
            ))}</tbody>
          </Table>
        </div>
        </Container>
      );
    }
  }
}

export default App;
