import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/read.css';
import { BackendURL } from '../utils/urls';
import { ImageProxy } from '../utils/proxy';
import { setCookie, getCookie, removeCookie } from '../utils/cookie';
import { Cookies } from 'react-cookie';


function Reader() {
    const [searchParams, setSearchParams] = useSearchParams();
    const movePage = useNavigate();
    const ID = searchParams.get("id");
    const [ImgList, SetIL] = useState([]);
    const [ready, SetReady] = useState(false);
    useEffect(() => {
        axios.get(BackendURL + "/galleries?id=" + ID).then((result) => {
            SetIL(result.data.files);
            SetReady(true);
        }).catch((error) => {
            window.alert(error);
        })
    }, []);
    
    if (ID == null) {
        window.alert("잘못된 접근입니다."); movePage('/');
        return <div></div>
    }

    return (
        <>
        <div>
            <header className='flex header'>
                <h1 style={{marginLeft: "15px"}}>Haruhi Reader</h1>
                {
                    !ready ? null : <p className='full_screen' onClick={() => {
                        localStorage.setItem('items',JSON.stringify(ImgList))
                        movePage('/reader/full');
                        
                    }}>전체 화면</p>
                }
                <div style={{marginRight: 'auto'}}></div>
            </header>
            <main>
                <div className='hscreen flex item_center justify_center'>
                    <div className='reader'>
                        {
                            ImgList.map((data) => {
                                return (<img className='imgs' src={ImageProxy(data)}></img>)
                            })
                        }
                    </div>
                </div>
            </main>
        </div>
        </>
    )
} 

export default Reader;