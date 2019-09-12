import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const UserForm = ({errors, touched, status}) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status])

    return (
        <Form>
            {touched.name && errors.name && <p className='error'>{errors.name}</p>}
            <Field type='text' name='name' placeholder='Name'/>
            {touched.email && errors.email && <p className='error'>{errors.email}</p>}
            <Field type='text' name='email' placeholder='E-Mail'/>
            {touched.password && errors.password && <p className='error'>{errors.password}</p>}
            <Field type='text' name='password' placeholder='Password'/>
            {touched.tos && errors.tos && <p className='error'>{errors.tos}</p>}
            <label>
                <Field type='checkbox' name='tos' />
                <span>Terms Of Service</span>
            </label>
            <button type='submit'>Submit</button>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: (values) => {
        return {
            name: values.name || '',
            email: values.email || '',
            password: values.password || '',
            checkbox: values.checkbox || false,

        }
    },
    validationSchema: yup.object().shape({
        name: yup.string().required('Name Is A Required Field.'),
        email: yup.string().required('E-mail Is required'),
        password: yup.string().required('Did you forget your password?'),
        tos: yup.boolean().oneOf([true], 'You must accept the terms of service to continue!')
    }),
    handleSubmit: (values, { setStatus }) => {
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            console.log(res)
            setStatus(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
})(UserForm)