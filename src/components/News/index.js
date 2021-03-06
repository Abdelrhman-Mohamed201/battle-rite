import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import * as firebase from 'firebase'

// CSS
import './News.min.css'

export default class News extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news: [],
            admin: this.props.admin,
        }
    }

    componentDidMount() {
        firebase.database().ref('news').once('value').then(data => {
            let news = Object.values(data.val())
            this.setState({news})
        })
    }
    /***
     *
     * @param date Take a new Date
     * @returns {string}
     */
    formatDate = date => {
        let revertToDate = new Date(date)
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        let day = revertToDate.getDate();
        let monthIndex = revertToDate.getMonth();
        let year = revertToDate.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
    render() {
        return (
            <div className="news mt-5 py-4">
                <div className="container">
                    <div className="row">
                        {this.state.admin === undefined ?
                            <div className="col-12 mb-2">
                                <h3 className="text-uppercase">News</h3>
                            </div>
                            : ''}
                        {this.state.news.map((data, index) => {
                            return <div className="col-sm-6" key={index}>
                                <Link className="nav-link p-0"
                                      to={`${this.state.admin === undefined ? '/news' : this.state.admin.path}/${data.permalink}`}>
                                    <div className="news__items" style={{backgroundImage: `url(${data.img})`}}>
                                        <h4>{data.title}</h4>
                                        <h6>{data.subTitle}</h6>
                                        <span>{this.formatDate(data.created_at)}</span>
                                    </div>
                                </Link>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}