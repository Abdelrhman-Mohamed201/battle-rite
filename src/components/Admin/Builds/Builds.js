import React, {Component} from 'react'

import ChmapionCards from '../../../components/Guides/Guides.js'

export default class Builds extends Component{
    render(){
        return(
            <div className="aBuilds">
                <ChmapionCards admin={{path:'/admin/builds'}}/>
            </div>
        )
    }
}