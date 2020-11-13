
export const SearchInput = () => {


    return(
        <>
            <div className={'search-input__container'}>
                <form className={'search-input__form'} action="">
                    <input placeholder={'Find a movie'} className={'search-input__input'} type="text"/>
                    <button className={'search-input__button'}>Search</button>
                </form>
            </div>
            </>
    )
}