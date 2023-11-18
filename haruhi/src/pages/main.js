import { useEffect, useState } from 'react';
import '../css/main.css';
import axios from 'axios';
import { ImageProxy } from '../utils/proxy';
import { TagBox } from '../utils/tags';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {CopyToClipboard} from "react-copy-to-clipboard/src";

function MainPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [next_text, SetNT] = useState(false);
    const [content_list, SetCL] = useState([]);

    let page = searchParams.get("page");
    if (page == null) {
        page = 1;
    }
    useEffect(() => {
        axios.get("https://haruhi.voidasmad.repl.co/pack?page=" + page).then(
            (result) => {
                SetCL(result.data.data);
                SetNT(true);
            }
        ).catch((error) => {
            window.alert(error);
        })
    }, [])

    return (
        <>
        <div>
            <header className='flex'>
                <h1 style={{marginLeft: "15px"}}>Haruhi</h1>
                <div style={{marginRight: 'auto'}}></div>
                <div className='searchBox'>
                    <input 
                    className='inputBox' 
                    placeholder='품번을 입력해주세요.'
                    type='number'
                    />
                </div>
            </header>
            <main>
                <div className='hscreen flex item_center justify_center'>
                    {
                        next_text ? <Contents next_text={next_text} content_list={content_list} page={page}/> : <h1 style={{color: 'white'}}>로딩중..</h1>
                    }
                </div>
            </main>
        </div>
        </>
    )
}


const Contents = ({ next_text, content_list, page }) => {
    return (
        <div className='contents'>
            {
                next_text ? <><ContextBox content_list={content_list}/><PageController page={page}/></> : null
            }
            
        </div>
    )
}

const PageController = ({page}) => {
    if (page==1) {
        return (<div>
            <p className='next_page' onClick={() => {
            window.location.replace('/?page=' + String(Number(page) + 1));
        }}>다음 페이지 →</p></div>);
    } else {
        return (<div className='flex'><p className='previous_page' onClick={() => {
            window.location.replace('/?page=' + String(Number(page) - 1));
        }}>← 이전 페이지</p><p className='move_page' onClick={() => {
            var page = prompt("이동할 페이지를 입력해주세요.")
            window.location.replace('/?page=' + String(Number(page)))
        }}>페이지 이동</p><p className='next_page' onClick={() => {
            window.location.replace('/?page=' + String(Number(page) + 1));
        }}>다음 페이지 →</p></div>)
    }
}

const ContextBox = ({content_list}) => {
    const movePage = useNavigate();
    return (
        content_list.map((data) => {
            return (
                <div className='contentBox' onClick={() => {
                    movePage('/reader?id=' + String(data.id));
                }}>
                    <div className='flex item_center'>
                        <img className="profile_img" src={ImageProxy(data.files[0])}></img>
                        <div className='flex flex_col' style={{width: '100%'}}>
                            <h2>{data.title}</h2>
                            {
                                data.artists?.map((data) => {
                                    return (<h3><a>{data.artist}</a></h3>)
                                })
                            }
                            <div className='flex tags'>
                                {
                                    data.tags?.map((data) => {
                                        return (<TagBox tag_data={data} tag_name="tag"/>)
                                    })
                                }
                            </div>
                            <hr style={{backgroundColor: 'gray', height: '1px', border: 0, marginTop: '10px', width: '98%'}}></hr>
                            <CopyToClipboard text={data.id} onCopy={() => {
                                window.alert("복사 완료!");
                            }}><text className='number_p'>{ data.id }</text></CopyToClipboard>
                        </div>
                    </div>
                </div>
            );
        })
    )   
}

export default MainPage;