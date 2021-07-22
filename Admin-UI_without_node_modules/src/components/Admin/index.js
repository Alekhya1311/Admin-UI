import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Pagenation from '../Pagenation'


import './index.css'

const apiUrl =
  'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'

class Admin extends Component {
  state = {
    adminData: [],
    searchInput: '',
    filteredData:[], 
    
    selectIds : []
  }

  componentDidMount() {
    this.getAdminData()
  } 
  
  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getAdminData)
  } 

  
  deleteUser = id => {
    
    const {filteredData} = this.state
    
    const filteredUsersData = filteredData.filter(

      each => parseInt(each.id, 10) !== parseInt(id, 10)
    
      
    ) 

    this.setState({filteredData: filteredUsersData})
    
    
     
  }  

  

  deleteSelected = () => {
    const {selectIds, filteredData} = this.state 

    const data = filteredData.filter(each => !selectIds.includes(each.id))

    this.setState({filteredData: data , selectIds : []})



  }
    
  
 
  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className = "search-and-delete">
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

      <div >
        <button className = "button" onClick = {this.deleteSelected}>Delete Selected</button>
      </div>

      </div>
      

    )
  } 


  checked = () => {
    
  } 

  selectId = id => {
    const {selectIds} = this.state
     
       this.setState({selectIds: [...selectIds, id]})
  }
 
  unSelect = id => {
    const {selectIds} = this.state
    const filteredSelectId = selectIds.filter(

      each => parseInt(each.id, 10) === parseInt(id, 10)
    
      
    )   
   

    this.setState({selectIds: filteredSelectId})
  }  

  


  // onSelectMultiple = (event) => {
    
  //   const {target} = event 
  //   if (target.checked === true) {
       
        
  //   } else {
      
  //   }
    
  // }

  renderHeader = () => (
    <div className="list-header">
      <input className="checkbox-header" type="checkbox" onChange = {this.onSelectMultiple}/>
      <p className="list-heading">Name</p>

      <p className="list-heading">Email</p>
      <p className="list-role">Role</p>
      <p className="list-heading">Actions</p>
    </div>
  )

  renderAdmin = () => {
    const {filteredData} = this.state
    
   

    return (
      <div className="admin-list">
        {this.renderHeader()}
       
          <Pagenation adminData = {filteredData} deleteUser={this.deleteUser} selectId = {this.selectId} unSelect = {this.unSelect}/>
        
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
         {this.renderAdmin()}
        
      </div>
    )
  

  render() {
    return <div className="app-container">{this.renderAdminDataList()}</div>
  }
}

export default Admin