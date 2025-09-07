import { memo, useState } from "react";
import { Mail, User, Phone, MapPin, Briefcase, Send, X } from 'lucide-react';

const translations = {
  si: {
    title: "අපිත් සමග අදම ලියාපදිංචි වන්න",
    subtitle:
      "Join Lanka Craft and showcase your traditional Sri Lankan crafts to the world.",
    button: "ලියාපදිංචි වීමට",
    form: {
      heading: "නිර්මානකරු ලියාපදිංචි පෝරමය",
      fullName: "සම්පූර්ණ නම",
      email: "ඊමේල් ලිපිනය",
      phone: "දුරකථන අංකය",
      address: "ලිපිනය",
      craftType: "නිර්මාන වර්ගය",
      submit: "submit",
    },
  },
  en: {
    title: "Register with us today",
    subtitle:
      "Join Lanka Craft and showcase your traditional Sri Lankan crafts to the world.",
    button: "Register",
    form: {
      heading: "Artisan Register Form",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone Number",
      address: "Address",
      craftType: "Craft Type",
      submit: "Submit",
    },
  },
  ta: {
    title: "எங்களுடன் இன்று பதிவு செய்யுங்கள்",
    subtitle:
      "இலங்கை பாரம்பரிய கைவினைப் பொருட்களை உலகிற்கு அறிமுகப்படுத்த லங்கா கிராஃப்டில் இணையுங்கள்.",
    button: "பதிவு செய்ய",
    form: {
      heading: "கைவினை பதிவு படிவம்",
      fullName: "முழு பெயர்",
      email: "மின்னஞ்சல்",
      phone: "தொலைபேசி எண்",
      address: "முகவரி",
      craftType: "கைவினை வகை",
      submit: "submit",
    },
  },
};

