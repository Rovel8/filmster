import React from "react";
import {Formik, Form, Field} from 'formik';
import {useRouter} from "next/router";


export const SearchInput = () => {

    const router = useRouter()

    const initialValues = {
        search: ''
    }

    const onSubmit = (value) => {
        console.log(value)
        router.push(`/search/${value.search}`)
    }


    return(
        <>
            <div className={'search-input__container'}>
                <Formik
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                >
                    <Form className={'search-input__form'}>
                        <Field name={'search'} id={'search'} placeholder={'Find a movie'} className={'search-input__input'} type="text" />
                        <button type={'submit'} className={'search-input__button'}>Search</button>
                    </Form>

                </Formik>
            </div>
            </>
    )
}