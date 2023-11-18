import {Cookies} from 'react-cookie';

export const cookies = new Cookies();

export const setCookie = (name, value) => {
	console.log(value);
 	return cookies.set(name, value, {path: '/'}); 
}

export const getCookie = (name) => {
 return cookies.get(name); 
}

export const removeCookie = (name) => {
	return cookies.remove(name); 
   }