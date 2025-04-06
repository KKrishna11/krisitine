"use client";

import Image from "next/image";
import { Mail, Phone, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/app/actions";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoplayRef = useRef(null);

  // Gallery images

  const galleryImages = [
    { id: 1, src: "/sunshine.jpeg", alt: "Kristine the cat photo 1" },
    { id: 2, src: "/sleeping-beauty.jpg", alt: "Kristine the cat photo 2" },
    { id: 4, src: "/relax.jpeg", alt: "Kristine the cat photo 4" },
  ];

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors({
        ...errors,
        [id]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", phone: "", message: "" };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^[0-9\-+$$$$\s]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      valid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Send email using server action
        const result = await sendEmail({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        });

        if (result.success) {
          toast.success("Your message has been sent successfully!");

          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        } else {
          toast.error("Failed to send message. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
        console.error("Error sending email:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      setCurrentSlide((prev) =>
        prev === Math.ceil(galleryImages.length / 2) - 1 ? 0 : prev + 1
      );
    }

    if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      setCurrentSlide((prev) =>
        prev === 0 ? Math.ceil(galleryImages.length / 2) - 1 : prev - 1
      );
    }
  };

  if (loading || !mounted) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="cat">
          <div className="cat-body"></div>
          <div className="cat-head">
            <div className="cat-ears">
              <div className="cat-ear left"></div>
              <div className="cat-ear right"></div>
            </div>
            <div className="cat-face">
              <div className="cat-eyes">
                <div className="cat-eye left"></div>
                <div className="cat-eye right"></div>
              </div>
              <div className="cat-nose"></div>
              <div className="cat-mouth"></div>
            </div>
          </div>
          <div className="cat-tail"></div>
        </div>
        <p className="mt-4 text-lg  font-semibold text-white">
          Loading Kristine's Page...
        </p>
        <style jsx>{`
          .cat {
            position: relative;
            width: 120px;
            height: 120px;
          }
          .cat-body {
            position: absolute;
            width: 100px;
            height: 60px;
            background-color: white;
            bottom: 0;
            left: 10px;
            border-radius: 50px 50px 0 0;
            animation: breathe 2s infinite;
          }
          .cat-head {
            position: absolute;
            width: 80px;
            height: 80px;
            background-color: white;
            top: 0;
            left: 20px;
            border-radius: 50%;
            z-index: 2;
          }
          .cat-ears {
            position: absolute;
            top: -15px;
            width: 100%;
          }
          .cat-ear {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-bottom: 30px solid white;
          }
          .cat-ear.left {
            transform: rotate(-30deg);
            left: 5px;
          }
          .cat-ear.right {
            transform: rotate(30deg);
            right: 5px;
          }
          .cat-face {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          .cat-eyes {
            position: absolute;
            top: 25px;
            width: 100%;
            display: flex;
            justify-content: space-around;
          }
          .cat-eye {
            width: 12px;
            height: 12px;
            background-color: #000;
            border-radius: 50%;
            animation: blink 2s infinite;
          }
          .cat-nose {
            position: absolute;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            width: 10px;
            height: 5px;
            background-color: #ff758f;
            border-radius: 50%;
          }
          .cat-mouth {
            position: absolute;
            top: 48px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 5px;
            border-radius: 0 0 10px 10px;
            border-bottom: 2px solid #000;
          }
          .cat-tail {
            position: absolute;
            bottom: 10px;
            left: 0;
            width: 40px;
            height: 10px;
            background-color: white;
            border-radius: 5px;
            transform-origin: left center;
            animation: tailWag 2s infinite;
          }
          @keyframes blink {
            0%,
            45%,
            55%,
            100% {
              transform: scaleY(1);
            }
            50% {
              transform: scaleY(0.1);
            }
          }
          @keyframes tailWag {
            0%,
            100% {
              transform: rotate(0deg);
            }
            50% {
              transform: rotate(-20deg);
            }
          }
          @keyframes breathe {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}</style>
      </div>
    );
  }

  // Client-side only rendering for hearts
  const renderHearts = () => {
    return (
      <div className="hearts-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: `${Math.floor(Math.random() * 100)}%`,
              animationDelay: `${Math.floor(Math.random() * 5)}s`,
              animationDuration: `${Math.floor(Math.random() * 5) + 5}s`,
            }}
          ></div>
        ))}
        <style jsx>{`
          .hearts-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
            pointer-events: none;
          }
          .heart {
            position: absolute;
            top: -50px;
            width: 20px;
            height: 20px;
            background-color: #000;
            opacity: 0.1;
            transform: rotate(45deg);
            animation: fall linear infinite;
          }
          .heart:before,
          .heart:after {
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: #000;
            border-radius: 50%;
          }
          .heart:before {
            top: -10px;
            left: 0;
          }
          .heart:after {
            top: 0;
            left: -10px;
          }
          @keyframes fall {
            0% {
              transform: translateY(0) rotate(45deg) scale(0.8);
              opacity: 0.2;
            }
            100% {
              transform: translateY(100vh) rotate(45deg) scale(0.4);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold flex items-center">
              <span className="text-gray-500 mr-1">🐾</span> Kristine's Forever
              Home
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#about"
              className="text-sm font-medium hover:text-gray-600"
            >
              About
            </a>
            <a
              href="#gallery"
              className="text-sm font-medium hover:text-gray-600"
            >
              Gallery
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-gray-600"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          <Button
            size="sm"
            className="hidden md:inline-flex"
            onClick={scrollToContact}
          >
            Adopt Now
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a
                href="#about"
                className="text-sm font-medium hover:text-gray-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#gallery"
                className="text-sm font-medium hover:text-gray-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </a>
              <a
                href="#contact"
                className="text-sm font-medium hover:text-gray-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Button size="sm" className="w-full" onClick={scrollToContact}>
                Adopt Now
              </Button>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section
          id="hero"
          className="py-20 md:py-32 bg-gradient-to-b from-gray-100 to-white relative overflow-hidden"
        >
          {mounted && renderHearts()}
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Meet Kristine, Your New Feline Friend
              </h1>
              <p className="text-lg text-muted-foreground">
                A loving and playful one-year-old cat looking for her forever
                home. Fully vaccinated, well-trained, and ready to bring joy to
                your life.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="sm:w-auto bg-gray-800 hover:bg-gray-700 transition-all duration-300 group"
                  onClick={scrollToContact}
                >
                  <span className="mr-2">🐾</span> Meet Kristine
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ❤️
                  </span>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="sm:w-auto"
                >
                  <a
                    href="https://wa.me/919922379106?text=I'm%20interested%20in%20adopting%20Kristine"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/snapchatkristine.jpg"
                alt="Florian Hurel Hair Couture & Spa"
                width={480}
                height={800}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 relative">
              <span className="relative z-10">About Kristine</span>
              <span className="absolute w-20 h-2 bg-gray-200 bottom-0 left-1/2 transform -translate-x-1/2"></span>
            </h2>

            <div className="max-w-4xl mx-auto mb-16 text-center">
              <p className="text-lg text-gray-600 leading-relaxed">
                Kristine is a beautiful white cat with adorable black spots
                who's looking for a loving family to call her own. At just one
                year old, she's the perfect blend of playful energy and gentle
                affection.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-gray-200 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 overflow-hidden group transform hover:-translate-y-2">
                <CardContent className="pt-6 relative">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    Loving Personality
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Kristine is an affectionate cat who enjoys cuddles and will
                    greet you at the door. She's friendly with everyone she
                    meets.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-200 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 overflow-hidden group transform hover:-translate-y-2">
                <CardContent className="pt-6 relative">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    Well-Trained
                  </h3>
                  <p className="text-muted-foreground text-center">
                    She is fully litter-trained and well-behaved. Kristine knows
                    basic commands and respects furniture.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-200 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 overflow-hidden group transform hover:-translate-y-2">
                <CardContent className="pt-6 relative">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    Playful & Curious
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Kristine loves playing with toy mice and watching the world
                    from windows. She's curious and always exploring.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 bg-gray-50 rounded-lg p-8 shadow-inner transform hover:scale-[1.01] transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Health & Care
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow duration-300">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Fully Vaccinated</h4>
                    <p className="text-sm text-gray-600">
                      Kristine has received all necessary vaccinations and is in
                      excellent health.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow duration-300">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Enjoys Interactive Toys</h4>
                    <p className="text-sm text-gray-600">
                      She loves playing with toys and engaging in playtime
                      activities.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow duration-300">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Regular Vet Check-ups</h4>
                    <p className="text-sm text-gray-600">
                      Kristine has had regular veterinary check-ups and is in
                      perfect health.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow duration-300">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Healthy Diet</h4>
                    <p className="text-sm text-gray-600">
                      She maintains a balanced diet and regular exercise
                      routine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Kristine's Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map(({ id, src, alt }) => (
                <div
                  key={id}
                  className="relative h-64 rounded-lg overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 relative">
              <span className="relative z-10">
                Interested in Adopting Kristine?
              </span>
              <span className="absolute w-20 h-2 bg-gray-200 bottom-0 left-1/2 transform -translate-x-1/2"></span>
            </h2>
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex justify-center items-center">
                        <Phone className="h-5 w-5 mr-2 text-muted-foreground " />
                        <Input
                          id="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={errors.phone ? "border-red-500" : ""}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us why you'd like to adopt Kristine"
                        className={`min-h-[120px] ${
                          errors.message ? "border-red-500" : ""
                        }`}
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm">{errors.message}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gray-800 hover:bg-gray-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Or contact us directly:
                </p>
                <div className="flex justify-center gap-4">
                  <Button asChild variant="outline" className="gap-2">
                    <a
                      href="mailto:krishna.kushwaha2312@gmail.com"
                      className="flex items-center"
                    >
                      <Mail className="h-4 w-4" />
                      Email Us
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="gap-2">
                    <a href="tel:9922379106" className="flex items-center">
                      <Phone className="h-4 w-4" />
                      Call Us
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white text-gray-800 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-gray-500 mr-2">🐾</span> Kristine's
                Forever Home
              </h3>
              <p className="text-gray-600 max-w-md">
                Thank you for considering adopting Kristine. Every cat deserves
                a loving home, and your interest makes a difference.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#about"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      About Kristine
                    </a>
                  </li>
                  <li>
                    <a
                      href="#gallery"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Gallery
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={scrollToContact}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Contact Us
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2  text-gray-600">
                    <Phone className="h-4 w-4" />
                    <a
                      href="tel:9922379106"
                      className="text-blue-600 hover:underline "
                    >
                      9922379106
                    </a>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <a
                      href="https://wa.me/919922379106?text=I'm%20interested%20in%20adopting%20Kristine"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      WhatsApp
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear().toString()} Kristine's Forever Home.
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
