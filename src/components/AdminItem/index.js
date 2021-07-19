import './index.css'

import {MdEdit, MdDelete, MdTabUnselected} from 'react-icons/md'

const AdminItem = props => {
  const {admin, deleteUser, selectId, unSelect } = props

  const onDelete = () => {
    deleteUser(admin.id)
  }

  const onSelect = (event) => {
    
    const {target} = event 
    if (target.checked === true) {
      selectId(admin.id) 
        
    } else {
      unSelect(admin.id)
    }
    
  }
  
  // function Checkbox() {
  //   const [checked, setChecked] = React.useState(true);
  
  //   return (
  //     <label>
  //       <input type="checkbox"
  //         defaultChecked={checked}
  //         onChange={() => setChecked(!checked)}
  //       />
  //       Check Me!
  //     </label>
  //   );
  // } 



  return (
    <li className="item-container">
      <div className="admin-item-container">
        <input className="checkbox-item" type="checkbox"  onChange = {onSelect}  />
        <p className="admin-name">{admin.name}</p>

        <p className="admin-email">{admin.email}</p>
        <p className="admin-role">{admin.role}</p>
        <div className="action-items">
          <MdEdit className = "edit" />
          <MdDelete  className = "delete" 
           key={admin.id}
           onClick={onDelete}
          />
        </div>
      </div>
    </li>
  )
}

export default AdminItem
