import { useEffect, useState } from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';

function Main() {
    let [ready, SetReady] = useState(false);
    const cookies = new Cookies();
    cookies.remove("DATA");
    
    useEffect(() => {
        axios.get("https://hitomibackend.voidasmad.repl.co/").then((result) => {
            if (result.data.data == "ok") {
                SetReady(true);
            }
        })
    }, [])
    return (
        ready == true ? <MainPage/> : <ReadyPage/>
    )
}


function ReadyPage() {
    return (
        <div>
            <div className='hscreen flex flex_col items_center justify_center'>
                <h1 style={{color: 'white'}}>로딩 중...</h1>
            </div>
        </div>
    )
}
function MainPage() {
    const [searchBox, SetSB] = useState(false);
    return (
        <div>
            <div className='hscreen flex flex_col items_center justify_center'>
                <div className='header_'>
                <h1 className='ubontu'>Haruhi</h1>
                <h2>광고 없는 히토미 뷰어</h2>
                </div>
                <div>
                <div className='main'>
                    <h4>품번으로 검색</h4>
                    <div style={{marginTop: "7px"}}></div>
                    <InputModal/>
                </div>
                </div>
            </div>
        </div>
    )
}


const InputModal = () => {
    let [id, SetID] = useState('')
    const movePage = useNavigate();
    return (
        <div className='flex'>
            <input className='input_box' type='number' onChange={(e) => {
                SetID(e.target.value)
            }}></input>
            <button className="go_box" onClick={() => {
                if (id == "") {
                    window.alert("품번을 입력해주세요!");
                } else {
                    movePage('/about/' + id);
                }
                
            }}>
                <svg href='./search.svg'></svg>
            </button>
        </div>
    )
}
export default Main;