import './SearchInput.less';
import {Input} from 'antd';


export const SearchInput = () => {

    const {Search} = Input

    return(
        <>
            <div className={'search-input__container'}>
                {/*<form className={styles.mainSearch__form} action="">*/}
                {/*    <input className={styles.form__input} type="text"/>*/}
                {/*    <button className={styles.form__button}>Hello</button>*/}
                {/*</form>*/}
                <Search placeholder="input search text" enterButton />
            </div>
            </>
    )
}