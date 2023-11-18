import '../css/full.css';
import { Cookies } from 'react-cookie';
import { ImageProxy } from '../utils/proxy';


function FullReadPage() {
    const cookies = new Cookies();
    const URLS = JSON.parse(localStorage.getItem('items'));
    
    return (
        <div>
            <div className='hscreen flex flex_col item_center justify_center'>
                <div className='reader_'>
                    {
                        URLS.map((url) => {
                            return (<img className='imgs_' src={ImageProxy(url)}></img>)
                        })
                    }
                </div>
            </div>
        </div>
    )


}

export default FullReadPage;