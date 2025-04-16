import { useForm } from 'react-hook-form';

// Reusable validation rules
const validationRules = {
  username: {
    required: 'Username is required',
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters'
    },
    maxLength: {
      value: 20,
      message: 'Username cannot exceed 20 characters'
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)?$/,
      message: 'Username can only contain letters, numbers and underscores, or two words'
    }
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters'
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    }
  },
  // Add more reusable validation rules as needed
};

function sanitizeFormData(data) {
    const sanitized = {};
    
    // Iterate through object properties
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'string') {
        // Replace potentially dangerous characters with HTML entities
        sanitized[key] = data[key]
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      } else {
        sanitized[key] = data[key];
      }
    });
    
    return sanitized;
};

export default function useFormValidation(defaultValues = {}) {
  const formMethods = useForm({ defaultValues });
    
  // Enhanced submit handler that sanitizes data
  const submitWithSanitization = (onSubmit) => {
    return formMethods.handleSubmit((data) => {
      const sanitizedData = sanitizeFormData(data);
      return onSubmit(sanitizedData);
    });
  };
    
  return {
    ...formMethods,
    submitWithSanitization
  };
}

export { validationRules, sanitizeFormData }