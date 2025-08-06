const ReviewSection = ({ title, textareaValue, onEdit, stepNumber }) => (
  <div className="border-b pb-4">
    <div className="flex justify-between items-start">
      <div className="w-full">
        <p className="text-sm font-bold text-gray-800 mb-1">{title}</p>
        <textarea
          rows="4"
          readOnly
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          value={textareaValue}
        />
      </div>
      <button type="button" onClick={onEdit} className="ml-2 mt-1">
        <img src={editIcon} alt="Edit" className="w-5 h-5 hover:opacity-80 transition" />
      </button>
    </div>
  </div>
);
