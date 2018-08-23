import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component{

    componentDidMount(){
        //get the id from url
        const id = this.props.match.params.id; // provided by react router
        this.props.fetchPost(id)
    }

    onDeleteClick(){

        const id = this.props.match.params.id;
        this.props.deletePost(id, ()=> this.props.history.push('/'));
        
        
    }
    render(){
        //posts[this.props.match.params.id]; // post we want to show, but posts is the big old list

        const { post } = this.props;
        console.log(post)

        if(!post){
            return<div>Loading...</div>
        }
        return(
            <div>
                <Link to ="/">Back To Index</Link>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p> 
                <button className = 'btn btn-danger pull-xs-right' onClick = {this.onDeleteClick.bind(this)}>Delete</button>
            </div>
        )
    }
}
// get application level state out and into the component
// can use to select pieces of state off the global state
function mapStateToProps({ posts }, ownProps){ // state.posts. Second argument is the props object that is going to the component. this.props === ownProps
    //return {posts}

    // to make more reusable and so we aren't passing the entire posts list to the component,
    return { post: posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow); // connect gives the fetchPost action creator as a prop
// for the application to use
