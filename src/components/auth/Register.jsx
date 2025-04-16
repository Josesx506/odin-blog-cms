'use client'

import { ContainedButton } from '@/components/Buttons';
import { FormField } from '@/components/FormField';
import useFormValidation, { validationRules } from '@/hooks/useFormValidation';
import styles from '@/styles/forms.module.css';
import { registerUserAction } from '@/utils/authAction';
import Form from 'next/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Register() {
  const {
    register,
    formState: { errors },
    watch, reset,
    submitWithSanitization } = useFormValidation();

  const password = watch("password");
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  // Submit the form with fetch request server action
  const onSubmit = async (sanitizedData) => {
    try {
      setLoading(true);
      const result = await registerUserAction(sanitizedData,true);
      if (!result.success) {
        toast.error(result.error);
        reset();
      } else {
        toast.success('User registered! Redirecting...');
        navigate.push('/signin');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className={styles.authContainer}>
        <div className={styles.authFormContainer}>
          <h3 style={{ textAlign: 'center' }}>Author Registration</h3>

          <Form className={styles.authForm} onSubmit={submitWithSanitization(onSubmit)}>

            <FormField name={'username'} label={'Username'} placeholder={'Enter Username'}
              register={register} rules={validationRules.username} errors={errors} />
            <FormField type={'email'} name={'email'} label={'Email'} placeholder={'Enter Email'}
              register={register} rules={validationRules.email} errors={errors} />
            <FormField type={'password'} name={'password'} label={'Password'}
              placeholder={'Enter Password'} register={register} rules={validationRules.password}
              errors={errors} />
            <FormField type={'password'} name={'confirmPassword'} label={'Confirm Password'}
              placeholder={'Re-enter Password'} errors={errors}
              register={register} rules={{
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              }} />

            <div className={styles.authSubmit}>
              <ContainedButton disabled={loading}>Sign Up</ContainedButton>
            </div>
          </Form>
          <em>Choose your registration option here. The same email cannot be used twice</em>
        </div>
        <div className={styles.authLinksContainer}>
          <div className={styles.authLink}>Prefer not to contribute? Register as a reader <Link href={`${process.env.NEXT_PUBLIC_BASICURL}/signup`}>here</Link></div>
          <div className={styles.authLink}>Registered Reader? <Link href={`${process.env.NEXT_PUBLIC_BASICURL}/signin`}>Sign in</Link> to read posts</div>
          <div className={styles.authLink}>Registered Contributor? <Link href={'/signin'}>Sign in</Link> to your dashboard</div>
        </div>
      </div>

    </div>
  )
}
