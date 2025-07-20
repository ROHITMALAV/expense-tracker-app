// client/src/components/About.js
import React from 'react';

const About = () => {
  return (
    <div>
      <header className="main-header">
        <h2 className="main-title">About Expense Pro</h2>
      </header>
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-md">
        <p className="text-lg mb-4">
          <strong>Expense Pro</strong> is a full-stack web application built to demonstrate modern web development techniques. It was created step-by-step to provide a clear and comprehensive learning experience.
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Technology Stack</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Frontend:</strong> React.js with Tailwind CSS for styling.</li>
          <li><strong>Backend:</strong> Node.js with the Express.js framework.</li>
          <li><strong>Database:</strong> MongoDB with Mongoose for data modeling.</li>
          <li><strong>API Communication:</strong> Handled via a RESTful API using Axios.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6 mb-2">Features</h3>
        <p>
          This application includes complete CRUD (Create, Read, Update, Delete) functionality for transactions, a professional and responsive UI, custom modals, and an 'undo' feature for a great user experience.
        </p>
      </div>
    </div>
  );
};

export default About;
