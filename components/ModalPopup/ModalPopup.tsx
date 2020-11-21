import Modal from 'react-modal';
import React, {useEffect, useState, useContext} from "react";
import {Field, Form, Formik} from "formik";
import {CloseOutlined, EyeInvisibleOutlined} from "@ant-design/icons";
import 'firebase/auth'
import firebase from 'firebase'
import initFirebase from '../../assets/firebase';
import { useRouter } from 'next/router';
import { MyContext } from '../../pages/_app';



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

initFirebase()

export default function ModalPopup({modal, setModal, children, formTitle}){

    const onSubmit = ({email, password}) => {
        firebase.auth().setPersistence('local').then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
                if(user){
                    closeModal()
                }
            }).catch((error) => {
                if(error.code === 'auth/user-not-found'){
                    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
                        closeModal()
                        firebase.firestore().collection('users').doc(user.user.uid).set({
                            email: user.user.email,
                            uid: user.user.uid
                        }, {merge: true})
                    })
                }
            })
        })
    }

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