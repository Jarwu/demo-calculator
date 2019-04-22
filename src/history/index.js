import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './index.css'

class index extends Component {

    render() {
        return (
            <div className='main'>
                <div className='body'>
                    ssssss
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