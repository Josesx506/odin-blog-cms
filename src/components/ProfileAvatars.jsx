import React from 'react'
import { getInitials } from '@/utils/utils';

export default function ProfileAvatars({ name }) {
  const initials = getInitials(name);
  return (
    <span style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '1.5rem',
        height: '1.5rem',
        padding: '0.2rem',
        backgroundColor: 'darkgray',
        color: '#fff',
        fontSize: '0.7rem',
        borderRadius: '50%',
        fontWeight: 650
    }} >
      {initials}
    </span>
  )
}
