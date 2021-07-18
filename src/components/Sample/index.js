import React, {Component} from 'react'
import ReactPaginate from 'react-paginate';


import './index.css'
import AdminItem from '../AdminItem';

export default class Sample extends Component {
    
    
    state = {
        offset: 0,
        perPage: 10,
        currentPage: 0
    }; 

    

    deleteUser = id => {
        // const {teamPlayers} = this.state.teamPlayers
        // teamPlayers.filter(i => i.idTeam !== id)
        let {adminData} = this.props 
        // let filteredUsersData =  adminData.splice(id-1,1);
        // filteredUsersData = [...filteredUsersData]
        const filteredUsersData = adminData.filter(

          each => parseInt(each.id, 10) !== parseInt(id, 10)
        
          
        ) 

        console.log(filteredUsersData)
        
          adminData = filteredUsersData
         
        
        
        
      } 
        

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const {perPage} = this.state
        const offset = selectedPage * perPage;

        this.setState({
             offset
        });

    }
    
    render() {
        const{ offset,perPage} = this.state
        const{adminData} = this.props 
        const slice = adminData.slice(offset, offset + perPage)
        const postData = slice.map(pd => <> 
            <AdminItem key={pd.id} admin={pd} deleteUser={this.deleteUser} />
        </>)
        return (
            <div>
                {postData}
                <ReactPaginate
                    previousLabel="prev"
                    nextLabel="next"
                    breakLabel="..."
                    breakClassName="break-me"
                    pageCount={Math.ceil(adminData.length / perPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName="pagination"
                    subContainerClassName="pages pagination"
                    activeClassName="active" />
            </div>

        )
    }
}