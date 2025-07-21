// client/src/components/About.js
import React, { useState } from 'react';

const About = () => {
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend endpoint.
    // For now, we'll simulate a successful submission.
    console.log('Feedback Submitted:', feedback);
    setIsSubmitted(true);
    setFeedback({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5 seconds
  };

  return (
    <div>
      <header className="main-header">
        <h2 className="main-title">About Expense Pro</h2>
      </header>
      
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-md">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Take Control of Your Finances</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Expense Pro is a modern, intuitive, and powerful tool designed to help you effortlessly track your income and expenses. Our mission is to provide financial clarity and empower you to achieve your financial goals.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 text-center">
          <div className="feature-card">
            <img src="https://placehold.co/600x400/3b82f6/ffffff?text=Dashboard" alt="Dashboard" className="rounded-lg mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Intuitive Dashboard</h3>
            <p className="text-gray-600">Visualize your financial health at a glance with our clean and informative dashboard.</p>
          </div>
          <div className="feature-card">
            <img src="https://placehold.co/600x400/10b981/ffffff?text=Secure" alt="Secure" className="rounded-lg mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your data is your own. We ensure your financial information is kept secure and private.</p>
          </div>
          <div className="feature-card">
            <img src="https://placehold.co/600x400/8b5cf6/ffffff?text=Responsive" alt="Responsive" className="rounded-lg mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Works Everywhere</h3>
            <p className="text-gray-600">Access your expense tracker on any device, thanks to a fully responsive design.</p>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Built with Modern Technology</h3>
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <span className="font-semibold">React.js</span>
            <span className="font-semibold">Node.js</span>
            <span className="font-semibold">Express</span>
            <span className="font-semibold">MongoDB</span>
            <span className="font-semibold">Tailwind CSS</span>
          </div>
        </div>

        {/* Feedback Form Section */}
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">We'd Love Your Feedback</h3>
            <div className="max-w-2xl mx-auto">
                {isSubmitted ? (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center" role="alert">
                        <strong className="font-bold">Thank you!</strong>
                        <span className="block sm:inline"> Your feedback has been received.</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input type="text" name="name" id="name" value={feedback.name} onChange={handleChange} className="form-input" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="form-label">Your Email</label>
                                <input type="email" name="email" id="email" value={feedback.email} onChange={handleChange} className="form-input" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea name="message" id="message" rows="4" value={feedback.message} onChange={handleChange} className="form-input" required></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="btn btn-primary w-auto">Submit Feedback</button>
                        </div>
                    </form>
                )}
            </div>
        </div>

        {/* --- UPDATED: Meet the Team Section --- */}
        <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Meet the Team</h3>
            <div className="flex justify-center items-center gap-8 md:gap-16">
                {/* Rohit Malav */}
                <div className="inline-block">
                    <img src="https://placehold.co/128x128/000000/FFFFFF?text=RM" alt="Rohit Malav" className="rounded-full mx-auto mb-4"/>
                    <h4 className="text-xl font-semibold">Rohit Malav</h4>
                    <p className="text-gray-500">Full-Stack Developer</p>
                </div>
                {/* Sanjay Mishra */}
                <div className="inline-block">
                    <img src="https://placehold.co/128x128/000000/FFFFFF?text=SM" alt="Sanjay Mishra" className="rounded-full mx-auto mb-4"/>
                    <h4 className="text-xl font-semibold">Sanjay Mishra</h4>
                    <p className="text-gray-500">Penetration Tester</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
