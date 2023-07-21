import React, { useState } from 'react';

function EditableQuoteNumber({ quoteId, initialQuoteNumber, onSave }) {
  const [editableQuoteNumber, setEditableQuoteNumber] = useState(initialQuoteNumber);

  const handleNumberChange = (event) => {
    setEditableQuoteNumber(event.target.value);
  };

  const handleNumberBlur = () => {
    if (editableQuoteNumber !== initialQuoteNumber) {
      onSave(quoteId, editableQuoteNumber);
    }
  };

  return (
    <input
      type="text"
      value={editableQuoteNumber}
      onChange={handleNumberChange}
      onBlur={handleNumberBlur}
      autoFocus
    />
  );
}

export default EditableQuoteNumber;
