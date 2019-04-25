import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './index.css'
import API from '../service/api'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.listPage()
    }

    listPage = () => {

        fetch(API.history_list, {
            method: 'GET',
            // mode: 'no-cors', // no-cors, cors, *same-origin
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then( (res)=> {
            return res.json();
        }).then( (data)=> {
            this.setState({
                data:data.res
            })
        });
    };

    render() {
        const {data} = this.state;
        console.log(data);
        let li ;
        if(data) {
            li = data.map(function (item, index) {
                return <div key={index} className='item'>{`${index+1}. ${item.his} = ${item.res}`}</div>
            });
        }
        return (
            <div className='main'>
                <div className='body'>
                    {li}
                </div>
                <div className='foot'>
                    <button className='btn'>
                        <Link className='link' to='/'>返回</Link>
                    </button>
                </div>
            </div>
        )
    }

}

export default index;