import DOMPurify from 'dompurify';

function getInitials(input) {
  // Trim the input and split by spaces
  const words = input.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return words.map(word => word.charAt(0)).join('').toUpperCase();
}

function dateFormatter(dateObj, format = 'default') {

  const dateParse = new Date(dateObj);

  if (format === 'monthNameDay') {
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };

    return dateParse.toLocaleDateString('en-US', options);
  }

  const dateOptions = {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit'
  }

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }

  let dateString = dateParse.toLocaleDateString('en-US', dateOptions);
  let timeString = dateParse.toLocaleTimeString('en-US', timeOptions);

  const fmtr = `${dateString} ${timeString}`
  return fmtr
}

function decodeJWT(token) {
  if (!token) return null;

  try {
    // Split the token into parts (header.payload.signature)
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Base64 decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    // console.error('Error decoding JWT:', error);
    return null;
  }
}

function sanitizeSimpleInputs(data) {
  const sanitized = {};
  const options = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 
      'br', 'img', 'h1', 'h2', 'h3', 'h4', 'h5'],
    ALLOWED_ATTR: ['href','src','alt','title','style','height','width'],KEEP_CONTENT: true,
  }

  // Iterate through object properties
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string' && key !== 'body') {
      // Replace potentially dangerous characters with HTML entities
      sanitized[key] = data[key]
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    } else if (key === 'body') {
      sanitized[key] = DOMPurify.sanitize(data[key], options)
    } else {
      sanitized[key] = data[key];
    }
  });

  return sanitized;
};

export { dateFormatter, decodeJWT, getInitials, sanitizeSimpleInputs };
