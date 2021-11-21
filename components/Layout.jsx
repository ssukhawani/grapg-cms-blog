import React,{useState, useEffect} from 'react'
import { Header,Footer } from '.'
import { getPages } from '../services'

const Layout = ({children}) => {
    const [pages, setPages] = useState([]);
    useEffect(() => {
        getPages().then((response) => setPages(response));
    }, []);

    return (
        <>
         <Header/>
         {children}
         <Footer pages={pages} /> 
        </>
    )
}

export default Layout


