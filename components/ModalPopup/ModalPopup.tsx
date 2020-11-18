import Modal from 'react-modal';
import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {CloseOutlined, EyeInvisibleOutlined} from "@ant-design/icons";


Modal.setAppElement('#__next');

const customStyles={
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '400px',
        zIndex: '200'
    },
    overlay: {
        zIndex: '100',
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
};

export default function ModalPopup({modal, setModal, children, formTitle}){

    const closeModal = () => {
        setModal(!modal)
        document.body.classList.remove('lock')
    }

    const afterOpenModal = () => {
        document.body.classList.add('lock')
    }

    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit = (values) => {
        console.log(values)
    }

    return(
        <Modal
            closeTimeoutMS={0}
            isOpen={modal}
            style={customStyles}
            onAfterOpen={afterOpenModal}
        >
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form className={'form-modal'}>
                    <h1 className={'form-login__title'}>{formTitle}</h1>
                    {children}
                </Form>
            </Formik>
            <button className={'close-modal'} onClick={() => closeModal()}><CloseOutlined /></button>
        </Modal>
    )
}