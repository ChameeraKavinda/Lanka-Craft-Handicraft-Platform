import { useState, memo } from 'react';

const FeedBackForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/feedback/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Thank you for your feedback! Your message has been sent.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        onClose();
      } else {
        alert("Failed to send feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      alert("Something went wrong. Please check your connection.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-20 bg-black/40 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-md sm:rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-fadeIn">
        
        {/* Header */}
        <div className="text-white p-4 rounded-t-md sm:rounded-t-lg" style={{backgroundColor: 'rgb(238,113,89)'}}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-bold">Need Help?</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold cursor-pointer"
            >
              ×
            </button>
          </div>
          <p className="text-xs sm:text-sm mt-1 opacity-90">We're here to assist you</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-sm sm:text-base"
              placeholder="Your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-sm sm:text-base"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all text-sm sm:text-base"
              required
            >
              <option value="">Select a subject</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Product Question">Product Question</option>
              <option value="Order Support">Order Support</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Billing">Billing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all resize-none text-sm sm:text-base"
              placeholder="Please describe how we can help you..."
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer flex-1 px-4 py-2 text-white rounded-lg transition-all font-medium shadow-lg text-sm sm:text-base"
              style={{backgroundColor: 'rgb(238,113,89)'}}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const HelpWidget = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="fixed right-4 top-[80%] -translate-y-1/2 z-40">
        <button
          onClick={() => setIsFormOpen(true)}
          className="text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm font-medium flex items-center gap-2"
          style={{backgroundColor: 'rgb(238,113,89)'}}
        >
          Need Help
        </button>
      </div>

      <FeedBackForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default memo(HelpWidget);
