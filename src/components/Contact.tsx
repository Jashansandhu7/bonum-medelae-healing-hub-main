import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help. Contact us through any of these channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {/* Location */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-secondary hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
              <p className="text-muted-foreground">
                Plot No. 25, Markanda Complex<br />
                Sena Nagar, Dholkot<br />
                Ambala, Haryana, India (134003)
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-secondary hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-muted-foreground">
                +91 9416113157<br />
                +91 8708885643<br />
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-secondary hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-muted-foreground">
                bonummedelae@gmail.com
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-secondary hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
              <div className="text-muted-foreground">
                <p>Monday - Saturday<br />10:00 AM - 6:00 PM</p>
                <p className="mt-1">Sunday<br />Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Ready to Serve You</h3>
            <p className="text-muted-foreground">
              Whether you're looking for product information, business inquiries, or support, 
              our team is ready to assist you. Reach out to us through any of the channels above, 
              and we'll get back to you promptly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;