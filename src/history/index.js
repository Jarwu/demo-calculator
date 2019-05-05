import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './history.css'
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
        }).then((res) => {
            return res.json();
        }).then((data) => {
                this.setState({
                    data: data.res
                })
        });
    };

    onDelete = (data) => {
        fetch(API.history_delete, {
            method: 'DELETE',
            body: JSON.stringify(data.id),
            // mode: 'no-cors', // no-cors, cors, *same-origin
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.code === 200) {
                this.listPage();
            }
        });
    };

    render() {
        const {data} = this.state;
        let self = this;
        let li;
        if (data.length !==0) {
            li = data.map(function (item, index) {
                return <div key={index} className='item'>
                    {`${index + 1}. ${item.his} = ${item.res}`}
                    <span className='delete' onClick={self.onDelete.bind(self, item)}>
                        删除
                    </span>
                </div>
            });
        } else {
            li = '----暂无数据----'
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