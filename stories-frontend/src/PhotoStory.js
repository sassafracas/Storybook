import React, { Component } from "react";
import Adapter from "./Adapter";
import Photo from "./Photo";
import { Link } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

class PhotoStory extends Component {

  deletePhotostory = () => {
    Adapter.deleteOnePhotostory(this.props.photostory.id).then(r => console.log(r))
  }

//https://github.com/CassetteRocks/react-infinite-scroller/blob/master/docs/src/index.js

  render() {
   console.log("photostory props ", this.props)
   const items = <Segment vertical>
                    <Link to={{
                       pathname: `/my-stories/${this.props.photostory.id}`,
                       state: {...this.props}
                     }}><h3>{this.props.photostory.title}</h3></Link>
                     <button onClick={this.deletePhotostory}>Delete Story</button>
                     <Photo photos={this.props.photostory.photos}/>
                 </Segment>
    return (
      <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ...</div>}>
          {items}
      </InfiniteScroll>
    )
  }



}

export default PhotoStory;
