import './Read.css';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';


function ReadPage() {
    const cookies = new Cookies();
    const URLS = cookies.get("DATA")

    const Proxy = (url) => {
        return "https://hitomibackend.voidasmad.repl.co/proxy?url=" + url;
    }
    
    return (
        <div>
            <div className='hscreen flex flex_col items_center justify_center'>
                <div className='reader'>
                    {
                        URLS.map((url) => {
                            return (<img className='imgs' src={Proxy(url)}></img>)
                        })
                    }
                </div>
            </div>
        </div>
    )


}

export default ReadPage;