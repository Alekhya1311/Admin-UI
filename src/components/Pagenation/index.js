import React, {Component} from 'react'
import ReactPaginate from 'react-paginate';


import './index.css'
import AdminItem from '../AdminItem';

export default class Pagenation extends Component {
    
    
    state = {
        offset: 0,
        perPage: 10,
        currentPage: 0
    }; 

    

    

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
        const{adminData, deleteUser, selectId, unSelect} = this.props 
        const slice = adminData.slice(offset, offset + perPage) 

        const postData = slice.map(pd => <> 
            <AdminItem key={pd.id} admin={pd} deleteUser={deleteUser} selectId = {selectId} unSelect = {unSelect}/>
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