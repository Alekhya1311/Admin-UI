import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Sample from '../Sample'

import './index.css'

const apiUrl =
  'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'

class Admin extends Component {
  state = {
    adminData: [],
    searchInput: '',
    filteredData:[]
  }

  componentDidMount() {
    this.getAdminData()
  } 
  
  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getAdminData)
  } 

  

  
 
  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }


  renderHeader = () => (
    <div className="list-header">
      <input className="checkbox-header" type="checkbox" />
      <p className="list-heading">Name</p>

      <p className="list-heading">Email</p>
      <p className="list-heading">Role</p>
      <p className="list-heading">Actions</p>
    </div>
  )

  renderAdmin = () => {
    const {filteredData} = this.state
    
    console.log(`AdminData: ${filteredData}`)

    return (
      <div className="admin-list">
        {this.renderHeader()}
        <ul className="list-body">
          <Sample  adminData = {filteredData} />
        </ul>
      </div>
    )
  }

  

  

  getAdminData = async () => {
    const { searchInput,adminData} = this.state;

    if(adminData.length){

      const filteredData = adminData.filter(value => 
         
        (
          
         value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
         value.email.toLowerCase().includes(searchInput.toLowerCase()) ||
         value.role.toLowerCase().includes(searchInput.toLowerCase())
       )
     ); 
      
     this.setState({
        filteredData
      })
   }else{

      const response = await fetch(apiUrl)
      const fetchedData = await response.json()
      this.setState({
        adminData: fetchedData,
        filteredData:fetchedData
      })
   }
    
    
    
  }

  renderAdminDataList = () => (
      <div>
         <div className="filters-group-container">{this.renderSearchInput()}</div>
         <div className="admin-container">{this.renderAdmin()}</div>
        
      </div>
    )
  

  render() {
    return <div className="app-container">{this.renderAdminDataList()}</div>
  }
}

export default Admin