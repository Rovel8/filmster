import Head from "next/head";
import './HeaderLayout.less';
import Link from "next/link";
import {Button} from "antd";
import {useEffect} from "react";

interface IHeaderLayout {
    title: string
}

export const HeaderLayout: React.FC<IHeaderLayout> = ({title, children}) => {

    useEffect(() => {
        const burger = document.querySelector('.header__burger')
        const menu = document.querySelector('.nav-header')
        const body = document.body
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
            body.classList.toggle('lock');
        })
        return burger.removeEventListener('click', () => {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
        })
    }, [])

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet={'UTF-8'}/>
            </Head>
            <header className={'header'}>
                <div className={'header__container'}>
                    <div className={'header__logo logo-header'}>
                        <div className={'logo-header__title'}>
                            <span>OHAYO</span>
                        </div>
                    </div>
                    <div className={'header__burger'}>
                        <span/>
                    </div>
                    <nav className={'header__nav nav-header'}>
                        <ul className={'nav-header__list'}>
                            <li><Link href={'/newReleases'}><a className={'nav-header__item'}>Upcoming</a></Link>
                            </li>
                            <li><Link href='/'><a className={'nav-header__item'}>Home</a></Link></li>
                            <li><Link href={'/directory'}><a className={'nav-header__item'}>Directory</a></Link></li>
                        </ul>
                    </nav>
                    <div className={'header__login login-header'}>
                        <Button size={'large'} type={'primary'}
                                className={'login-header__button'}><span>Login</span></Button>
                    </div>
                </div>
            </header>
            {children}
        </>
    )
}