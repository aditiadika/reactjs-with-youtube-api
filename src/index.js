import _ from 'lodash'
import React, { Component } from 'react'
import ReactDom from 'react-dom'

import SearchBar from './components/SearchBar'
import VideoList from './components/VideoList'
import VideoDetail from './components/VideoDetail'
import YTSearch from 'youtube-api-search'

const API_KEY = 'AIzaSyBSEheUsE42R9p_eHLqSwIfReOLrpsAD84'

class App extends Component {
    constructor(props){
        super(props)

        this.state = { videos: [], selectedVideo: null }

        this.videoSearch('react-native')
    }

    videoSearch(term){
        YTSearch({ key: API_KEY, term: term}, videos => {
            this.setState({ videos, selectedVideo: videos[0] })
        })
    }

    render() {
        const videoSearch = _.debounce(term => { this.videoSearch(term) }, 500)
        return(
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    videos={this.state.videos}
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })} 
                />
            </div>
        )
    }
}

ReactDom.render(<App />, document.querySelector('.container'))