const ArtisanRegisterCarousel = () => {
  const [lang, setLang] = useState("si"); // default Sinhala
  const [isOpen, setIsOpen] = useState(false); // popup state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    craftType: ''
  });
  const [focusedField, setFocusedField] = useState('');

  const t = translations[lang];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

 const handleSubmit = async () => {
  try {
    // Send form data to backend
    const response = await fetch("http://localhost:8080/artisan/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Your registration request has been sent to the admin! Check Your Email Inbox ");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        craftType: "",
      });
      setIsOpen(false); 
    } else {
      alert("Invalid details. Please try again.");
    }
  } catch (error) {
    console.error("Error sending request:", error);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <>
      <div
        className="relative h-[500px] md:h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://lh4.googleusercontent.com/l-wYF4CAvse_SB9H_XQct4FpEf0A8bzO94ukNkJwEtiN0p3eCDZ9bsh_jb-cGDho9a8QQbPfSIjLRcA_FL9kdfL1HrRDI2_3PdUID6629As459UxM60RuHHePdDmdVJ-jhALsV8WmM1U_6YTFimlXis')`,
        }}
      >
        {/* Dark + Blur Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Language Switch */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            onClick={() => setLang("si")}
            className={`cursor-pointer px-3 py-2 rounded-lg font-medium transition-all duration-200 ${lang === "si"
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white/30 text-white hover:bg-white/40"
              }`}
            style={lang === "si" ? { backgroundColor: "rgb(238,113,89)" } : {}}
          >
            සිං
          </button>
          <button
            onClick={() => setLang("en")}
            className={`cursor-pointer px-3 py-2 rounded-lg font-medium transition-all duration-200 ${lang === "en"
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white/30 text-white hover:bg-white/40"
              }`}
            style={lang === "en" ? { backgroundColor: "rgb(238,113,89)" } : {}}
          >
            EN
          </button>
          <button
            onClick={() => setLang("ta")}
            className={`cursor-pointer px-3 py-2 rounded-lg font-medium transition-all duration-200 ${lang === "ta"
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white/30 text-white hover:bg-white/40"
              }`}
            style={lang === "ta" ? { backgroundColor: "rgb(238,113,89)" } : {}}
          >
            தமிழ்
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6">
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-medium mb-6 drop-shadow-lg">
            {t.title}
          </h1>

          <p className="mb-8 text-lg md:text-2xl drop-shadow-md">{t.subtitle}</p>

          {/* Button that opens Popup */}
          <button
            onClick={() => setIsOpen(true)}
            className="cursor-pointer text-white font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg relative overflow-hidden group"
            style={{ backgroundColor: "rgb(238,113,89)" }}
          >
            <span className="relative z-10">{t.button}</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </div>

      {/* Modern Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-auto">
          <div className="flex items-center justify-center min-h-screen p-4 mt-15">
            <div className="relative w-full max-w-sm my-10">
              {/* Form Container */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20 relative overflow-hidden">
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer absolute top-4 right-4 w-8 h-8 flex items-center justify-center z-50"
                >
                  <X size={18} className="text-gray-500 hover:text-gray-700" />
                </button>




                {/* Header */}
                <div className="text-center mb-6 relative z-10">
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 shadow-lg text-white"
                    style={{ backgroundColor: "rgb(238,113,89)" }}
                  >
                    <User size={22} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    {t.form.heading}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Fill in your details to get started
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-5 relative z-10 mt">
                  {/* Full Name */}
                  <div className="relative">
                    <div
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${focusedField === "fullName"
                          ? "text-orange-500"
                          : "text-gray-400"
                        }`}
                      style={
                        focusedField === "fullName"
                          ? { color: "rgb(238,113,89)" }
                          : {}
                      }
                    >
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder={t.form.fullName}
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      onFocus={() => setFocusedField("fullName")}
                      onBlur={() => setFocusedField("")}
                      className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-gray-200 rounded-2xl focus:outline-none focus:bg-white/90 transition-all duration-300 placeholder-gray-500"
                      style={
                        focusedField === "fullName"
                          ? { borderColor: "rgb(238,113,89)" }
                          : {}
                      }
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <div
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${focusedField === "email"
                          ? "text-orange-500"
                          : "text-gray-400"
                        }`}
                      style={
                        focusedField === "email"
                          ? { color: "rgb(238,113,89)" }
                          : {}
                      }
                    >
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      placeholder={t.form.email}
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-gray-200 rounded-2xl focus:outline-none focus:bg-white/90 transition-all duration-300 placeholder-gray-500"
                      style={
                        focusedField === "email"
                          ? { borderColor: "rgb(238,113,89)" }
                          : {}
                      }
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <div
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${focusedField === "phone"
                          ? "text-orange-500"
                          : "text-gray-400"
                        }`}
                      style={
                        focusedField === "phone"
                          ? { color: "rgb(238,113,89)" }
                          : {}
                      }
                    >
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      placeholder={t.form.phone}
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField("")}
                      className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-gray-200 rounded-2xl focus:outline-none focus:bg-white/90 transition-all duration-300 placeholder-gray-500"
                      style={
                        focusedField === "phone"
                          ? { borderColor: "rgb(238,113,89)" }
                          : {}
                      }
                    />
                  </div>

                  {/* Address */}
                  <div className="relative">
                    <div
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${focusedField === "address"
                          ? "text-orange-500"
                          : "text-gray-400"
                        }`}
                      style={
                        focusedField === "address"
                          ? { color: "rgb(238,113,89)" }
                          : {}
                      }
                    >
                      <MapPin size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder={t.form.address}
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      onFocus={() => setFocusedField("address")}
                      onBlur={() => setFocusedField("")}
                      className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-gray-200 rounded-2xl focus:outline-none focus:bg-white/90 transition-all duration-300 placeholder-gray-500"
                      style={
                        focusedField === "address"
                          ? { borderColor: "rgb(238,113,89)" }
                          : {}
                      }
                    />
                  </div>

                  {/* Craft Type */}
                  <div className="relative">
                    <div
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${focusedField === "craftType"
                          ? "text-orange-500"
                          : "text-gray-400"
                        }`}
                      style={
                        focusedField === "craftType"
                          ? { color: "rgb(238,113,89)" }
                          : {}
                      }
                    >
                      <Briefcase size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder={t.form.craftType}
                      value={formData.craftType}
                      onChange={(e) =>
                        handleInputChange("craftType", e.target.value)
                      }
                      onFocus={() => setFocusedField("craftType")}
                      onBlur={() => setFocusedField("")}
                      className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-gray-200 rounded-2xl focus:outline-none focus:bg-white/90 transition-all duration-300 placeholder-gray-500"
                      style={
                        focusedField === "craftType"
                          ? { borderColor: "rgb(238,113,89)" }
                          : {}
                      }
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="cursor-pointer w-full text-white font-semibold py-3 rounded-2xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group relative overflow-hidden"
                    style={{ backgroundColor: "rgb(238,113,89)" }}
                  >
                    <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    <span className="relative z-10">{t.form.submit}</span>
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 transition-transform duration-200 relative z-10"
                    />
                  </button>
                </div>

                {/* Footer */}
                <div className="text-center mt-5 relative z-10">
                  <p className="text-gray-500 text-xs">
                    By submitting, you agree to our terms and privacy policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(ArtisanRegisterCarousel);
