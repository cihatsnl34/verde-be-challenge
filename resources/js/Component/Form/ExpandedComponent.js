import React from 'react';

export default ({ data , field = "description" }) => <div dangerouslySetInnerHTML={{ __html: data[field] }}/>;