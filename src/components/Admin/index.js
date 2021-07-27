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
    filteredData: [],
    currentPage: 0,
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
      each => parseInt(each.id, 10) !== parseInt(id, 10),
    )

    this.setState({filteredData: filteredUsersData})
  }

  deleteSelected = () => {
    const {filteredData} = this.state

    const data = filteredData.filter(each => !each.selected)

    this.setState({filteredData: data})
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-and-delete">
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

        <div>
          <button
            type="button"
            className="button"
            onClick={this.deleteSelected}
          >
            Delete Selected
          </button>
        </div>
      </div>
    )
  }

  toggleSelection = id => {
    const {filteredData} = this.state
    const index = filteredData.findIndex(each => each.id === id)
    filteredData[index].selected = !filteredData[index].selected
    this.setState({filteredData})
  }

  onSelectMultiple = event => {
    const {target} = event
    const {filteredData, currentPage} = this.state

    // currentPage
    for (let i = currentPage * 10; i < currentPage * 10 + 10; i += 1) {
      filteredData[i].selected = target.checked
    }

    this.setState({filteredData})
  }

  renderHeader = () => (
    <div className="list-header">
      <input
        className="checkbox-header"
        type="checkbox"
        onChange={this.onSelectMultiple}
      />
      <p className="list-name">Name</p>

      <p className="list-email">Email</p>
      <p className="list-role">Role</p>
      <p className="list-actions">Actions</p>
    </div>
  )

  setCurrentPage = page => {
    this.setState({currentPage: page})
  }

  renderAdmin = () => {
    const {filteredData} = this.state

    return (
      <div className="admin-list">
        {this.renderHeader()}

        <Pagenation
          adminData={filteredData}
          deleteUser={this.deleteUser}
          toggleSelection={this.toggleSelection}
          setCurrentPage={this.setCurrentPage}
        />
      </div>
    )
  }

  getAdminData = async () => {
    const {searchInput, adminData} = this.state

    if (adminData.length) {
      const filteredData = adminData.filter(
        value =>
          value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.email.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.role.toLowerCase().includes(searchInput.toLowerCase()),
      )

      this.setState({
        filteredData,
      })
    } else {
      const response = await fetch(apiUrl)
      const fetchedData = await response.json()
      for (let i = 0; i < fetchedData.length; i += 1) {
        fetchedData[i].selected = false
      }
      this.setState({
        adminData: fetchedData,
        filteredData: fetchedData,
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
