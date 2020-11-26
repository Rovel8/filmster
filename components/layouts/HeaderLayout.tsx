import Head from "next/head";
import Link from "next/link";
import React, {useEffect, useState, useContext} from "react";
import {ModalPopup} from "../ModalPopup/ModalPopup";
import {Field} from "formik";
import {EyeInvisibleOutlined} from "@ant-design/icons";
import 'firebase/auth'
import firebase from 'firebase'
import { MyContext } from "../../pages/_app";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

interface IHeaderLayout {
    title: string
}

export const HeaderLayout: React.FC<IHeaderLayout> = ({title, children}) => {

    const [modal, setModal] = useState(false)
    const [visible, setVisible] = useState(false);
    const context = useContext(MyContext)
    let btnLabe = context.logged ? 'Log Out' : 'Log In'
    const userId = context.userId

    const showPass = () => {
        const show = document.querySelector('.form-login__password')
        setVisible(!visible)
        if(visible) show.setAttribute('type', 'text')
        else show.setAttribute('type', 'password')

    }

    const logOut = () => {
        firebase.auth().signOut()
    }

    useEffect(() => {
        const burger = document.querySelector('.header__burger')
        const menu = document.querySelector('.nav-header')
        const body = document.body
        function addBurgerEL() {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
            body.classList.toggle('lock');
        }
        burger.addEventListener('click', addBurgerEL)
    }, [])

    useEffect(() => {
        document.body.classList.remove('lock')
    }, [title])

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet={'UTF-8'}/>
            </Head>
            <header className={'header'}>
                <ModalPopup formTitle={'Authorize'} setModal={setModal} modal={modal}>
                    <div className={'form-modal__item'}>
                        <Field required={true} className={'form-item'} placeholder={'Email'} name={'email'} id={'email'} type={'email'} />
                    </div>
                    <div className={'form-modal__item'}>
                        <Field required={true} placeholder={'Password'} className={'form-login__password form-item'} name={'password'} id={'password'} type={'password'} />
                        <span onClick={() => showPass()} className={'form-login__show'}><EyeInvisibleOutlined /></span>
                    </div>
                    <button type={'submit'} className={'form-login__button'}>Log In or Sign Up</button>
                </ModalPopup>
                <div className={'header__container'}>
                    <div className={'header__logo logo-header'}>
                        <div className={'logo-header__title'}>
                            <Link href={'/'}><a><span>OHAYO</span></a></Link>
                        </div>
                    </div>
                    <div className={'header__burger'}>
                        <span/>
                    </div>
                    <nav className={'header__nav nav-header'}>
                        <ul className={'nav-header__list'}>
                            <li><Link href={'/channels/upcoming'}><a className={'nav-header__item'}>Upcoming</a></Link>
                            </li>
                            <li><Link href='/'><a className={'nav-header__item'}>Home</a></Link></li>
                            <li><Link href={'/directory'}><a className={'nav-header__item'}>Directory</a></Link></li>
                            {context.logged && <li><Link href={`/personal/${userId}`}><a className={'nav-header__item'}>Favorite</a></Link></li>}
                        </ul>
                    </nav>
                    <div className={'header__login login-header'}>
                        <button disabled={!context.initialized} onClick={() => {context.logged ? logOut() : setModal(!modal)}} 
                        className={'login-header__button'}><span>{context.initialized ? btnLabe : <Spin indicator={antIcon} />}</span></button>
                    </div>
                </div>
            </header>
            {children}
        </>
    )
}