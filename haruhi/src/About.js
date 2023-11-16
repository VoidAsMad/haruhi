import axios from 'axios';
import './About.css';
import Main from './Main';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';

function About() {
    const params = useParams();
    const movePage = useNavigate();
    let [data, SetData] = useState(null);   

    useEffect(()=> {
        axios.get('https://hitomibackend.voidasmad.repl.co/galleries?id='+ params.id).then((result) => {
            SetData(result.data);
            
        }).catch((error) => {
            window.alert("네트워크 오류 또는 존재하지 않는 작품입니다.")
            
            movePage("/");
        })  
    }, [])
    

    return (
        <div>
            <div className='hscreen flex flex_col items_center justify_center'>
                {
                    data == null ? <Main/> : <Container data={data}/>
                }
            </div>
        </div>
    )
}   

function Container({data}) {
    const movePage = useNavigate();
    const ProfileURL = "https://hitomibackend.voidasmad.repl.co/proxy?url=" + data.files[0]
    const BaseURL = "https://hitomi.la"
    const cookies = new Cookies();
    const setCookie = (name, value, options) => {
        return cookies.set(name, value, {...options}); 
    }
    setCookie("DATA", data.files);
    return (
        <div className='container fadeInMain'>
            <div className='header flex items_center'>
                <div className="product-title">
                    <div className="product-img-div">
                        <img className="product-img" src={ProfileURL} onClick={()=>{
                            movePage('/reader');
                        }}/>
                    </div>
                </div>
                <div style={{marginLeft: '10px'}}>
                    <h2 className='title'>{data.title}</h2>
                </div>
            </div>
            <div className='main_content'>
                <p style={{color: '#D51C60', padding: '10px'}}>갤러리 정보</p>
                <div className='about flex flex_col'>
                    <div className='artist'>
                        <p>작가</p>
                        {data.artists?.map((data) => {
                            return (<a href={BaseURL + data.url} style={{color: 'white'}}><div className='content_box'>{data.artist}</div></a>)
                        })}
                    </div>
                    <div style={{marginTop: '10px'}}></div>
                    <div className='group'>
                        <p>그룹</p>
                        {data.groups?.map((data) => {
                            return (<a href={BaseURL + data.url} style={{color: 'white'}}><div className='content_box'>{data.group}</div></a>)
                        })}
                    </div>
                    <div style={{marginTop: '10px'}}></div>
                    <div className='language'>
                        <p>언어</p>
                        <a href={BaseURL + data.language_url} style={{color: 'white'}}><div className='content_box'>{data.language}</div></a>
                    </div>
                    <div style={{marginTop: '10px'}}></div>
                    <div className='parodys'>
                        <p>시리즈</p>
                        {data.parodys?.map((data) => {
                            return (<a href={BaseURL + data.url} style={{color: 'white'}}><div className='content_box'>{data.parody}</div></a>)
                        })}
                    </div>
                    <div style={{marginTop: '10px'}}></div>
                    <div className='parodys'>
                        <p>캐릭터</p>
                        {data.characters?.map((data) => {
                            return (<a href={BaseURL + data.url} style={{color: 'white'}}><div className='content_box'>{data.character}</div></a>)
                        })}
                    </div>
                    <div style={{marginTop: '10px'}}></div>
                    <div className='tag'>
                        <p>태그</p>
                        {data.tags?.map((data) => {
                            return data.female == "1" ? <a href={BaseURL + data.url} style={{color: 'white'}}><div className='female_box'># {data.tag}</div></a> : <a href={BaseURL + data.url} style={{color: 'white'}}><div className='male_box'># {data.tag}</div></a>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;