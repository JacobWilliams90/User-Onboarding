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
        <>
        <Form>
            <p>User Onboarding</p>
            {touched.name && errors.name && <p className='error'>{errors.name}</p>}
            <Field type='text' name='name' placeholder='Name'/>
            {touched.role && errors.role && <p className='error'>{errors.role}</p>}
            <Field name='role' component='select'>
                <option value='' name='nothing' disabled>Select Role:</option>
                <option name='admin'>Admin</option>
                <option name='user'>User</option>
            </Field>
            {touched.email && errors.email && <p className='error'>{errors.email}</p>}
            <Field type='text' name='email' placeholder='E-Mail'/>
            {touched.password && errors.password && <p className='error'>{errors.password}</p>}
            <Field type='text' name='password' placeholder='Password'/>
            {touched.botcheck && errors.botcheck && <p className='error'>{errors.botcheck}</p>}
            <Field type='number' name='botcheck' placeholder='What is 2+2' />
            {errors.tos && <p className='error'>{errors.tos}</p>}
            <label>
                <Field type='checkbox' name='tos' />
                <span>Terms Of Service</span>
            </label>
            <button type='submit' name='submit'>Submit</button>
        </Form>

        {users.map((users) => (
            <div>
                Name: {users.name}<br />
                Role: {users.role}<br />
                E-mail: {users.email}<br />
                Password: Wouldnt you like to know!<br />
            </div>
        ))}
    </>
    )
}

export default withFormik({
    mapPropsToValues: (values) => {
        return {
            name: values.name || '',
            role: values.role || '',
            email: values.email || '',
            password: values.password || '',
            botcheck: values.botcheck || '',
            checkbox: values.checkbox || false,
        }
    },
    validationSchema: yup.object().shape({
        name: yup.string().required('Name Is A Required Field.'),
        role: yup.string().required('Please Select your user Level'),
        email: yup.string().email('E-mail must be a valid address').required('E-mail Is required'),
        password: yup.string().required('Did you forget your password?'),
        botcheck: yup.number(4).required('You answered incorrectly').positive(),
        tos: yup.boolean().oneOf([true],'You must accept the terms of service to continue!')
    }),
    handleSubmit: (values, { setStatus }) => {
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            setStatus(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
})(UserForm)