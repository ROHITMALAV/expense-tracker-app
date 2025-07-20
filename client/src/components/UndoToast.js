// client/src/UndoToast.js
import React from 'react';

const UndoToast = ({ onUndo }) => {
  return (
    <div className="fixed bottom-5 right-5 bg-gray-800 text-white py-3 px-5 rounded-lg shadow-xl flex items-center justify-between animate-fade-in-up">
      <p className="font-medium">Transaction deleted successfully.</p>
      <button
        onClick={onUndo}
        className="ml-4 font-semibold text-blue-400 hover:text-blue-300 transition-colors"
      >
        Undo
      </button>
    </div>
  );
};

// We need to add a simple animation to our CSS file for this component.
// Please add the following to your `client/src/index.css` file:
/*
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}
*/

export default UndoToast;
