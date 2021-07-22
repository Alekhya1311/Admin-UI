import {Component} from 'react'
import './index.css'

import {MdEdit, MdDelete} from 'react-icons/md'

class AdminItem extends Component {

  state = {
    editMode:false
  }

  onDelete = () => {
    const {admin,deleteUser} = this.props
    deleteUser(admin.id)
  }


render() {
  const {admin, deleteUser, selectId, unSelect,toggleSelection } = this.props
  const {editMode} = this.state
  return (
    <li className="item-container">
      <div className="admin-item-container">
        <input className="checkbox-item" type="checkbox"  onChange = {() => {
          toggleSelection(admin.id)
        }} checked={admin.selected || false} />
        {
          editMode ? <input type="text" value={admin.name}/> : 
                    <p className="admin-name">{admin.name}</p>
        }

        <p className="admin-email">{admin.email}</p>
        <p className="admin-role">{admin.role}</p>
        <div className="action-items">
          <MdEdit className = "edit" onClick={() => {
            this.setState({editMode:!editMode})
          }}/>
          <MdDelete  className = "delete" 
           key={admin.id}
           onClick={this.onDelete}
          />
        </div>
      </div>
    </li>
  )
}
}

export default AdminItem
